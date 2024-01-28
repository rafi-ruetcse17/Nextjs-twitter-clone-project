import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/config/connectDB";
import { findUser } from "@/libs/services/user-service";
import { findOne } from "@/libs/controllers/userController";

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
        try{
          const user = await findUser(credentials);
          return user;
        }catch(error){
          console.log("errr", error.message);
          throw Error(error.message)
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token, user }) {
      //session.user._id = token.sub
      const res = await findOne({
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
      });
      //console.log("hehe", res);
      session.user.username = res.username;
      session.user.name = res.name;
      session.user._id = res._id;
      //if(!session?.user?.image)
      if(res?.image)
        session.user.image = res.image;
      return session;
    },
  },

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
