import React, { useState } from 'react';
import { SecurityProvider, useSecurity } from './context/SecurityContext';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { DeviceDetailModal } from './components/DeviceDetailModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { LiveMonitoringPage } from './pages/LiveMonitoringPage';
import { DeviceExplorerPage } from './pages/DeviceExplorerPage';
import { TrustedDevicesPage } from './pages/TrustedDevicesPage';
import { ThreatAnalysisPage } from './pages/ThreatAnalysisPage';
import { AlertsPage } from './pages/AlertsPage';
import { ActivityHistoryPage } from './pages/ActivityHistoryPage';
import { HardwareStatusPage } from './pages/HardwareStatusPage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpPage } from './pages/HelpPage';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const {
    alerts,
    selectedDevice,
    setSelectedDevice,
    toggleTrustStatus,
    updateDeviceAlias,
  } = useSecurity();

  const activeAlertCount = alerts.filter(a => a.status === 'active').length;

  const pageTitles: Record<string, string> = {
    landing: 'Home & Project Vision',
    dashboard: 'Security Overview Dashboard',
    monitoring: 'Live Radio Monitoring & Scanner',
    explorer: 'Wireless Device Explorer',
    trusted: 'Trusted Whitelist Management',
    threats: 'Behavioral Threat Analysis',
    alerts: 'Security Alerts & Incident Queue',
    history: 'Activity History & Audit Trails',
    hardware: 'Hardware Bridge Status',
    settings: 'System Settings & Privacy Preferences',
    help: 'Educational Guide & Help',
  };

  // If on Landing Page, display full-screen dedicated layout
  if (currentTab === 'landing') {
    return (
      <LandingPage
        onEnterDashboard={() => setCurrentTab('dashboard')}
        onExploreWorkflow={() => {
          const el = document.getElementById('workflow-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            setCurrentTab('dashboard');
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1220] flex text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Collapsible Responsive Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        activeAlertCount={activeAlertCount}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Sticky Top Navigation Bar */}
        <TopNav
          pageTitle={pageTitles[currentTab] || 'SentinelMesh Security'}
          setMobileOpen={setMobileSidebarOpen}
          setCurrentTab={setCurrentTab}
        />

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && <DashboardPage onSelectTab={setCurrentTab} />}
          {currentTab === 'monitoring' && <LiveMonitoringPage />}
          {currentTab === 'explorer' && <DeviceExplorerPage />}
          {currentTab === 'trusted' && <TrustedDevicesPage />}
          {currentTab === 'threats' && <ThreatAnalysisPage />}
          {currentTab === 'alerts' && <AlertsPage />}
          {currentTab === 'history' && <ActivityHistoryPage />}
          {currentTab === 'hardware' && <HardwareStatusPage />}
          {currentTab === 'settings' && <SettingsPage onNavigateToTrusted={() => setCurrentTab('trusted')} />}
          {currentTab === 'help' && <HelpPage />}
        </main>
      </div>

      {/* Device Detail Inspection Modal */}
      {selectedDevice && (
        <DeviceDetailModal
          device={selectedDevice}
          onClose={() => setSelectedDevice(null)}
          onToggleTrust={toggleTrustStatus}
          onUpdateAlias={updateDeviceAlias}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <SecurityProvider>
      <AppContent />
    </SecurityProvider>
  );
}
