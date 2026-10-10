import React, { useState } from 'react';
import { useSecurity } from '../context/SecurityContext';
import { 
  Server, Cpu, Battery, Wifi, Bluetooth, AlertCircle, 
  RefreshCw, CheckCircle2, Zap, Radio, Sliders, Volume2, Shield 
} from 'lucide-react';

export const HardwareStatusPage: React.FC = () => {
  const { hardwareInfo } = useSecurity();

  // Demonstration interactive peripheral toggle simulations
  const [buzzerArmed, setBuzzerArmed] = useState(hardwareInfo.buzzerArmed);
  const [vibrationArmed, setVibrationArmed] = useState(hardwareInfo.vibrationArmed);
  const [ledStatus, setLedStatus] = useState(hardwareInfo.statusLed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Server className="w-5 h-5 text-sky-400" />
          Cyber-Physical Hardware Bridge Architecture
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Telemetry interface and diagnostic specification for physical embedded monitoring hardware
        </p>
      </div>

      {/* Honest Scientific Disclosure Banner */}
      <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/30 text-xs space-y-2">
        <div className="flex items-center gap-2 text-sky-400 font-bold">
          <AlertCircle className="w-4 h-4" />
          Hardware Integration Disclosure:
        </div>
        <p className="text-slate-300 leading-relaxed">
          Physical hardware is currently <strong>simulated in Demonstration Mode</strong>. 
          No deceptive battery levels or fake USB serial connections are represented as authentic physical readings. 
          Below is the functional specification and hardware peripheral configuration for the upcoming physical prototype.
        </p>
      </div>

      {/* Hardware Spec Diagnostic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Connection Status */}
        <div className="p-4 rounded-xl bg-[#172235] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Link Status</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          </div>
          <div className="text-base font-bold text-amber-300">DEMO EMULATION</div>
          <p className="text-[11px] text-slate-500">UART bridge awaiting physical USB-CDC endpoint</p>
        </div>

        {/* Microcontroller Target */}
        <div className="p-4 rounded-xl bg-[#172235] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">MCU Platform</span>
            <Cpu className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-sm font-bold text-slate-200">ESP32-S3 (Xtensa LX7)</div>
          <p className="text-[11px] text-slate-500">240 MHz Dual Core • 512KB SRAM • Wi-Fi/BLE</p>
        </div>

        {/* Battery Telemetry */}
        <div className="p-4 rounded-xl bg-[#172235] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Battery Pack (Simulated)</span>
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-lg font-bold font-mono text-emerald-300">{hardwareInfo.batteryLevel}% (3.88V)</div>
          <p className="text-[11px] text-slate-500">1200mAh 1S LiPo via onboard TP4056 IC</p>
        </div>

        {/* Firmware Revision */}
        <div className="p-4 rounded-xl bg-[#172235] border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Firmware Spec</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-sky-400">
              v0.9.4
            </span>
          </div>
          <div className="text-xs font-mono text-slate-300">ESP-IDF v5.2 FreeRTOS</div>
          <p className="text-[11px] text-slate-500">BLE Sniffer + 802.11 Promiscuous filter</p>
        </div>
      </div>

      {/* Planned Physical Components Architecture Breakdown */}
      <div className="p-6 rounded-xl bg-[#172235] border border-slate-800 space-y-5">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Zap className="w-4 h-4 text-sky-400" />
          Hardware Subsystems & Physical Actuators
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* OLED Screen */}
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200">1.3" OLED Display (I2C)</span>
              <span className="text-[10px] font-mono text-emerald-400">Ready</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              SSD1306 / SH1106 monochrome display showing nearby device count, highest RSSI indicator, and standalone risk summary for screen-free portability.
            </p>
          </div>

          {/* Status LEDs & Haptics */}
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200">RGB NeoPixel & Vibration</span>
              <span className="text-[10px] font-mono text-emerald-400">Ready</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              WS2812B addressable RGB LED indicating green (clean), yellow (moderate), and red (elevated alert), paired with a 3V ERM haptic disc motor.
            </p>
          </div>

          {/* Audible Piezo Buzzer */}
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-200">Piezo Alarm Buzzer</span>
              <span className="text-[10px] font-mono text-emerald-400">Ready</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              PWM frequency driven buzzer for urgent physical proximity chirps when an unrecognized transmitter breaches -50 dBm distance thresholds.
            </p>
          </div>
        </div>

        {/* Interactive Actuator Test Controls (Prototype Demonstration) */}
        <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
            Peripheral Actuator Diagnostics (Demo Sandbox)
          </span>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Buzzer toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={buzzerArmed}
                onChange={e => setBuzzerArmed(e.target.checked)}
                className="rounded accent-sky-500"
              />
              <span className="text-slate-300">Audible Buzzer Armed</span>
            </label>

            {/* Vibration toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={vibrationArmed}
                onChange={e => setVibrationArmed(e.target.checked)}
                className="rounded accent-emerald-500"
              />
              <span className="text-slate-300">Haptic Vibration Armed</span>
            </label>

            {/* Status LED Simulation */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-slate-400">Simulated LED State:</span>
              <select
                value={ledStatus}
                onChange={e => setLedStatus(e.target.value as any)}
                className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-slate-200"
              >
                <option value="Normal">Normal (Green)</option>
                <option value="Alert">Alert (Red)</option>
                <option value="Off">Deactivated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Backend Integration Architecture & Modular Python Bleak Adapter */}
      <div className="p-6 rounded-xl bg-[#172235] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-400" />
          Modular Python / FastAPI Live Bridge Architecture
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          For real-world physical sniffing, SentinelMesh is architected with a decoupled REST / WebSocket backend. 
          When deployed on Linux/macOS or a Raspberry Pi, the backend utilizes <code>Bleak</code> for async Bluetooth Low Energy scans and platform-appropriate raw Wi-Fi sockets.
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
          <span className="text-slate-500"># Example Python Bleak + FastAPI Bridge Endpoint</span>
          <br />
          <span className="text-purple-400">from</span> bleak <span className="text-purple-400">import</span> BleakScanner
          <br />
          <span className="text-purple-400">from</span> fastapi <span className="text-purple-400">import</span> FastAPI
          <br />
          <br />
          app = FastAPI()
          <br />
          <br />
          <span className="text-sky-400">@app.get</span>(<span className="text-emerald-300">"/api/monitoring/ble/scan"</span>)
          <br />
          <span className="text-purple-400">async def</span> <span className="text-blue-400">scan_ble_peripherals</span>():
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;devices = <span className="text-purple-400">await</span> BleakScanner.discover(timeout=5.0)
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> [{`{"address": d.address, "rssi": d.rssi, "name": d.name}`} <span className="text-purple-400">for</span> d <span className="text-purple-400">in</span> devices]
        </div>
      </div>
    </div>
  );
};
