import {getProviders, signIn, getSession} from "next-auth/react"
import Image from 'next/image'
import { useRouter } from "next/router"
import { useState } from "react"


const Signup = () => {

    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()
        signIn(providers.credentials.id, { username, password, callbackUrl: `${process.env.NEXTAUTH_URL}`})
    }

    return (
        <div className="relative">
            <div className="px-5 py-5 m-auto max-w-sm">
              <div className="flex items-center py-2 px-4 absolute top-5 left-5 m-auto">
                <Image 
                              src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"} 
                              width={130}
                              height={30}
                              objectFit='contain'
                              className='cursor-pointer'
                              />
              </div>
              <div className=" px-8 py-10 mt-5">
                <h1 className="font-semibold font-sans text-xl">Create an account</h1>
                <form 
                onSubmit={handleSubmit}
                className="flex flex-col mt-6 max-w-xs m-auto"
                >
                  <label htmlFor="email" className="font-semibold text-sm">
                    Email address
                  </label>
                  <input 
                  required
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="border border-gray-300 rounded focus:outline-none focus:shadow pl-2 py-1 mt-1" />
                  <label htmlFor="password" className= "font-semibold text-sm">
                    Password
                  </label>
                  <input
                  required
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  type="password" 
                  id="password" 
                  name="password" 
                  className="border border-gray-300 rounded focus:outline-none focus:shadow pl-2 py-1 mt-1"/>
                  <label htmlFor="password" className= "font-semibold text-sm">
                    Confirm Password
                  </label>
                  <input
                  required
                  value={cpassword} 
                  onChange={(e) => setCPassword(e.target.value)} 
                  type="password" 
                  id="password" 
                  name="password" 
                  className="border border-gray-300 rounded focus:outline-none focus:shadow pl-2 py-1 mt-1"/>
                  <button type="submit" className="button mt-4">Sign in with Email</button>
                </form>
                <div className="w-full flex items-center justify-between">
                    <hr className="mt-3 w-28"></hr> 
                    <p className="text-sm pt-1 text-gray-500">or</p>
                    <hr className="mt-3 w-28"></hr>
                </div>
                <div>
                  <p 
                  className="text-sm text-gray-800 hover:underline underline-offset-2 cursor-pointer"
                  onClick={() => router.push("/auth/signin")}
                  >Have an account? <span >Log in!</span></p>
                </div>
              </div>
          </div>
        </div>
      )
}

export default Signup
