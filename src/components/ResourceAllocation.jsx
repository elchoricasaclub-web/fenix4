import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Clock, Map, Calendar, Briefcase, CheckCircle, Search, Filter, Save, FileText, Wrench, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

export default function ResourceAllocation() {
  const [activeTab, setActiveTab] = useState('assignments'); // 'assignments' or 'hours' or 'machinery'
  const { logAudit } = useAppContext();

  useEffect(() => {
    logAudit('Acceso a módulo de Recursos Humanos y Maquinaria', 'success');
  }, [logAudit]);
  
  // Mock State
  const [assignments, setAssignments] = useState([]);
  const [hoursLog, setHoursLog] = useState([]);
  const [machineryLogs, setMachineryLogs] = useState([]);
  const [machineryList, setMachineryList] = useState([
    { id: 'm1', name: 'Tractor John Deere', maintenanceThreshold: 500, loggedHours: 495 },
    { id: 'm2', name: 'Bomba de Agua Prinz', maintenanceThreshold: 200, loggedHours: 120 },
    { id: 'm3', name: 'Cortadora', maintenanceThreshold: 100, loggedHours: 98 },
  ]);

  const [isAssigning, setIsAssigning] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [isLoggingMachinery, setIsLoggingMachinery] = useState(false);

  // Form State
  const [newAssignment, setNewAssignment] = useState({
    person: '',
    plot: 'GH-1',
    role: '',
    startDate: new Date().toISOString().split('T')[0],
  });

  const [newHours, setNewHours] = useState({
    person: '',
    plot: 'GH-1',
    date: new Date().toISOString().split('T')[0],
    hours: '',
    task: '',
  });

  const [newMachineryLog, setNewMachineryLog] = useState({
    machineId: 'm1',
    plot: 'GH-1',
    date: new Date().toISOString().split('T')[0],
    hours: '',
    task: '',
  });

  // Load Initial Data
  useEffect(() => {
    const savedAssignments = localStorage.getItem('fenix4_assignments');
    const savedHours = localStorage.getItem('fenix4_hours');
    const savedMachineryLogs = localStorage.getItem('fenix4_machinery_logs');
    const savedMachineryList = localStorage.getItem('fenix4_machinery_list');
    
    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments));
    } else {
      const defaultAssignments = [
        { id: 1, plot: 'GH-1', person: 'Carlos Gómez', role: 'Operario de Invernadero', date: '2023-11-20', status: 'Activa' },
        { id: 2, plot: 'OD-2', person: 'María Rodríguez', role: 'Especialista en Plagas', date: '2023-11-21', status: 'Activa' },
      ];
      setAssignments(defaultAssignments);
      localStorage.setItem('fenix4_assignments', JSON.stringify(defaultAssignments));
    }

    if (savedHours) {
      setHoursLog(JSON.parse(savedHours));
    } else {
      const defaultHours = [
        { id: 1, person: 'Carlos Gómez', plot: 'GH-1', date: '2023-11-20', hours: 8, task: 'Poda y mantenimiento preventivo' },
        { id: 2, person: 'María Rodríguez', plot: 'OD-2', date: '2023-11-21', hours: 4, task: 'Inspección foliar y aplicación de nutrientes' },
      ];
      setHoursLog(defaultHours);
      localStorage.setItem('fenix4_hours', JSON.stringify(defaultHours));
    }

    if (savedMachineryLogs) {
      setMachineryLogs(JSON.parse(savedMachineryLogs));
    }
    
    if (savedMachineryList) {
      setMachineryList(JSON.parse(savedMachineryList));
    }
  }, []);

  const handleSaveAssignment = (e) => {
    e.preventDefault();
    if (!newAssignment.person || !newAssignment.role) return;

    const assignmentEntry = {
      ...newAssignment,
      id: Date.now(),
      status: 'Activa',
      date: newAssignment.startDate,
    };

    const updated = [assignmentEntry, ...assignments];
    setAssignments(updated);
    localStorage.setItem('fenix4_assignments', JSON.stringify(updated));
    
    setNewAssignment({ person: '', plot: 'GH-1', role: '', startDate: new Date().toISOString().split('T')[0] });
    setIsAssigning(false);
  };

  const handleSaveHours = (e) => {
    e.preventDefault();
    if (!newHours.person || !newHours.hours || !newHours.task) return;

    const hourEntry = {
      ...newHours,
      id: Date.now(),
    };

    const updated = [hourEntry, ...hoursLog];
    setHoursLog(updated);
    localStorage.setItem('fenix4_hours', JSON.stringify(updated));
    
    setNewHours({ person: '', plot: 'GH-1', date: new Date().toISOString().split('T')[0], hours: '', task: '' });
    setIsLogging(false);
  };

  const handleSaveMachineryHours = (e) => {
    e.preventDefault();
    if (!newMachineryLog.machineId || !newMachineryLog.hours || !newMachineryLog.task) return;

    const parsedHours = parseFloat(newMachineryLog.hours);
    const hourEntry = {
      ...newMachineryLog,
      id: Date.now(),
      hours: parsedHours,
    };

    const updatedLogs = [hourEntry, ...machineryLogs];
    setMachineryLogs(updatedLogs);
    localStorage.setItem('fenix4_machinery_logs', JSON.stringify(updatedLogs));

    // Update machinery logged hours
    const updatedMachinery = machineryList.map(m => {
      if (m.id === newMachineryLog.machineId) {
        return { ...m, loggedHours: m.loggedHours + parsedHours };
      }
      return m;
    });
    setMachineryList(updatedMachinery);
    localStorage.setItem('fenix4_machinery_list', JSON.stringify(updatedMachinery));
    
    setNewMachineryLog({ machineId: 'm1', plot: 'GH-1', date: new Date().toISOString().split('T')[0], hours: '', task: '' });
    setIsLoggingMachinery(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Users className="w-6 h-6 mr-2 text-indigo-600" />
          Recursos y Personal
        </h1>
        
        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('assignments')}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'assignments' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Asignaciones
          </button>
          <button
            onClick={() => setActiveTab('hours')}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'hours' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Clock className="w-4 h-4 mr-2" />
            Control de Horas
          </button>
          <button
            onClick={() => setActiveTab('machinery')}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'machinery' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Map className="w-4 h-4 mr-2" />
            Maquinaria
          </button>
        </div>
      </div>

      {activeTab === 'assignments' && (
        <>
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center text-gray-600">
              <span className="text-sm">Gestione el personal asignado a los diferentes lotes e invernaderos.</span>
            </div>
            <button 
              onClick={() => setIsAssigning(!isAssigning)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
              {isAssigning ? <span className="flex items-center">Cancelar</span> : <><UserPlus className="w-4 h-4 mr-2" /> Nueva Asignación</>}
            </button>
          </div>

          {isAssigning && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <UserPlus className="w-5 h-5 mr-2 text-indigo-500" />
                Asignar Personal a Lote
              </h2>
              <form onSubmit={handleSaveAssignment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Empleado / Operario</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      value={newAssignment.person}
                      onChange={(e) => setNewAssignment({...newAssignment, person: e.target.value})}
                      required
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rol / Puesto</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      value={newAssignment.role}
                      onChange={(e) => setNewAssignment({...newAssignment, role: e.target.value})}
                      required
                      placeholder="Ej. Técnico Agrícola"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lote / Invernadero Asignado</label>
                    <select 
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      value={newAssignment.plot}
                      onChange={(e) => setNewAssignment({...newAssignment, plot: e.target.value})}
                    >
                      <option value="GH-1">GH-1 (Invernadero Norte)</option>
                      <option value="GH-2">GH-2 (Invernadero Sur)</option>
                      <option value="OD-1">OD-1 (Exterior Lote 1)</option>
                      <option value="OD-2">OD-2 (Exterior Lote 2)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</label>
                    <input 
                      type="date" 
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      value={newAssignment.startDate}
                      onChange={(e) => setNewAssignment({...newAssignment, startDate: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    type="submit"
                    className="flex items-center px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Asignación
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-3">
                      {assignment.person.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{assignment.person}</h3>
                      <p className="text-xs text-gray-500">{assignment.role}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                    {assignment.status}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mt-4 border-t border-gray-50 pt-4">
                  <div className="flex items-center">
                    <Map className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium">Lote:</span> <span className="ml-1 text-gray-900">{assignment.plot}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium">Desde:</span> <span className="ml-1">{assignment.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'hours' && (
        <>
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center text-gray-600">
              <span className="text-sm">Registre horas laborales por tarea para la trazabilidad de costos e inspecciones GACP.</span>
            </div>
            <button 
              onClick={() => setIsLogging(!isLogging)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
              {isLogging ? <span className="flex items-center">Cancelar</span> : <><Clock className="w-4 h-4 mr-2" /> Registrar Horas</>}
            </button>
          </div>

          {isLogging && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-indigo-500" />
                Registro de Jornada / Tarea
              </h2>
              <form onSubmit={handleSaveHours} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Personal</label>
                    <select 
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      value={newHours.person}
                      onChange={(e) => setNewHours({...newHours, person: e.target.value})}
                      required
                    >
                      <option value="">Seleccione personal...</option>
                      {assignments.map(a => <option key={a.id} value={a.person}>{a.person}</option>)}
                      <option value="Otro">Otro...</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lote / Área</label>
                    <select 
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      value={newHours.plot}
                      onChange={(e) => setNewHours({...newHours, plot: e.target.value})}
                    >
                      <option value="GH-1">GH-1</option>
                      <option value="GH-2">GH-2</option>
                      <option value="OD-1">OD-1</option>
                      <option value="OD-2">OD-2</option>
                      <option value="Área Común">Área Común / Secado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                    <input 
                      type="date" 
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      value={newHours.date}
                      onChange={(e) => setNewHours({...newHours, date: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción de Tarea (GACP)</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      value={newHours.task}
                      onChange={(e) => setNewHours({...newHours, task: e.target.value})}
                      required
                      placeholder="Ej. Cosecha manual, Poda, Aplicación de fertilizante foliar..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Horas Trabajadas</label>
                    <input 
                      type="number" 
                      step="0.5"
                      min="0.5"
                      max="24"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      value={newHours.hours}
                      onChange={(e) => setNewHours({...newHours, hours: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    type="submit"
                    className="flex items-center px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Registrar Horas
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Historial de Horas y Tareas</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium">Fecha</th>
                    <th className="p-4 font-medium">Personal</th>
                    <th className="p-4 font-medium">Lote/Área</th>
                    <th className="p-4 font-medium">Tarea (GACP)</th>
                    <th className="p-4 font-medium">Horas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {hoursLog.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500">
                        No hay registros de horas.
                      </td>
                    </tr>
                  ) : (
                    hoursLog.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 whitespace-nowrap text-gray-700">{log.date}</td>
                        <td className="p-4 font-medium text-gray-900">{log.person}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                            {log.plot}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">{log.task}</td>
                        <td className="p-4 font-bold text-gray-900">{log.hours} h</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'machinery' && (
        <>
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center text-gray-600">
              <span className="text-sm">Controle el uso de maquinaria por lote y reciba alertas de mantenimiento preventivo.</span>
            </div>
            <button 
              onClick={() => setIsLoggingMachinery(!isLoggingMachinery)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
              {isLoggingMachinery ? <span className="flex items-center">Cancelar</span> : <><Wrench className="w-4 h-4 mr-2" /> Registrar Uso de Equipo</>}
            </button>
          </div>

          {/* Maintenance Alerts Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machineryList.map(machine => {
              const hoursLeft = machine.maintenanceThreshold - machine.loggedHours;
              const isOverdue = hoursLeft <= 0;
              const isWarning = hoursLeft > 0 && hoursLeft <= 50;

              return (
                <div key={machine.id} className={`bg-white rounded-xl shadow-sm border p-5 ${isOverdue ? 'border-red-300 bg-red-50' : isWarning ? 'border-yellow-300 bg-yellow-50' : 'border-gray-100'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 flex items-center">
                      <Wrench className="w-4 h-4 mr-2 text-indigo-600" />
                      {machine.name}
                    </h3>
                    {(isOverdue || isWarning) && (
                      <AlertTriangle className={`w-5 h-5 ${isOverdue ? 'text-red-500' : 'text-yellow-500'}`} />
                    )}
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Horas Registradas:</span>
                      <span className="font-medium text-gray-900">{machine.loggedHours} h</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Límite Mantenimiento:</span>
                      <span className="font-medium text-gray-900">{machine.maintenanceThreshold} h</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200/50">
                    {isOverdue ? (
                      <p className="text-sm font-semibold text-red-600">Mantenimiento Requerido. Límite excedido.</p>
                    ) : isWarning ? (
                      <p className="text-sm font-semibold text-yellow-600">Mantenimiento próximo en {hoursLeft.toFixed(1)} h.</p>
                    ) : (
                      <p className="text-sm font-medium text-green-600">Equipo en óptimas condiciones ({hoursLeft.toFixed(1)} h restantes).</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {isLoggingMachinery && (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Wrench className="w-5 h-5 mr-2 text-indigo-500" />
                Registro de Uso de Maquinaria
              </h2>
              <form onSubmit={handleSaveMachineryHours} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Maquinaria / Equipo</label>
                    <select 
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      value={newMachineryLog.machineId}
                      onChange={(e) => setNewMachineryLog({...newMachineryLog, machineId: e.target.value})}
                      required
                    >
                      {machineryList.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lote / Área</label>
                    <select 
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      value={newMachineryLog.plot}
                      onChange={(e) => setNewMachineryLog({...newMachineryLog, plot: e.target.value})}
                    >
                      <option value="GH-1">GH-1</option>
                      <option value="GH-2">GH-2</option>
                      <option value="OD-1">OD-1</option>
                      <option value="OD-2">OD-2</option>
                      <option value="Área Común">Área Común / Bodega</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                    <input 
                      type="date" 
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      value={newMachineryLog.date}
                      onChange={(e) => setNewMachineryLog({...newMachineryLog, date: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción de Operación</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      value={newMachineryLog.task}
                      onChange={(e) => setNewMachineryLog({...newMachineryLog, task: e.target.value})}
                      required
                      placeholder="Ej. Arado de Lote Exterior, Preparación de Suelo..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Horas de Uso</label>
                    <input 
                      type="number" 
                      step="0.1"
                      min="0.1"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      value={newMachineryLog.hours}
                      onChange={(e) => setNewMachineryLog({...newMachineryLog, hours: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    type="submit"
                    className="flex items-center px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Registrar Uso
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Historial de Operación de Maquinaria</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium">Fecha</th>
                    <th className="p-4 font-medium">Equipo</th>
                    <th className="p-4 font-medium">Lote</th>
                    <th className="p-4 font-medium">Operación</th>
                    <th className="p-4 font-medium">Horas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {machineryLogs.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500">
                        No hay registros de uso de maquinaria.
                      </td>
                    </tr>
                  ) : (
                    machineryLogs.map((log) => {
                      const machine = machineryList.find(m => m.id === log.machineId);
                      return (
                        <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 whitespace-nowrap text-gray-700">{log.date}</td>
                          <td className="p-4 font-medium text-gray-900">{machine ? machine.name : log.machineId}</td>
                          <td className="p-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                              {log.plot}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600">{log.task}</td>
                          <td className="p-4 font-bold text-gray-900">{log.hours} h</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
