import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Leaf, MapPin, ShieldCheck, Settings, Menu, X, Users, TrendingUp, Globe, Camera, Beaker, Lock, Database, ClipboardCheck, Building } from 'lucide-react';
import { useLocalization } from '../contexts/LocalizationContext';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLocalization();

  const navItems = [
    { name: 'Dashboard Principal', icon: LayoutDashboard, path: '/' },
    { name: 'GACP Suite', icon: Leaf, path: '/gacp-suite' },
    { name: 'GMP Suite', icon: Beaker, path: '/gmp-suite' },
    { name: 'Regulatory Suite', icon: Building, path: '/regulatory-suite' },
    { name: 'Security & Company', icon: Lock, path: '/security' },
    { name: 'Reports & Intelligence', icon: TrendingUp, path: '/executive-reports' },
    { name: 'Configuración', icon: Settings, path: '/configuracion' },
  ];

  return (
    <>
      {/* Mobile Menu Button - visible only on small screens */}
      <div className="md:hidden fixed top-3 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white border border-gray-200 rounded-md shadow-sm text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-40
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        transition-transform duration-200 ease-in-out
        flex flex-col w-64 bg-slate-900 border-r border-slate-800 h-full shadow-2xl
      `}>
        <div className="flex flex-col justify-center h-20 px-6 border-b border-slate-800/60 bg-slate-950/30">
          <span className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="text-emerald-500">FENIX</span>4
          </span>
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-1">Enterprise Edition</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-1.5 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                {(() => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                            : 'text-slate-400 border border-transparent hover:bg-slate-800/50 hover:text-slate-200'
                        }`
                      }
                    >
                      <Icon className="w-5 h-5 mr-3 opacity-80" />
                      {item.name}
                    </NavLink>
                  );
                })()}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
