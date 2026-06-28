import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Leaf, Calendar } from 'lucide-react';

export default function GreenhouseList() {
  const [greenhouses, setGreenhouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'greenhouses'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const greenhousesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGreenhouses(greenhousesData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching greenhouses: ", err);
      setError("Error al cargar los invernaderos.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-slate-400 p-4">Cargando invernaderos...</div>;
  }

  if (error) {
    return <div className="text-red-400 p-4">{error}</div>;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden h-full">
      <div className="border-b border-slate-800 px-6 py-4 flex items-center">
        <Leaf className="w-5 h-5 mr-3 text-emerald-500" />
        <h2 className="text-lg font-semibold text-white">Listado de Invernaderos</h2>
      </div>
      
      {greenhouses.length === 0 ? (
        <div className="p-6 text-center text-slate-400">
          No hay invernaderos registrados aún.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950/50 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Nombre</th>
                <th className="px-6 py-4 font-medium">Ubicación</th>
                <th className="px-6 py-4 font-medium">Tipo de Cultivo</th>
                <th className="px-6 py-4 font-medium">Fecha de Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {greenhouses.map((greenhouse) => (
                <tr key={greenhouse.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{greenhouse.name}</td>
                  <td className="px-6 py-4 text-slate-300">{greenhouse.location}</td>
                  <td className="px-6 py-4 text-slate-300">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-lg border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                      {greenhouse.cropType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                    {greenhouse.createdAt ? new Date(greenhouse.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
