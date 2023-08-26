import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from "@/models/user";
import { compare } from 'bcryptjs';
import { signJwtAccessToken } from "@/helpers/jwt";
import { dbConnection } from "@/dbConfig/connection";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        try {
          await dbConnection();

          const { email, password } = credentials;

          const user = await User.findOne({ email });

          const userData = { 
                          id:user._id,
                          username:user.username,
                          email: user.email,
                          role:user.role, 
                        }; 

          if (user) {
            const validPassword = await compare(password, user.password);

            if (validPassword) {
              const accessToken = signJwtAccessToken(userData);

              return {...userData, accessToken};
            } else {
              throw new Error('Password Is Wrong!');
            }
          } else {
            throw new Error('User Not Found!');
          }
        } catch (error) {
          console.log(error)
          throw new Error(`Authentication Error: ${error.message}`);
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return {
        ...token,
        ...user
      };
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.username;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.role = token.role;
      session.user.token = token.accessToken;
      return session;
    }
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  }
});

export  { handler as POST, handler as GET };
