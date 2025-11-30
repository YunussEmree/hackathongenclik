import { useEffect } from 'react';
import './ErrorToast.css';

type ErrorToastProps = {
  message: string;
  duration?: number;
  onClose?: () => void;
};

const ErrorToast: React.FC<ErrorToastProps> = ({ message, duration = 4000, onClose }) => {
  useEffect(() => {
    if (!onClose) return;

    const timer = window.setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [duration, onClose]);

  return (
    <div className="error-toast">
      <div className="error-toast-content">
        <span className="error-toast-badge">Hata: </span>
        <span className="error-toast-message">{message}</span>
      </div>
      {onClose ? (
        <button className="error-toast-close" type="button"  onClick={onClose}>
          x
        </button>
      ) : null}
    </div>
  );
};

export default ErrorToast;
