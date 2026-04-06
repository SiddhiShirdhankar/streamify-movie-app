import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import "./App.css";
import { searchMoviesAPI, getMovieDetailsAPI } from "./services/movieService";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
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

      const data = await searchMoviesAPI(title);

      if (data.Response === "False") {
        setDetailedMovies([]);
        setError(data.Error);
        return;
      }

      // Fetch details for each movie (limiting to first 10 for performance)
      const detailedData = await Promise.all(
        data.Search.slice(0, 10).map(async (movie) => {
          try {
            return await getMovieDetailsAPI(movie.imdbID);
          } catch {
            return null;
          }
        })
      );

      setDetailedMovies(detailedData.filter(Boolean));
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchMovies("Harry Potter");
  }, []);

  const filteredMovies = detailedMovies.filter((movie) => {
    const matchesType = type === "all" || movie.Type === type;
    const matchesGenre = genre === "all" || movie.Genre?.includes(genre);
    const matchesRating = rating === "all" || Number(movie.imdbRating) >= Number(rating);
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
          onKeyDown={(e) => e.key === "Enter" && searchMovies(searchTerm)}
        />

        <button onClick={() => searchMovies(searchTerm)}>
          Search
        </button>

        <select onChange={(e) => setType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>

        <select onChange={(e) => setGenre(e.target.value)}>
          <option value="all">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
        </select>

        <select onChange={(e) => setRating(e.target.value)}>
          <option value="all">All Ratings</option>
          <option value="7">7+ ⭐</option>
          <option value="8">8+ ⭐</option>
          <option value="9">9+ ⭐</option>
        </select>
      </div>

      {loading ? (
        <div className="status-container"><p>Loading cinematic excellence...</p></div>
      ) : error ? (
        <div className="status-container"><p className="error">{error}</p></div>
      ) : filteredMovies.length > 0 ? (
        <div className="movies">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="status-container"><p>No movies match your filters.</p></div>
      )}
    </div>
  );
}

export default App;