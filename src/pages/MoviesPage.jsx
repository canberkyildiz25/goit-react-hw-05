import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import MoviesList from "../components/MoviesList/MoviesList";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { searchMovies } from "../services/moviesApi";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleSearch = (value) => {
    const trimmed = value.trim();
    setQuery(trimmed);
    setPage(1);
    setMovies([]);
    setHasMore(false);
    setWarning(trimmed ? "" : "Type at least 1 character to search.");
  };

  useEffect(() => {
    if (!query) return;

    let isActive = true;
    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await searchMovies(query, page);
        if (!isActive) return;
        setMovies((prev) => (page === 1 ? data : [...prev, ...data]));
        setHasMore(data.length >= 20);
      } catch (err) {
        if (isActive) setError(err.message);
      } finally {
        if (isActive) setLoading(false);
      }
    }, 500);

    return () => {
      isActive = false;
      clearTimeout(timeout);
    };
  }, [query, page]);

  return (
    <section>
      <h1>Search Movies</h1>
      <SearchBar onSearch={handleSearch} />
      {warning && <p className="error">{warning}</p>}
      {query && !warning && <p className="muted">Results for: {query}</p>}
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <MoviesList movies={movies} />}
      {!loading && !error && hasMore && (
        <button
          className="button load-more"
          onClick={() => setPage((p) => p + 1)}
        >
          Load More
        </button>
      )}
    </section>
  );
};

export default MoviesPage;
