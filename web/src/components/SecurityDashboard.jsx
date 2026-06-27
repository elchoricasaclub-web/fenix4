import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, Lock, Database, Activity, HardDrive, Key, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

export default function SecurityDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { auditLogs, logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a Security & Audit Center', 'success');
  }, [logAudit]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-100 flex items-center">
            <ShieldCheck className="w-8 h-8 mr-3 text-emerald-400" />
            FENIX3 Security & Audit Center
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Centro de gestión integral: Autenticación, Auditoría GACP/GMP, Protección de Datos y Cloud Backups.
          </p>
        </div>
        <div className="bg-gray-800 p-1 rounded-lg border border-gray-700 flex">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'overview' ? 'bg-gray-700 text-gray-100 shadow-sm' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Vista General
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'audit' ? 'bg-gray-700 text-gray-100 shadow-sm' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Logs de Auditoría
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-700 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-900/30 text-blue-400 rounded-lg"><Users className="w-6 h-6" /></div>
                <span className="text-xs font-medium px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded-full">Protegido</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">Control de Accesos (IAM)</h3>
              <p className="text-xl font-bold text-gray-100">Multi-Empresa Activo</p>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-700 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-900/30 text-purple-400 rounded-lg"><Lock className="w-6 h-6" /></div>
                <span className="text-xs font-medium px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded-full">AES-256</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">Cifrado de Datos Sensibles</h3>
              <p className="text-xl font-bold text-gray-100">En tránsito y reposo</p>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-700 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-900/30 text-emerald-400 rounded-lg"><HardDrive className="w-6 h-6" /></div>
                <span className="text-xs font-medium px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded-full">Sincronizado</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">Backups y DRP</h3>
              <p className="text-xl font-bold text-gray-100">Copia Nube Diaria</p>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-700 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-indigo-900/30 text-indigo-400 rounded-lg"><FileText className="w-6 h-6" /></div>
                <span className="text-xs font-medium px-2 py-1 bg-emerald-900/30 text-emerald-400 rounded-full">Validado</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">Cumplimiento GACP/GMP</h3>
              <p className="text-xl font-bold text-gray-100">Firmas Digitales (CFR 21)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
              <h2 className="text-lg font-bold text-gray-100 mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2 text-emerald-400" /> Resiliencia de Datos & Cloud
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-100">Arquitectura Offline-First + Cloud Sync</h4>
                    <p className="text-xs text-gray-400 mt-1">Los datos se persisten localmente mediante PouchDB/IndexedDB y se sincronizan a Firebase/Supabase con resolución de conflictos.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-100">Backups Automatizados (DRP)</h4>
                    <p className="text-xs text-gray-400 mt-1">Respaldos incrementales automatizados hacia AWS S3 / Google Cloud Storage, garantizando RPO y RTO mínimos ante desastres.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-100">Prevención de Pérdida de Datos (DLP)</h4>
                    <p className="text-xs text-gray-400 mt-1">Control de descargas y ofuscación de datos sensibles de pacientes y fórmulas magistrales.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
              <h2 className="text-lg font-bold text-gray-100 mb-4 flex items-center">
                <Key className="w-5 h-5 mr-2 text-indigo-400" /> Autenticación y Autorización
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-100">MFA / 2FA y JWT Seguro</h4>
                    <p className="text-xs text-gray-400 mt-1">Tokens de acceso de corta duración (JWT) y Refresh Tokens HttpOnly para prevención de XSS y CSRF.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-100">Modelo Multi-Tenancy (Multi-Empresa)</h4>
                    <p className="text-xs text-gray-400 mt-1">Aislamiento lógico de bases de datos por empresa (Row-Level Security - RLS) impidiendo fugas horizontales.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-100">Control de Accesos Basado en Roles (RBAC)</h4>
                    <p className="text-xs text-gray-400 mt-1">Permisos granulares: Auditores solo lectura, Químicos aprueban liberación, Operarios solo ejecutan tareas.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      {activeTab === 'audit' && (
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-100 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-purple-400" /> Trazabilidad de Cambios (Audit Trail)
            </h2>
            <span className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full border border-gray-600">
              CFR 21 Part 11 Compliant
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-sm">
                  <th className="pb-3 font-semibold">Usuario / Entidad</th>
                  <th className="pb-3 font-semibold">Acción Realizada</th>
                  <th className="pb-3 font-semibold">Dirección IP</th>
                  <th className="pb-3 font-semibold">Fecha/Hora</th>
                  <th className="pb-3 font-semibold text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="text-sm hover:bg-gray-700/30 transition-colors">
                    <td className="py-4 text-gray-100 font-medium flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gray-500" /> {log.user}
                    </td>
                    <td className="py-4 text-gray-300">{log.action}</td>
                    <td className="py-4 text-gray-500 font-mono text-xs">{log.ip}</td>
                    <td className="py-4 text-gray-400">{log.time}</td>
                    <td className="py-4 text-right">
                      {log.status === 'success' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-900/30 text-emerald-400">
                          Exitoso
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-900/30 text-orange-400">
                          <AlertTriangle className="w-3 h-3 mr-1" /> Alerta
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
