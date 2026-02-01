import MovieCard from "../MovieCard/MovieCard";

const MoviesList = ({ movies = [] }) => {
  if (!movies.length) {
    return <p className="muted">No movies found.</p>;
  }

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

export default MoviesList;
