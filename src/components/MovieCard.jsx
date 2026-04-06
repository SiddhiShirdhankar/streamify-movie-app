import React from 'react';

const MovieCard = ({ movie }) => {
  // OMDb sometimes returns "N/A" for images or ratings. 
  // We handle those cases here for a cleaner UI.
  const posterUrl = movie.Poster !== "N/A" 
    ? movie.Poster 
    : "https://via.placeholder.com/400x600?text=No+Poster";

  const imdbRating = movie.imdbRating !== "N/A" 
    ? movie.imdbRating 
    : "N/A";

  return (
    <div className="movie">
      {/* Poster Section */}
      <div className="movie-poster-container">
        <img src={posterUrl} alt={movie.Title} />
        {movie.imdbRating !== "N/A" && (
          <span className="rating-tag">⭐ {imdbRating}</span>
        )}
      </div>

      {/* Info Section */}
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        
        <div className="movie-meta">
          <span className="movie-year">{movie.Year}</span>
          <span className="movie-type">{movie.Type?.toUpperCase()}</span>
        </div>

        {movie.Genre && (
          <p className="movie-genre-list">
            {movie.Genre}
          </p>
        )}
      </div>
    </div>
  );
};

// This line is CRITICAL to fix the "SyntaxError: does not provide an export named default"
export default MovieCard;