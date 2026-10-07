import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getMovies } from '../../services/movieService';
import MovieCard from '../MovieCard/MovieCard';
import Pagination from '../Pagination/Pagination';
import css from './App.module.css';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const moviePage = useQuery({
    queryKey: ['movies', page, query.trim()],
    queryFn: () => getMovies(page, query.trim()),
    enabled: query.trim().length > 0,
    retry: false,
  });

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const movies = moviePage.data?.results ?? [];
  const totalPages = moviePage.data?.total_pages ?? 0;

  return (
    <main className={css.app}>
      <header className={css.header}>
        <div>
          <p className={css.eyebrow}>Explore the cinema</p>
          <h1>Movie Finder</h1>
          <p className={css.description}>
            Search a vast collection of films and browse every page of the
            result.
          </p>
        </div>
        <form
          className={css.searchForm}
          onSubmit={(event) => {
            event.preventDefault();
            setPage(1);
          }}
        >
          <label className={css.srOnly} htmlFor="movie-search">
            Search movies
          </label>
          <input
            id="movie-search"
            className={css.searchInput}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for a movie..."
            autoComplete="off"
          />
          <button className={css.searchButton} type="submit">
            Search
          </button>
        </form>
      </header>

      <section className={css.content} aria-live="polite">
        {query.trim().length === 0 && (
          <div className={css.emptyState}>
            <span className={css.emptyIcon} aria-hidden="true">
              🎬
            </span>
            <h2>Start your search</h2>
            <p>Enter a movie title to discover matching films.</p>
          </div>
        )}

        {query.trim().length > 0 && moviePage.isPending && (
          <div className={css.status} role="status">
            Loading movies...
          </div>
        )}

        {query.trim().length > 0 && moviePage.isError && (
          <div className={css.error} role="alert">
            We could not load the movies. Check your API configuration and try
            again.
          </div>
        )}

        {query.trim().length > 0 &&
          moviePage.isSuccess &&
          movies.length === 0 && (
            <div className={css.emptyState}>
              <h2>No movies found</h2>
              <p>Try another title or check the spelling.</p>
            </div>
          )}

        {movies.length > 0 && (
          <>
            <div className={css.resultsSummary}>
              <span>{moviePage.data?.total_results ?? 0} results</span>
              <span>
                Page {page} of {totalPages}
              </span>
            </div>
            <div className={css.movieGrid}>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
              />
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default App;
