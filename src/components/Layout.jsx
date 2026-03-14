import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProfileModal from './ProfileModal';
import { 
  GraduationCap, 
  LogOut,
  Bell,
  Search,
  User as UserIcon,
  LayoutDashboard,
  BookOpen,
  SquareCheck,
  Calendar
} from 'lucide-react';

export default function Layout() {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Safeguard
  if (!user) return null;

  const menuItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Disciplinas', path: '/disciplines' },
    { label: 'Tarefas', path: '/tasks' },
    { label: 'Notas', path: '/grades' },
    { label: 'Estudo', path: '/study-plan' },
  ];

  return (
    <div className="min-h-screen bg-bg-base text-slate-200 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="h-20 bg-bg-base/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/30">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">TaskUni</span>
        </div>

        {/* Center Navigation Links */}
        <nav className="flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/5">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                px-6 py-2 rounded-xl text-sm transition-all duration-200
                ${isActive 
                  ? 'active-nav' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'}
              `}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Section: Notifications & User */}
        <div className="flex items-center gap-6">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setIsProfileOpen(true)}
          >
            <div className="w-10 h-10 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center font-bold border border-brand-primary/30 overflow-hidden group-hover:border-brand-primary transition-all">
              {user?.photo ? (
                <img src={user.photo} alt="User" className="w-full h-full object-cover" />
              ) : (
                user?.name ? user.name.split(' ').map(n => n[0]).filter(Boolean).join('').toUpperCase().slice(0, 2) : '??'
              )}
            </div>
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-white mb-0.5 group-hover:text-brand-primary transition-colors">{user?.name}</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{user?.institution || 'N/A'} • {user?.period || 'N/A'}</p>
            </div>
          </div>
          
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="p-2 text-slate-400 hover:text-brand-accent transition-colors"
            title="Sair"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-8 py-10">
        <div className="page-transition">
          <Outlet />
        </div>
      </main>

      <ProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
}
