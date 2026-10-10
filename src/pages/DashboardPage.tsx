import React from 'react';
import { useSecurity } from '../context/SecurityContext';
import { MetricCard } from '../components/MetricCard';
import { RiskBadge, TrustBadge, WirelessBadge, SignalStrengthBar } from '../components/StatusBadges';
import { 
  Radio, ShieldCheck, HelpCircle, AlertTriangle, ShieldAlert, 
  Activity, Play, Square, ArrowUpRight, Download, Eye, ExternalLink 
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

export const DashboardPage: React.FC<{
  onSelectTab: (tab: string) => void;
}> = ({ onSelectTab }) => {
  const {
    devices,
    alerts,
    monitoringState,
    setSelectedDevice,
    toggleMonitoring,
    toggleTrustStatus,
  } = useSecurity();

  // Consistent metric computations
  const totalObserved = devices.length;
  const trustedCount = devices.filter(d => d.isTrusted).length;
  const unknownCount = devices.filter(d => !d.isTrusted && d.trustStatus !== 'suspicious').length;
  const suspiciousCount = devices.filter(d => d.trustStatus === 'suspicious').length;
  const activeAlerts = alerts.filter(a => a.status === 'active');

  // Donut chart dataset
  const riskDistributionData = [
    { name: 'Trusted', value: trustedCount, color: '#34D399' },
    { name: 'Unknown', value: unknownCount, color: '#94A3B8' },
    { name: 'Suspicious', value: suspiciousCount, color: '#FBBF24' },
  ];

  // Activity Timeline mock data (consistent with observations)
  const timelineData = [
    { time: '12:00', observations: 14, rssiAvg: -68 },
    { time: '13:00', observations: 22, rssiAvg: -65 },
    { time: '14:00', observations: 35, rssiAvg: -63 },
    { time: '15:00', observations: 48, rssiAvg: -61 },
    { time: '16:00', observations: monitoringState.observationsThisSession, rssiAvg: -60 },
  ];

  const handleExportCSV = () => {
    const headers = ['Alias', 'Identifier', 'WirelessType', 'FirstSeen', 'LastSeen', 'RSSI', 'ObservationCount', 'TrustStatus', 'RiskScore'];
    const rows = devices.map(d => [
      `"${d.alias || ''}"`,
      d.identifier,
      d.wirelessType,
      d.firstSeen,
      d.lastSeen,
      d.rssi,
      d.observationCount,
      d.isTrusted ? 'Trusted' : d.trustStatus,
      d.riskScore
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sentinelmesh_devices_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Demo Notice Banner */}
      <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/30 flex items-center justify-between text-xs text-sky-200">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          <span className="font-semibold text-sky-300">DEMONSTRATION PROTOTYPE ACTIVE:</span>
          <span className="text-slate-300">
            Observing synthetic BLE/Wi-Fi devices for college evaluation. All changes persist in local state.
          </span>
        </div>
        <button
          onClick={() => onSelectTab('monitoring')}
          className="underline text-sky-400 hover:text-sky-300 font-medium shrink-0 ml-2"
        >
          Inspect Scanner Configuration →
        </button>
      </div>

      {/* 6 Key Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <MetricCard
          title="Devices Observed"
          value={totalObserved}
          subtitle="Cumulative unique IDs"
          icon={Radio}
          variant="blue"
          onClick={() => onSelectTab('explorer')}
        />
        <MetricCard
          title="Trusted Devices"
          value={trustedCount}
          subtitle="User-whitelisted nodes"
          icon={ShieldCheck}
          variant="green"
          onClick={() => onSelectTab('trusted')}
        />
        <MetricCard
          title="Unknown Devices"
          value={unknownCount}
          subtitle="Unclassified ambience"
          icon={HelpCircle}
          variant="default"
          onClick={() => onSelectTab('explorer')}
        />
        <MetricCard
          title="Suspicious Activity"
          value={suspiciousCount}
          subtitle="Elevated persistence"
          icon={AlertTriangle}
          variant="amber"
          onClick={() => onSelectTab('threats')}
        />
        <MetricCard
          title="Active Alerts"
          value={activeAlerts.length}
          subtitle="Action required"
          icon={ShieldAlert}
          variant="red"
          onClick={() => onSelectTab('alerts')}
        />
        <MetricCard
          title="Monitoring Status"
          value={monitoringState.isActive ? 'RUNNING' : 'STOPPED'}
          subtitle={`Source: ${monitoringState.mode}`}
          icon={Activity}
          variant={monitoringState.isActive ? 'green' : 'default'}
          onClick={toggleMonitoring}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Timeline (2 Columns) */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-[#172235] border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-400" />
                Wireless Activity Timeline
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Observed radio frame count across the current active session
              </p>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
              Live Frame Rate
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="obsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#334155', borderRadius: '8px' }}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <Area type="monotone" dataKey="observations" stroke="#38BDF8" strokeWidth={2} fillOpacity={1} fill="url(#obsGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Risk Distribution Donut (1 Column) */}
        <div className="p-5 rounded-xl bg-[#172235] border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Device Risk Distribution
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Breakdown by trusted, unknown, and suspicious status
            </p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#334155', borderRadius: '8px' }}
                />
                <Legend verticalAlign="bottom" height={36} iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-500 text-center leading-tight">
            * Devices are only marked suspicious based on persistence thresholds, never presumed malicious.
          </p>
        </div>
      </div>

      {/* Monitoring Overview & Quick Actions Bar */}
      <div className="p-4 rounded-xl bg-[#172235] border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto text-xs">
          <div>
            <span className="text-slate-500 block">BLE Scanning</span>
            <span className="font-semibold text-sky-400">{monitoringState.bleActive ? 'Enabled (Dual Ch)' : 'Paused'}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Wi-Fi Scanning</span>
            <span className="font-semibold text-emerald-400">{monitoringState.wifiActive ? 'Enabled (802.11 b/g/n)' : 'Paused'}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Last Successful Sweep</span>
            <span className="font-mono text-slate-300">
              {monitoringState.lastScanTime ? new Date(monitoringState.lastScanTime).toLocaleTimeString() : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Data Feed</span>
            <span className="font-mono text-amber-400 font-semibold">{monitoringState.mode} MODE</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
          <button
            onClick={toggleMonitoring}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              monitoringState.isActive
                ? 'bg-amber-950/60 text-amber-300 border border-amber-500/40 hover:bg-amber-900/60'
                : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/60'
            }`}
          >
            {monitoringState.isActive ? (
              <>
                <Square className="w-3.5 h-3.5" /> Stop Monitoring
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Start Monitoring
              </>
            )}
          </button>

          <button
            onClick={() => onSelectTab('trusted')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            Manage Whitelist
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Two Column Section: Recent Alerts (Left) + Nearby Device Snapshot (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="p-5 rounded-xl bg-[#172235] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Recent Security Alerts
              </h3>
              <button
                onClick={() => onSelectTab('alerts')}
                className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
              >
                View all ({alerts.length}) <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {alerts.slice(0, 3).map(alert => (
                <div
                  key={alert.id}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-200">{alert.title}</span>
                      <WirelessBadge type={alert.wirelessType} />
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{alert.details}</p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono mt-1">
                      <span>ID: {alert.deviceIdentifier}</span>
                      <span>• {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-1">
                    <RiskBadge score={alert.riskScore} />
                    <button
                      onClick={() => onSelectTab('alerts')}
                      className="block text-[11px] text-sky-400 hover:underline mt-1 ml-auto"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nearby Device Snapshot */}
        <div className="p-5 rounded-xl bg-[#172235] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Radio className="w-4 h-4 text-sky-400" />
                Nearby Device Snapshot
              </h3>
              <button
                onClick={() => onSelectTab('explorer')}
                className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
              >
                Full Explorer ({devices.length}) <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {devices.slice(0, 4).map(dev => (
                <div
                  key={dev.id}
                  onClick={() => setSelectedDevice(dev)}
                  className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-sky-500/30 hover:bg-slate-900/80 cursor-pointer transition-all flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-slate-200 truncate">
                        {dev.alias || 'Unlabeled Wireless Node'}
                      </p>
                      <WirelessBadge type={dev.wirelessType} />
                    </div>
                    <p className="text-[11px] font-mono text-slate-500 truncate mt-0.5">
                      {dev.identifier}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <SignalStrengthBar rssi={dev.rssi} />
                    <RiskBadge score={dev.riskScore} />
                    <Eye className="w-4 h-4 text-slate-400 hover:text-sky-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
