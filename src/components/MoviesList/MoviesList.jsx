import { Link, useLocation } from 'react-router-dom';
import css from '../MoviesList/MoviesList.module.css';

const MoviesList = ({ movies }) => {
  const location = useLocation();

  const defaultMovieImg = 'https://i.imgur.com/YFPCI0O.jpeg';

  return (
    <div className={css.movieList}>
      {movies.map(movie => (
        <div key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : defaultMovieImg
              }
              width={250}
              height={360}
              alt={movie.title}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
