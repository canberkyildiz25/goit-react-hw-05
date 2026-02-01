const MovieDetails = ({
  movie,
  onPlayTrailer,
  hasTrailer,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!movie) return null;

  return (
    <section className="details">
      <div className="details__poster">
        {movie.poster ? (
          <img src={movie.poster} alt={movie.title} />
        ) : (
          <div className="details__poster--placeholder">No image</div>
        )}
      </div>
      <div className="details__content">
        <h1>{movie.title}</h1>
        <p className="muted">User score: {movie.score ?? "N/A"}</p>
        <div className="details__actions">
          <button
            className={`button button--ghost ${
              !hasTrailer ? "button--disabled" : ""
            }`}
            onClick={onPlayTrailer}
            disabled={!hasTrailer}
          >
            Watch Trailer
          </button>
          <button
            className={`favorite-button favorite-button--large ${
              isFavorite ? "favorite-button--active" : ""
            }`}
            onClick={onToggleFavorite}
          >
            {isFavorite ? "★" : "☆"} Favorite
          </button>
        </div>
        <h2>Overview</h2>
        <p>{movie.overview}</p>
        <h3>Genres</h3>
        <p>{movie.genres?.join(", ") || "N/A"}</p>
      </div>
    </section>
  );
};

export default MovieDetails;
