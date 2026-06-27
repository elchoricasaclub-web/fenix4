import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, Database, Save, Building, Users, Plus } from 'lucide-react';
import OfflineDataManager from './OfflineDataManager';
import { useAppContext } from '../contexts/AppContext';
import ModuleActionBar from './ModuleActionBar';
import { useToast } from '../contexts/ToastContext';

const Configuracion = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { logAudit } = useAppContext();
  const addToast = useToast();
  
  // Test Data State
  const [empresas, setEmpresas] = useState([{ id: 1, nombre: 'FENIX4 Org', nit: '900.123.456-7' }]);
  const [usuarios, setUsuarios] = useState([{ id: 1, nombre: 'Admin User', email: 'admin@fenix4.com', rol: 'Super Admin' }]);
  const [nuevaEmpresa, setNuevaEmpresa] = useState({ nombre: '', nit: '' });
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', email: '', rol: 'Operador' });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    logAudit('Acceso a Configuración del Sistema', 'success');
  }, [logAudit]);

  const handleSaveAll = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setHasUnsavedChanges(false);
      addToast('Configuración guardada correctamente.', 'success');
      logAudit('Configuración global actualizada', 'success');
    }, 800);
  };

  const handleCrearEmpresa = (e) => {
    e.preventDefault();
    if(nuevaEmpresa.nombre) {
      setEmpresas([...empresas, { ...nuevaEmpresa, id: Date.now() }]);
      setNuevaEmpresa({ nombre: '', nit: '' });
      setHasUnsavedChanges(true);
      logAudit('Empresa de prueba creada', 'success');
      addToast('Empresa creada correctamente', 'success');
    }
  };

  const handleCrearUsuario = (e) => {
    e.preventDefault();
    if(nuevoUsuario.nombre && nuevoUsuario.email) {
      setUsuarios([...usuarios, { ...nuevoUsuario, id: Date.now() }]);
      setNuevoUsuario({ nombre: '', email: '', rol: 'Operador' });
      setHasUnsavedChanges(true);
      logAudit('Usuario de prueba creado', 'success');
      addToast('Usuario creado correctamente', 'success');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Configuración del Sistema</h1>
        <p className="text-sm text-gray-400 mt-1">Administra tus preferencias y los ajustes globales de la plataforma.</p>
      </div>

      <div className="bg-gray-800 rounded-t-xl shadow-sm border-x border-t border-gray-700 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* Sidebar Settings */}
          <div className="w-full md:w-64 bg-gray-900 border-r border-gray-700 p-4 space-y-1">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 font-medium rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-gray-800 text-emerald-400 shadow-sm border border-gray-700' : 'text-gray-400 hover:bg-gray-800/50'}`}
            >
              <User className="w-5 h-5" />
              <span>Perfil</span>
            </button>
            <button 
              onClick={() => setActiveTab('empresas')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 font-medium rounded-lg transition-colors ${activeTab === 'empresas' ? 'bg-gray-800 text-emerald-400 shadow-sm border border-gray-700' : 'text-gray-400 hover:bg-gray-800/50'}`}
            >
              <Building className="w-5 h-5" />
              <span>Empresas (Tenants)</span>
            </button>
            <button 
              onClick={() => setActiveTab('usuarios')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 font-medium rounded-lg transition-colors ${activeTab === 'usuarios' ? 'bg-gray-800 text-emerald-400 shadow-sm border border-gray-700' : 'text-gray-400 hover:bg-gray-800/50'}`}
            >
              <Users className="w-5 h-5" />
              <span>Usuarios</span>
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 font-medium rounded-lg transition-colors ${activeTab === 'notifications' ? 'bg-gray-800 text-emerald-400 shadow-sm border border-gray-700' : 'text-gray-400 hover:bg-gray-800/50'}`}
            >
              <Bell className="w-5 h-5" />
              <span>Notificaciones</span>
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 font-medium rounded-lg transition-colors ${activeTab === 'security' ? 'bg-gray-800 text-emerald-400 shadow-sm border border-gray-700' : 'text-gray-400 hover:bg-gray-800/50'}`}
            >
              <Shield className="w-5 h-5" />
              <span>Seguridad</span>
            </button>
            <button 
              onClick={() => setActiveTab('data')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 font-medium rounded-lg transition-colors ${activeTab === 'data' ? 'bg-gray-800 text-emerald-400 shadow-sm border border-gray-700' : 'text-gray-400 hover:bg-gray-800/50'}`}
            >
              <Database className="w-5 h-5" />
              <span>Datos y Backups</span>
            </button>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-6 lg:p-8">
            {activeTab === 'profile' && (
              <>
                <h2 className="text-lg font-semibold text-gray-100 mb-6">Información del Perfil</h2>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Nombre Completo</label>
                      <input type="text" onChange={() => setHasUnsavedChanges(true)} defaultValue="Administrador Fenix4" className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Correo Electrónico</label>
                      <input type="email" onChange={() => setHasUnsavedChanges(true)} defaultValue="admin@fenix4.com" className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Rol</label>
                    <input type="text" disabled defaultValue="Super Admin" className="w-full px-4 py-2 border border-gray-700 bg-gray-900/50 rounded-lg text-gray-500 sm:text-sm" />
                  </div>

                  <hr className="my-6 border-gray-700" />

                  <h2 className="text-lg font-semibold text-gray-100 mb-4">Preferencias Regionales</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Zona Horaria</label>
                      <select onChange={() => setHasUnsavedChanges(true)} className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                        <option>América/Bogotá (GMT-5)</option>
                        <option>América/Mexico_City (GMT-6)</option>
                        <option>América/Lima (GMT-5)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Moneda</label>
                      <select onChange={() => setHasUnsavedChanges(true)} className="w-full px-4 py-2 border border-gray-600 bg-gray-900 text-gray-100 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm">
                        <option>COP ($)</option>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'empresas' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-4">Empresas (Multi-Tenant)</h2>
                
                <form onSubmit={handleCrearEmpresa} className="bg-gray-900 p-5 rounded-lg border border-gray-700 mb-6">
                  <h3 className="text-sm font-medium text-emerald-400 mb-4">Crear Empresa de Prueba</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Nombre Legal</label>
                      <input type="text" required value={nuevaEmpresa.nombre} onChange={e => setNuevaEmpresa({...nuevaEmpresa, nombre: e.target.value})} className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-gray-100 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm" placeholder="Ej. Cultivos Fenix SAS" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">NIT / Tax ID</label>
                      <input type="text" required value={nuevaEmpresa.nit} onChange={e => setNuevaEmpresa({...nuevaEmpresa, nit: e.target.value})} className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-gray-100 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm" placeholder="Ej. 900.000.000-1" />
                    </div>
                  </div>
                  <button type="submit" className="flex items-center px-4 py-2 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/50 font-medium rounded-lg transition-colors text-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Registrar Empresa
                  </button>
                </form>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-400">Empresas Registradas</h3>
                  {empresas.map(empresa => (
                    <div key={empresa.id} className="flex justify-between items-center p-3 bg-gray-800 border border-gray-700 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-200">{empresa.nombre}</p>
                        <p className="text-xs text-gray-400">NIT: {empresa.nit}</p>
                      </div>
                      <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 text-xs rounded-full border border-indigo-500/30">Activa</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'usuarios' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-100 mb-4">Gestión de Usuarios</h2>
                
                <form onSubmit={handleCrearUsuario} className="bg-gray-900 p-5 rounded-lg border border-gray-700 mb-6">
                  <h3 className="text-sm font-medium text-emerald-400 mb-4">Crear Usuario de Prueba</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Nombre Completo</label>
                      <input type="text" required value={nuevoUsuario.nombre} onChange={e => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})} className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-gray-100 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm" placeholder="Ej. Juan Pérez" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Email</label>
                      <input type="email" required value={nuevoUsuario.email} onChange={e => setNuevoUsuario({...nuevoUsuario, email: e.target.value})} className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-gray-100 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm" placeholder="juan@fenix.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Rol</label>
                      <select value={nuevoUsuario.rol} onChange={e => setNuevoUsuario({...nuevoUsuario, rol: e.target.value})} className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-gray-100 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-sm">
                        <option>Operador</option>
                        <option>Auditor Calidad</option>
                        <option>Gerente Operaciones</option>
                        <option>Super Admin</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="flex items-center px-4 py-2 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/50 font-medium rounded-lg transition-colors text-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Usuario
                  </button>
                </form>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-400">Usuarios Registrados</h3>
                  {usuarios.map(user => (
                    <div key={user.id} className="flex justify-between items-center p-3 bg-gray-800 border border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm">
                          {user.nombre.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-200 text-sm">{user.nombre}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded border border-emerald-500/20">{user.rol}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {activeTab === 'data' && (
              <>
                <h2 className="text-lg font-semibold text-gray-100 mb-6">Gestión de Datos Offline</h2>
                <OfflineDataManager />
              </>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-100 mb-6">Configuración de Notificaciones</h2>
                <p className="text-sm text-gray-400">Opciones de notificaciones (Próximamente)</p>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-100 mb-6">Seguridad</h2>
                <p className="text-sm text-gray-400">Opciones de seguridad (Próximamente)</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Acción Global */}
      <ModuleActionBar 
        onSave={handleSaveAll} 
        hasUnsavedChanges={hasUnsavedChanges} 
        isSaving={isSaving}
        backPath="/" 
      />
    </div>
  );
};

export default Configuracion;
