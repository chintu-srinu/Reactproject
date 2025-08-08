



import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = allAdminJobs.filter(job => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="w-full overflow-x-auto mt-6">
      <Table className="min-w-[600px] w-full text-sm">
        <TableCaption className="text-xs text-muted-foreground">
          A list of your recent posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-sm">Company Name</TableHead>
            <TableHead className="text-sm">Role</TableHead>
            <TableHead className="text-sm">Date</TableHead>
            <TableHead className="text-right text-sm">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow key={job._id}>
              <TableCell className="text-sm">{job?.company?.name}</TableCell>
              <TableCell className="text-sm">{job?.title}</TableCell>
              <TableCell className="text-sm">{job?.createdAt?.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="cursor-pointer">
                    <MoreHorizontal className="w-5 h-5" />
                  </PopoverTrigger>
                  <PopoverContent className="w-36">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span className="text-sm">Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="flex items-center gap-2 mt-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
