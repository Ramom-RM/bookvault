import React from 'react';
import { AlertCircle, CheckCircle, InfoIcon, X } from 'lucide-react';
import { useError } from '../contexts/useError';

const ErrorAlert: React.FC = () => {
  const { errors, removeError } = useError();

  if (errors.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {errors.map((error) => {
        const isError = error.type === 'error';
        const isWarning = error.type === 'warning';
        const isInfo = error.type === 'info';

        return (
          <div
            key={error.id}
            className={`rounded-lg p-4 flex items-start gap-3 border animate-in fade-in slide-in-from-top-2 duration-300 ${
              isError
                ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                : isWarning
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                  : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
            }`}
          >
            <div className="flex-shrink-0 pt-0.5">
              {isError && <AlertCircle size={18} />}
              {isWarning && <AlertCircle size={18} />}
              {isInfo && <InfoIcon size={18} />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{error.message}</p>
            </div>
            <button
              onClick={() => removeError(error.id)}
              className="flex-shrink-0 text-current hover:opacity-70 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ErrorAlert;
