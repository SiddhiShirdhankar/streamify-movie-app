import { useState } from "react";
import MovieCard from "./components/MovieCard";
const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=2d91e9ce";





function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search || []);
  };
  return (
    <div className="app">
      <h1>Streamify</h1>

      <div className="search">
        <input placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button onClick={() => searchMovies(searchTerm)}>
          Search
        </button>
      </div>

      <div>
        <div className="movies">
  {movies.map((movie) => (
    <MovieCard key={movie.imdbID} movie={movie} />
  ))}
</div>
      </div>
      <p>Searching for: {searchTerm}</p>
    </div>
  );
}

export default App;