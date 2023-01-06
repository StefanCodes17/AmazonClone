import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import {AddGoogleUser, SignInUser} from '../../../util/User'

const options = {
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
          return await SignInUser(email, password)
        }
      })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NX_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "google" && profile.email_verified) {
        const {name, email, picture, email_verified} = profile
        const user = await AddGoogleUser({name, email, picture, email_verified, provider: "google"})
        if(user){
          return user
        }
        return null
      }
      return true
    },
    async jwt({token, user, account, profile, isNewUser}){
      console.log(user, profile)
      if(profile){ // handles google signin data
        token.email_verified = profile.email_verified
        token.role = 1
      }else if(user){ //handles credentials signin data
        token.email_verified = user.email_verified
        token.role = user?.role
      }
      return Promise.resolve(token)
    },
    async session({ session, token, user }) {
      session.user.email_verified = token.email_verified
      session.user.role = token?.role
      return Promise.resolve(session)
    },
  },
  session: {
    strategy: "jwt" 
  }
}

export default (req, res) => NextAuth(req, res, options)