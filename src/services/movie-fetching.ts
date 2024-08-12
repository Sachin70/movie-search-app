"use client";

import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const fetchMovies = async (
  query: string,
  page: number = 1,
  genre: string = "",
  releaseYearRange: { start: number; end: number } = {
    start: 1900,
    end: new Date().getFullYear(),
  },
  ratingRange: { min: number; max: number } = { min: 0, max: 10 }
) => {
  try {
    const params: any = {
      api_key: API_KEY,
      page,
      "primary_release_date.gte": `${releaseYearRange.start}-01-01`,
      "primary_release_date.lte": `${releaseYearRange.end}-12-31`,
      "vote_average.gte": ratingRange.min,
      "vote_average.lte": ratingRange.max,
    };

    if (query) {
      params.query = query;
      params.include_adult = false; // Exclude adult content
      return await axios.get(`${BASE_URL}/search/movie`, { params });
    }

    if (genre) {
      params.with_genres = genre;
    }

    return await axios.get(`${BASE_URL}/discover/movie`, { params });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { data: { results: [] } };
  }
};

export const fetchTrendingMovies = async (page: number = 1) => {
  const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
    params: {
      api_key: API_KEY,
      page,
    },
  });
  return response.data;
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};
