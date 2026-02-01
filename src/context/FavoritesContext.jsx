import { createContext, useContext, useEffect, useMemo, useState } from "react";

const FavoritesContext = createContext(null);

const STORAGE_KEY = "movie-favorites";

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      if (exists) return prev.filter((item) => item.id !== movie.id);
      return [...prev, movie];
    });
  };

  const isFavorite = (id) => favorites.some((movie) => movie.id === id);

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    [favorites],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};
