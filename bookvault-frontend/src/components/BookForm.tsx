import React from 'react';
import { Upload, X, Save, ArrowLeft } from 'lucide-react';

const BookForm: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <button className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-display font-bold text-white">Adicionar Novo Livro</h2>
          <p className="text-slate-400">Preencha as informações para catalogar sua nova aquisição.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="glass-card p-6 aspect-[2/3] flex flex-col items-center justify-center border-dashed border-2 border-slate-700 hover:border-emerald-500/50 transition-colors cursor-pointer group">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
              <Upload size={24} />
            </div>
            <p className="text-white font-bold text-center">Upload da Capa</p>
            <p className="text-slate-500 text-xs text-center mt-2">Arraste uma imagem ou clique para selecionar (JPG, PNG)</p>
          </div>
        </div>

        <div className="md:col-span-2 glass-card p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Título do Livro</label>
              <input 
                type="text" 
                placeholder="Ex: Cem Anos de Solidão" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Autor</label>
              <input 
                type="text" 
                placeholder="Ex: Gabriel García Márquez" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ano</label>
              <input 
                type="number" 
                placeholder="1967" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Categoria / Gênero</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none">
                <option>Selecione uma categoria</option>
                <option>Ficção</option>
                <option>Não-ficção</option>
                <option>Fantasia</option>
                <option>Terror</option>
                <option>Biografia</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sinopse / Descrição</label>
            <textarea 
              rows={4}
              placeholder="Escreva um breve resumo do livro..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
            ></textarea>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button className="btn-primary flex-1">
              <Save size={20} />
              Salvar Livro
            </button>
            <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
