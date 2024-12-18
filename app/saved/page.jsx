'use client'

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import SearchCard from '@/components/SearchCard'

const Saved = () => {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState([]);
  //console.log(session);

  const fetchSaved = async()=>{
    const res = await fetch('/api/saved-jobs');
    const {savedJobs} = await res.json();
   // console.log(savedJobs)
    setJobs(savedJobs);
  }

  useEffect(()=>{
    fetchSaved();
  },[])
  return (
    <div className='mt-16 lg:mt-auto pl-5 pr-5 lg:pl-52 lg:pr-52'>
      <h1 className='mt-4 mb-2 text-[24px]'>Your saved jobs:</h1>
      
      <div className='flex flex-col gap-8'>
      {
        (jobs.length === 0)?(
          <h1>Loading...</h1>
        ):(
          jobs.map((i,index)=>{
            return <SearchCard key={index} post={i} saved={true}/>
          })
        )
      }
      </div>
      

    </div>
    
  )
}

export default Saved