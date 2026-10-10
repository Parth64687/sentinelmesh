import React from 'react';
import { 
  LayoutDashboard, Radio, Cpu, ShieldCheck, AlertTriangle, 
  History, Server, Settings, HelpCircle, Shield, ChevronLeft, ChevronRight, X
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  activeAlertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  activeAlertCount,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'monitoring', label: 'Live Monitoring', icon: Radio },
    { id: 'explorer', label: 'Device Explorer', icon: Cpu },
    { id: 'trusted', label: 'Trusted Devices', icon: ShieldCheck },
    { id: 'threats', label: 'Threat Analysis', icon: AlertTriangle },
    { id: 'alerts', label: 'Alerts & Notifications', icon: AlertTriangle, badge: activeAlertCount },
    { id: 'history', label: 'Activity History', icon: History },
    { id: 'hardware', label: 'Hardware Status', icon: Server },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & About', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen bg-[#111827] border-r border-slate-800 transition-all duration-300 flex flex-col ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Brand header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800 shrink-0">
          <div 
            onClick={() => { setCurrentTab('landing'); setMobileOpen(false); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-sky-500/20 to-emerald-500/10 border border-sky-500/30 text-sky-400 group-hover:border-sky-400 transition-colors">
              <Shield className="w-5 h-5 text-sky-400" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            {!collapsed && (
              <div>
                <span className="text-base font-bold tracking-tight text-slate-100 flex items-center gap-1.5">
                  Sentinel<span className="text-sky-400">Mesh</span>
                </span>
                <span className="text-[10px] block text-slate-400 -mt-0.5 font-medium tracking-wider uppercase">
                  Cyber-Physical Sec
                </span>
              </div>
            )}
          </div>

          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-200 md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive
                    ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                } ${collapsed ? 'justify-center px-2' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    isActive ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}

                {/* Badge if active alerts */}
                {Boolean(item.badge && item.badge > 0) && (
                  <span
                    className={`ml-auto text-xs px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40'
                        : 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                    } ${collapsed ? 'absolute top-1 right-1 px-1.5 text-[10px]' : ''}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Demo Mode Badge / Notice */}
        <div className="p-3 border-t border-slate-800 shrink-0">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            {!collapsed ? (
              <div className="space-y-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-wider text-sky-400 uppercase">
                    Demo Mode Active
                  </span>
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Displaying synthetic college project simulation dataset.
                </p>
              </div>
            ) : (
              <span className="text-[10px] font-bold text-sky-400">DEMO</span>
            )}
          </div>
        </div>

        {/* Desktop Collapse toggle */}
        <div className="hidden md:flex items-center justify-end p-3 border-t border-slate-800">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </aside>
    </>
  );
};
