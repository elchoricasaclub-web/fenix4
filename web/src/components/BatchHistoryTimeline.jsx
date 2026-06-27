import React, { useState, useEffect } from 'react';
import { Calendar, Leaf, Scissors, Activity, FileText, CheckCircle, Clock } from 'lucide-react';

const mockTimelineData = {
  'GH-1': [
    { id: 1, date: '2023-08-15', type: 'planting', title: 'Plantación Inicial', user: 'Carlos Gómez', desc: 'Siembra de Fenotipo A.', icon: Leaf, color: 'text-green-500', bg: 'bg-green-100' },
    { id: 2, date: '2023-08-30', type: 'nutrient', title: 'Ajuste de Nutrientes', user: 'María Rodríguez', desc: 'Aumento de Nitrógeno para etapa vegetativa temprana.', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 3, date: '2023-09-15', type: 'inspection', title: 'Inspección Sanitaria', user: 'Juan Pérez', desc: 'Cultivo sano. Sin signos de plagas.', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { id: 4, date: '2023-10-01', type: 'pruning', title: 'Poda de Formación', user: 'Carlos Gómez', desc: 'Poda apical y limpieza de bajos.', icon: Scissors, color: 'text-orange-500', bg: 'bg-orange-100' },
  ],
  'GH-2': [
    { id: 5, date: '2023-09-01', type: 'planting', title: 'Plantación Inicial', user: 'María Rodríguez', desc: 'Transplante de clones Fenotipo B.', icon: Leaf, color: 'text-green-500', bg: 'bg-green-100' },
    { id: 6, date: '2023-09-14', type: 'inspection', title: 'Inspección Sanitaria', user: 'Juan Pérez', desc: 'Se detectó inicio de mildiu. Se aplicó tratamiento preventivo.', icon: Activity, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  ]
};

export default function BatchHistoryTimeline({ selectedPlot }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Combine mock data with any logs from local storage matching the plot
    const savedLogs = JSON.parse(localStorage.getItem('fenix4_audit_logs') || '[]');
    const plotLogs = savedLogs
      .filter(log => log.action.includes(selectedPlot.id) || (log.notes && log.notes.includes(selectedPlot.id)))
      .map(log => ({
        id: log.id,
        date: new Date(log.date).toISOString().split('T')[0],
        type: 'log',
        title: log.module + ' - ' + log.action,
        user: log.user,
        desc: log.notes || 'Registro de sistema',
        icon: FileText,
        color: 'text-purple-500',
        bg: 'bg-purple-100'
      }));

    const mockEvents = mockTimelineData[selectedPlot.id] || [
      { id: Date.now(), date: selectedPlot.planted !== 'N/A' ? selectedPlot.planted : '2023-01-01', type: 'planting', title: 'Registro Inicial', user: 'Sistema', desc: 'Lote registrado en el sistema.', icon: Clock, color: 'text-gray-500', bg: 'bg-gray-100' }
    ];

    const allEvents = [...mockEvents, ...plotLogs].sort((a, b) => new Date(b.date) - new Date(a.date));
    setEvents(allEvents);
  }, [selectedPlot]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-6 lg:col-span-2">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-indigo-500" />
        Línea de Tiempo del Lote: {selectedPlot.id}
      </h2>
      <p className="text-sm text-gray-500 mb-6">Historial completo de eventos, desde plantación hasta estado actual.</p>

      <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 pb-4">
        {events.length === 0 ? (
           <p className="text-sm text-gray-500 ml-6">No hay eventos registrados para este lote.</p>
        ) : (
          events.map((event) => {
            const Icon = event.icon;
            return (
              <div key={event.id} className="relative pl-8">
                <div className={`absolute -left-3.5 top-1.5 w-7 h-7 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${event.bg}`}>
                  <Icon className={`w-3.5 h-3.5 ${event.color}`} />
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                      {event.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{event.desc}</p>
                  <div className="mt-3 flex items-center text-xs text-gray-500 font-medium">
                    <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mr-2">
                      {event.user.charAt(0)}
                    </div>
                    Registrado por: {event.user}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
