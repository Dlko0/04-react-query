import type { Movie } from '../../types/movie';
import css from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <article className={css.card}>
      <div className={css.poster}>
        {imageUrl ? (
          <img src={imageUrl} alt={`${movie.title} poster`} loading="lazy" />
        ) : (
          <div
            className={css.posterPlaceholder}
            aria-label="No poster available"
          >
            🎬
          </div>
        )}
        <span className={css.rating}>★ {movie.vote_average.toFixed(1)}</span>
      </div>
      <div className={css.content}>
        <h2>{movie.title}</h2>
        <p>{movie.overview || 'No overview available.'}</p>
        <div className={css.meta}>
          <span>{movie.release_date || 'Unknown year'}</span>
          <span>{movie.vote_count} votes</span>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
