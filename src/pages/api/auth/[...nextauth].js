import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const options = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
  ],
}

export default (req, res) => NextAuth(req, res, options)