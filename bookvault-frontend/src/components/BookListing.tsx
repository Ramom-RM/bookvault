import React, { useState, useEffect } from 'react';
import { Filter, Grid, List, MoreVertical, Star } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  rating: number;
  category?: string;
  cover: string;
}

const BookListing: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:8000/api/livros', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar livros: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          const mappedBooks: Book[] = result.data.map((book: any) => ({
            id: book.id,
            title: book.titulo,
            author: book.autor,
            year: book.ano_de_lancamento,
            rating: book.nota_avaliacao || 0,
            category: 'Geral',
            cover: book.imagem ? `http://localhost:8000/${book.imagem}` : `https://picsum.photos/seed/book${book.id}/300/450`
          }));
          setBooks(mappedBooks);
        } else {
          throw new Error('Formato de resposta inválido');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (error) {
    return (
      <div className="space-y-8 animate-in fade-in">
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
          <p className="text-rose-400 text-sm">Erro ao carregar livros: {error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-8 animate-in fade-in">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <p className="text-slate-400 text-sm">Carregando livros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">Minha Estante</h2>
          <p className="text-slate-400">Você tem {books.length} livros na sua coleção digital.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
            <Filter size={20} />
          </button>
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button className="p-1.5 bg-slate-800 text-emerald-400 rounded-lg">
              <Grid size={18} />
            </button>
            <button className="p-1.5 text-slate-500 hover:text-slate-300 rounded-lg">
              <List size={18} />
            </button>
          </div>
          <button className="btn-primary py-2.5 px-5 text-sm">
            Novo Livro
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {books.map((book) => (
          <div key={book.id} className="book-card group cursor-pointer">
            <div className="relative aspect-[2/3] overflow-hidden">
              <img 
                src={book.cover} 
                alt={book.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-bold">{book.rating.toFixed(1)}</span>
                </div>
                <p className="text-white font-bold text-sm line-clamp-1">{book.title}</p>
                <p className="text-slate-300 text-xs">{book.author}</p>
              </div>
              <button className="absolute top-3 right-3 p-1.5 bg-slate-950/50 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={16} />
              </button>
            </div>
            <div className="p-4">
              <h4 className="text-white font-bold text-sm mb-1 truncate">{book.title}</h4>
              <p className="text-slate-500 text-xs mb-2">{book.author}</p>
              <span className="inline-block px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider rounded">
                {book.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookListing;
