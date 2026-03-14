import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, School, Calendar, ArrowRight, Sparkles } from 'lucide-react';

export default function Personalization() {
  const [institution, setInstitution] = useState('');
  const [period, setPeriod] = useState('');
  const { updateUser, user } = useAuth();
  const navigate = useNavigate();

  // Safeguard: if user is not available yet, show a simple loading state
  if (!user) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ institution, period });
    // Force a hard refresh to the dashboard
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-bg-base relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-brand-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-brand-secondary/10 rounded-full blur-[120px]"></div>

      <div className="glass w-full max-w-lg p-10 rounded-card shadow-2xl relative z-10 border-white/5 animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-primary/40 transform -rotate-6">
              <GraduationCap className="text-white w-8 h-8 rotate-6" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-3 text-white tracking-tight">
            Bem-vindo(a), {user?.name ? user.name.split(' ')[0] : 'estudante'}!
          </h1>
          <p className="text-slate-500 text-center mb-10 font-medium">
            Vamos personalizar sua experiência no TaskUni.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <School size={14} className="text-brand-secondary" />
                  Sua Instituição
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:ring-2 focus:ring-brand-secondary/30 focus:border-brand-secondary/50 outline-none transition-all placeholder:text-slate-600"
                  placeholder="Ex: USP, UNICAMP, Harvard..."
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Calendar size={14} className="text-brand-primary" />
                  Qual o seu período/semestre?
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPeriod(p)}
                      className={`py-3 rounded-xl text-sm font-bold transition-all border ${
                        period === p
                          ? 'bg-brand-primary/20 border-brand-primary text-white shadow-lg shadow-brand-primary/20'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 text-white focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary/50 outline-none transition-all placeholder:text-slate-600 mt-2"
                  placeholder="Ou digite outro (ex: 9º, Mestrado...)"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-brand-secondary hover:bg-brand-secondary/90 text-white font-bold py-5 rounded-xl shadow-2xl shadow-brand-secondary/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 text-lg group"
              >
                Tudo pronto, vamos lá!
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
              <Sparkles size={12} className="text-brand-secondary" />
              Configuração única
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
