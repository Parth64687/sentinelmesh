import React, { createContext, useContext, useState, useEffect } from 'react';
import { SecurityDevice, SecurityAlert, ActivityLog, HardwareInfo, MonitoringState, TrustStatus } from '../types';
import { INITIAL_DEVICES, INITIAL_ALERTS, INITIAL_ACTIVITY_LOGS, INITIAL_HARDWARE_INFO } from '../utils/demoData';
import { evaluateDeviceRisk } from '../utils/riskEngine';

interface SecurityContextType {
  devices: SecurityDevice[];
  alerts: SecurityAlert[];
  activityLogs: ActivityLog[];
  hardwareInfo: HardwareInfo;
  monitoringState: MonitoringState;
  selectedDevice: SecurityDevice | null;
  setSelectedDevice: (device: SecurityDevice | null) => void;
  // Trust Actions
  toggleTrustStatus: (deviceId: string, alias?: string, note?: string) => void;
  updateDeviceAlias: (deviceId: string, alias: string, note?: string) => void;
  addTrustedDeviceManual: (identifier: string, alias: string, wirelessType: 'BLE' | 'Wi-Fi', note?: string) => void;
  removeDeviceFromTrusted: (deviceId: string) => void;
  // Alert Actions
  acknowledgeAlert: (alertId: string) => void;
  resolveAlert: (alertId: string) => void;
  // Monitoring Controls
  toggleMonitoring: () => void;
  toggleBleMonitoring: () => void;
  toggleWifiMonitoring: () => void;
  triggerManualScanCycle: () => void;
  switchMonitoringMode: (mode: 'DEMO' | 'LIVE') => void;
  // Data Maintenance
  clearActivityLogs: () => void;
  resetAllDemoData: () => void;
  // Auth state simulation
  isAuthenticated: boolean;
  currentUser: { email: string; name: string } | null;
  loginUser: (email: string) => void;
  logoutUser: () => void;
}

