import moment from "moment"

const Order = ({id, amount, amountShipping, items, timestamp, images}) => {
    return (
        <div className="relative border rounded-md">
            <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                <div>
                    <p className="font-bold text-xs whitespace-nowrap">Order Placed</p>
                    <p>{moment(timestamp).format('LL')}</p> 
                </div>
                <div>
                    <p className="font-bold text-xs">Total</p>
                    <p>
                        ${amount} - Next Day Delivery{" "} ${amountShipping}
                    </p>
                </div>
                <p className="text-sm sm:text-lg whitespace-nowrap self-end flex-1 text-right text-blue-500">{items.reduce((acc, it) => acc += it.quantity, 0)} item{items.length > 1 ? "s" : null}</p>
                <p className="absolute top-2 right-2 w-40 lg:w-72 truncate whitespace-nowrap">Order # {id}</p>
            </div>
            <div className="p-5">
                <div className="flex space-x-6 overflow-x-auto">
                    {items.map( (it, i) =>(
                        <div className="flex flex-col spacey-2 text-center" key={i}>
                            <img key={images[i].substring(0, 5)} src={images[i]} alt={images[i]} className="h-20 object-contain sm:h-32" />
                            <p className="text-sm">{it.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Order
