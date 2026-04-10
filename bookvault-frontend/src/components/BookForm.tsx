import React, { useState } from 'react';
import { Upload, X, Save, ArrowLeft } from 'lucide-react';
import { useError } from '../contexts/useError';

const BookForm: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { addError } = useError();

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos obrigatórios
    if (!titulo.trim() || !autor.trim() || !ano.trim() || !categoria.trim() || !descricao.trim()) {
      setMessage({ 
        type: 'error', 
        text: 'Por favor, preencha todos os campos obrigatórios.' 
      });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const response = await fetch('http://localhost:8000/api/livro', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titulo: titulo.trim(),
          autor: autor.trim(),
          ano_de_lancamento: parseInt(ano, 10),
          descricao: descricao.trim()
        })
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: 'Livro adicionado com sucesso!' 
        });
        
        // Limpar formulário
        setTitulo('');
        setAutor('');
        setAno('');
        setCategoria('');
        setDescricao('');

        // Limpar mensagem após 3 segundos
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ 
          type: 'error', 
          text: result.error || 'Erro ao adicionar livro.' 
        });
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Erro ao adicionar livro';
      setMessage({ 
        type: 'error', 
        text: errorMsg
      });
      addError(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <button className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors" disabled={loading}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-3xl font-display font-bold text-white">Adicionar Novo Livro</h2>
          <p className="text-slate-400">Preencha as informações para catalogar sua nova aquisição.</p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl border ${
          message.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <p className="text-sm">{message.text}</p>
        </div>
      )}

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
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                disabled={loading}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Autor</label>
              <input 
                type="text" 
                placeholder="Ex: Gabriel García Márquez"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                disabled={loading}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ano</label>
              <input 
                type="number" 
                placeholder="1967"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                disabled={loading}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Categoria / Gênero</label>
              <select 
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                disabled={loading}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Selecione uma categoria</option>
                <option value="Ficção">Ficção</option>
                <option value="Não-ficção">Não-ficção</option>
                <option value="Fantasia">Fantasia</option>
                <option value="Terror">Terror</option>
                <option value="Biografia">Biografia</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sinopse / Descrição</label>
            <textarea 
              rows={4}
              placeholder="Escreva um breve resumo do livro..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              disabled={loading}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            ></textarea>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button 
              onClick={submitForm}
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Save size={20} />
              {loading ? 'Salvando...' : 'Salvar Livro'}
            </button>
            <button 
              disabled={loading}
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
