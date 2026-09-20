import { create } from 'zustand';
import type { ThemeMode } from '@/types';

interface AppState {
  theme: ThemeMode;
  sidebarCollapsed: boolean;
  commandPaletteOpen: boolean;
  recentToolIds: string[];
  favoriteToolIds: string[];
  setTheme: (theme: ThemeMode) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  addRecentTool: (toolId: string) => void;
  toggleFavoriteTool: (toolId: string) => void;
}

const STORAGE_THEME_KEY = 'devtoolbox_theme';
const STORAGE_RECENT_KEY = 'devtoolbox_recent';
const STORAGE_FAVORITES_KEY = 'devtoolbox_favorites';

function getStoredValue<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export const useAppStore = create<AppState>((set) => ({
  theme: getStoredValue<ThemeMode>(STORAGE_THEME_KEY, 'dark'),
  sidebarCollapsed: false,
  commandPaletteOpen: false,
  recentToolIds: getStoredValue<string[]>(STORAGE_RECENT_KEY, []),
  favoriteToolIds: getStoredValue<string[]>(STORAGE_FAVORITES_KEY, []),

  setTheme: (theme) => {
    localStorage.setItem(STORAGE_THEME_KEY, JSON.stringify(theme));
    set({ theme });
    applyThemeToDOM(theme);
  },

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),

  addRecentTool: (toolId) => {
    set((state) => {
      const filtered = state.recentToolIds.filter((id) => id !== toolId);
      const updated = [toolId, ...filtered].slice(0, 10);
      localStorage.setItem(STORAGE_RECENT_KEY, JSON.stringify(updated));
      return { recentToolIds: updated };
    });
  },

  toggleFavoriteTool: (toolId) => {
    set((state) => {
      const exists = state.favoriteToolIds.includes(toolId);
      const updated = exists
        ? state.favoriteToolIds.filter((id) => id !== toolId)
        : [...state.favoriteToolIds, toolId];
      localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(updated));
      return { favoriteToolIds: updated };
    });
  },
}));

export function applyThemeToDOM(theme: ThemeMode) {
  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
