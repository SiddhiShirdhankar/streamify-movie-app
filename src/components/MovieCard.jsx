<div className="movie">
  <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"} />

  <div className="movie-info">
    <h3>{movie.Title}</h3>
    <p>{movie.Year}</p>
    <p>{movie.Genre}</p>
    <p>⭐ {movie.imdbRating}</p>
  </div>
</div>