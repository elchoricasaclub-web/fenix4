import React from 'react';
import { FileDown } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { week: 'Semana 1', altura: 5, humedad: 70 },
  { week: 'Semana 2', altura: 15, humedad: 68 },
  { week: 'Semana 3', altura: 30, humedad: 65 },
  { week: 'Semana 4', altura: 50, humedad: 60 },
  { week: 'Semana 5', altura: 75, humedad: 55 },
  { week: 'Semana 6', altura: 100, humedad: 50 },
  { week: 'Semana 7', altura: 110, humedad: 45 },
  { week: 'Semana 8', altura: 115, humedad: 40 },
];

export default function CropGrowthChart() {
  const handleExportCSV = () => {
    const headers = ["Semana", "Altura (cm)", "Humedad Relativa (%)"];
    const csvContent = [
      headers.join(","),
      ...data.map(row => 
        [row.week, row.altura, row.humedad].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "crecimiento_cultivo.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full relative">
      <div className="flex justify-end mb-2">
        <button 
          onClick={handleExportCSV}
          className="flex items-center px-3 py-1.5 text-xs bg-indigo-50 text-indigo-700 font-medium rounded-md hover:bg-indigo-100 transition-colors border border-indigo-200"
        >
          <FileDown className="w-3 h-3 mr-1.5" /> Exportar Datos CSV
        </button>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
          <defs>
            <linearGradient id="colorAltura" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorHumedad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="week" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="altura" 
            name="Altura (cm)"
            stroke="#10b981" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorAltura)" 
          />
          <Area 
            type="monotone" 
            dataKey="humedad" 
            name="Humedad Relativa (%)"
            stroke="#3b82f6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorHumedad)" 
          />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
