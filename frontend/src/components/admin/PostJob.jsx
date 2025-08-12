

// import React, { useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import { useSelector } from 'react-redux'
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../ui/select'
// import axios from 'axios'
// import { JOB_API_END_POINT } from '@/utils/constant'
// import { toast } from 'sonner'
// import { useNavigate } from 'react-router-dom'
// import { Loader2 } from 'lucide-react'

// const PostJob = () => {
//   const [input, setInput] = useState({
//     title: '',
//     description: '',
//     requirements: '',
//     salary: '',
//     location: '',
//     jobType: '',
//     experience: '',
//     position: 0,
//     companyId: '',
//   })
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()
//   const { companies } = useSelector(store => store.company)

//   const changeEventHandler = e => {
//     setInput({ ...input, [e.target.name]: e.target.value })
//   }

//   const selectChangeHandler = value => {
//     const selectedCompany = companies.find(
//       company => company.name.toLowerCase() === value
//     )
//     if (selectedCompany) {
//       setInput({ ...input, companyId: selectedCompany._id })
//     }
//   }

//   const submitHandler = async e => {
//     e.preventDefault()
//     if (!input.companyId) {
//       toast.error('Please select a company.')
//       return
//     }
//     try {
//       setLoading(true)
//       const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: true,
//       })
//       if (res.data.success) {
//         toast.success(res.data.message)
//         navigate('/admin/jobs')
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to post job.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center bg-fixed flex flex-col"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80')",
//       }}
//     >
//       <Navbar />
//       <div className="flex justify-center py-10 px-4 flex-grow">
//         <form
//           onSubmit={submitHandler}
//           className="w-full max-w-4xl bg-white bg-opacity-95 rounded-md shadow-lg p-6 sm:p-10 text-gray-900"
//         >
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             {[
//               { label: 'Title', name: 'title', type: 'text' },
//               { label: 'Description', name: 'description', type: 'text' },
//               { label: 'Requirements', name: 'requirements', type: 'text' },
//               { label: 'Salary', name: 'salary', type: 'text' },
//               { label: 'Location', name: 'location', type: 'text' },
//               { label: 'Job Type', name: 'jobType', type: 'text' },
//               { label: 'Experience Level', name: 'experience', type: 'text' },
//               { label: 'No of Positions', name: 'position', type: 'number' },
//             ].map(({ label, name, type }) => (
//               <div key={name}>
//                 <Label htmlFor={name}>{label}</Label>
//                 <Input
//                   id={name}
//                   name={name}
//                   type={type}
//                   value={input[name]}
//                   onChange={changeEventHandler}
//                   className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
//                   required={name !== 'position'}
//                   min={name === 'position' ? 0 : undefined}
//                 />
//               </div>
//             ))}

//             <div className="sm:col-span-2">
//               <Label>Company</Label>
//               {companies.length > 0 ? (
//                 <Select onValueChange={selectChangeHandler} defaultValue="">
//                   <SelectTrigger className="w-full max-w-xs">
//                     <SelectValue placeholder="Select a Company" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       {companies.map(company => (
//                         <SelectItem
//                           key={company._id}
//                           value={company.name.toLowerCase()}
//                         >
//                           {company.name}
//                         </SelectItem>
//                       ))}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//               ) : (
//                 <p className="text-xs text-red-600 font-semibold mt-2">
//                   *Please register a company first before posting jobs.
//                 </p>
//               )}
//             </div>
//           </div>

//           <Button
//             type="submit"
//             className="w-full mt-6"
//             disabled={loading || companies.length === 0}
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                 Posting...
//               </>
//             ) : (
//               'Post New Job'
//             )}
//           </Button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default PostJob


import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import axios from 'axios'
import Cookie from 'js-cookie'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: 0,
    companyId: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { companies } = useSelector(store => store.company)

  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const selectChangeHandler = value => {
    const selectedCompany = companies.find(
      company => company.name.toLowerCase() === value
    )
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id })
    }
  }

  const submitHandler = async e => {
    e.preventDefault()
    if (!input.companyId) {
      toast.error('Please select a company.')
      return
    }
    try {
      setLoading(true)
      // Get token from cookie here
      const token = Cookie.get('token')

      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        input,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
          withCredentials: true,
        }
      )
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/jobs')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post job.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <Navbar />
      <div className="flex justify-center py-10 px-4 flex-grow">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-4xl bg-white bg-opacity-95 rounded-md shadow-lg p-6 sm:p-10 text-gray-900"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: 'Title', name: 'title', type: 'text' },
              { label: 'Description', name: 'description', type: 'text' },
              { label: 'Requirements', name: 'requirements', type: 'text' },
              { label: 'Salary', name: 'salary', type: 'text' },
              { label: 'Location', name: 'location', type: 'text' },
              { label: 'Job Type', name: 'jobType', type: 'text' },
              { label: 'Experience Level', name: 'experience', type: 'text' },
              { label: 'No of Positions', name: 'position', type: 'number' },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <Label htmlFor={name}>{label}</Label>
                <Input
                  id={name}
                  name={name}
                  type={type}
                  value={input[name]}
                  onChange={changeEventHandler}
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                  required={name !== 'position'}
                  min={name === 'position' ? 0 : undefined}
                />
              </div>
            ))}

            <div className="sm:col-span-2">
              <Label>Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler} defaultValue="">
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map(company => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-xs text-red-600 font-semibold mt-2">
                  *Please register a company first before posting jobs.
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-6"
            disabled={loading || companies.length === 0}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Posting...
              </>
            ) : (
              'Post New Job'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default PostJob
