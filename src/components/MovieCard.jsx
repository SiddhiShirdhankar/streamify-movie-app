const MovieCard = ({ movie }) => {
  return (
    <div className="movie">
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/400"
        }
        alt={movie.Title}
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <p>{movie.Genre || "N/A"}</p>
        <p>⭐ {movie.imdbRating || "N/A"}</p>
      </div>
    </div>
  );
};

export default MovieCard;