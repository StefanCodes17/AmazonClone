import { getSession, useSession } from 'next-auth/react'
import Header from '../components/Header'
import db from '../../firebase'

const Orders = ({orders}) => {
    const { data: session, status } = useSession()
    console.log(orders)

    return (
        <div>
           <Header/>
           <main className='mx-auto max-w-screen-lg p-10'>
                <h1 className='text-2xl border-b mb-2 pb-1 border-yellow-400'>Orders</h1>
           {session ? (
               <h2>{orders.length} Orders</h2>
           ):(
               <h2>Please Sign in to see your orders</h2>
           )}
           <div className='mt-5 space-y-4'>

           </div>
           </main>
        </div>
    )
}

export default Orders


export async function getServerSideProps(context){
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
    const moment = require("moment")

    const session = getSession()

    if(!session) return {props:{}}

    const stripeOrders = await db.collection('users').doc(session.user.email).collection('orders').orderBy('timestamp', 'desc').get();

    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) =>({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.session.listLineItems(order.id, {
                    limit: 100
                })
            ).data
        }))
    )

    return {
        props:{
            orders
        }
    }
  }
