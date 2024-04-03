import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, Link, useLocation, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../movie-api';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from '../MovieDetailsPage/MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);

      try {
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  const basePath = 'https://image.tmdb.org/t/p/w500/';
  const fullPosterPath =
    movie && movie.poster_path
      ? basePath + movie.poster_path
      : 'https://i.imgur.com/YFPCI0O.jpeg';

  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>
      {loading && <Loader />}
      {error && <ErrorMessage message="Error fetching movie details" />}
      {movie && (
        <div className={css.movieDetail}>
          <img
            src={fullPosterPath}
            width={250}
            height={360}
            alt={movie?.title || 'Default Poster'}
          />
          <h2>{movie.title}</h2>
          <p>Overview: {movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Genre: {movie.genres.map(genre => genre.name).join(', ')}</p>
          <p>
            Production:{' '}
            {movie.production_countries.map(country => country.name).join(', ')}
          </p>

          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
