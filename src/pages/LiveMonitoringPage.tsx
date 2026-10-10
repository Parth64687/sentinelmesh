import React, { useState } from 'react';
import { useSecurity } from '../context/SecurityContext';
import { 
  Radio, Play, Square, RefreshCw, Bluetooth, Wifi, 
  AlertCircle, CheckCircle2, ShieldCheck, Activity, Terminal 
} from 'lucide-react';
import { SignalStrengthBar, WirelessBadge, RiskBadge } from '../components/StatusBadges';

export const LiveMonitoringPage: React.FC = () => {
  const {
    monitoringState,
    devices,
    activityLogs,
    toggleMonitoring,
    toggleBleMonitoring,
    toggleWifiMonitoring,
    triggerManualScanCycle,
    switchMonitoringMode,
    setSelectedDevice,
  } = useSecurity();

  const [filterType, setFilterType] = useState<'ALL' | 'BLE' | 'Wi-Fi'>('ALL');

  const filteredDevices = devices.filter(d => {
    if (filterType === 'ALL') return true;
    return d.wirelessType === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Disclaimer / Honest Architecture Banner */}
      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-300">
            Prototype Architecture & Wireless Access Notice:
          </p>
          <p className="text-slate-300 leading-relaxed">
            Standard web browsers cannot directly sniff raw 802.11 Wi-Fi frames or scan all BLE peripherals without elevated operating-system permissions. 
            <strong> Live monitoring is not connected to a physical hardware bridge. You are viewing demonstration data.</strong> 
            A modular Python adapter (using Bleak and OS sockets) or an external ESP32-S3 microcontroller can be plugged into this interface.
          </p>
        </div>
      </div>

      {/* Monitoring Control Deck */}
      <div className="p-6 rounded-xl bg-[#172235] border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Radio className="w-5 h-5 text-sky-400" />
              Radio Frequency Observation Deck
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Dual-band physical layer telemetry controller (2.4 GHz ISM spectrum)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={triggerManualScanCycle}
              disabled={!monitoringState.isActive}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
              Force Scan Cycle
            </button>

            <button
              onClick={toggleMonitoring}
              className={`px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer ${
                monitoringState.isActive
                  ? 'bg-amber-600 hover:bg-amber-500 text-slate-950'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
              }`}
            >
              {monitoringState.isActive ? (
                <>
                  <Square className="w-4 h-4 fill-current" /> Stop Monitoring
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" /> Start Monitoring
                </>
              )}
            </button>
          </div>
        </div>

        {/* Telemetry Status Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
          {/* BLE Status */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-sky-950/60 text-sky-400">
                <Bluetooth className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-400 block">BLE Radio</span>
                <span className="text-xs font-bold text-slate-200">
                  {monitoringState.bleActive ? 'Active (Ch 37-39)' : 'Disabled'}
                </span>
              </div>
            </div>
            <button
              onClick={toggleBleMonitoring}
              className={`text-[10px] px-2 py-1 rounded font-semibold ${
                monitoringState.bleActive
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              {monitoringState.bleActive ? 'Toggle Off' : 'Enable'}
            </button>
          </div>

          {/* Wi-Fi Status */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-950/60 text-indigo-400">
                <Wifi className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-400 block">Wi-Fi Radio</span>
                <span className="text-xs font-bold text-slate-200">
                  {monitoringState.wifiActive ? 'Active (Ch 1-13)' : 'Disabled'}
                </span>
              </div>
            </div>
            <button
              onClick={toggleWifiMonitoring}
              className={`text-[10px] px-2 py-1 rounded font-semibold ${
                monitoringState.wifiActive
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              {monitoringState.wifiActive ? 'Toggle Off' : 'Enable'}
            </button>
          </div>

          {/* Scan Cycle Count */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-medium text-slate-400 block">Total Scan Sweeps</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-lg font-bold font-mono text-slate-200">{monitoringState.totalScanCycles}</span>
              <span className="text-[10px] text-slate-500">cycles completed</span>
            </div>
          </div>

          {/* Last Sweep Time */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <span className="text-xs font-medium text-slate-400 block">Last Sweep Time</span>
            <div className="mt-1 text-xs font-mono text-slate-300">
              {monitoringState.lastScanTime ? new Date(monitoringState.lastScanTime).toLocaleTimeString() : 'N/A'}
            </div>
          </div>
        </div>

        {/* Mode Toggle Bar */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/40 border border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Current Monitoring Mode:</span>
            <span className="font-bold text-sky-400 font-mono">{monitoringState.mode}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => switchMonitoringMode('DEMO')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                monitoringState.mode === 'DEMO'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Demo Simulation
            </button>
            <button
              onClick={() => switchMonitoringMode('LIVE')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                monitoringState.mode === 'LIVE'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hardware Bridge (Python/ESP32)
            </button>
          </div>
        </div>
      </div>

      {/* Live Observational Stream & Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Observable Devices Table (2 Cols) */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-[#172235] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Active Radio Feed (Real-Time Sweep)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {filteredDevices.length} transmitters active in current RF zone
              </p>
            </div>

            {/* Radio Filter */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              {(['ALL', 'BLE', 'Wi-Fi'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilterType(f)}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    filterType === f
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800 bg-slate-900/40">
                <tr>
                  <th className="py-2.5 px-3">Device Alias / Identity</th>
                  <th className="py-2.5 px-3">Protocol</th>
                  <th className="py-2.5 px-3">RSSI Signal</th>
                  <th className="py-2.5 px-3">Obs Count</th>
                  <th className="py-2.5 px-3">Risk Band</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredDevices.map(d => (
                  <tr key={d.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-200">
                        {d.alias || <span className="italic text-slate-500">Unlabeled Node</span>}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">{d.identifier}</div>
                    </td>
                    <td className="py-3 px-3">
                      <WirelessBadge type={d.wirelessType} />
                    </td>
                    <td className="py-3 px-3">
                      <SignalStrengthBar rssi={d.rssi} />
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">{d.observationCount}</td>
                    <td className="py-3 px-3">
                      <RiskBadge score={d.riskScore} />
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedDevice(d)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 text-[11px] font-medium"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Packet Activity Stream Terminal (1 Col) */}
        <div className="p-5 rounded-xl bg-[#172235] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sky-400" />
                Raw Telemetry Terminal
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                POLLING
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 h-80 overflow-y-auto space-y-2">
              <div className="text-slate-500"># SentinelMesh Physical Radio Daemon v1.0.4</div>
              <div className="text-slate-500"># Listening on 2.4 GHz channels 1-13 & BLE 37-39...</div>
              {activityLogs.slice(0, 10).map((log, i) => (
                <div key={i} className="text-xs">
                  <span className="text-slate-500">[{new Date(log.timestamp).toLocaleTimeString()}] </span>
                  <span className={log.severity === 'alert' ? 'text-amber-400' : 'text-sky-300'}>
                    {log.title}:
                  </span>{' '}
                  <span className="text-slate-400 text-[10px]">{log.details}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-3 text-center">
            Stream updates automatically on active scan intervals.
          </p>
        </div>
      </div>
    </div>
  );
};
