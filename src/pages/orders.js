import { getSession, useSession } from 'next-auth/react'
import { connectToDatabase } from '../util/mongodb'
import Header from '../components/Header'
import Order from '../components/Order'

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
    const { db } = await connectToDatabase();
    if(!db) throw Error("Failure to connect to database")
    const session = await getSession(context)

    if(!session) return {props:{}}
    let orders;
    try{
        let ordersRef = await db.collection("users").findOne({"email": session.user.email})
        orders = await Promise.all(ordersRef.orders.sort((a, b) => {
            if(a.timestamp < b.timestamp){
                return 0
            }else{
                return -1
            }
        }).map(async (order) =>({
                id: order.id,
                amount: order.amount,
                amountShipping: order.amount_shipping,
                images: order.images,
                timestamp: order.timestamp,
                items: (await stripe.checkout.sessions.listLineItems(order.id,
                        { limit: 100 })).data
        })))
    }catch(e){
        console.log(`Error with order fetching: ${e.message}`)
    }
    return {
        props:{
            orders
        }
    }
  }
