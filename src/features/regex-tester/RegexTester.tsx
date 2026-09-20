import React, { useState } from 'react';
import { Regex, Sparkles } from 'lucide-react';
import { ToolLayout } from '@/components/shared/ToolLayout';

export const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState<string>('([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})');
  const [flags, setFlags] = useState<string>('g');
  const [text, setText] = useState<string>(
    'Contact support@dev-toolbox.com or admin@example.org for offline tools.'
  );

  const getMatches = () => {
    try {
      if (!pattern) return [];
      const regex = new RegExp(pattern, flags);
      const matches = Array.from(text.matchAll(regex));
      return matches.map((m, idx) => ({
        id: idx,
        match: m[0],
        index: m.index,
        groups: m.slice(1),
      }));
    } catch {
      return null;
    }
  };

  const matches = getMatches();

  return (
    <ToolLayout
      toolId="regex-tester"
      title="Regular Expression Tester"
      description="Test, debug, and visualize regex matches with capture groups and flags."
      icon={Regex}
    >
      <div className="space-y-6">
        {/* Pattern & Flags */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 w-full flex items-center rounded-lg border border-slate-200 dark:border-slate-800 px-3 bg-slate-50 dark:bg-slate-950/60 font-mono text-sm">
              <span className="text-slate-400 select-none">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Regular expression pattern"
                className="w-full bg-transparent px-2 py-2 outline-none text-indigo-600 dark:text-indigo-400"
              />
              <span className="text-slate-400 select-none">/</span>
              <input
                type="text"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                placeholder="flags"
                className="w-16 bg-transparent px-1 py-2 text-slate-500 outline-none text-center"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Test String
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to match against..."
              className="w-full h-32 p-3 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 resize-none outline-none focus:ring-1 focus:ring-indigo-500/50"
            />
          </div>
        </div>

        {/* Results */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Match Results ({matches ? matches.length : 0})
            </span>
          </div>

          {matches === null ? (
            <p className="text-xs text-rose-500 font-mono">Invalid Regular Expression syntax.</p>
          ) : matches.length === 0 ? (
            <p className="text-xs text-slate-400">No matches found in the test string.</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {matches.map((m) => (
                <div
                  key={m.id}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-500 font-semibold">#{m.id + 1}:</span>
                    <span className="bg-indigo-100 dark:bg-indigo-950 px-1.5 py-0.5 rounded text-indigo-700 dark:text-indigo-300">
                      {m.match}
                    </span>
                    <span className="text-slate-400 text-[11px]">at index {m.index}</span>
                  </div>
                  {m.groups.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-slate-400 text-[10px]">Groups:</span>
                      {m.groups.map((g, gi) => (
                        <span key={gi} className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[11px]">
                          ${gi + 1}: {g}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default RegexTester;
