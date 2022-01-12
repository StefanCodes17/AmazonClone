import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const options = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.CLIENT_GOOGLE_ID,
        clientSecret: process.env.CLIENT_GOOGLE_SECRET,
      }),
  ],
  secret: process.env.NX_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified
      }
      return true
    },
  }
}

export default (req, res) => NextAuth(req, res, options)