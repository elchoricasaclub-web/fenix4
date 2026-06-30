import React, { useEffect } from 'react';
import { Calendar, Scale, Sprout, TrendingUp, AlertTriangle, FileDown } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useAppContext } from '../contexts/AppContext';

const forecastData = [
  { plot: 'GH-1', variety: 'Fenotipo A', predictedYield: 120, historicalAvg: 110, harvestDate: '2023-12-15', confidence: 92 },
  { plot: 'GH-2', variety: 'Fenotipo B', predictedYield: 85, historicalAvg: 90, harvestDate: '2023-12-28', confidence: 88 },
  { plot: 'OD-1', variety: 'Cepa C', predictedYield: 210, historicalAvg: 195, harvestDate: '2024-01-10', confidence: 85 },
  { plot: 'OD-2', variety: 'Fenotipo A', predictedYield: 105, historicalAvg: 110, harvestDate: '2024-01-22', confidence: 78 },
];

export default function YieldForecasting() {
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a módulo Yield Forecasting (IA)', 'success');
  }, [logAudit]);

  const handleExportCSV = () => {
    const headers = ["Lote", "Variedad", "Rendimiento Estimado (kg)", "Promedio Histórico (kg)", "Fecha Cosecha", "Confianza (%)"];
    const csvContent = [
      headers.join(","),
      ...forecastData.map(row => 
        [row.plot, row.variety, row.predictedYield, row.historicalAvg, row.harvestDate, row.confidence].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "pronostico_rendimiento.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-emerald-600" />
          Pronóstico de Rendimiento
        </h1>
        <button 
          onClick={handleExportCSV}
          className="flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 font-medium rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200 shadow-sm"
        >
          <FileDown className="w-4 h-4 mr-2" /> Exportar CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Producción Total Estimada</p>
            <p className="text-2xl font-bold text-gray-900">520 kg</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Próxima Cosecha</p>
            <p className="text-2xl font-bold text-gray-900">15 Dic 2023</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Lotes Activos</p>
            <p className="text-2xl font-bold text-gray-900">4 Lotes</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Análisis Predictivo vs Histórico</h2>
          <p className="text-sm text-gray-500">Comparativa de rendimiento estimado en kg (basado en modelo de crecimiento) frente al promedio histórico del fenotipo.</p>
        </div>
        <div className="h-80 w-full p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={forecastData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="plot" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                cursor={{ fill: '#f3f4f6' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="predictedYield" name="Estimado Actual (kg)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              <Bar dataKey="historicalAvg" name="Promedio Histórico (kg)" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Calendario de Cosechas Proyectadas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Lote</th>
                <th className="p-4 font-medium">Variedad</th>
                <th className="p-4 font-medium">Fecha de Cosecha (Est.)</th>
                <th className="p-4 font-medium">Producción (Est.)</th>
                <th className="p-4 font-medium">Confianza del Modelo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {forecastData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-gray-900">{data.plot}</td>
                  <td className="p-4 text-gray-600">{data.variety}</td>
                  <td className="p-4">
                    <div className="flex items-center text-gray-900 font-medium">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      {data.harvestDate}
                    </div>
                  </td>
                  <td className="p-4 font-bold text-emerald-600">{data.predictedYield} kg</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2 max-w-[100px]">
                        <div 
                          className={`h-2 rounded-full ${data.confidence >= 90 ? 'bg-emerald-500' : data.confidence >= 80 ? 'bg-blue-500' : 'bg-orange-500'}`} 
                          style={{ width: `${data.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-600 font-medium">{data.confidence}%</span>
                      {data.confidence < 80 && (
                        <AlertTriangle className="w-4 h-4 text-orange-500 ml-2" title="Factores ambientales inusuales detectados" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
