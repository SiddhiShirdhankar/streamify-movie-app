import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

// Search movies by title
export const searchMoviesAPI = async (title) => {
  const response = await axios.get(`${API_URL}&s=${title}`);
  return response.data;
};

// Get detailed movie info by ID
export const getMovieDetailsAPI = async (id) => {
  const response = await axios.get(`${API_URL}&i=${id}`);
  return response.data;
};