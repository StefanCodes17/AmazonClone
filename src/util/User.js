import { connectToDatabase } from '../lib/mongodb'

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