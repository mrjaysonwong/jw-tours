import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  authSignInCredentials,
  authSignInEmail,
  authSignInOAuth,
  constructUserObject,
} from './helpers/authSignIn';
import { fetchUser } from './helpers/query/User';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

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
          // Sample demo for locales
          /*
          const cookieStore = cookies();
          const { value: locale } = cookieStore.get('NEXT_LOCALE');

          const t = await getTranslations({
            locale,
            namespace: 'signin_page',
          });
          */

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
      // if signed-in with OAuth
      if (user && profile) {
        await authSignInOAuth(user, account);

        return true;
      } else {
        return true;
      }
    },

    async jwt({ token, user, trigger, account, profile }) {
      if (trigger === 'update' && token.user) {
        // Use case updating fields
        // re-update token
        const userId = token.user.id;
        const data = await fetchUser({ userId });

        token.user = constructUserObject(data);
      } else if (user) {
        const email = user.email;
        const data = await fetchUser({ email });

        token.user = constructUserObject(data);
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
