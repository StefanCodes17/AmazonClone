import { connectToDatabase } from '../lib/mongodb'
import bcrypt from 'bcrypt'

export const AddUser = async ({...user})=>{
    const { db } = await connectToDatabase();
    if(!db) throw Error("Failure to connect to database")
    const existingUser = await db.collection("users").findOne({email: user.email})
        if(!existingUser){
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