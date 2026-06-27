import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  // Auth & Multi-Tenancy State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

    // Mock initial check for token
    const checkAuth = () => {
      // FORZAR ACCESO EN DESARROLLO
      setIsAuthenticated(true);
      setUser({ 
        id: 'u-001', 
        name: 'Admin User', 
        role: 'Super Admin', 
        email: 'admin@fenix4.com',
        permissions: ['read:all', 'write:all', 'delete:all', 'audit:view']
      });
      const companies = [
        { id: 'c-001', name: 'PharmaCanna S.A.S.', license: 'LIC-001-2023', plan: 'Enterprise' },
        { id: 'c-002', name: 'Extracts Global', license: 'LIC-045-2024', plan: 'Pro' }
      ];
      setAvailableCompanies(companies);
      setCurrentCompany(companies[0]);
      
      const storedToken = localStorage.getItem('fenix4_token');
      if (!storedToken) {
        localStorage.setItem('fenix4_token', 'mock_jwt_token_secure_string');
      }
    };
    
    checkAuth();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const login = React.useCallback((email, password) => {
    // Mock Login Logic with JWT simulation
    if (email && password) {
      localStorage.setItem('fenix4_token', 'mock_jwt_token_secure_string');
      setIsAuthenticated(true);
      setUser({ 
        id: 'u-001', 
        name: 'Admin User', 
        role: 'Super Admin', 
        email,
        permissions: ['read:all', 'write:all', 'delete:all', 'audit:view']
      });
      const companies = [
        { id: 'c-001', name: 'PharmaCanna S.A.S.', license: 'LIC-001-2023', plan: 'Enterprise' },
        { id: 'c-002', name: 'Extracts Global', license: 'LIC-045-2024', plan: 'Pro' }
      ];
      setAvailableCompanies(companies);
      setCurrentCompany(companies[0]);
      
      // Delay to avoid setting state during render from previous tick, although this is in a handler
      setTimeout(() => logAudit(`Inicio de sesión exitoso: ${email}`, 'success'), 0);
      return true;
    }
    setTimeout(() => logAudit(`Fallo de inicio de sesión: ${email}`, 'error'), 0);
    return false;
  }, [logAudit]);

  const logout = React.useCallback(() => {
    localStorage.removeItem('fenix4_token');
    setIsAuthenticated(false);
    setUser(null);
    setCurrentCompany(null);
    setAvailableCompanies([]);
    setTimeout(() => logAudit('Cierre de sesión', 'success'), 0);
  }, [logAudit]);

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
      isAuthenticated,
      user, 
      currentCompany,
      availableCompanies,
      login,
      logout,
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
