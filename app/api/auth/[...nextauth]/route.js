import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/User";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    
    // ...add more providers here
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser?._id.toString();
      return session;
    },
    async signIn({ profile }) {
      //console.log(profile.email);
      try {
        await connectToDB();

        const userExists = await User.findOne({
          email: profile.email,
        });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name ? profile.name.replace(" ", "").toLowerCase() : "defaultusername",
            image: profile.picture || "defaultimageurl",
            savedJobs: [],
          });
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Deny sign-in
      }
    },
  },
}

const handler = NextAuth(authOptions);
  
export {handler as GET, handler as POST}