import React from 'react';
import { Cpu, CheckCircle, ExternalLink, Zap } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

export default function ModuleInnovationHub() {
  const addToast = useToast();
  
  const suggestions = [
    { title: 'Portal B2B de Clientes', value: 'Operativo', priority: 'Alta', desc: 'Acceso seguro para clientes a sus COAs y pedidos.' },
    { title: 'Gestión de Entrenamiento', value: 'QA', priority: 'Media', desc: 'Módulo GMP para certificar al personal.' },
    { title: 'Integración IoT (Sensores)', value: 'Producción', priority: 'Baja', desc: 'Monitoreo de temperatura y humedad en tiempo real.' },
    { title: 'IA para Predicción de Riesgos', value: 'Estratégico', priority: 'Media', desc: 'Motor predictivo de desviaciones de calidad.' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Hub de Innovación de Módulos</h2>
        <p className="text-gray-500 mt-1">Explora e integra nuevos módulos recomendados para tu plan SaaS corporativo.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {suggestions.map((s, i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-lg transition-all duration-300 group flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Zap className="w-16 h-16 text-indigo-600" />
            </div>
            <div>
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 border border-indigo-100">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{s.desc}</p>
              
              <div className="flex gap-2 mb-6">
                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-md border border-gray-200">
                  {s.value}
                </span>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${s.priority === 'Alta' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                  Pri. {s.priority}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => addToast(`Módulo "${s.title}" aprobado para el Roadmap.`, 'success')}
              className="w-full text-indigo-700 bg-indigo-50 hover:bg-indigo-600 hover:text-white py-3 rounded-lg text-sm font-bold transition-colors flex justify-center items-center gap-2 border border-indigo-100"
            >
              <CheckCircle className="w-4 h-4" /> Aprobar para Integración
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
