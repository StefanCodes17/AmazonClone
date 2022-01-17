import { connectToDatabase } from '../../lib/mongodb'

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
    let res = {
        loading: false,
    }
    if(!validateEmail(email)){
        res.email = {
            error:{
                message: "Not a valid email"
            }
        }
        return res
    }
   
    if(password.length < 6){
        res.password = {
            error: {
                message: "Password must be longer than 6 characters"
            }
        }
        return res
    }
    
    if(!validatePassword(password)){
        res.password = {
            error:{
                message: "Password is not strong enough"
            }
        }
        return res
    }
    if(password !== confirmPassword){
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
            status: 200,
            loading: false,
            success:{
                messsage: `Welcome!, ${email}`
            }
        }

}

export default async (req, res)=>{
    if(req.method === "POST"){
        const {email, password, confirmPassword} = req.body
        res.json(validateUser(email, password, confirmPassword))
    }
}