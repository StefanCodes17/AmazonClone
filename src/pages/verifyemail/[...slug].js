import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'

const secret = process.env.NX_SECRET

const VerifyEmail = () => {
  const router = useRouter()
  const { slug } = router.query
  useEffect(() =>{
    const token = jwt.verify(slug[0], "sh")
  }, [])

return(
    <div>Verifying email...</div>
)
}

export default VerifyEmail