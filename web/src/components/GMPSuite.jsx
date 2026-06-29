import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { gacpModules } from '../data/gacpModules';
import { useAppContext } from '../contexts/AppContext';
import ModuleTutorial from './guided/ModuleTutorial';

export default function GMPSuite() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a Suite GMP Principal', 'success');
  }, [logAudit]);

  const gacpIds = [
    'propagacion', 'plantas-madre', 'vegetativo', 'floracion', 'ipm',
    'aplicaciones', 'fertirriego', 'agua', 'ambiental', 'cosecha',
    'trimming', 'clasificacion'
  ];

  const filteredModules = gacpModules.filter(m => 
    !gacpIds.includes(m.id) &&
    (m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     m.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <ModuleTutorial
        title="GMP Suite"
        moduleName="GMP Suite"
        objective="Centralizar los módulos, formatos y registros requeridos para el cumplimiento de las Buenas Prácticas de Manufactura (GMP)."
        whoShouldUse="Directores de calidad, técnicos de laboratorio, operarios de extracción y auditores."
        whenToUse="Para registrar procesos de extracción, manufactura, control de calidad, liberaciones y desviaciones."
        requiredInformation={['Depende del módulo seleccionado.']}
        steps={[
          'Usa la barra de búsqueda para encontrar el módulo GMP que necesitas.',
          'Haz clic en la tarjeta correspondiente para entrar al formulario específico.',
          'Llena la información requerida, incluyendo firmas y resultados analíticos.'
        ]}
        commonMistakes={[
          'Crear registros en papel y no subirlos a la suite correspondiente.'
        ]}
        gacpGmpTips={[
          'Esta suite es tu "Master Batch Record" digital.',
          'Cada módulo aquí tiene un impacto directo en las auditorías de certificación farmacéutica.'
        ]}
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">GMP Suite</h1>
          <p className="text-sm text-gray-400 mt-1">Manufactura, Extracción y Calidad ({filteredModules.length} Módulos)</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')}
            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors border border-slate-600 shadow-sm"
          >
            Volver al Dashboard
          </button>
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar módulo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 w-full sm:w-64 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* KPIs Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm flex items-center">
          <div className="p-3 bg-blue-900/30 text-blue-400 rounded-lg"><Icons.Beaker className="w-6 h-6" /></div>
          <div className="ml-4"><p className="text-sm text-gray-400">Lotes en Proceso</p><p className="text-xl font-bold text-gray-100">8</p></div>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm flex items-center">
          <div className="p-3 bg-amber-900/30 text-amber-400 rounded-lg"><Icons.AlertTriangle className="w-6 h-6" /></div>
          <div className="ml-4"><p className="text-sm text-gray-400">Desviaciones</p><p className="text-xl font-bold text-gray-100">1</p></div>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm flex items-center">
          <div className="p-3 bg-purple-900/30 text-purple-400 rounded-lg"><Icons.Search className="w-6 h-6" /></div>
          <div className="ml-4"><p className="text-sm text-gray-400">En Cuarentena</p><p className="text-xl font-bold text-gray-100">4</p></div>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm flex items-center">
          <div className="p-3 bg-emerald-900/30 text-emerald-400 rounded-lg"><Icons.CheckCircle className="w-6 h-6" /></div>
          <div className="ml-4"><p className="text-sm text-gray-400">Liberados</p><p className="text-xl font-bold text-gray-100">15</p></div>
        </div>
      </div>

      {/* Specific Custom GMP Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          onClick={() => navigate('/extraction')}
          className="group cursor-pointer bg-slate-900/60 border border-slate-700 p-6 rounded-xl hover:border-amber-500/50 hover:bg-slate-800/80 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
              <Icons.Beaker className="w-6 h-6" />
            </div>
            <Icons.ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Extracción (Dashboard Principal)</h3>
          <p className="text-sm text-slate-400">BHO, Live Resin, Rosin, balance de masa y control de solventes.</p>
        </div>

        <div 
          onClick={() => navigate('/compliance')}
          className="group cursor-pointer bg-slate-900/60 border border-slate-700 p-6 rounded-xl hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <Icons.ShieldAlert className="w-6 h-6" />
            </div>
            <Icons.ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Calidad GMP (QC/QA)</h3>
          <p className="text-sm text-slate-400">Análisis, certificados de análisis (COA) y control microbiológico.</p>
        </div>

        <div 
          onClick={() => navigate('/compliance-check')}
          className="group cursor-pointer bg-slate-900/60 border border-slate-700 p-6 rounded-xl hover:border-blue-500/50 hover:bg-slate-800/80 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
              <Icons.CheckSquare className="w-6 h-6" />
            </div>
            <Icons.ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Liberación de Producto</h3>
          <p className="text-sm text-slate-400">Revisión de batch records y dictámenes de calidad para liberación final.</p>
        </div>
      </div>

      <hr className="border-gray-700" />
      <h2 className="text-xl font-semibold text-gray-100">Módulos Dinámicos GMP</h2>

      {/* Dynamic Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredModules.map(mod => {
          const IconComp = Icons[mod.icon] || Icons.Folder;
          return (
            <div key={mod.id} className="bg-gray-800 rounded-xl border border-gray-700 shadow-sm hover:border-gray-600 transition-colors flex flex-col">
              <div className="p-5 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 bg-blue-900/30 text-blue-400 rounded-lg">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-gray-700 text-gray-300 rounded-full">Activo</span>
                </div>
                <h3 className="font-semibold text-gray-100 text-base mb-1">{mod.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{mod.description}</p>
              </div>
              <div className="border-t border-gray-700 p-4 mt-auto">
                <button 
                  onClick={() => navigate(`/gacp-suite/${mod.id}`)}
                  className="w-full py-2 bg-gray-800 border border-blue-600/50 text-blue-400 font-medium rounded-lg hover:bg-blue-900/30 transition-colors flex items-center justify-center"
                >
                  Abrir Módulo
                  <Icons.ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
