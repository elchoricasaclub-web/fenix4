import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileText, Plus, Save, Clock, User, Tag, QrCode, Printer, MapPin, Package, FileDown, PenTool } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useLocalization } from '../contexts/LocalizationContext';
import SignaturePad from './SignaturePad';
import { useAppContext } from '../contexts/AppContext';

export default function Compliance() {
  const [activeTab, setActiveTab] = useState('audit'); // 'audit' or 'qr'
  const [logs, setLogs] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const { t } = useLocalization();
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a módulo de Auditoría y Cumplimiento', 'success');
  }, [logAudit]);

  const [newLog, setNewLog] = useState({
    module: 'GACP',
    action: '',
    user: 'Admin FENIX4',
    notes: '',
    signature: null,
  });

  const [batchData, setBatchData] = useState({
    batchId: 'LOT-2023-11A',
    strain: 'Fenotipo A',
    harvestDate: new Date().toISOString().split('T')[0],
    origin: 'Invernadero Norte',
    weight: '50.5',
  });

  const [generatedQr, setGeneratedQr] = useState('');

  // Load from local storage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem('fenix4_audit_logs');
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    } else {
      // Default dummy data
      const defaultLogs = [
        { id: 1, date: new Date(Date.now() - 86400000).toISOString(), module: 'GACP', action: 'Inspección de Invernadero Norte', user: 'Inspector Juan', notes: 'Todo en orden, humedad dentro de parámetros.' },
        { id: 2, date: new Date(Date.now() - 172800000).toISOString(), module: 'GMP', action: 'Limpieza de Sala de Secado', user: 'Operario Ana', notes: 'Limpieza profunda completada según protocolo L-01.' },
      ];
      setLogs(defaultLogs);
      localStorage.setItem('fenix4_audit_logs', JSON.stringify(defaultLogs));
    }
  }, []);

  const handleSaveLog = (e) => {
    e.preventDefault();
    if (!newLog.action) return;

    const logEntry = {
      ...newLog,
      id: Date.now(),
      date: new Date().toISOString(),
    };

    const updatedLogs = [logEntry, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('fenix4_audit_logs', JSON.stringify(updatedLogs));
    
    // Reset form
    setNewLog({ module: 'GACP', action: '', user: 'Admin FENIX4', notes: '', signature: null });
    setIsAdding(false);
    setShowSignaturePad(false);
  };

  const handleGenerateQR = (e) => {
    e.preventDefault();
    // Create a JSON string with the batch data
    const qrData = JSON.stringify({
      id: batchData.batchId,
      strain: batchData.strain,
      date: batchData.harvestDate,
      origin: batchData.origin,
      weight: batchData.weight + 'kg'
    });
    // Encode for URL
    const encodedData = encodeURIComponent(qrData);
    setGeneratedQr(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}&color=0f172a`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Reporte de Auditoría GACP/GMP - FENIX4", 14, 15);
    doc.setFontSize(10);
    doc.text(`Fecha de exportación: ${new Date().toLocaleString()}`, 14, 22);

    const tableColumn = ["Fecha y Hora", "Estándar", "Actividad", "Responsable", "Notas"];
    const tableRows = [];

    logs.forEach(log => {
      const logData = [
        new Date(log.date).toLocaleString(),
        log.module,
        log.action,
        log.user,
        log.notes || 'N/A'
      ];
      tableRows.push(logData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [220, 38, 38] }, // Tailwind red-600 ish
    });

    doc.save("fenix4_audit_report.pdf");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-100 flex items-center">
          <ShieldCheck className="w-6 h-6 mr-2 text-red-500" />
          {t('compliance.title')}
        </h1>
        
        {/* Tabs */}
        <div className="flex bg-gray-800 p-1 rounded-lg border border-gray-700">
          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'audit' ? 'bg-gray-700 text-gray-100 shadow-sm' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <FileText className="w-4 h-4 mr-2" />
            Bitácora de Auditoría
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'qr' ? 'bg-gray-700 text-gray-100 shadow-sm' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <QrCode className="w-4 h-4 mr-2" />
            Trazabilidad QR Lotes
          </button>
        </div>
      </div>

      {activeTab === 'audit' && (
        <>
          <div className="flex justify-end">
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
            >
              {isAdding ? <span className="flex items-center">Cancelar</span> : <><Plus className="w-4 h-4 mr-2" /> Nuevo Registro</>}
            </button>
          </div>

          {isAdding && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-gray-500" />
                Registrar Nueva Actividad de Auditoría
              </h2>
              <form onSubmit={handleSaveLog} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Módulo / Estándar</label>
                    <select 
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                      value={newLog.module}
                      onChange={(e) => setNewLog({...newLog, module: e.target.value})}
                    >
                      <option value="GACP">GACP (Buenas Prácticas Agrícolas)</option>
                      <option value="GMP">GMP (Buenas Prácticas de Manufactura)</option>
                      <option value="Calidad">Control de Calidad</option>
                      <option value="SST">Seguridad y Salud en el Trabajo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Usuario / Responsable</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                      value={newLog.user}
                      onChange={(e) => setNewLog({...newLog, user: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Acción / Evento</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    placeholder="Ej. Calibración de báscula B-02"
                    value={newLog.action}
                    onChange={(e) => setNewLog({...newLog, action: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notas u Observaciones (Opcional)</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none h-24"
                    placeholder="Detalles adicionales sobre la inspección o procedimiento..."
                    value={newLog.notes}
                    onChange={(e) => setNewLog({...newLog, notes: e.target.value})}
                  />
                </div>

                {/* Signature Capture Section */}
                <div className="pt-2 border-t border-gray-100">
                  {!showSignaturePad && !newLog.signature ? (
                    <button
                      type="button"
                      onClick={() => setShowSignaturePad(true)}
                      className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      <PenTool className="w-4 h-4 mr-2" />
                      Requerir Firma de Supervisor (GMP/GACP)
                    </button>
                  ) : showSignaturePad ? (
                    <SignaturePad 
                      onSign={(dataUrl) => {
                        setNewLog({ ...newLog, signature: dataUrl });
                        setShowSignaturePad(false);
                      }}
                      onCancel={() => setShowSignaturePad(false)}
                    />
                  ) : (
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <ShieldCheck className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Firma Capturada Exitosamente</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <img src={newLog.signature} alt="Firma" className="h-8 object-contain bg-white border border-gray-200 rounded px-2" />
                        <button
                          type="button"
                          onClick={() => {
                            setNewLog({ ...newLog, signature: null });
                            setShowSignaturePad(true);
                          }}
                          className="text-xs text-red-500 hover:text-red-700 font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    type="submit"
                    className="flex items-center px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Registro Seguro
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Bitácora de Auditoría (Audit Trail)</h2>
                <p className="text-sm text-gray-500">Registros inmutables de actividades relacionadas con cumplimiento normativo.</p>
              </div>
              <button 
                onClick={handleExportPDF}
                className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200 shadow-sm"
              >
                <FileDown className="w-4 h-4 mr-2" /> Exportar a PDF
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium">Fecha y Hora</th>
                    <th className="p-4 font-medium">Estándar</th>
                    <th className="p-4 font-medium">Actividad</th>
                    <th className="p-4 font-medium">Responsable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-gray-500">
                        No hay registros de auditoría almacenados.
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 align-top">
                          <div className="flex items-center text-gray-700 whitespace-nowrap">
                            <Clock className="w-4 h-4 mr-2 text-gray-400" />
                            {new Date(log.date).toLocaleString()}
                          </div>
                        </td>
                        <td className="p-4 align-top">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${log.module === 'GACP' ? 'bg-green-100 text-green-800' : 
                              log.module === 'GMP' ? 'bg-blue-100 text-blue-800' : 
                              log.module === 'Calidad' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'}`}
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {log.module}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{log.action}</div>
                          {log.notes && <div className="text-gray-500 mt-1 line-clamp-2">{log.notes}</div>}
                        </td>
                        <td className="p-4 align-top">
                          <div className="flex items-center text-gray-700 whitespace-nowrap">
                            <User className="w-4 h-4 mr-2 text-gray-400" />
                            {log.user}
                          </div>
                          {log.signature && (
                            <div className="mt-2 flex items-center">
                              <span className="text-xs text-gray-500 mr-2 flex items-center"><ShieldCheck className="w-3 h-3 text-green-500 mr-1" /> Firmado:</span>
                              <img src={log.signature} alt="Firma Supervisor" className="h-6 object-contain bg-white border border-gray-100 rounded px-1" />
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'qr' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* QR Generator Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <Package className="w-5 h-5 mr-2 text-indigo-500" />
                Datos del Lote Cosechado
              </h2>
              <p className="text-sm text-gray-500">Ingrese los datos para generar la etiqueta QR de trazabilidad GACP.</p>
            </div>
            
            <form onSubmit={handleGenerateQR} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID del Lote</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-mono"
                  value={batchData.batchId}
                  onChange={(e) => setBatchData({...batchData, batchId: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Variedad / Fenotipo</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    value={batchData.strain}
                    onChange={(e) => setBatchData({...batchData, strain: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Cosecha</label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    value={batchData.harvestDate}
                    onChange={(e) => setBatchData({...batchData, harvestDate: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Origen (Invernadero/Lote)</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    value={batchData.origin}
                    onChange={(e) => setBatchData({...batchData, origin: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Peso Húmedo (kg)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    value={batchData.weight}
                    onChange={(e) => setBatchData({...batchData, weight: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full flex justify-center items-center px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Generar Etiqueta QR de Trazabilidad
                </button>
              </div>
            </form>
          </div>

          {/* QR Preview & Print */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <Printer className="w-5 h-5 mr-2 text-green-500" />
                Vista Previa de Etiqueta
              </h2>
            </div>
            
            <div className="p-6 flex-1 flex flex-col items-center justify-center bg-gray-50">
              {generatedQr ? (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center max-w-sm w-full">
                  <div className="text-center mb-4 w-full">
                    <h3 className="font-bold text-gray-900 text-lg border-b-2 border-gray-900 pb-2 mb-2">FENIX4 TRACEABILITY</h3>
                    <p className="text-sm font-medium text-gray-600">LOTE: {batchData.batchId}</p>
                  </div>
                  
                  <div className="bg-white p-2 rounded-lg border-2 border-gray-100 shadow-inner my-4">
                    <img src={generatedQr} alt="QR Code Lote" className="w-48 h-48 object-contain" />
                  </div>
                  
                  <div className="w-full text-xs text-gray-600 space-y-1 mt-4">
                    <p className="flex justify-between"><span className="font-semibold">Variedad:</span> <span>{batchData.strain}</span></p>
                    <p className="flex justify-between"><span className="font-semibold">Origen:</span> <span>{batchData.origin}</span></p>
                    <p className="flex justify-between"><span className="font-semibold">Cosecha:</span> <span>{batchData.harvestDate}</span></p>
                    <p className="flex justify-between"><span className="font-semibold">Peso:</span> <span>{batchData.weight} kg</span></p>
                  </div>

                  <button className="mt-8 flex items-center justify-center w-full px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-colors">
                    <Printer className="w-4 h-4 mr-2" /> Imprimir Etiqueta
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Complete los datos del lote y haga clic en "Generar Etiqueta" para previsualizar.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
