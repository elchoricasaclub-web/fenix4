import React from 'react';
import { CloudRain, Sun, Wind, Droplets, ThermometerSun } from 'lucide-react';

export default function WeatherWidget() {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-sm border border-blue-400 overflow-hidden text-white mb-6">
      <div className="p-5 border-b border-blue-400/30 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg flex items-center">
            <ThermometerSun className="w-5 h-5 mr-2 text-yellow-300" />
            Condiciones Locales
          </h3>
          <p className="text-blue-100 text-xs">Estación Meteorológica FENIX4</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold">23°C</span>
          <p className="text-blue-100 text-sm flex items-center justify-end mt-1">
            <Sun className="w-4 h-4 mr-1 text-yellow-300" /> Parcialmente Nublado
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 divide-x divide-blue-400/30 p-4 bg-blue-800/20">
        <div className="flex flex-col items-center justify-center p-2">
          <Droplets className="w-5 h-5 text-blue-200 mb-1" />
          <span className="text-xs text-blue-100 mb-1">Humedad</span>
          <span className="font-semibold text-sm">65%</span>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <Wind className="w-5 h-5 text-teal-200 mb-1" />
          <span className="text-xs text-blue-100 mb-1">Viento</span>
          <span className="font-semibold text-sm">12 km/h</span>
        </div>
        <div className="flex flex-col items-center justify-center p-2">
          <CloudRain className="w-5 h-5 text-indigo-200 mb-1" />
          <span className="text-xs text-blue-100 mb-1">Lluvia</span>
          <span className="font-semibold text-sm">0 mm</span>
        </div>
      </div>
    </div>
  );
}
