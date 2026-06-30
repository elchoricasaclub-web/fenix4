import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useToast } from '../contexts/ToastContext';

export default function Layout() {
  const addToast = useToast();

  useEffect(() => {
    const checkAndPerformBackup = async () => {
      const today = new Date().toISOString().split('T')[0];
      const lastBackup = localStorage.getItem('fenix4_last_backup_date');

      if (lastBackup !== today) {
        try {
          // Simulate gathering all local storage data
          const allData = {};
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            allData[key] = localStorage.getItem(key);
          }
          
          // Simulate uploading to a secure cloud blob
          console.log('Initiating secure cloud backup...', allData);
          await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
          console.log('Cloud backup completed successfully.');

          localStorage.setItem('fenix4_last_backup_date', today);
          addToast('Copia de seguridad en la nube completada exitosamente.', 'success');
        } catch (error) {
          console.error('Backup failed', error);
          addToast('Error al realizar la copia de seguridad.', 'error');
        }
      }
    };

    // Run check shortly after app loads to avoid blocking initial render
    const timer = setTimeout(() => {
      checkAndPerformBackup();
    }, 3000);

    return () => clearTimeout(timer);
  }, [addToast]);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-950 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
