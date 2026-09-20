import React from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Github,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { ThemeToggle } from './ThemeToggle';
import { PWAInstallButton } from './PWAInstallButton';

export const Header: React.FC = () => {
  const { toggleSidebar, setCommandPaletteOpen } = useAppStore();

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 px-3 sm:px-6 backdrop-blur-md">
      {/* Left section: Drawer trigger + Logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle navigation drawer"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 lg:hidden cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs group-hover:bg-indigo-500 transition-colors">
            <Terminal className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              DEV-TOOLBOX
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 font-mono font-medium">
                FREE
              </span>
            </span>
          </div>
        </Link>
      </div>

      {/* Center section: Command Palette Trigger */}
      <div className="flex-1 max-w-md mx-3 sm:mx-6">
        <button
          type="button"
          onClick={() => setCommandPaletteOpen(true)}
          className="flex h-9 w-full items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 px-3 text-xs text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">Search utilities, encoders, hashes...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] font-medium text-slate-500 dark:text-slate-400">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Right section: PWA install, Privacy indicator, Theme, Github */}
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span className="font-medium text-[11px]">100% Client-Side</span>
        </div>

        <PWAInstallButton />

        <ThemeToggle />

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="GitHub Repository"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 transition-colors"
        >
          <Github className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
};
