import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Download, Plus, CheckCircle, Clock, AlertCircle, BarChart2, Shield, Crosshair } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import { isRequired } from '../../core/utils/validators';
import { exportToCSV } from '../../core/utils/exportHelper';
import { useAppContext } from '../../contexts/AppContext';

export default function MarketBenchmarkCenter() {
  const addToast = useToast();
  const [activeTab, setActiveTab] = useState('insights');
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a Market Benchmark Center', 'success');
  }, [logAudit]);

  const [roadmap, setRoadmap] = useState([
    { id: 1, title: 'Portal B2B Mayorista', category: 'SaaS', priority: 'Alta', impact: 'Alto', effort: 'Medio', status: 'Propuesto' },
    { id: 2, title: 'Checklists Offline App', category: 'Auditoría', priority: 'Media', impact: 'Alto', effort: 'Alto', status: 'En Análisis' },
  ]);
  const [formData, setFormData] = useState({});

  const competitors = [
    { name: 'Canix', type: 'Seed-to-Sale', strength: 'UX Móvil Offline, Básculas', gap: 'Poca localización Colombia', score: 85 },
    { name: 'Distru', type: 'ERP Cannabis', strength: 'Inventario, Portal B2B', gap: 'Compliance Farmacéutico Débil', score: 82 },
    { name: 'Qualio', type: 'eQMS Farmacéutico', strength: 'Control Documental estricto', gap: 'No tiene módulos agrícolas', score: 88 },
    { name: 'SafetyCulture', type: 'Auditoría', strength: 'Reportes de inspección ágiles', gap: 'Genérico, sin lógica Cannabis', score: 80 },
    { name: 'Agrivi', type: 'Farm Management', strength: 'Costeo agrícola, Analytics', gap: 'Sin GMP / Trazabilidad INVIMA', score: 75 },
  ];

  const handleExport = () => {
    exportToCSV(competitors, 'Market_Benchmark_Competitors');
    addToast('Análisis competitivo exportado exitosamente', 'success');
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (!isRequired(formData.title) || !isRequired(formData.category) || !isRequired(formData.priority)) {
      addToast('Completa los campos obligatorios antes de guardar.', 'error');
      return;
    }
    setRoadmap([{ id: Date.now(), ...formData, status: 'Propuesto' }, ...roadmap]);
    setFormData({});
    addToast('Funcionalidad añadida al roadmap de innovación.', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Market Benchmark & Innovation</h1>
          <p className="text-gray-500 mt-2 max-w-2xl text-lg">
            Análisis de las mejores plataformas del mercado, brechas competitivas, roadmap de innovación y funcionalidades para llevar FENIX1 al siguiente nivel.
          </p>
        </div>
        <button 
          onClick={handleExport}
          className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" /> Exportar Benchmarking
        </button>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('insights')}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === 'insights' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <Target className="w-4 h-4 inline mr-2" /> Top 5 Referencias
        </button>
        <button 
          onClick={() => setActiveTab('roadmap')}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === 'roadmap' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <TrendingUp className="w-4 h-4 inline mr-2" /> Feature Adoption Roadmap
        </button>
      </div>

      {activeTab === 'insights' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitors.map((comp) => (
              <div key={comp.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{comp.name}</h3>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">{comp.type}</span>
                  </div>
                  <div className="bg-gray-900 text-white font-black text-lg px-3 py-1 rounded-lg">
                    {comp.score}
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Fortaleza Principal</p>
                    <p className="text-sm font-medium text-gray-800 flex items-start gap-2 mt-1">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {comp.strength}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Brecha Competitiva</p>
                    <p className="text-sm font-medium text-gray-800 flex items-start gap-2 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> {comp.gap}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald-900 rounded-2xl p-8 text-white shadow-lg">
            <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
              <Shield className="text-emerald-400" />
              Ventaja Competitiva de FENIX1
            </h3>
            <p className="text-emerald-100 text-lg leading-relaxed max-w-4xl">
              Nuestra arquitectura combina el rigor <strong>GACP/GMP</strong> (como Qualio/MasterControl) con la agilidad agrícola y una <strong>localización perfecta para Colombia</strong> (INVIMA, FNE, ICA, MinJusticia), cubriendo un nicho donde los sistemas globales fracasan por su rigidez o costos exorbitantes. 
            </p>
          </div>
        </div>
      )}

      {activeTab === 'roadmap' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-lg">Backlog de Funcionalidades</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {roadmap.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">{item.category}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Target className="w-4 h-4" /> Impacto {item.impact}</span>
                        <span className="flex items-center gap-1"><BarChart2 className="w-4 h-4" /> Esfuerzo {item.effort}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold ${
                        item.status === 'Propuesto' ? 'bg-amber-100 text-amber-800' :
                        item.status === 'En Análisis' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                      <p className="text-xs text-gray-400 font-bold mt-2 uppercase">Prioridad {item.priority}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h3 className="font-bold text-gray-900 text-lg mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" /> Nueva Funcionalidad
              </h3>
              <form onSubmit={handleAddFeature} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Título de Funcionalidad *</label>
                  <input type="text" className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Ej: Integración RFID" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Categoría *</label>
                  <select className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border focus:ring-2 focus:ring-emerald-500" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="">Seleccionar...</option>
                    <option value="SaaS">SaaS Corporativo</option>
                    <option value="Auditoría">Auditoría / QMS</option>
                    <option value="IoT">IoT / Hardware</option>
                    <option value="Trazabilidad">Trazabilidad / Lotes</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Prioridad *</label>
                    <select className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border focus:ring-2 focus:ring-emerald-500" value={formData.priority || ''} onChange={e => setFormData({...formData, priority: e.target.value})}>
                      <option value="">Seleccionar...</option>
                      <option value="Alta">Alta</option>
                      <option value="Media">Media</option>
                      <option value="Baja">Baja</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Impacto</label>
                    <select className="w-full border-gray-300 rounded-lg p-2.5 bg-gray-50 border focus:ring-2 focus:ring-emerald-500" value={formData.impact || ''} onChange={e => setFormData({...formData, impact: e.target.value})}>
                      <option value="Alto">Alto</option>
                      <option value="Medio">Medio</option>
                      <option value="Bajo">Bajo</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors mt-2 shadow-sm">
                  Agregar a Roadmap
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
