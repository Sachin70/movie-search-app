'use client';

import FilterPanel from '@/components/Filter';
import SearchBar from '@/components/Search';
import MovieList from '@/containers/MovieList';
import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    releaseYearRange: { start: 2000, end: new Date().getFullYear() },
    ratingRange: { min: 0, max: 10 },
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setIsFilterOpen(false); // Close filter panel after applying filters
  };

  const handleClearFilters = () => {
    setFilters({
      genre: '',
      releaseYearRange: { start: 2000, end: new Date().getFullYear() },
      ratingRange: { min: 0, max: 10 },
    });
    setIsFilterOpen(false); // Close filter panel after clearing filters
  };

  return (
    <div className='container mx-auto p-4 flex flex-col items-end'>
      <div className='flex justify-end  mb-6 relative w-full max-w-lg'>
        <div className='bg-blue-50 justify-between  flex space-x-4 bg-white rounded-full shadow-md p-2 pl-4 w-full lg:w-fit'>
          <SearchBar onSearch={setSearchQuery} />
          <button
            className='text-gray-700 hover:text-green-500 transition-colors p-2 rounded-full focus:outline-none bg-gray-100 hover:bg-gray-200'
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FaFilter className='text-xl' />
          </button>
        </div>
        {isFilterOpen && (
          <div className='absolute top-14 right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-40'>
            <FilterPanel
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
            />
          </div>
        )}
      </div>
      <MovieList
        query={searchQuery}
        genre={filters.genre}
        releaseYearRange={filters.releaseYearRange}
        ratingRange={filters.ratingRange}
      />
    </div>
  );
}