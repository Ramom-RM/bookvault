import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageSquare, Filter } from 'lucide-react';
import { useError } from '../contexts/useError';

interface Review {
  id: number;
  usuario_nome: string;
  nota: number;
  avaliacao: string;
  livro_titulo?: string;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { addError } = useError();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);

        // Buscar lista de livros
        const livrosResponse = await fetch('http://localhost:8000/api/livros', {
          credentials: 'include'
        });

        if (!livrosResponse.ok) {
          throw new Error('Erro ao buscar livros');
        }

        const livrosResult = await livrosResponse.json();

        if (!livrosResult.success || !Array.isArray(livrosResult.data)) {
          throw new Error('Formato de resposta inválido');
        }

        // Buscar avaliações dos primeiros 4 livros
        const allReviews: Review[] = [];
        const livrosToFetch = livrosResult.data.slice(0, 4);

        for (const livro of livrosToFetch) {
          const response = await fetch(`http://localhost:8000/api/livro?id=${livro.id}`, {
            credentials: 'include'
          });

          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data && Array.isArray(result.data.avaliacoes)) {
              const avaliacoes = result.data.avaliacoes.map((av: any) => ({
                ...av,
                livro_titulo: livro.titulo
              }));
              allReviews.push(...avaliacoes);
            }
          }
        }

        setReviews(allReviews);
      } catch (err) {
        const errorMsg = 'Erro ao carregar avaliações';
        addError(errorMsg, 'error');
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [addError]);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        fill={i < Math.round(rating) ? "currentColor" : "transparent"} 
        className={i < Math.round(rating) ? "" : "text-slate-700"} 
      />
    ));
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-in fade-in">
        <p className="text-slate-400">Carregando avaliações...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-2">Avaliações da Comunidade</h2>
          <p className="text-slate-400">Veja o que outros leitores estão dizendo sobre seus livros favoritos.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
          <Filter size={18} />
          <span className="text-sm font-bold uppercase tracking-widest">Filtrar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="glass-card p-6 space-y-4 hover:border-slate-700 transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-800">
                    <img 
                      src={`https://picsum.photos/seed/${review.usuario_nome}/100/100`} 
                      alt={review.usuario_nome} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{review.usuario_nome}</p>
                    <p className="text-slate-500 text-xs">Recentemente</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {renderStars(review.nota)}
                </div>
              </div>

              <div className="py-2">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Sobre o livro:</p>
                <p className="text-emerald-400 font-bold text-sm">{review.livro_titulo}</p>
              </div>

              <p className="text-slate-300 leading-relaxed italic">"{review.avaliacao}"</p>

              <div className="flex items-center gap-6 pt-4 border-t border-slate-800/50">
                <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors">
                  <ThumbsUp size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Útil (0)</span>
                </button>
                <button className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors">
                  <MessageSquare size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Responder</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-400 col-span-full">Nenhuma avaliação disponível ainda.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
