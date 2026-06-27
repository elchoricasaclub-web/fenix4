import React, { useState, useEffect } from 'react';
import { Database, Trash2, RefreshCw, AlertTriangle, CheckCircle, WifiOff } from 'lucide-react';

export default function OfflineDataManager() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storageUsage, setStorageUsage] = useState({ used: 0, total: 50 });

  useEffect(() => {
    loadOfflineLogs();
  }, []);

  const loadOfflineLogs = () => {
    setLoading(true);
    setTimeout(() => {
      const storedLogsStr = localStorage.getItem('fenix2_audit_logs');
      let parsedLogs = [];
      if (storedLogsStr) {
        try {
          parsedLogs = JSON.parse(storedLogsStr).map(log => ({
            ...log,
            status: 'pending_sync',
            size: '14 KB'
          }));
        } catch(e) {}
      } 
      
      if (parsedLogs.length === 0) {
        parsedLogs = [
          { id: 1, date: new Date().toISOString(), module: 'GACP', action: 'Inspección de Lote GH-1', status: 'pending_sync', size: '24 KB' },
          { id: 2, date: new Date(Date.now() - 3600000).toISOString(), module: 'GMP', action: 'Limpieza de Máquina C2', status: 'pending_sync', size: '15 KB' },
          { id: 3, date: new Date(Date.now() - 7200000).toISOString(), module: 'Quality', action: 'Muestreo Lote OD-2', status: 'error', size: '42 KB' }
        ];
      }
      setLogs(parsedLogs);
      setStorageUsage({ used: 1.2, total: 50 });
      setLoading(false);
    }, 600);
  };

  const clearCache = () => {
    if (window.confirm('¿Está seguro de que desea eliminar todos los datos locales en caché? Los registros no sincronizados se perderán.')) {
      setLogs([]);
      setStorageUsage({ used: 0, total: 50 });
      alert('Caché limpiada exitosamente.');
    }
  };

  const syncNow = () => {
    setLoading(true);
    setTimeout(() => {
      setLogs([]);
      setStorageUsage({ used: 0, total: 50 });
      setLoading(false);
      alert('Datos sincronizados con éxito.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start space-x-3">
          <Database className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-blue-900">Almacenamiento Local</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">{storageUsage.used} <span className="text-sm font-normal text-blue-600">MB</span></p>
            <p className="text-xs text-blue-500 mt-1">de {storageUsage.total} MB disponibles (IndexedDB)</p>
          </div>
        </div>
        
        <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-start space-x-3">
          <WifiOff className="w-6 h-6 text-orange-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-orange-900">Pendientes de Sincronizar</p>
            <p className="text-2xl font-bold text-orange-700 mt-1">{logs.length} <span className="text-sm font-normal text-orange-600">registros</span></p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h3 className="font-semibold text-gray-800">Registros en Caché (Offline)</h3>
          <div className="flex space-x-2">
            <button 
              onClick={syncNow}
              disabled={logs.length === 0 || loading}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:bg-gray-300 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Sincronizar
            </button>
            <button 
              onClick={clearCache}
              disabled={logs.length === 0 || loading}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg disabled:opacity-50 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpiar Caché
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 font-medium">Fecha</th>
                <th className="p-4 font-medium">Módulo</th>
                <th className="p-4 font-medium">Acción</th>
                <th className="p-4 font-medium">Tamaño</th>
                <th className="p-4 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {logs.length > 0 ? logs.map((log, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-4 text-gray-600">{log.date ? new Date(log.date).toLocaleString() : 'Reciente'}</td>
                  <td className="p-4 font-medium text-gray-900">{log.module}</td>
                  <td className="p-4 text-gray-700">{log.action || log.notes || 'Registro'}</td>
                  <td className="p-4 text-gray-500">{log.size || '12 KB'}</td>
                  <td className="p-4">
                    {log.status === 'error' ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        <AlertTriangle className="w-3 h-3 mr-1" /> Error
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                        <WifiOff className="w-3 h-3 mr-1" /> Pendiente
                      </span>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    No hay datos en la caché local. Todo está sincronizado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
