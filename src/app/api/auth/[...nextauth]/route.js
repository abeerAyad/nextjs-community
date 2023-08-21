import {  NextAuth } from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials'
import User from "@/models/user";
import {compare} from 'bcryptjs'
import { signJwtAccessToken } from "@/helpers/jwt";

const handler = NextAuth({
    providers:[
        Credentials({
            name:'credentials',
            async authorize (credentials) {
                const {email, password} = credentials;
                const user = User.findOne({email}).select('-password');
                if(user) {
                    const validPassword = compare(password, user.password);
                    if(validPassword) {
                        const accessToken = signJwtAccessToken(user)
                        return {...user,token}
                    } else {
                        throw new Error('Password Is Wrong !')
                    }
                } else  {
                        throw new Error('User Not Found !')
                }
            }

        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        }),
         GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
    async jwt({ token, user }) {
      return {
        ...token, ...user
      }
    
    },
     async session({ session, token }) {
      session.user.id = token.id
      session.user.name = token.username
      session.user.email = token.email
      session.user.image = token.image
      session.user.role = token.role
      session.user.token = token.accessToken
      return session
    }
},
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  }
})

export {handler as POST, handler as GET}