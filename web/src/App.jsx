import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Pedidos from './components/Pedidos';
import Rutas from './components/Rutas';
import Configuracion from './components/Configuracion';
import Inventory from './components/Inventory';
import Traceability from './components/Traceability';
import Compliance from './components/Compliance';
import ComplianceCheck from './components/ComplianceCheck';
import ResourceAllocation from './components/ResourceAllocation';
import YieldForecasting from './components/YieldForecasting';
import SustainabilityDashboard from './components/SustainabilityDashboard';
import AIDiagnosticView from './components/AIDiagnosticView';
import ExtractionSuite from './components/ExtractionSuite';
import GACPSuite from './components/GACPSuite';
import GACPDynamicModule from './components/GACPDynamicModule';
import RegulatorySuite from './components/RegulatorySuite';
import RegulatoryDynamicModule from './components/RegulatoryDynamicModule';
import CorporateSaasCommandCenter from './modules/corporate-saas/CorporateSaasCommandCenter';
import MarketBenchmarkCenter from './modules/market-benchmark/MarketBenchmarkCenter';
import ExecutiveReportsCenter from './modules/corporate-saas/ExecutiveReportsCenter';
import SecurityDashboard from './components/SecurityDashboard';
import SmartAssistantSuite from './components/SmartAssistantSuite';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AuthTimeout from './components/AuthTimeout';
import { ToastProvider } from './contexts/ToastContext';
import { AppProvider } from './contexts/AppContext';

function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <HashRouter>
          <AuthTimeout />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="pedidos" element={<Pedidos />} />
              <Route path="rutas" element={<Rutas />} />
              <Route path="configuracion" element={<Configuracion />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="traceability" element={<Traceability />} />
              <Route path="compliance" element={<Compliance />} />
              <Route path="compliance-check" element={<ComplianceCheck />} />
              <Route path="resources" element={<ResourceAllocation />} />
              <Route path="forecasting" element={<YieldForecasting />} />
              <Route path="sustainability" element={<SustainabilityDashboard />} />
              <Route path="ai-diagnostic" element={<AIDiagnosticView />} />
              <Route path="extraction" element={<ExtractionSuite />} />
              <Route path="extraction/:moduleId" element={<ExtractionSuite />} />
              
              {/* Suites & Command Centers */}
              <Route path="smart-assistant" element={<SmartAssistantSuite />} />
              <Route path="smart-assistant/:moduleType" element={<SmartAssistantSuite />} />
              
              <Route path="corporate-saas" element={<CorporateSaasCommandCenter />} />
              <Route path="market-benchmark" element={<MarketBenchmarkCenter />} />
              <Route path="executive-reports" element={<ExecutiveReportsCenter />} />
              <Route path="security" element={<SecurityDashboard />} />
              
              <Route path="gacp-suite" element={<GACPSuite />} />
              <Route path="gacp-suite/:moduleId" element={<GACPDynamicModule />} />
              
              <Route path="regulatory-suite" element={<RegulatorySuite />} />
              <Route path="regulatory-suite/:moduleId" element={<RegulatoryDynamicModule />} />
              
              {/* Redirigir cualquier ruta rota al dashboard */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </ToastProvider>
    </AppProvider>
  );
}

export default App;
