import { SecurityDevice, SecurityAlert, ActivityLog, HardwareInfo } from '../types';

export const INITIAL_DEVICES: SecurityDevice[] = [
  {
    id: 'dev-001',
    identifier: 'F4:0F:24:D3:8E:10',
    alias: 'Personal Smartphone (Pixel 8)',
    wirelessType: 'BLE',
    firstSeen: new Date(Date.now() - 3600000 * 5).toISOString(),
    lastSeen: new Date(Date.now() - 45000).toISOString(),
    rssi: -48,
    rssiHistory: [
      { time: '14:00', rssi: -52 },
      { time: '14:30', rssi: -50 },
      { time: '15:00', rssi: -48 },
      { time: '15:30', rssi: -49 },
      { time: '16:00', rssi: -48 },
    ],
    observationCount: 342,
    trustStatus: 'trusted',
    userNote: 'My own primary mobile device',
    isTrusted: true,
    riskScore: 12,
    vendorGuess: 'Google LLC',
    riskBreakdown: {
      overallScore: 12,
      riskLevel: 'Low',
      categoryReason: 'Device is recognized and marked as Trusted by user.',
      suggestedAction: 'No action required. Continuous monitoring maintained.',
      calculatedAt: new Date().toISOString(),
      indicators: [
        { name: 'Known Trusted Status', weight: 35, score: 0, reason: 'Device is explicitly on user whitelist', detected: true },
        { name: 'Consistent RSSI Gradient', weight: 20, score: 5, reason: 'Stable signal within arm reach', detected: false },
        { name: 'Randomized MAC Rotation', weight: 25, score: 15, reason: 'Standard iOS/Android privacy beaconing', detected: false },
        { name: 'Multi-Session Proximity', weight: 20, score: 10, reason: 'Expected companion movement', detected: false }
      ]
    }
  },
  {
    id: 'dev-002',
    identifier: 'A4:C1:38:12:9B:EE',
    alias: 'Hotel Suite Smart TV / Casting AP',
    wirelessType: 'Wi-Fi',
    firstSeen: new Date(Date.now() - 3600000 * 8).toISOString(),
    lastSeen: new Date(Date.now() - 120000).toISOString(),
    rssi: -62,
    rssiHistory: [
      { time: '11:00', rssi: -64 },
      { time: '12:00', rssi: -63 },
      { time: '13:00', rssi: -62 },
      { time: '14:00', rssi: -62 },
      { time: '15:00', rssi: -62 },
    ],
    observationCount: 680,
    trustStatus: 'trusted',
    userNote: 'Room 408 Samsung Tizen Gateway',
    isTrusted: true,
    riskScore: 18,
    vendorGuess: 'Samsung Electronics',
    riskBreakdown: {
      overallScore: 18,
      riskLevel: 'Low',
      categoryReason: 'Static stationary access point verified upon room check-in.',
      suggestedAction: 'Keep as trusted infrastructure device.',
      calculatedAt: new Date().toISOString(),
      indicators: [
        { name: 'Fixed Station BSSID', weight: 30, score: 10, reason: 'Stationary beacon with constant power', detected: true },
        { name: 'Persistent SSID Broadcasting', weight: 25, score: 15, reason: 'Regular 100ms beacon interval', detected: true },
        { name: 'Anomalous Probe Requests', weight: 25, score: 0, reason: 'No unprompted probe sniffing observed', detected: false },
        { name: 'High Burst Traffic', weight: 20, score: 5, reason: 'Standard multimedia telemetry', detected: false }
      ]
    }
  },
  {
    id: 'dev-003',
    identifier: '7C:2F:80:55:1A:4C',
    alias: 'Wireless ANC Headphones',
    wirelessType: 'BLE',
    firstSeen: new Date(Date.now() - 3600000 * 4).toISOString(),
    lastSeen: new Date(Date.now() - 80000).toISOString(),
    rssi: -54,
    rssiHistory: [
      { time: '12:00', rssi: -70 },
      { time: '13:00', rssi: -55 },
      { time: '14:00', rssi: -54 },
      { time: '15:00', rssi: -56 },
    ],
    observationCount: 198,
    trustStatus: 'trusted',
    userNote: 'Sony WH-1000XM5 headphones',
    isTrusted: true,
    riskScore: 15,
    vendorGuess: 'Sony Corporation',
    riskBreakdown: {
      overallScore: 15,
      riskLevel: 'Low',
      categoryReason: 'Audio peripheral with standard periodic discovery telemetry.',
      suggestedAction: 'No action required.',
      calculatedAt: new Date().toISOString(),
      indicators: [
        { name: 'Standard BLE Audio Profile', weight: 35, score: 5, reason: 'A2DP / BLE Audio advertising packets', detected: true },
        { name: 'Physical Near-Field Proximity', weight: 25, score: 10, reason: 'Strong RSSI consistent with personal use', detected: true },
        { name: 'Frequency Modulation', weight: 20, score: 5, reason: 'Standard Bluetooth adaptive hopping', detected: false },
        { name: 'Unsolicited Probes', weight: 20, score: 0, reason: 'No unauthorized scan requests', detected: false }
      ]
    }
  },
  {
    id: 'dev-004',
    identifier: '1E:88:D4:21:49:03',
    alias: '',
    wirelessType: 'BLE',
    firstSeen: new Date(Date.now() - 3600000 * 3).toISOString(),
    lastSeen: new Date(Date.now() - 30000).toISOString(),
    rssi: -72,
    rssiHistory: [
      { time: '13:00', rssi: -82 },
      { time: '13:45', rssi: -76 },
      { time: '14:30', rssi: -74 },
      { time: '15:15', rssi: -72 },
    ],
    observationCount: 142,
    trustStatus: 'suspicious',
    userNote: '',
    isTrusted: false,
    riskScore: 74,
    vendorGuess: 'Unknown Nordic Semi Chipset',
    riskBreakdown: {
      overallScore: 74,
      riskLevel: 'High',
      categoryReason: 'Unfamiliar BLE beacon observed continuously across multiple sessions with repeating payload patterns.',
      suggestedAction: 'Inspect surroundings for unfamiliar battery-powered or wall-mounted accessories. Do not panic; observation indicates signal persistence, not proof of malice.',
      calculatedAt: new Date().toISOString(),
      indicators: [
        { name: 'Persistent Unfamiliar Presence', weight: 30, score: 85, reason: 'Detected consistently over 3+ continuous hours without user whitelist confirmation', detected: true },
        { name: 'High Burst Advertising Interval', weight: 25, score: 70, reason: 'Short 200ms advertisement interval common in tracking tags or sensors', detected: true },
        { name: 'Signal Correlation / Persistence', weight: 25, score: 75, reason: 'Signal strength remained stable (-72 to -74 dBm) despite room movement', detected: true },
        { name: 'Unresolvable Identity / Anonymous PDU', weight: 20, score: 65, reason: 'Non-resolvable private MAC address with persistent manufacture data snippet', detected: true }
      ]
    }
  },
  {
    id: 'dev-005',
    identifier: '92:4B:05:EC:33:F1',
    alias: '',
    wirelessType: 'Wi-Fi',
    firstSeen: new Date(Date.now() - 3600000 * 2).toISOString(),
    lastSeen: new Date(Date.now() - 15000).toISOString(),
    rssi: -66,
    rssiHistory: [
      { time: '14:00', rssi: -78 },
      { time: '14:30', rssi: -70 },
      { time: '15:00', rssi: -67 },
      { time: '15:30', rssi: -66 },
    ],
    observationCount: 310,
    trustStatus: 'suspicious',
    userNote: '',
    isTrusted: false,
    riskScore: 68,
    vendorGuess: 'Espressif Inc. (OUI Match)',
    riskBreakdown: {
      overallScore: 68,
      riskLevel: 'High',
      categoryReason: 'Ad-hoc Wi-Fi transmitter operating on 2.4 GHz channel 6 emitting frequent probe responses without public internet gateway.',
      suggestedAction: 'Review Wi-Fi probe history. May be an unconfigured smart home appliance, IoT gadget, or embedded microcontroller module.',
      calculatedAt: new Date().toISOString(),
      indicators: [
        { name: 'Embedded IoT Microcontroller Signature', weight: 30, score: 75, reason: 'OUI matches Espressif ESP32/ESP8266 radio firmware', detected: true },
        { name: 'No Associated Gateway / Isolated BSSID', weight: 25, score: 70, reason: 'Station running in SoftAP mode with no upstream routing visible', detected: true },
        { name: 'Continuous Near Proximity', weight: 25, score: 65, reason: 'Moderate signal (-66 dBm) suggesting placement within 5-10 meters', detected: true },
        { name: 'Unknown Device Whitelist Status', weight: 20, score: 60, reason: 'Not recognized in current environment profile', detected: true }
      ]
    }
  },
  {
    id: 'dev-006',
    identifier: '34:E6:D7:AA:91:02',
    alias: '',
    wirelessType: 'Wi-Fi',
    firstSeen: new Date(Date.now() - 3600000 * 1).toISOString(),
    lastSeen: new Date(Date.now() - 600000).toISOString(),
    rssi: -84,
    rssiHistory: [
      { time: '15:00', rssi: -86 },
      { time: '15:15', rssi: -84 },
    ],
    observationCount: 28,
    trustStatus: 'unknown',
    userNote: '',
    isTrusted: false,
    riskScore: 24,
    vendorGuess: 'Apple Inc.',
    riskBreakdown: {
      overallScore: 24,
      riskLevel: 'Low',
      categoryReason: 'Low-signal transient Wi-Fi probe request from a passing pedestrian or adjacent hallway room.',
      suggestedAction: 'No action needed. Device is marked as Unknown but presents standard low-risk transient behavior.',
      calculatedAt: new Date().toISOString(),
      indicators: [
        { name: 'Transient Observation Window', weight: 35, score: 15, reason: 'Brief contact window with weak RSSI (< -80 dBm)', detected: false },
        { name: 'Standard Probe Request Pattern', weight: 25, score: 20, reason: 'Scanning for common public SSIDs', detected: true },
        { name: 'Low Repetition Factor', weight: 20, score: 10, reason: 'Under 30 frames recorded', detected: false },
        { name: 'Absence from Whitelist', weight: 20, score: 35, reason: 'Unregistered identifier', detected: true }
      ]
    }
  },
  {
    id: 'dev-007',
    identifier: '5C:F8:21:88:B4:7A',
    alias: 'Hallway Public AP (Floor 4)',
    wirelessType: 'Wi-Fi',
    firstSeen: new Date(Date.now() - 3600000 * 12).toISOString(),
    lastSeen: new Date(Date.now() - 25000).toISOString(),
    rssi: -71,
    rssiHistory: [
      { time: '11:00', rssi: -72 },
      { time: '12:00', rssi: -70 },
      { time: '13:00', rssi: -71 },
      { time: '14:00', rssi: -71 },
    ],
    observationCount: 1450,
    trustStatus: 'trusted',
    userNote: 'Hotel Guest Wi-Fi Infrastructure',
    isTrusted: true,
    riskScore: 8,
    vendorGuess: 'Cisco Systems / Meraki',
    riskBreakdown: {
      overallScore: 8,
      riskLevel: 'Low',
      categoryReason: 'Standard enterprise access point beaconing broadcast SSID.',
      suggestedAction: 'Verified network infrastructure.',
      calculatedAt: new Date().toISOString(),
      indicators: [
        { name: 'Enterprise Infrastructure Beacon', weight: 40, score: 0, reason: 'Legitimate 802.11ax access point frame', detected: true },
        { name: 'Trusted Network Association', weight: 30, score: 5, reason: 'Connected by user for internet access', detected: true },
        { name: 'Standard Beacon Interval', weight: 15, score: 10, reason: '102.4 ms DTIM interval verified', detected: true },
        { name: 'Consistent Station Positioning', weight: 15, score: 5, reason: 'Stable hallway fixture attenuation', detected: true }
      ]
    }
  },
  {
    id: 'dev-008',
    identifier: 'EE:21:40:99:A5:17',
    alias: '',
    wirelessType: 'BLE',
    firstSeen: new Date(Date.now() - 3600000 * 0.5).toISOString(),
    lastSeen: new Date(Date.now() - 10000).toISOString(),
    rssi: -79,
    rssiHistory: [
      { time: '15:30', rssi: -82 },
      { time: '15:45', rssi: -79 },
    ],
    observationCount: 45,
    trustStatus: 'unknown',
    userNote: '',
    isTrusted: false,
    riskScore: 28,
    vendorGuess: 'Fitbit / Google Wearable',
    riskBreakdown: {
      overallScore: 28,
      riskLevel: 'Low',
      categoryReason: 'Unregistered fitness wearable or health tracker passing in nearby range.',
      suggestedAction: 'No immediate concern. Standard peripheral advertisement.',
      calculatedAt: new Date().toISOString(),
      indicators: [
        { name: 'Health Peripheral UUID', weight: 30, score: 20, reason: 'Standard heart rate/pedometer service advertisement', detected: true },
        { name: 'Moderate Signal Dispersion', weight: 25, score: 25, reason: 'Varying signal strength consistent with person walking past', detected: true },
        { name: 'Unknown Device Whitelist', weight: 25, score: 35, reason: 'Device not yet saved in trusted ledger', detected: true },
        { name: 'Absence of Continuous Stalking Pattern', weight: 20, score: 15, reason: 'No prior sightings in previous day sessions', detected: false }
      ]
    }
  }
];

