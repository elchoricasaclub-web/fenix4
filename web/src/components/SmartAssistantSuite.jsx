import React, { useState } from 'react';
import { Brain, BookOpen, Database, FileText, CheckSquare, Clock, Shield, Sliders, ArrowLeft, ArrowRight, Plus, Search, FileUp } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import GuidedInput from './guided/GuidedInput';
import ModuleTutorial from './guided/ModuleTutorial';

export default function SmartAssistantSuite() {
  const navigate = useNavigate();
  const { moduleType } = useParams(); // e.g. company-memory, frequent-files, tutorials, smart-autofill
  
  const currentTab = moduleType || 'company-memory';

  const tabs = [
    { id: 'tutorials', label: 'Tutoriales por Módulo', icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { id: 'company-memory', label: 'Memoria Empresarial', icon: Database, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { id: 'frequent-files', label: 'Archivos Frecuentes', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { id: 'smart-autofill', label: 'Autollenado', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { id: 'templates', label: 'Plantillas', icon: CheckSquare, color: 'text-teal-400', bg: 'bg-teal-500/10' },
    { id: 'usage-history', label: 'Auditoría', icon: Clock, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { id: 'permissions', label: 'Permisos', icon: Shield, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  ];

  const renderContent = () => {
    switch (currentTab) {
      case 'company-memory':
        return (
          <div className="space-y-6">
            <div className="bg-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
               <h3 className="text-lg font-semibold text-white mb-4">Información Base de Empresa</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <GuidedInput
                   label="Nombre Legal"
                   defaultValue="Fenix4 Pharma SAS"
                   isRequired={true}
                   placeholder="Ej: AgroCannabis S.A.S."
                   helpText="Razón social registrada ante la cámara de comercio."
                   gacpGmpTip="El nombre legal debe coincidir exactamente con las licencias aprobadas."
                 />
                 <GuidedInput
                   label="NIT"
                   defaultValue="900.123.456-7"
                   isRequired={true}
                   placeholder="Ej: 900.000.000-1"
                   helpText="Número de Identificación Tributaria."
                 />
                 <GuidedInput
                   label="Representante Legal"
                   defaultValue="Carlos Restrepo"
                   isRequired={true}
                   placeholder="Nombre completo"
                   helpText="Representante legal registrado en cámara de comercio."
                 />
                 <GuidedInput
                   label="Responsable Técnico (Q.F.)"
                   defaultValue="Dra. Ana López"
                   isRequired={true}
                   placeholder="Nombre del director técnico"
                   helpText="Profesional responsable ante el ente regulatorio."
                 />
               </div>
               <div className="mt-4 flex justify-end">
                 <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Guardar Memoria</button>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {['Áreas de Operación', 'Equipos Registrados', 'Proveedores Aprobados', 'SOPs Base', 'Genéticas'].map(cat => (
                 <div key={cat} className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors">
                   <span className="font-medium text-slate-300">{cat}</span>
                   <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-full border border-slate-700">Gestionar</span>
                 </div>
               ))}
            </div>
          </div>
        );
      case 'frequent-files':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
                <input type="text" placeholder="Buscar archivo..." className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
              </div>
              <button className="flex items-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <FileUp className="w-4 h-4 mr-2" /> Subir Archivo Frecuente
              </button>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-slate-800/50">
                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Documento</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Categoría</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Estado</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Usos</th>
                    <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Vencimiento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-200">RUT Empresa 2026.pdf</div>
                      <div className="text-xs text-slate-500">Subido por Admin (Hace 2 meses)</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">Legal</td>
                    <td className="px-4 py-3"><span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">Vigente</span></td>
                    <td className="px-4 py-3 text-sm text-slate-400">12 Módulos</td>
                    <td className="px-4 py-3 text-sm text-slate-400">-</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-200">Certificado_Calibracion_Balanza1.pdf</div>
                      <div className="text-xs text-slate-500">Subido por Q.F. (Hace 11 meses)</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">Equipos</td>
                    <td className="px-4 py-3"><span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20">Por vencer</span></td>
                    <td className="px-4 py-3 text-sm text-slate-400">8 Módulos</td>
                    <td className="px-4 py-3 text-sm text-slate-400">30/07/2026</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-200">SOP_Extraccion_BHO_v2.pdf</div>
                      <div className="text-xs text-slate-500">Subido por Director (Hace 1 año)</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">SOP</td>
                    <td className="px-4 py-3"><span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2 py-1 rounded-full border border-rose-500/20">Vencido</span></td>
                    <td className="px-4 py-3 text-sm text-slate-400">45 Módulos</td>
                    <td className="px-4 py-3 text-sm text-rose-400">01/01/2026</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'tutorials':
        return (
          <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Trazabilidad y Cultivo', desc: 'Aprenda cómo llenar los formularios de siembra, cosecha y secado sin errores.' },
                  { title: 'Extracción BHO / Live Resin', desc: 'Guía para registrar purgas, recuperación de solventes y liberación Q.F.' },
                  { title: 'Regulatory y MinJusticia', desc: 'Cómo usar las plantillas de MinJusticia y reportar cupos sin espacios en blanco.' },
                  { title: 'Manejo de Inventarios', desc: 'Cómo gestionar lotes cuarentenados, aprobados y rechazados.' },
                ].map(t => (
                  <div key={t.title} className="bg-slate-900/50 p-5 rounded-2xl border border-slate-700/50 hover:border-emerald-500/30 transition-all cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                      <BookOpen className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h4 className="text-white font-medium mb-2">{t.title}</h4>
                    <p className="text-sm text-slate-400">{t.desc}</p>
                    <div className="mt-4 flex items-center text-xs text-emerald-400 font-semibold">Iniciar Tour <ArrowRight className="w-3 h-3 ml-1" /></div>
                  </div>
                ))}
             </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Brain className="w-12 h-12 text-slate-600 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Módulo en Desarrollo</h3>
            <p className="text-slate-400 max-w-md">Estamos integrando el motor de Asistencia Inteligente para esta sección. Pronto podrás usar autollenado inteligente, plantillas y auditoría avanzada.</p>
          </div>
        );
    }
  };

  return (
    <div className="pb-8">
      <ModuleTutorial
        title="Asistencia Inteligente y Memoria Empresarial"
        moduleName="Asistencia Inteligente"
        objective="Centralizar la información recurrente de la empresa para habilitar el autollenado inteligente en todos los módulos, ahorrando tiempo y evitando errores tipográficos."
        whoShouldUse="Administradores, directores técnicos y responsables de calidad."
        whenToUse="Al configurar la cuenta por primera vez o al actualizar licencias, SOPs, y datos legales de la empresa."
        requiredInformation={['Datos legales de la empresa (NIT, Razón social)', 'Listado de responsables y licencias vigentes', 'Archivos de uso frecuente (SOPs base, Logos)']}
        steps={[
          'Navega a "Memoria Empresarial" y completa los datos de la compañía.',
          'Sube los documentos transversales en "Archivos Frecuentes" (ej. certificado de cámara de comercio).',
          'En los formularios de otros módulos, utiliza el botón "Autollenar memoria" para cargar estos datos automáticamente.',
          'Revisa regularmente la pestaña "Auditoría" para ver quién ha modificado la memoria.'
        ]}
        commonMistakes={[
          'Dejar la memoria empresarial vacía, lo que obliga a los operadores a tipear la misma información repetidamente.',
          'Cargar documentos expirados en "Archivos Frecuentes".'
        ]}
        gacpGmpTips={[
          'La memoria empresarial es el corazón de la documentación estandarizada. Solo personal autorizado debe poder modificarla.',
          'Los SOPs frecuentes cargados aquí deben ser las versiones vigentes controladas.'
        ]}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-light text-white tracking-tight">Asistencia <span className="font-bold">Inteligente</span></h1>
          <p className="text-sm text-slate-400 mt-1">Gestión de memoria empresarial, autollenado y documentos frecuentes.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-slate-900/50 rounded-2xl border border-slate-700/50 p-2 space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(`/smart-assistant/${tab.id}`)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
                >
                  <div className={`p-1.5 rounded-lg ${isActive ? tab.bg : 'bg-slate-800'}`}>
                    <Icon className={`w-4 h-4 ${isActive ? tab.color : 'text-slate-500'}`} />
                  </div>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
