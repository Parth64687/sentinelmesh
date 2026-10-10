import React, { useState } from 'react';
import { useSecurity } from '../context/SecurityContext';
import { 
  History, Download, Trash2, Search, Filter, 
  Calendar, AlertCircle, FileText 
} from 'lucide-react';
import { WirelessBadge } from '../components/StatusBadges';

export const ActivityHistoryPage: React.FC = () => {
  const { activityLogs, clearActivityLogs } = useSecurity();

  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filteredLogs = activityLogs.filter(log => {
    if (categoryFilter !== 'ALL' && log.category !== categoryFilter) return false;
    if (
      searchQuery &&
      !log.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.details.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !(log.deviceIdentifier && log.deviceIdentifier.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  const handleExportCSV = () => {
    const headers = ['Timestamp', 'Category', 'Title', 'Details', 'DeviceIdentifier', 'WirelessType', 'Severity'];
    const rows = filteredLogs.map(l => [
      `"${l.timestamp}"`,
      `"${l.category}"`,
      `"${l.title.replace(/"/g, '""')}"`,
      `"${l.details.replace(/"/g, '""')}"`,
      `"${l.deviceIdentifier || ''}"`,
      `"${l.wirelessType || ''}"`,
      `"${l.severity || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sentinelmesh_activity_audit_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmClear = () => {
    clearActivityLogs();
    setShowClearConfirm(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <History className="w-5 h-5 text-sky-400" />
            Audit Activity History & Logs
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Immutable timeline of RF observations, whitelist modifications, and alert resolutions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-sky-400" />
            Export Filtered CSV ({filteredLogs.length})
          </button>

          <button
            onClick={() => setShowClearConfirm(true)}
            className="px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-red-950/40 border border-red-500/20 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear Log Buffer
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#172235] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search activity records by keyword, identifier, or event..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="ALL">All Categories</option>
            <option value="observation">Radio Observations</option>
            <option value="trust_update">Whitelist Updates</option>
            <option value="alert_generated">Alert Triggers</option>
            <option value="alert_action">Alert Actions</option>
            <option value="session">Monitoring Sessions</option>
          </select>
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="p-5 rounded-xl bg-[#172235] border border-slate-800 space-y-4">
        {filteredLogs.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-300">No activity records recorded</h3>
            <p className="text-xs text-slate-500">
              New radio scans and alert interactions will automatically append to this audit trail.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {filteredLogs.map(log => (
              <div key={log.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-200">{log.title}</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {log.category.replace('_', ' ')}
                    </span>
                    {log.wirelessType && <WirelessBadge type={log.wirelessType} />}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{log.details}</p>
                  {log.deviceIdentifier && (
                    <span className="text-[10px] font-mono text-sky-400 block mt-0.5">
                      Target ID: {log.deviceIdentifier}
                    </span>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-slate-500">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                  <span className="text-[10px] font-mono text-slate-600 block">
                    {new Date(log.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirm Clear Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#111827] border border-red-500/30 rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-100">Clear Activity History?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This will erase all demonstration activity records and audit logs stored in your browser session.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmClear}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                Confirm Erase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
