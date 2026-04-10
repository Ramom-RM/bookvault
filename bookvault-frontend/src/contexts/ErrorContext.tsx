import React, { createContext, useState, useCallback } from 'react';

export interface AppError {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: number;
}

interface ErrorContextType {
  errors: AppError[];
  addError: (message: string, type?: 'error' | 'warning' | 'info') => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [errors, setErrors] = useState<AppError[]>([]);

  const addError = useCallback((message: string, type: 'error' | 'warning' | 'info' = 'error') => {
    const id = `${Date.now()}-${Math.random()}`;
    const newError: AppError = {
      id,
      message,
      type,
      timestamp: Date.now()
    };

    setErrors(prev => [...prev, newError]);

    // Auto-remove error após 5 segundos
    if (type === 'error' || type === 'warning') {
      setTimeout(() => removeError(id), 5000);
    } else {
      setTimeout(() => removeError(id), 3000);
    }
  }, []);

  const removeError = useCallback((id: string) => {
    setErrors(prev => prev.filter(error => error.id !== id));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  return (
    <ErrorContext.Provider value={{ errors, addError, removeError, clearErrors }}>
      {children}
    </ErrorContext.Provider>
  );
};
