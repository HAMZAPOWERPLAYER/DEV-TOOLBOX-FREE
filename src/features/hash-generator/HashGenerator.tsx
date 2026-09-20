import React, { useState, useEffect } from 'react';
import { Hash, Upload, FileText, Check, Copy } from 'lucide-react';
import { ToolLayout } from '@/components/shared/ToolLayout';
import { CopyButton } from '@/components/shared/CopyButton';

export const HashGenerator: React.FC = () => {
  const [text, setText] = useState<string>('Hello, Developer!');
  const [hashes, setHashes] = useState<{ [key: string]: string }>({});
  const [fileInfo, setFileInfo] = useState<string | null>(null);

  const computeHashes = async (inputStr: string) => {
    try {
      const enc = new TextEncoder();
      const data = enc.encode(inputStr);

      const algorithms = [
        { name: 'SHA-1', key: 'sha1' },
        { name: 'SHA-256', key: 'sha256' },
        { name: 'SHA-384', key: 'sha384' },
        { name: 'SHA-512', key: 'sha512' },
      ];

      const results: { [key: string]: string } = {};

      for (const algo of algorithms) {
        const hashBuf = await crypto.subtle.digest(algo.name, data);
        const hashArray = Array.from(new Uint8Array(hashBuf));
        results[algo.key] = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      }

      setHashes(results);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    computeHashes(text);
  }, [text]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileInfo(`${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    const buffer = await file.arrayBuffer();

    const algorithms = [
      { name: 'SHA-1', key: 'sha1' },
      { name: 'SHA-256', key: 'sha256' },
      { name: 'SHA-384', key: 'sha384' },
      { name: 'SHA-512', key: 'sha512' },
    ];

    const results: { [key: string]: string } = {};
    for (const algo of algorithms) {
      const hashBuf = await crypto.subtle.digest(algo.name, buffer);
      const hashArray = Array.from(new Uint8Array(hashBuf));
      results[algo.key] = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
    setHashes(results);
  };

  return (
    <ToolLayout
      toolId="hash-generator"
      title="Cryptographic Hash Generator"
      description="Compute SHA-1, SHA-256, SHA-384, and SHA-512 hashes using native browser Web Crypto API."
      icon={Hash}
    >
      <div className="space-y-6">
        {/* Input area */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Input Text or File
            </label>
            {fileInfo && (
              <span className="text-xs font-mono text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                File: {fileInfo}
              </span>
            )}
          </div>
          <textarea
            value={text}
            onChange={(e) => {
              setFileInfo(null);
              setText(e.target.value);
            }}
            placeholder="Type or paste text to hash..."
            className="w-full h-24 p-3 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 resize-none outline-none focus:ring-1 focus:ring-indigo-500/50"
          />
          <div className="mt-2 flex items-center gap-2">
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-indigo-500" />
              <span>Or hash a file...</span>
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Hashes output */}
        <div className="space-y-3">
          {[
            { label: 'SHA-256 (Recommended)', val: hashes.sha256, color: 'text-indigo-600 dark:text-indigo-400' },
            { label: 'SHA-512', val: hashes.sha512, color: 'text-sky-600 dark:text-sky-400' },
            { label: 'SHA-384', val: hashes.sha384, color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'SHA-1 (Legacy)', val: hashes.sha1, color: 'text-slate-600 dark:text-slate-400' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-slate-500 block mb-1">
                  {item.label}
                </span>
                <span className={`font-mono text-xs break-all block ${item.color}`}>
                  {item.val || 'Computing...'}
                </span>
              </div>
              <CopyButton value={item.val || ''} />
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
};

export default HashGenerator;
