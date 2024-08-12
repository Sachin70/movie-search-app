import React, { useState, useEffect } from "react";

import { fetchGenres } from "@/services/movie-fetching";

type FilterPanelProps = {
  onApplyFilters: (filters: {
    genre: string;
    releaseYearRange: { start: number; end: number };
    ratingRange: { min: number; max: number };
  }) => void;
  onClearFilters: () => void;
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  onApplyFilters,
  onClearFilters,
}) => {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(10);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      const fetchedGenres = await fetchGenres();
      setGenres(fetchedGenres);
    };
    loadGenres();
  }, []);

  const handleApplyFilters = () => {
    onApplyFilters({
      genre: selectedGenre,
      releaseYearRange: { start: startYear, end: endYear },
      ratingRange: { min: minRating, max: maxRating },
    });
  };

  const handleClearFilters = () => {
    setSelectedGenre("");
    setStartYear(2000);
    setEndYear(new Date().getFullYear());
    setMinRating(0);
    setMaxRating(10);
    onClearFilters();
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 bg-blue-500 text-white rounded-lg"
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      {isOpen && (
        <div className="p-4 border border-gray-300 rounded-lg mt-2 bg-white">
          <h3 className="text-lg font-bold mb-2">Filters</h3>

          {/* Genre Filter */}
          <div className="mb-4">
            <label className="block mb-1">Genre:</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          {/* Release Year Range Filter */}
          <div className="mb-4">
            <label className="block mb-1">Release Year Range:</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={startYear}
                onChange={(e) => setStartYear(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Start Year"
              />
              <input
                type="number"
                value={endYear}
                onChange={(e) => setEndYear(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="End Year"
              />
            </div>
          </div>

          {/* Rating Range Filter */}
          <div className="mb-4">
            <label className="block mb-1">Rating Range:</label>
            <div className="flex space-x-2">
              <input
                type="number"
                min="0"
                max="10"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Min Rating"
              />
              <input
                type="number"
                min="0"
                max="10"
                value={maxRating}
                onChange={(e) => setMaxRating(parseFloat(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Max Rating"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleApplyFilters}
              className="p-2 bg-blue-500 text-white rounded-lg"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClearFilters}
              className="p-2 bg-gray-300 text-black rounded-lg"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
