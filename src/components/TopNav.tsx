import React, { useState } from 'react';
import { 
  Bell, HelpCircle, User, Menu, Shield, Radio, Check, 
  ExternalLink, LogOut, ChevronDown 
} from 'lucide-react';
import { useSecurity } from '../context/SecurityContext';

interface TopNavProps {
  pageTitle: string;
  setMobileOpen: (open: boolean) => void;
  setCurrentTab: (tab: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  pageTitle,
  setMobileOpen,
  setCurrentTab,
}) => {
  const { monitoringState, alerts, currentUser, logoutUser } = useSecurity();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const activeAlerts = alerts.filter(a => a.status === 'active');

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#111827]/90 backdrop-blur-md border-b border-slate-800 px-4 md:px-6 flex items-center justify-between">
      {/* Left title and mobile trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg md:text-xl font-bold text-slate-100 flex items-center gap-2">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Monitoring Status Indicator pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs">
          <span className="relative flex h-2 w-2">
            {monitoringState.isActive ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
            )}
          </span>
          <span className="text-slate-300 font-medium">
            {monitoringState.isActive ? 'Monitoring Active' : 'Standby'}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-500/30 font-mono">
            {monitoringState.mode}
          </span>
        </div>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifMenu(!showNotifMenu);
              setShowProfileMenu(false);
            }}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {activeAlerts.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            )}
          </button>

          {/* Quick Notification dropdown */}
          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#111827] border border-slate-700 shadow-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">Active Security Alerts</span>
                <span className="text-xs text-amber-400 font-mono">{activeAlerts.length} active</span>
              </div>

              <div className="max-h-64 overflow-y-auto divide-y divide-slate-800/60">
                {activeAlerts.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No active alerts. System healthy.
                  </div>
                ) : (
                  activeAlerts.map(alert => (
                    <div
                      key={alert.id}
                      onClick={() => {
                        setCurrentTab('alerts');
                        setShowNotifMenu(false);
                      }}
                      className="p-3 hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <p className="text-xs font-semibold text-slate-200 truncate">{alert.title}</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{alert.details}</p>
                      <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                        {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="p-2 border-t border-slate-800 text-center">
                <button
                  onClick={() => {
                    setCurrentTab('alerts');
                    setShowNotifMenu(false);
                  }}
                  className="text-xs text-sky-400 hover:text-sky-300 font-medium"
                >
                  View All Alerts in Inbox →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help button */}
        <button
          onClick={() => setCurrentTab('help')}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          title="Help & Educational Guide"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* User profile avatar / menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifMenu(false);
            }}
            className="flex items-center gap-2 p-1.5 pl-2.5 rounded-lg hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold text-xs">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span className="hidden lg:block text-xs font-medium text-slate-300 max-w-[120px] truncate">
              {currentUser?.name || 'Operator'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {/* User menu dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#111827] border border-slate-700 shadow-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-800">
                <p className="text-xs font-semibold text-slate-200">{currentUser?.name || 'Security Operator'}</p>
                <p className="text-[11px] text-slate-500 truncate">{currentUser?.email || 'demo@sentinelmesh.local'}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setCurrentTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" /> Account & Preferences
                </button>
                <button
                  onClick={() => {
                    setCurrentTab('hardware');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                >
                  <Radio className="w-3.5 h-3.5 text-slate-400" /> Hardware Interface
                </button>
              </div>
              <div className="pt-1 border-t border-slate-800">
                <button
                  onClick={() => {
                    logoutUser();
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-slate-800/80 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out (Demo Session)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
