import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'
import {useEffect} from 'react'

const secret = process.env.NX_SECRET

const VerifyEmail = () => {
  const router = useRouter()
  const { slug } = router.query
  useEffect(() =>{
    const token = jwt.verify(slug[0], secret)
    console.log(token)
  }, [])

return(
    <div>Verifying email...</div>
)
}

export default VerifyEmail