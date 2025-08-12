

// import React, { useEffect, useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Button } from '../ui/button'
// import { ArrowLeft, Loader2 } from 'lucide-react'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import axios from 'axios'
// import { COMPANY_API_END_POINT } from '@/utils/constant'
// import { useNavigate, useParams } from 'react-router-dom'
// import { toast } from 'sonner'
// import { useSelector } from 'react-redux'
// import useGetCompanyById from '@/hooks/useGetCompanyById'

// const CompanySetup = () => {
//   const params = useParams()
//   useGetCompanyById(params.id)

//   const [input, setInput] = useState({
//     name: '',
//     description: '',
//     website: '',
//     location: '',
//     file: null,
//   })

//   const { singleCompany } = useSelector((store) => store.company)
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value })
//   }

//   const changeFileHandler = (e) => {
//     const file = e.target.files?.[0]
//     setInput({ ...input, file })
//   }

//   const submitHandler = async (e) => {
//     e.preventDefault()
//     const formData = new FormData()
//     formData.append('name', input.name)
//     formData.append('description', input.description)
//     formData.append('website', input.website)
//     formData.append('location', input.location)
//     if (input.file) {
//       formData.append('file', input.file)
//     }
//     try {
//       setLoading(true)
//       const res = await axios.put(
//         `${COMPANY_API_END_POINT}/update/${params.id}`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           withCredentials: true,
//         }
//       )
//       if (res.data.success) {
//         toast.success(res.data.message)
//         navigate('/admin/companies')
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.response?.data?.message || 'Something went wrong')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     setInput({
//       name: singleCompany.name || '',
//       description: singleCompany.description || '',
//       website: singleCompany.website || '',
//       location: singleCompany.location || '',
//       file: singleCompany.file || null,
//     })
//   }, [singleCompany])

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center flex flex-col"
//       style={{
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1581092334720-07b1a23f7582?auto=format&fit=crop&w=1950&q=80')",
//       }}
//     >
//       <Navbar />
//       <div className="flex-1 flex items-center justify-center px-4">
//         <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl w-full max-w-xl p-6 sm:p-8">
//           <form onSubmit={submitHandler}>
//             <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 p-2 sm:p-4">
//               <Button
//                 type="button"
//                 onClick={() => navigate('/admin/companies')}
//                 variant="outline"
//                 className="flex items-center gap-2 text-gray-600 font-semibold w-full sm:w-auto"
//               >
//                 <ArrowLeft />
//                 <span>Back</span>
//               </Button>
//               <h1 className="font-bold text-lg sm:text-xl text-center sm:text-left">
//                 Company Setup
//               </h1>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <Label>Company Name</Label>
//                 <Input
//                   type="text"
//                   name="name"
//                   value={input.name}
//                   onChange={changeEventHandler}
//                 />
//               </div>
//               <div>
//                 <Label>Description</Label>
//                 <Input
//                   type="text"
//                   name="description"
//                   value={input.description}
//                   onChange={changeEventHandler}
//                 />
//               </div>
//               <div>
//                 <Label>Website</Label>
//                 <Input
//                   type="text"
//                   name="website"
//                   value={input.website}
//                   onChange={changeEventHandler}
//                 />
//               </div>
//               <div>
//                 <Label>Location</Label>
//                 <Input
//                   type="text"
//                   name="location"
//                   value={input.location}
//                   onChange={changeEventHandler}
//                 />
//               </div>
//               <div className="sm:col-span-2">
//                 <Label>Logo</Label>
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   onChange={changeFileHandler}
//                 />
//               </div>
//             </div>

//             {loading ? (
//               <Button className="w-full my-4">
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//               </Button>
//             ) : (
//               <Button type="submit" className="w-full my-4">
//                 Update
//               </Button>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CompanySetup




import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import Cookie from 'js-cookie'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
  const params = useParams()
  useGetCompanyById(params.id)

  const { singleCompany } = useSelector((store) => store.company)

  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    file: null,
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || '',
        description: singleCompany.description || '',
        website: singleCompany.website || '',
        location: singleCompany.location || '',
        file: null, // File inputs can't be prefilled for security reasons
      })
    }
  }, [singleCompany])

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', input.name)
    formData.append('description', input.description)
    formData.append('website', input.website)
    formData.append('location', input.location)
    if (input.file) {
      formData.append('file', input.file)
    }

    try {
      setLoading(true)
      const token = Cookie.get('token')

      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token ? `Bearer ${token}` : '',
          },
          withCredentials: true,
        }
      )

      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/companies')
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581092334720-07b1a23f7582?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl w-full max-w-xl p-6 sm:p-8">
          <form onSubmit={submitHandler}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 p-2 sm:p-4">
              <Button
                type="button"
                onClick={() => navigate('/admin/companies')}
                variant="outline"
                className="flex items-center gap-2 text-gray-600 font-semibold w-full sm:w-auto"
              >
                <ArrowLeft />
                <span>Back</span>
              </Button>
              <h1 className="font-bold text-lg sm:text-xl text-center sm:text-left">
                Company Setup
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Company Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  required
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Website</Label>
                <Input
                  type="text"
                  name="website"
                  value={input.website}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                />
              </div>
            </div>

            {loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Update
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default CompanySetup
