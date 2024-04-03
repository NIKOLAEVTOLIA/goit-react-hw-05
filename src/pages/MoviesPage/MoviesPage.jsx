import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../movie-api';
import MoviesList from '../../components/MoviesList/MoviesList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SearchForm from '../../components/SearchForm/SearchForm';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const searchQuery = searchParams.get('query') || '';
        const results = await searchMovies(searchQuery);
        setMovies(results);
        setLoading(false);
        setError('');
      } catch (error) {
        setError('Error searching movies');
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchParams]);

  const handleSearch = async query => {
    setSearchParams({ query: query });
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearch} />
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

export default MoviesPage;
