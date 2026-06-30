import React, { useEffect } from 'react';
import { Map, MapPin, Navigation, Clock } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const Rutas = () => {
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a módulo de Control de Rutas', 'success');
  }, [logAudit]);

  const rutas = [
    { id: 'RT-101', conductor: 'Carlos Mendoza', estado: 'En Progreso', entregas: 12, completadas: 5, tiempoEst: '4h 30m' },
    { id: 'RT-102', conductor: 'Ana Silva', estado: 'Finalizada', entregas: 8, completadas: 8, tiempoEst: '---' },
    { id: 'RT-103', conductor: 'Luis Giraldo', estado: 'Por Iniciar', entregas: 15, completadas: 0, tiempoEst: '6h 15m' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Control de Rutas</h1>
          <p className="text-sm text-gray-500 mt-1">Supervisión en tiempo real de vehículos y entregas.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Map className="w-5 h-5 mr-2" />
          Ver Mapa Global
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel izquierdo: Lista de Rutas */}
        <div className="lg:col-span-1 space-y-4">
          {rutas.map((ruta) => (
            <div key={ruta.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{ruta.id}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  ruta.estado === 'En Progreso' ? 'bg-blue-100 text-blue-800' :
                  ruta.estado === 'Finalizada' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {ruta.estado}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3 flex items-center">
                <Navigation className="w-4 h-4 mr-2 text-gray-400" />
                {ruta.conductor}
              </p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500">
                  <MapPin className="w-4 h-4 mr-1 text-green-500" />
                  {ruta.completadas}/{ruta.entregas} Entregas
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {ruta.tiempoEst}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-4">
                <div 
                  className={`h-1.5 rounded-full ${ruta.estado === 'Finalizada' ? 'bg-green-500' : 'bg-blue-500'}`} 
                  style={{ width: `${(ruta.completadas / ruta.entregas) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Panel derecho: Placeholder de Mapa */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px] flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gray-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50"></div>
          <div className="relative text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm">
            <Map className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">Mapa Interactivo</h3>
            <p className="text-sm text-gray-500 max-w-sm mt-2">
              Selecciona una ruta de la lista para visualizar el recorrido en tiempo real.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rutas;
