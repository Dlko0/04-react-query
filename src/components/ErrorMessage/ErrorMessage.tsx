import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={css.error} role="alert">
      {message ?? 'Something went wrong. Please try again.'}
    </div>
  );
}

export default ErrorMessage;
