import css from './Loader.module.css';

function Loader() {
  return (
    <div className={css.loader} role="status" aria-live="polite">
      <span className={css.spinner} aria-hidden="true" />
      <span>Loading movies...</span>
    </div>
  );
}

export default Loader;
