import { BehavioralIndicator, DeviceRiskBreakdown, RiskLevel, WirelessType } from '../types';

export interface ScoringWeights {
  persistenceWeight: number; // e.g. 30
  frequencyWeight: number; // e.g. 25
  rssiStabilityWeight: number; // e.g. 20
  unfamiliarityWeight: number; // e.g. 25
}

export const DEFAULT_SCORING_WEIGHTS: ScoringWeights = {
  persistenceWeight: 30,
  frequencyWeight: 25,
  rssiStabilityWeight: 20,
  unfamiliarityWeight: 25,
};

/**
 * Calculates risk level category from a score between 0 and 100.
 * Adheres strictly to project risk bands:
 * 0–29: Low
 * 30–59: Moderate
 * 60–79: High
 * 80–100: Very High
 */
export function getRiskLevel(score: number): RiskLevel {
  if (score <= 29) return 'Low';
  if (score <= 59) return 'Moderate';
  if (score <= 79) return 'High';
  return 'Very High';
}

/**
 * Evaluates behavioral indicators and computes an explainable risk score (0-100).
 * Clearly explains that:
 * 1. An unknown device is not automatically malicious.
 * 2. Wireless signals alone cannot prove the presence of a hidden camera or malicious spy device.
 * 3. These scores are preliminary heuristic risk estimates for research & awareness.
 */
