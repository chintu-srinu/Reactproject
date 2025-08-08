
import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full rounded-lg shadow-lg p-6 text-white bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900">
      <h1 className='font-bold text-xl mb-4'>Filter Jobs</h1>
      <hr className='mb-6 border-white/50' />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {fitlerData.map((data, index) => (
          <div key={index} className="mb-6">
            <h2 className='font-semibold text-lg mb-3'>{data.fitlerType}</h2>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`
              return (
                <div key={idx} className='flex items-center space-x-3 my-2'>
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId} className="cursor-pointer">{item}</Label>
                </div>
              )
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard;

