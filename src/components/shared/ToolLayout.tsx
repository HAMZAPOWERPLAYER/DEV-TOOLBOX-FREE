import React from 'react';
import { LucideIcon, ShieldCheck, Star } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ToolLayoutProps {
  toolId: string;
  title: string;
  description: string;
  icon: LucideIcon;
  actions?: React.ReactNode;
  children: React.ReactNode;
  shortcuts?: { key: string; description: string }[];
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({
  toolId,
  title,
  description,
  icon: Icon,
  actions,
  children,
  shortcuts = [],
}) => {
  const { favoriteToolIds, toggleFavoriteTool } = useAppStore();
  const isFavorite = favoriteToolIds.includes(toolId);

  return (
    <div className="flex flex-col flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/20 dark:from-indigo-500/20 dark:to-indigo-600/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {title}
              </h1>
              <button
                type="button"
                onClick={() => toggleFavoriteTool(toolId)}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                className={cn(
                  'p-1 rounded-md transition-colors hover:bg-slate-100 dark:hover:bg-slate-800',
                  isFavorite ? 'text-amber-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                )}
              >
                <Star className={cn('w-4 h-4', isFavorite && 'fill-amber-500')} />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {description}
            </p>
          </div>
        </div>

        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>

      {/* Main Workspace */}
      <div className="flex-1 w-full min-h-[400px] flex flex-col">{children}</div>

      {/* Footer with shortcuts & privacy assurance */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>Client-only: zero telemetry, 100% computed in your browser</span>
        </div>

        {shortcuts.length > 0 && (
          <div className="flex items-center gap-3 flex-wrap justify-end">
            <span className="text-slate-400">Shortcuts:</span>
            {shortcuts.map((sc) => (
              <div key={sc.key} className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  {sc.key}
                </kbd>
                <span className="text-[11px] text-slate-500">{sc.description}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
