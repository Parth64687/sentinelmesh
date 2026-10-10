import React, { useState } from 'react';
import { useSecurity } from '../context/SecurityContext';
import { 
  ShieldCheck, Plus, Trash2, Edit3, Save, X, 
  HelpCircle, AlertCircle, Search 
} from 'lucide-react';
import { WirelessBadge, SignalStrengthBar } from '../components/StatusBadges';

export const TrustedDevicesPage: React.FC = () => {
  const {
    devices,
    addTrustedDeviceManual,
    removeDeviceFromTrusted,
    updateDeviceAlias,
    setSelectedDevice,
  } = useSecurity();

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null);

  // Form states for manual registration
  const [newIdentifier, setNewIdentifier] = useState('');
  const [newAlias, setNewAlias] = useState('');
  const [newType, setNewType] = useState<'BLE' | 'Wi-Fi'>('BLE');
  const [newNote, setNewNote] = useState('');
  const [formError, setFormError] = useState('');

  // Editing alias/note state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAlias, setEditAlias] = useState('');
  const [editNote, setEditNote] = useState('');

  const trustedDevices = devices.filter(
    d =>
      d.isTrusted &&
      ((d.alias && d.alias.toLowerCase().includes(searchQuery.toLowerCase())) ||
        d.identifier.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdentifier.trim() || !newAlias.trim()) {
      setFormError('Please provide both a valid identifier and friendly alias.');
      return;
    }
    addTrustedDeviceManual(newIdentifier.trim(), newAlias.trim(), newType, newNote.trim());
    setShowAddModal(false);
    setNewIdentifier('');
    setNewAlias('');
    setNewNote('');
    setFormError('');
  };

  const startEdit = (id: string, currentAlias?: string, currentNote?: string) => {
    setEditingId(id);
    setEditAlias(currentAlias || '');
    setEditNote(currentNote || '');
  };

  const saveEdit = (id: string) => {
    updateDeviceAlias(id, editAlias, editNote);
    setEditingId(null);
  };

  const confirmDelete = () => {
    if (deviceToDelete) {
      removeDeviceFromTrusted(deviceToDelete);
      setDeviceToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Trusted Whitelist Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Register your personal electronics to suppress false alarms and establish baseline ambient profiles
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="self-start sm:self-auto px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Trusted Device
        </button>
      </div>

      {/* Trust Philosophy Disclaimer Box */}
      <div className="p-4 rounded-xl bg-[#172235] border border-slate-800 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-sky-400 font-semibold">
          <HelpCircle className="w-4 h-4" />
          What does "Trusted Status" signify?
        </div>
        <p className="leading-relaxed text-slate-400">
          Marking a device as <strong>Trusted</strong> means you explicitly recognize it as personal or verified local infrastructure (e.g. your smartphone, smartwatch, headphones, or hotel suite router). 
          <em> It does not guarantee that the radio transmitter is inherently secure or uncompromised</em>, but ensures SentinelMesh assigns it low behavioral risk priority.
        </p>
      </div>

      {/* Search and Table */}
      <div className="p-5 rounded-xl bg-[#172235] border border-slate-800 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search trusted whitelist by alias or MAC identifier..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {trustedDevices.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
              <ShieldCheck className="w-6 h-6 text-slate-600" />
            </div>
            <h3 className="text-sm font-semibold text-slate-300">No trusted devices matching search</h3>
            <p className="text-xs text-slate-500">
              Add your smartphone, smartwatch, or travel laptop to initialize your whitelist.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800 bg-slate-900/40">
                <tr>
                  <th className="py-3 px-3">Device Alias</th>
                  <th className="py-3 px-3">Observable Identifier</th>
                  <th className="py-3 px-3">Protocol</th>
                  <th className="py-3 px-3">User Context Note</th>
                  <th className="py-3 px-3">Signal (RSSI)</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {trustedDevices.map(dev => (
                  <tr key={dev.id} className="hover:bg-slate-900/40 transition-colors">
                    {editingId === dev.id ? (
                      <>
                        <td className="py-3 px-3">
                          <input
                            type="text"
                            value={editAlias}
                            onChange={e => setEditAlias(e.target.value)}
                            className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-slate-100"
                          />
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-400">{dev.identifier}</td>
                        <td className="py-3 px-3">
                          <WirelessBadge type={dev.wirelessType} />
                        </td>
                        <td className="py-3 px-3">
                          <input
                            type="text"
                            value={editNote}
                            onChange={e => setEditNote(e.target.value)}
                            className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-slate-100 w-full"
                          />
                        </td>
                        <td className="py-3 px-3">
                          <SignalStrengthBar rssi={dev.rssi} />
                        </td>
                        <td className="py-3 px-3 text-right space-x-1">
                          <button
                            onClick={() => saveEdit(dev.id)}
                            className="p-1.5 text-emerald-400 hover:bg-slate-800 rounded"
                            title="Save"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 text-slate-400 hover:bg-slate-800 rounded"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-3 font-semibold text-slate-200">{dev.alias}</td>
                        <td className="py-3 px-3 font-mono text-slate-400">{dev.identifier}</td>
                        <td className="py-3 px-3">
                          <WirelessBadge type={dev.wirelessType} />
                        </td>
                        <td className="py-3 px-3 text-slate-400">
                          {dev.userNote || <span className="italic text-slate-600">None</span>}
                        </td>
                        <td className="py-3 px-3">
                          <SignalStrengthBar rssi={dev.rssi} />
                        </td>
                        <td className="py-3 px-3 text-right space-x-1">
                          <button
                            onClick={() => startEdit(dev.id, dev.alias, dev.userNote)}
                            className="p-1.5 text-slate-400 hover:text-sky-400 hover:bg-slate-800 rounded"
                            title="Edit Alias or Note"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeviceToDelete(dev.id)}
                            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded"
                            title="Remove from Whitelist"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Manual Registration Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#111827] border border-slate-700 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Add Device to Trusted Whitelist
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-2.5 rounded bg-red-950/60 border border-red-500/30 text-xs text-red-300">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Friendly Device Alias *</label>
                <input
                  type="text"
                  placeholder="e.g. Parth's MacBook Air"
                  value={newAlias}
                  onChange={e => setNewAlias(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Observable Identifier (MAC / Address) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 7A:B3:9F:80:2D:11"
                  value={newIdentifier}
                  onChange={e => setNewIdentifier(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Wireless Protocol</label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="BLE">Bluetooth Low Energy (BLE)</option>
                  <option value="Wi-Fi">Wi-Fi (802.11)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">User Context Note (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Primary working laptop"
                  value={newNote}
                  onChange={e => setNewNote(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg shadow cursor-pointer"
                >
                  Save Whitelist Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Deletion */}
      {deviceToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#111827] border border-red-500/30 rounded-2xl w-full max-w-sm p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-100">Remove from Whitelist?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Removing this device will reset its trust status to <strong>Unknown</strong>. Future scans will calculate behavioral risk scores for this transmitter.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeviceToDelete(null)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                Confirm Removal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
