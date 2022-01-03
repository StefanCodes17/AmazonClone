import Image from 'next/image'
import { useSelector } from 'react-redux'

import Header from "../components/Header"
import CheckoutProduct from '../components/CheckoutProduct'
import { selectItems, selectSubTotal } from '../slices/basketSlice'
import { useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js'
import axios from "axios"

const stripePromise = loadStripe(
    process.env.stripe_public_key
)

const Checkout = () => {
    const { data: session, status } = useSession()

    const items = useSelector(selectItems)
    const subTotal = useSelector(selectSubTotal)

    const createCheckoutSession = async ()=>{
        const stripe = await stripePromise;
        const checkoutSession = await axios.post(
            '/api/create-checkout-session',
            {
                items,
                email: session.user.email
            })

        const res = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if(res.error) alert(res.error.message)
    }

    return (
        <div className="bg-gray-100">
            <Header/>
            <main className="lg:flex max-w-screen-2xl mx-auto">
                <div className='flex-grow m-5 shadow-sm'>
                    <Image 
                    src="https://links.papareact.com/ikj" 
                    width={1020}
                    height={250}
                    alt=""
                    objectFit="contain"/>

                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-2xl border-b pb-4'>
                            {items.length === 0 ? "Your Cart is Empty" : "Your Shopping Cart"}
                        </h1>

                        {items.map((item, i)=>(
                            <CheckoutProduct {...item} key={item.id}/>
                        ))}

                    </div>
                </div>
                {/*--- Right Hand Side---*/}
                <div className='flex flex-col bg-white p-10 shadow-md'>
                    {items.length > 0 &&
                    <>
                        <h2 className='whitespace-nowrap'>Subtotal ({items.length} items):
                            <span className='font-bold'> ${subTotal}</span>
                        </h2>

                        <button 
                        role="link"
                        disabled={!session}
                        className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}
                        onClick={createCheckoutSession}
                        >
                            {!session ? "Sign in to checkout" : "Proceed to checkout"} 
                        </button>
                    </>
                    }
                </div>
            </main>
        </div>
    )
}

export default Checkout
