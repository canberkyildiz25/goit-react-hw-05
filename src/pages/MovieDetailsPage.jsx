import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/MovieDetails/MovieDetails";
import Cast from "../components/Cast/Cast";
import Reviews from "../components/Reviews/Reviews";
import MoviesList from "../components/MoviesList/MoviesList";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import TrailerModal from "../components/TrailerModal/TrailerModal";
import { useFavorites } from "../context/FavoritesContext";
import {
  fetchMovieById,
  fetchMovieCast,
  fetchMovieReviews,
  fetchMovieTrailer,
  fetchSimilarMovies,
} from "../services/moviesApi";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("cast");
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [movieData, castData, reviewsData, trailerData, similarData] =
          await Promise.all([
            fetchMovieById(movieId),
            fetchMovieCast(movieId),
            fetchMovieReviews(movieId),
            fetchMovieTrailer(movieId),
            fetchSimilarMovies(movieId),
          ]);
        setMovie(movieData);
        setCast(castData);
        setReviews(reviewsData);
        setTrailerKey(trailerData);
        setSimilar(similarData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadMovieData();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  return (
    <section>
      <MovieDetails
        movie={movie}
        hasTrailer={Boolean(trailerKey)}
        onPlayTrailer={() => setIsTrailerOpen(true)}
        isFavorite={isFavorite(movie.id)}
        onToggleFavorite={() => toggleFavorite(movie)}
      />
      {isTrailerOpen && (
        <TrailerModal
          trailerKey={trailerKey}
          onClose={() => setIsTrailerOpen(false)}
        />
      )}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "cast" ? "tab--active" : ""}`}
          onClick={() => setActiveTab("cast")}
        >
          Cast
        </button>
        <button
          className={`tab ${activeTab === "reviews" ? "tab--active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "cast" && <Cast cast={cast} />}
        {activeTab === "reviews" && <Reviews reviews={reviews} />}
      </div>
      <div className="genre-section">
        <h2 className="genre-section__title">Similar Movies</h2>
        <MoviesList movies={similar} />
      </div>
    </section>
  );
};

export default MovieDetailsPage;
