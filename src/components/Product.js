import Image from 'next/image'
import {StarIcon} from '@heroicons/react/solid'
import { useDispatch } from 'react-redux'
import {addToBasket} from '../slices/basketSlice'
import { useState, useCallback } from 'react'

const Product = ({id, title, price, description, category, image, setShow}) => {
    const [rating] = useState(Math.floor(Math.random() * 5 + 1))
    const [hasPrime] = useState(Math.random() < 0.5)
    const dispatch = useDispatch()
    const addToCart = useCallback(()=>{
        const product = {
            id, title, price, description, category, image, rating, hasPrime
        }
        dispatch(addToBasket(product))
        setShow(true)
    }, [id, title, price, description, category, image])

    return (
        <div className='relative flex flex-col m-5 bg-white z-20 p-10'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>

            <Image src={image} height={200} width={200} objectFit="contain" />
            <h4 className='my-3'>{title}</h4>
            <div className='flex'>
                {Array(rating).fill().map((_, i) =>(
                    <StarIcon className='h-5 text-yellow-500' key={i}/>
                ))}
            </div>
            <p className='text-xs mt-2 my-2 line-clamp-2'>{description}</p>
            <div className='mb-5'>
                {new Intl.NumberFormat('en-IN', {currency: "USD", style:"currency"}).format(price)}
            </div>
            {hasPrime && (
                <div className='flex items-center space-x-2 -mt-5'>
                    <img className='w-12' src="https://links.papareact.com/fdw" alt="prime"/>
                <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
            </div>
            )}
            
            <button className='mt-auto button' onClick={addToCart}>Add to Cart</button>

        </div>
    )
}

export default Product
