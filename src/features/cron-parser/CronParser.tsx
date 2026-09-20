import React, { useState } from 'react';
import { CalendarClock, Play } from 'lucide-react';
import { ToolLayout } from '@/components/shared/ToolLayout';
import { Button } from '@/components/ui/button';

export const CronParser: React.FC = () => {
  const [expression, setExpression] = useState<string>('*/15 * * * *');

  const presets = [
    { label: 'Every 15 minutes', exp: '*/15 * * * *' },
    { label: 'Every hour at :00', exp: '0 * * * *' },
    { label: 'Every midnight', exp: '0 0 * * *' },
    { label: 'Every Monday 9 AM', exp: '0 9 * * 1' },
    { label: '1st of every month', exp: '0 0 1 * *' },
  ];

  // Human description approximation
  const describeCron = (exp: string) => {
    const parts = exp.trim().split(/\s+/);
    if (parts.length !== 5) return 'Invalid 5-field cron format (minute hour day month day-of-week)';

    const [min, hour, dom, mon, dow] = parts;
    return `Runs at minute [${min}], hour [${hour}], day-of-month [${dom}], month [${mon}], day-of-week [${dow}]`;
  };

  return (
    <ToolLayout
      toolId="cron-parser"
      title="Cron Schedule Expression Parser"
      description="Inspect standard 5-part cron expressions with plain English explanations and presets."
      icon={CalendarClock}
    >
      <div className="space-y-6 max-w-3xl">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Cron Expression (5-Fields)
          </label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-base font-bold text-indigo-600 dark:text-indigo-400 outline-none"
          />

          <div className="flex flex-wrap gap-2 pt-1">
            {presets.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setExpression(p.exp)}
                className="px-2.5 py-1 text-xs rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/30 dark:bg-indigo-950/20 p-5 space-y-2">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
            Human Description
          </span>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {describeCron(expression)}
          </p>
        </div>
      </div>
    </ToolLayout>
  );
};

export default CronParser;
