import React from 'react';
import { Book, Star, Clock, Bookmark } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total de Livros', value: '128', icon: Book, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Lidos este ano', value: '24', icon: Bookmark, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Média de Avaliação', value: '4.8', icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Horas de Leitura', value: '450h', icon: Clock, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-display font-bold text-white mb-2">Bem-vindo de volta, Ramom</h2>
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
            <h3 className="text-xl font-bold text-white">Leituras Recentes</h3>
            <button className="text-emerald-400 text-sm font-medium hover:underline">Ver tudo</button>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-800/30 transition-colors group">
                <div className="w-16 h-24 rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                  <img 
                    src={`https://picsum.photos/seed/book${i+10}/200/300`} 
                    alt="Capa do Livro" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-1">O Alquimista</h4>
                  <p className="text-slate-400 text-sm mb-3">Paulo Coelho • 1988</p>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-3/4 rounded-full"></div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-bold">75%</p>
                  <p className="text-slate-500 text-xs uppercase tracking-tighter">Progresso</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-xl font-bold text-white mb-8">Sua Meta 2026</h3>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552.92} strokeDashoffset={552.92 * (1 - 0.48)} className="text-emerald-500" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl font-display font-bold text-white">24/50</p>
                <p className="text-slate-500 text-sm uppercase tracking-widest">Livros</p>
              </div>
            </div>
            <p className="mt-8 text-center text-slate-400 text-sm">
              Você está no caminho certo! <br /> 
              <span className="text-emerald-400 font-medium">Mais 26 livros</span> para atingir sua meta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
