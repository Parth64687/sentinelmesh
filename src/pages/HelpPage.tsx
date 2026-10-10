import React from 'react';
import { 
  HelpCircle, Bluetooth, Wifi, Activity, ShieldCheck, 
  AlertTriangle, Eye, Shield, CheckCircle2, Info 
} from 'lucide-react';

export const HelpPage: React.FC = () => {
  const faqs = [
    {
      q: 'What is Bluetooth Low Energy (BLE)?',
      icon: Bluetooth,
      a: 'Bluetooth Low Energy is a power-conserving wireless protocol used extensively by smartwatches, fitness trackers, wireless headphones, and item tags (like AirTags and SmartTags). They broadcast periodic advertisement packets so phones and hubs can discover them.'
    },
    {
      q: 'What does Wi-Fi observation mean in SentinelMesh?',
      icon: Wifi,
      a: 'Wi-Fi observation refers to capturing passive beacon frames broadcast by nearby wireless routers and probe requests emitted by searching devices. SentinelMesh only registers the physical transmitter address, frequency, and signal strength—never network traffic or data packets.'
    },
    {
      q: 'What does RSSI represent?',
      icon: Activity,
      a: 'RSSI stands for Received Signal Strength Indicator, measured in negative decibel-milliwatts (dBm). Typical numbers range from -30 dBm (extremely close, right next to antenna) to -90 dBm (barely detectable, distant). It serves as a rough approximation of proximity.'
    },
    {
      q: 'What is an "Unknown Device"?',
      icon: HelpCircle,
      a: 'An unknown device is any wireless transmitter that you have not explicitly added to your Trusted whitelist. It could be an adjacent hotel guest’s phone, a neighbor’s smart TV, or a passing wearable. An unknown device is NOT inherently suspicious or dangerous.'
    },
    {
      q: 'What makes a wireless observation "Suspicious"?',
      icon: AlertTriangle,
      a: 'SentinelMesh classifies an observation as suspicious only when specific behavioral anomalies coincide: for instance, an unfamiliar transmitter remaining co-located in your immediate room for over 3 hours with unchanging RSSI levels and rapid burst advertising.'
    },
    {
      q: 'How does the Trusted Device whitelist work?',
      icon: ShieldCheck,
      a: 'When you mark a device as Trusted, you confirm that you recognize it (e.g. your phone, earbuds, or travel router). Once whitelisted, its behavioral risk score drops to Low, preventing unnecessary alert notifications.'
    },
    {
      q: 'Can SentinelMesh guarantee detection of hidden cameras or spy bugs?',
      icon: Eye,
      a: 'No. As an honest cybersecurity prototype, SentinelMesh makes no exaggerated claims. Wireless signals alone cannot prove the physical existence or nature of a hidden camera or malicious spy tool. A device could be an ordinary Wi-Fi smart plug or Bluetooth thermostat. Always practice prudent physical inspection if concerned.'
    },
    {
      q: 'What should I do if a High-risk alert appears?',
      icon: Shield,
      a: '1. Do not panic. Check if you or a travel companion turned on a smart gadget, wireless charger, or wearable.\n2. Review the device’s RSSI signal strength to gauge proximity.\n3. If you recognize the hardware, add it to your Trusted Whitelist.\n4. If unrecognized and following you across different geographic locations, perform a cautious physical check.'
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-sky-400" />
          Educational Guide & System Documentation
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Clear, beginner-friendly explanations of wireless signals, risk models, and privacy principles
        </p>
      </div>

      {/* Core Ethics Statement */}
      <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/30 text-xs space-y-2">
        <div className="flex items-center gap-2 text-sky-400 font-bold">
          <Info className="w-4 h-4" />
          Core Design Philosophy
        </div>
        <p className="text-slate-300 leading-relaxed">
          SentinelMesh is built on scientific accuracy, non-alarmist communication, and privacy protection. 
          We reject fear-mongering security tactics: an unwhitelisted device is simply unfamiliar ambience until observable behavioral patterns warrant human review.
        </p>
      </div>

      {/* FAQs Accordion/Grid */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const Icon = faq.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#172235] border border-slate-800 space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-sky-400">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-100">{faq.q}</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line pl-11">
                {faq.a}
              </p>
            </div>
          );
        })}
      </div>

      {/* College Project Meta card */}
      <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
        <p className="font-semibold text-slate-200">
          College Engineering Project: SentinelMesh v1.0 Prototype
        </p>
        <p>
          Domain: Cybersecurity, Wireless Communication, Internet of Things (IoT), and Behavioral Threat Analysis.
        </p>
      </div>
    </div>
  );
};
