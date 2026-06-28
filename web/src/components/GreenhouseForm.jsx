import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Leaf } from 'lucide-react';
import GuidedInput from './guided/GuidedInput';

export default function GreenhouseForm() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [cropType, setCropType] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !location.trim() || !cropType.trim()) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await addDoc(collection(db, 'greenhouses'), {
        name: name.trim(),
        location: location.trim(),
        cropType: cropType.trim(),
        createdAt: new Date(),
      });
      setSuccess(true);
      setName('');
      setLocation('');
      setCropType('');
      
      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error adding document: ", err);
      setError('Hubo un error al guardar los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm h-full">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-lg mr-3">
          <Leaf className="w-5 h-5 text-emerald-500" />
        </div>
        <h2 className="text-lg font-semibold text-white">Registrar Nuevo Invernadero</h2>
      </div>
      
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl mb-6 text-sm font-medium flex items-center">
          Invernadero registrado correctamente.
        </div>
      )}
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-6 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <GuidedInput
          label="Nombre del Invernadero"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: GH-Sur-1"
          isRequired={true}
          helpText="Identificador único del área de cultivo."
          exampleValue="INV-EXT-01"
          draftValue="INV-001"
          gacpGmpTip="El nombre del invernadero debe coincidir con el plano oficial aprobado para GACP."
          className="bg-slate-950 border-slate-800 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
        />
        
        <GuidedInput
          label="Ubicación"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Ej: Sector Norte"
          isRequired={true}
          helpText="Ubicación física dentro del predio."
          exampleValue="Finca La Esperanza, Lote 4"
          draftValue="Sede Principal, Zona de Expansión"
          className="bg-slate-950 border-slate-800 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
        />

        <GuidedInput
          label="Tipo de Cultivo"
          value={cropType}
          onChange={(e) => setCropType(e.target.value)}
          placeholder="Ej: Blue Dream"
          isRequired={true}
          helpText="Genética o variedad principal."
          exampleValue="Cannabis no psicoactivo (CBD)"
          draftValue="THC Dominante - Uso Médico"
          gacpGmpTip="Registrar únicamente las genéticas aprobadas en el registro ICA/entidad regulatoria."
          className="bg-slate-950 border-slate-800 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 px-4 rounded-xl transition-colors disabled:opacity-50 text-sm mt-6"
        >
          {loading ? 'Guardando...' : 'Registrar Invernadero'}
        </button>
      </form>
    </div>
  );
}
