import { useState } from 'react'
import Product from '../components/Product'
import Popup from './Popup'

const ProductFeed = ({products}) => {

    const [show, setShow] = useState(false)
    const [status, setStatus] = useState()
    const [message, setMessage] = useState()

    return (
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4 md:-mt-52'>
            {products.slice(0, 4).map(product =>(
                <Product {...product} key={product.id} setShow={setShow}/>
            ))}

            <img className="md: col-span-full mx-auto" src="https://links.papareact.com/dyz" alt=""></img>

            <div className='md:col-span-2 '>
                {products.slice(4, 5).map(product => (
                    <Product {...product} key={product.id} setShow={setShow}/>
                ))}
            </div>

                {products.slice(5).map(product => (
                    <Product {...product} key={product.id} setShow={setShow}/>
                ))}
            <Popup show={show} setShow={setShow} message={message} status={status}/>
        </div>
    )
}

export default ProductFeed
