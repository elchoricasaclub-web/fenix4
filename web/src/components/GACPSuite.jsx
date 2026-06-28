import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { gacpModules } from '../data/gacpModules';
import { useAppContext } from '../contexts/AppContext';
import ModuleTutorial from './guided/ModuleTutorial';

export default function GACPSuite() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a Suite GACP/GMP Principal', 'success');
  }, [logAudit]);

  const filteredModules = gacpModules.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <ModuleTutorial
        title="GACP / GMP Suite"
        moduleName="Suite GACP/GMP"
        objective="Centralizar todos los módulos, formatos y registros requeridos para el cumplimiento de las Buenas Prácticas Agrícolas y de Manufactura."
        whoShouldUse="Directores de calidad, técnicos, operarios y auditores."
        whenToUse="Para navegar hacia cualquier registro de limpieza, calibración, entrenamiento o desviación."
        requiredInformation={['Depende del módulo seleccionado.']}
        steps={[
          'Usa la barra de búsqueda para encontrar el módulo GACP o GMP que necesitas.',
          'Haz clic en la tarjeta correspondiente para entrar al formulario específico.',
          'Llena la información requerida, que generalmente incluirá firmas, adjuntos o validaciones.'
        ]}
        commonMistakes={[
          'Crear registros en papel y no subirlos a la suite correspondiente.'
        ]}
        gacpGmpTips={[
          'Esta suite es tu "Master Batch Record" digital y tu sistema de gestión documental.',
          'Cada módulo aquí tiene un impacto directo en las auditorías de certificación.'
        ]}
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">GACP / GMP Suite</h1>
          <p className="text-sm text-gray-400 mt-1">Gestión Integral de Cumplimiento Normativo (40 Módulos)</p>
        </div>
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

      {/* KPIs Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm flex items-center">
          <div className="p-3 bg-emerald-900/30 text-emerald-400 rounded-lg"><Icons.ShieldCheck className="w-6 h-6" /></div>
          <div className="ml-4"><p className="text-sm text-gray-400">Módulos Activos</p><p className="text-xl font-bold text-gray-100">40 / 40</p></div>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm flex items-center">
          <div className="p-3 bg-blue-900/30 text-blue-400 rounded-lg"><Icons.Activity className="w-6 h-6" /></div>
          <div className="ml-4"><p className="text-sm text-gray-400">Nivel GACP/GMP</p><p className="text-xl font-bold text-gray-100">100%</p></div>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm flex items-center">
          <div className="p-3 bg-yellow-900/30 text-yellow-400 rounded-lg"><Icons.FileText className="w-6 h-6" /></div>
          <div className="ml-4"><p className="text-sm text-gray-400">Documentos</p><p className="text-xl font-bold text-gray-100">Validado</p></div>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm flex items-center">
          <div className="p-3 bg-purple-900/30 text-purple-400 rounded-lg"><Icons.CheckCircle className="w-6 h-6" /></div>
          <div className="ml-4"><p className="text-sm text-gray-400">Trazabilidad</p><p className="text-xl font-bold text-gray-100">Lote a Lote</p></div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredModules.map(mod => {
          const IconComp = Icons[mod.icon] || Icons.Folder;
          return (
            <div key={mod.id} className="bg-gray-800 rounded-xl border border-gray-700 shadow-sm hover:border-gray-600 transition-colors flex flex-col">
              <div className="p-5 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 bg-emerald-900/30 text-emerald-400 rounded-lg">
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
                  className="w-full py-2 bg-gray-800 border border-emerald-600/50 text-emerald-400 font-medium rounded-lg hover:bg-emerald-900/30 transition-colors flex items-center justify-center"
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
