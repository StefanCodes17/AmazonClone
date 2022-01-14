import { useEffect } from "react";
import { CheckIcon } from "@heroicons/react/solid"
import { useSelector } from "react-redux";
import {selectStatus} from '../slices/basketSlice'

const Popup = ({show, setShow}) => {
    
    const status = useSelector(selectStatus)

    const config = {
        confirm: "bg-green-600 border border-green-700",
        warning: "bg-yellow-600 border border-yellow-700"
    }

    const messages={
        confirm: "Successfully added product to cart",
        warning: "Cart size exceeded for single order"
    }

    return (
        <div 
        className={`${!show ? "hidden": "block animate-bounce"} flex items-center fixed top-5 ${config[status]} rounded-md px-3 py-2 text-white text-sm z-50`}
        onAnimationEnd={()=>setShow(false)}
        >
            <CheckIcon className="w-4 mr-2"/>
            {messages[status]}
        </div>
    )
}

export default Popup
