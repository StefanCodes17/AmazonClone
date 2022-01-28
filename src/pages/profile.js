import Header from '../components/Header'
import { getSession } from 'next-auth/react'
import {signOut} from "next-auth/react"
import ProfileSub from "../components/profileSub"
import { LogoutIcon, InboxIcon, UserCircleIcon, ShoppingBagIcon } from '@heroicons/react/outline'

export default function Profile() {
  return (
    <div>
      <Header/>
      <div className='p-3'>
        <div className='max-w-2xl'>
          <h2 className='text-2xl'>Your Account</h2>
        </div>
        <div className='max-w-4xl m-auto w-fit'>
          <div className='m-auto pt-5 space-y-5 md:grid grid-cols-3 gap-4 items-end'>
            <ProfileSub text="Verify Email" subtext="Get a verification code sent to your main email" icon={<InboxIcon className='h-6 text-white'/>}/>
            <ProfileSub text="Profile" subtext="Edit login, name, mobile number" icon={<UserCircleIcon className='h-6 text-white'/>}/>
            <ProfileSub text="Your Orders" subtext="Track, return, or buy things again" icon={<ShoppingBagIcon className='h-6 text-white'/>}/>
            <ProfileSub text="Sign Out" icon={<LogoutIcon className='h-6 text-white' onClick={signOut}/>}/>
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