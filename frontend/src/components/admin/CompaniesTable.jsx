


import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company)
  const [filterCompany, setFilterCompany] = useState(companies)
  const navigate = useNavigate()

  useEffect(() => {
    const filteredCompany =
      companies.length > 0
        ? companies.filter(company => {
            if (!searchCompanyByText) return true
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
          })
        : []
    setFilterCompany(filteredCompany)
  }, [companies, searchCompanyByText])

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full border-collapse border border-gray-200">
        <TableCaption className="text-lg font-semibold text-gray-700 mb-4">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap px-4 py-2">Logo</TableHead>
            <TableHead className="whitespace-nowrap px-4 py-2">Name</TableHead>
            <TableHead className="whitespace-nowrap px-4 py-2">Date</TableHead>
            <TableHead className="text-right whitespace-nowrap px-4 py-2">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                No companies found.
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map(company => (
              <TableRow key={company._id} className="hover:bg-gray-50 transition">
                <TableCell className="px-4 py-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={company.logo} alt={`${company.name} logo`} />
                  </Avatar>
                </TableCell>
                <TableCell className="px-4 py-2 whitespace-nowrap">{company.name}</TableCell>
                <TableCell className="px-4 py-2 whitespace-nowrap">{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right px-4 py-2">
                  <Popover>
                    <PopoverTrigger>
                      <button aria-label={`Actions for ${company.name}`}>
                        <MoreHorizontal className="w-5 h-5 text-gray-600 hover:text-gray-900" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer hover:text-indigo-600"
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && navigate(`/admin/companies/${company._id}`)}
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable
