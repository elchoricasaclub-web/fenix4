import React from 'react';
import { MapPin } from 'lucide-react';

export default function GeoMapVisualization({ plots, selectedPlot, onSelectPlot }) {
  // SVG viewBox size
  const width = 800;
  const height = 500;

  return (
    <div className="relative w-full overflow-x-auto bg-gray-50 rounded-xl border border-gray-200">
      <div className="min-w-[600px] p-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto drop-shadow-sm">
          {/* Base Facility Background */}
          <rect x="50" y="50" width={width - 100} height={height - 100} fill="#e5e7eb" rx="15" />
          
          {/* Grid Lines */}
          {Array.from({ length: 15 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={50 + i * ((width - 100) / 14)}
              y1="50"
              x2={50 + i * ((width - 100) / 14)}
              y2={height - 50}
              stroke="#d1d5db"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="50"
              y1={50 + i * ((height - 100) / 9)}
              x2={width - 50}
              y2={50 + i * ((height - 100) / 9)}
              stroke="#d1d5db"
              strokeWidth="1"
            />
          ))}

          {/* Zones */}
          <rect x="70" y="70" width="300" height="150" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,5" rx="8" />
          <text x="220" y="145" textAnchor="middle" fill="#6b7280" fontSize="24" fontWeight="bold" opacity="0.5">Zona Invernaderos</text>
          
          <rect x="400" y="70" width="330" height="360" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,5" rx="8" />
          <text x="565" y="250" textAnchor="middle" fill="#6b7280" fontSize="24" fontWeight="bold" opacity="0.5">Zona Exterior</text>

          {/* Render Plots */}
          {plots.map((plot) => {
            const isSelected = selectedPlot?.id === plot.id;
            
            // Map coordinates from 0-100 percentage to SVG space
            // Adding a small bounding box offset
            const cx = 50 + (plot.coordinates.x / 100) * (width - 100);
            const cy = 50 + (plot.coordinates.y / 100) * (height - 100);

            // Using Tailwind colors roughly translated to hex for SVG
            const colors = {
              'bg-purple-400': '#a78bfa',
              'bg-green-400': '#4ade80',
              'bg-yellow-400': '#facc15',
              'bg-emerald-300': '#6ee7b7',
              'bg-gray-200': '#e5e7eb'
            };
            const fill = colors[plot.color] || '#cbd5e1';
            
            const strokeColors = {
              'border-purple-600': '#7c3aed',
              'border-green-600': '#16a34a',
              'border-yellow-600': '#ca8a04',
              'border-emerald-500': '#10b981',
              'border-gray-400': '#9ca3af'
            };
            const stroke = strokeColors[plot.border] || '#64748b';

            return (
              <g 
                key={plot.id} 
                className="cursor-pointer transition-transform duration-300 ease-in-out hover:opacity-80"
                onClick={() => onSelectPlot(plot)}
                style={{ transformOrigin: `${cx}px ${cy}px`, transform: isSelected ? 'scale(1.15)' : 'scale(1)' }}
              >
                {isSelected && (
                  <circle cx={cx} cy={cy} r="28" fill="none" stroke="#60a5fa" strokeWidth="4" className="animate-pulse" />
                )}
                
                <circle 
                  cx={cx} 
                  cy={cy} 
                  r="20" 
                  fill={fill} 
                  stroke={stroke} 
                  strokeWidth="3"
                  filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.2))"
                />
                
                {/* Marker Pin Icon equivalent using path */}
                <path 
                  d={`M${cx},${cy - 8} c-3.3,0 -6,2.7 -6,6 c0,4.5 6,10 6,10 c0,0 6,-5.5 6,-10 C${cx + 6},${cy - 5.3} ${cx + 3.3},${cy - 8} ${cx},${cy - 8} z`}
                  fill="white"
                />
                <circle cx={cx} cy={cy - 2} r="2" fill={stroke} />

                <rect x={cx - 24} y={cy + 25} width="48" height="18" rx="4" fill="white" stroke="#d1d5db" />
                <text x={cx} y={cy + 37} textAnchor="middle" fill="#374151" fontSize="10" fontWeight="bold">{plot.id}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded shadow text-xs text-gray-600 pointer-events-none">
        Mapa Geo-Grid: Instalaciones Centrales
      </div>
    </div>
  );
}
