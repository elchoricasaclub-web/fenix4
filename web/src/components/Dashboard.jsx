import React, { useEffect, useState } from 'react';
import { Sprout, Leaf, Sun, Wind, CheckCircle, AlertTriangle, Thermometer, Droplets, Box, Activity, ShieldCheck, ChevronRight, MapPin, Beaker, Building, Lock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../contexts/AppContext';
import { getCrops, initializeDefaultCrops, subscribeToCrops } from '../services/cropService';

export default function Dashboard() {
  const navigate = useNavigate();
  const { logAudit } = useAppContext();
  const [cropStages, setCropStages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const defaultCropStages = [
    {
      name: 'Lote LT-2026-01',
      strain: 'Sour Diesel',
      stage: 'Floración (Semana 4)',
      iconName: 'Sun', // Stores string instead of component for DB
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
      name: 'Lote LT-2026-02',
      strain: 'Blue Dream',
      stage: 'Vegetativo (Semana 2)',
      iconName: 'Leaf',
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
      name: 'Lote LT-2026-03',
      strain: 'OG Kush',
      stage: 'Clonación',
      iconName: 'Sprout',
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
      name: 'Lote LT-2025-99',
      strain: 'Purple Haze',
      stage: 'Secado / Curado',
      iconName: 'Wind',
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

  useEffect(() => {
    logAudit('Acceso a Dashboard Principal - Vista Cultivos', 'success');
    
    let unsubscribe = () => {};

    // Initialize defaults in Firestore if empty
    initializeDefaultCrops(defaultCropStages).then(() => {
      // Subscribe to real-time updates
      unsubscribe = subscribeToCrops((data) => {
        if (data && data.length > 0) {
          // Sort by deadline or name just to have consistent order
          const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
          setCropStages(sorted);
        } else {
          // Fallback if empty just for UI until sync completes
          setCropStages(defaultCropStages.map((c, i) => ({ id: `temp-${i}`, ...c })));
        }
        setIsLoading(false);
      });
    }).catch(err => {
      console.error("Error initializing crops:", err);
      setIsLoading(false);
    });
      
    return () => {
      if (unsubscribe) unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper function to map string icon names back to Lucide components
  const getIconComponent = (iconName) => {
    const icons = { Sun, Leaf, Sprout, Wind };
    return icons[iconName] || Leaf;
  };

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
          <p className="text-sm font-semibold tracking-widest text-emerald-500 uppercase mb-1">Centro de Comando</p>
          <h1 className="text-3xl font-light text-white tracking-tight">Dashboard <span className="font-bold">Principal</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg backdrop-blur-sm flex items-center gap-2">
             <ShieldCheck className="w-4 h-4 text-emerald-400" />
             <span className="text-slate-300 text-sm">Autenticación Segura:</span> 
             <span className="text-emerald-400 text-sm font-bold">Activa</span>
          </div>
        </div>
      </div>

      {/* FENIX4 Enterprise Suites */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 animate-in slide-in-from-bottom duration-500 delay-150">
        <div 
          onClick={() => navigate('/gacp-suite')}
          className="group cursor-pointer bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Leaf className="w-6 h-6" />
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">GACP Suite</h3>
          <p className="text-xs text-slate-400">Gestión agrícola, cultivo, cosecha y buenas prácticas.</p>
        </div>

        <div 
          onClick={() => navigate('/gmp-suite')}
          className="group cursor-pointer bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Beaker className="w-6 h-6" />
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">GMP Suite</h3>
          <p className="text-xs text-slate-400">Manufactura, extracción, calidad (QC) y liberación.</p>
        </div>

        <div 
          onClick={() => navigate('/regulatory-suite')}
          className="group cursor-pointer bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Building className="w-6 h-6" />
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Regulatory Suite</h3>
          <p className="text-xs text-slate-400">Gestión de licencias, ICA, INVIMA, MinJusticia y PEAS.</p>
        </div>

        <div 
          onClick={() => navigate('/security')}
          className="group cursor-pointer bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Lock className="w-6 h-6" />
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Security & Co.</h3>
          <p className="text-xs text-slate-400">Usuarios, roles, empresas, backups y memoria.</p>
        </div>
        
        <div 
          onClick={() => navigate('/executive-reports')}
          className="group cursor-pointer bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 p-6 rounded-2xl hover:border-rose-500/50 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)] transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-rose-500/20 text-rose-400 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-6 h-6" />
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Reports & BI</h3>
          <p className="text-xs text-slate-400">Reportes consolidados, auditorías y trazabilidad.</p>
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
                  <strong>{crop.name || 'Desconocido'}</strong> ({crop.strain || 'N/A'}) - La etapa de {(crop.stage || 'Desconocida').split(' ')[0]} finaliza el {new Date(crop.deadline).toLocaleDateString()}. Faltan {(crop.gacp?.steps || 5) - (crop.gacp?.completed || 0)} pasos GACP.
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
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-slate-400">Sincronizando lotes con Firestore...</span>
        </div>
      ) : (
        <>
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
          const Icon = getIconComponent(crop.iconName);
          const isWarning = crop.health ? crop.health.includes('Atención') : false;
          const healthStatus = crop.health || 'Desconocido';
          const bg = crop.bg || 'bg-slate-800';
          const color = crop.color || 'text-emerald-400';
          const gacpSteps = crop.gacp?.steps || 5;
          const gacpCompleted = crop.gacp?.completed || 0;
          const gacpProgress = Math.round((gacpCompleted / gacpSteps) * 100);
          
          return (
            <div key={crop.id} className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700 overflow-hidden flex flex-col hover:border-slate-600 transition-colors">
              <div className="p-5 flex-grow">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 rounded-xl ${bg} ${color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${
                    isWarning ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {isWarning ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                    {healthStatus}
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold text-white mb-1">{crop.name}</h3>
                <p className="text-sm text-slate-400 mb-4">{crop.strain || 'N/A'} • {crop.stage || 'Etapa Desconocida'}</p>

                {/* Environment Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  <div className="bg-slate-800/50 rounded-lg p-2 flex items-center gap-2 border border-slate-700/50">
                    <Thermometer className="w-4 h-4 text-rose-400" />
                    <span className="text-sm font-medium text-slate-300">{crop.metrics?.temp || 'N/A'}</span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2 flex items-center gap-2 border border-slate-700/50">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-slate-300">{crop.metrics?.hum || 'N/A'}</span>
                  </div>
                </div>

                {/* GACP/GMP Progress */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-medium text-slate-400">Progreso GACP</span>
                    <span className="text-xs font-bold text-slate-300">{gacpCompleted}/{gacpSteps} Fases</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2 overflow-hidden">
                    <div 
                      className={`h-1.5 rounded-full ${gacpProgress >= 100 ? 'bg-emerald-500' : 'bg-emerald-400'}`} 
                      style={{ width: `${gacpProgress}%` }}
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
              data={cropStages.map(c => ({ 
                name: c.name || 'Desconocido', 
                Progreso: Math.round(((c.gacp?.completed || 0) / (c.gacp?.steps || 5)) * 100) 
              }))} 
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
        </>
      )}
      
      
    </div>
  );
}


