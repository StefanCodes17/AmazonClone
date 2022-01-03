import Head from 'next/head'

import Header from '../components/Header'
import Banner from '../components/Banner'
import ProductFeed from '../components/ProductFeed'

export default function Home({products}) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon</title>
      </Head>

      <Header/>

    <main className='max-w-screen-2xl mx-auto px-3'>
      <Banner/>
      <ProductFeed products={products}/>

    </main>

    </div>
  )
}

export async function getServerSideProps(context){
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const products = await fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  return {
    props: {
      products
    }
  }
}