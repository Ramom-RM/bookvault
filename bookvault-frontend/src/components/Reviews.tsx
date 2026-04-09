import React from 'react';
import { Star, ThumbsUp, MessageSquare, Filter } from 'lucide-react';

const Reviews: React.FC = () => {
  const reviews = [
    { id: 1, user: 'Ana Silva', rating: 5, date: '2 dias atrás', comment: 'Simplesmente incrível. A narrativa me prendeu do início ao fim.', book: 'O Alquimista', avatar: 'https://i.pravatar.cc/150?u=ana' },
    { id: 2, user: 'Carlos Mendes', rating: 4, date: '1 semana atrás', comment: 'Muito bom, mas achei o meio um pouco arrastado. Vale a leitura pela conclusão.', book: 'Duna', avatar: 'https://i.pravatar.cc/150?u=carlos' },
    { id: 3, user: 'Juliana Costa', rating: 5, date: '2 semanas atrás', comment: 'Um clássico que todo mundo deveria ler pelo menos uma vez na vida.', book: '1984', avatar: 'https://i.pravatar.cc/150?u=ju' },
    { id: 4, user: 'Roberto Paz', rating: 3, date: '1 mês atrás', comment: 'Não era o que eu esperava, mas tem seus méritos técnicos.', book: 'Neuromancer', avatar: 'https://i.pravatar.cc/150?u=rob' },
  ];

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
        {reviews.map((review) => (
          <div key={review.id} className="glass-card p-6 space-y-4 hover:border-slate-700 transition-colors group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-800">
                  <img src={review.avatar} alt={review.user} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{review.user}</p>
                  <p className="text-slate-500 text-xs">{review.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "transparent"} className={i < review.rating ? "" : "text-slate-700"} />
                ))}
              </div>
            </div>

            <div className="py-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Sobre o livro:</p>
              <p className="text-emerald-400 font-bold text-sm">{review.book}</p>
            </div>

            <p className="text-slate-300 leading-relaxed italic">"{review.comment}"</p>

            <div className="flex items-center gap-6 pt-4 border-t border-slate-800/50">
              <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors">
                <ThumbsUp size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Útil (12)</span>
              </button>
              <button className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors">
                <MessageSquare size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Responder</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
