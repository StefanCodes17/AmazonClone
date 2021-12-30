import { StarIcon } from "@heroicons/react/solid"
import Image from "next/image"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { removeFromBasket } from "../slices/basketSlice" 

const CheckoutProduct = ({id, title, price, description, category, image, rating, hasPrime}) => {

    const dispatch = useDispatch()
    const removeItemFromCart = useCallback(()=>{
        dispatch(removeFromBasket({id}))
    })

    return (
        <div className="grid grid-cols-5">
            <Image src={image} width={200} height={200} objectFit="contain" />
            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className="flex">
                    {Array(rating).fill().map((_, i)=>(
                    <StarIcon className="h-5 text-yellow-500" key={i}/>
                ))}
                </div>
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <p className="text-md">${price}</p>
 
                {hasPrime && 
                    <div className='flex items-center space-x-2'>
                        <img className="w-12" loading="lazy" src="https://links.papareact.com/fdw" alt="prime"/>
                        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                    </div>
                }
            </div>

            <div className="flex-col items-center justify-self-end my-2">
                <button className="button" onClick={removeItemFromCart}>Remove From Basket</button>
            </div>

        </div>
    )
}

export default CheckoutProduct
