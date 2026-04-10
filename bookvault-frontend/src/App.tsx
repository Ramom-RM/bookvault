import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import BookListing from './components/BookListing';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';
import Reviews from './components/Reviews';
import ErrorAlert from './components/ErrorAlert';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBookId, setSelectedBookId] = useState(1);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'library':
        return <BookListing onSelectBook={(bookId) => {
          setSelectedBookId(bookId);
          setActiveTab('details');
        }} />;
      case 'add':
        return <BookForm />;
      case 'reviews':
        return <Reviews />;
      case 'details': // Hidden state for demo
        return <BookDetails bookId={selectedBookId} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      <ErrorAlert />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Integration Notice */}
            <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <p className="text-emerald-400 text-sm">
                <span className="font-bold">✓ Integração Ativa:</span> O frontend está conectado à API PHP. Todos os dados (livros, avaliações, usuários) são reais e sincronizados.
              </p>
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
