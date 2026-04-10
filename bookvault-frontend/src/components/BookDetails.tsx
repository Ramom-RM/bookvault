import React, { useState, useEffect } from 'react';
import { Star, Clock, BookOpen, Share2, Heart, MessageSquare, ArrowLeft } from 'lucide-react';
import { useError } from '../contexts/useError';

interface Review {
  id: number;
  usuario_nome: string;
  nota: number;
  avaliacao: string;
}

interface BookData {
  id: number;
  titulo: string;
  autor: string;
  descricao: string;
  ano_de_lancamento: number;
  imagem: string;
  nota_avaliacao: number;
  count_avaliacoes: number;
}

interface User {
  id: number;
  nome: string;
  email: string;
}

interface BookDetailsProps {
  bookId?: number;
}

const BookDetails: React.FC<BookDetailsProps> = ({ bookId = 1 }) => {
  const [book, setBook] = useState<BookData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { addError } = useError();
  
  // Estados do formulário de avaliação
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reviewMessage, setReviewMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/me', {
          credentials: 'include'
        });

        const result = await response.json();

        if (result.success && result.data) {
          setUser(result.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        addError('Erro ao verificar autenticação', 'warning');
        setUser(null);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:8000/api/livro?id=${bookId}`, {
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar livro: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          setBook(result.data.livro);
          setReviews(result.data.avaliacoes || []);
        } else {
          throw new Error('Formato de resposta inválido');
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
        setError(errorMsg);
        addError(`Erro ao carregar livro: ${errorMsg}`, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId, addError]);

  const refreshBookData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/livro?id=${bookId}`, {
        credentials: 'include'
      });

      if (!response.ok) return;

      const result = await response.json();
      if (result.success && result.data) {
        setBook(result.data.livro);
      }
    } catch (err) {
      addError('Erro ao atualizar dados do livro', 'warning');
    }
  };

  const submitReview = async () => {
    if (!book || !reviewComment.trim()) {
      setReviewMessage({ 
        type: 'error', 
        text: 'Por favor, preencha o comentário antes de enviar.' 
      });
      return;
    }

    try {
      setSubmitting(true);
      setReviewMessage(null);

      const response = await fetch('http://localhost:8000/api/avaliacoes', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          livro_id: book.id,
          nota: reviewRating,
          comentario: reviewComment
        })
      });

      const result = await response.json();

      if (result.success) {
        setReviewMessage({ 
          type: 'success', 
          text: 'Avaliação enviada com sucesso!' 
        });

        const comentarioTemp = reviewComment;
        const notaTemp = reviewRating;

        setReviewComment('');
        setReviewRating(5);

        // Adicionar nova avaliação ao estado imediatamente
        const newReview: Review = {
          id: Date.now(),
          usuario_nome: 'Você',
          nota: notaTemp,
          avaliacao: comentarioTemp
        };
        setReviews([newReview, ...reviews]);

        // Atualizar dados do livro (média, contagem) em background
        refreshBookData();

        // Limpar mensagem de sucesso após 3 segundos
        setTimeout(() => {
          setReviewMessage(null);
        }, 3000);
      } else {
        setReviewMessage({ 
          type: 'error', 
          text: result.error || 'Erro ao enviar avaliação.' 
        });
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      setReviewMessage({ 
        type: 'error', 
        text: errorMsg
      });
      addError(`Erro ao enviar avaliação: ${errorMsg}`, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in">
        <p className="text-slate-400">Carregando detalhes do livro...</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in">
        <p className="text-rose-400">Erro ao carregar livro: {error}</p>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        fill={i < Math.round(rating) ? 'currentColor' : 'transparent'} 
        className={i < Math.round(rating) ? '' : 'text-slate-700'}
      />
    ));
  };

  const coverUrl = book.imagem ? `http://localhost:8000/${book.imagem}` : `https://picsum.photos/seed/book${book.id}/600/900`;

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold uppercase tracking-widest">Voltar para Estante</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10 border border-slate-800">
            <img 
              src={coverUrl}
              alt={book.titulo} 
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex gap-4">
            <button className="btn-primary flex-1">
              <BookOpen size={20} />
              Começar Leitura
            </button>
            <button className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 transition-all">
              <Heart size={24} />
            </button>
            <button className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all">
              <Share2 size={24} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest rounded-full">
                {book.titulo.split(' ')[0]}
              </span>
              <div className="flex items-center gap-1 text-amber-400">
                {renderStars(book.nota_avaliacao)}
                <span className="ml-2 text-slate-400 text-sm font-medium">({book.count_avaliacoes} avaliações)</span>
              </div>
            </div>
            <h1 className="text-5xl font-display font-bold text-white mb-4 leading-tight">{book.titulo}</h1>
            <p className="text-2xl text-slate-400 font-display italic">{book.autor} • {book.ano_de_lancamento}</p>
          </div>

          <div className="grid grid-cols-3 gap-6 py-8 border-y border-slate-800/50">
            <div className="text-center">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Média</p>
              <p className="text-2xl font-display font-bold text-white">{book.nota_avaliacao.toFixed(1)}</p>
            </div>
            <div className="text-center border-x border-slate-800/50">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Avaliações</p>
              <p className="text-2xl font-display font-bold text-white">{book.count_avaliacoes}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Ano</p>
              <p className="text-2xl font-display font-bold text-white">{book.ano_de_lancamento}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Sinopse</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              {book.descricao}
            </p>
          </div>

          <div className="glass-card p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Sua Avaliação</h3>
              
              {checkingAuth ? (
                <p className="text-slate-400">Verificando autenticação...</p>
              ) : !user ? (
                <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                  <p className="text-slate-300 mb-3">
                    Você precisa estar logado para deixar uma avaliação.
                  </p>
                  <a href="http://localhost:8000/login" className="inline-block px-4 py-2 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 transition-colors">
                    Fazer Login
                  </a>
                </div>
              ) : (
                <>
                  {reviewMessage && (
                    <div className={`p-4 rounded-lg mb-4 ${
                      reviewMessage.type === 'success' 
                        ? 'bg-emerald-500/10 border border-emerald-500/20' 
                        : 'bg-rose-500/10 border border-rose-500/20'
                    }`}>
                      <p className={reviewMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}>
                        {reviewMessage.text}
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                        Nota (1-5)
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => setReviewRating(rating)}
                            className={`p-2 rounded-lg transition-all ${
                              reviewRating >= rating
                                ? 'bg-amber-500 text-white'
                                : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
                            }`}
                          >
                            <Star size={20} fill={reviewRating >= rating ? 'currentColor' : 'none'} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                        Seu Comentário
                      </label>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Compartilhe sua opinião sobre este livro..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none"
                        rows={4}
                      />
                    </div>

                    <button
                      onClick={submitReview}
                      disabled={submitting}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Enviando...' : 'Enviar Avaliação'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {reviews.length > 0 && (
            <div className="glass-card p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Avaliações da Comunidade</h3>
              </div>
              
              <div className="space-y-6 max-h-96 overflow-y-auto">
                {reviews.map((review) => (
                  <div key={review.id} className="flex items-start gap-6 pb-6 border-b border-slate-800/50 last:border-b-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/50 flex-shrink-0">
                      <img 
                        src={`https://picsum.photos/seed/${review.usuario_nome}/100/100`} 
                        alt={review.usuario_nome} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-white font-bold text-sm">{review.usuario_nome}</p>
                      <div className="flex items-center gap-2 text-amber-400">
                        {renderStars(review.nota)}
                      </div>
                      <p className="text-slate-300 italic">"{review.avaliacao}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
