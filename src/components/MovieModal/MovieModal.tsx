import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    if (!movie) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [movie, onClose]);

  if (!movie) {
    return null;
  }

  return createPortal(
    <div className={css.backdrop} role="presentation" onMouseDown={onClose}>
      <section
        className={css.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className={css.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close movie details"
        >
          ×
        </button>
        <div className={css.poster}>
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w800${movie.poster_path}`}
              alt={`${movie.title} poster`}
            />
          ) : (
            <div className={css.posterPlaceholder}>🎬</div>
          )}
        </div>
        <div className={css.content}>
          <p className={css.eyebrow}>Movie details</p>
          <h2 id="movie-modal-title">{movie.title}</h2>
          <div className={css.stats}>
            <span>Release: {movie.release_date || 'Unknown'}</span>
            <span>Rating: {movie.vote_average.toFixed(1)}</span>
            <span>{movie.vote_count} votes</span>
          </div>
          <p className={css.overview}>
            {movie.overview || 'No overview available.'}
          </p>
        </div>
      </section>
    </div>,
    document.body,
  );
}

export default MovieModal;
