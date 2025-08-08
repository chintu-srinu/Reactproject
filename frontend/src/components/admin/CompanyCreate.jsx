

import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState('')
  const dispatch = useDispatch()

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error('Company name is required')
      return
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        const companyId = res?.data?.company?._id
        navigate(`/admin/companies/${companyId}`)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Failed to create company')
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <Navbar />
      <div className="max-w-md mx-auto p-4 sm:p-6 md:p-10 bg-white bg-opacity-95 rounded-lg shadow-md mt-10">
        <div className="mb-6">
          <h1 className="font-bold text-2xl mb-2">Your Company Name</h1>
          <p className="text-gray-600 text-sm">
            What would you like to give your company name? You can change this later.
          </p>
        </div>

        <Label htmlFor="companyName" className="block mb-1 font-semibold">
          Company Name
        </Label>
        <Input
          id="companyName"
          type="text"
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          placeholder="JobHunt, Microsoft etc."
          className="mb-6"
        />

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Button variant="outline" onClick={() => navigate('/admin/companies')} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={registerNewCompany} className="w-full sm:w-auto">
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate


