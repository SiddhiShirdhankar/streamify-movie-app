

import { useState } from "react";
import MovieCard from "./components/MovieCard";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=2d91e9ce";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async (title) => {
    if (!title) return;

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      setMovies(data.Search || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

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
      </div>

      {/* Conditional Rendering */}
      {loading ? (
        <p>Loading...</p>
      ) : movies.length > 0 ? (
        <div className="movies">
          {movies.map((movie) => (
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