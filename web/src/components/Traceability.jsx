import React, { useState, useMemo, useEffect } from 'react';
import { Map, Leaf, Droplets, Thermometer, Wind, Beaker, TrendingUp, QrCode, BarChart2, Filter, LayoutGrid, Map as MapIcon } from 'lucide-react';
import CropGrowthChart from './CropGrowthChart';
import WeatherWidget from './WeatherWidget';
import AIDiagnosticTool from './AIDiagnosticTool';
import BatchHistoryTimeline from './BatchHistoryTimeline';
import QRScannerModal from './QRScannerModal';
import BatchDetailView from './BatchDetailView';
import GeoMapVisualization from './GeoMapVisualization';
import ComparativeDashboardWidget from './ComparativeDashboardWidget';
import BatchStatusBadge from './BatchStatusBadge';
import { useAppContext } from '../contexts/AppContext';

const plotsData = [
  { id: 'GH-1', name: 'Invernadero Norte', stage: 'Floración', strain: 'Fenotipo A', cropType: 'Cannabis THC', planted: '2023-08-15', humidity: '45%', temp: '24°C', color: 'bg-purple-400', border: 'border-purple-600', text: 'text-purple-800', compliance: 'Aprobado', coordinates: { x: 15, y: 25 } },
  { id: 'GH-2', name: 'Invernadero Sur', stage: 'Vegetativo', strain: 'Fenotipo B', cropType: 'Cáñamo Industrial', planted: '2023-09-01', humidity: '60%', temp: '26°C', color: 'bg-green-400', border: 'border-green-600', text: 'text-green-800', compliance: 'Pendiente', coordinates: { x: 30, y: 25 } },
  { id: 'OD-1', name: 'Exterior Lote 1', stage: 'Cosecha', strain: 'Fenotipo C', cropType: 'Cannabis CBD', planted: '2023-07-10', humidity: '40%', temp: '22°C', color: 'bg-yellow-400', border: 'border-yellow-600', text: 'text-yellow-800', compliance: 'Rechazado', coordinates: { x: 60, y: 30 } },
  { id: 'OD-2', name: 'Exterior Lote 2', stage: 'Enraizado', strain: 'Esquejes', cropType: 'Cannabis THC', planted: '2023-10-05', humidity: '75%', temp: '27°C', color: 'bg-emerald-300', border: 'border-emerald-500', text: 'text-emerald-800', compliance: 'Aprobado', coordinates: { x: 80, y: 30 } },
  { id: 'OD-3', name: 'Exterior Lote 3', stage: 'Preparación', strain: 'N/A', cropType: 'N/A', planted: '2023-11-01', humidity: 'N/A', temp: 'N/A', color: 'bg-gray-200', border: 'border-gray-400', text: 'text-gray-600', compliance: 'Pendiente', coordinates: { x: 60, y: 70 } },
  { id: 'OD-4', name: 'Exterior Lote 4', stage: 'Vegetativo', strain: 'Fenotipo A', cropType: 'Cannabis CBD', planted: '2023-09-10', humidity: '55%', temp: '25°C', color: 'bg-green-400', border: 'border-green-600', text: 'text-green-800', compliance: 'Aprobado', coordinates: { x: 80, y: 70 } },
];

