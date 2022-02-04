import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'
import {useEffect} from 'react'
import { UpdateUserVerification } from '../../util/User'


const VerifyEmail = () => {
  const router = useRouter()
  const {slug} = router.query
  useEffect(()=>{
    if(slug){
      const token = jwt.verify(slug[0], process.env.NX_SECRET)
      UpdateUserVerification(token.email)
      router.push("/")
    }
  }, [slug])

  return(
      <div>Verifying email...</div>
  )
}

export default VerifyEmail