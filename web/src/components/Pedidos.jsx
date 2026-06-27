import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Plus, Package, Truck, CheckCircle } from 'lucide-react';
import ObfuscatedData from './ObfuscatedData';
import { useAppContext } from '../contexts/AppContext';

const Pedidos = () => {
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a módulo de Pedidos', 'success');
  }, [logAudit]);

  const [pedidos] = useState([
    { id: 'PED-2026-001', cliente: 'Farmacia Central', estado: 'Entregado', fecha: '2026-06-25', total: '$1,250.00', dest: 'Bogotá, DC' },
    { id: 'PED-2026-002', cliente: 'Dispensario Verde', estado: 'En Ruta', fecha: '2026-06-25', total: '$840.00', dest: 'Medellín, ANT' },
    { id: 'PED-2026-003', cliente: 'Centro Médico Sur', estado: 'Preparando', fecha: '2026-06-26', total: '$2,100.00', dest: 'Cali, VAC' },
    { id: 'PED-2026-004', cliente: 'Clínica San Juan', estado: 'Pendiente', fecha: '2026-06-27', total: '$450.00', dest: 'Barranquilla, ATL' },
  ]);

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Entregado': return 'bg-green-100 text-green-800';
      case 'En Ruta': return 'bg-blue-100 text-blue-800';
      case 'Preparando': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (estado) => {
    switch (estado) {
      case 'Entregado': return <CheckCircle className="w-4 h-4 mr-1.5" />;
      case 'En Ruta': return <Truck className="w-4 h-4 mr-1.5" />;
      default: return <Package className="w-4 h-4 mr-1.5" />;
    }
  };

  const handleNewOrder = () => {
    logAudit('Intento de creación de nuevo pedido', 'warning');
    alert('Función no disponible temporalmente por auditoría');
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h1>
          <p className="text-sm text-gray-500 mt-1">Administra y haz seguimiento a todos los pedidos activos.</p>
        </div>
        <button onClick={handleNewOrder} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm">
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Pedido
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm"
            placeholder="Buscar por ID, cliente o destino..."
          />
        </div>
        <button className="flex items-center px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-5 h-5 mr-2 text-gray-500" />
          Filtros Avanzados
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Pedido</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destino</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Est.</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pedidos.map((pedido) => (
                <tr key={pedido.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{pedido.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <ObfuscatedData value={pedido.cliente} sensitive={true} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pedido.dest}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pedido.fecha}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pedido.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(pedido.estado)}`}>
                      {getStatusIcon(pedido.estado)}
                      {pedido.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pedidos;
