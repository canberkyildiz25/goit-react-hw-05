import { useEffect, useState } from "react";
import MoviesList from "../components/MoviesList/MoviesList";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import {
  fetchGenres,
  fetchMoviesByGenre,
  fetchTrendingMovies,
} from "../services/moviesApi";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [genreSections, setGenreSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [trending, genres] = await Promise.all([
          fetchTrendingMovies(),
          fetchGenres(),
        ]);
        setMovies(trending);

        const limitedGenres = genres.slice(0, 6);
        const sections = await Promise.all(
          limitedGenres.map(async (genre) => {
            const list = await fetchMoviesByGenre(genre.id);
            return { id: genre.id, name: genre.name, movies: list };
          }),
        );
        setGenreSections(sections.filter((section) => section.movies.length));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  return (
    <section>
      <h1>Trending Today</h1>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <MoviesList movies={movies} />
          {genreSections.map((section) => (
            <div className="genre-section" key={section.id}>
              <h2 className="genre-section__title">{section.name}</h2>
              <MoviesList movies={section.movies} />
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default HomePage;
