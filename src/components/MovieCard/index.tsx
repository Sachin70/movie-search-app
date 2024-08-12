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

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setIsFavorite(
      storedFavorites.some((movie: { id: number }) => movie.id === id)
    );
  }, [id]);

  const handleFavoriteToggle = () => {
    let storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      storedFavorites = storedFavorites.filter(
        (movie: { id: number }) => movie.id !== id
      );
    } else {
      storedFavorites.push({ id, title, posterPath, releaseDate });
    }
    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    setIsFavorite(!isFavorite);
  };

  const imageUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500/${posterPath}`
    : "/no-image-available.png";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img className="w-full h-72 object-cover" src={imageUrl} alt={title} />

      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">Released: {releaseDate}</p>
        <button
          onClick={handleFavoriteToggle}
          className={`mt-2 px-4 py-2 rounded ${
            isFavorite ? "bg-red-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
