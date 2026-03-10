import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-bg-base relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-secondary/10 rounded-full blur-[120px]"></div>

      <div className="glass w-full max-w-md p-10 rounded-card shadow-2xl relative z-10 border-white/5 animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center shadow-2xl transform shadow-brand-primary/40 -rotate-6">
              <LogIn className="text-white w-8 h-8 rotate-6" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-3 text-white tracking-tight">Bem-vindo ao <span className="text-brand-primary">TaskUni</span></h1>
          <p className="text-slate-500 text-center mb-10 font-medium">Sua jornada acadêmica, organizada em um só lugar.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-brand-accent/10 border border-brand-accent/20 text-brand-accent p-4 rounded-xl text-sm flex items-center gap-3 animate-in slide-in-from-top-2">
                <div className="w-1.5 h-1.5 bg-brand-accent rounded-full"></div>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">E-mail</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-brand-primary transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary/50 outline-none transition-all placeholder:text-slate-600"
                  placeholder="Seu e-mail acadêmico"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-brand-primary transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary/50 outline-none transition-all placeholder:text-slate-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 rounded-xl shadow-2xl shadow-brand-primary/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 text-base"
              >
                Entrar na conta
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-slate-500 font-medium">
            Ainda não tem conta?{' '}
            <Link to="/register" className="text-brand-primary font-bold hover:text-brand-primary/80 transition-colors">
              Criar agora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
