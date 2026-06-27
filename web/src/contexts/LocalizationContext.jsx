import React, { createContext, useState, useContext, useEffect } from 'react';

const translations = {
  es: {
    // Header
    'header.dashboard': 'Panel de Control',
    'header.online': 'Conectado',
    'header.offline': 'Modo Offline (Guardando Localmente)',
    'header.search': 'Buscar...',
    
    // Sidebar
    'sidebar.dashboard': 'Dashboard',
    'sidebar.inventory': 'Invernadero',
    'sidebar.traceability': 'Trazabilidad',
    'sidebar.compliance': 'Cumplimiento',
    'sidebar.resources': 'Recursos',
    'sidebar.forecast': 'Pronóstico',
    'sidebar.sustainability': 'Sostenibilidad',
    'sidebar.settings': 'Configuración',

    // Compliance
    'compliance.title': 'Panel de Cumplimiento Normativo (GACP, GMP, Calidad)',
    'compliance.newInspection': 'Nueva Inspección',
    'compliance.exportReport': 'Exportar Reporte',
    'compliance.exportCSV': 'Exportar a CSV',
  },
  en: {
    // Header
    'header.dashboard': 'Dashboard',
    'header.online': 'Online',
    'header.offline': 'Offline Mode (Saving Locally)',
    'header.search': 'Search...',
    
    // Sidebar
    'sidebar.dashboard': 'Dashboard',
    'sidebar.inventory': 'Greenhouse',
    'sidebar.traceability': 'Traceability',
    'sidebar.compliance': 'Compliance',
    'sidebar.resources': 'Resources',
    'sidebar.forecast': 'Forecast',
    'sidebar.sustainability': 'Sustainability',
    'sidebar.settings': 'Settings',

    // Compliance
    'compliance.title': 'Regulatory Compliance Dashboard (GACP, GMP, Quality)',
    'compliance.newInspection': 'New Inspection',
    'compliance.exportReport': 'Export Report',
    'compliance.exportCSV': 'Export to CSV',
  }
};

const LocalizationContext = createContext();

export function LocalizationProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem('fenix4_lang') || 'es');

  useEffect(() => {
    localStorage.setItem('fenix4_lang', language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  return useContext(LocalizationContext);
}
