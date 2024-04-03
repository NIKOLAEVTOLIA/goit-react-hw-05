import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../movie-api';
import MoviesList from '../../components/MoviesList/MoviesList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
        setLoading(false);
      } catch (error) {
        setError('Error fetching trending movies');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <MoviesList movies={movies} />
      )}
    </div>
  );
};

export default HomePage;
