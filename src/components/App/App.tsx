import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const moviePage = useQuery({
    queryKey: ['movies', page, query.trim()],
    queryFn: () => getMovies(page, query.trim()),
    enabled: query.trim().length > 0,
    retry: false,
    placeholderData: (previousData) => previousData,
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
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={(searchQuery) => {
            setQuery(searchQuery);
            setPage(1);
          }}
        />
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

        {query.trim().length > 0 && moviePage.isPending && <Loader />}

        {query.trim().length > 0 && moviePage.isError && (
          <ErrorMessage message="We could not load the movies. Check your API configuration and try again." />
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
            <MovieGrid movies={movies} onSelect={setSelectedMovie} />
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
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </main>
  );
}

export default App;
