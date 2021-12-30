import Image from 'next/image'
import { useSelector } from 'react-redux'

import Header from "../components/Header"
import CheckoutProduct from '../components/CheckoutProduct'
import { selectItems } from '../slices/basketSlice'

const Checkout = () => {
    const items = useSelector(selectItems)

    const getSubtotal = ()=>{
        let sum = 0
        items.map(item => sum += item.price)
        return sum
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
                <div className='bg-white p-5 whitespace-nowrap'>
                    {items.length > 0 &&
                    <>
                        <h2>Subtotal ({items.length} items)</h2>
                        <span className='font-bold'>${getSubtotal()}</span>
                    </>}
                </div>
            </main>
        </div>
    )
}

export default Checkout

