import { connectToDB } from "@/utils/database";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        //console.log(session);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDB();
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const jobIds = user.savedJobs;

        

        return NextResponse.json({ jobIds });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
