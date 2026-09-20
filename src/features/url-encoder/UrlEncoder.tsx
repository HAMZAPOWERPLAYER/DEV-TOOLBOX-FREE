import React, { useState } from 'react';
import { Link2, ArrowDownUp } from 'lucide-react';
import { ToolLayout } from '@/components/shared/ToolLayout';
import { CopyButton } from '@/components/shared/CopyButton';
import { Button } from '@/components/ui/button';

export const UrlEncoder: React.FC = () => {
  const [input, setInput] = useState<string>('https://example.com/search?query=react+tools&filter=developer tools#section');
  const [output, setOutput] = useState<string>('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodeFull, setEncodeFull] = useState<boolean>(false);

  React.useEffect(() => {
    try {
      if (!input) {
        setOutput('');
        return;
      }
      if (mode === 'encode') {
        setOutput(encodeFull ? encodeURIComponent(input) : encodeURI(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setOutput('Invalid URL string for decoding');
    }
  }, [input, mode, encodeFull]);

  // Query parameter parser breakdown
  const getQueryParams = () => {
    try {
      const url = new URL(input);
      const params: { key: string; value: string }[] = [];
      url.searchParams.forEach((val, key) => {
        params.push({ key, value: val });
      });
      return { origin: url.origin, pathname: url.pathname, params };
    } catch {
      return null;
    }
  };

  const parsed = getQueryParams();

  return (
    <ToolLayout
      toolId="url-encoder"
      title="URL Encoder & Query Parameter Parser"
      description="Encode and decode URLs, inspect parameters, and analyze query strings."
      icon={Link2}
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant={mode === 'encode' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('encode')}
          >
            Encode
          </Button>
          <Button
            variant={mode === 'decode' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('decode')}
          >
            Decode
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col h-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <span className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
              Input URL
            </span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 w-full font-mono text-xs bg-transparent text-slate-800 dark:text-slate-200 resize-none outline-none"
              placeholder="Enter URL to encode or decode..."
            />
          </div>

          <div className="flex flex-col h-64 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {mode === 'encode' ? 'Encoded URL' : 'Decoded URL'}
              </span>
              <CopyButton value={output} />
            </div>
            <textarea
              readOnly
              value={output}
              className="flex-1 w-full font-mono text-xs bg-slate-50/50 dark:bg-slate-950/40 text-slate-800 dark:text-slate-200 resize-none outline-none"
            />
          </div>
        </div>

        {parsed && parsed.params.length > 0 && (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Query Parameter Breakdown ({parsed.params.length})
            </h4>
            <div className="space-y-2">
              {parsed.params.map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950/60 font-mono text-xs border border-slate-200/60 dark:border-slate-800/60"
                >
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{p.key}</span>
                  <span className="text-slate-700 dark:text-slate-300">{p.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default UrlEncoder;
