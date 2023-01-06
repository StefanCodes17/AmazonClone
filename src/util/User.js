import {connectToDatabase} from '../lib/mongodb'
import UserModel from '../pages/api/database/user'

import bcrypt from 'bcrypt'
import axios from 'axios'

export const UpdateUserVerification = async (email) => {
    const {db} = await connectToDatabase();
    if (!db) throw Error("Failure to connect to database")
    let user;
    try {
        user = await db.collection("users").updateOne(
            {"email": email},
            {$set: {email_verified: true}},
        )
    } catch (e) {
        console.log(`Error updating email verification ${e.message}`)
    }
    return user
}

export const AddUser = async (email, password, provider) =>{
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds) 
    if(hashedPassword){
        const userInstance = new UserModel({email, password: hashedPassword, provider, username: email})
        const user = await userInstance.save()
        if(user){
            return {user}
        }
    }else{
        throw new Error("Error creating hashed password")
    }
    return {user: null}
}

export const AddGoogleUser = async ({...user}) => {
    console.log("AddGoogleUser", user)
    const existingUser = await UserModel.findOne({'email': user.email}).exec()
    console.log("AddGoogleUserExisting", existingUser)
    if(existingUser) return existingUser
    try{
        const {user: mongoUser} = await AddUser(email, password, "credentials")
        if(mongoUser){
            return mongoUser
        }
    }catch (err){
        return null
    }
}

export const SignInUser = async (email, password) => {
    const existingUser = await UserModel.findOne({'email': email}).exec()
    if(!existingUser || !existingUser.email_verified) return null

    const res = await bcrypt.compare(password, existingUser.password);
    if(res) return existingUser
    return null
}
