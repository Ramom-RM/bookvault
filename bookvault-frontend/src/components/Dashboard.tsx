import React, { useState, useEffect } from 'react';
import { Book, Star, Clock, Bookmark } from 'lucide-react';
import { useError } from '../contexts/useError';

interface BookData {
  id: number;
  titulo: string;
  autor: string;
  ano_de_lancamento: number;
  imagem: string;
  nota_avaliacao: number;
  count_avaliacoes: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState([
    { label: 'Total de Livros', value: '0', icon: Book, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Com Avaliações', value: '0', icon: Bookmark, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Média de Avaliação', value: '0.0', icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Total de Reviews', value: '0', icon: Clock, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ]);

  const [recentBooks, setRecentBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalBooks, setTotalBooks] = useState(0);
  const { addError } = useError();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const response = await fetch('http://localhost:8000/api/livros', {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar estatísticas');
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          const books = result.data as BookData[];
          
          // Calcular estatísticas
          const total = books.length;
          const withReviews = books.filter((b) => b.count_avaliacoes > 0).length;
          const avgRating = books.length > 0
            ? (books.reduce((sum, b) => sum + b.nota_avaliacao, 0) / books.length).toFixed(1)
            : '0.0';
          const totalReviews = books.reduce((sum, b) => sum + b.count_avaliacoes, 0);

          setStats([
            { label: 'Total de Livros', value: total.toString(), icon: Book, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: 'Com Avaliações', value: withReviews.toString(), icon: Bookmark, color: 'text-blue-400', bg: 'bg-blue-500/10' },
            { label: 'Média de Avaliação', value: avgRating.toString(), icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10' },
            { label: 'Total de Reviews', value: totalReviews.toString(), icon: Clock, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          ]);

          setRecentBooks(books.slice(0, 3));
          setTotalBooks(total);
        }
      } catch (err) {
        const errorMsg = 'Erro ao carregar dashboard';
        addError(errorMsg, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [addError]);

  if (loading) {
    return (
      <div className="space-y-8 animate-in fade-in">
        <p className="text-slate-400">Carregando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-display font-bold text-white mb-2">Bem-vindo de volta!</h2>
        <p className="text-slate-400">Aqui está o que aconteceu na sua biblioteca ultimamente.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card group hover:border-slate-700 transition-colors">
            <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-display font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Livros Recentes</h3>
            <button className="text-emerald-400 text-sm font-medium hover:underline">Ver tudo</button>
          </div>
          
          <div className="space-y-6">
            {recentBooks.length > 0 ? (
              recentBooks.map((book) => (
                <div key={book.id} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-800/30 transition-colors group">
                  <div className="w-16 h-24 rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                    <img 
                      src={book.imagem ? `http://localhost:8000/${book.imagem}` : `https://picsum.photos/seed/book${book.id}/200/300`} 
                      alt={book.titulo} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-1">{book.titulo}</h4>
                    <p className="text-slate-400 text-sm mb-3">{book.autor} • {book.ano_de_lancamento}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-amber-400">
                        <Star size={14} fill="currentColor" />
                      </div>
                      <span className="text-slate-400 text-xs">{book.nota_avaliacao.toFixed(1)} ({book.count_avaliacoes} avaliações)</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400">Nenhum livro disponível</p>
            )}
          </div>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-xl font-bold text-white mb-8">Resumo da Biblioteca</h3>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                <circle 
                  cx="96" 
                  cy="96" 
                  r="88" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  fill="transparent" 
                  strokeDasharray={552.92} 
                  strokeDashoffset={totalBooks > 0 ? 552.92 * (1 - Math.min(totalBooks, 50) / 50) : 552.92} 
                  className="text-emerald-500" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl font-display font-bold text-white">{totalBooks}</p>
                <p className="text-slate-500 text-sm uppercase tracking-widest">Livros</p>
              </div>
            </div>
            <p className="mt-8 text-center text-slate-400 text-sm">
              Você tem <br /> 
              <span className="text-emerald-400 font-medium">{totalBooks} livros</span> no seu acervo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
