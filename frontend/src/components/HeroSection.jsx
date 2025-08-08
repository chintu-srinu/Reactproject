
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    if (!query.trim()) return
    dispatch(setSearchedQuery(query))
    navigate('/browse')
  }

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center min-h-[80vh] px-6 py-20 bg-gradient-to-tr from-indigo-900 via-purple-800 to-pink-700 overflow-hidden"
    >
      {/* Blurred overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md z-0"></div>

      {/* Animated Background Circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-600 rounded-full opacity-30 animate-pulse mix-blend-multiply filter blur-3xl"></div>
      <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-indigo-500 rounded-full opacity-30 animate-pulse mix-blend-multiply filter blur-3xl"></div>

      {/* Content wrapper with relative z-index */}
      <div className="relative z-10 max-w-4xl w-full">
        {/* Badge */}
        <span className="inline-block px-6 py-2 rounded-full bg-white text-pink-600 font-semibold uppercase tracking-wider shadow-lg">
          No. 1 Job Hunt Website
        </span>

        {/* Heading */}
        <h1
          className="mt-6 text-6xl sm:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-fadeIn"
          style={{ animationDuration: '2s' }}
        >
          Search, Apply &amp; <br /> Get Your{' '}
          <span className="text-white">Dream Jobs</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-gray-200 max-w-xl mx-auto">
          Your next career opportunity is just a few clicks away. Join thousands of
          job seekers finding their dream roles every day.
        </p>

        {/* Search Input */}
        <div className="mt-10 flex rounded-full bg-white shadow-xl overflow-hidden max-w-lg mx-auto">
          <input
            type="text"
            aria-label="Search jobs"
            placeholder="Find your dream jobs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
            className="flex-grow px-6 py-4 text-lg outline-none text-gray-900 placeholder-gray-400"
          />
          <Button
            onClick={searchJobHandler}
            className="bg-pink-600 hover:bg-pink-700 active:bg-pink-800 rounded-full px-6 flex items-center justify-center transition-colors"
            aria-label="Search"
          >
            <Search className="w-6 h-6 text-white" />
          </Button>
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 500px) {
          section {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }
          h1 {
            font-size: 2.5rem !important;
            line-height: 1.2;
          }
          p {
            font-size: 1rem;
            padding: 0 1rem;
          }
          input {
            font-size: 1rem;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          div.mt-10 {
            max-width: 100% !important;
            margin-left: 1rem;
            margin-right: 1rem;
          }
        }
      `}</style>
    </section>
  )
}

export default HeroSection
