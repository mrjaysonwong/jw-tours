import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  authSignInCredentials,
  authSignInEmail,
  authSignInOAuth,
} from './utils/helper/authSignIn';
import { findUser } from './utils/helper/findUser';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
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
        if (credentials) {
          const user = await authSignInEmail(credentials);

          if (user) {
            return user;
          }
        }
        return null;
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials, req) {
        if (credentials) {
          const user = await authSignInCredentials(credentials, req);

          if (user) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // if signed in using OAuth
      if (user && profile) {
        await authSignInOAuth(user, account);
        return true;
      } else if (user) {
        return true;
      }
    },

    async jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        const userExists = await findUser(token.user.email);

        session.user = token.user;
        session.user.id = userExists.id;
        session.user.role = userExists.role;

        return session;
      }
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/signin',
    error: '/error',
  },
  trustHost: true,
});
