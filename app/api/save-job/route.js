import { connectToDB } from "@/utils/database";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
        const data = await req.json();
      await connectToDB();

      
      const session = await getServerSession(authOptions);
      //console.log(authOptions);
      if (!session) return NextResponse.json({ error: "Unauthorized" },{ status:401});

      const { jobId } = data;
      
      const user = await User.findOne({ email: session.user.email });

      if (!user.savedJobs.includes(jobId)) {
        user.savedJobs.push(jobId);
        await user.save();
        return NextResponse.json({ message: "Job saved successfully" },{status:200});
      }

      return NextResponse.json({ message: "Job already saved" },{status:400});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Something went wrong" },{status:500});
    }

}
