
import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job)
  const { user } = useSelector((store) => store.auth)

  const isInitiallyApplied =
    singleJob?.applications?.some((app) => app.applicant === user?._id) || false
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)

  const { id: jobId } = useParams()
  const dispatch = useDispatch()

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      })
      if (res.data.success) {
        setIsApplied(true)
        const updatedJob = {
          ...singleJob,
          applications: [...(singleJob.applications || []), { applicant: user?._id }],
        }
        dispatch(setSingleJob(updatedJob))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || 'Failed to apply')
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(
            res.data.job.applications?.some(
              (app) => app.applicant === user?._id
            ) || false
          )
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
        <div className="flex-1">
          <h1 className="font-bold text-2xl sm:text-3xl">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-3 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? undefined : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 py-3 text-white font-semibold whitespace-nowrap ${
            isApplied
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-[#7209b7] hover:bg-[#5f32ad]'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <h2 className="border-b-2 border-gray-300 font-medium pb-2 mb-6">Job Description</h2>

      <div className="space-y-4 text-gray-800 text-sm sm:text-base">
        <p>
          <strong>Role:</strong> {singleJob?.title || 'N/A'}
        </p>
        <p>
          <strong>Location:</strong> {singleJob?.location || 'N/A'}
        </p>
        <p>
          <strong>Description:</strong> {singleJob?.description || 'N/A'}
        </p>
        <p>
          <strong>Experience:</strong> {singleJob?.experience} yrs
         


        </p>
        <p>
          <strong>Salary:</strong> {singleJob?.salary} LPA
        </p>
        <p>
          <strong>Total Applicants:</strong> {singleJob?.applications?.length || 0}
        </p>
        <p>
          <strong>Posted Date:</strong>{' '}
          {singleJob?.createdAt ? singleJob.createdAt.split('T')[0] : 'N/A'}
        </p>
      </div>
    </div>
  )
}

export default JobDescription