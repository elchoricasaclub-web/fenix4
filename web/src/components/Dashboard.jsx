import React, { useEffect } from 'react';
import { TrendingUp, Package, Truck, AlertCircle, ShieldCheck, Landmark, ArrowRight, Target, Activity, Star, ChevronRight, Zap, Box, Brain, BookOpen, Database, FileText, CheckSquare, Clock, Shield, Sliders } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../contexts/AppContext';
import ModuleTutorial from './guided/ModuleTutorial';

export default function Dashboard() {
  const navigate = useNavigate();
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a Dashboard Principal', 'success');
  }, [logAudit]);
  const stats = [
    { label: 'Auditorías Pendientes', value: '3', icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { label: 'Lotes Activos', value: '45', icon: Box, color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
    { label: 'Cumplimiento GACP', value: '98%', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'Rendimiento SaaS', value: '100%', icon: TrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/20' },
  ];

  const chartData = [
    { name: 'Ene', produccion: 400, extraccion: 240, cumplimiento: 94 },
    { name: 'Feb', produccion: 300, extraccion: 139, cumplimiento: 95 },
    { name: 'Mar', produccion: 200, extraccion: 980, cumplimiento: 92 },
    { name: 'Abr', produccion: 278, extraccion: 390, cumplimiento: 97 },
    { name: 'May', produccion: 189, extraccion: 480, cumplimiento: 98 },
    { name: 'Jun', produccion: 239, extraccion: 380, cumplimiento: 99 },
    { name: 'Jul', produccion: 349, extraccion: 430, cumplimiento: 98 },
  ];

  return (
    <div className="space-y-8 pb-8">
      <ModuleTutorial
        title="Dashboard y Navegación Principal"
        moduleName="Dashboard"
        objective="Proveer una vista ejecutiva del cumplimiento regulatorio, operación, calidad y trazabilidad de la empresa."
        whoShouldUse="Todos los usuarios, con métricas filtradas según sus permisos."
        whenToUse="Al ingresar a la plataforma, para revisar pendientes o navegar a otras suites."
        requiredInformation={['Ninguna, es una vista de solo lectura en su mayoría.']}
        steps={[
          'Revisa las métricas ejecutivas en la parte superior.',
          'Navega a los diferentes módulos utilizando las tarjetas de "Ecosistema Modular".',
          'Consulta el resumen de trazabilidad (Lotes activos vs Extracciones).',
          'Atiende las notificaciones de auditoría pendientes o módulos críticos.'
        ]}
        commonMistakes={[
          'Ignorar las alertas de auditoría pendientes mostradas en rojo/naranja.',
          'Creer que el dashboard es el único lugar de trabajo; debes entrar a cada suite para operar.'
        ]}
        gacpGmpTips={[
          'Un dashboard de alto nivel ayuda a los directores de calidad a tomar decisiones preventivas.',
          'Las métricas mostradas deben respaldarse con los registros internos (trazabilidad completa).'
        ]}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-widest text-emerald-500 uppercase mb-1">Visión Ejecutiva</p>
          <h1 className="text-3xl font-light text-white tracking-tight">Dashboard <span className="font-bold">FENIX4</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg backdrop-blur-sm">
             <span className="text-slate-400 text-sm">Estado:</span> <span className="text-emerald-400 text-sm font-medium ml-1">Óptimo</span>
          </div>
        </div>
      </div>
      
      {/* Premium Hero Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl group cursor-pointer" onClick={() => navigate('/corporate-saas')}>
          <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
            <ShieldCheck className="w-48 h-48 text-indigo-200" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 mb-6 border border-indigo-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3">SaaS Command Center</h2>
              <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                Auditoría inteligente, calidad de datos y control maestro.
              </p>
            </div>
            <div className="mt-8 flex items-center text-indigo-400 font-medium group-hover:text-indigo-300 transition-colors">
              Explorar Módulo <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl group cursor-pointer" onClick={() => navigate('/market-benchmark')}>
          <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
            <Target className="w-48 h-48 text-emerald-200" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 mb-6 border border-emerald-500/30">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3">Market Benchmark</h2>
              <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                Inteligencia de mercado, análisis de brechas e innovación.
              </p>
            </div>
            <div className="mt-8 flex items-center text-emerald-400 font-medium group-hover:text-emerald-300 transition-colors">
              Analizar Competencia <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl group cursor-pointer" onClick={() => navigate('/executive-reports')}>
          <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
            <FileText className="w-48 h-48 text-rose-200" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 mb-6 border border-rose-500/30">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-3">Executive Reports</h2>
              <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                Reportes gerenciales, exportación y análisis financiero.
              </p>
            </div>
            <div className="mt-8 flex items-center text-rose-400 font-medium group-hover:text-rose-300 transition-colors">
              Generar Reportes <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border ${stat.border} hover:bg-slate-800/50 transition-colors`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <TrendingUp className={`w-5 h-5 ${stat.color} opacity-50`} />
              </div>
              <div>
                <h3 className="text-3xl font-light text-white tracking-tight mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-slate-400">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Chart */}
      <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
        <div className="flex items-center justify-between mb-8">
           <div>
             <h2 className="text-xl font-semibold text-white">Rendimiento Global</h2>
             <p className="text-slate-400 text-sm mt-1">Comparativa de producción vs extracción a lo largo del año.</p>
           </div>
           <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
               <span className="text-xs text-slate-300">Producción</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
               <span className="text-xs text-slate-300">Extracción</span>
             </div>
           </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExtr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
              <YAxis stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Area type="monotone" dataKey="produccion" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorProd)" name="Producción" activeDot={{ r: 6, fill: '#10b981', stroke: '#0f172a', strokeWidth: 2 }} />
              <Area type="monotone" dataKey="extraccion" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorExtr)" name="Extracción" activeDot={{ r: 6, fill: '#6366f1', stroke: '#0f172a', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Asistencia Inteligente y Memoria Empresarial */}
      <div className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <Brain className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Asistencia Inteligente y Memoria Empresarial</h2>
            <p className="text-slate-400 text-sm">Autollenado seguro, gestión documental y tutoriales interactivos.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 hover:bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 transition-all cursor-pointer group" onClick={() => navigate('/smart-assistant/tutorials')}>
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Nuevo</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Tutoriales por Módulo</h3>
            <p className="text-xs text-slate-400 line-clamp-2 mb-4">Guías paso a paso para evitar errores.</p>
            <div className="flex items-center text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
              Abrir módulo <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          <div className="bg-slate-900/50 hover:bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 transition-all cursor-pointer group" onClick={() => navigate('/smart-assistant/company-memory')}>
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">Privado</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Memoria Empresarial</h3>
            <p className="text-xs text-slate-400 line-clamp-2 mb-4">Información segura base de la empresa.</p>
            <div className="flex items-center text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
              Abrir módulo <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          <div className="bg-slate-900/50 hover:bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 transition-all cursor-pointer group" onClick={() => navigate('/smart-assistant/frequent-files')}>
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">2 Alertas</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Archivos Frecuentes</h3>
            <p className="text-xs text-slate-400 line-clamp-2 mb-4">Biblioteca de documentos SOPs y actas.</p>
            <div className="flex items-center text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
              Abrir módulo <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          <div className="bg-slate-900/50 hover:bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 transition-all cursor-pointer group" onClick={() => navigate('/smart-assistant/smart-autofill')}>
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Brain className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Activo</span>
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Autollenado Inteligente</h3>
            <p className="text-xs text-slate-400 line-clamp-2 mb-4">Configuración de sugerencias de IA.</p>
            <div className="flex items-center text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
              Abrir módulo <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          <div className="bg-slate-900/50 hover:bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 transition-all cursor-pointer group" onClick={() => navigate('/smart-assistant/templates')}>
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                <CheckSquare className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Plantillas de Empresa</h3>
            <p className="text-xs text-slate-400 line-clamp-2 mb-4">Textos repetidos y justificaciones.</p>
            <div className="flex items-center text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
              Abrir módulo <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          <div className="bg-slate-900/50 hover:bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 transition-all cursor-pointer group" onClick={() => navigate('/smart-assistant/usage-history')}>
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Historial de Uso</h3>
            <p className="text-xs text-slate-400 line-clamp-2 mb-4">Auditoría del autollenado y sugerencias.</p>
            <div className="flex items-center text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
              Abrir módulo <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          <div className="bg-slate-900/50 hover:bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 transition-all cursor-pointer group" onClick={() => navigate('/smart-assistant/permissions')}>
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Shield className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Permisos de Acceso</h3>
            <p className="text-xs text-slate-400 line-clamp-2 mb-4">Control de seguridad por rol.</p>
            <div className="flex items-center text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
              Abrir módulo <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          <div className="bg-slate-900/50 hover:bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 transition-all cursor-pointer group" onClick={() => navigate('/configuracion')}>
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 rounded-lg bg-slate-500/10 text-slate-400 border border-slate-500/20">
                <Sliders className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Configuración IA</h3>
            <p className="text-xs text-slate-400 line-clamp-2 mb-4">Preferencias globales del sistema.</p>
            <div className="flex items-center text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
              Abrir módulo <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

