import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AppContext = createContext();

export function AppProvider({ children }) {
  const { currentUser, loading } = useAuth() || {};
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  // Auth & Multi-Tenancy State
  const [user, setUser] = useState(null); // Will hold name, role, email, etc.
  const [currentCompany, setCurrentCompany] = useState(null); // Current Tenant
  const [availableCompanies, setAvailableCompanies] = useState([]);

  const [syncQueue, setSyncQueue] = useState([
    { id: 1, type: 'Registro Maquinaria', target: 'Tractor M1', status: 'pending', time: 'Hace 5 min' },
    { id: 2, type: 'Registro de Cumplimiento', target: 'Lote GH-1', status: 'failed', time: 'Hace 15 min' },
    { id: 3, type: 'Inspección de Calidad', target: 'Lote A-2', status: 'failed', time: 'Hace 1 hora' }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 1, user: 'Admin User', action: 'Inicio de sesión exitoso', ip: '192.168.1.100', time: 'Hace 2 mins', status: 'success' },
    { id: 2, user: 'Sistema', action: 'Backup Incremental Creado (AWS S3)', ip: 'N/A', time: 'Hace 45 mins', status: 'success' },
  ]);

  const logAudit = React.useCallback((action, status = 'success', ip = '192.168.1.100') => {
    const newLog = {
      id: Date.now(),
      user: user?.name || 'Sistema',
      action,
      ip,
      time: 'Justo ahora',
      status
    };
    setAuditLogs(prev => [newLog, ...prev].slice(0, 50));
  }, [user?.name]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (currentUser) {
      setUser({ 
        id: currentUser.uid, 
        name: currentUser.email, 
        role: 'Admin User', 
        email: currentUser.email,
        permissions: ['read:all', 'write:all', 'delete:all', 'audit:view']
      });
      const companies = [
        { id: 'c-001', name: 'PharmaCanna S.A.S.', license: 'LIC-001-2023', plan: 'Enterprise' },
        { id: 'c-002', name: 'Extracts Global', license: 'LIC-045-2024', plan: 'Pro' }
      ];
      setAvailableCompanies(companies);
      setCurrentCompany(companies[0]);
    } else {
      setUser(null);
      setCurrentCompany(null);
      setAvailableCompanies([]);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [currentUser]);

  const switchCompany = React.useCallback((companyId) => {
    const company = availableCompanies.find(c => c.id === companyId);
    if (company) {
      setCurrentCompany(company);
      setTimeout(() => logAudit(`Cambio de Tenant: ${company.name}`, 'success'), 0);
      // In a real app, we might need to fetch new permissions/data context here
    }
  }, [availableCompanies, logAudit]);

  const hasPermission = React.useCallback((permission) => {
    return user?.permissions?.includes(permission) || user?.role === 'Super Admin';
  }, [user]);

  const addToSyncQueue = React.useCallback((item) => {
    setSyncQueue(prev => [{ ...item, id: Date.now(), status: 'pending', time: 'Justo ahora' }, ...prev]);
  }, []);

  const updateSyncItemStatus = React.useCallback((id, status) => {
    setSyncQueue(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  }, []);

  const removeSyncItem = React.useCallback((id) => {
    setSyncQueue(prev => prev.filter(item => item.id !== id));
  }, []);

  const retrySyncItem = React.useCallback((id) => {
    updateSyncItemStatus(id, 'syncing');
    setTimeout(() => {
      removeSyncItem(id);
    }, 1500);
  }, [updateSyncItemStatus, removeSyncItem]);

  const syncAll = React.useCallback(() => {
    setSyncQueue(prev => prev.map(item => item.status !== 'syncing' ? { ...item, status: 'syncing' } : item));
    setTimeout(() => {
      setSyncQueue([]);
    }, 2000);
  }, []);

  const isSyncingAll = syncQueue.length > 0 && syncQueue.every(item => item.status === 'syncing');

  return (
    <AppContext.Provider value={{ 
      isOnline, 
      user, 
      currentCompany,
      availableCompanies,
      switchCompany,
      hasPermission,
      syncQueue,
      addToSyncQueue,
      updateSyncItemStatus,
      removeSyncItem,
      retrySyncItem,
      syncAll,
      isSyncingAll,
      auditLogs,
      logAudit
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
