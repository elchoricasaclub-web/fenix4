import React, { useEffect, useState } from 'react';
import { Package, Leaf, Droplets, ThermometerSun, AlertTriangle, Plus, Search, Filter, ArrowRight, Activity, Calendar } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import GreenhouseList from './GreenhouseList';
import GreenhouseForm from './GreenhouseForm';

export default function Inventory() {
  const { logAudit } = useAppContext();
  const [activeTab, setActiveTab] = useState('lotes');

  useEffect(() => {
    logAudit('Acceso a módulo de Invernadero e Inventario', 'success');
  }, [logAudit]);

  const stats = [
    { name: 'Lotes Activos', value: '24', icon: Leaf, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Plantas Totales', value: '1,240', icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { name: 'Temp Promedio', value: '24.5°C', icon: ThermometerSun, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { name: 'Humedad Relativa', value: '62%', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ];

  const lotes = [
    { id: 'L-001', cepa: 'Blue Dream', fase: 'Floración', ubicacion: 'GH-Sur-1', plantadas: 120, inicio: '2023-10-01' },
    { id: 'L-002', cepa: 'Sour Diesel', fase: 'Vegetativa', ubicacion: 'GH-Norte-2', plantadas: 200, inicio: '2023-10-15' },
    { id: 'L-003', cepa: 'OG Kush', fase: 'Germinación', ubicacion: 'GH-Este-1', plantadas: 50, inicio: '2023-11-02' },
  ];

  const insumos = [
    { id: 'INS-01', nombre: 'Fertilizante NPK 20-20-20', categoria: 'Nutrientes', stock: '450 L', estado: 'Óptimo' },
    { id: 'INS-02', nombre: 'Sustrato Coco', categoria: 'Suelos', stock: '20 Sacos', estado: 'Bajo' },
    { id: 'INS-03', nombre: 'Control Biológico (Mariquitas)', categoria: 'Plagas', stock: '5 Cajas', estado: 'Óptimo' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <Leaf className="w-7 h-7 mr-3 text-emerald-500" />
          Invernadero e Inventario
        </h1>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors border border-slate-700">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </button>
          <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/20">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Lote
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm flex items-center">
            <div className={`p-3 rounded-xl ${stat.bg} mr-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">{stat.name}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab('lotes')}
              className={`text-sm font-medium pb-4 -mb-4 border-b-2 transition-colors ${
                activeTab === 'lotes' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              Control de Cultivo (Lotes)
            </button>
            <button
              onClick={() => setActiveTab('insumos')}
              className={`text-sm font-medium pb-4 -mb-4 border-b-2 transition-colors ${
                activeTab === 'insumos' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              Inventario de Insumos
            </button>
          </div>
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-emerald-500 focus:border-emerald-500 w-64"
            />
          </div>
        </div>

        <div className="p-0">
          {activeTab === 'lotes' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4 font-medium">ID Lote</th>
                    <th className="px-6 py-4 font-medium">Cepa</th>
                    <th className="px-6 py-4 font-medium">Fase</th>
                    <th className="px-6 py-4 font-medium">Ubicación</th>
                    <th className="px-6 py-4 font-medium">Plantas</th>
                    <th className="px-6 py-4 font-medium">Fecha Inicio</th>
                    <th className="px-6 py-4 font-medium text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {lotes.map((lote) => (
                    <tr key={lote.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{lote.id}</td>
                      <td className="px-6 py-4 text-slate-300">{lote.cepa}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${
                          lote.fase === 'Floración' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                          lote.fase === 'Vegetativa' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {lote.fase}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{lote.ubicacion}</td>
                      <td className="px-6 py-4 text-slate-300">{lote.plantadas}</td>
                      <td className="px-6 py-4 text-slate-300 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                        {lote.inicio}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-emerald-400 hover:text-emerald-300 p-2 hover:bg-emerald-500/10 rounded-lg transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4 font-medium">ID Insumo</th>
                    <th className="px-6 py-4 font-medium">Nombre</th>
                    <th className="px-6 py-4 font-medium">Categoría</th>
                    <th className="px-6 py-4 font-medium">Stock Actual</th>
                    <th className="px-6 py-4 font-medium">Estado</th>
                    <th className="px-6 py-4 font-medium text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {insumos.map((insumo) => (
                    <tr key={insumo.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{insumo.id}</td>
                      <td className="px-6 py-4 text-slate-300 flex items-center">
                        <Package className="w-4 h-4 mr-2 text-slate-500" />
                        {insumo.nombre}
                      </td>
                      <td className="px-6 py-4 text-slate-300">{insumo.categoria}</td>
                      <td className="px-6 py-4 font-medium text-slate-300">{insumo.stock}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-lg border ${
                          insumo.estado === 'Óptimo' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}>
                          {insumo.estado === 'Bajo' && <AlertTriangle className="w-3 h-3 inline mr-1" />}
                          {insumo.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-emerald-400 hover:text-emerald-300 p-2 hover:bg-emerald-500/10 rounded-lg transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <GreenhouseForm />
        </div>
        <div className="lg:col-span-2">
          <GreenhouseList />
        </div>
      </div>
    </div>
  );
}
