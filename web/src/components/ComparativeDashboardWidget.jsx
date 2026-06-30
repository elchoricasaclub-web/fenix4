import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Leaf, Scale } from 'lucide-react';

export default function ComparativeDashboardWidget({ selectedPlot }) {
  // Mock historical data based on crop type
  const getHistoricalData = (cropType) => {
    switch (cropType) {
      case 'Cannabis THC':
        return { yield: 450, laborCost: 1200, waterUsage: 2500, carbon: 45 };
      case 'Cannabis CBD':
        return { yield: 500, laborCost: 1100, waterUsage: 2200, carbon: 40 };
      case 'Cáñamo Industrial':
        return { yield: 1200, laborCost: 800, waterUsage: 4000, carbon: 30 };
      default:
        return { yield: 400, laborCost: 1000, waterUsage: 2000, carbon: 35 };
    }
  };

  // Mock current batch projections/data
  const getCurrentData = (plotId) => {
    // Generate slightly varied data based on plot id to simulate actual vs historical
    const factor = plotId.includes('GH') ? 1.15 : 0.9; 
    return {
      yield: Math.round(450 * factor),
      laborCost: Math.round(1100 * factor),
      waterUsage: Math.round(2300 * factor),
      carbon: Math.round(42 * factor)
    };
  };

  const cropType = selectedPlot?.cropType || 'N/A';
  
  if (cropType === 'N/A') {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-4">
          <Scale className="w-5 h-5 mr-2 text-indigo-500" />
          Análisis Comparativo Histórico
        </h3>
        <p className="text-sm text-gray-500 italic text-center py-4">No hay datos históricos para el tipo de cultivo seleccionado.</p>
      </div>
    );
  }

  const historical = getHistoricalData(cropType);
  const current = getCurrentData(selectedPlot.id);

  const calculateChange = (currentValue, historicalValue) => {
    const diff = currentValue - historicalValue;
    const percent = Math.abs((diff / historicalValue) * 100).toFixed(1);
    return { diff, percent, isIncrease: diff > 0 };
  };

  const yieldChange = calculateChange(current.yield, historical.yield);
  const costChange = calculateChange(current.laborCost, historical.laborCost);
  const impactChange = calculateChange(current.waterUsage, historical.waterUsage); // Using water as proxy

  const getChangeColor = (isIncrease, isGoodIfIncrease) => {
    if (isIncrease === isGoodIfIncrease) return 'text-green-600 bg-green-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-1">
        <Scale className="w-5 h-5 mr-2 text-indigo-500" />
        Análisis Comparativo Histórico
      </h3>
      <p className="text-xs text-gray-500 mb-5">Vs. Promedio histórico de {cropType}</p>

      <div className="space-y-4">
        {/* Yield Comparison */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Proy. Rendimiento</p>
              <p className="text-sm font-bold text-gray-900">{current.yield} kg/m²</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getChangeColor(yieldChange.isIncrease, true)}`}>
              {yieldChange.isIncrease ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {yieldChange.percent}%
            </span>
            <p className="text-[10px] text-gray-400 mt-0.5">Histórico: {historical.yield} kg/m²</p>
          </div>
        </div>

        {/* Labor Cost Comparison */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
              <DollarSign className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Costos Laborales</p>
              <p className="text-sm font-bold text-gray-900">${current.laborCost}/ciclo</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getChangeColor(costChange.isIncrease, false)}`}>
              {costChange.isIncrease ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {costChange.percent}%
            </span>
            <p className="text-[10px] text-gray-400 mt-0.5">Histórico: ${historical.laborCost}/ciclo</p>
          </div>
        </div>

        {/* Environmental Impact Comparison */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
              <Leaf className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Uso de Agua (Impacto)</p>
              <p className="text-sm font-bold text-gray-900">{current.waterUsage} L/día</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getChangeColor(impactChange.isIncrease, false)}`}>
              {impactChange.isIncrease ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {impactChange.percent}%
            </span>
            <p className="text-[10px] text-gray-400 mt-0.5">Histórico: {historical.waterUsage} L/día</p>
          </div>
        </div>
      </div>
    </div>
  );
}
