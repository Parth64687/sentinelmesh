import React, { useState } from 'react';
import { useSecurity } from '../context/SecurityContext';
import { 
  Settings, Shield, Bell, Moon, Database, 
  Trash2, Download, CheckCircle, Info, Lock 
} from 'lucide-react';

export const SettingsPage: React.FC<{ onNavigateToTrusted: () => void }> = ({
  onNavigateToTrusted,
}) => {
  const {
    resetAllDemoData,
    clearActivityLogs,
    monitoringState,
    currentUser,
    loginUser,
    logoutUser,
  } = useSecurity();

  const [soundAlerts, setSoundAlerts] = useState(true);
  const [browserNotifs, setBrowserNotifs] = useState(false);
  const [dataRetentionDays, setDataRetentionDays] = useState('7');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSavePreferences = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const requestBrowserPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setBrowserNotifs(true);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Settings className="w-5 h-5 text-sky-400" />
          System Settings & Privacy Preferences
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure notification thresholds, local data retention limits, and demonstration profiles
        </p>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          Settings and privacy preferences updated successfully.
        </div>
      )}

      {/* Account / Demo Session Profile */}
      <div className="p-5 rounded-xl bg-[#172235] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Lock className="w-4 h-4 text-sky-400" />
          Operator Authentication & Session Profile
        </h3>
        <p className="text-xs text-slate-400">
          For evaluation and college presentations, SentinelMesh features a pre-loaded local demonstration profile.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
          <div>
            <p className="font-semibold text-slate-200">{currentUser?.name || 'Guest Reviewer'}</p>
            <p className="text-slate-400 font-mono mt-0.5">{currentUser?.email || 'reviewer@college-eval.local'}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-sky-950 text-sky-400 border border-sky-500/30">
              Demo Operator Role
            </span>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="p-5 rounded-xl bg-[#172235] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Bell className="w-4 h-4 text-sky-400" />
          Alert & Notification Delivery Preferences
        </h3>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 cursor-pointer">
            <div>
              <span className="font-medium text-slate-200 block">Audible Alert Chimes</span>
              <span className="text-slate-400 text-[11px]">Play subtle non-invasive chime when a High risk device appears</span>
            </div>
            <input
              type="checkbox"
              checked={soundAlerts}
              onChange={e => setSoundAlerts(e.target.checked)}
              className="accent-sky-500 w-4 h-4"
            />
          </label>

          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/40 border border-slate-800/80">
            <div>
              <span className="font-medium text-slate-200 block">Browser Desktop Notifications</span>
              <span className="text-slate-400 text-[11px]">Request native OS notifications for persistent unfamiliar beacons</span>
            </div>
            <button
              onClick={requestBrowserPermission}
              className={`px-3 py-1.5 rounded text-xs font-semibold ${
                browserNotifs
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {browserNotifs ? 'Enabled' : 'Request Permission'}
            </button>
          </div>
        </div>
      </div>

      {/* Data Retention & Local Storage */}
      <div className="p-5 rounded-xl bg-[#172235] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Database className="w-4 h-4 text-sky-400" />
          Data Retention & Local Storage Controls
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/40 border border-slate-800/80">
            <div>
              <span className="font-medium text-slate-200 block">Observation Log Retention Window</span>
              <span className="text-slate-400 text-[11px]">Automatically purge historical frames older than specified days</span>
            </div>
            <select
              value={dataRetentionDays}
              onChange={e => setDataRetentionDays(e.target.value)}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-slate-200"
            >
              <option value="1">1 Day</option>
              <option value="3">3 Days</option>
              <option value="7">7 Days (Recommended)</option>
              <option value="30">30 Days</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/40 border border-slate-800/80">
            <div>
              <span className="font-medium text-slate-200 block">Trusted Device Whitelist Shortcut</span>
              <span className="text-slate-400 text-[11px]">Jump to manage recognized personal devices</span>
            </div>
            <button
              onClick={onNavigateToTrusted}
              className="px-3 py-1.5 rounded text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700"
            >
              Manage Whitelist →
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Information Disclosure Section */}
      <div className="p-5 rounded-xl bg-[#172235] border border-emerald-500/30 space-y-3 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <Shield className="w-4 h-4" />
          Privacy Commitment & Transparency Manifesto
        </div>
        <p className="text-slate-300 leading-relaxed">
          SentinelMesh operates strictly on <strong>unencrypted physical radio frames</strong> (e.g. standard BLE advertisement headers and 802.11 beacon management frames).
        </p>
        <ul className="text-slate-400 space-y-1.5 list-disc pl-5">
          <li><strong>Zero Payload Inspection:</strong> We never capture, decrypt, or log browser traffic, passwords, or personal messages.</li>
          <li><strong>Local Storage Only:</strong> All records reside strictly in your browser's client-side memory or local storage.</li>
          <li><strong>No Cloud Sync:</strong> No telemetric data is relayed to external cloud servers in this prototype.</li>
        </ul>
      </div>

      {/* Danger Zone / Demo Data Reset */}
      <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/30 space-y-3 text-xs">
        <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">
          Danger Zone • Reset Demonstration State
        </span>
        <p className="text-slate-300">
          Restore initial demonstration records, clear user whitelist edits, and reset all alert queues back to original college demonstration defaults.
        </p>
        <button
          onClick={() => setShowResetConfirm(true)}
          className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition-colors cursor-pointer"
        >
          Reset All Prototype Data
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#111827] border border-red-500/40 rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-100">Reset All Data?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              This will restore the factory demonstration dataset. All custom whitelist modifications and alert resolutions will be reset.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 text-xs">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAllDemoData();
                  setShowResetConfirm(false);
                }}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
