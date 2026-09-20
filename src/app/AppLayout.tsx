import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { CommandPalette } from '@/components/layout/CommandPalette';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { useAppStore, applyThemeToDOM } from '@/lib/store';

export const AppLayout: React.FC = () => {
  const { theme } = useAppStore();
  const location = useLocation();

  React.useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  // Scroll to top on route navigation
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans">
      {/* Sticky Header */}
      <Header />

      {/* Main Workspace with Sidebar */}
      <div className="flex-1 flex w-full">
        <Sidebar />

        <main className="flex-1 min-w-0 flex flex-col overflow-x-hidden">
          <ErrorBoundary>
            <React.Suspense
              fallback={
                <div className="flex-1 flex items-center justify-center p-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
                    <span className="text-xs text-slate-400 font-mono">Loading developer tool...</span>
                  </div>
                </div>
              }
            >
              <Outlet />
            </React.Suspense>
          </ErrorBoundary>
        </main>
      </div>

      {/* Command Palette Modal */}
      <CommandPalette />

      {/* Global Toast Container */}
      <Toaster
        richColors
        closeButton
        position="bottom-right"
        theme={theme === 'dark' ? 'dark' : 'light'}
      />
    </div>
  );
};
