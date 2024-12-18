import { connectToDB } from "@/utils/database";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        console.log(session);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDB();
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const jobIds = user.savedJobs;

        // Use Promise.all() to handle the array of promises properly
        const savedJobs = await Promise.all(
            jobIds.map(async (element) => {
                const res = await fetch(
                    `https://jsearch.p.rapidapi.com/job-details?job_id=${element}`,
                    {
                        method: 'GET',
                        headers: {
                            'X-Rapidapi-Key': process.env.RAPID_JSEARCH_KEY,
                            'X-Rapidapi-Host': 'jsearch.p.rapidapi.com',
                        },
                    }
                );

                const dat = (await res.json()).data;
                
                return dat[0]; // Return the fetched data so it's added to the savedJobs array
            })
        );

        return NextResponse.json({ savedJobs });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
