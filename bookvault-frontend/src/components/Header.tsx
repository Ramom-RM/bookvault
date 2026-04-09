import React from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-20 border-b border-slate-800/50 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar na sua biblioteca..." 
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-slate-950"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-800"></div>

        <button className="flex items-center gap-3 group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">Ramom Link</p>
            <p className="text-xs text-slate-500">Curador Master</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden group-hover:border-emerald-500/50 transition-all">
            <img 
              src="https://picsum.photos/seed/user/100/100" 
              alt="Avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <ChevronDown size={16} className="text-slate-500 group-hover:text-white transition-colors" />
        </button>
      </div>
    </header>
  );
};

export default Header;
