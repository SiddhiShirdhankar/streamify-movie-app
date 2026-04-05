import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import "./App.css";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [detailedMovies, setDetailedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [type, setType] = useState("all");
  const [genre, setGenre] = useState("all");
  const [rating, setRating] = useState("all");

  const searchMovies = async (title) => {
    if (!title) return;

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}&s=${title}`);
      const data = response.data;

      if (data.Response === "False") {
        setMovies([]);
        setDetailedMovies([]);
        setError(data.Error);
        return;
      }

      setMovies(data.Search);

      // 🔥 Fetch details for each movie
      const detailedData = await Promise.all(
        data.Search.map(async (movie) => {
          const res = await axios.get(`${API_URL}&i=${movie.imdbID}`);
          return res.data;
        })
      );

      setDetailedMovies(detailedData);

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchMovies("Harry Potter");
  }, []);

  // 🎯 Filtering logic
  const filteredMovies = detailedMovies.filter((movie) => {
    const matchesType = type === "all" || movie.Type === type;

    const matchesGenre =
      genre === "all" || movie.Genre?.includes(genre);

    const matchesRating =
      rating === "all" || Number(movie.imdbRating) >= Number(rating);

    return matchesType && matchesGenre && matchesRating;
  });

  return (
    <div className="app">
      <h1>Streamify</h1>

      <div className="search">
        <input
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchMovies(searchTerm);
            }
          }}
        />

        <button onClick={() => searchMovies(searchTerm)}>
          Search
        </button>

        {/* Type Filter */}
        <select onChange={(e) => setType(e.target.value)}>
          <option value="all">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>

        {/* Genre Filter */}
        <select onChange={(e) => setGenre(e.target.value)}>
          <option value="all">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
        </select>

        {/* Rating Filter */}
        <select onChange={(e) => setRating(e.target.value)}>
          <option value="all">All Ratings</option>
          <option value="7">7+</option>
          <option value="8">8+</option>
          <option value="9">9+</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredMovies.length > 0 ? (
        <div className="movies">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
}

export default App;