export function evaluateDeviceRisk(params: {
  isTrusted: boolean;
  wirelessType: WirelessType;
  observationCount: number;
  durationMinutes: number;
  rssiVariance: number; // standard deviation of RSSI
  vendor?: string;
  weights?: ScoringWeights;
}): DeviceRiskBreakdown {
  const { isTrusted, wirelessType, observationCount, durationMinutes, rssiVariance, vendor, weights = DEFAULT_SCORING_WEIGHTS } = params;

  // If explicitly trusted by user, risk is immediately low
  if (isTrusted) {
    const indicators: BehavioralIndicator[] = [
      {
        name: 'User Whitelist Status',
        weight: weights.unfamiliarityWeight,
        score: 0,
        reason: 'Device is on your trusted device list. Whitelisted devices receive low risk priority.',
        detected: true,
      },
      {
        name: 'Operational Baseline',
        weight: weights.persistenceWeight,
        score: 10,
        reason: 'Signal activity is consistent with recognized companion hardware.',
        detected: true,
      },
      {
        name: 'Packet Burst Frequency',
        weight: weights.frequencyWeight,
        score: 15,
        reason: 'Regular discovery intervals expected for recognized hardware.',
        detected: false,
      },
      {
        name: 'Signal Proximity Fluctuation',
        weight: weights.rssiStabilityWeight,
        score: 10,
        reason: 'Standard RSSI variation during normal room usage.',
        detected: false,
      },
    ];

    return {
      overallScore: 12,
      riskLevel: 'Low',
      categoryReason: 'Verified safe by user designation. Device is known and authorized.',
      suggestedAction: 'No action required. Normal baseline monitoring continues.',
      calculatedAt: new Date().toISOString(),
      indicators,
    };
  }

  // Evaluate Heuristic Indicators
  const indicators: BehavioralIndicator[] = [];

  // Indicator 1: Temporal Persistence
  let persistenceScore = 15;
  let persistenceReason = 'Device observed briefly (< 30 minutes). Consistent with normal transient presence.';
  let persistenceDetected = false;

  if (durationMinutes > 180) {
    persistenceScore = 85;
    persistenceReason = `Device has been co-present for over ${Math.round(durationMinutes / 60)} hours continuously across multiple scan cycles.`;
    persistenceDetected = true;
  } else if (durationMinutes > 60) {
    persistenceScore = 55;
    persistenceReason = 'Device has remained in observation vicinity for over 1 hour.';
    persistenceDetected = true;
  }
  indicators.push({
    name: 'Temporal Persistence Over Time',
    weight: weights.persistenceWeight,
    score: persistenceScore,
    reason: persistenceReason,
    detected: persistenceDetected,
  });

  // Indicator 2: Observation Frequency & Volume
  let frequencyScore = 20;
  let frequencyReason = 'Low to moderate transmission volume observed.';
  let frequencyDetected = false;

  if (observationCount > 250) {
    frequencyScore = 75;
    frequencyReason = `High packet density (${observationCount} frames recorded). Indicative of fast periodic beaconing.`;
    frequencyDetected = true;
  } else if (observationCount > 80) {
    frequencyScore = 45;
    frequencyReason = `Moderate packet density (${observationCount} frames recorded). Regular periodic transmissions.`;
    frequencyDetected = true;
  }
  indicators.push({
    name: 'Observation Frequency & Frame Volume',
    weight: weights.frequencyWeight,
    score: frequencyScore,
    reason: frequencyReason,
    detected: frequencyDetected,
  });

  // Indicator 3: RSSI Spatial Stability
  let rssiScore = 20;
  let rssiReason = 'Signal strength shows normal variance, suggesting ambient movement or walking past.';
  let rssiDetected = false;

  if (rssiVariance < 3.0 && durationMinutes > 45) {
    rssiScore = 80;
    rssiReason = 'Unusually steady RSSI values (< 3 dB variance) over an extended timeframe, typical of stationary or concealed fixtures.';
    rssiDetected = true;
  } else if (rssiVariance < 6.0 && durationMinutes > 30) {
    rssiScore = 50;
    rssiReason = 'Relatively steady signal over time. Likely a stationary nearby device.';
    rssiDetected = true;
  }
  indicators.push({
    name: 'Signal Strength (RSSI) Spatial Stability',
    weight: weights.rssiStabilityWeight,
    score: rssiScore,
    reason: rssiReason,
    detected: rssiDetected,
  });

  // Indicator 4: Hardware Signature & Whitelist Absence
  let unfamiliarityScore = 40;
  let unfamiliarityReason = 'Device is not registered on your trusted device whitelist.';
  let unfamiliarityDetected = true;

  if (vendor?.toLowerCase().includes('espressif') || vendor?.toLowerCase().includes('nordic')) {
    unfamiliarityScore = 70;
    unfamiliarityReason = `Unregistered device with embedded IoT/microcontroller radio characteristics (${vendor}).`;
  }
  indicators.push({
    name: 'Hardware Signature & Trust Status',
    weight: weights.unfamiliarityWeight,
    score: unfamiliarityScore,
    reason: unfamiliarityReason,
    detected: unfamiliarityDetected,
  });

  // Calculate Weighted Sum
  const totalWeight =
    weights.persistenceWeight +
    weights.frequencyWeight +
    weights.rssiStabilityWeight +
    weights.unfamiliarityWeight;

  const weightedSum =
    persistenceScore * weights.persistenceWeight +
    frequencyScore * weights.frequencyWeight +
    rssiScore * weights.rssiStabilityWeight +
    unfamiliarityScore * weights.unfamiliarityWeight;

  const overallScore = Math.min(100, Math.max(0, Math.round(weightedSum / (totalWeight || 100))));
  const riskLevel = getRiskLevel(overallScore);

  let categoryReason = 'Device presents low behavioral risk and is likely an ambient pedestrian or neighbor wireless signal.';
  let suggestedAction = 'No immediate action required. Add to trusted list if you recognize it.';

  if (riskLevel === 'Very High' || riskLevel === 'High') {
    categoryReason = `High repetition factor and sustained close proximity detected without recognized user whitelist entry. (${wirelessType} device)`;
    suggestedAction = 'Check whether an unrecognized accessory, speaker, or smart gadget is in your room. If you recognize this device, mark it as Trusted to silence alerts.';
  } else if (riskLevel === 'Moderate') {
    categoryReason = 'Moderate persistence or transmission rate observed for an unregistered device.';
    suggestedAction = 'Observe if device remains present as you change physical locations.';
  }

  return {
    overallScore,
    riskLevel,
    categoryReason,
    suggestedAction,
    calculatedAt: new Date().toISOString(),
    indicators,
  };
}
