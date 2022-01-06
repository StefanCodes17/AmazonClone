import { getSession, useSession } from 'next-auth/react'
import Header from '../components/Header'
import { collection, getDocs, doc, QuerySnapshot, getFirestore, getDoc, collectionGroup } from "../../firebase"; 

const Orders = ({orders}) => {
    const { data: session, status } = useSession()

    return (
        <div>
           <Header/>
           <main className='mx-auto max-w-screen-lg p-10'>
                <h1 className='text-2xl border-b mb-2 pb-1 border-yellow-400'>Orders</h1>
           {session ? (
               <h2>{orders && orders.length} Orders</h2>
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
    const db = getFirestore()
    console.log(stripe.checkout.session)
    const session = await getSession(context)

    const orders = []
    const ordersRef = await getDocs(collection(db, `users/${session.user.email}/orders`))
    ordersRef.forEach(async (order) =>{
        orders.push({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            //items: await stripe.checkout.session.id
        })
    })

    return {
        props:{
            orders
        }
    }
  }
