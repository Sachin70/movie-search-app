"use client";
import FilterPanel from "@/components/Filter";
import SearchBar from "@/components/Search";
import MovieList from "@/containers/MovieList";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    releaseYearRange: { start: 2000, end: new Date().getFullYear() },
    ratingRange: { min: 0, max: 10 },
  });

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      genre: "",
      releaseYearRange: { start: 2000, end: new Date().getFullYear() },
      ratingRange: { min: 0, max: 10 },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Movie Search App</h1>

      <SearchBar onSearch={setSearchQuery} />
      <FilterPanel
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />

      <MovieList
        query={searchQuery}
        genre={filters.genre}
        releaseYearRange={filters.releaseYearRange}
        ratingRange={filters.ratingRange}
      />
    </div>
  );
}
