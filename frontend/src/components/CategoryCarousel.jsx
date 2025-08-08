
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
  'Frontend Developer',
  'Backend Developer',
  'Data Science',
  'Graphic Designer',
  'FullStack Developer',
  'Data Analyst',
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-16 px-4 py-10 bg-white shadow-md rounded-2xl">
      <h2 className="text-gray-800 text-center text-2xl font-bold mb-6">
        Explore By Categories
      </h2>

      <Carousel className="w-full">
        <CarouselContent className="flex gap-4 flex-wrap justify-center sm:flex-nowrap">
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full px-5 py-2 text-gray-800 border-gray-500 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-gray-700 hover:text-blue-600" />
        <CarouselNext className="text-gray-700 hover:text-blue-600" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;

