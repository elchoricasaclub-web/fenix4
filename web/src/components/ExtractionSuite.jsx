import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Beaker, Wind, Droplets, ThermometerSnowflake, 
  Leaf, Settings, ShieldAlert, Scale, ClipboardCheck, 
  Trash2, FileText, CheckCircle, PackageCheck, AlertTriangle
} from 'lucide-react';
import BubbleHashModule from './extraction/BubbleHashModule';
import BHOModule from './extraction/BHOModule';
import LiveResinModule from './extraction/LiveResinModule';
import LiveRosinModule from './extraction/LiveRosinModule';
import FlowerPrepModule from './extraction/FlowerPrepModule';
import SolventControlModule from './extraction/SolventControlModule';
import GenericExtractionModule from './extraction/GenericExtractionModule';
import { useAppContext } from '../contexts/AppContext';

export default function ExtractionSuite() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const activeModule = moduleId || 'dashboard';
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit(`Acceso a módulo de Extracción: ${activeModule}`, 'success');
  }, [activeModule, logAudit]);

  const handleBack = () => navigate('/extraction');
  const handleModuleClick = (id) => navigate(`/extraction/${id}`);

  const modules = [
    { id: 'prep', name: 'Preparación de Flor', icon: Leaf, color: 'text-green-400', bg: 'bg-green-900/30', desc: 'Molienda, descarboxilación y pesaje' },
    { id: 'bho', name: 'BHO', icon: Wind, color: 'text-orange-400', bg: 'bg-orange-900/30', desc: 'Extracción con Butano, control de solventes' },
    { id: 'live_resin', name: 'Live Resin', icon: ThermometerSnowflake, color: 'text-cyan-400', bg: 'bg-cyan-900/30', desc: 'Flor congelada fresca, purga y curado' },
    { id: 'live_rosin', name: 'Live Rosin', icon: Droplets, color: 'text-yellow-400', bg: 'bg-yellow-900/30', desc: 'Prensado de Hash, presión y temperatura' },
    { id: 'bubble_hash', name: 'Bubble Hash', icon: Beaker, color: 'text-blue-400', bg: 'bg-blue-900/30', desc: 'Lavado con hielo, filtrado por micras' },
    { id: 'solventes', name: 'Control de Solventes', icon: Beaker, color: 'text-purple-400', bg: 'bg-purple-900/30', desc: 'Inventario y recuperación de gases/líquidos' },
    { id: 'equipos', name: 'Control de Equipos', icon: Settings, color: 'text-gray-300', bg: 'bg-gray-800', desc: 'Mantenimiento y calibración' },
    { id: 'calidad', name: 'Calidad de Extractos', icon: ClipboardCheck, color: 'text-indigo-400', bg: 'bg-indigo-900/30', desc: 'Análisis de laboratorio y liberación' },
    { id: 'desviaciones', name: 'Desviaciones', icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-900/30', desc: 'Control de no conformidades' },
    { id: 'balance', name: 'Balance de Masa', icon: Scale, color: 'text-emerald-400', bg: 'bg-emerald-900/30', desc: 'Rendimiento y pérdidas en proceso' },
    { id: 'limpieza', name: 'Limpieza y Sanitización', icon: Trash2, color: 'text-teal-400', bg: 'bg-teal-900/30', desc: 'Registros de limpieza de equipos y áreas' },
    { id: 'reportes', name: 'Reportes', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-900/30', desc: 'Reportes regulatorios y métricas' },
    { id: 'trazabilidad', name: 'Trazabilidad GACP/GMP', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-900/30', desc: 'Historial completo de lotes' },
    { id: 'liberacion', name: 'Liberación de Producto', icon: PackageCheck, color: 'text-indigo-400', bg: 'bg-indigo-900/30', desc: 'Aprobación final para inventario' },
  ];

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {modules.map((mod) => (
              <div 
                key={mod.id} 
                onClick={() => handleModuleClick(mod.id)}
                className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 hover:shadow-md hover:border-indigo-500/50 cursor-pointer transition-all transform hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-lg ${mod.bg} flex items-center justify-center mb-4`}>
                  <mod.icon className={`w-6 h-6 ${mod.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-100 mb-1">{mod.name}</h3>
                <p className="text-sm text-gray-400">{mod.desc}</p>
              </div>
            ))}
          </div>
        );
      case 'prep':
        return <FlowerPrepModule onBack={handleBack} />;
      case 'solventes':
        return <SolventControlModule onBack={handleBack} />;
      case 'bubble_hash':
        return <BubbleHashModule onBack={handleBack} />;
      case 'bho':
        return <BHOModule onBack={handleBack} />;
      case 'live_resin':
        return <LiveResinModule onBack={handleBack} />;
      case 'live_rosin':
        return <LiveRosinModule onBack={handleBack} />;
      default:
        return (
          <GenericExtractionModule 
            title={modules.find(m => m.id === activeModule)?.name || 'Módulo'} 
            onBack={handleBack} 
          />
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-100 flex items-center">
            <Beaker className="w-6 h-6 mr-3 text-indigo-400" />
            Extracción y Transformación
          </h1>
          <p className="text-sm text-gray-400 mt-1">Suite de Procesamiento GACP/GMP</p>
        </div>
      </div>

      {renderModule()}
    </div>
  );
}
