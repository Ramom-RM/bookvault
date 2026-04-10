import { useContext } from 'react';
import { ErrorContext } from './ErrorContext';

export const useError = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('useError deve ser usado dentro de ErrorProvider');
  }

  return context;
};
