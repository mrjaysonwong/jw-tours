import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authSignin } from './utils/helper/authUser';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    CredentialsProvider({
      id: 'email',
      name: 'email',
      async authorize(credentials, req) {
        const user = await authSignin(credentials);

        if (user) {
          return user;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, email, profile, credentials }) {
      if (user) {
        return true;
      } else {
        return false;
      }
    },

    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  trustHost: true,
});
