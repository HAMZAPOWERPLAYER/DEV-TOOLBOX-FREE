import React, { useState } from 'react';
import { Braces, Check, Copy, Trash2, ArrowDownUp, Minimize2 } from 'lucide-react';
import { ToolLayout } from '@/components/shared/ToolLayout';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/shared/CopyButton';
import { toast } from 'sonner';

export const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState<string>('{\n  "name": "dev-toolbox",\n  "version": "1.0.0",\n  "privacy": true,\n  "features": ["json", "jwt", "hash", "regex"]\n}');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState<number>(2);

  const formatJson = (sortKeys = false, minify = false) => {
    try {
      if (!input.trim()) {
        setOutput('');
        setError(null);
        return;
      }
      let parsed = JSON.parse(input);

      if (sortKeys && typeof parsed === 'object' && parsed !== null) {
        const sortObj = (obj: unknown): unknown => {
          if (Array.isArray(obj)) return obj.map(sortObj);
          if (typeof obj === 'object' && obj !== null) {
            return Object.keys(obj as Record<string, unknown>)
              .sort()
              .reduce((acc, key) => {
                acc[key] = sortObj((obj as Record<string, unknown>)[key]);
                return acc;
              }, {} as Record<string, unknown>);
          }
          return obj;
        };
        parsed = sortObj(parsed);
      }

      const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setOutput('');
    }
  };

  React.useEffect(() => {
    formatJson();
  }, [input, indent]);

  return (
    <ToolLayout
      toolId="json-formatter"
      title="JSON Formatter & Validator"
      description="Prettify, validate, sort keys, minify, and inspect JSON with instantaneous client-side parsing."
      icon={Braces}
      actions={
        <div className="flex items-center gap-1.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => formatJson(true, false)}
            className="text-xs"
          >
            <ArrowDownUp className="w-3.5 h-3.5 mr-1" />
            Sort Keys
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => formatJson(false, true)}
            className="text-xs"
          >
            <Minimize2 className="w-3.5 h-3.5 mr-1" />
            Minify
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setInput('');
              setOutput('');
              setError(null);
            }}
            className="text-xs"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            Clear
          </Button>
        </div>
      }
      shortcuts={[
        { key: 'Tab', description: 'Indent' },
        { key: '⌘ + V', description: 'Paste JSON' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
        {/* Input Panel */}
        <div className="flex flex-col h-[500px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Input JSON</span>
            <div className="flex items-center gap-2">
              <span>Indent:</span>
              <select
                value={indent}
                onChange={(e) => setIndent(Number(e.target.value))}
                className="bg-transparent text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-800 px-1 py-0.5 text-xs outline-none"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={1}>Tab</option>
              </select>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            spellCheck={false}
            className="flex-1 w-full p-4 font-mono text-xs leading-relaxed bg-transparent text-slate-800 dark:text-slate-200 resize-none outline-none focus:ring-1 focus:ring-indigo-500/50"
          />
        </div>

        {/* Output Panel */}
        <div className="flex flex-col h-[500px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Output</span>
              {error ? (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                  Invalid JSON
                </span>
              ) : output ? (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  Valid JSON
                </span>
              ) : null}
            </div>
            <CopyButton value={output} />
          </div>

          <div className="flex-1 relative overflow-auto p-4 bg-slate-50/50 dark:bg-slate-950/40">
            {error ? (
              <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 font-mono text-xs">
                {error}
              </div>
            ) : output ? (
              <pre className="font-mono text-xs text-slate-800 dark:text-slate-200 whitespace-pre leading-relaxed">
                {output}
              </pre>
            ) : (
              <div className="text-xs text-slate-400 flex items-center justify-center h-full">
                Formatted output will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default JsonFormatter;
