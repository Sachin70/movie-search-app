"use client";

import React, { useState, useEffect, useRef } from "react";
import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/movie-fetching";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};

type MovieListProps = {
  query: string;
  genre: string;
  releaseYearRange: { start: number; end: number };
  ratingRange: { min: number; max: number };
};

const MovieList: React.FC<MovieListProps> = ({
  query,
  genre,
  releaseYearRange,
  ratingRange,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observer = useRef<IntersectionObserver>();
  const lastMovieElementRef = useRef<HTMLDivElement>(null);

  const loadMovies = async () => {
    setLoading(true);
    const response = await fetchMovies(
      query,
      page,
      genre,
      releaseYearRange,
      ratingRange
    );

    if (page === 1) {
      setMovies(response.results);
    } else {
      setMovies((prevMovies) => [...prevMovies, ...response.results]);
    }

    setHasMore(response.results.length > 0);
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    setMovies([]);
    loadMovies();
  }, [query, genre, releaseYearRange, ratingRange]);

  useEffect(() => {
    if (page > 1) {
      loadMovies();
    }
  }, [page]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (lastMovieElementRef.current) {
      observer.current.observe(lastMovieElementRef.current);
    }
  }, [movies, hasMore]);

  return (
    <div>
      {loading && page === 1 ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              ref={index === movies.length - 1 ? lastMovieElementRef : null}
            >
              <MovieCard
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                releaseDate={movie.release_date}
              />
            </div>
          ))}
        </div>
      )}

      {loading && page > 1 && (
        <div className="text-center">Loading more...</div>
      )}
    </div>
  );
};

export default MovieList;
