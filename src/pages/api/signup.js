import { connectToDatabase } from '../../lib/mongodb'
import { getSession } from "next-auth/react"
import bcrypt from 'bcrypt'
import axios from 'axios'
/*
{
    email:{
        status: "Error"
    },
    password:{

    }, 
    confirmPassword:{
        status: "error",
        message: "Confirm password is too sort"
    }
}

*/

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const validatePassword = (pass) =>{
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    return String(pass)
            .match(        
                strongRegex
            )
}

function validateUser(email, password, confirmPassword){
    let res = {}
    if(!email){
        res.error = true
        res.email = {
            error:{
                message: "Please enter an email"
            }
        }
        return res
    }

    if(!password){
        res.error = true
        res.password = {
            error:{
                message: "Please enter a password"
            }
        }
        return res
    }

    if(!confirmPassword){
        res.error = true
        res.confirmPassword = {
            error:{
                message: "Please enter a confirm password"
            }
        }
        return res
    }

    if(!validateEmail(email)){
        res.error = true
        res.email = {
            error:{
                message: "Not a valid email"
            }
        }
        return res
    }
   
    if(password.length < 6){
        res.error = true
        res.password = {
            error: {
                message: "Password must be longer than 6 characters"
            }
        }
        return res
    }
    
    if(!validatePassword(password)){
        res.error = true
        res.password = {
            error:{
                message: "Password is not strong enough"
            }
        }
        return res
    }
    if(password !== confirmPassword){
        res.error = true
        res.password = {
            error:{
                message: "Passwords must match!"
            }
        }
        res.confirmPassword = {
            error:{
                message: "Passwords must match!"
            }
        }
        return res
    }
        return {
            error: false,
            status: 200,
            loading: false,
            account:{
                success:{
                    message: `Successfully made an account, ${email}!`
                }
            }
        }

}

export default async (req, res)=>{
    if(req.method === "POST"){
        const {email, password, confirmPassword} = req.body
        const {error, ...data} = validateUser(email, password, confirmPassword)
        if(error) return res.json(data)
        const { db } = await connectToDatabase();
        if(!db) throw Error("Failure to connect to database")
        const existingUser = await db.collection("users").findOne({email: email})
        if(existingUser){
            return res.json({
                account:{
                    error: {
                         message: "An account is already assocaited with this email"
                    }
                }
            })
        }
        bcrypt.hash(password, 8, async function(err, hash) {
            try{
                const {acknowledged} = await db.collection("users").insertOne({
                    provider: "credentials",
                    role: 1,
                    email,
                    name: email.split("@")[0],
                    email_verified: false,
                    picture: "/",
                    password: hash,
                    orders: []
                    })
                if(acknowledged) {
                    try{
                        await axios.post(`${process.env.NEXTAUTH_URL}/api/sendgrid`,
                        {
                            email,
                            verify: true,
                            subject: "Verification Email",
                            message: "Protect your account by verfiying your email and making sure all order and confirmation numbers reach you to enable tracking and other features."
                        })
                    }catch(e){
                        console.log(`Sendgrid axios api call ${e.message}`)
                    }
                    return res.status(200).json(data)
                }
            }catch(e){
                console.log(`Error adding user to db: ${e.message}`)
                return res.status(401).json("Authentication error!")
            }
        });
    }
    if (req.method !== "POST") {
        res.status(405).set('Allow', 'POST').send("");
        return;
      }
}