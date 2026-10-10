export type WirelessType = 'BLE' | 'Wi-Fi';
export type TrustStatus = 'trusted' | 'unknown' | 'suspicious';
export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Very High';
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type AlertStatus = 'active' | 'acknowledged' | 'resolved';

export interface DeviceObservation {
  id: string; // e.g. "obs-101"
  timestamp: string; // ISO string
  rssi: number; // dBm e.g. -68
  frequency?: string; // e.g. "2.4 GHz" or "5 GHz"
  channel?: number;
}

export interface BehavioralIndicator {
  name: string;
  weight: number;
  score: number; // 0 to 100
  reason: string;
  detected: boolean;
}

export interface DeviceRiskBreakdown {
  overallScore: number; // 0 to 100
  riskLevel: RiskLevel;
  categoryReason: string;
  suggestedAction: string;
  calculatedAt: string;
  indicators: BehavioralIndicator[];
}

export interface SecurityDevice {
  id: string; // Internal unique ID
  identifier: string; // MAC or synthetic anonymized ID e.g., "7A:B3:9F:80:2D:11"
  alias?: string; // Friendly name e.g. "Parth's Phone"
  wirelessType: WirelessType;
  firstSeen: string; // ISO
  lastSeen: string; // ISO
  rssi: number; // Latest RSSI in dBm
  rssiHistory: { time: string; rssi: number }[];
  observationCount: number;
  trustStatus: TrustStatus;
  userNote?: string;
  isTrusted: boolean;
  riskScore: number; // 0-100
  riskBreakdown: DeviceRiskBreakdown;
  vendorGuess?: string; // e.g. "Apple Inc. (Estimated OUI)" or "Unknown Chipset"
  txPower?: number;
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  deviceId: string;
  deviceIdentifier: string;
  deviceAlias?: string;
  wirelessType: WirelessType;
  title: string;
  details: string;
  severity: AlertSeverity;
  status: AlertStatus;
  suggestedAction: string;
  riskScore: number;
  acknowledgedAt?: string;
  resolvedAt?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  category: 'observation' | 'trust_update' | 'alert_generated' | 'alert_action' | 'session' | 'system';
  title: string;
  details: string;
  deviceId?: string;
  deviceIdentifier?: string;
  wirelessType?: WirelessType;
  severity?: 'info' | 'warning' | 'alert';
}

export interface HardwareInfo {
  connected: boolean;
  model: string;
  deviceId: string;
  firmwareVersion: string;
  lastHeartbeat: string;
  batteryLevel: number; // 0-100%
  bleScanningActive: boolean;
  wifiScanningActive: boolean;
  statusLed: 'Normal' | 'Alert' | 'Off';
  buzzerArmed: boolean;
  vibrationArmed: boolean;
  oledDisplayActive: boolean;
  connectionErrors: string[];
  isDemo: boolean;
}

export interface MonitoringState {
  isActive: boolean;
  bleActive: boolean;
  wifiActive: boolean;
  mode: 'DEMO' | 'LIVE';
  lastScanTime: string | null;
  totalScanCycles: number;
  observationsThisSession: number;
  liveBackendUrl: string;
  backendConnected: boolean;
}
