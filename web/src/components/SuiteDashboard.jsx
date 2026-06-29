import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuiteDashboard({ title, description, modules = [], children }) {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
        <div>
          <h1 className="text-3xl font-light text-white tracking-tight">{title}</h1>
          <p className="text-slate-400 mt-2">{description}</p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors border border-slate-600 shadow-sm"
        >
          Volver al Dashboard
        </button>
      </div>

      {modules && modules.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, index) => (
            <div 
              key={index}
              onClick={() => mod.path && navigate(mod.path)}
              className={`bg-slate-800/50 p-6 rounded-xl border border-slate-700 transition-all duration-300 ${
                mod.path 
                  ? 'cursor-pointer hover:bg-slate-800 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:-translate-y-1' 
                  : ''
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                {mod.icon && (
                  <div className="p-3 bg-slate-900/80 rounded-xl text-blue-400 border border-slate-700/50">
                    {mod.icon}
                  </div>
                )}
                <h3 className="text-xl font-medium text-slate-100">{mod.name}</h3>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">{mod.description}</p>
            </div>
          ))}
        </div>
      )}

      {children}
    </div>
  );
}
