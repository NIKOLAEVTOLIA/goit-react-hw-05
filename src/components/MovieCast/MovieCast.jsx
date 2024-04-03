import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../movie-api';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const castData = await fetchMovieCredits(movieId);
        setCast(castData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching movie cast');
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  const defaultActorImg = 'https://i.imgur.com/YFPCI0O.jpeg';

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          {cast.length === 0 ? (
            <p>No cast available</p>
          ) : (
            <ul className={css.movieCast}>
              {cast.map(actor => (
                <li key={actor.id}>
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                        : defaultActorImg
                    }
                    width={250}
                    height={360}
                    alt={actor.original_name}
                  />
                  <h3>{actor.name}</h3>
                  <p>Character: {actor.character}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default MovieCast;
