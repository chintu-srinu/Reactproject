
import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, [dispatch]);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?fit=crop&w=1400&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
          <h1 className="font-extrabold text-white drop-shadow-lg text-2xl sm:text-3xl mb-6 text-center sm:text-left">
            Search Results ({allJobs.length})
          </h1>

          {allJobs.length === 0 ? (
            <p className="text-center text-gray-300 text-lg italic mt-20 drop-shadow-md">
              No jobs found matching your criteria.
            </p>
          ) : (
            <div className="bg-white bg-opacity-90 rounded-lg p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 shadow-lg">
              {allJobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Browse;

