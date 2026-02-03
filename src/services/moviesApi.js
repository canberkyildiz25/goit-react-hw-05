// API ile gerçek data kullanıyoruz
const USE_MOCK_DATA = false;
const API_KEY = "219306066b7f9da0eacff237562522da";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL_SMALL = "https://image.tmdb.org/t/p/w342"; // Kartlar için
const IMG_BASE_URL_LARGE = "https://image.tmdb.org/t/p/w780"; // Detay için

const mockGenres = [
  { id: 18, name: "Drama" },
  { id: 80, name: "Crime" },
  { id: 28, name: "Action" },
  { id: 53, name: "Thriller" },
  { id: 35, name: "Comedy" },
];

const mockMovies = [
  { id: 1, title: "The Shawshank Redemption", year: "1994", genreIds: [18] },
  { id: 2, title: "The Godfather", year: "1972", genreIds: [80, 18] },
  { id: 3, title: "The Dark Knight", year: "2008", genreIds: [28, 80] },
  { id: 4, title: "Pulp Fiction", year: "1994", genreIds: [80, 53] },
  { id: 5, title: "Forrest Gump", year: "1994", genreIds: [35, 18] },
];

const mockSimilar = [
  { id: 6, title: "Fight Club", year: "1999" },
  { id: 7, title: "Se7en", year: "1995" },
  { id: 8, title: "Inception", year: "2010" },
];

const mockMovieDetails = {
  id: 1,
  title: "The Shawshank Redemption",
  overview:
    "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.",
  score: 87,
  genres: ["Drama", "Crime"],
  poster: null,
};

const mockCast = [
  { id: 1, name: "Tim Robbins", character: "Andy Dufresne" },
  { id: 2, name: "Morgan Freeman", character: "Ellis Boyd 'Red' Redding" },
  { id: 3, name: "Bob Gunton", character: "Warden Norton" },
];

const mockReviews = [
  {
    id: 1,
    author: "John Doe",
    content: "One of the best movies ever made. A masterpiece!",
  },
  {
    id: 2,
    author: "Jane Smith",
    content: "Outstanding performances and an unforgettable story.",
  },
];

const mockTrailerKey = "6hB3S9bIaco";

const fetchData = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchTrendingMovies = async () => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
    return mockMovies;
  }
  const data = await fetchData(`/trending/movie/day?api_key=${API_KEY}`);
  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date?.split("-")[0] || "",
    poster: movie.poster_path
      ? `${IMG_BASE_URL_SMALL}${movie.poster_path}`
      : null,
  }));
};

export const searchMovies = async (query, page = 1) => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockMovies.filter((m) =>
      m.title.toLowerCase().includes(query.toLowerCase()),
    );
  }
  const data = await fetchData(
    `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
  );
  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date?.split("-")[0] || "",
    poster: movie.poster_path
      ? `${IMG_BASE_URL_SMALL}${movie.poster_path}`
      : null,
  }));
};

export const fetchMovieById = async (movieId) => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockMovieDetails;
  }
  const data = await fetchData(`/movie/${movieId}?api_key=${API_KEY}`);
  return {
    id: data.id,
    title: data.title,
    overview: data.overview,
    score: Math.round(data.vote_average * 10),
    genres: data.genres?.map((g) => g.name) || [],
    poster: data.poster_path
      ? `${IMG_BASE_URL_LARGE}${data.poster_path}`
      : null,
  };
};

export const fetchMovieCast = async (movieId) => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockCast;
  }
  const data = await fetchData(`/movie/${movieId}/credits?api_key=${API_KEY}`);
  return data.cast.slice(0, 10).map((actor) => ({
    id: actor.id,
    name: actor.name,
    character: actor.character,
  }));
};

export const fetchMovieReviews = async (movieId) => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockReviews;
  }
  const data = await fetchData(`/movie/${movieId}/reviews?api_key=${API_KEY}`);
  return data.results.map((review) => ({
    id: review.id,
    author: review.author,
    content: review.content,
  }));
};

export const fetchMovieTrailer = async (movieId) => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockTrailerKey;
  }
  const data = await fetchData(`/movie/${movieId}/videos?api_key=${API_KEY}`);
  const trailer = data.results.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official === true,
  );
  const fallback = data.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );
  return (trailer || fallback)?.key ?? null;
};

export const fetchGenres = async () => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockGenres;
  }
  const data = await fetchData(`/genre/movie/list?api_key=${API_KEY}`);
  return data.genres ?? [];
};

export const fetchMoviesByGenre = async (genreId) => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockMovies.filter((movie) => movie.genreIds?.includes(genreId));
  }
  const data = await fetchData(
    `/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`,
  );
  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date?.split("-")[0] || "",
    poster: movie.poster_path
      ? `${IMG_BASE_URL_SMALL}${movie.poster_path}`
      : null,
  }));
};

export const fetchSimilarMovies = async (movieId) => {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockSimilar;
  }
  const data = await fetchData(`/movie/${movieId}/similar?api_key=${API_KEY}`);
  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date?.split("-")[0] || "",
    poster: movie.poster_path
      ? `${IMG_BASE_URL_SMALL}${movie.poster_path}`
      : null,
  }));
};
