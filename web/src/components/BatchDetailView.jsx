import React, { useState } from 'react';
import { X, TrendingUp, Droplets, Thermometer, Sun, Activity, DollarSign, Package, Download, Camera, Image as ImageIcon, Users, History, Clock } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import BatchCameraCapture from './BatchCameraCapture';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const mockYieldData = [
  { name: 'Esperado', value: 120, fill: '#94a3b8' },
  { name: 'Real', value: 135, fill: '#22c55e' }
];

const mockEnvData = [
  { week: 'Semana 1', temp: 24, humidity: 65 },
  { week: 'Semana 2', temp: 25, humidity: 60 },
  { week: 'Semana 3', temp: 24, humidity: 55 },
  { week: 'Semana 4', temp: 23, humidity: 50 },
  { week: 'Semana 5', temp: 22, humidity: 45 },
  { week: 'Semana 6', temp: 22, humidity: 45 },
];

const mockPersonnel = [
  { id: 1, name: 'Ana García', role: 'Agrónoma Principal', initials: 'AG', color: 'bg-emerald-100 text-emerald-700' },
  { id: 2, name: 'Carlos López', role: 'Técnico de Riego', initials: 'CL', color: 'bg-blue-100 text-blue-700' },
  { id: 3, name: 'María Rodríguez', role: 'Control de Calidad', initials: 'MR', color: 'bg-purple-100 text-purple-700' },
];

const mockHistoricalLogs = [
  { id: 1, date: '2026-06-25 14:30', user: 'Ana García', action: 'Inspección foliar completada. Estado óptimo.', type: 'info' },
  { id: 2, date: '2026-06-20 09:15', user: 'Carlos López', action: 'Ajuste de nutrientes para fase de floración.', type: 'warning' },
  { id: 3, date: '2026-06-15 11:00', user: 'María Rodríguez', action: 'Muestra enviada a laboratorio para análisis de calidad.', type: 'success' },
  { id: 4, date: '2026-06-10 08:00', user: 'Carlos López', action: 'Riego general programado ejecutado.', type: 'info' },
];

