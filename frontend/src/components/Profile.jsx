



import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    // Add bg-gray-50 for light gray background for whole page
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 px-4 sm:px-8 shadow-md">
        {/* ...rest of your code unchanged */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl break-words">{user?.fullname}</h1>
              <p className="text-sm mt-1 break-words">{user?.profile?.bio || 'No bio available.'}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="self-start sm:self-auto"
            variant="outline"
            aria-label="Edit Profile"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-5 space-y-3 text-sm">
          <div className="flex items-center gap-3 flex-wrap">
            <Mail />
            <span className="break-all">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Contact />
            <span className="break-all">{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1 className="font-semibold mb-2">Skills</h1>
          <div className="flex flex-wrap items-center gap-2">
            {user?.profile?.skills?.length > 0
              ? user.profile.skills.map((item, index) => (
                  <Badge key={index} className="text-sm">
                    {item}
                  </Badge>
                ))
              : <span>NA</span>}
          </div>
        </div>

        <div className="max-w-sm grid gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="text-blue-500 hover:underline break-all"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 mt-5 px-4 sm:px-8 shadow-md">
        <h1 className="font-bold text-lg mb-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
