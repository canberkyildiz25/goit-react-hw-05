import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

const MovieCard = ({ movie }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  return (
    <li className="movie-card">
      <Link className="movie-card__link" to={`/movies/${movie.id}`}>
        {movie.poster ? (
          <img
            className="movie-card__poster"
            src={movie.poster}
            alt={movie.title}
          />
        ) : (
          <div className="movie-card__poster movie-card__poster--placeholder">
            No Image
          </div>
        )}
        <div className="movie-card__info">
          <div className="movie-card__title">{movie.title}</div>
          {movie.year && <span className="movie-card__meta">{movie.year}</span>}
        </div>
        <button
          className={`favorite-button ${favorite ? "favorite-button--active" : ""}`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleFavorite(movie);
          }}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "★" : "☆"}
        </button>
      </Link>
    </li>
  );
};

export default MovieCard;