export default function BatchDetailView({ plot, onClose }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  if (!plot) return null;

  const handlePhotoCaptured = (photoUrl) => {
    setPhotos(prev => [{ url: photoUrl, timestamp: new Date().toISOString() }, ...prev]);
    setIsCameraOpen(false);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text(`Reporte de Lote: ${plot.id}`, 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`${plot.name} - ${plot.strain} | Tipo: ${plot.cropType || 'N/A'}`, 14, 30);
    doc.text(`Fecha de Plantación: ${plot.planted} | Estado: ${plot.stage} | Cumplimiento: ${plot.compliance}`, 14, 36);

    // KPIs Section
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Indicadores Clave de Rendimiento (KPIs)', 14, 50);
    
    doc.autoTable({
      startY: 55,
      head: [['Métrica', 'Valor']],
      body: [
        ['Rendimiento Total', '135 kg (+12.5% sobre pronóstico)'],
        ['Calidad (THC/CBD)', 'Grado A (THC: 22% | CBD: 1.2%)'],
        ['Costo Operativo', '$4,250 ($31.48 por kg)'],
        ['Ciclo de Cultivo', '62 Días']
      ],
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] }
    });

    // Environmental History
    doc.setFontSize(14);
    doc.text('Histórico Ambiental Promedio', 14, doc.lastAutoTable.finalY + 15);
    
    const envBody = mockEnvData.map(d => [d.week, `${d.temp} °C`, `${d.humidity} %`]);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Semana', 'Temperatura Media', 'Humedad Media']],
      body: envBody,
      theme: 'grid',
      headStyles: { fillColor: [239, 68, 68] }
    });

    // Resource Costs
    doc.setFontSize(14);
    doc.text('Desglose de Costos de Recursos', 14, doc.lastAutoTable.finalY + 15);

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Categoría', 'Uso / Cantidad', 'Costo Estimado ($)', '% del Total']],
      body: [
        ['Nutrientes y Fertilizantes', '45 Litros', '$1,200', '28.2%'],
        ['Agua (Riego)', '8,500 Litros', '$350', '8.2%'],
        ['Energía (Iluminación y HVAC)', '1,200 kWh', '$850', '20.0%'],
        ['Mano de Obra Directa', '120 Horas', '$1,850', '43.5%'],
        ['Total', '-', '$4,250', '100%']
      ],
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] }
    });

    // Personnel
    doc.setFontSize(14);
    doc.text('Personal Asignado', 14, doc.lastAutoTable.finalY + 15);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Nombre', 'Rol']],
      body: mockPersonnel.map(p => [p.name, p.role]),
      theme: 'grid',
      headStyles: { fillColor: [59, 130, 246] } // blue-500
    });

    // Historical Logs
    doc.setFontSize(14);
    doc.text('Historial de Lote', 14, doc.lastAutoTable.finalY + 15);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Fecha', 'Usuario', 'Acción']],
      body: mockHistoricalLogs.map(l => [l.date, l.user, l.action]),
      theme: 'grid',
      headStyles: { fillColor: [99, 102, 241] } // indigo-500
    });

    // Save PDF
    doc.save(`Lote_${plot.id}_Reporte_Completo.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl my-8 relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Análisis Detallado de Lote: {plot.id}</h2>
            <p className="text-sm text-gray-500 mt-1">{plot.name} - {plot.strain}</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCameraOpen(true)}
              className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              <Camera className="w-4 h-4 mr-2" />
              Tomar Foto
            </button>
            <button 
              onClick={exportToPDF}
              className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 bg-white p-2 rounded-full shadow-sm border border-gray-200">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Top KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <div className="flex items-center text-green-700 mb-2">
                  <Package className="w-5 h-5 mr-2" />
                  <h3 className="font-semibold text-sm">Rendimiento Total</h3>
                </div>
                <p className="text-2xl font-bold text-green-900">135 kg</p>
                <p className="text-xs text-green-600 mt-1">+12.5% sobre el pronóstico</p>
             </div>
             <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center text-blue-700 mb-2">
                  <Activity className="w-5 h-5 mr-2" />
                  <h3 className="font-semibold text-sm">Calidad (THC/CBD)</h3>
                </div>
                <p className="text-2xl font-bold text-blue-900">Grado A</p>
                <p className="text-xs text-blue-600 mt-1">THC: 22% | CBD: 1.2%</p>
             </div>
             <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <div className="flex items-center text-purple-700 mb-2">
                  <DollarSign className="w-5 h-5 mr-2" />
                  <h3 className="font-semibold text-sm">Costo Operativo</h3>
                </div>
                <p className="text-2xl font-bold text-purple-900">$4,250</p>
                <p className="text-xs text-purple-600 mt-1">$31.48 por kg</p>
             </div>
             <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                <div className="flex items-center text-orange-700 mb-2">
                  <Sun className="w-5 h-5 mr-2" />
                  <h3 className="font-semibold text-sm">Ciclo de Cultivo</h3>
                </div>
                <p className="text-2xl font-bold text-orange-900">62 Días</p>
                <p className="text-xs text-orange-600 mt-1">Plantado: {plot.planted}</p>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Yield vs Forecast */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
               <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                 <TrendingUp className="w-4 h-4 mr-2 text-indigo-500"/> Rendimiento: Estimado vs Real (kg)
               </h3>
               <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockYieldData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px' }} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60} />
                    </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>

            {/* Environmental Conditions */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
               <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                 <Thermometer className="w-4 h-4 mr-2 text-red-500"/> Histórico Ambiental del Ciclo
               </h3>
               <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockEnvData} margin={{ top: 5, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="week" axisLine={false} tickLine={false} textAnchor="end" height={40} fontSize={12} />
                      <YAxis yAxisId="left" axisLine={false} tickLine={false} fontSize={12} domain={[15, 30]} />
                      <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} fontSize={12} domain={[30, 80]} />
                      <Tooltip contentStyle={{ borderRadius: '8px' }} />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="temp" name="Temp (°C)" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                      <Line yAxisId="right" type="monotone" dataKey="humidity" name="Humedad (%)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>

          {/* Resource Cost Breakdown */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
             <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
               <DollarSign className="w-4 h-4 mr-2 text-emerald-500"/> Desglose de Costos de Recursos
             </h3>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                     <th className="p-3 font-medium">Categoría</th>
                     <th className="p-3 font-medium">Uso / Cantidad</th>
                     <th className="p-3 font-medium text-right">Costo Estimado ($)</th>
                     <th className="p-3 font-medium text-right">% del Total</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100 text-sm">
                   <tr>
                     <td className="p-3 font-medium text-gray-800">Nutrientes y Fertilizantes</td>
                     <td className="p-3 text-gray-600">45 Litros</td>
                     <td className="p-3 text-right font-medium text-gray-900">$1,200</td>
                     <td className="p-3 text-right text-gray-500">28.2%</td>
                   </tr>
                   <tr>
                     <td className="p-3 font-medium text-gray-800">Agua (Riego)</td>
                     <td className="p-3 text-gray-600">8,500 Litros</td>
                     <td className="p-3 text-right font-medium text-gray-900">$350</td>
                     <td className="p-3 text-right text-gray-500">8.2%</td>
                   </tr>
                   <tr>
                     <td className="p-3 font-medium text-gray-800">Energía (Iluminación y HVAC)</td>
                     <td className="p-3 text-gray-600">1,200 kWh</td>
                     <td className="p-3 text-right font-medium text-gray-900">$850</td>
                     <td className="p-3 text-right text-gray-500">20.0%</td>
                   </tr>
                   <tr>
                     <td className="p-3 font-medium text-gray-800">Mano de Obra Directa</td>
                     <td className="p-3 text-gray-600">120 Horas</td>
                     <td className="p-3 text-right font-medium text-gray-900">$1,850</td>
                     <td className="p-3 text-right text-gray-500">43.5%</td>
                   </tr>
                   <tr className="bg-gray-50 font-bold">
                     <td colSpan="2" className="p-3 text-gray-900">Total</td>
                     <td className="p-3 text-right text-gray-900">$4,250</td>
                     <td className="p-3 text-right text-gray-900">100%</td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </div>
          
          {/* Personnel and Historical Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Assigned Personnel */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
               <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                 <Users className="w-4 h-4 mr-2 text-blue-500"/> Personal Asignado
               </h3>
               <div className="space-y-4">
                 {mockPersonnel.map(person => (
                   <div key={person.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${person.color}`}>
                       {person.initials}
                     </div>
                     <div>
                       <p className="font-semibold text-gray-900 text-sm">{person.name}</p>
                       <p className="text-xs text-gray-500">{person.role}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Historical Logs */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm h-full flex flex-col">
               <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                 <History className="w-4 h-4 mr-2 text-indigo-500"/> Historial de Lote (Log)
               </h3>
               <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                 {mockHistoricalLogs.map(log => (
                   <div key={log.id} className="relative pl-6 pb-4 border-l-2 border-gray-100 last:pb-0 last:border-0">
                     <div className={`absolute -left-1.5 top-0 w-3 h-3 rounded-full border-2 border-white ${
                        log.type === 'info' ? 'bg-blue-400' :
                        log.type === 'warning' ? 'bg-amber-400' :
                        'bg-emerald-400'
                     }`}></div>
                     <div className="flex items-start justify-between">
                       <div>
                         <p className="text-sm font-medium text-gray-800">{log.action}</p>
                         <p className="text-xs text-gray-500 mt-0.5">{log.user}</p>
                       </div>
                       <div className="flex items-center text-xs text-gray-400 whitespace-nowrap ml-2">
                         <Clock className="w-3 h-3 mr-1" />
                         {log.date}
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Photo Evidences */}
          {photos.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
               <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                 <ImageIcon className="w-4 h-4 mr-2 text-indigo-500"/> Evidencias Fotográficas
               </h3>
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                 {photos.map((photo, index) => (
                   <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                     <img src={photo.url} alt={`Evidencia ${index + 1}`} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-end">
                       <p className="text-[10px] text-white opacity-0 group-hover:opacity-100 p-2 truncate w-full bg-gradient-to-t from-black/80 to-transparent">
                         {new Date(photo.timestamp).toLocaleString()}
                       </p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

        </div>
      </div>
      
      {isCameraOpen && (
        <BatchCameraCapture 
          onPhotoCaptured={handlePhotoCaptured}
          onClose={() => setIsCameraOpen(false)}
        />
      )}
    </div>
  );
}
