import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import {AddUser, SignInUser} from '../../../util/User'

const options = {
  session: { 
    strategy: "jwt" 
  },
  providers: [
    GoogleProvider({
        clientId: process.env.CLIENT_GOOGLE_ID,
        clientSecret: process.env.CLIENT_GOOGLE_SECRET,
      }),
      CredentialsProvider({
        id: "credentials",
        name: "",
        credentials: {
          email: { label: "email", type: "text", placeholder: "jsmith" },
          password: { label: "password", type: "password" }
        },
        async authorize(credentials, req) {
          const {email, password} = credentials
          return SignInUser(email, password)
        }
      })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NX_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google" && profile.email_verified) {
        const {name, email, picture, email_verified} = profile
        const user = AddUser({name, email, picture, email_verified})
        if(user){
          return true
        }else{
          return null
        }
      }
      return true
    }
  }
}

export default (req, res) => NextAuth(req, res, options)