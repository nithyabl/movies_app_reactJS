import axios from "axios";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdbApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Discover popular movies
export const fetchDiscoverMovies = async () => {
  const { data } = await tmdbApi.get("/discover/movie", {
    params: { sort_by: "popularity.desc" },
  });
  return data.results;
};

// Search movies
export const fetchSearchMovies = async (query) => {
  const { data } = await tmdbApi.get("/search/movie", {
    params: { query },
  });
  return data.results;
};

// Movies by category (now_playing, upcoming, top_rated, popular)
export const fetchMoviesByCategory = async (category, page = 1) => {
  const { data } = await tmdbApi.get(`/movie/${category}`, {
    params: { page },
  });
  return data;
};

// Single movie detail with credits and videos
export const fetchMovieDetail = async (id) => {
  const { data } = await tmdbApi.get(`/movie/${id}`, {
    params: { append_to_response: "credits,videos" },
  });
  return data;
};

export default tmdbApi;
