import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Star } from 'lucide-react';
import type { Tool } from '@/types';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { favoriteToolIds, toggleFavoriteTool, addRecentTool } = useAppStore();
  const isFavorite = favoriteToolIds.includes(tool.id);
  const Icon = tool.icon;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavoriteTool(tool.id);
  };

  return (
    <Link
      to={tool.path}
      onClick={() => addRecentTool(tool.id)}
      className="group relative flex flex-col justify-between p-5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/70 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center transition-transform group-hover:scale-110 duration-200">
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant="outline" className="text-[10px] capitalize">
              {tool.category}
            </Badge>
            <button
              type="button"
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              className={cn(
                'p-1 rounded transition-colors hover:bg-slate-100 dark:hover:bg-slate-800',
                isFavorite ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600 hover:text-slate-400'
              )}
            >
              <Star className={cn('w-4 h-4', isFavorite && 'fill-amber-500')} />
            </button>
          </div>
        </div>

        <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm flex items-center justify-between">
          <span>{tool.name}</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-indigo-500" />
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
        <span className="font-mono text-slate-400 dark:text-slate-500">{tool.path}</span>
        {tool.shortcut && (
          <kbd className="px-1.5 py-0.5 font-mono text-[10px] rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {tool.shortcut}
          </kbd>
        )}
      </div>
    </Link>
  );
};
