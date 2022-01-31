import { getSession } from 'next-auth/react';
import React, { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { HomeIcon, ShoppingBagIcon, UserGroupIcon } from '@heroicons/react/solid'

const Dashboard = () => {

    const [active, setActive] = useState("das")

  return (
  <div>
      <div id="sidebar" className="p-4 bg-gray-100 h-screen">
        <Link href="/" replace={true}>
                            <Image 
                            src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"} 
                            width={150}
                            height={40}
                            objectFit='contain'
                            className='cursor-pointer'
                            />
            </Link>
            <div id="links" className='mt-24 p-5 text-lg'>
                <ul className='space-y-2'>
                    <li className='flex'>
                        <HomeIcon className='w-5 text-amazon_blue mr-1'/>
                        Dashboard
                    </li>
                    <li className='flex'>
                        <ShoppingBagIcon className='mr-1 w-5 text-amazon_blue'/>
                        Orders
                    </li>
                    <li className='flex'>
                        <UserGroupIcon className='mr-1 w-5 text-amazon_blue'/>
                        Users
                    </li>
                </ul>
            </div>
      </div>
  </div>
  )
};

export default Dashboard;

export async function getServerSideProps(context){
    const session = await getSession(context)
    console.log(session)
    if(session?.user?.email != "admin.admin@gmail.com" || !session || session?.user?.role != 0){
        return {
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
