import { useEffect } from "react"
import {getProviders, signIn, getSession} from "next-auth/react"
import Image from 'next/image'
import { useRouter } from "next/router"
import { useState } from "react"
import {GoogleIcon, Loader} from '../../svgAssets/assets'
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid"
import axios from 'axios'


export default function SignUp({ providers}) {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [showConPass, setShowConPass] = useState(false)
  const [formStatus, setFormStatus] = useState({loading: false})
  const [passwordStrength, setPasswordStrength] = useState("")

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setFormStatus({loading: true})
    setFormStatus((await axios.post(`/api/signup`, {
      email,
      password,
      confirmPassword
    })).data)
  }

  useEffect(()=>{
    if(formStatus?.account?.success){
      setTimeout(()=>{
        router.push("/auth/signin")
      }, 750)
    }
  }, [formStatus])

  const calculateStrength = (str)=>{
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    if(str.match(strongRegex)){
      setPasswordStrength("strong")
    }
    else if(str.match(mediumRegex)){
      setPasswordStrength("medium")
    }else{
      setPasswordStrength("weak")
    }
  }

  const strengthConfig = {
    strong: {
      style: "bg-teal-100 border-t-4 mt-3 border-teal-600 rounded-b text-teal-900 px-4 py-3 shadow-md" ,
      message: "Password is really strong!"
    },
    medium: {
      style: "bg-yellow-100 border-t-4 mt-3 border-yellow-600 rounded-b text-yellow-900 px-4 py-3 shadow-md" ,
      message: "Password not strong enough!"
    },
    weak: {
      style: "bg-orange-100 border-t-4 mt-3 border-orange-600 rounded-b text-orange-900 px-4 py-3 shadow-md" ,
      message: "Password is too weak!"
    }
  }

  return (
    <div className="relative max-w-4xl m-auto">
        <div className="px-5 py-5 m-auto max-w-sm">
          <div className="flex items-center py-2 px-4 absolute top-5 left-5 m-auto" onClick={()=>router.push("/")}>
            <Image 
                          src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"} 
                          width={130}
                          height={30}
                          objectFit='contain'
                          className='cursor-pointer'
                          />
          </div>
          <div className=" px-8 py-10 mt-5">
            <h1 className="font-semibold font-sans text-xl">Create an Account</h1>
            <form 
            onSubmit={handleSubmit}
            className="flex flex-col mt-6 max-w-xs m-auto"
            >
              {/*Email Field */}
              <label htmlFor="email" className="font-semibold text-sm mb-2">
                  Email address
                </label>
              <div className={`${formStatus?.loading ? "justify-center opacity-40": null} flex border ${!formStatus?.email?.error ? "border-gray-300" : "border-red-300"} rounded focus:shadow items-center`} >
                {
                  !formStatus?.loading ? (
                    <>
                        <input 
                    disabled={formStatus?.loading}
                    required
                    value={email} 
                    onChange={(e) => {
                      setFormStatus({loading: false})
                      setEmail(e.target.value)}} 
                    type="email" 
                    id="email" 
                    name="email"
                    className="flex-grow focus:outline-none px-2 py-1 mt-1 w-full"  />
                    </>
                  ):(
                    <Loader size="sm"/>
                  )
                }
              </div>
              {formStatus?.email?.error && <p className="text-xs mt-1 text-red-400 font-semibold">{formStatus.email.error.message}</p>} 
              {/*Password Field */}
              <label htmlFor="password" className= "font-semibold text-sm mt-4 mb-2">
                Password
              </label>
              <div className={`${formStatus?.loading ? "justify-center opacity-40": null} flex border ${!formStatus?.password?.error ? "border-gray-300" : "border-red-300"} rounded focus:shadow items-center`}>
                {
                  !formStatus?.loading ? (
                    <>
                      <input
                  disabled={formStatus?.loading}
                  required
                  value={password} 
                  onChange={(e) => {
                    setShowPass(false)
                    setFormStatus({loading: false})
                    setPassword(e.target.value)
                    calculateStrength(e.target.value)
                  }} 
                  type={!showPass ? "password" : "text" }
                  id="password" 
                  name="password"
                  className="flex-grow focus:outline-none px-2 py-1 mt-1 w-full"/>
                  <i className="flex-end px-2 cursor-pointer flex-end" onClick={() => setShowPass(!showPass)}>
                    {!showPass ? <EyeIcon className="w-5 text-gray-300"/> : <EyeOffIcon className="w-5"/>}
                  </i>
                    </>
                  ):(
                    <Loader size="sm" />
                  )
                }
              </div>
              {formStatus?.password?.error && <p className="text-xs mt-1 text-red-400 font-semibold">{formStatus.password.error.message}</p>} 
              {/*Strength Password*/}
              {!formStatus?.password?.error && passwordStrength && 
                <div className={strengthConfig[passwordStrength].style} role="alert">
                  <div className="flex">
                    <div>
                      <p className="text-sm">{strengthConfig[passwordStrength].message}</p>
                    </div>
                  </div>
                </div>
              }
              {/*Confirm Password Field */}
              <label htmlFor="confirmPassword" className= "font-semibold text-sm mt-4 mb-2">
                Confirm Password
              </label>
              <div className={`${formStatus?.loading ? "justify-center opacity-40": null} flex border ${!formStatus?.confirmPassword?.error ? "border-gray-300" : "border-red-300"} rounded focus:shadow items-center`}>
                {
                  !formStatus?.loading ? (
                    <>
                        <input
                    disabled={formStatus?.loading}
                    required
                    value={confirmPassword} 
                    onChange={(e) => {
                      setConfirmPassword(false)
                      setFormStatus({loading: false})
                      setConfirmPassword(e.target.value)}} 
                    type={!showConPass ? "password" : "text" }
                    id="confirmPassword" 
                    name="confirmPassword"
                    className="flex-grow focus:outline-none px-2 py-1 mt-1 w-full"/>
                    <i className="flex-end px-2 cursor-pointer" onClick={() => setShowConPass(!showConPass)}>
                      {!showConPass ? <EyeIcon className="w-5 text-gray-300"/> : <EyeOffIcon className="w-5"/>}
                    </i>
                    </>
                  ): (
                    <Loader size="sm"/>
                  )
                }
              </div>
              {formStatus?.confirmPassword?.error && <p className="text-xs mt-1 text-red-400 font-semibold">{formStatus.confirmPassword.error.message}</p>} 
              <button type="submit" className="button mt-4" disabled={formStatus?.loading}>Sign Up</button>
            </form>
            {/*Success Notification*/}
            {formStatus?.account?.success && <div className="bg-teal-100 border-t-4 mt-3 border-teal-600 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
              <div className="flex">
                <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-600 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                  <p className="font-bold">Welcome!</p>
                  <p className="text-sm">{formStatus.account.success.message}</p>
                </div>
              </div>
            </div>}
            {/*Error Notification*/}
            {formStatus?.account?.error && <div className="bg-red-100 border-t-4 mt-3 border-red-600 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert">
              <div className="flex">
                <div className="py-1"><svg className="fill-current h-6 w-6 text-red-600 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                  <p className="font-bold">Error</p>
                  <p className="text-sm">{formStatus.account.error.message}</p>
                </div>
              </div>
            </div>}
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
