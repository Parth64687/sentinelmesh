import React from 'react';
import { RiskLevel, AlertSeverity, WirelessType, TrustStatus } from '../types';
import { ShieldCheck, ShieldAlert, HelpCircle, Bluetooth, Wifi } from 'lucide-react';

export const RiskBadge: React.FC<{ score: number; level?: RiskLevel; showScore?: boolean }> = ({
  score,
  level,
  showScore = true,
}) => {
  let bg = 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30';
  let dotBg = 'bg-emerald-400';
  const computedLevel = level || (score <= 29 ? 'Low' : score <= 59 ? 'Moderate' : score <= 79 ? 'High' : 'Very High');

  if (computedLevel === 'Moderate') {
    bg = 'bg-amber-950/40 text-amber-400 border-amber-500/30';
    dotBg = 'bg-amber-400';
  } else if (computedLevel === 'High') {
    bg = 'bg-orange-950/40 text-orange-400 border-orange-500/30';
    dotBg = 'bg-orange-400';
  } else if (computedLevel === 'Very High') {
    bg = 'bg-red-950/40 text-red-400 border-red-500/30';
    dotBg = 'bg-red-400 animate-pulse';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotBg}`}></span>
      {computedLevel} {showScore && <span className="opacity-75 font-mono">({score})</span>}
    </span>
  );
};

export const TrustBadge: React.FC<{ status: TrustStatus; isTrusted: boolean }> = ({ isTrusted }) => {
  if (isTrusted) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/50 text-emerald-300 border border-emerald-500/40">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        Trusted
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700">
      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
      Unknown
    </span>
  );
};

export const WirelessBadge: React.FC<{ type: WirelessType }> = ({ type }) => {
  if (type === 'BLE') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono bg-sky-950/50 text-sky-300 border border-sky-500/30">
        <Bluetooth className="w-3 h-3 text-sky-400" />
        BLE
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono bg-indigo-950/50 text-indigo-300 border border-indigo-500/30">
      <Wifi className="w-3 h-3 text-indigo-400" />
      Wi-Fi
    </span>
  );
};

export const SeverityBadge: React.FC<{ severity: AlertSeverity }> = ({ severity }) => {
  const styles = {
    low: 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30',
    medium: 'bg-amber-950/50 text-amber-300 border-amber-500/30',
    high: 'bg-orange-950/50 text-orange-300 border-orange-500/30',
    critical: 'bg-red-950/50 text-red-300 border-red-500/30',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider border ${styles[severity] || styles.low}`}>
      <ShieldAlert className="w-3 h-3" />
      {severity}
    </span>
  );
};

export const SignalStrengthBar: React.FC<{ rssi: number }> = ({ rssi }) => {
  // Typical RSSI range: -100 (weak) to -30 (strong)
  const normalized = Math.min(100, Math.max(0, Math.round(((rssi + 100) / 70) * 100)));
  
  let color = 'bg-red-500';
  if (rssi >= -65) color = 'bg-emerald-400';
  else if (rssi >= -80) color = 'bg-sky-400';
  else if (rssi >= -90) color = 'bg-amber-400';

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${normalized}%` }}
        />
      </div>
      <span className="text-xs font-mono text-slate-400">{rssi} dBm</span>
    </div>
  );
};
