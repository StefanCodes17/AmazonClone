import {buffer} from 'micro'
import { connectToDatabase } from '../../lib/mongodb'
import { getSession } from "next-auth/react"


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

const fulfillOrder = async (session)=>{
    const { db } = await connectToDatabase();
    if(!db) throw Error("Failure to connect to database")
    const existingUser = await db.collection("users").findOne({email: session.metadata.email})
    if(existingUser){
        return db.collection("users").updateOne(
            { email: session.metadata.email },
            { $push: { "orders" :  {
                id: session.id,
                amount: session.amount_total / 100,
                amount_shipping: session.total_details.amount_shipping / 100,
                images: JSON.parse(session.metadata.images),
                timestamp: new Date().toISOString()
            } } }
         ).then(()=>
            console.log(`SUCCESS: Order ${session.id} has been added to the DB!`)
         )
    }
}

export default async (req, res)=>{
    if(req.method === "POST"){
        const session = await getSession({ req })
        if(!session) return res.status(401).send("Unauthorized request")

        const reqBuffer = await buffer(req)
        const payload = reqBuffer.toString()
        const signature = req.headers["stripe-signature"]

        let event;
        try{
            event = stripe.webhooks.constructEvent(payload, signature, endpointSecret)
        }catch(err){
            console.log(`Webhook error: ${err.message}`)
            return res.status(400).send(`Webhook error: ${err.message}`)
        }
        if(event.type === "checkout.session.completed"){
            const sess = event.data.object
            return fulfillOrder(sess).then(()=> res.status(200)).catch(err => res.status(400).send(`Webhook error: ${err.message}`))
        }
    }
    if (req.method !== "POST") {
        res.status(405).send("Unauthorized method access to endpoint")
        return;
      }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}