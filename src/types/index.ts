import type { LucideIcon } from 'lucide-react';
import type { ComponentType, LazyExoticComponent } from 'react';

export type ToolCategory = 'encoding' | 'crypto' | 'text' | 'web' | 'generators' | 'converters';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  keywords: string[];
  icon: LucideIcon;
  path: string;
  // Component supports lazy loaded or direct FC components
  component: LazyExoticComponent<ComponentType<any>> | ComponentType<any>;
  shortcut?: string;
  popular?: boolean;
}

export type ThemeMode = 'dark' | 'light' | 'system';

export interface CategoryInfo {
  id: ToolCategory;
  label: string;
  iconName: string;
  description: string;
}
