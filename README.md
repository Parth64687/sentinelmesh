# SentinelMesh: Cyber-Physical Wireless Threat Detection & Privacy Protection Prototype

SentinelMesh is an intelligent cyber-physical wireless security monitoring platform engineered to help individuals (hotel guests, hostel residents, travelers, employees) recognize unfamiliar and potentially suspicious RF activity (Bluetooth Low Energy & Wi-Fi) without invading user privacy or fear-mongering.

---

## 🛡️ Core Features
1. **Interactive Security Dashboard:** Real-time summary cards, live frame rate charts, risk distribution donut charts, and device snapshots.
2. **RF Observation Deck & Scanner:** Simulated dual-band radio monitoring controller (BLE Channels 37–39 & 802.11 b/g/n) with live telemetry stream.
3. **Wireless Device Explorer:** Search, filter, and sort detected wireless transmitters by risk score, last seen time, or protocol with CSV export.
4. **Trusted Whitelist Management:** Add personal laptops, smartphones, and headphones to an authorized list to prevent false alarms.
5. **Explainable Behavioral Threat Analysis:** Heuristic scoring engine (0–100) with configurable indicator weights (temporal persistence, frame density, RSSI stability, and whitelist absence).
6. **Incident Queue & Security Alerts:** Triage alerts with actionable recommendations, acknowledgement workflows, and resolution tracking.
7. **Activity History & Audit Trails:** Comprehensive event log supporting filtered CSV exports.
8. **Hardware Status Diagnostics:** Hardware specifications for ESP32-S3 and nRF52840 companion boards, battery telemetry, and actuator tests.
9. **Educational Guide & FAQ:** Demystifies BLE, Wi-Fi observation, RSSI, and unknown vs. suspicious classifications.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Launch

1. Navigate to the project directory:
   ```bash
   cd sentinelmesh
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to explore the dashboard.

4. To build for production:
   ```bash
   npm run build
   ```

---

## 📁 Project Architecture

```
sentinelmesh/
├── index.html                   # HTML Entrypoint with custom shield branding
├── package.json                 # Project dependencies & scripts
├── vite.config.ts               # Vite configuration with Tailwind CSS v4
├── src/
│   ├── main.tsx                 # React application mounting
│   ├── App.tsx                  # Root layout, tab routing & modal host
│   ├── index.css                # Custom theme variables & dark styling
│   ├── types/
│   │   └── index.ts             # TypeScript definitions and data contracts
│   ├── context/
│   │   └── SecurityContext.tsx   # Reactive state management & localStorage persistence
│   ├── utils/
│   │   ├── demoData.ts          # Realistic demonstration dataset
│   │   └── riskEngine.ts        # Explainable heuristic risk scoring model
│   ├── components/
│   │   ├── Sidebar.tsx          # Collapsible responsive left navigation
│   │   ├── TopNav.tsx           # Status indicators, alert menu, and user menu
│   │   ├── MetricCard.tsx       # Reusable telemetry statistics cards
│   │   ├── StatusBadges.tsx     # Risk, trust, severity, and RSSI indicators
│   │   └── DeviceDetailModal.tsx# Comprehensive device profile and chart modal
│   └── pages/
│       ├── LandingPage.tsx      # Project vision, architecture & limitations
│       ├── DashboardPage.tsx    # Main security operations overview
│       ├── LiveMonitoringPage.tsx# Radio scanner controls & raw telemetry log
│       ├── DeviceExplorerPage.tsx# Searchable, filterable device database
│       ├── TrustedDevicesPage.tsx# Whitelist CRUD management
│       ├── ThreatAnalysisPage.tsx# Behavioral model breakdown & weights
│       ├── AlertsPage.tsx       # Alert queue & incident triage
│       ├── ActivityHistoryPage.tsx# Audit trail & CSV export engine
│       ├── HardwareStatusPage.tsx# ESP32-S3 hardware bridge diagnostics
│       ├── SettingsPage.tsx     # Privacy manifesto & retention controls
│       └── HelpPage.tsx         # Educational guide & FAQ
```

---

## ⚖️ Scientific and Ethical Disclaimers
- **Unknown ≠ Malicious:** An unknown device is not automatically dangerous. Most unrecognized signals are passing pedestrians or ambient appliances.
- **Physical Limits:** Wireless radio signals alone cannot prove the presence of a hidden camera, tracker, or malicious actor.
- **Browser Constraints:** Web browsers cannot directly sniff raw RF spectrum without an external hardware bridge or Python companion daemon. Demonstration Mode is active by default.
