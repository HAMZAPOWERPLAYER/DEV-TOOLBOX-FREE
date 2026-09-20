import React, { useState } from 'react';
import { Palette, Pipette } from 'lucide-react';
import { ToolLayout } from '@/components/shared/ToolLayout';
import { CopyButton } from '@/components/shared/CopyButton';
import { Button } from '@/components/ui/button';

export const ColorPicker: React.FC = () => {
  const [hex, setHex] = useState<string>('#6366f1');

  // Convert hex to RGB
  const hexToRgb = (h: string) => {
    let clean = h.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map((c) => c + c).join('');
    }
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const rgb = hexToRgb(hex);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  // Calculate luminance & contrast vs white & black
  const luminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const lum = luminance(rgb.r, rgb.g, rgb.b);
  const contrastWhite = (1 + 0.05) / (lum + 0.05);
  const contrastBlack = (lum + 0.05) / (0 + 0.05);

  return (
    <ToolLayout
      toolId="color-picker"
      title="Color Converter & Contrast Checker"
      description="Inspect colors across HEX, RGB, and HSL formats and check WCAG contrast ratios."
      icon={Palette}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Color preview card */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col items-center">
          <div
            className="w-full h-44 rounded-xl shadow-inner border border-black/10 dark:border-white/10 flex items-center justify-center transition-colors"
            style={{ backgroundColor: hex }}
          >
            <span
              className="text-lg font-bold font-mono px-3 py-1 rounded bg-black/20 text-white backdrop-blur-xs"
            >
              {hex.toUpperCase()}
            </span>
          </div>

          <div className="mt-6 flex items-center gap-3 w-full">
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-12 h-10 rounded cursor-pointer border border-slate-300 dark:border-slate-700 bg-transparent"
            />
            <input
              type="text"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs uppercase"
            />
          </div>
        </div>

        {/* Formats and contrast */}
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Color Formats
            </h4>
            {[
              { label: 'HEX', val: hex.toUpperCase() },
              { label: 'RGB', val: rgbString },
              { label: 'CSS Var', val: `--primary: ${hex};` },
            ].map((fmt) => (
              <div
                key={fmt.label}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60"
              >
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">{fmt.label}</span>
                  <span className="text-xs font-mono font-medium text-slate-800 dark:text-slate-200">
                    {fmt.val}
                  </span>
                </div>
                <CopyButton value={fmt.val} />
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              WCAG Contrast Ratios
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950">
                <span className="text-xs text-slate-500 block">Against White</span>
                <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                  {contrastWhite.toFixed(2)}:1
                </span>
                <span className="text-[10px] block mt-0.5 text-emerald-500 font-semibold">
                  {contrastWhite >= 4.5 ? 'WCAG AA Pass' : 'WCAG Fail'}
                </span>
              </div>
              <div className="p-3 rounded-lg border border-slate-200/60 dark:border-slate-800/60 bg-slate-900 text-white">
                <span className="text-xs text-slate-400 block">Against Black</span>
                <span className="text-lg font-bold font-mono">
                  {contrastBlack.toFixed(2)}:1
                </span>
                <span className="text-[10px] block mt-0.5 text-emerald-400 font-semibold">
                  {contrastBlack >= 4.5 ? 'WCAG AA Pass' : 'WCAG Fail'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default ColorPicker;
