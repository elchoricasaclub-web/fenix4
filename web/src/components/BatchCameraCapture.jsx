import React, { useRef, useState, useCallback } from 'react';
import { Camera, X, Check, RefreshCcw, Image as ImageIcon } from 'lucide-react';

export default function BatchCameraCapture({ onPhotoCaptured, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoDataUrl, setPhotoDataUrl] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState('');

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
        setError('');
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError('No se pudo acceder a la cámara. Verifique los permisos.');
    }
  };

  React.useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    
    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    
    context.drawImage(videoRef.current, 0, 0, width, height);
    
    const dataUrl = canvasRef.current.toDataURL('image/jpeg');
    setPhotoDataUrl(dataUrl);
    setHasPhoto(true);
    stopCamera();
  };

  const retakePhoto = () => {
    setHasPhoto(false);
    setPhotoDataUrl('');
    startCamera();
  };

  const handleSave = () => {
    onPhotoCaptured(photoDataUrl);
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-90 p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl border border-gray-800 relative">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800 text-white">
          <h3 className="font-semibold flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            Capturar Evidencia
          </h3>
          <button onClick={handleClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera/Preview Area */}
        <div className="relative aspect-[3/4] bg-black flex items-center justify-center overflow-hidden">
          {error && (
            <div className="text-red-400 text-center p-4 text-sm">
              {error}
            </div>
          )}
          
          <video 
            ref={videoRef} 
            className={`w-full h-full object-cover ${hasPhoto ? 'hidden' : 'block'}`}
            playsInline
          />
          
          <canvas ref={canvasRef} className="hidden" />
          
          {hasPhoto && (
            <img 
              src={photoDataUrl} 
              alt="Captura" 
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Controls */}
        <div className="p-6 bg-gray-900 flex justify-center items-center space-x-6">
          {!hasPhoto ? (
            <button 
              onClick={takePhoto}
              disabled={!cameraActive}
              className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-4 border-gray-300 active:bg-gray-200 transition-colors disabled:opacity-50"
            >
              <div className="w-12 h-12 rounded-full border-2 border-gray-900"></div>
            </button>
          ) : (
            <>
              <button 
                onClick={retakePhoto}
                className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Retomar
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium shadow-lg shadow-indigo-900/50"
              >
                <Check className="w-4 h-4 mr-2" />
                Asociar a Lote
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
