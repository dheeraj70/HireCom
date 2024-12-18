
import { NextResponse, NextRequest } from "next/server";

export async function GET(NextRequest) {
    try {
        
        const url = new URL(NextRequest.url);
        const searchParams = new URLSearchParams(url.searchParams);
        //console.log(searchParams.get('title'));
        const query = searchParams.get('query');
        const country = searchParams.get('country');
        const results = await fetch(
            `https://jsearch.p.rapidapi.com/search?query=${query}&page=1&num_pages=1&country=${country}&date_posted=all`,
            {
              method: 'GET',
              headers: {
                'X-Rapidapi-Key': process.env.RAPID_JSEARCH_KEY,
                'X-Rapidapi-Host': 'jsearch.p.rapidapi.com',
              },
            }
          );
    
          if (!results.ok) {
            throw new Error(`Error fetching data: ${results.statusText}`);
          }
    
          let {data}= await (results.json());
          
          //const dat = data.dat;
          
          
          //console.log(data);
          

        return NextResponse.json({data}, {status: 200})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Server Error"}, {status: 500})
    }
}