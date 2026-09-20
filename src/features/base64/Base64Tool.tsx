import React, { useState } from 'react';
import { Binary, ArrowDownUp, Upload } from 'lucide-react';
import { ToolLayout } from '@/components/shared/ToolLayout';
import { CopyButton } from '@/components/shared/CopyButton';
import { Button } from '@/components/ui/button';

export const Base64Tool: React.FC = () => {
  const [input, setInput] = useState<string>('Hello Dev-Toolbox! 🚀');
  const [output, setOutput] = useState<string>('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [urlSafe, setUrlSafe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    try {
      if (!input) {
        setOutput('');
        setError(null);
        return;
      }
      if (mode === 'encode') {
        const utf8Bytes = new TextEncoder().encode(input);
        let binaryStr = '';
        for (let i = 0; i < utf8Bytes.length; i++) {
          binaryStr += String.fromCharCode(utf8Bytes[i]);
        }
        let b64 = btoa(binaryStr);
        if (urlSafe) {
          b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }
        setOutput(b64);
        setError(null);
      } else {
        let b64 = input.trim();
        if (urlSafe) {
          b64 = b64.replace(/-/g, '+').replace(/_/g, '/');
          while (b64.length % 4) b64 += '=';
        }
        const binaryStr = atob(b64);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        setOutput(new TextDecoder().decode(bytes));
        setError(null);
      }
    } catch (e) {
      setError('Invalid Base64 input for decoding');
      setOutput('');
    }
  }, [input, mode, urlSafe]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64Data = dataUrl.split(',')[1] || '';
      setInput(base64Data);
      setMode('decode');
    };
    reader.readAsDataURL(file);
  };

  return (
    <ToolLayout
      toolId="base64"
      title="Base64 Text & File Encoder / Decoder"
      description="Encode and decode text or files to/from Base64 with optional URL-safe formatting."
      icon={Binary}
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
      <div className="space-y-4">
        <div className="flex items-center gap-4 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-slate-700 dark:text-slate-300">URL-safe format (- and _ instead of + and /)</span>
          </label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col h-80 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
            <span className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
              {mode === 'encode' ? 'Plaintext' : 'Base64 Input'}
            </span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text..."
              className="flex-1 w-full p-2 font-mono text-xs bg-transparent text-slate-800 dark:text-slate-200 resize-none outline-none"
            />
          </div>

          <div className="flex flex-col h-80 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {mode === 'encode' ? 'Base64 Output' : 'Decoded Plaintext'}
              </span>
              <CopyButton value={output} />
            </div>
            {error ? (
              <div className="p-3 text-xs font-mono text-rose-500 bg-rose-50 dark:bg-rose-950/30 rounded-lg">
                {error}
              </div>
            ) : (
              <textarea
                readOnly
                value={output}
                placeholder="Result appears here..."
                className="flex-1 w-full p-2 font-mono text-xs bg-slate-50/50 dark:bg-slate-950/40 text-slate-800 dark:text-slate-200 resize-none outline-none"
              />
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default Base64Tool;
