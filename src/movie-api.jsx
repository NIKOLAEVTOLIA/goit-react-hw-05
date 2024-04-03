import axios from 'axios';

const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWM1OTVkZTI3M2UyOGFiMGVkNDc2NTNiY2E0YWFlZCIsInN1YiI6IjY2MDIwMDU3MjI2YzU2MDE3ZDcyZmNiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pfXGEC6g14FrYEiKeUD7SoOD4FbhtcVuzAxHFRPCLbI'; // Замініть це значення на свій ключ доступу

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

instance.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${API_TOKEN}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// найпопулярніші фільми
export const fetchTrendingMovies = async () => {
  try {
    const response = await instance.get('/trending/movie/day');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

// пошук фільмів
export const searchMovies = async query => {
  try {
    const response = await instance.get(`/search/movie?query=${query}`);
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

// повна інформація про фільм
export const fetchMovieDetails = async movieId => {
  try {
    const response = await instance.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// акторський склад фільму
export const fetchMovieCredits = async movieId => {
  try {
    const response = await instance.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    return [];
  }
};

// ревью фільму
export const fetchMovieReviews = async movieId => {
  try {
    const response = await instance.get(`/movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    return [];
  }
};
