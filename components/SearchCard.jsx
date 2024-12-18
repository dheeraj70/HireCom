'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

const SearchCard = ({ post, saved }) => {
  const [savedd, setSavedd] = useState(false); // Local state
  const [funsaved, setfunsaved] = useState(true);
  const testJob = post;
  const { data: session } = useSession();

  // Sync savedd state when saved prop changes
  useEffect(() => {
    setSavedd(saved);
  }, [saved]);

  const saveJob = async (jobId) => {
    if (!session) {
      alert("Please sign in to save jobs.");
      return;
    }

    try {
      // Optimistically update state
      setSavedd((prev) => !prev);
      setfunsaved(true);

      const res = await fetch("/api/save-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
      } else {
        // Revert state on failure
        setSavedd((prev) => !prev);
        alert(data.message);
      }
    } catch (error) {
      console.error("Failed to save job:", error);
      // Revert state on error
      setSavedd((prev) => !prev);
    }
  };
  const UnsaveJob = async (jobId) => {
    if (!session) {
      alert("Please sign in to save jobs.");
      return;
    }

    try {
      // Optimistically update state
      setfunsaved(false);

      const res = await fetch("/api/unsave-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
      } else {
        // Revert state on failure
        setfunsaved(true);
        alert(data.message);
      }
    } catch (error) {
      console.error("Failed to unsave job:", error);
      // Revert state on error
      setSavedd((prev) => !prev);
    }
  };

  return (
    <div className='flex flex-col lg:flex-row justify-center lg:justify-between gap-3 lg:gap-4 lg:items-center lg:h-[150px] h-[275px] bg-white rounded-lg shadow-lg border border-gray-400 p-3 pt-12 lg:pt-3 pl-1 pr-1 lg:pl-6 lg:pr-6 relative overflow-hidden'>
      <div className='flex gap-6 max-w-[100%] lg:max-w-[70%]'>
        <div className='aspect-square w-[90px] h-[90px] p-3 border border-grey-950 rounded-lg'>
          <img
            className='h-full w-full object-cover'
            src={testJob.employer_logo || '/logo-placeholder.png'}
            alt="Employer"
          />
        </div>
        <div className='leading-6 w-fit flex flex-col gap-1'>
          <p className='lg:text-[20px] text-[15px] pb-0 font-normal'>
            {testJob.employer_name}{' '}
            <span className='text-[15px]'>
              {testJob.job_is_remote && "(Remote)"}
            </span>
          </p>
          <p className='lg:text-[25px] text-[20px] font-semibold'>{testJob.job_title}</p>
          <div className='hidden lg:flex gap-3 mt-2'>
            <div className='bg-slate-300 pl-2 pr-2 rounded-xl'>
              <i className="fa-solid fa-location-dot mr-1"></i>  
              {testJob.job_location}, {testJob.job_country}
            </div>
            <div className='bg-slate-300 pl-2 pr-2 rounded-xl'>
              <i className="fa-solid fa-suitcase mr-1"></i>  
              {testJob.job_employment_type}
            </div>
            <div className='bg-slate-300 pl-2 pr-2 rounded-xl'>
              <i className="fa-solid fa-wallet mr-1"></i>  
              {testJob.job_salary ? testJob.job_salary : 'Not Disclosed'}
            </div>
          </div>
        </div>
      </div>
      <div className='flex lg:hidden gap-3 mt-2 justify-center'>
            <div className='bg-slate-300 p-1 rounded-xl text-[14px]'>
              <i className="fa-solid fa-location-dot mr-1"></i>  
              {testJob.job_location}, {testJob.job_country}
            </div>
            <div className='bg-slate-300 p-1 text-[14px] rounded-xl'>
              <i className="fa-solid fa-suitcase mr-1"></i>  
              {testJob.job_employment_type}
            </div>
            <div className='bg-slate-300 p-1 rounded-xl text-[14px]'>
              <i className="fa-solid fa-wallet mr-1"></i>  
              {testJob.job_salary ? testJob.job_salary : 'Not Disclosed'}
            </div>
          </div>
      <div className='flex justify-center lg:justify-start flex-row gap-5'>
      
        <button className='bg-slate-800 text-white p-2 rounded-md min-w-fit'>
          Apply Now
        </button>
        <button className='bg-slate-600 text-white p-2 rounded-md min-w-fit'>
          Learn More
        </button>
      </div>

      
        {(saved||savedd) && funsaved ? (
          <div
          onClick={() => {
            UnsaveJob(testJob.job_id);
          }}
          className='absolute right-48 bg-gray-300 p-1 pl-2 pr-2 top-0 rounded-bl-md rounded-br-md cursor-pointer'
        >
            <i className="fa-solid fa-bookmark"></i> Saved
            </div>
        ) : (
          <div
        onClick={() => {
          saveJob(testJob.job_id);
        }}
        className='absolute right-48 bg-gray-300 p-1 pl-2 pr-2 top-0 rounded-bl-md rounded-br-md cursor-pointer'
      >
            <i className="fa-regular fa-bookmark"></i> Save
            </div>
        )}
      

      <div className='absolute bg-gray-300 p-1 right-0 top-0 rounded-bl-md font-extrabold'>
        <p className='font-normal'>
          Posted : {testJob.job_posted_at ? testJob.job_posted_at : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default SearchCard;
