'use client'

import SearchCard from '@/components/SearchCard'
import { useEffect, useState } from 'react';

const SearchResult = ({ searchResults ,query}) => {

  const [jobids, setjobids] = useState([]);
  const getSavedJobsIds = async()=>{
    const res = await fetch('/api/saved-job-ids');
    const {jobIds} = await res.json();
    setjobids(jobIds);
  }

  useEffect(()=>{
    getSavedJobsIds();
  },[])
 
  return (
    <div className='mt-16 lg:mt-auto pl-5 pr-5 lg:pl-52 lg:pr-52'>
      <h1 className='mt-4 mb-2 text-[24px]'>Search Results for '{query}'</h1>
      
      <div className='flex flex-col gap-8'>
      {
        (searchResults.length === 0)?(
          <h1>Loading...</h1>
        ):(
          (searchResults).map((i,index)=>{
            if(jobids.includes(i.job_id)){
              return <SearchCard key={index} post={i} saved={true}/>
            }else{
              return <SearchCard key={index} post={i} saved={false}/>

            }
          })
        )
      }
      </div>
      

    </div>
  );
};

export default SearchResult;
