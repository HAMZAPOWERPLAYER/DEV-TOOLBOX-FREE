import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Star,
  Clock,
  ShieldCheck,
  LayoutGrid,
} from 'lucide-react';
import { TOOLS, CATEGORIES } from '@/lib/tool-registry';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const {
    sidebarCollapsed,
    toggleSidebar,
    setSidebarCollapsed,
    recentToolIds,
    favoriteToolIds,
  } = useAppStore();

  const favoriteTools = TOOLS.filter((t) => favoriteToolIds.includes(t.id));
  const recentTools = recentToolIds
    .map((id) => TOOLS.find((t) => t.id === id))
    .filter((t): t is (typeof TOOLS)[0] => Boolean(t));

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity lg:hidden',
          sidebarCollapsed ? 'pointer-events-none opacity-0' : 'opacity-100'
        )}
        onClick={() => setSidebarCollapsed(true)}
      />

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed top-14 bottom-0 left-0 z-40 flex flex-col border-r border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 transition-all duration-300 ease-in-out',
          'lg:static lg:top-0',
          sidebarCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-16' : 'translate-x-0 w-64'
        )}
      >
        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {/* Main Home Link */}
          <div>
            <NavLink
              to="/"
              onClick={() => {
                if (window.innerWidth < 1024) setSidebarCollapsed(true);
              }}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors',
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200'
                )
              }
            >
              <LayoutGrid className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span>All Tools ({TOOLS.length})</span>}
            </NavLink>
          </div>

          {/* Favorites (if any) */}
          {favoriteTools.length > 0 && (
            <div>
              {!sidebarCollapsed && (
                <div className="flex items-center gap-1.5 px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-500">
                  <Star className="w-3 h-3 fill-amber-500" />
                  <span>Favorites</span>
                </div>
              )}
              <div className="space-y-0.5">
                {favoriteTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <NavLink
                      key={tool.id}
                      to={tool.path}
                      title={tool.name}
                      onClick={() => {
                        if (window.innerWidth < 1024) setSidebarCollapsed(true);
                      }}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs transition-colors',
                          isActive
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200'
                        )
                      }
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      {!sidebarCollapsed && <span className="truncate">{tool.name}</span>}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          )}

          {/* Categories and Tools */}
          {CATEGORIES.map((cat) => {
            const catTools = TOOLS.filter((t) => t.category === cat.id);
            return (
              <div key={cat.id}>
                {!sidebarCollapsed && (
                  <div className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {cat.label}
                  </div>
                )}
                <div className="space-y-0.5">
                  {catTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <NavLink
                        key={tool.id}
                        to={tool.path}
                        title={tool.name}
                        onClick={() => {
                          if (window.innerWidth < 1024) setSidebarCollapsed(true);
                        }}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs transition-colors',
                            isActive
                              ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-medium'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200'
                          )
                        }
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        {!sidebarCollapsed && <span className="truncate">{tool.name}</span>}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer / Collapse toggle on desktop */}
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium truncate">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Offline Ready</span>
            </div>
          )}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors ml-auto cursor-pointer"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
};
