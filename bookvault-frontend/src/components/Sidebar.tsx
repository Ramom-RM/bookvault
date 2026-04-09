import React from 'react';
import { LayoutGrid, BookOpen, PlusCircle, Star, Settings, LogOut, Search, Bell, User } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'library', label: 'Minha Estante', icon: BookOpen },
    { id: 'add', label: 'Adicionar Livro', icon: PlusCircle },
    { id: 'reviews', label: 'Avaliações', icon: Star },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 bg-slate-950 border-r border-slate-800/50 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <BookOpen className="text-slate-950 w-6 h-6" />
        </div>
        <h1 className="text-xl font-display font-bold text-white tracking-tight">BookVault</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-4">Menu Principal</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`sidebar-link w-full ${activeTab === item.id ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-800/50 space-y-2">
        <button className="sidebar-link w-full">
          <Settings size={20} />
          <span>Configurações</span>
        </button>
        <button className="sidebar-link w-full text-rose-400 hover:bg-rose-500/10 hover:text-rose-400">
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
