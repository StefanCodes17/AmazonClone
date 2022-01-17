import {getProviders, signIn, getSession} from "next-auth/react"
import Image from 'next/image'
import { useRouter } from "next/router"
import { useState } from "react"

const GoogleIcon = () =>(
    <div>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 48 48">
      <g>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
          <path fill="none" d="M0 0h48v48H0z"></path>
      </g>
    </svg>
  </div>
)

export default function SignIn({ providers, csrfToken}) {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) =>{
    e.preventDefault()
    signIn(providers.credentials.id, { username, password, callbackUrl: `${process.env.NEXTAUTH_URL}`})
  }

  return (
    <div className="relative">
        <div className="px-5 py-5 m-auto max-w-sm">
          <div className="bg-amazon_blue flex align-center justify-center py-2 px-4 absolute top-0 left-0 w-full">
            <Image 
                          src={"https://links.papareact.com/f90"} 
                          width={150}
                          height={40}
                          objectFit='contain'
                          className='cursor-pointer'
                          />
          </div>
          <div className=" px-8 py-10 mt-5">
            <h1 className="font-semibold font-sans text-xl text-center">Log into your Account</h1>
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
              <button type="submit" className="button mt-4">Sign in with Email</button>
            </form>
            <div className="mt-5 hover:cursor-pointer" onClick={()=>signIn(providers.google.id,{callbackUrl: `${process.env.NEXTAUTH_URL}`})}>
              <GoogleIcon/>
            </div>
            <div className="w-full flex items-center justify-between">
                <hr className="mt-3 w-28"></hr> 
                <p className="text-sm pt-1 text-gray-500">or</p>
                <hr className="mt-3 w-28"></hr>
            </div>
            <div>
              <p 
              className="text-sm text-gray-800 hover:underline underline-offset-2 cursor-pointer"
              onClick={() => router.push("/auth/signup")}
              >Don't have an account? <span >Create one!</span></p>
            </div>
          </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if(session?.user){
    return{
      redirect:{
        permanent: false,
        destination: "/"
      }
    }
  }

  const providers = await getProviders()
  return {
    props: {
      providers
    },
  }
}
