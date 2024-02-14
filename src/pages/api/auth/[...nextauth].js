import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/config/connectDB";
import { loginUser, loginWithSNS } from "@/libs/services/user-service";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Crendentials",
      async authorize(credentials, req) {
        await connectDB();
        try {
          const user = await loginUser(credentials);
          return user;
        } catch (error) {
          throw Error(error.message);
        }
      },
    }),
  ],

  callbacks: {
    async session({ session }) {
      await connectDB();
      const res = await loginWithSNS({
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
      });

      session.user.username = res.username;
      session.user.name = res.name;
      session.user._id = res._id;

      if (res?.image) session.user.image = res.image;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
