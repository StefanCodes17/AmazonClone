import { connectToDatabase } from '../lib/mongodb'
import bcrypt from 'bcrypt'
import axios from 'axios'

export const UpdateUser = async(email) =>{
    const { db } = await connectToDatabase();
    if(!db) throw Error("Failure to connect to database")
    let user;
    try{
        user = await db.collection("users").updateOne(
              {"email": email },
              {$set: { email_verified: true }},
              {upsert:true},
         )
    }catch(e){
        console.log(`Error updating email verification ${e.message}`)
    }
    return user
}

export const AddGoogleUser = async ({...user})=>{
    const { db } = await connectToDatabase();
    if(!db) throw Error("Failure to connect to database")
    const existingUser = await db.collection("users").findOne({email: user.email})
        if(!existingUser){
                try{
                    await axios.post(`${process.env.NEXTAUTH_URL}/api/sendgrid`,
                    {
                        verify: !user.email_verified,
                        email: user.email,
                        subject: "Welcome to Amazon!",
                        message: `
                        Protect your account by verfiying your email and making sure all order and confirmation numbers reach you to enable tracking and other features.
                        ${user.email_verified && `Since you're already verified, head over to <a href=${process.env.NEXTAUTH_URL}>Amazon</a> and keep shopping!`}
                        `
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
