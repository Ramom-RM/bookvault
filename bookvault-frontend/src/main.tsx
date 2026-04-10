import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorProvider } from './contexts/ErrorContext';
import { BooksProvider } from './contexts/BooksContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorProvider>
      <BooksProvider>
        <App />
      </BooksProvider>
    </ErrorProvider>
  </StrictMode>,
);
