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

function validateUser(email, password, confirmPassword){
    let res = {}
    if(!validateEmail(email)){
        res.email = {
            "error":{
                "message": "Not a valid email"
            }
        }
    }
    return res
}

export default async (req, res)=>{
    if(req.method === "POST"){
        const {email, password, confirmPassword} = req.body
        res.json(validateUser(email, password, confirmPassword))
    }
}