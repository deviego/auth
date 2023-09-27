import NextAuth, { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"

const nextAuthOptions : NextAuthOptions = { 
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text'
        },
        password: {
          label: 'password',
          type: 'text'
        },
      },



      async authorize(credentials, req){ 
        const response = await fetch('http//localhost:3002/login', { 
          method: 'POST', 
          headers: { 
            'Content-Type': 'application/json;charset=utf8',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          
          })
        })
        const user = await response.json()

        if(user && response.ok){ 
          return user
        }
        return null 
      }

    })
  ],
  pages: { 
    signIn: '/',

  }
}




const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }