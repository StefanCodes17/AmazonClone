import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

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
          username: { label: "username", type: "text", placeholder: "jsmith" },
          password: { label: "password", type: "password" }
        },
        async authorize(credentials, req) {
          const {email, password} = credentials
          // Add logic here to look up the user from the credentials supplied
          const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }
    
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null
            
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter        
          }
        }
      })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NX_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified
      }
      return true
    }
  }
}

export default (req, res) => NextAuth(req, res, options)