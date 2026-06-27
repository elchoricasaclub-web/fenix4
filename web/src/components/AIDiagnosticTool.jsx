import React, { useState, useRef } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle, Loader2, Save, FileText, Key } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function AIDiagnosticTool({ selectedPlot }) {
  const [image, setImage] = useState(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({
          file,
          preview: reader.result,
        });
        setAnalysis(null);
        setSaved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      setError('Por favor sube una imagen primero.');
      return;
    }
    if (!apiKey) {
      setError('Por favor ingresa tu API Key de Gemini.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const base64Data = image.preview.split(',')[1];
      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: image.file.type,
        },
      };

      const prompt = `Actúa como un experto agrónomo. Analiza esta imagen de una planta de cultivo del lote ${selectedPlot?.id || ''}. Identifica si hay alguna enfermedad común, deficiencia de nutrientes, plaga, o si está sana. Responde con un diagnóstico muy estructurado en 3 viñetas cortas: 1. Estado General, 2. Problemas Detectados, 3. Recomendación de Acción GACP.`;

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();
      
      setAnalysis(text);
      localStorage.setItem('gemini_api_key', apiKey);
    } catch (err) {
      console.error(err);
      setError('Error al analizar la imagen. Verifica tu API Key.');
    } finally {
      setLoading(false);
    }
  };

  const saveToLogs = () => {
    if (!analysis) return;
    
    const newLog = {
      id: Date.now(),
      date: new Date().toISOString(),
      module: 'Calidad',
      action: `Inspección AI - Lote: ${selectedPlot?.id || 'Desconocido'}`,
      user: 'Diagnóstico IA',
      notes: analysis.substring(0, 150) + '...'
    };
    
    const existingLogs = JSON.parse(localStorage.getItem('fenix2_audit_logs') || '[]');
    localStorage.setItem('fenix2_audit_logs', JSON.stringify([newLog, ...existingLogs]));
    setSaved(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div className="p-4 border-b border-gray-100 bg-indigo-50 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-indigo-900 flex items-center">
          <Camera className="w-5 h-5 mr-2 text-indigo-600" />
          Diagnóstico AI de Cultivo
        </h3>
      </div>
      
      <div className="p-5 space-y-4">
        {/* API Key Input */}
        <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
          <Key className="w-4 h-4 text-gray-500" />
          <input 
            type="password"
            placeholder="Gemini API Key"
            className="bg-transparent border-none outline-none text-sm w-full focus:ring-0 text-gray-700"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        {/* Image Upload Area */}
        <div 
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {image ? (
            <img src={image.preview} alt="Preview" className="max-h-48 rounded-lg object-contain mb-3" />
          ) : (
            <>
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-gray-700">Haz clic para subir una foto de la planta</p>
              <p className="text-xs text-gray-500 mt-1">Soporta JPG, PNG</p>
            </>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-start">
            <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <button 
          onClick={handleAnalyze}
          disabled={loading || !image}
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-sm"
        >
          {loading ? (
            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analizando imagen...</>
          ) : (
            'Analizar con Gemini AI'
          )}
        </button>

        {analysis && (
          <div className="mt-4 border border-indigo-100 bg-indigo-50/50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-indigo-900 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-1.5 text-indigo-600" /> Resultados del Diagnóstico
            </h4>
            <div className="text-sm text-gray-700 whitespace-pre-line space-y-2">
              {analysis}
            </div>
            
            <button 
              onClick={saveToLogs}
              disabled={saved}
              className={`mt-4 w-full py-2 flex items-center justify-center rounded-lg font-medium text-sm transition-colors ${
                saved ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              {saved ? (
                <><CheckCircle className="w-4 h-4 mr-2" /> Guardado en Bitácora</>
              ) : (
                <><Save className="w-4 h-4 mr-2 text-gray-500" /> Registrar en Monitoreo (GACP)</>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
