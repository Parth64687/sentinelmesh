import React, { useState } from 'react';
import { useSecurity } from '../context/SecurityContext';
import { 
  AlertTriangle, Shield, CheckCircle2, Sliders, Info, 
  HelpCircle, ArrowRight, Eye, Radio 
} from 'lucide-react';
import { RiskBadge, WirelessBadge, TrustBadge } from '../components/StatusBadges';
import { ScoringWeights, DEFAULT_SCORING_WEIGHTS } from '../utils/riskEngine';

export const ThreatAnalysisPage: React.FC = () => {
  const { devices, setSelectedDevice } = useSecurity();

  // Configurable weights for prototype exploration
  const [weights, setWeights] = useState<ScoringWeights>(DEFAULT_SCORING_WEIGHTS);
  const [selectedRiskTab, setSelectedRiskTab] = useState<'ALL' | 'High' | 'Moderate' | 'Low'>('ALL');

  // Filtered by risk band
  const analyzedDevices = devices.filter(d => {
    if (selectedRiskTab === 'ALL') return true;
    return d.riskBreakdown.riskLevel === selectedRiskTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          Behavioral Threat Analysis & Explainable Scoring
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Transparent multi-factor heuristic assessment mapping observable wireless telemetry to 0–100 risk estimates
        </p>
      </div>

      {/* Crucial Ethical Academic Disclaimer */}
      <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/30 text-xs space-y-2">
        <div className="flex items-center gap-2 text-sky-400 font-bold">
          <Info className="w-4 h-4" />
          Academic & Scientific Disclosure
        </div>
        <p className="text-slate-300 leading-relaxed">
          SentinelMesh utilizes a <strong>heuristic rule-based behavioral engine</strong>. 
          We do not claim machine learning or artificial intelligence where an explicit rule model operates. 
          Scores represent <em>relative behavioral persistence and anomaly estimates</em>, never confirmed malicious probabilities or proof of surveillance.
        </p>
      </div>

      {/* Configurable Heuristic Weight Sliders Deck */}
      <div className="p-5 rounded-xl bg-[#172235] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
            <Sliders className="w-4 h-4 text-sky-400" />
            Configurable Scoring Weights (Prototype Tuning)
          </div>
          <button
            onClick={() => setWeights(DEFAULT_SCORING_WEIGHTS)}
            className="text-xs text-sky-400 hover:underline"
          >
            Reset to Defaults
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Persistence Weight */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>Temporal Persistence:</span>
              <span className="font-mono font-bold text-sky-400">{weights.persistenceWeight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={weights.persistenceWeight}
              onChange={e => setWeights({ ...weights, persistenceWeight: Number(e.target.value) })}
              className="w-full accent-sky-400"
            />
            <p className="text-[10px] text-slate-500">Co-location across multiple hours</p>
          </div>

          {/* Frequency Weight */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>Frame Density / Frequency:</span>
              <span className="font-mono font-bold text-emerald-400">{weights.frequencyWeight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={weights.frequencyWeight}
              onChange={e => setWeights({ ...weights, frequencyWeight: Number(e.target.value) })}
              className="w-full accent-emerald-400"
            />
            <p className="text-[10px] text-slate-500">Rapid burst beacon intervals</p>
          </div>

          {/* RSSI Stability Weight */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>RSSI Spatial Variance:</span>
              <span className="font-mono font-bold text-amber-400">{weights.rssiStabilityWeight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={weights.rssiStabilityWeight}
              onChange={e => setWeights({ ...weights, rssiStabilityWeight: Number(e.target.value) })}
              className="w-full accent-amber-400"
            />
            <p className="text-[10px] text-slate-500">Stationary fixture attenuation</p>
          </div>

          {/* Unfamiliarity / Whitelist Weight */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>Whitelist Absence / Chipset:</span>
              <span className="font-mono font-bold text-purple-400">{weights.unfamiliarityWeight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={weights.unfamiliarityWeight}
              onChange={e => setWeights({ ...weights, unfamiliarityWeight: Number(e.target.value) })}
              className="w-full accent-purple-400"
            />
            <p className="text-[10px] text-slate-500">Unrecognized vendor radio profile</p>
          </div>
        </div>
      </div>

      {/* Risk Bands Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div 
          onClick={() => setSelectedRiskTab('Low')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            selectedRiskTab === 'Low' ? 'bg-emerald-950/40 border-emerald-500/60' : 'bg-[#172235] border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400">Low Risk Band</span>
            <span className="text-xs font-mono text-slate-400">0–29</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Transient devices, neighbors, or whitelisted hardware.</p>
        </div>

        <div 
          onClick={() => setSelectedRiskTab('Moderate')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            selectedRiskTab === 'Moderate' ? 'bg-amber-950/40 border-amber-500/60' : 'bg-[#172235] border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400">Moderate Band</span>
            <span className="text-xs font-mono text-slate-400">30–59</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Slight persistence or unfamiliar burst frequencies.</p>
        </div>

        <div 
          onClick={() => setSelectedRiskTab('High')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            selectedRiskTab === 'High' ? 'bg-orange-950/40 border-orange-500/60' : 'bg-[#172235] border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-orange-400">High Risk Band</span>
            <span className="text-xs font-mono text-slate-400">60–79</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Multi-hour continuous co-location or unassociated SoftAP.</p>
        </div>

        <div 
          onClick={() => setSelectedRiskTab('ALL')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            selectedRiskTab === 'ALL' ? 'bg-sky-950/40 border-sky-500/60' : 'bg-[#172235] border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400">All Devices</span>
            <span className="text-xs font-mono text-slate-400">{devices.length}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">View full spectrum of evaluated transmitters.</p>
        </div>
      </div>

      {/* Explanatory Cards for Evaluated Devices */}
      <div className="space-y-4">
        {analyzedDevices.map(dev => (
          <div
            key={dev.id}
            className="p-5 rounded-xl bg-[#172235] border border-slate-800 hover:border-slate-700 transition-colors space-y-4"
          >
            {/* Device header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-sky-400">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-100">
                      {dev.alias || 'Unlabeled Wireless Transmitter'}
                    </span>
                    <WirelessBadge type={dev.wirelessType} />
                    <TrustBadge status={dev.trustStatus} isTrusted={dev.isTrusted} />
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    ID: {dev.identifier} {dev.vendorGuess && `(${dev.vendorGuess})`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <RiskBadge score={dev.riskScore} />
                <button
                  onClick={() => setSelectedDevice(dev)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-medium border border-slate-700 flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Full Audit
                </button>
              </div>
            </div>

            {/* Model Rationale block */}
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
              <span className="font-semibold text-sky-400">Classification Rationale: </span>
              <span className="text-slate-300">{dev.riskBreakdown.categoryReason}</span>
            </div>

            {/* Contributing Indicators Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {dev.riskBreakdown.indicators.map((ind, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-slate-900/30 border border-slate-800/80 flex items-start justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-200">{ind.name}</span>
                      {ind.detected && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-300 border border-amber-500/20">
                          Active Factor
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">{ind.reason}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-slate-300">{ind.score}</span>
                    <span className="block text-[10px] text-slate-500">{ind.weight}% wgt</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Action */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60 text-slate-400">
              <div>
                <span className="text-slate-500 font-semibold">Suggested Action: </span>
                <span className="text-slate-300">{dev.riskBreakdown.suggestedAction}</span>
              </div>
              <span className="font-mono text-[10px] text-slate-500 shrink-0 ml-4">
                Eval: {new Date(dev.riskBreakdown.calculatedAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
