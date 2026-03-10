import { useState } from 'react';
import { Plus, Trash2, BookOpen } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Disciplines() {
  const { state, dispatch } = useData();
  const { disciplines } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', professor: '', semester: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDiscipline = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_DISCIPLINE', payload: newDiscipline });
    setFormData({ name: '', professor: '', semester: '' });
    setIsModalOpen(false);
  };

  const deleteDiscipline = (id) => {
    if (confirm('Tem certeza que deseja excluir esta disciplina?')) {
      dispatch({ type: 'DELETE_DISCIPLINE', payload: id });
    }
  };

  const glowClasses = ['glow-purple', 'glow-teal', 'glow-rose', 'glow-amber'];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Minhas Disciplinas</h1>
          <p className="text-slate-500 font-medium">Gerencie as matérias que você está cursando.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-brand-primary/20 transition-all hover:scale-105 active:scale-95"
        >
          <Plus size={20} />
          Nova Disciplina
        </button>
      </div>

      {disciplines.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 glass rounded-card border-none">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <BookOpen size={40} className="text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-white">Nada por aqui ainda</h3>
          <p className="text-slate-500 max-w-xs text-center mb-8 font-medium">
            Comece cadastrando sua primeira disciplina para organizar suas tarefas e notas.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-brand-primary font-bold hover:underline"
          >
            Adicionar agora
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplines.map((d, i) => (
            <div key={d.id} className={`glass p-8 rounded-card relative overflow-hidden group hover:border-white/10 transition-all ${glowClasses[i % 4]}`}>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white border border-white/5">
                    <BookOpen size={24} />
                  </div>
                  <button 
                    onClick={() => deleteDiscipline(d.id)}
                    className="p-2 text-slate-500 hover:text-brand-accent hover:bg-brand-accent/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{d.name}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-1 mb-6 font-medium">
                  <span className="text-slate-400">Prof:</span> {d.professor}
                </p>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{d.semester}º Semestre</span>
                  <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest">3 tarefas</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal - Dark Theme */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass w-full max-w-md rounded-card p-10 animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-bold text-white mb-8">Nova Disciplina</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nome da Matéria</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: Engenharia de Software"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary text-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Professor</label>
                <input
                  required
                  type="text"
                  value={formData.professor}
                  onChange={e => setFormData({...formData, professor: e.target.value})}
                  placeholder="Nome do docente"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary text-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Semestre</label>
                <input
                  required
                  type="number"
                  min="1"
                  max="12"
                  value={formData.semester}
                  onChange={e => setFormData({...formData, semester: e.target.value})}
                  placeholder="Ex: 5"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary text-white transition-all"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-white/10 rounded-xl font-bold text-slate-400 hover:bg-white/5 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
