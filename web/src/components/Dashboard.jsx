import React, { useEffect, useState } from 'react';
import { Sprout, Leaf, Sun, Wind, CheckCircle, AlertTriangle, Thermometer, Droplets, Box, Activity, ShieldCheck, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../contexts/AppContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a Dashboard Principal - Vista Cultivos', 'success');
  }, [logAudit]);

  const cropStages = [
    {
      id: 1,
      name: 'Lote LT-2026-01',
      strain: 'Sour Diesel',
      stage: 'Floración (Semana 4)',
      icon: Sun,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
      border: 'border-amber-400/20',
      progress: 65,
      health: 'Óptimo',
      metrics: { temp: '24°C', hum: '50%' },
      gacp: { steps: 5, completed: 4 },
      deadline: '2026-06-30'
    },
    {
      id: 2,
      name: 'Lote LT-2026-02',
      strain: 'Blue Dream',
      stage: 'Vegetativo (Semana 2)',
      icon: Leaf,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/20',
      progress: 25,
      health: 'Atención (Riego)',
      metrics: { temp: '26°C', hum: '65%' },
      gacp: { steps: 5, completed: 2 },
      deadline: '2026-07-15'
    },
    {
      id: 3,
      name: 'Lote LT-2026-03',
      strain: 'OG Kush',
      stage: 'Clonación',
      icon: Sprout,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'border-blue-400/20',
      progress: 10,
      health: 'Óptimo',
      metrics: { temp: '22°C', hum: '75%' },
      gacp: { steps: 5, completed: 1 },
      deadline: '2026-08-01'
    },
    {
      id: 4,
      name: 'Lote LT-2025-99',
      strain: 'Purple Haze',
      stage: 'Secado / Curado',
      icon: Wind,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
      border: 'border-purple-400/20',
      progress: 90,
      health: 'Óptimo',
      metrics: { temp: '18°C', hum: '45%' },
      gacp: { steps: 5, completed: 5 },
      deadline: '2026-06-25'
    }
  ];

  // Check for upcoming deadlines
  const upcomingDeadlines = cropStages.filter(crop => {
    if (!crop.deadline || crop.progress === 100) return false;
    const deadlineDate = new Date(crop.deadline);
    const today = new Date('2026-06-28T00:00:00'); // current date based on context
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0; // within 7 days
  });

  return (
    <div className="space-y-8 pb-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-widest text-emerald-500 uppercase mb-1">Resumen Agrícola</p>
          <h1 className="text-3xl font-light text-white tracking-tight">Estado de <span className="font-bold">Cultivos</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg backdrop-blur-sm flex items-center gap-2">
             <ShieldCheck className="w-4 h-4 text-emerald-400" />
             <span className="text-slate-300 text-sm">Cumplimiento Global GACP:</span> 
             <span className="text-emerald-400 text-sm font-bold">92%</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {upcomingDeadlines.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-4 animate-in slide-in-from-top duration-500">
          <div className="p-2 bg-amber-500/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-400">Atención Requerida: Plazos GACP Próximos</h4>
            <div className="mt-2 space-y-2">
              {upcomingDeadlines.map(crop => (
                <div key={crop.id} className="text-sm text-amber-200/80 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <strong>{crop.name}</strong> ({crop.strain}) - La etapa de {crop.stage.split(' ')[0]} finaliza el {new Date(crop.deadline).toLocaleDateString()}. Faltan {crop.gacp.steps - crop.gacp.completed} pasos GACP.
                </div>
              ))}
            </div>
            <button 
              onClick={() => navigate('/compliance-check')}
              className="mt-3 text-xs font-medium bg-amber-500 hover:bg-amber-600 text-amber-950 px-3 py-1.5 rounded-md transition-colors"
            >
              Completar Checklists
            </button>
          </div>
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Box className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-400">Lotes Activos</p>
          </div>
          <h3 className="text-2xl font-semibold text-white">12</h3>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Activity className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-400">Plantas en Ciclo</p>
          </div>
          <h3 className="text-2xl font-semibold text-white">4,520</h3>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-400">Alertas GACP</p>
          </div>
          <h3 className="text-2xl font-semibold text-white">2</h3>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-400">Lotes Listos (GMP)</p>
          </div>
          <h3 className="text-2xl font-semibold text-white">3</h3>
        </div>
      </div>

      {/* Crop Stages Cards (Responsive Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {cropStages.map((crop) => {
          const Icon = crop.icon;
          const isWarning = crop.health.includes('Atención');
          
          return (
            <div key={crop.id} className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700 overflow-hidden flex flex-col hover:border-slate-600 transition-colors">
              <div className="p-5 flex-grow">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 rounded-xl ${crop.bg} ${crop.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${
                    isWarning ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {isWarning ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                    {crop.health}
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold text-white mb-1">{crop.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{crop.strain} • {crop.stage}</p>

                {/* Environment Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  <div className="bg-slate-800/50 rounded-lg p-2 flex items-center gap-2 border border-slate-700/50">
                    <Thermometer className="w-4 h-4 text-rose-400" />
                    <span className="text-sm font-medium text-slate-300">{crop.metrics.temp}</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2 flex items-center gap-2 border border-slate-700/50">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-slate-300">{crop.metrics.hum}</span>
                  </div>
                </div>

                {/* GACP/GMP Progress */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium text-slate-400">Progreso GACP</span>
                    <span className="text-xs font-bold text-slate-300">{crop.gacp.completed}/{crop.gacp.steps} Fases</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2 overflow-hidden">
                    <div 
                      className={`h-1.5 rounded-full ${crop.progress === 100 ? 'bg-emerald-500' : 'bg-emerald-400'}`} 
                      style={{ width: `${(crop.gacp.completed / crop.gacp.steps) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Footer Action */}
              <div 
                className="bg-slate-800/40 p-3 border-t border-slate-700/50 flex items-center justify-center text-sm text-emerald-400 font-medium cursor-pointer hover:bg-slate-800/60 transition-colors"
                onClick={() => navigate('/gacp-suite')}
              >
                Registrar Trazabilidad
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Traceability Progress Chart */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
        <div className="flex items-center justify-between mb-8">
           <div>
             <h2 className="text-xl font-semibold text-white">Progreso de Trazabilidad GACP/GMP</h2>
             <p className="text-slate-400 text-sm mt-1">Avance de etapas de trazabilidad por lote activo.</p>
           </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={cropStages.map(c => ({ name: c.name, Progreso: Math.round((c.gacp.completed / c.gacp.steps) * 100) }))} 
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#f8fafc' }}
                cursor={{ fill: '#334155', opacity: 0.4 }}
              />
              <Bar dataKey="Progreso" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={50} name="Progreso (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      
    </div>
  );
}


