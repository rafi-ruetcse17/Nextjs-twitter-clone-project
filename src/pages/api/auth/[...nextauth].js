import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/config/connectDB";
import { findUser } from "@/libs/services/user-service";

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
        const user = findUser(credentials);
        return user;
      },
    }),
  ],

  // callbacks: {
  //   async session({session, token, profile}){
  //     //console.log(token);
  //     if(profile){
  //       session.user.tag = session.user.name.split("").join("").toLocaleLowerCase()
  //       session.user.uid = token.sub
  //     }
  //     return session
  //   }
  // },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

// const user = await User.findOne({ email });

// if (!user) {
//   throw new Error("Incorrect Email..!");
// }

// const match = await bcrypt.compare(password, user.password);
// if (!match) {
//   throw Error("Incorrect password");
// }