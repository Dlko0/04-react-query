import type { FormEvent } from 'react';
import css from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <label className={css.srOnly} htmlFor="movie-search">
        Search movies
      </label>
      <input
        id="movie-search"
        className={css.searchInput}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for a movie..."
        autoComplete="off"
      />
      <button className={css.searchButton} type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
