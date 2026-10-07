import type { Movie } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

function MovieGrid({ movies, onSelectMovie }: MovieGridProps) {
  return (
    <div className={css.movieGrid}>
      {movies.map((movie) => (
        <button
          key={movie.id}
          className={css.movieButton}
          type="button"
          onClick={() => onSelectMovie(movie)}
          aria-label={`View details for ${movie.title}`}
        >
          <MovieCard movie={movie} />
        </button>
      ))}
    </div>
  );
}

export default MovieGrid;
