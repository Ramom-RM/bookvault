import React from 'react';
import { Filter, Grid, List, MoreVertical, Star } from 'lucide-react';

const BookListing: React.FC = () => {
  const books = [
    { id: 1, title: 'Duna', author: 'Frank Herbert', year: 1965, rating: 4.9, category: 'Ficção Científica', cover: 'https://picsum.photos/seed/dune/300/450' },
    { id: 2, title: '1984', author: 'George Orwell', year: 1949, rating: 4.8, category: 'Distopia', cover: 'https://picsum.photos/seed/1984/300/450' },
    { id: 3, title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien', year: 1954, rating: 5.0, category: 'Fantasia', cover: 'https://picsum.photos/seed/lotr/300/450' },
    { id: 4, title: 'O Hobbit', author: 'J.R.R. Tolkien', year: 1937, rating: 4.7, category: 'Fantasia', cover: 'https://picsum.photos/seed/hobbit/300/450' },
    { id: 5, title: 'Neuromancer', author: 'William Gibson', year: 1984, rating: 4.6, category: 'Cyberpunk', cover: 'https://picsum.photos/seed/neuro/300/450' },
    { id: 6, title: 'Fundação', author: 'Isaac Asimov', year: 1951, rating: 4.8, category: 'Ficção Científica', cover: 'https://picsum.photos/seed/foundation/300/450' },
  ];

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
                  <span className="text-xs font-bold">{book.rating}</span>
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
