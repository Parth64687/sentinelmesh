import React from 'react';
import { 
  Shield, Radio, Lock, Activity, Eye, Cpu, Database, 
  Layers, CheckCircle, AlertTriangle, ArrowRight, Sparkles 
} from 'lucide-react';

interface LandingPageProps {
  onEnterDashboard: () => void;
  onExploreWorkflow: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterDashboard,
  onExploreWorkflow,
}) => {
  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 flex flex-col selection:bg-sky-500/30 selection:text-sky-200">
      {/* Landing Navbar */}
      <nav className="border-b border-slate-800/80 bg-[#0B1220]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500/20 to-emerald-500/10 border border-sky-500/30 text-sky-400">
              <Shield className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white">
                Sentinel<span className="text-sky-400">Mesh</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400 ml-2 border-l border-slate-700 pl-2">
                Cyber-Physical Wireless Defense
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-sky-950/60 text-sky-300 border border-sky-500/30">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              College Project Prototype
            </span>
            <button
              onClick={onEnterDashboard}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-lg shadow-sky-500/20 cursor-pointer"
            >
              Open Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-800/80 border border-slate-700 text-slate-300">
              <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>See the Signals. Understand the Risk.</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Your Wireless Environment.{' '}
              <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Under Your Control.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Monitor supported wireless activity, recognize unfamiliar devices, and understand potential privacy risks through intelligent behavioral analysis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={onEnterDashboard}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-xl shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Open Security Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreWorkflow}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm bg-[#172235] hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Activity className="w-4 h-4 text-sky-400" />
                <span>Explore How It Works</span>
              </button>
            </div>
          </div>

          {/* Interactive Visual Representation of Protected Node */}
          <div className="mt-14 max-w-4xl mx-auto p-1 rounded-2xl bg-gradient-to-b from-sky-500/20 via-slate-800/40 to-transparent border border-slate-700/60 shadow-2xl">
            <div className="bg-[#111827] rounded-xl p-6 sm:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Visual Radar Nodes */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-slate-700/80 bg-slate-950/60 flex items-center justify-center shrink-0">
                  <div className="absolute inset-4 rounded-full border border-slate-800/80 animate-pulse" />
                  <div className="absolute inset-16 rounded-full border border-sky-500/20" />
                  <div className="absolute inset-28 rounded-full border border-sky-500/40" />

                  {/* Center Node (User Protection) */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-sky-500/20 border-2 border-sky-400 flex items-center justify-center shadow-lg shadow-sky-500/30">
                    <Shield className="w-7 h-7 text-sky-300" />
                  </div>

                  {/* Surrounding Nodes */}
                  <div className="absolute top-8 left-12 p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-[10px] font-mono text-emerald-300 flex items-center gap-1 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Smartphone
                  </div>
                  <div className="absolute bottom-10 right-8 p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-[10px] font-mono text-emerald-300 flex items-center gap-1 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Headphones
                  </div>
                  <div className="absolute top-10 right-8 p-2 rounded-lg bg-orange-950/80 border border-orange-500/50 text-[10px] font-mono text-orange-300 flex items-center gap-1 shadow-md animate-bounce">
                    <AlertTriangle className="w-3 h-3 text-orange-400" /> Unfamiliar BLE
                  </div>
                  <div className="absolute bottom-12 left-10 p-2 rounded-lg bg-slate-800/90 border border-slate-700 text-[10px] font-mono text-slate-300 flex items-center gap-1 shadow-md">
                    <Radio className="w-3 h-3 text-slate-400" /> Hallway Wi-Fi
                  </div>
                </div>

                {/* Legend & Ethic Principle */}
                <div className="space-y-4 max-w-md">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Intelligent Physical-Layer Profiling
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Separating Background Ambience from Repeating Anomalies
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    In hotels, hostels, and transit hubs, dozens of wireless devices surround you. SentinelMesh tracks observable frequency presence, cross-checks your trusted list, and evaluates behavioral patterns without invading network contents.
                  </p>
                  <div className="p-3 rounded-lg bg-sky-950/30 border border-sky-500/30 text-xs text-sky-200">
                    <p className="font-semibold text-sky-300">Ethical Wireless Analysis Principle:</p>
                    Unknown devices are not automatically malicious. Signals indicate radio transmission presence, never definitive intent.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section A: The Problem */}
      <section className="py-16 bg-[#111827]/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">The Problem</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Invisible Wireless Space in Unfamiliar Environments
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              When staying in a hotel room, Airbnb, student hostel, or shared co-working office, you have no visibility into nearby active transmitters. Are there persistent beacons following you? Or are these standard ambient gadgets?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#172235] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Unfamiliar Radio Signals</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Modern BLE trackers, hidden smart gadgets, and unknown microcontrollers emit periodic signals that standard phone operating systems conceal from everyday users.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#172235] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Lack of Behavioral Context</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A basic Wi-Fi scan produces hundreds of MAC addresses. Without history, you cannot determine if a device just passed by the window or has lingered for 6 hours.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#172235] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100">Privacy & Peace of Mind</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Travelers and residents need transparent situational awareness that respects privacy, requires zero technical jargon, and provides actionable guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section B & C: Our Approach & How It Works */}
      <section id="workflow-section" className="py-20 bg-[#0B1220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Architecture & Workflow</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              End-to-End Behavioral Threat Intelligence
            </h2>
            <p className="text-sm text-slate-400">
              SentinelMesh evaluates observable physical-layer signals through a structured nine-stage pipeline designed for cyber-physical security prototypes.
            </p>
          </div>

          {/* Workflow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {[
              { step: '01', title: 'Wireless Monitoring', desc: 'Continuous passive listening on supported 2.4 GHz Wi-Fi & BLE advertisement channels.' },
              { step: '02', title: 'Device Discovery', desc: 'Extracts observable BSSID/MAC, RSSI amplitude, timestamp, and frame metadata.' },
              { step: '03', title: 'Device Profiling', desc: 'Assembles signal persistence histories, packet densities, and vendor OUI signatures.' },
              { step: '04', title: 'Trusted List Management', desc: 'Instant classification comparison against user-whitelisted personal electronics.' },
              { step: '05', title: 'Behavior Analysis', desc: 'Analyzes spatial variance, temporal persistence, and burst transmission frequency.' },
              { step: '06', title: 'Threat Scoring', desc: 'Heuristic weighted computation mapping behavior to an explainable 0–100 scale.' },
              { step: '07', title: 'Risk Classification', desc: 'Categorizes observations into transparent risk bands: Low, Moderate, High, Very High.' },
              { step: '08', title: 'User Alerts', desc: 'Non-alarmist contextual notifications with concrete suggested actions.' },
              { step: '09', title: 'Dashboard & History', desc: 'Searchable audit logs, interactive graphs, and exportable CSV incident reports.' },
            ].map((st, i) => (
              <div key={i} className="p-5 rounded-xl bg-[#172235] border border-slate-800 hover:border-sky-500/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-sky-400">{st.step}</span>
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                </div>
                <h3 className="text-sm font-bold text-slate-100 mb-1">{st.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section D & E: Core Features & Privacy First */}
      <section className="py-16 bg-[#111827]/70 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Core Capabilities</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Engineered for Rigorous Prototype Demonstrations
              </h2>

              <div className="space-y-3.5">
                {[
                  'Dual-protocol telemetry supporting BLE 4.x/5.x and 802.11 b/g/n Wi-Fi observation.',
                  'Explainable risk scoring model with transparent indicator breakdowns.',
                  'Persistent user whitelist ensuring your own gadgets never trigger false positives.',
                  'Simulated demo mode providing complete interactive testability without physical antennas.',
                  'CSV telemetry exports for academic reporting and security audits.'
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Box */}
            <div className="p-6 rounded-2xl bg-[#172235] border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">Privacy-First Architecture</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                SentinelMesh only monitors public physical-layer beacons and frame headers. We never decrypt payloads, inspect private web traffic, or harvest personal communications.
              </p>
              <div className="text-xs space-y-2 text-slate-400 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <p>✓ All demonstration records stored purely on client local state.</p>
                <p>✓ One-click data purge option allows zero forensic residue.</p>
                <p>✓ Transparent ethical disclaimer baked into all alert interfaces.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section F & G: Hardware Integration & Honest Limitations */}
      <section className="py-16 bg-[#0B1220] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Planned Hardware */}
            <div className="p-6 rounded-2xl bg-[#172235] border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <Cpu className="w-5 h-5 text-sky-400" />
                <h3 className="text-base font-bold text-white">Planned Physical Hardware Integration</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The architecture is designed to interface with an external portable embedded module:
              </p>
              <ul className="text-xs text-slate-400 space-y-2 font-mono">
                <li>• <strong>ESP32-S3:</strong> Dual-core 240MHz MCU for Wi-Fi promiscuous & BLE scanning</li>
                <li>• <strong>nRF52840:</strong> Optional co-processor for extended BLE long-range sniffing</li>
                <li>• <strong>Peripherals:</strong> 1.3" OLED display, status NeoPixels, buzzer & haptic motor</li>
                <li>• <strong>Power:</strong> LiPo rechargeable battery with onboard TP4056 power management</li>
              </ul>
            </div>

            {/* Scientific Limitations */}
            <div className="p-6 rounded-2xl bg-[#172235] border border-amber-500/30 space-y-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Scientific & Operating Limitations</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                As an honest engineering prototype, SentinelMesh makes no exaggerated claims:
              </p>
              <ul className="text-xs text-slate-400 space-y-2">
                <li>• Wireless scanning cannot guarantee detection of all radio transmitters.</li>
                <li>• Devices using rapid randomized MAC cycling may appear as new entries.</li>
                <li>• <strong>Crucial:</strong> Wireless signals alone cannot prove the presence of a hidden camera or malicious actor.</li>
                <li>• Browsers cannot perform raw antenna scanning without a dedicated companion backend service.</li>
              </ul>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="mt-16 text-center space-y-4">
            <button
              onClick={onEnterDashboard}
              className="px-8 py-3.5 rounded-xl font-bold text-sm bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all shadow-xl shadow-sky-500/20 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Launch Live Dashboard Prototype</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-slate-500">
              SentinelMesh • College Project Prototype • Fully Interactive Demo
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
