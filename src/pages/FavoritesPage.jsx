import MoviesList from "../components/MoviesList/MoviesList";
import { useFavorites } from "../context/FavoritesContext";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <section>
      <h1>Favorites</h1>
      <MoviesList movies={favorites} />
    </section>
  );
};

export default FavoritesPage;
