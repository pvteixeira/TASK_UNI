import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Sparkles, 
  Rocket, 
  Target, 
  ShieldCheck, 
  Check, 
  Star,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'IA de Estudo',
      desc: 'Planos de estudo inteligentes gerados automaticamente para você.',
      icon: <Sparkles className="text-purple-500" />
    },
    {
      title: 'Gestão de Tarefas',
      desc: 'Nunca mais esqueça uma entrega ou prova importante.',
      icon: <Target className="text-teal-500" />
    },
    {
      title: 'Controle de Notas',
      desc: 'Visualize seu desempenho acadêmico em tempo real.',
      icon: <ShieldCheck className="text-rose-500" />
    },
    {
      title: 'Perfil Social',
      desc: 'Compartilhe seu progresso com um QR Code exclusivo.',
      icon: <Star className="text-amber-500" />
    }
  ];

  const plans = [
    {
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      features: ['Até 5 disciplinas', 'Calendário básico', 'QR Code de perfil', 'Gestão de tarefas'],
      cta: 'Começar Agora',
      popular: false
    },
    {
      name: 'Pro Student',
      price: 'R$ 9,90',
      period: '/mês',
      features: ['Disciplinas ilimitadas', 'Planos com IA', 'Gráficos de desempenho', 'Suporte prioritário', 'Sem anúncios'],
      cta: 'Assinar Pro',
      popular: true
    },
    {
      name: 'Uni Plus',
      price: 'R$ 19,90',
      period: '/mês',
      features: ['Tudo do Pro', 'IA Generativa avançada', 'Exportação de relatórios', 'Acesso antecipado', 'Vantagens exclusivas'],
      cta: 'Ser Plus',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-bg-base text-slate-200 selection:bg-brand-primary/30">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-primary/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-secondary/10 blur-[120px] rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Header/Nav */}
      <nav className="h-20 max-w-7xl mx-auto px-8 flex items-center justify-between sticky top-0 bg-bg-base/50 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/30">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">TaskUni</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="text-sm font-bold text-slate-400 hover:text-white transition-colors px-4 py-2"
          >
            Entrar
          </button>
          <button 
            onClick={() => navigate('/register')}
            className="bg-brand-primary/10 border border-brand-primary/20 text-brand-primary px-6 py-2 rounded-xl text-sm font-bold hover:bg-brand-primary/20 transition-all flex items-center gap-2"
          >
            Cadastrar
            <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-secondary text-xs font-bold mb-8 animate-in fade-in slide-in-from-bottom-4">
            <Zap size={14} className="fill-brand-secondary" />
            <span>NOVO: PLANOS DE ESTUDO COM IA</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight max-w-4xl leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-700">
            Domine sua <span className="text-brand-primary">vida acadêmica</span> com inteligência.
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
            Organize tarefas, acompanhe suas notas e turbine seus estudos com a plataforma número 1 para estudantes universitários.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <button 
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-brand-primary hover:bg-brand-primary/80 text-white rounded-2xl font-bold text-lg shadow-xl shadow-brand-primary/20 transition-all hover:scale-105 flex items-center gap-3"
            >
              Começar Agora
              <Rocket size={20} />
            </button>
            <button 
              onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-bold text-lg transition-all"
            >
              Saiba Mais
            </button>
          </div>
        </section>

        {/* Features (About) Section */}
        <section id="about" className="max-w-7xl mx-auto px-8 py-32 border-t border-white/5">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-brand-secondary uppercase tracking-[0.2em] mb-4">Funcionalidades</h2>
            <h3 className="text-4xl font-bold text-white">Tudo o que você precisa em um só lugar.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="glass p-8 rounded-[32px] group hover:border-brand-primary/30 transition-all hover:translate-y-[-8px]">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:bg-brand-primary/10 transition-colors">
                  {f.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{f.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-white/[0.02] py-32 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.2em] mb-4">Preços</h2>
              <h3 className="text-4xl font-bold text-white mb-4">Escolha o plano ideal para você 🎓</h3>
              <p className="text-slate-500">Upgrade quando precisar, cancele quando quiser.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((p, i) => (
                <div key={i} className={`p-1 rounded-[40px] ${p.popular ? 'bg-gradient-to-br from-brand-primary to-brand-secondary p-[2px]' : ''}`}>
                  <div className="glass h-full p-10 rounded-[38px] flex flex-col">
                    {p.popular && (
                      <span className="bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-6">
                        Mais Popular
                      </span>
                    )}
                    <h4 className="text-xl font-bold text-white mb-4">{p.name}</h4>
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-4xl font-bold text-white">{p.price}</span>
                      <span className="text-slate-500 text-sm">{p.period}</span>
                    </div>
                    <ul className="space-y-4 mb-10 flex-1">
                      {p.features.map((feat, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-slate-300">
                          <Check className="text-brand-secondary" size={16} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => navigate('/register')}
                      className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${
                        p.popular 
                          ? 'bg-brand-primary text-white hover:bg-brand-primary/80 shadow-lg shadow-brand-primary/20' 
                          : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {p.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Footer Section */}
        <section className="max-w-7xl mx-auto px-8 py-32 text-center">
          <div className="glass p-16 rounded-[48px] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[100px] rounded-full"></div>
             <div className="relative z-10">
               <h2 className="text-4xl font-bold text-white mb-6">Pronto para elevar seu nível acadêmico? 🚀</h2>
               <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                 Junte-se a milhares de estudantes que já estão usando a TaskUni para organizar sua rotina.
               </p>
               <button 
                onClick={() => navigate('/register')}
                className="px-10 py-5 bg-white text-bg-base hover:bg-slate-200 rounded-3xl font-bold text-lg transition-transform hover:scale-105"
               >
                 Começar Grátis Agora
               </button>
             </div>
          </div>
        </section>
      </main>

      {/* Real Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 grayscale opacity-60">
            <GraduationCap className="text-slate-400" />
            <span className="text-xl font-bold tracking-tight text-white">TaskUni</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 TaskUni Platform. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Termos</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Privacidade</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
