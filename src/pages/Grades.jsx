import { useState } from 'react';
import { Plus, GraduationCap, Trash2, Award, TrendingUp } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Grades() {
  const { state, dispatch } = useData();
  const { grades, disciplines } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ disciplineId: '', value: '', type: 'Prova', date: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGrade = {
      ...formData,
      id: Date.now().toString(),
      value: parseFloat(formData.value)
    };
    dispatch({ type: 'ADD_GRADE', payload: newGrade });
    setFormData({ disciplineId: '', value: '', type: 'Prova', date: '' });
    setIsModalOpen(false);
  };

  const deleteGrade = (id) => {
    dispatch({ type: 'DELETE_GRADE', payload: id });
  };

  const getDisciplineGrades = (disciplineId) => {
    return grades.filter(g => g.disciplineId === disciplineId);
  };

  const calculateAverage = (disciplineId) => {
    const disciplineGrades = getDisciplineGrades(disciplineId);
    if (disciplineGrades.length === 0) return 0;
    const sum = disciplineGrades.reduce((acc, curr) => acc + curr.value, 0);
    return (sum / disciplineGrades.length).toFixed(1);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Notas e Desempenho</h1>
          <p className="text-slate-500 font-medium">Acompanhe sua evolução em cada disciplina.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-primary text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={20} />
          Lançar Nota
        </button>
      </div>

      {disciplines.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 glass rounded-card border-none">
          <GraduationCap size={56} className="text-white/5 mb-4" />
          <h3 className="text-xl font-bold text-white">Nenhuma disciplina cadastrada</h3>
          <p className="text-slate-500 max-w-xs text-center font-medium">Cadastre disciplinas primeiro para poder lançar suas notas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {disciplines.map((discipline, i) => {
            const disciplineGrades = getDisciplineGrades(discipline.id);
            const avg = calculateAverage(discipline.id);
            const colors = ['glow-purple', 'glow-teal', 'glow-rose', 'glow-amber'];
            
            return (
              <div key={discipline.id} className={`glass p-8 rounded-card border-none relative overflow-hidden flex flex-col ${colors[i % 4]}`}>
                <div className="relative z-10 flex-1">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{discipline.name}</h3>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <TrendingUp size={12} className="text-brand-secondary" />
                        Desempenho Geral
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-black ${parseFloat(avg) >= 7 ? 'text-brand-secondary' : 'text-brand-accent'}`}>
                        {avg}
                      </div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Média Atual</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {disciplineGrades.length === 0 ? (
                      <p className="text-sm text-slate-600 italic py-4">Nenhuma nota lançada para esta matéria.</p>
                    ) : (
                      disciplineGrades.map(grade => (
                        <div key={grade.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-white/10 transition-all">
                          <div>
                            <div className="text-sm font-bold text-white">{grade.type}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                              {new Date(grade.date).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`text-lg font-black ${grade.value >= 7 ? 'text-brand-secondary' : 'text-brand-accent'}`}>
                              {grade.value.toFixed(1)}
                            </span>
                            <button 
                              onClick={() => deleteGrade(grade.id)}
                              className="p-2 text-slate-600 hover:text-brand-accent opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal - Dark Theme */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass w-full max-w-md rounded-card p-10 animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-bold text-white mb-8">Lançar Nova Nota</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Disciplina</label>
                <select
                  required
                  value={formData.disciplineId}
                  onChange={e => setFormData({...formData, disciplineId: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none outline-none focus:ring-2 focus:ring-brand-primary/30"
                >
                  <option value="" className="bg-bg-card text-white">Selecione a disciplina</option>
                  {disciplines.map(d => (
                    <option key={d.id} value={d.id} className="bg-bg-card text-white">{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nota (0-10)</label>
                  <input
                    required
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.value}
                    onChange={e => setFormData({...formData, value: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                    placeholder="Ex: 8.5"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Tipo</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                  >
                    <option className="bg-bg-card">Prova</option>
                    <option className="bg-bg-card">Trabalho</option>
                    <option className="bg-bg-card">Projeto</option>
                    <option className="bg-bg-card">Outros</option>
                  </select>
                </div>
              </div>
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
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-white/10 rounded-xl font-bold text-slate-400 hover:bg-white/5">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20">Salvar Nota</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