const STORAGE_KEYS = {
  DEVICES: 'sentinelmesh_devices_v1',
  ALERTS: 'sentinelmesh_alerts_v1',
  LOGS: 'sentinelmesh_logs_v1',
  MONITORING: 'sentinelmesh_monitoring_v1',
  USER: 'sentinelmesh_user_v1',
};

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage if available
  const [devices, setDevices] = useState<SecurityDevice[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DEVICES);
      return saved ? JSON.parse(saved) : INITIAL_DEVICES;
    } catch {
      return INITIAL_DEVICES;
    }
  });

  const [alerts, setAlerts] = useState<SecurityAlert[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ALERTS);
      return saved ? JSON.parse(saved) : INITIAL_ALERTS;
    } catch {
      return INITIAL_ALERTS;
    }
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
    } catch {
      return INITIAL_ACTIVITY_LOGS;
    }
  });

  const [hardwareInfo, setHardwareInfo] = useState<HardwareInfo>(INITIAL_HARDWARE_INFO);

  const [monitoringState, setMonitoringState] = useState<MonitoringState>({
    isActive: true,
    bleActive: true,
    wifiActive: true,
    mode: 'DEMO',
    lastScanTime: new Date().toISOString(),
    totalScanCycles: 142,
    observationsThisSession: 48,
    liveBackendUrl: 'http://localhost:8000',
    backendConnected: false,
  });

  const [selectedDevice, setSelectedDevice] = useState<SecurityDevice | null>(null);

  // Authenticated state (Demo account enabled by default for seamless exploration)
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : { email: 'guest@sentinelmesh.local', name: 'Alex Vance (Security Lead)' };
    } catch {
      return { email: 'guest@sentinelmesh.local', name: 'Alex Vance (Security Lead)' };
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEVICES, JSON.stringify(devices));
  }, [devices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  // Periodic simulation heartbeat in Demo Mode when active
  useEffect(() => {
    if (!monitoringState.isActive) return;

    const interval = setInterval(() => {
      // Simulate passive scan cycle increment
      setMonitoringState(prev => ({
        ...prev,
        lastScanTime: new Date().toISOString(),
        totalScanCycles: prev.totalScanCycles + 1,
        observationsThisSession: prev.observationsThisSession + 1,
      }));

      // Slight natural RSSI jitter for known devices
      setDevices(prevDevices =>
        prevDevices.map(d => {
          if (Math.random() > 0.4) {
            const jitter = Math.floor(Math.random() * 5) - 2;
            const newRssi = Math.min(-30, Math.max(-95, d.rssi + jitter));
            return {
              ...d,
              rssi: newRssi,
              lastSeen: new Date().toISOString(),
              observationCount: d.observationCount + 1,
            };
          }
          return d;
        })
      );
    }, 15000);

    return () => clearInterval(interval);
  }, [monitoringState.isActive]);

  const toggleTrustStatus = (deviceId: string, alias?: string, note?: string) => {
    setDevices(prev =>
      prev.map(dev => {
        if (dev.id === deviceId) {
          const nextIsTrusted = !dev.isTrusted;
          const nextStatus: TrustStatus = nextIsTrusted ? 'trusted' : 'unknown';

          // Recalculate risk breakdown
          const updatedBreakdown = evaluateDeviceRisk({
            isTrusted: nextIsTrusted,
            wirelessType: dev.wirelessType,
            observationCount: dev.observationCount,
            durationMinutes: 120,
            rssiVariance: 4.2,
            vendor: dev.vendorGuess,
          });

          // Log activity
          const logEntry: ActivityLog = {
            id: `act-${Date.now()}`,
            timestamp: new Date().toISOString(),
            category: 'trust_update',
            title: nextIsTrusted ? 'Device Added to Trusted List' : 'Device Marked as Unknown',
            details: `Device ${dev.identifier} (${alias || dev.alias || 'No alias'}) was ${nextIsTrusted ? 'whitelisted' : 'removed from trusted whitelist'}.`,
            deviceId: dev.id,
            deviceIdentifier: dev.identifier,
            wirelessType: dev.wirelessType,
            severity: 'info',
          };
          setActivityLogs(old => [logEntry, ...old]);

          return {
            ...dev,
            isTrusted: nextIsTrusted,
            trustStatus: nextStatus,
            alias: alias !== undefined ? alias : dev.alias,
            userNote: note !== undefined ? note : dev.userNote,
            riskScore: updatedBreakdown.overallScore,
            riskBreakdown: updatedBreakdown,
          };
        }
        return dev;
      })
    );
  };

  const updateDeviceAlias = (deviceId: string, alias: string, note?: string) => {
    setDevices(prev =>
      prev.map(dev => {
        if (dev.id === deviceId) {
          return {
            ...dev,
            alias,
            userNote: note !== undefined ? note : dev.userNote,
          };
        }
        return dev;
      })
    );
  };

  const addTrustedDeviceManual = (identifier: string, alias: string, wirelessType: 'BLE' | 'Wi-Fi', note?: string) => {
    const existing = devices.find(d => d.identifier.toLowerCase() === identifier.toLowerCase());
    if (existing) {
      toggleTrustStatus(existing.id, alias, note);
      return;
    }

    const newDevice: SecurityDevice = {
      id: `dev-${Date.now()}`,
      identifier,
      alias,
      wirelessType,
      firstSeen: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
      rssi: -50,
      rssiHistory: [{ time: 'Now', rssi: -50 }],
      observationCount: 1,
      trustStatus: 'trusted',
      userNote: note || 'Manually added pre-trusted hardware',
      isTrusted: true,
      riskScore: 10,
      riskBreakdown: {
        overallScore: 10,
        riskLevel: 'Low',
        categoryReason: 'Manually pre-authorized by user.',
        suggestedAction: 'No action required.',
        calculatedAt: new Date().toISOString(),
        indicators: [
          { name: 'Manual User Authorization', weight: 40, score: 0, reason: 'Explicit entry in trusted registry', detected: true }
        ]
      }
    };

    setDevices(prev => [newDevice, ...prev]);

    const logEntry: ActivityLog = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      category: 'trust_update',
      title: 'Manual Trusted Device Registered',
      details: `Added "${alias}" (${identifier}) to authorized whitelist.`,
      deviceIdentifier: identifier,
      wirelessType,
      severity: 'info',
    };
    setActivityLogs(old => [logEntry, ...old]);
  };

  const removeDeviceFromTrusted = (deviceId: string) => {
    toggleTrustStatus(deviceId);
  };

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev =>
      prev.map(a => (a.id === alertId ? { ...a, status: 'acknowledged', acknowledgedAt: new Date().toISOString() } : a))
    );
    const target = alerts.find(a => a.id === alertId);
    if (target) {
      setActivityLogs(prev => [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString(),
          category: 'alert_action',
          title: 'Alert Acknowledged',
          details: `User acknowledged alert: "${target.title}" for device ${target.deviceIdentifier}.`,
          deviceIdentifier: target.deviceIdentifier,
          wirelessType: target.wirelessType,
          severity: 'info',
        },
        ...prev,
      ]);
    }
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev =>
      prev.map(a => (a.id === alertId ? { ...a, status: 'resolved', resolvedAt: new Date().toISOString() } : a))
    );
    const target = alerts.find(a => a.id === alertId);
    if (target) {
      setActivityLogs(prev => [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString(),
          category: 'alert_action',
          title: 'Alert Resolved',
          details: `Alert marked as resolved: "${target.title}"`,
          deviceIdentifier: target.deviceIdentifier,
          wirelessType: target.wirelessType,
          severity: 'info',
        },
        ...prev,
      ]);
    }
  };

  const toggleMonitoring = () => {
    setMonitoringState(prev => {
      const nextActive = !prev.isActive;
      setActivityLogs(old => [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString(),
          category: 'session',
          title: nextActive ? 'Monitoring Started' : 'Monitoring Stopped',
          details: nextActive
            ? 'Radio discovery channels active. Scanning for BLE and Wi-Fi frames.'
            : 'Monitoring paused by operator.',
          severity: 'info',
        },
        ...old,
      ]);
      return { ...prev, isActive: nextActive };
    });
  };

  const toggleBleMonitoring = () => {
    setMonitoringState(prev => ({ ...prev, bleActive: !prev.bleActive }));
  };

  const toggleWifiMonitoring = () => {
    setMonitoringState(prev => ({ ...prev, wifiActive: !prev.wifiActive }));
  };

  const triggerManualScanCycle = () => {
    setMonitoringState(prev => ({
      ...prev,
      lastScanTime: new Date().toISOString(),
      totalScanCycles: prev.totalScanCycles + 1,
      observationsThisSession: prev.observationsThisSession + 3,
    }));
    setActivityLogs(old => [
      {
        id: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
        category: 'observation',
        title: 'Manual Scan Completed',
        details: 'Dispatched on-demand radio sweep across 2.4 GHz channels 1-13 and BLE channels 37-39.',
        severity: 'info',
      },
      ...old,
    ]);
  };

  const switchMonitoringMode = (mode: 'DEMO' | 'LIVE') => {
    setMonitoringState(prev => ({ ...prev, mode }));
  };

  const clearActivityLogs = () => {
    setActivityLogs([]);
  };

  const resetAllDemoData = () => {
    setDevices(INITIAL_DEVICES);
    setAlerts(INITIAL_ALERTS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setHardwareInfo(INITIAL_HARDWARE_INFO);
    localStorage.removeItem(STORAGE_KEYS.DEVICES);
    localStorage.removeItem(STORAGE_KEYS.ALERTS);
    localStorage.removeItem(STORAGE_KEYS.LOGS);
  };

  const loginUser = (email: string) => {
    const user = { email, name: email.split('@')[0] || 'Security Operator' };
    setCurrentUser(user);
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  return (
    <SecurityContext.Provider
      value={{
        devices,
        alerts,
        activityLogs,
        hardwareInfo,
        monitoringState,
        selectedDevice,
        setSelectedDevice,
        toggleTrustStatus,
        updateDeviceAlias,
        addTrustedDeviceManual,
        removeDeviceFromTrusted,
        acknowledgeAlert,
        resolveAlert,
        toggleMonitoring,
        toggleBleMonitoring,
        toggleWifiMonitoring,
        triggerManualScanCycle,
        switchMonitoringMode,
        clearActivityLogs,
        resetAllDemoData,
        isAuthenticated: !!currentUser,
        currentUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
