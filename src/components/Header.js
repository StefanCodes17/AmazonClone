import Image from 'next/image'
import {MenuIcon, ShoppingCartIcon, SearchIcon } from '@heroicons/react/outline'
import {signIn, signOut, useSession} from "next-auth/react"
import {useRouter} from "next/router"
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'

const subLinks = [
    {
        text: "Prime Video",
    },
    {
        text: "Today's Deals",
    },
    {
        text: "Amazon Basics",
    },
    {
        text: "Best Sellers"
    },
    {
        text: "Luxury Stores"
    },
    {
        text: "Customer Service"
    },
    {
        text: "Coupons"
    }
]

const Header = () => {

    const { data: session, status } = useSession()
    const router = useRouter()
    const items = useSelector(selectItems)

    return (
        <header>
            {/*Top Nav*/}
            <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
                <div className='mt-2 flex items-center flex-grow sm:flex-grow-0' onClick={()=> router.push("/")}>
                    <Image 
                    src={"https://links.papareact.com/f90"} 
                    width={150}
                    height={40}
                    objectFit='contain'
                    className='cursor-pointer'
                    />
                </div>

                <div className='hidden sm:flex items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer flex-grow'>
                    <input type="text" className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"/>
                    <SearchIcon className="h-12 p-4"/>
                </div>

                <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                    <div className="main_link" onClick={!session ? signIn : signOut}>
                        <p>
                            {session ? `Hello ${session.user.name}` : `Sign In`}</p>
                        <p className="font-extrabold md:text-sm">Account &Lists</p>
                    </div>
                    <div className="main_link" onClick={()=>router.push('/orders')}>
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm">& Orders</p>
                    </div>
                    <div className=" relative main_link flex items-center" onClick={()=> router.push("/checkout")}>
                        <span className="absolute top-0 right-0 md:right-6 h-4 w-4 bg-yellow-400 rounded-full text-black font-bold text-center">
                            {items.length}
                        </span>
                        <ShoppingCartIcon className="h-10"/>
                        <p className="hidden md:inline font-extrabold md:text-sm mt-2">Cart</p>
                    </div>
                </div>

            </div>

            {/*Bottom Nav*/}
            <div className='flex items-center flex-grow flex-shrink bg-amazon_blue-light text-white px-4 h-10 text-md'>
                <div className='flex items-center sub_link'>
                    <MenuIcon className='h-6 mr-1'/>
                    <p>All</p>
                </div> 
                <div className='flex items-center overflow-x-auto'>
                {
                    subLinks.map(({text}, i) => (
                        <div className={` ${i > 2 && "hidden"} lg:inline-flex sub_link whitespace-nowrap`} key={text.substring(0, 4) + i}>
                            <p>{text}</p>
                        </div>
                    ))
                }
                </div>
            </div>
        </header>
    )
}

export default Header
