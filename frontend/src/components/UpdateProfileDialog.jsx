



import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINTPROFILE } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((store) => store.auth)

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',
    file: null,
  })
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('fullname', input.fullname)
    formData.append('email', input.email)
    formData.append('phoneNumber', input.phoneNumber)
    formData.append('bio', input.bio)
    formData.append('skills', input.skills)
    if (input.file) {
      formData.append('file', input.file)
    }
    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_END_POINTPROFILE}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="sm:max-w-[425px] bg-white rounded-lg p-6 shadow-lg
                   max-w-full mx-4
                   "
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div
            className="
              grid gap-4
              sm:grid-cols-4
              grid-cols-1
              sm:items-center
            "
          >
            <Label htmlFor="fullname" className="text-right sm:col-span-1 col-span-12">
              Name
            </Label>
            <Input
              id="fullname"
              name="fullname"
              type="text"
              value={input.fullname}
              onChange={changeEventHandler}
              className="sm:col-span-3 col-span-12"
              required
            />

            <Label htmlFor="email" className="text-right sm:col-span-1 col-span-12">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={input.email}
              onChange={changeEventHandler}
              className="sm:col-span-3 col-span-12"
              required
            />

            <Label htmlFor="phoneNumber" className="text-right sm:col-span-1 col-span-12">
              Number
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              className="sm:col-span-3 col-span-12"
            />

            <Label htmlFor="bio" className="text-right sm:col-span-1 col-span-12">
              Bio
            </Label>
            <Input
              id="bio"
              name="bio"
              type="text"
              value={input.bio}
              onChange={changeEventHandler}
              className="sm:col-span-3 col-span-12"
            />

            <Label htmlFor="skills" className="text-right sm:col-span-1 col-span-12">
              Skills
            </Label>
            <Input
              id="skills"
              name="skills"
              type="text"
              value={input.skills}
              onChange={changeEventHandler}
              placeholder="Comma separated skills"
              className="sm:col-span-3 col-span-12"
            />

            <Label htmlFor="file" className="text-right sm:col-span-1 col-span-12">
              Resume
            </Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="application/pdf"
              onChange={fileChangeHandler}
              className="sm:col-span-3 col-span-12"
            />
          </div>

          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog
