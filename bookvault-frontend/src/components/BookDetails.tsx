import React from 'react';
import { Star, Clock, BookOpen, Share2, Heart, MessageSquare, ArrowLeft } from 'lucide-react';

const BookDetails: React.FC = () => {
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
              src="https://picsum.photos/seed/dune/600/900" 
              alt="Capa do Livro" 
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
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest rounded-full">Ficção Científica</span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <span className="ml-2 text-slate-400 text-sm font-medium">(452 avaliações)</span>
              </div>
            </div>
            <h1 className="text-5xl font-display font-bold text-white mb-4 leading-tight">Duna: Edição de Luxo</h1>
            <p className="text-2xl text-slate-400 font-display italic">Frank Herbert • 1965</p>
          </div>

          <div className="grid grid-cols-3 gap-6 py-8 border-y border-slate-800/50">
            <div className="text-center">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Páginas</p>
              <p className="text-2xl font-display font-bold text-white">680</p>
            </div>
            <div className="text-center border-x border-slate-800/50">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Tempo Médio</p>
              <p className="text-2xl font-display font-bold text-white">12h 30m</p>
            </div>
            <div className="text-center">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Idioma</p>
              <p className="text-2xl font-display font-bold text-white">PT-BR</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Sinopse</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              Em um futuro distante, o jovem Paul Atreides e sua família aceitam o controle do planeta deserto Arrakis, a única fonte da substância mais valiosa do universo: a "especiaria". Arrakis é um mundo perigoso onde a água é o bem mais precioso e vermes gigantes habitam as areias. <br /><br />
              Duna explora as complexas interações de política, religião, ecologia, tecnologia e emoção humana, enquanto as facções do império lutam pelo controle de Arrakis e sua especiaria.
            </p>
          </div>

          <div className="glass-card p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Sua Avaliação</h3>
              <button className="text-emerald-400 text-sm font-medium hover:underline">Editar</button>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/50">
                <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 text-amber-400">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-slate-300 italic">"Uma obra-prima absoluta. A construção de mundo é incomparável e os temas políticos continuam extremamente relevantes hoje."</p>
                <p className="text-slate-500 text-xs">Avaliado em 12 de Março, 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
