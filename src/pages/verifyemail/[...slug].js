import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'
import {useEffect} from 'react'
import { UpdateUserVerification } from '../../util/User'


const VerifyEmail = () => {
  return(
      <div></div>
  )
}

export async function getServerSideProps({query}){
  const {slug} = query
  const token = jwt.verify(slug[0], process.env.NX_SECRET)
  if(token){
    UpdateUserVerification(token.email)
    return {
      redirect:{
      permanent: false,
      destination: "/auth/signin"
      }
    }
  }
}


export default VerifyEmail