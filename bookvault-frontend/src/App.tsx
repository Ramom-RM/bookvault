import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import BookListing from './components/BookListing';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';
import Reviews from './components/Reviews';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'library':
        return <BookListing />;
      case 'add':
        return <BookForm />;
      case 'reviews':
        return <Reviews />;
      case 'details': // Hidden state for demo
        return <BookDetails />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Demo Notice for the user */}
            <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between">
              <p className="text-emerald-400 text-sm">
                <span className="font-bold">Modo de Visualização:</span> Esta é uma estrutura modular pronta para ser convertida em PHP.
              </p>
              <button 
                onClick={() => setActiveTab('details')}
                className="text-xs font-bold uppercase tracking-widest bg-emerald-500 text-slate-950 px-3 py-1 rounded-lg hover:bg-emerald-400 transition-colors"
              >
                Ver Tela de Detalhes
              </button>
            </div>

            {renderContent()}
          </div>
        </main>

        <footer className="p-8 border-t border-slate-800/50 text-center">
          <p className="text-slate-500 text-sm">
            &copy; 2026 BookVault - The Digital Curator. Desenvolvido com foco em elegância e modularidade.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
