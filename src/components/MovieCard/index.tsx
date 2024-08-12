import React, { useState, useEffect } from "react";

type MovieCardProps = {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
};

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  posterPath,
  releaseDate,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the movie is already in favorites when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setIsFavorite(
      storedFavorites.some((movie: { id: number }) => movie.id === id)
    );
  }, [id]);

  // Handle adding/removing from favorites
  const handleFavoriteToggle = () => {
    let storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      // Remove from favorites
      storedFavorites = storedFavorites.filter(
        (movie: { id: number }) => movie.id !== id
      );
    } else {
      // Add to favorites
      storedFavorites.push({ id, title, posterPath, releaseDate });
    }
    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    setIsFavorite(!isFavorite);
  };

  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500/${posterPath}`
    : "/no-image-available.png";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg">
      <img className="w-full h-72 object-cover" src={imageUrl} alt={title} />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">Released: {releaseDate}</p>
        <button
          onClick={handleFavoriteToggle}
          className={`mt-2 w-full py-2 rounded-lg transition-colors ${
            isFavorite
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
          }`}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
