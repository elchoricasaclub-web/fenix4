import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { regulatoryModules } from '../data/regulatoryModules';
import { useAppContext } from '../contexts/AppContext';

export default function RegulatorySuite() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a Suite Regulatoria (Colombia)', 'success');
  }, [logAudit]);

  const filteredModules = regulatoryModules.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Regulatory Colombia Suite</h1>
          <p className="text-sm text-gray-400 mt-1">Gestión de Cumplimiento Regulatorio y Entidades (Módulos 41-80)</p>
        </div>
        <div className="relative">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar módulo..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64 shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm flex items-center">
          <div className="p-3 bg-blue-900/30 text-blue-400 rounded-lg"><Icons.FileSignature className="w-6 h-6" /></div>
          <div className="ml-4"><p className="text-sm text-gray-400">Licencias Vigentes</p><p className="text-xl font-bold text-gray-100">4 / 4</p></div>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm flex items-center">
          <div className="p-3 bg-yellow-900/30 text-yellow-400 rounded-lg"><Icons.BellRing className="w-6 h-6" /></div>
          <div className="ml-4"><p className="text-sm text-gray-400">Próximos Vencimientos</p><p className="text-xl font-bold text-gray-100">2 Alertas</p></div>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm flex items-center">
          <div className="p-3 bg-purple-900/30 text-purple-400 rounded-lg"><Icons.Hash className="w-6 h-6" /></div>
          <div className="ml-4"><p className="text-sm text-gray-400">Radicados Abiertos</p><p className="text-xl font-bold text-gray-100">3 Activos</p></div>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-sm flex items-center">
          <div className="p-3 bg-emerald-900/30 text-emerald-400 rounded-lg"><Icons.PieChart className="w-6 h-6" /></div>
          <div className="ml-4"><p className="text-sm text-gray-400">Cupos Aprobados</p><p className="text-xl font-bold text-gray-100">100%</p></div>
        </div>
      </div>

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
                  <span className="text-xs font-medium px-2 py-1 bg-gray-700 text-gray-300 rounded-full">Oficial</span>
                </div>
                <h3 className="font-semibold text-gray-100 text-base mb-1">{mod.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{mod.description}</p>
              </div>
              <div className="border-t border-gray-700 p-4 mt-auto">
                <button 
                  onClick={() => navigate(`/regulatory-suite/${mod.id}`)}
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
