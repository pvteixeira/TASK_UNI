import { useState } from 'react';
import { Plus, Target, Calendar, Clock, ChevronRight, Zap } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function StudyPlan() {
  const { state, dispatch } = useData();
  const { studyPlans, disciplines } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', disciplineId: '', objective: '', date: '', duration: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlan = {
      ...formData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_STUDY_PLAN', payload: newPlan });
    setFormData({ title: '', disciplineId: '', objective: '', date: '', duration: '' });
    setIsModalOpen(false);
  };

  const deletePlan = (id) => {
    dispatch({ type: 'DELETE_STUDY_PLAN', payload: id });
  };

  const getDisciplineName = (id) => {
    return disciplines.find(d => d.id === id)?.name || 'Geral';
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Plano de Estudos</h1>
          <p className="text-slate-500 font-medium">Organize suas sessões de foco e metas de aprendizado.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-secondary text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-brand-secondary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={20} />
          Novo Plano
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Calendar size={16} className="text-brand-primary" />
            Próximas Sessões
          </h2>
          
          {studyPlans.length === 0 ? (
            <div className="glass p-12 rounded-card border-none flex flex-col items-center justify-center glow-teal">
              <Zap size={48} className="text-white/5 mb-4" />
              <p className="text-slate-500 font-medium text-center">Nenhum plano de estudo definido ainda.</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-6 text-brand-secondary font-bold hover:underline"
              >
                Definir primeira meta
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {studyPlans.map(plan => (
                <div key={plan.id} className="glass p-6 rounded-card border-none flex items-center justify-between group hover:bg-white/5 transition-all glow-purple">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-secondary border border-white/5">
                      <Target size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{plan.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold text-slate-500 border border-white/5 px-2 py-0.5 rounded uppercase tracking-widest">
                          {getDisciplineName(plan.disciplineId)}
                        </span>
                        <span className="text-[10px] font-bold text-brand-secondary flex items-center gap-1.5 uppercase tracking-widest">
                          <Clock size={12} />
                          {plan.duration} min
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-bold text-white">
                        {new Date(plan.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
                      </div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Agendado</div>
                    </div>
                    <button 
                      onClick={() => deletePlan(plan.id)}
                      className="p-2 text-slate-600 hover:text-brand-accent rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Plus className="rotate-45" size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Target size={16} className="text-brand-secondary" />
            Dicas de Foco
          </h2>
          <div className="glass p-8 rounded-card border-none space-y-6 glow-teal relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <h4 className="text-white font-bold flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-brand-primary/20 text-brand-primary rounded-md flex items-center justify-center text-[10px]">01</span>
                  Técnica Pomodoro
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">Estude por 25 minutos com foco total e descanse 5 minutos. Repita o ciclo.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-bold flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-brand-secondary/20 text-brand-secondary rounded-md flex items-center justify-center text-[10px]">02</span>
                  Revisão Ativa
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">Tente explicar o conteúdo para si mesmo sem olhar as notas.</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-bold flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 bg-brand-accent/20 text-brand-accent rounded-md flex items-center justify-center text-[10px]">03</span>
                  Ambiente Limpo
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">Mantenha sua mesa organizada para reduzir a carga mental e distrações.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Dark Theme */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass w-full max-w-md rounded-card p-10 animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-bold text-white mb-8">Novo Plano de Estudo</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">O que vai estudar?</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-brand-secondary/30"
                  placeholder="Ex: Revisão Álgebra Linear"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Disciplina</label>
                <select
                  required
                  value={formData.disciplineId}
                  onChange={e => setFormData({...formData, disciplineId: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none outline-none"
                >
                  <option value="" className="bg-bg-card text-white">Selecione uma disciplina</option>
                  {disciplines.map(d => (
                    <option key={d.id} value={d.id} className="bg-bg-card text-white">{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Data</label>
                  <input
                    required
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Duração (min)</label>
                  <input
                    required
                    type="number"
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: e.target.value})}
                    placeholder="Ex: 60"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-white/10 rounded-xl font-bold text-slate-400 hover:bg-white/5">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-brand-secondary text-white rounded-xl font-bold shadow-lg shadow-brand-secondary/20 hover:scale-[1.02] active:scale-95 transition-all">Criar Plano</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
