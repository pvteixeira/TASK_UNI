import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { 
  ClipboardList, 
  BookOpen, 
  BarChart3, 
  Calendar, 
  Circle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { state } = useData();
  
  if (!user) return null;

  const { disciplines, tasks, grades, studyPlans } = state;

  // Calculate Average Grade
  const totalGrades = grades.length;
  const avgGrade = totalGrades > 0 
    ? (grades.reduce((acc, curr) => acc + curr.value, 0) / totalGrades).toFixed(1)
    : '0.0';

  // Find next exam or deadline
  const upcomingDeadlines = [...tasks, ...grades, ...studyPlans]
    .filter(item => new Date(item.date || item.dueDate) >= new Date())
    .sort((a, b) => new Date(a.date || a.dueDate) - new Date(b.date || b.dueDate));
  
  const nextTarget = upcomingDeadlines[0];
  const nextTargetLabel = nextTarget ? new Date(nextTarget.date || nextTarget.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : '---';

  const kpis = [
    { label: 'Tarefas Pendentes', value: tasks.filter(t => !t.completed).length, sub: 'Foco total hoje', glow: 'glow-rose', icon: <ClipboardList className="text-rose-500" /> },
    { label: 'Disciplinas', value: disciplines.length, sub: 'Matriculadas', glow: 'glow-teal', icon: <BookOpen className="text-teal-500" /> },
    { label: 'Média Geral', value: avgGrade, sub: 'Baseado em notas', glow: 'glow-amber', icon: <BarChart3 className="text-amber-500" /> },
    { label: 'Próximo Marco', value: upcomingDeadlines.length > 0 ? nextTargetLabel : '---', sub: upcomingDeadlines[0]?.title || 'Sem eventos', glow: 'glow-purple', icon: <Calendar className="text-purple-500" /> },
  ];

  const getDisciplineName = (id) => disciplines.find(d => d.id === id)?.name || 'Geral';

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Bom dia, {user?.name ? user.name.split(' ')[0] : 'estudante'} 👋</h1>
          <p className="text-slate-500 font-medium">{user?.institution} • {user?.period} • {new Date().toLocaleDateString('pt-BR', { month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="hidden sm:block">
          <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center overflow-hidden">
            {user?.photo ? (
              <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
               <span className="text-xl font-bold text-brand-primary">
                 {user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??'}
               </span>
            )}
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className={`glass p-6 rounded-card relative overflow-hidden group hover:border-white/10 transition-all ${kpi.glow}`}>
            <div className="relative z-10">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4 border border-white/5">
                {kpi.icon}
              </div>
              <p className="text-4xl font-bold text-white mb-1 tracking-tight">{kpi.value}</p>
              <p className="text-sm font-bold text-white/90 mb-1">{kpi.label}</p>
              <p className="text-xs text-slate-500 font-medium">{kpi.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Tasks Card */}
        <div className="lg:col-span-7 glass rounded-card p-8 group overflow-hidden relative">
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h2 className="text-xl font-bold text-white">Últimas Tarefas</h2>
            <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
              {tasks.filter(t => !t.completed).length} pendentes
            </span>
          </div>

          <div className="space-y-6 relative z-10">
            {tasks.length > 0 ? tasks.slice(0, 4).map((task, i) => (
              <div key={i} className="flex items-center justify-between group/task">
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-lg border-2 ${task.completed ? 'bg-brand-secondary border-brand-secondary' : 'border-white/10'} flex items-center justify-center transition-all`}>
                    {task.completed && <CheckCircle2 size={12} className="text-bg-base" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-purple-500' : 'bg-teal-500'}`}></div>
                    <div>
                      <p className={`text-sm font-bold ${task.completed ? 'text-slate-500 line-through' : 'text-white'}`}>{task.title}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{getDisciplineName(task.disciplineId)}</p>
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-slate-500">
                  {new Date(task.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                </span>
              </div>
            )) : (
              <p className="text-slate-500 text-sm italic py-4">Nenhuma tarefa cadastrada.</p>
            )}
          </div>
        </div>

        {/* Study Plan Card */}
        <div className="lg:col-span-5 glass rounded-card p-8 glow-purple">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-white" />
              <h2 className="text-xl font-bold text-white">Próximos Estudos</h2>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-8 font-medium">Meta personalizada para você</p>

          <div className="space-y-4 mb-8">
            {studyPlans.length > 0 ? studyPlans.slice(0, 2).map(plan => (
              <div key={plan.id} className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                   <p className="text-sm font-bold text-white">{plan.title}</p>
                   <p className="text-[10px] text-brand-secondary font-bold uppercase tracking-wider">{getDisciplineName(plan.disciplineId)}</p>
                </div>
                <div className="text-right">
                   <p className="text-xs font-bold text-white">{plan.duration} min</p>
                   <p className="text-[10px] text-slate-500 font-bold uppercase">{new Date(plan.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</p>
                </div>
              </div>
            )) : (
              <div className="py-4 text-center">
                <p className="text-slate-500 text-xs">Crie um plano de estudos para visualizar aqui.</p>
              </div>
            )}
          </div>

          <button className="w-full py-3 bg-brand-primary/10 border border-brand-primary/20 rounded-xl text-brand-primary font-bold text-xs flex items-center justify-center gap-2 hover:bg-brand-primary/20 transition-all">
            <Sparkles size={14} />
            Gerado por IA • Inteligente
          </button>
        </div>
      </div>

      {/* Discipline Performance Row */}
      <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
        <BarChart3 size={16} className="text-brand-secondary" />
        Desempenho por Matéria
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {disciplines.length > 0 ? disciplines.map((d, i) => {
          const disciplineGrades = grades.filter(g => g.disciplineId === d.id);
          const avg = disciplineGrades.length > 0 
            ? (disciplineGrades.reduce((acc, curr) => acc + curr.value, 0) / disciplineGrades.length).toFixed(1)
            : '0.0';
          const progress = (parseFloat(avg) * 10);
          
          return (
            <div key={i} className="glass p-6 rounded-card border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-white mb-0.5 truncate max-w-[120px]">{d.name}</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Prof. {d.professor}</p>
                </div>
                <span className={`text-lg font-bold ${parseFloat(avg) >= 7 ? 'text-brand-secondary' : 'text-brand-accent'}`}>{avg}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <span>Domínio</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${parseFloat(avg) >= 7 ? 'bg-brand-secondary shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-brand-accent shadow-[0_0_10px_rgba(244,63,94,0.5)]'}`} 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        }) : (
          <p className="col-span-full text-slate-500 text-center py-10 font-medium">Cadastre disciplinas para acompanhar o desempenho.</p>
        )}
      </div>
    </div>
  );
}
