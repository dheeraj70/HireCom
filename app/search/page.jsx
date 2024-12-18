import SearchCard from '@/components/SearchCard'
import SearchResult from '@/components/SearchResult';
import React from 'react';
import { Suspense } from 'react';
const page = async ({ searchParams }) => {
  const params = await searchParams;
  const query =params.query || '';
  const country =params.country || 'in';

  const searchQuery = async (query) =>{
    const results = await fetch(
      `${process.env.NEXTAUTH_URL}/api/search?query=${query}&country=${country}`
    );

    if (!results.ok) {
      throw new Error(`Error fetching data: ${results.statusText}`);
    }

    const {data} = await results.json();
    return data;
  }

  let searchResults = [];
  try {
    searchResults = await searchQuery(query);
    //console.log(searchResults)
  } catch (error) {
    console.error("Error fetching search results:", error);
    searchResults = [];
  }
  

  return (
    <Suspense>
    <SearchResult searchResults={searchResults} query={query}/>
    </Suspense>
  )
}

export default page