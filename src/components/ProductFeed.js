import Product from '../components/Product'

const ProductFeed = ({products}) => {
    return (
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4 md:-mt-52'>
            {products.slice(0, 4).map(product =>(
                <Product {...product} key={product.id}/>
            ))}

            <img className="md: col-span-full" src="https://links.papareact.com/dyz" alt=""></img>

            <div className='md:col-span-2 '>
                {products.slice(4, 5).map(product => (
                    <Product {...product} key={product.id}/>
                ))}
            </div>

                {products.slice(5).map(product => (
                    <Product {...product} key={product.id}/>
                ))}

        </div>
    )
}

export default ProductFeed
