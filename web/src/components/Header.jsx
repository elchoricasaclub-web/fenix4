import React, { useState, useEffect } from 'react';
import { Bell, User, AlertCircle, CalendarClock, CloudLightning, X, Wifi, WifiOff, RefreshCw, UploadCloud, CheckCircle, LogOut, Building, Shield } from 'lucide-react';
import { useLocalization } from '../contexts/LocalizationContext';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSyncQueue, setShowSyncQueue] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [swActive, setSwActive] = useState(false);
  const { language, setLanguage, t } = useLocalization();
  const { isOnline, user, currentCompany, availableCompanies, switchCompany, logout, syncQueue, retrySyncItem, syncAll, isSyncingAll } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      if (navigator.serviceWorker.controller) {
        setSwActive(true);
      }
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setSwActive(true);
      });
    }
  }, []);

  const syncRef = React.useRef();
  const notifRef = React.useRef();
  const userRef = React.useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (syncRef.current && !syncRef.current.contains(event.target)) {
        setShowSyncQueue(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'compliance', title: 'Auditoría GACP Pendiente', desc: 'Inspección del Lote OD-1 debe completarse en 48h.', time: 'Hace 2h', icon: CalendarClock, color: 'text-orange-500', bg: 'bg-orange-100' },
    { id: 2, type: 'weather', title: 'Alerta de Tormenta', desc: 'Precipitación severa esperada en Invernadero Sur. Asegure ventilación.', time: 'Hace 3h', icon: CloudLightning, color: 'text-red-500', bg: 'bg-red-100' },
    { id: 3, type: 'resource', title: 'Asignación Requerida', desc: 'Se requieren 2 operarios adicionales para poda en GH-2.', time: 'Hace 5h', icon: AlertCircle, color: 'text-blue-500', bg: 'bg-blue-100' },
  ]);

  const unreadCount = notifications.length;

  const handleNotificationClick = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setTimeout(() => {
      setShowNotifications(false);
    }, 3000);
  };

  useEffect(() => {
    let timeoutId;
    if (showNotifications && notifications.length === 0) {
      timeoutId = setTimeout(() => {
        setShowNotifications(false);
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [showNotifications, notifications.length]);

  useEffect(() => {
    let timeoutId;
    if (showSyncQueue && syncQueue.length === 0) {
      timeoutId = setTimeout(() => {
        setShowSyncQueue(false);
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [showSyncQueue, syncQueue.length]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="relative flex justify-between items-center py-4 pl-16 md:pl-6 pr-6 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60 z-50 shadow-sm">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-white tracking-tight">{t('header.dashboard')}</h2>
        
        <div className="ml-6 flex items-center gap-2">
          {isOnline ? (
            <div className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <Wifi className="w-3 h-3 mr-1.5" />
              {t('header.online')}
              {isSyncingAll && <RefreshCw className="w-3 h-3 ml-2 animate-spin" />}
            </div>
          ) : (
            <div className="flex items-center text-xs font-medium text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
              <WifiOff className="w-3 h-3 mr-1.5" />
              {t('header.offline')}
            </div>
          )}
          {swActive && (
            <div className="flex items-center text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20" title="Service Worker Ready">
              <CloudLightning className="w-3 h-3 mr-1.5" />
              SW Ready
            </div>
          )}
          {currentCompany && (
            <div className="flex items-center text-xs font-medium text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 ml-2">
              <Building className="w-3 h-3 mr-1.5" />
              {currentCompany.name}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 mr-2">
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-1.5 transition-colors"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
        
        <div className="relative" ref={syncRef}>
          <button 
            onClick={() => {
              setShowSyncQueue(!showSyncQueue);
              setShowNotifications(false);
              setShowUserMenu(false);
            }}
            className="text-slate-400 hover:text-slate-200 focus:outline-none relative p-2 transition-colors mr-1"
          >
            <UploadCloud className="w-5 h-5" />
            {syncQueue.length > 0 && (
              <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-amber-500 rounded-full border-2 border-slate-950">
                {syncQueue.length}
              </span>
            )}
          </button>

          {showSyncQueue && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden z-50">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                <h3 className="font-semibold text-white flex items-center">
                  <UploadCloud className="w-4 h-4 mr-2 text-slate-400" />
                  Sincronización
                </h3>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-full">{syncQueue.length} pendientes</span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {syncQueue.length > 0 ? (
                  <div className="divide-y divide-slate-800/50">
                    {syncQueue.map((item) => (
                      <div key={item.id} className="p-4 hover:bg-slate-800/50 transition-colors flex items-start gap-3">
                        <div className={`p-2 rounded-xl flex-shrink-0 border ${item.status === 'failed' ? 'bg-red-500/10 text-red-400 border-red-500/20' : item.status === 'syncing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                          {item.status === 'failed' ? <AlertCircle className="w-5 h-5" /> : item.status === 'syncing' ? <RefreshCw className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">{item.type}</p>
                          <p className="text-sm text-slate-400 mt-0.5 line-clamp-1">{item.target}</p>
                          <div className="flex justify-between items-center mt-2">
                             <p className="text-[11px] text-slate-500">{item.time}</p>
                             <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${item.status === 'failed' ? 'bg-red-500/10 text-red-400' : item.status === 'syncing' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'}`}>
                               {item.status === 'failed' ? 'Error' : item.status === 'syncing' ? 'Sync' : 'Pendiente'}
                             </span>
                          </div>
                          {item.status === 'failed' && (
                             <div className="mt-3 text-right">
                               <button onClick={() => retrySyncItem(item.id)} className="text-xs text-emerald-400 hover:text-emerald-300 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 transition-colors">Reintentar</button>
                             </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
                    <div className="p-3 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-2">
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <p className="text-slate-400 text-sm font-medium">Datos sincronizados.</p>
                  </div>
                )}
              </div>
              {syncQueue.length > 0 && (
                <div className="p-4 border-t border-slate-800 bg-slate-950/50 text-center">
                  <button 
                    onClick={syncAll}
                    disabled={!isOnline || isSyncingAll}
                    className="w-full flex items-center justify-center py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
                  >
                    {isSyncingAll ? (
                      <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Sincronizando...</>
                    ) : (
                      <><UploadCloud className="w-4 h-4 mr-2" /> Forzar Sincronización</>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowSyncQueue(false);
              setShowUserMenu(false);
            }}
            className="text-slate-400 hover:text-slate-200 focus:outline-none relative p-2 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full border-2 border-slate-950">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden z-50">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                <h3 className="font-semibold text-white">Notificaciones</h3>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">{unreadCount} nuevas</span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-slate-800/50">
                    {notifications.map((notif) => {
                      const Icon = notif.icon;
                      return (
                        <div key={notif.id} onClick={() => handleNotificationClick(notif.id)} className="p-4 hover:bg-slate-800/50 transition-colors cursor-pointer flex items-start gap-3">
                          <div className={`p-2 rounded-xl ${notif.bg.replace('100', '500/10')} flex-shrink-0 border border-${notif.color.split('-')[1]}-500/20`}>
                            <Icon className={`w-5 h-5 ${notif.color.replace('500', '400')}`} />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{notif.title}</p>
                            <p className="text-sm text-slate-400 mt-1 line-clamp-2 leading-relaxed">{notif.desc}</p>
                            <p className="text-[11px] text-slate-500 mt-2 font-medium">{notif.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    No hay notificaciones nuevas.
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-slate-800 bg-slate-950/50 text-center">
                <button 
                  onClick={() => setNotifications([])}
                  className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Marcar todas como leídas
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative ml-2" ref={userRef}>
          <button 
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
              setShowSyncQueue(false);
            }}
            className="flex items-center text-slate-300 hover:text-white focus:outline-none bg-slate-800/50 hover:bg-slate-800 p-1.5 pr-3 rounded-xl border border-slate-700/50 transition-all"
          >
            <div className="p-1.5 bg-slate-700/50 rounded-lg mr-2">
              <User className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-sm font-semibold">{user?.name || 'Admin'}</span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-64 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden z-50">
              <div className="p-5 border-b border-slate-800 bg-slate-950/50">
                <p className="font-semibold text-white text-lg">{user?.name}</p>
                <p className="text-xs text-slate-400 flex items-center mt-1.5 font-medium">
                  <Shield className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> {user?.role}
                </p>
                <p className="text-xs text-slate-500 mt-1">{user?.email}</p>
              </div>
              
              {availableCompanies?.length > 1 && (
                <div className="p-2 border-b border-slate-800">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 py-2">Empresa / Tenant</p>
                  {availableCompanies.map(company => (
                    <button
                      key={company.id}
                      onClick={() => { switchCompany(company.id); setShowUserMenu(false); }}
                      className={`w-full text-left px-3 py-2.5 text-sm rounded-xl flex items-center justify-between transition-colors ${
                        currentCompany?.id === company.id ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-800/50'
                      }`}
                    >
                      <span className="truncate font-medium flex-1">{company.name}</span>
                      {currentCompany?.id === company.id && <CheckCircle className="w-4 h-4 text-emerald-400 ml-2" />}
                    </button>
                  ))}
                </div>
              )}

              <div className="p-2">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
