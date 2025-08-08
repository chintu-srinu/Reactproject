



import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'

const shortlistingStatus = ['Accepted', 'Rejected']

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application)

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      )
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[600px] text-sm sm:text-base">
        <TableCaption className="text-xs sm:text-sm text-gray-500">
          A list of your recent applied users
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">Full Name</TableHead>
            <TableHead className="min-w-[180px]">Email</TableHead>
            <TableHead className="min-w-[120px]">Contact</TableHead>
            <TableHead className="min-w-[130px]">Resume</TableHead>
            <TableHead className="min-w-[100px]">Date</TableHead>
            <TableHead className="text-right min-w-[60px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="whitespace-normal max-w-[150px] break-words">
                {item?.applicant?.fullname || 'N/A'}
              </TableCell>
              <TableCell className="whitespace-normal max-w-[180px] break-words">
                {item?.applicant?.email || 'N/A'}
              </TableCell>
              <TableCell className="whitespace-normal max-w-[120px] break-words">
                {item?.applicant?.phoneNumber || 'N/A'}
              </TableCell>
              <TableCell className="whitespace-normal max-w-[130px] break-words">
                {item?.applicant?.profile?.resume ? (
                  <a
                    href={item.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {item.applicant.profile.resumeOriginalName || 'View Resume'}
                  </a>
                ) : (
                  'NA'
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {item?.applicant?.createdAt
                  ? item.applicant.createdAt.split('T')[0]
                  : 'N/A'}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-1 hover:bg-gray-100 rounded-full">
                      <MoreHorizontal size={18} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-32 text-sm">
                    {shortlistingStatus.map((status, index) => (
                      <div
                        key={index}
                        onClick={() => statusHandler(status, item._id)}
                        className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                      >
                        {status}
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable
