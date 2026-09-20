import React, { useState, useEffect } from 'react';
import { Clock, RefreshCw } from 'lucide-react';
import { ToolLayout } from '@/components/shared/ToolLayout';
import { CopyButton } from '@/components/shared/CopyButton';
import { Button } from '@/components/ui/button';

export const TimestampConverter: React.FC = () => {
  const [now, setNow] = useState<Date>(new Date());
  const [timestampInput, setTimestampInput] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [dateInput, setDateInput] = useState<string>(new Date().toISOString().slice(0, 16));

  // Ticker for current time
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentUnixSec = Math.floor(now.getTime() / 1000);
  const currentUnixMs = now.getTime();

  // Parse custom timestamp
  const parseTimestamp = () => {
    const num = Number(timestampInput.trim());
    if (isNaN(num)) return null;
    const date = num > 1e11 ? new Date(num) : new Date(num * 1000);
    return isNaN(date.getTime()) ? null : date;
  };

  const parsedDate = parseTimestamp();

  return (
    <ToolLayout
      toolId="timestamp-converter"
      title="Unix Timestamp & Date Converter"
      description="Convert between Unix timestamps (seconds & ms), ISO-8601 strings, and human-readable dates."
      icon={Clock}
    >
      <div className="space-y-6">
        {/* Live Ticker Card */}
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-mono text-xs">
              LIVE
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                Current Unix Timestamp
              </span>
              <span className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                {currentUnixSec}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CopyButton value={currentUnixSec.toString()} label="Copy Seconds" />
            <CopyButton value={currentUnixMs.toString()} label="Copy Millis" />
          </div>
        </div>

        {/* Timestamp to Date */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Timestamp to Date
          </h4>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={timestampInput}
              onChange={(e) => setTimestampInput(e.target.value)}
              placeholder="e.g. 1716000000"
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm outline-none"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTimestampInput(Math.floor(Date.now() / 1000).toString())}
            >
              Set to Now
            </Button>
          </div>

          {parsedDate ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60">
                <span className="text-[10px] text-slate-400 font-mono block">ISO 8601</span>
                <span className="text-xs font-mono text-slate-800 dark:text-slate-200 font-semibold">
                  {parsedDate.toISOString()}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60">
                <span className="text-[10px] text-slate-400 font-mono block">UTC String</span>
                <span className="text-xs font-mono text-slate-800 dark:text-slate-200 font-semibold">
                  {parsedDate.toUTCString()}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60">
                <span className="text-[10px] text-slate-400 font-mono block">Local Time</span>
                <span className="text-xs font-mono text-slate-800 dark:text-slate-200 font-semibold">
                  {parsedDate.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60">
                <span className="text-[10px] text-slate-400 font-mono block">Relative</span>
                <span className="text-xs font-mono text-slate-800 dark:text-slate-200 font-semibold">
                  {Math.round((parsedDate.getTime() - Date.now()) / (1000 * 60))} mins from now
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-rose-500">Invalid timestamp number.</p>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default TimestampConverter;