export default function Traceability() {
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a módulo Trazabilidad de Cultivo', 'success');
  }, [logAudit]);
  const [selectedPlot, setSelectedPlot] = useState(plotsData[0]);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [viewMode, setViewMode] = useState('map'); // 'grid' or 'map'

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    cropType: 'Todos',
    compliance: 'Todos'
  });

  const filteredPlots = useMemo(() => {
    return plotsData.filter(plot => {
      let match = true;
      if (filters.cropType !== 'Todos' && plot.cropType !== filters.cropType && plot.cropType !== 'N/A') match = false;
      if (filters.compliance !== 'Todos' && plot.compliance !== filters.compliance) match = false;
      if (filters.startDate && plot.planted !== 'N/A' && new Date(plot.planted) < new Date(filters.startDate)) match = false;
      if (filters.endDate && plot.planted !== 'N/A' && new Date(plot.planted) > new Date(filters.endDate)) match = false;
      return match;
    });
  }, [filters]);

  const handleQRScan = (decodedText) => {
    const plot = plotsData.find(p => p.id === decodedText);
    if (plot) {
      setSelectedPlot(plot);
    } else {
      alert(`Lote no encontrado: ${decodedText}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-100 flex items-center">
            <Map className="w-6 h-6 mr-2 text-green-500" />
            Mapa de Monitoreo de Cultivos
          </h1>
          <button
            onClick={() => setIsQRScannerOpen(true)}
            className="ml-4 flex items-center px-4 py-2 bg-indigo-900/30 text-indigo-400 font-medium rounded-lg hover:bg-indigo-900/50 transition-colors border border-indigo-800 shadow-sm"
          >
            <QrCode className="w-4 h-4 mr-2" /> Escanear QR Lote
          </button>
        </div>
        <div className="flex space-x-2 text-sm font-medium">
          <span className="flex items-center"><span className="w-3 h-3 rounded-full bg-emerald-400 mr-1"></span>Enraizado</span>
          <span className="flex items-center text-gray-300"><span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>Vegetativo</span>
          <span className="flex items-center text-gray-300"><span className="w-3 h-3 rounded-full bg-purple-500 mr-1"></span>Floración</span>
          <span className="flex items-center text-gray-300"><span className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>Cosecha</span>
          <span className="flex items-center text-gray-300"><span className="w-3 h-3 rounded-full bg-gray-600 mr-1"></span>Preparación</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0 bg-white rounded-xl shadow-sm p-5 border border-gray-100 h-fit">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
            <Filter className="w-5 h-5 mr-2 text-indigo-500" />
            Filtros
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rango de Fechas (Plantación)</label>
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="date" 
                  value={filters.startDate}
                  onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                  className="w-full text-xs p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                />
                <input 
                  type="date" 
                  value={filters.endDate}
                  onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                  className="w-full text-xs p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cultivo</label>
              <select 
                value={filters.cropType}
                onChange={(e) => setFilters({...filters, cropType: e.target.value})}
                className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Todos">Todos</option>
                <option value="Cannabis THC">Cannabis THC</option>
                <option value="Cannabis CBD">Cannabis CBD</option>
                <option value="Cáñamo Industrial">Cáñamo Industrial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado de Cumplimiento</label>
              <select 
                value={filters.compliance}
                onChange={(e) => setFilters({...filters, compliance: e.target.value})}
                className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Todos">Todos</option>
                <option value="Aprobado">Aprobado</option>
                <option value="Pendiente">Pendiente / En Revisión</option>
                <option value="Rechazado">Rechazado</option>
              </select>
            </div>

            <button 
              onClick={() => setFilters({ startDate: '', endDate: '', cropType: 'Todos', compliance: 'Todos' })}
              className="w-full mt-2 py-2 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Vista Aérea - Instalaciones FENIX3</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Mostrando {filteredPlots.length} lotes</span>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setViewMode('map')}
                      className={`p-1.5 rounded-md transition-colors ${viewMode === 'map' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                      title="Vista Mapa Geo-Grid"
                    >
                      <MapIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                      title="Vista Cuadrícula"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {viewMode === 'map' ? (
                <GeoMapVisualization 
                  plots={filteredPlots} 
                  selectedPlot={selectedPlot} 
                  onSelectPlot={setSelectedPlot} 
                />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 min-h-[16rem]">
                  {filteredPlots.length > 0 ? filteredPlots.map((plot) => (
                    <button
                      key={plot.id}
                      onClick={() => setSelectedPlot(plot)}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${plot.color} ${plot.border} ${
                        selectedPlot.id === plot.id ? 'ring-4 ring-offset-2 ring-blue-400 transform scale-105 z-10 shadow-lg' : 'hover:opacity-90 hover:scale-105 shadow-sm'
                      }`}
                    >
                      <Leaf className={`w-8 h-8 mb-2 ${plot.text}`} />
                      <span className={`font-bold text-sm ${plot.text} text-center`}>{plot.id}</span>
                      <span className={`text-xs ${plot.text} text-center opacity-80 mt-1 font-medium`}>{plot.stage}</span>
                      <div className="absolute top-2 right-2">
                        <BatchStatusBadge status={plot.compliance} className="shadow-sm" />
                      </div>
                    </button>
                  )) : (
                    <div className="col-span-full flex items-center justify-center text-gray-400 italic">No hay lotes que coincidan con los filtros.</div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
                <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" />
                Progreso de Crecimiento - {selectedPlot.name}
              </h2>
              <p className="text-sm text-gray-500 mb-4">Evolución de altura y humedad relativa monitoreada en tiempo real.</p>
              <CropGrowthChart />
            </div>
            <BatchHistoryTimeline selectedPlot={selectedPlot} />
          </div>
        </div>

        {/* Selected Plot Details */}
        <div className="w-full xl:w-[400px] flex-shrink-0 space-y-6">
          <WeatherWidget />
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className={`p-6 border-b ${selectedPlot.color} bg-opacity-20`}>
              <h3 className="text-xl font-bold text-gray-900">{selectedPlot.name}</h3>
              <p className="text-sm font-medium text-gray-700 flex items-center mt-1">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${selectedPlot.color} border ${selectedPlot.border}`}></span>
                Estado: {selectedPlot.stage}
              </p>
              <div className="mt-2">
                <BatchStatusBadge status={selectedPlot.compliance} className="bg-white/70 backdrop-blur-sm shadow-sm px-3 py-1" />
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <span className="flex items-center text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">
                    <Leaf className="w-3 h-3 mr-1" /> Variedad
                  </span>
                  <p className="font-semibold text-gray-900">{selectedPlot.strain}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <span className="flex items-center text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">
                    <Thermometer className="w-3 h-3 mr-1" /> Plantación
                  </span>
                  <p className="font-semibold text-gray-900">{selectedPlot.planted}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-3">Sensores en Tiempo Real</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Droplets className="w-4 h-4 mr-2 text-blue-500" /> Humedad Relativa
                    </div>
                    <span className="font-semibold text-gray-900">{selectedPlot.humidity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Thermometer className="w-4 h-4 mr-2 text-red-500" /> Temperatura
                    </div>
                    <span className="font-semibold text-gray-900">{selectedPlot.temp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Wind className="w-4 h-4 mr-2 text-teal-500" /> Ventilación
                    </div>
                    <span className="font-semibold text-green-600">Activa</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <Beaker className="w-4 h-4 mr-2 text-purple-500" /> Nutrientes (EC)
                    </div>
                    <span className="font-semibold text-gray-900">1.2 mS/cm</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-sm mb-3">
                Registrar Acción / Inspección
              </button>
              <button 
                onClick={() => setIsDetailViewOpen(true)}
                className="w-full py-2.5 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center"
              >
                <BarChart2 className="w-4 h-4 mr-2" />
                Ver Análisis Detallado
              </button>
            </div>
          </div>

          <AIDiagnosticTool selectedPlot={selectedPlot} />
          
          <ComparativeDashboardWidget selectedPlot={selectedPlot} />
          
        </div>
      </div>
      
      <QRScannerModal 
        isOpen={isQRScannerOpen} 
        onClose={() => setIsQRScannerOpen(false)} 
        onScan={handleQRScan} 
      />

      {isDetailViewOpen && (
        <BatchDetailView 
          plot={selectedPlot} 
          onClose={() => setIsDetailViewOpen(false)} 
        />
      )}
    </div>
  );
}
