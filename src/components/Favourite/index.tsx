'use client';

import React, { useState, useEffect } from 'react';
import MovieCard from '../MovieCard';

type Movie = {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
};

const FavoriteMovies: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    setFavoriteMovies(storedFavorites);
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Your Favorite Movies</h2>
      {favoriteMovies.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {favoriteMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.posterPath}
              releaseDate={movie.releaseDate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteMovies;
