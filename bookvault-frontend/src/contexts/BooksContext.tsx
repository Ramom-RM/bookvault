import React, { createContext, useState, useCallback } from 'react';

export interface BookData {
  id: number;
  titulo: string;
  autor: string;
  descricao: string;
  ano_de_lancamento: number;
  imagem: string;
  nota_avaliacao: number;
  count_avaliacoes: number;
}

export interface Review {
  id: number;
  usuario_nome: string;
  nota: number;
  avaliacao: string;
}

interface BooksContextType {
  books: BookData[];
  setBooks: (books: BookData[]) => void;
  addBook: (book: BookData) => void;
  updateBook: (id: number, book: Partial<BookData>) => void;
  refreshBooks: () => Promise<void>;
  isRefreshing: boolean;
}

export const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const addBook = useCallback((book: BookData) => {
    setBooks(prev => [book, ...prev]);
  }, []);

  const updateBook = useCallback((id: number, updates: Partial<BookData>) => {
    setBooks(prev =>
      prev.map(book =>
        book.id === id ? { ...book, ...updates } : book
      )
    );
  }, []);

  const refreshBooks = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch('http://localhost:8000/api/livros', {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar livros');
      }

      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setBooks(result.data);
      }
    } catch (err) {
      console.error('Erro ao atualizar livros:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  return (
    <BooksContext.Provider value={{ books, setBooks, addBook, updateBook, refreshBooks, isRefreshing }}>
      {children}
    </BooksContext.Provider>
  );
};
