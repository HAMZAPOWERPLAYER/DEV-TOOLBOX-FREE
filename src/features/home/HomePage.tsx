import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { Search, ShieldCheck, Sparkles, Clock, Star, Terminal } from 'lucide-react';
import { TOOLS, CATEGORIES } from '@/lib/tool-registry';
import { ToolCard } from '@/components/shared/ToolCard';
import { useAppStore } from '@/lib/store';
import type { Tool, ToolCategory } from '@/types';
import { cn } from '@/lib/utils';

export const HomePage: React.FC = () => {
  const { recentToolIds, favoriteToolIds, setCommandPaletteOpen } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');

  const fuse = useMemo(() => {
    return new Fuse(TOOLS, {
      keys: ['name', 'description', 'keywords', 'category'],
      threshold: 0.35,
    });
  }, []);

  const filteredTools = useMemo(() => {
    let list: Tool[] = TOOLS;

    if (searchQuery.trim()) {
      list = fuse.search(searchQuery).map((r) => r.item);
    }

    if (selectedCategory !== 'all') {
      list = list.filter((t) => t.category === selectedCategory);
    }

    return list;
  }, [searchQuery, selectedCategory, fuse]);

  const recentTools = useMemo(() => {
    return recentToolIds
      .map((id) => TOOLS.find((t) => t.id === id))
      .filter((t): t is Tool => Boolean(t));
  }, [recentToolIds]);

  const favoriteTools = useMemo(() => {
    return favoriteToolIds
      .map((id) => TOOLS.find((t) => t.id === id))
      .filter((t): t is Tool => Boolean(t));
  }, [favoriteToolIds]);

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* Hero section */}
      <div className="flex flex-col items-center text-center space-y-3 pt-2 sm:pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Zero Server Calls • 100% In-Browser Privacy</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Developer Toolbox <span className="text-indigo-600 dark:text-indigo-400">Free</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          The offline-first developer suite for encoding, formatting, cryptographic hashing, and utilities.
          Your inputs and secrets never leave your browser.
        </p>

        {/* Global Search Input */}
        <div className="w-full max-w-2xl mt-4 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools by name, utility, or keywords (Press ⌘K)..."
            className="w-full pl-12 pr-24 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 shadow-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all"
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[11px] font-mono text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer"
            >
              <span>⌘K</span>
            </button>
          </div>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer',
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            )}
          >
            All Utilities ({TOOLS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer',
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                )}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Favorites Section (if any) */}
      {!searchQuery && selectedCategory === 'all' && favoriteTools.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
            <Star className="w-4 h-4 fill-amber-500" />
            <span>Pinned Favorites ({favoriteTools.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Used Section (if any) */}
      {!searchQuery && selectedCategory === 'all' && recentTools.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <Clock className="w-4 h-4" />
            <span>Recently Used</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentTools.slice(0, 3).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* Tools Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>
              {selectedCategory === 'all' ? 'All Developer Tools' : `${selectedCategory} Tools`} (
              {filteredTools.length})
            </span>
          </div>
        </div>

        {filteredTools.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-white/50 dark:bg-slate-900/30">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              No developer tools found matching your query.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Try searching with another keyword or reset the category filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </section>

      {/* Privacy Guarantee Banner at bottom */}
      <div className="rounded-2xl border border-indigo-100 dark:border-indigo-900/40 bg-gradient-to-r from-indigo-50/50 via-slate-50 to-indigo-50/50 dark:from-indigo-950/20 dark:via-slate-900/50 dark:to-indigo-950/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Your Data Never Leaves Your Device
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              100% Client-side. No backend APIs, no telemetry, no cookies, and no tracking scripts.
              Safely parse production tokens, hashes, and configurations offline.
            </p>
          </div>
        </div>
      </div>

      {/* Author & Open Source Credit Footer */}
      <footer className="pt-4 pb-8 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>Created & Architected by</span>
          <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">HAMZAPOWERPLAYER</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <a
            href="mailto:hamzapowerplayer.global@gmail.com"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            hamzapowerplayer.global@gmail.com
          </a>
          <span>•</span>
          <span>MIT Licensed</span>
          <span>•</span>
          <span>Zero Tracking</span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
