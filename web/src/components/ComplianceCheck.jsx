import React, { useState } from 'react';
import { CheckCircle, Circle, AlertTriangle, ShieldCheck, ChevronDown, ChevronRight, Activity, Save, Download, FileText, QrCode } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import QRScannerModal from './QRScannerModal';

const INITIAL_BATCHES = [
  {
    id: 'LT-2026-01',
    strain: 'Sour Diesel',
    stage: 'Floración',
    steps: [
      { id: 'step-1', name: 'Preparación del Suelo / Sustrato', completed: true },
      { id: 'step-2', name: 'Selección de Semillas/Esquejes', completed: true },
      { id: 'step-3', name: 'Control de Agua de Riego', completed: true },
      { id: 'step-4', name: 'Manejo de Plagas (Registro)', completed: false },
      { id: 'step-5', name: 'Cosecha (Limpieza de Herramientas)', completed: false },
    ]
  },
  {
    id: 'LT-2026-02',
    strain: 'Blue Dream',
    stage: 'Vegetativo',
    steps: [
      { id: 'step-1', name: 'Preparación del Suelo / Sustrato', completed: true },
      { id: 'step-2', name: 'Selección de Semillas/Esquejes', completed: true },
      { id: 'step-3', name: 'Control de Agua de Riego', completed: false },
      { id: 'step-4', name: 'Manejo de Plagas (Registro)', completed: false },
      { id: 'step-5', name: 'Cosecha (Limpieza de Herramientas)', completed: false },
    ]
  }
];

export default function ComplianceCheck() {
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [expandedBatch, setExpandedBatch] = useState(batches[0]?.id);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const { logAudit } = useAppContext();

  const handleScan = (decodedText) => {
    // Attempt to match the scanned text with a batch ID
    const foundBatch = batches.find(b => b.id === decodedText || decodedText.includes(b.id));
    if (foundBatch) {
      setExpandedBatch(foundBatch.id);
      logAudit(`Lote ${foundBatch.id} identificado vía código QR`, 'success');
    } else {
      logAudit(`No se encontró lote para el código QR escaneado: ${decodedText}`, 'warning');
    }
  };

  const toggleStep = (batchId, stepId) => {
    setBatches(currentBatches => 
      currentBatches.map(batch => {
        if (batch.id === batchId) {
          return {
            ...batch,
            steps: batch.steps.map(step => 
              step.id === stepId ? { ...step, completed: !step.completed } : step
            )
          };
        }
        return batch;
      })
    );
  };

  const handleSave = (batchId) => {
    logAudit(`Verificación GACP actualizada para lote ${batchId}`, 'success');
  };

  const exportCSV = () => {
    let csvContent = "Lote,Cepa,Etapa,Paso,Estado\n";

    batches.forEach(batch => {
      batch.steps.forEach(step => {
        csvContent += `${batch.id},${batch.strain},${batch.stage},${step.name},${step.completed ? 'Completado' : 'Pendiente'}\n`;
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "compliance_gacp.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    logAudit('Reporte CSV exportado', 'success');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Reporte de Cumplimiento GACP', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 30);

    const tableData = [];
    batches.forEach(batch => {
      batch.steps.forEach(step => {
        tableData.push([
          batch.id,
          batch.strain,
          batch.stage,
          step.name,
          step.completed ? 'Completado' : 'Pendiente'
        ]);
      });
    });

    doc.autoTable({
      startY: 36,
      head: [['Lote', 'Cepa', 'Etapa', 'Paso', 'Estado']],
      body: tableData,
      theme: 'grid',
      styles: { fontSize: 9 },
      headStyles: { fillColor: [16, 185, 129] } // emerald-500
    });

    doc.save('compliance_gacp.pdf');
    logAudit('Reporte PDF exportado', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-100 flex items-center">
            <ShieldCheck className="w-6 h-6 mr-2 text-emerald-500" />
            Compliance Check (GACP)
          </h2>
          <p className="text-sm text-gray-400 mt-1">Verificación de Buenas Prácticas Agrícolas por lote.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsScannerOpen(true)}
            className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            <QrCode className="w-4 h-4 mr-2" />
            Escanear Lote
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg border border-slate-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            CSV
          </button>
          <button
            onClick={exportPDF}
            className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </button>
        </div>
      </div>

      <QRScannerModal 
        isOpen={isScannerOpen} 
        onClose={() => setIsScannerOpen(false)} 
        onScan={handleScan} 
      />

      <div className="space-y-4">
        {batches.map(batch => {
          const completedSteps = batch.steps.filter(s => s.completed).length;
          const totalSteps = batch.steps.length;
          const progress = Math.round((completedSteps / totalSteps) * 100);
          const isExpanded = expandedBatch === batch.id;
          
          let statusColor = 'text-amber-400 bg-amber-400/10 border-amber-400/20';
          let StatusIcon = AlertTriangle;
          if (progress === 100) {
            statusColor = 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            StatusIcon = CheckCircle;
          } else if (progress > 0) {
            statusColor = 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            StatusIcon = Activity;
          }

          return (
            <div key={batch.id} className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden transition-all">
              <div 
                className="p-4 sm:p-6 cursor-pointer hover:bg-slate-800/30 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                onClick={() => setExpandedBatch(isExpanded ? null : batch.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl border ${statusColor}`}>
                    <StatusIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {batch.id}
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {batch.strain}
                      </span>
                    </h3>
                    <p className="text-sm text-slate-400">{batch.stage} • {completedSteps} de {totalSteps} pasos completados</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full sm:w-auto">
                  <div className="flex-grow sm:w-48">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-slate-400">Progreso GACP</span>
                      <span className="text-xs font-bold text-slate-300">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full ${progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'} transition-all duration-500`} 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-slate-400">
                    {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 sm:p-6 border-t border-slate-700/50 bg-slate-800/20">
                  <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Lista de Verificación</h4>
                  <div className="space-y-3">
                    {batch.steps.map(step => (
                      <div 
                        key={step.id} 
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
                        onClick={() => toggleStep(batch.id, step.id)}
                      >
                        <div className="flex items-center gap-3">
                          {step.completed ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-500" />
                          )}
                          <span className={`text-sm ${step.completed ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                            {step.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleSave(batch.id); }}
                      className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Guardar Verificación
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
