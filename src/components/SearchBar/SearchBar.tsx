import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const query = formData.get('query')?.toString().trim() ?? '';

    if (!query) {
      toast.error('Enter a movie title to search.');
      return;
    }

    onSubmit(query);
  };

  return (
    <form className={css.searchForm} action={handleSubmit}>
      <label className={css.srOnly} htmlFor="movie-search">
        Search movies
      </label>
      <input
        id="movie-search"
        name="query"
        className={css.searchInput}
        type="search"
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
