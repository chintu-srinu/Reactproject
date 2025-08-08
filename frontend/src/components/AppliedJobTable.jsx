import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const { allAppliedJobs = [] } = useSelector((store) => store.job); // fallback to []

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-xl p-6 md:p-10 overflow-x-auto">
        <Table className="min-w-full">
          <TableCaption className="text-xl font-semibold text-gray-800 mb-4 hidden sm:table-caption">
            Your Applied Jobs
          </TableCaption>

          {/* Desktop Header */}
          <TableHeader className="hidden sm:table-header-group">
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-left text-sm font-semibold text-gray-600 px-4 py-3">
                Date
              </TableHead>
              <TableHead className="text-left text-sm font-semibold text-gray-600 px-4 py-3">
                Job Role
              </TableHead>
              <TableHead className="text-left text-sm font-semibold text-gray-600 px-4 py-3">
                Company
              </TableHead>
              <TableHead className="text-right text-sm font-semibold text-gray-600 px-4 py-3">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allAppliedJobs.length === 0 ? (
              <TableRow key="no-jobs">
                <TableCell
                  colSpan={4}
                  className="text-center py-12 text-gray-500 italic text-lg"
                >
                  You haven't applied for any jobs yet.
                </TableCell>
              </TableRow>
            ) : (
              allAppliedJobs.map((appliedJob) => {
                const date = new Date(appliedJob?.createdAt).toLocaleDateString('en-IN');
                return (
                  <TableRow
                    key={appliedJob._id}
                    className="block sm:table-row mb-6 sm:mb-0 border sm:border-none rounded-lg sm:rounded-none bg-white sm:bg-transparent p-4 sm:p-0 shadow sm:shadow-none"
                  >
                    <TableCell
                      className="block sm:table-cell text-sm text-gray-700 px-0 py-2 sm:px-4 sm:py-3"
                      data-label="Date"
                    >
                      <span className="font-semibold sm:hidden block mb-1 text-gray-500">
                        Date:
                      </span>
                      {date}
                    </TableCell>

                    <TableCell
                      className="block sm:table-cell text-base font-medium text-gray-900 px-0 py-2 sm:px-4 sm:py-3"
                      data-label="Job Role"
                    >
                      <span className="font-semibold sm:hidden block mb-1 text-gray-500">
                        Job Role:
                      </span>
                      {appliedJob?.job?.title || 'N/A'}
                    </TableCell>

                    <TableCell
                      className="block sm:table-cell text-sm text-gray-700 px-0 py-2 sm:px-4 sm:py-3"
                      data-label="Company"
                    >
                      <span className="font-semibold sm:hidden block mb-1 text-gray-500">
                        Company:
                      </span>
                      {appliedJob?.job?.company?.name || 'N/A'}
                    </TableCell>

                    <TableCell
                      className="block sm:table-cell text-right px-0 py-2 sm:px-4 sm:py-3"
                      data-label="Status"
                    >
                      <span className="font-semibold sm:hidden block mb-1 text-gray-500">
                        Status:
                      </span>
                      <Badge
                        className={`px-3 py-1 rounded-full font-semibold text-sm ${
                          appliedJob?.status === 'rejected'
                            ? 'bg-red-600 text-white'
                            : appliedJob?.status === 'pending'
                            ? 'bg-yellow-400 text-gray-900'
                            : 'bg-green-600 text-white'
                        }`}
                      >
                        {appliedJob?.status?.toUpperCase() || 'N/A'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobTable;
