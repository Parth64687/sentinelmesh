import React, { useState } from 'react';
import { useSecurity } from '../context/SecurityContext';
import { 
  AlertTriangle, CheckCircle, ShieldAlert, Check, 
  HelpCircle, Search, Filter, Eye, Bell 
} from 'lucide-react';
import { SeverityBadge, WirelessBadge, RiskBadge } from '../components/StatusBadges';

export const AlertsPage: React.FC = () => {
  const {
    alerts,
    acknowledgeAlert,
    resolveAlert,
    setSelectedDevice,
    devices,
  } = useSecurity();

  const [statusFilter, setStatusFilter] = useState<'ALL' | 'active' | 'acknowledged' | 'resolved'>('active');
  const [severityFilter, setSeverityFilter] = useState<'ALL' | 'high' | 'medium' | 'low'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = alerts.filter(a => {
    if (statusFilter !== 'ALL' && a.status !== statusFilter) return false;
    if (severityFilter !== 'ALL' && a.severity !== severityFilter) return false;
    if (
      searchQuery &&
      !a.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !a.deviceIdentifier.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !a.details.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const inspectDeviceForAlert = (deviceId: string) => {
    const dev = devices.find(d => d.id === deviceId || d.identifier === deviceId);
    if (dev) {
      setSelectedDevice(dev);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            Security Alerts & Incident Queue
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Operational triage console for unexplained wireless presence and anomalous persistence
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            {alerts.filter(a => a.status === 'active').length} Unresolved Alerts
          </span>
        </div>
      </div>

      {/* Non-alarmist Ethical Guidance Box */}
      <div className="p-4 rounded-xl bg-[#172235] border border-slate-800 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-sky-400 font-semibold">
          <HelpCircle className="w-4 h-4" />
          How to respond to SentinelMesh alerts:
        </div>
        <p className="leading-relaxed text-slate-400">
          An alert does not imply an emergency or hostile attack. It indicates that an unfamiliar wireless device was observed with high repetition, near proximity, or long continuous duration. Review the suggested action, check your surroundings, and mark the hardware as trusted if it belongs to you or your host.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#172235] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search alerts by title, device identifier, or reason..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
            {(['ALL', 'active', 'acknowledged', 'resolved'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded font-medium capitalize transition-colors ${
                  statusFilter === tab
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Severity Filter Sub-row */}
        <div className="flex items-center gap-2 text-xs pt-2 border-t border-slate-800/60">
          <span className="text-slate-500 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Severity Filter:
          </span>
          {(['ALL', 'high', 'medium', 'low'] as const).map(sev => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-2 py-0.5 rounded uppercase text-[11px] font-mono transition-colors ${
                severityFilter === sev
                  ? 'bg-slate-700 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Cards List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-[#172235] border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-200">No alerts matching filter</h3>
            <p className="text-xs text-slate-500">
              No anomalous wireless behavior recorded in this view.
            </p>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className={`p-5 rounded-xl border transition-all space-y-3 ${
                alert.status === 'active'
                  ? 'bg-[#172235] border-amber-500/30 hover:border-amber-500/50'
                  : alert.status === 'acknowledged'
                  ? 'bg-[#172235]/80 border-sky-500/30'
                  : 'bg-[#111827] border-slate-800/80 opacity-75'
              }`}
            >
              {/* Alert Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg border ${
                      alert.status === 'active'
                        ? 'bg-amber-950/60 border-amber-500/40 text-amber-400'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-100">{alert.title}</h3>
                      <SeverityBadge severity={alert.severity} />
                      <WirelessBadge type={alert.wirelessType} />
                    </div>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      Transmitter ID: <span className="text-sky-300">{alert.deviceIdentifier}</span>
                      {alert.deviceAlias && <span className="text-slate-500 ml-2">({alert.deviceAlias})</span>}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <RiskBadge score={alert.riskScore} />
                  <span className="text-xs font-mono text-slate-500">
                    {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* Alert Details Body */}
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                {alert.details}
              </p>

              {/* Suggested Action Box */}
              <div className="p-3 rounded-lg bg-sky-950/20 border border-sky-500/30 text-xs text-sky-200">
                <span className="font-semibold text-sky-300 block mb-0.5">Recommended Action:</span>
                {alert.suggestedAction}
              </div>

              {/* Action Buttons Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
                <div className="text-slate-500">
                  Status:{' '}
                  <span className="font-semibold capitalize text-slate-300">
                    {alert.status}
                  </span>
                  {alert.resolvedAt && (
                    <span className="ml-2 font-mono text-[10px]">
                      (Resolved at {new Date(alert.resolvedAt).toLocaleTimeString()})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => inspectDeviceForAlert(alert.deviceId)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 font-medium flex items-center gap-1.5 border border-slate-700"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Device Profile
                  </button>

                  {alert.status === 'active' && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="px-3 py-1.5 rounded-lg bg-sky-950 hover:bg-sky-900 text-sky-300 font-medium border border-sky-500/30"
                    >
                      Acknowledge
                    </button>
                  )}

                  {alert.status !== 'resolved' && (
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 font-medium border border-emerald-500/40 flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
