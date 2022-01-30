import { connectToDatabase } from '../lib/mongodb'
import bcrypt from 'bcrypt'
import axios from 'axios'

export const AddUser = async ({...user})=>{
    const { db } = await connectToDatabase();
    if(!db) throw Error("Failure to connect to database")
    const existingUser = await db.collection("users").findOne({email: user.email})
        if(!existingUser){
            try{
                await axios.post(`${process.env.NEXTAUTH_URL}/api/sendgrid`,
                {
                    email: user.email,
                    subject: "Verification Email",
                    message: "Verify your email!"
                })
            }catch(e){
                console.log(`Sendgrid axios api call ${e.message}`)
            } 
           return db.collection("users").insertOne({
              ...user,
              orders: []
            })
        }
    return existingUser
}

export const SignInUser = async(email, password) =>{
    const { db } = await connectToDatabase();
    if(!db) throw Error("Failure to connect to database")
    const existingUser = await db.collection("users").findOne({email: email})
    if(!existingUser || !existingUser.password) return null

    //Check password
    const res = await bcrypt.compare(password, existingUser.password);
    if(res) return existingUser
}