import {buffer} from 'micro'
import { connectToDatabase } from '../../util/mongodb'

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_CLI_SECRET

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
                images: JSON.parse(session.metadata.images)
            } } }
         ).then(()=>
            console.log(`SUCCESS: Order ${session.id} has been added to the DB!`)
         )
    }else{
        return db.collection("users").insert({
            email: session.metadata.email,
            orders: [{
                id: session.id,
                amount: session.amount_total / 100,
                amount_shipping: session.total_details.amount_shipping / 100,
                images: JSON.parse(session.metadata.images)
            }]
        }).then(()=>{
            console.log(`SUCCESS: Order ${session.id} has been added to the DB!`)
        })
    }
}

export default async (req, res)=>{
    if(req.method === "POST"){
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
            const session = event.data.object
            return fulfillOrder(session).then(()=> res.status(200)).catch(err => res.status(400).send(`Webhook error: ${err.message}`))
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}