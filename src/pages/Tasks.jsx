import { useState } from 'react';
import { Plus, CheckCircle2, Circle, Tag, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Tasks() {
  const { state, dispatch } = useData();
  const { tasks, disciplines } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', disciplineId: '', dueDate: '', priority: 'Média' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      ...formData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
    setFormData({ title: '', disciplineId: '', dueDate: '', priority: 'Média' });
    setIsModalOpen(false);
  };

  const toggleTask = (task) => {
    dispatch({ type: 'UPDATE_TASK', payload: { ...task, completed: !task.completed } });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const getDisciplineName = (id) => {
    return disciplines.find(d => d.id === id)?.name || 'Geral';
  };

  const priorityColors = {
    'Alta': 'bg-rose-500',
    'Média': 'bg-amber-500',
    'Baixa': 'bg-teal-500'
  };

  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed || new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Minhas Tarefas</h1>
          <p className="text-slate-500 font-medium">Mantenha seu cronograma em dia.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-primary text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={20} />
          Nova Tarefa
        </button>
      </div>

      <div className="glass rounded-card overflow-hidden border-none relative glow-purple">
        {tasks.length === 0 ? (
          <div className="py-24 text-center">
            <CheckCircle2 size={56} className="mx-auto text-white/5 mb-4" />
            <h3 className="text-xl font-bold text-white">Tudo em dia!</h3>
            <p className="text-slate-500 font-medium">Você concluiu todas as suas obrigações acadêmicas.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5 relative z-10">
            {sortedTasks.map(task => (
              <div key={task.id} className={`p-6 flex items-center justify-between hover:bg-white/5 transition-all group ${task.completed ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-6">
                  <button onClick={() => toggleTask(task)} className="transition-all hover:scale-110 active:scale-90">
                    {task.completed ? 
                      <div className="w-6 h-6 bg-brand-primary rounded-lg flex items-center justify-center border border-brand-primary">
                        <CheckCircle2 className="text-white" size={14} />
                      </div> : 
                      <div className="w-6 h-6 rounded-lg border-2 border-white/10 group-hover:border-brand-primary/50 transition-colors"></div>
                    }
                  </button>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${priorityColors[task.priority]}`}></div>
                      <h4 className={`font-bold text-base ${task.completed ? 'line-through text-slate-500' : 'text-white'}`}>
                        {task.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold text-slate-400 border border-white/5 px-2 py-0.5 rounded uppercase tracking-widest">
                        {getDisciplineName(task.disciplineId)}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1.5">
                        <CalendarIcon size={12} />
                        {new Date(task.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => deleteTask(task.id)} className="p-2 text-slate-500 hover:text-brand-accent hover:bg-brand-accent/10 rounded-full transition-all">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal - Dark Theme */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="glass w-full max-w-md rounded-card p-10 animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-bold text-white mb-8">Nova Tarefa</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Título</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary/30 outline-none transition-all"
                  placeholder="Ex: Resolver lista de exercícios"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Disciplina</label>
                <select
                  required
                  value={formData.disciplineId}
                  onChange={e => setFormData({...formData, disciplineId: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary/30 outline-none transition-all appearance-none"
                >
                  <option value="" className="bg-bg-card text-white">Selecione uma disciplina</option>
                  {disciplines.map(d => (
                    <option key={d.id} value={d.id} className="bg-bg-card text-white">{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Prazo</label>
                  <input
                    required
                    type="date"
                    value={formData.dueDate}
                    onChange={e => setFormData({...formData, dueDate: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Prioridade</label>
                  <select
                    value={formData.priority}
                    onChange={e => setFormData({...formData, priority: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
                  >
                    <option className="bg-bg-card">Baixa</option>
                    <option className="bg-bg-card">Média</option>
                    <option className="bg-bg-card">Alta</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-white/10 rounded-xl font-bold text-slate-400 hover:bg-white/5">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-brand-brand-primary bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
