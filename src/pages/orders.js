import { getSession, useSession } from 'next-auth/react'
import Header from '../components/Header'
import Order from '../components/Order'
import { collection, getDocs, doc, QuerySnapshot, getFirestore, getDoc, collectionGroup, orderBy } from "../../firebase"; 

const Orders = ({orders}) => {
    const { data: session, status } = useSession()

    return (
        <div>
           <Header/>
           <main className='mx-auto max-w-screen-lg p-10'>
                <h1 className='text-2xl border-b mb-2 pb-1 border-yellow-400'>Orders</h1>
                {session ? (
                    <h2>{orders && orders.length} Order{orders.length > 1 ? "s": null}</h2>
                ):(
                    <h2>Please Sign in to see your orders</h2>
                )}
                <div className='mt-5 space-y-4'>
                    {
                        orders?.map(order =>(
                            <Order {...order} key={order.id}/>
                        ))
                    }
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
    const session = await getSession(context)

    if(!session) return {props:{}}
    try{
        const ordersRef = await getDocs(collection(db, `users/${session.user.email}/orders`), orderBy("timestamp", 'desc'))
        const orders = await Promise.all(
            ordersRef.docs.map(async (order) =>({
                id: order.id,
                amount: order.data().amount,
                amountShipping: order.data().amount_shipping,
                images: order.data().images,
                timestamp: moment(order.data().timestamp.toDate()).unix(),
                items: (await stripe.checkout.sessions.listLineItems(order.id,
                        { limit: 100 })).data
            }))
        )
    }catch(e){
        console.log(`Error with order fetching: ${e.message}`)
    }
    return {
        props:{
            orders
        }
    }
  }
