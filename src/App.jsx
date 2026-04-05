import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import "./App.css";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [type, setType] = useState("all");

  const searchMovies = async (title) => {
    if (!title) return;

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}&s=${title}`);
      const data = response.data;

      if (data.Response === "False") {
        setMovies([]);
        setError(data.Error);
      } else {
        setMovies(data.Search);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Default search on page load
  useEffect(() => {
    searchMovies("Harry Potter");
  }, []);

  // Filter logic
  const filteredMovies =
    type === "all"
      ? movies
      : movies.filter((movie) => movie.Type === type);

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
      </div>

      {/* Conditional Rendering */}
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