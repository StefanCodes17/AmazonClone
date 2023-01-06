import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../lib/mongodb";
import {UserValidationResponse} from "./types/UserValidation"
import UserModel from "./database/user"
import {AddUser} from "../../util/User"

const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validatePassword = (pass: string) => {
    const strongRegex = new RegExp("[a-zA-Z]*") //new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    return String(pass)
        .match(
            strongRegex
        )
}

function validateUser(email: string, password: string, confirmPassword: string) {
    let res : UserValidationResponse = {success: false}
    res.error = {}
    if (!email) {
        res.error.email = "Email is required"
        return res
    }

    if (!password) {
        res.error.password = "Password is required"
        return res
    }

    if (!confirmPassword) {
        res.error.confirmPassword = "Confirm password is required"
        return res
    }

    if (!validateEmail(email)) {
        res.error.email = "Not a valid email"
        return res
    }

    if (password.length < 6) {
        res.error.password = "Password must be longer than 6 characters"
        return res
    }

    if (!validatePassword(password)) {
        res.error.password = "Password is not strong enough"
        return res
    }
    if (password !== confirmPassword) {
        res.error.password = "Passwords must match"
        res.error.confirmPassword ="Passwords must match"
        return res
    }
    return {success: true}
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const {email, password, confirmPassword} = req.body
        const {error, success} = validateUser(email, password, confirmPassword)
        if (error && Object.keys(error).length !== 0) return res.status(401).json({
            error,
            success
        })
        await connectToDatabase();
        const existingUser = await UserModel.findOne({'email': email}).exec()
        if(existingUser) return res.status(409).json({success: false, error: "Error signing up"})   
        try{
            const {user} = await AddUser(email, password, "credentials")
            if(user){
                return res.status(200).json({success: true})
            }
        }catch (err){
            return res.status(500).json(err)
        }
            /*try {
                await axios.post(`${process.env.NEXTAUTH_URL}/api/sendgrid`,
                    {
                        email,
                        verify: true,
                        subject: "Verification Email",
                        message: "Protect your account by verfiying your email and making sure all order and confirmation numbers reach you to enable tracking and other features."
                    })
            } catch (e) {
                console.log(`Sendgrid axios api call ${e.message}`)
            }
            return res.status(200).json(data)*/
    }
    if (req.method !== "POST") {
        return res.status(405).setHeader('Allow', 'POST').send("");
    }
}