export const INITIAL_ALERTS: SecurityAlert[] = [
  {
    id: 'alt-001',
    timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    deviceId: 'dev-004',
    deviceIdentifier: '1E:88:D4:21:49:03',
    wirelessType: 'BLE',
    title: 'Persistent Unfamiliar BLE Device Observed',
    details: 'The same observable BLE device identifier was detected repeatedly across multiple scan sessions over the last 3 hours without being on your trusted device whitelist.',
    severity: 'high',
    status: 'active',
    suggestedAction: 'Review device history and verify whether you recognize this wireless device in your immediate vicinity. Remember: wireless signal presence does not prove malicious intent.',
    riskScore: 74
  },
  {
    id: 'alt-002',
    timestamp: new Date(Date.now() - 3600000 * 0.8).toISOString(),
    deviceId: 'dev-005',
    deviceIdentifier: '92:4B:05:EC:33:F1',
    wirelessType: 'Wi-Fi',
    title: 'Standalone Ad-Hoc IoT Wi-Fi Transmitter Detected',
    details: 'An unassociated 2.4 GHz SoftAP transmitter emitting continuous probe frames with Espressif vendor radio characteristics was observed within ~5-10 meters.',
    severity: 'medium',
    status: 'active',
    suggestedAction: 'Check if you have recently powered on a smart plug, micro-controller, or IoT gadget. If unrecognized, monitor whether it follows you between physical locations.',
    riskScore: 68
  },
  {
    id: 'alt-003',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    deviceId: 'dev-001',
    deviceIdentifier: 'F4:0F:24:D3:8E:10',
    deviceAlias: 'Personal Smartphone (Pixel 8)',
    wirelessType: 'BLE',
    title: 'High Observation Frequency (Resolved)',
    details: 'Rapid packet transmission bursts registered during initialization. Device confirmed as whitelisted personal handset.',
    severity: 'low',
    status: 'resolved',
    suggestedAction: 'Device marked as trusted by user. Alert automatically cleared.',
    riskScore: 12,
    resolvedAt: new Date(Date.now() - 3600000 * 3.8).toISOString()
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-001',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    category: 'session',
    title: 'Monitoring Session Initialized',
    details: 'SentinelMesh security engine started in Demonstration Mode. Dual-band BLE and Wi-Fi observation filters activated.',
    severity: 'info'
  },
  {
    id: 'act-002',
    timestamp: new Date(Date.now() - 3600000 * 4.9).toISOString(),
    category: 'observation',
    title: 'Device Discovered: Pixel 8 Handset',
    details: 'Observable identifier F4:0F:24:D3:8E:10 detected on BLE Channel 37 with RSSI -52 dBm.',
    deviceId: 'dev-001',
    deviceIdentifier: 'F4:0F:24:D3:8E:10',
    wirelessType: 'BLE',
    severity: 'info'
  },
  {
    id: 'act-003',
    timestamp: new Date(Date.now() - 3600000 * 4.5).toISOString(),
    category: 'trust_update',
    title: 'Device Whitelisted by User',
    details: 'Assigned friendly alias "Personal Smartphone (Pixel 8)" and updated trust classification to Trusted.',
    deviceId: 'dev-001',
    deviceIdentifier: 'F4:0F:24:D3:8E:10',
    wirelessType: 'BLE',
    severity: 'info'
  },
  {
    id: 'act-004',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    category: 'observation',
    title: 'Unfamiliar BLE Beacon Discovered',
    details: 'Observable identifier 1E:88:D4:21:49:03 detected with rapid 200ms advertisement interval.',
    deviceId: 'dev-004',
    deviceIdentifier: '1E:88:D4:21:49:03',
    wirelessType: 'BLE',
    severity: 'warning'
  },
  {
    id: 'act-005',
    timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    category: 'alert_generated',
    title: 'Security Alert Triggered: High Persistence',
    details: 'Unfamiliar BLE beacon score reached 74 (High Risk Band) due to continuous multi-hour co-location.',
    deviceId: 'dev-004',
    deviceIdentifier: '1E:88:D4:21:49:03',
    wirelessType: 'BLE',
    severity: 'alert'
  },
  {
    id: 'act-006',
    timestamp: new Date(Date.now() - 3600000 * 0.8).toISOString(),
    category: 'alert_generated',
    title: 'Security Alert Triggered: SoftAP Wi-Fi',
    details: 'Espressif transmitter 92:4B:05:EC:33:F1 classified as Suspicious (Risk Score: 68).',
    deviceId: 'dev-005',
    deviceIdentifier: '92:4B:05:EC:33:F1',
    wirelessType: 'Wi-Fi',
    severity: 'alert'
  }
];

export const INITIAL_HARDWARE_INFO: HardwareInfo = {
  connected: false,
  model: 'ESP32-S3-DevKitC-1 (Target Spec)',
  deviceId: 'ESP32-S3-WROOM-2-N32R8V',
  firmwareVersion: 'v0.9.4-alpha-stub',
  lastHeartbeat: new Date(Date.now() - 14000).toISOString(),
  batteryLevel: 88,
  bleScanningActive: true,
  wifiScanningActive: true,
  statusLed: 'Normal',
  buzzerArmed: true,
  vibrationArmed: true,
  oledDisplayActive: true,
  connectionErrors: [
    'Direct USB UART /dev/ttyUSB0 port not connected to browser.',
    'System operating in Demonstration Mode.'
  ],
  isDemo: true
};
