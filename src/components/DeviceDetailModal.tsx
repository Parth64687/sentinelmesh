import React, { useState } from 'react';
import { SecurityDevice } from '../types';
import { RiskBadge, TrustBadge, WirelessBadge, SignalStrengthBar } from './StatusBadges';
import { 
  X, ShieldCheck, ShieldAlert, Clock, Radio, Activity, 
  HelpCircle, CheckCircle2, ChevronRight, Edit3, Save 
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

interface DeviceDetailModalProps {
  device: SecurityDevice;
  onClose: () => void;
  onToggleTrust: (deviceId: string, alias?: string, note?: string) => void;
  onUpdateAlias: (deviceId: string, alias: string, note?: string) => void;
}

export const DeviceDetailModal: React.FC<DeviceDetailModalProps> = ({
  device,
  onClose,
  onToggleTrust,
  onUpdateAlias,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [aliasInput, setAliasInput] = useState(device.alias || '');
  const [noteInput, setNoteInput] = useState(device.userNote || '');

  const handleSaveInfo = () => {
    onUpdateAlias(device.id, aliasInput, noteInput);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#111827] border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-[#172235]/60 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-100">
                  {device.alias || 'Unlabeled Wireless Node'}
                </h2>
                <WirelessBadge type={device.wirelessType} />
                <TrustBadge status={device.trustStatus} isTrusted={device.isTrusted} />
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                Identifier: <span className="text-sky-300">{device.identifier}</span>
                {device.vendorGuess && <span className="text-slate-500 ml-2">({device.vendorGuess})</span>}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Top Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#172235] border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Risk Score</span>
              <div className="mt-1 flex items-center gap-2">
                <RiskBadge score={device.riskScore} />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#172235] border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Signal (RSSI)</span>
              <div className="mt-1">
                <SignalStrengthBar rssi={device.rssi} />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#172235] border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Observations</span>
              <div className="mt-1 text-base font-bold text-slate-200">
                {device.observationCount} <span className="text-xs font-normal text-slate-500">frames</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#172235] border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Last Observed</span>
              <div className="mt-1 text-xs font-mono text-slate-300">
                {new Date(device.lastSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>
          </div>

          {/* User Alias & Whitelist Management Form */}
          <div className="p-4 rounded-xl bg-[#172235]/60 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Trusted Whitelist Designation & Note
              </span>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-medium"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Alias / Note
                </button>
              ) : (
                <button
                  onClick={handleSaveInfo}
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Device Friendly Alias</label>
                  <input
                    type="text"
                    value={aliasInput}
                    onChange={e => setAliasInput(e.target.value)}
                    placeholder="e.g. My Smartwatch, Office AP..."
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">User Note / Context</label>
                  <input
                    type="text"
                    value={noteInput}
                    onChange={e => setNoteInput(e.target.value)}
                    placeholder="e.g. Verified room hardware on check-in"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    {device.alias || <span className="italic text-slate-500">No alias assigned yet</span>}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {device.userNote || 'No user note attached.'}
                  </p>
                </div>
                <button
                  onClick={() => onToggleTrust(device.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${
                    device.isTrusted
                      ? 'bg-red-950/40 text-red-300 border border-red-500/30 hover:bg-red-900/40'
                      : 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/40'
                  }`}
                >
                  {device.isTrusted ? (
                    <>Remove from Whitelist</>
                  ) : (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Mark as Trusted
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* RSSI Signal History Chart */}
          <div className="p-4 rounded-xl bg-[#172235]/40 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-sky-400" />
                RSSI Signal Strength History (dBm)
              </span>
              <span className="text-xs text-slate-500 font-mono">Higher is closer to receiver</span>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={device.rssiHistory}>
                  <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
                  <YAxis domain={[-95, -35]} stroke="#64748B" fontSize={11} unit="dBm" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111827', borderColor: '#334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#94A3B8' }}
                  />
                  <Line type="monotone" dataKey="rssi" stroke="#38BDF8" strokeWidth={2} dot={{ r: 3, fill: '#38BDF8' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Behavioral Threat Breakdown & Heuristic Indicators */}
          <div className="p-4 rounded-xl bg-[#172235]/40 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                Behavioral Threat Indicators & Explainability
              </span>
              <span className="text-xs font-mono text-slate-500">Heuristic Model</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
              <span className="font-semibold text-sky-400">Model Rationale: </span>
              {device.riskBreakdown.categoryReason}
            </p>

            <div className="space-y-2.5">
              {device.riskBreakdown.indicators.map((ind, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-4 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-200">{ind.name}</span>
                      {ind.detected ? (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-300 border border-amber-500/20">
                          Factor Present
                        </span>
                      ) : (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                          Baseline
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400">{ind.reason}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-slate-200">{ind.score}</span>
                    <span className="text-slate-500 text-[10px] block">Weight: {ind.weight}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Action Alert Box */}
            <div className="mt-4 p-3 rounded-lg bg-sky-950/20 border border-sky-500/30 text-xs text-sky-200 flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-sky-300 block mb-0.5">Recommended Next Action:</span>
                {device.riskBreakdown.suggestedAction}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#172235]/60 flex items-center justify-between text-xs text-slate-400">
          <p>SentinelMesh Heuristic Prototype • Observational Data Only</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
