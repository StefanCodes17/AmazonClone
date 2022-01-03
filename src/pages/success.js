import Header from '../components/Header'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

const Success = () => {
    const router = useRouter();

    return (
        <div className="bg-gray-100 h-screen">
            <Header/>
            
            <main className='mx-auto max-w-screen-lg'>
                <div className='flex flex-col p-10 bg-white'>
                    <div className='flex items-center space-x-2 mb-5'>
                        <CheckCircleIcon className='h-8 text-green-600'/>
                        <h1 className="text-2xl">Thank you, your order has been confirmed!</h1>
                    </div>
                    <p>
                    Thank you for shopping with us. We'll send a confirmation once your item has shipped, if you would like to check the status of your order(s) please press the link below.
                    </p>
                    <button onClick={()=> router.push('/orders')} className='button mt-8'>Go to my orders</button>
                </div>
            </main>
        </div>
    )
}

export default Success
