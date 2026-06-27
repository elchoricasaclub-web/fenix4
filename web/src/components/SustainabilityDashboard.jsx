import React, { useState, useEffect } from 'react';
import { Globe, Droplets, Zap, TrendingDown, Leaf } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useAppContext } from '../contexts/AppContext';

const mockWaterData = [
  { month: 'Ene', expected: 1500, actual: 1450 },
  { month: 'Feb', expected: 1400, actual: 1380 },
  { month: 'Mar', expected: 1600, actual: 1550 },
  { month: 'Abr', expected: 1800, actual: 1700 },
  { month: 'May', expected: 2000, actual: 1850 },
  { month: 'Jun', expected: 2200, actual: 1950 },
];

const mockCarbonData = [
  { month: 'Ene', footprint: 120 },
  { month: 'Feb', footprint: 115 },
  { month: 'Mar', footprint: 110 },
  { month: 'Abr', footprint: 105 },
  { month: 'May', footprint: 98 },
  { month: 'Jun', footprint: 92 },
];

export default function SustainabilityDashboard() {
  const { logAudit } = useAppContext();
  const [metrics, setMetrics] = useState({
    waterSaved: 0,
    carbonReduced: 0,
    renewableEnergy: 0
  });

  useEffect(() => {
    logAudit('Acceso a módulo de Sostenibilidad', 'success');
    // Process local storage logs to influence metrics dynamically if available
    const logs = JSON.parse(localStorage.getItem('fenix2_audit_logs') || '[]');
    let waterSavingActions = 0;
    
    logs.forEach(log => {
      if (log.notes && log.notes.toLowerCase().includes('agua')) waterSavingActions += 1;
    });

    setMetrics({
      waterSaved: 12.5 + (waterSavingActions * 0.5), // Base % + log actions
      carbonReduced: 18.2,
      renewableEnergy: 45
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-green-600" />
          Panel de Sostenibilidad y ESG
        </h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-blue-100 rounded-full text-blue-600">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Eficiencia Hídrica</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold text-gray-900">{metrics.waterSaved.toFixed(1)}%</p>
              <span className="ml-2 flex items-center text-xs font-medium text-green-600">
                <TrendingDown className="w-3 h-3 mr-1" /> Ahorro vs Mes Anterior
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-green-100 rounded-full text-green-600">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Reducción Huella de Carbono</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold text-gray-900">{metrics.carbonReduced}%</p>
              <span className="ml-2 flex items-center text-xs font-medium text-green-600">
                <TrendingDown className="w-3 h-3 mr-1" /> Objetivo 20%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-yellow-100 rounded-full text-yellow-600">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Uso de Energía Renovable</p>
            <p className="text-2xl font-bold text-gray-900">{metrics.renewableEnergy}%</p>
            <p className="text-xs text-gray-500 mt-1">Solar + Biomasa</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Water Usage Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Uso Hídrico (Litros)</h2>
            <p className="text-sm text-gray-500">Estimado vs Real Consumido</p>
          </div>
          <div className="h-80 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockWaterData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Area type="monotone" dataKey="actual" name="Uso Real" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActual)" />
                <Line type="monotone" dataKey="expected" name="Límite Autorizado" stroke="#ef4444" strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Carbon Footprint Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Huella de Carbono (tCO2e)</h2>
            <p className="text-sm text-gray-500">Evolución mensual de emisiones</p>
          </div>
          <div className="h-80 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCarbonData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="footprint" name="Emisiones tCO2e" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recomendaciones de Sostenibilidad Generadas</h2>
        <ul className="space-y-3">
          <li className="flex items-start bg-blue-50 p-3 rounded-lg">
            <Droplets className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">Optimización de Riego Lote OD-2</p>
              <p className="text-xs text-blue-700 mt-1">El historial indica un exceso de humedad relativa. Ajustar riego puede ahorrar hasta 15% de agua esta semana.</p>
            </div>
          </li>
          <li className="flex items-start bg-green-50 p-3 rounded-lg">
            <Leaf className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-900">Compostaje de Residuos Vegetales</p>
              <p className="text-xs text-green-700 mt-1">Se registraron podas en el Lote GH-1. Incorporar biomasa al programa de compostaje para reducir fertilizantes sintéticos.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
