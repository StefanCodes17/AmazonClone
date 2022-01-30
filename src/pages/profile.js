import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/react'
import {signOut} from "next-auth/react"
import ProfileSub from "../components/profileSub"
import { LogoutIcon, InboxIcon, UserCircleIcon, ShoppingBagIcon, } from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()
  return (
    <div>
      <Header/>
      <div className='p-3'>
        <div className='max-w-2xl relative w-fit'>
          <h2 className='text-2xl'>Your Account</h2>
          {session?.user?.email_verified && <CheckCircleIcon className='w-5 absolute -top-0.5 -right-5 text-green-600'/>}
        </div>
        <div className='max-w-4xl m-auto w-fit'>
          <div className='m-auto pt-5 space-y-5 md:grid grid-cols-3 gap-4 items-end'>
            {!session?.user?.email_verified && <ProfileSub text="Verify Email" subtext="Get a verification code sent to your main email" icon={<InboxIcon className='h-6 text-white'/>}/>}
            <ProfileSub text="Profile" subtext="Edit login, name, mobile number" icon={<UserCircleIcon className='h-6 text-white'/>}/>
            <ProfileSub text="Your Orders" subtext="Track, return, or buy things again" icon={<ShoppingBagIcon className='h-6 text-white'/>} onClick={()=>router.push("/orders")}/>
            <ProfileSub text="Sign Out" icon={<LogoutIcon className='h-6 text-white'/>} onClick={signOut}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context){
    const session = await getSession(context)
    if(!session?.user){
      return{
        redirect:{
          permanent: false,
          destination: "/"
        }
      }
    }
  return {
    props: {}
  }
}