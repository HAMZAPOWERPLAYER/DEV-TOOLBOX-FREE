import React, { useState } from 'react';
import { FileDiff, Split } from 'lucide-react';
import { ToolLayout } from '@/components/shared/ToolLayout';

export const DiffChecker: React.FC = () => {
  const [original, setOriginal] = useState<string>('{\n  "version": 1,\n  "status": "draft",\n  "count": 42\n}');
  const [modified, setModified] = useState<string>('{\n  "version": 2,\n  "status": "published",\n  "count": 42,\n  "offline": true\n}');

  // Simple line-by-line diff computation
  const computeDiff = () => {
    const origLines = original.split('\n');
    const modLines = modified.split('\n');
    const max = Math.max(origLines.length, modLines.length);
    const diffs: { orig?: string; mod?: string; type: 'same' | 'diff' | 'added' | 'removed' }[] = [];

    for (let i = 0; i < max; i++) {
      const o = origLines[i];
      const m = modLines[i];
      if (o === m) {
        diffs.push({ orig: o, mod: m, type: 'same' });
      } else if (o !== undefined && m !== undefined) {
        diffs.push({ orig: o, mod: m, type: 'diff' });
      } else if (o === undefined) {
        diffs.push({ orig: undefined, mod: m, type: 'added' });
      } else {
        diffs.push({ orig: o, mod: undefined, type: 'removed' });
      }
    }
    return diffs;
  };

  const lines = computeDiff();

  return (
    <ToolLayout
      toolId="diff-checker"
      title="Text & Code Diff Checker"
      description="Compare two text snippets or code blocks side-by-side with line-level change highlights."
      icon={FileDiff}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col h-52 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
            <span className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
              Original Text (Left)
            </span>
            <textarea
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              className="flex-1 w-full font-mono text-xs bg-transparent text-slate-800 dark:text-slate-200 resize-none outline-none"
            />
          </div>

          <div className="flex flex-col h-52 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
            <span className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
              Modified Text (Right)
            </span>
            <textarea
              value={modified}
              onChange={(e) => setModified(e.target.value)}
              className="flex-1 w-full font-mono text-xs bg-transparent text-slate-800 dark:text-slate-200 resize-none outline-none"
            />
          </div>
        </div>

        {/* Diff Result */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            <Split className="w-3.5 h-3.5 text-indigo-500" />
            <span>Comparison View</span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono text-xs overflow-x-auto">
            {lines.map((item, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-2 p-2 px-3 gap-4 ${
                  item.type === 'diff'
                    ? 'bg-amber-500/10'
                    : item.type === 'added'
                    ? 'bg-emerald-500/10'
                    : item.type === 'removed'
                    ? 'bg-rose-500/10'
                    : ''
                }`}
              >
                <div className="truncate text-slate-700 dark:text-slate-300">
                  <span className="text-slate-400 select-none mr-2">{idx + 1}</span>
                  {item.orig ?? <span className="text-slate-400 italic">(none)</span>}
                </div>
                <div className="truncate text-slate-700 dark:text-slate-300">
                  <span className="text-slate-400 select-none mr-2">{idx + 1}</span>
                  {item.mod ?? <span className="text-slate-400 italic">(none)</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default DiffChecker;
