import React, { useState } from 'react';
import { useSecurity } from '../context/SecurityContext';
import { 
  Search, Filter, ArrowUpDown, ShieldCheck, HelpCircle, 
  AlertTriangle, Eye, Shield, Download 
} from 'lucide-react';
import { RiskBadge, TrustBadge, WirelessBadge, SignalStrengthBar } from '../components/StatusBadges';
import { SecurityDevice } from '../types';

export const DeviceExplorerPage: React.FC = () => {
  const { devices, setSelectedDevice, toggleTrustStatus } = useSecurity();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'trusted' | 'unknown' | 'suspicious'>('ALL');
  const [protocolFilter, setProtocolFilter] = useState<'ALL' | 'BLE' | 'Wi-Fi'>('ALL');
  const [sortBy, setSortBy] = useState<'risk' | 'lastSeen' | 'observations'>('risk');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter pipeline
  const filtered = devices.filter(d => {
    // Search query
    const matchSearch =
      (d.alias && d.alias.toLowerCase().includes(searchQuery.toLowerCase())) ||
      d.identifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.vendorGuess && d.vendorGuess.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchSearch) return false;

    // Status filter
    if (statusFilter !== 'ALL') {
      if (statusFilter === 'trusted' && !d.isTrusted) return false;
      if (statusFilter === 'unknown' && (d.isTrusted || d.trustStatus === 'suspicious')) return false;
      if (statusFilter === 'suspicious' && d.trustStatus !== 'suspicious') return false;
    }

    // Protocol filter
    if (protocolFilter !== 'ALL' && d.wirelessType !== protocolFilter) {
      return false;
    }

    return true;
  });

  // Sort pipeline
  const sorted = [...filtered].sort((a, b) => {
    let comparison = 0;
    if (sortBy === 'risk') {
      comparison = a.riskScore - b.riskScore;
    } else if (sortBy === 'lastSeen') {
      comparison = new Date(a.lastSeen).getTime() - new Date(b.lastSeen).getTime();
    } else if (sortBy === 'observations') {
      comparison = a.observationCount - b.observationCount;
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / itemsPerPage) || 1;
  const paginatedDevices = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExportCSV = () => {
    const headers = ['Alias', 'Identifier', 'WirelessType', 'FirstSeen', 'LastSeen', 'RSSI', 'ObservationCount', 'TrustStatus', 'RiskScore', 'Vendor'];
    const rows = sorted.map(d => [
      `"${d.alias || ''}"`,
      d.identifier,
      d.wirelessType,
      d.firstSeen,
      d.lastSeen,
      d.rssi,
      d.observationCount,
      d.isTrusted ? 'Trusted' : d.trustStatus,
      d.riskScore,
      `"${d.vendorGuess || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sentinelmesh_filtered_devices_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            Wireless Device Explorer
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Comprehensive audit table of all detected physical radio transmitters
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="self-start md:self-auto px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4 text-sky-400" />
          Export Visible ({sorted.length})
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#172235] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by alias, MAC / identifier, or estimated vendor..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="risk">Sort by Risk Score</option>
              <option value="lastSeen">Sort by Last Seen</option>
              <option value="observations">Sort by Observation Count</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 hover:text-white"
              title={`Order: ${sortOrder.toUpperCase()}`}
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60 text-xs">
          {/* Status Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Status:
            </span>
            {(['ALL', 'trusted', 'unknown', 'suspicious'] as const).map(st => (
              <button
                key={st}
                onClick={() => {
                  setStatusFilter(st);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md font-medium capitalize transition-colors ${
                  statusFilter === st
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Protocol Filters */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 mr-1">Protocol:</span>
            {(['ALL', 'BLE', 'Wi-Fi'] as const).map(pt => (
              <button
                key={pt}
                onClick={() => {
                  setProtocolFilter(pt);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  protocolFilter === pt
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {pt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="p-5 rounded-xl bg-[#172235] border border-slate-800 space-y-4">
        {paginatedDevices.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-300">No matching wireless devices found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search criteria or resetting active filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800 bg-slate-900/40">
                <tr>
                  <th className="py-3 px-3">Device Alias / Identity</th>
                  <th className="py-3 px-3">Protocol</th>
                  <th className="py-3 px-3">Signal (RSSI)</th>
                  <th className="py-3 px-3">First Seen</th>
                  <th className="py-3 px-3">Last Seen</th>
                  <th className="py-3 px-3">Frames</th>
                  <th className="py-3 px-3">Trust State</th>
                  <th className="py-3 px-3">Risk Band</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {paginatedDevices.map(dev => (
                  <tr key={dev.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-200">
                        {dev.alias || <span className="italic text-slate-500">Unlabeled Node</span>}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        {dev.identifier}
                        {dev.vendorGuess && <span className="text-slate-500 ml-1.5">• {dev.vendorGuess}</span>}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <WirelessBadge type={dev.wirelessType} />
                    </td>
                    <td className="py-3 px-3">
                      <SignalStrengthBar rssi={dev.rssi} />
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400">
                      {new Date(dev.firstSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">
                      {new Date(dev.lastSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">{dev.observationCount}</td>
                    <td className="py-3 px-3">
                      <TrustBadge status={dev.trustStatus} isTrusted={dev.isTrusted} />
                    </td>
                    <td className="py-3 px-3">
                      <RiskBadge score={dev.riskScore} />
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <button
                        onClick={() => setSelectedDevice(dev)}
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
        )}

        {/* Pagination controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, sorted.length)} of {sorted.length} devices
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="px-2 font-mono text-slate-300">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
