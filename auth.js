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
import {
  findUserByEmail,
  findUserById,
  constructUserObject,
} from './utils/helper/query/User';

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
      } else {
        return true;
      }
    },

    async jwt({ token, user, trigger, account, profile, session }) {
      // authenticated
      if (trigger === 'update' && token.user) {
        const userExists = await findUserById(token.user.id);
        token.user = await constructUserObject(userExists);
      } else if (user) {
        // isAuthenticating
        const userExists = await findUserById(user.id);
        token.user = await constructUserObject(userExists);
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/signin',
    error: '/error',
  },
  trustHost: true,
});
