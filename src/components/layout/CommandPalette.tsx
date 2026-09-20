import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Search, ArrowRight, CornerDownLeft, Star, Clock } from 'lucide-react';
import { TOOLS } from '@/lib/tool-registry';
import { useAppStore } from '@/lib/store';
import { useHotkeys } from '@/hooks/useHotkeys';
import type { Tool } from '@/types';
import { cn } from '@/lib/utils';

export const CommandPalette: React.FC = () => {
  const navigate = useNavigate();
  const { commandPaletteOpen, setCommandPaletteOpen, recentToolIds, addRecentTool } =
    useAppStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut toggle ⌘K
  useHotkeys('mod+k', (e) => {
    e.preventDefault();
    setCommandPaletteOpen(!commandPaletteOpen);
  });

  useHotkeys('escape', () => {
    if (commandPaletteOpen) {
      setCommandPaletteOpen(false);
    }
  });

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  // Fuzzy search config
  const fuse = React.useMemo(() => {
    return new Fuse(TOOLS, {
      keys: ['name', 'description', 'keywords', 'category'],
      threshold: 0.35,
    });
  }, []);

  const results: Tool[] = React.useMemo(() => {
    if (!query.trim()) {
      // If no query, show recents first, then popular
      const recents = recentToolIds
        .map((id) => TOOLS.find((t) => t.id === id))
        .filter((t): t is Tool => Boolean(t));
      const popular = TOOLS.filter((t) => t.popular && !recentToolIds.includes(t.id));
      const combined = [...recents, ...popular];
      return combined.length > 0 ? combined.slice(0, 8) : TOOLS.slice(0, 8);
    }
    return fuse.search(query).map((res) => res.item);
  }, [query, fuse, recentToolIds]);

  // Navigate on enter
  const handleSelect = (tool: Tool) => {
    addRecentTool(tool.id);
    setCommandPaletteOpen(false);
    navigate(tool.path);
  };

  // Keyboard navigation up/down
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    }
  };

  if (!commandPaletteOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-xs"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input header */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a tool name or keyword (e.g. 'json', 'jwt', 'hash')..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 outline-none"
          />
          <kbd className="px-1.5 py-0.5 font-mono text-[10px] rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100/60 dark:divide-slate-800/40">
          {results.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching developer tools found for "{query}"
            </div>
          ) : (
            results.map((tool, index) => {
              const Icon = tool.icon;
              const isSelected = index === selectedIndex;
              const isRecent = recentToolIds.includes(tool.id) && !query;

              return (
                <div
                  key={tool.id}
                  onClick={() => handleSelect(tool)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    'flex items-center justify-between px-3 py-2.5 rounded-xl text-xs cursor-pointer transition-colors',
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-100'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="font-semibold flex items-center gap-1.5">
                        <span>{tool.name}</span>
                        {isRecent && (
                          <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" /> Recent
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded uppercase font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {tool.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-indigo-500" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              Use <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px]">↑</kbd>{' '}
              <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px]">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px]">↵</kbd> to open
            </span>
          </div>
          <span className="text-emerald-500 font-medium">100% Offline</span>
        </div>
      </div>
    </div>
  );
};
