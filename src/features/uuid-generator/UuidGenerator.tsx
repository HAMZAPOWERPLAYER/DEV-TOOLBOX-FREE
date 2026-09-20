import React, { useState } from 'react';
import { Fingerprint, RefreshCw } from 'lucide-react';
import { ToolLayout } from '@/components/shared/ToolLayout';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/shared/CopyButton';

export const UuidGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [noDashes, setNoDashes] = useState<boolean>(false);

  const generateUuids = () => {
    const list: string[] = [];
    for (let i = 0; i < count; i++) {
      let id: string = crypto.randomUUID();
      if (noDashes) id = id.replace(/-/g, '');
      if (uppercase) id = id.toUpperCase();
      list.push(id);
    }
    setUuids(list);
  };

  React.useEffect(() => {
    generateUuids();
  }, [count, uppercase, noDashes]);

  return (
    <ToolLayout
      toolId="uuid-generator"
      title="UUID & Identifier Generator"
      description="Bulk generate RFC 4122 compliant UUID v4 IDs using cryptographically secure native random values."
      icon={Fingerprint}
      actions={
        <Button size="sm" onClick={generateUuids} className="text-xs">
          <RefreshCw className="w-3.5 h-3.5 mr-1" />
          Regenerate
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600 dark:text-slate-400">Count:</span>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
              className="w-16 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 bg-transparent text-center font-mono"
            />
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Uppercase</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={noDashes}
              onChange={(e) => setNoDashes(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Hyphenless</span>
          </label>

          <div className="ml-auto">
            <CopyButton value={uuids.join('\n')} label="Copy All" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800/60">
          {uuids.map((id, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 px-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-medium select-all">
                {id}
              </span>
              <CopyButton value={id} />
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
};

export default UuidGenerator;
