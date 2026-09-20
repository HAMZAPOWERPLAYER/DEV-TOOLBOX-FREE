import React, { useState } from 'react';
import { KeyRound, AlertCircle, CheckCircle2, Copy } from 'lucide-react';
import { ToolLayout } from '@/components/shared/ToolLayout';
import { CopyButton } from '@/components/shared/CopyButton';
import { Button } from '@/components/ui/button';

export const JwtDecoder: React.FC = () => {
  const [token, setToken] = useState<string>(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIERldmVsb3BlciIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoyNTIwMDAwMDAwfQ.dummySignatureStringHere'
  );

  const decodeJwt = (jwtStr: string) => {
    try {
      const parts = jwtStr.trim().split('.');
      if (parts.length !== 3) {
        return { error: 'Invalid JWT format: Token must have exactly 3 dot-separated parts' };
      }
      const b64Decode = (str: string) => {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
        return decodeURIComponent(
          atob(padded)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
      };

      const header = JSON.parse(b64Decode(parts[0]));
      const payload = JSON.parse(b64Decode(parts[1]));
      const signature = parts[2];

      let isExpired = false;
      let expiryDate: string | null = null;
      if (payload.exp && typeof payload.exp === 'number') {
        const expMs = payload.exp * 1000;
        isExpired = Date.now() > expMs;
        expiryDate = new Date(expMs).toUTCString();
      }

      return { header, payload, signature, isExpired, expiryDate, error: null };
    } catch (e) {
      return { error: 'Failed to decode JWT: ' + (e as Error).message };
    }
  };

  const result = decodeJwt(token);

  return (
    <ToolLayout
      toolId="jwt-decoder"
      title="JWT Decoder & Debugger"
      description="Inspect JSON Web Tokens (header, payload, claims), check expiration, and verify token structure offline."
      icon={KeyRound}
      actions={
        <Button
          variant="outline"
          size="sm"
          onClick={() => setToken('')}
          className="text-xs"
        >
          Clear
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Token Input */}
        <div className="lg:col-span-5 flex flex-col space-y-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Encoded JWT Token
          </label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your Bearer eyJhbGci... token here"
            className="w-full h-80 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-mono text-xs text-indigo-600 dark:text-indigo-400 resize-none outline-none focus:ring-2 focus:ring-indigo-500/30"
          />

          {result.expiryDate && (
            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              result.isExpired
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300'
                : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300'
            }`}>
              {result.isExpired ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
              <div>
                <span className="font-semibold">{result.isExpired ? 'Token Expired: ' : 'Token Active: '}</span>
                <span>{result.expiryDate}</span>
              </div>
            </div>
          )}
        </div>

        {/* Decoded Sections */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {result.error ? (
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 text-xs font-mono">
              {result.error}
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-rose-500 uppercase font-mono">Header: Algorithm & Token Type</span>
                  <CopyButton value={JSON.stringify(result.header, null, 2)} />
                </div>
                <pre className="font-mono text-xs text-rose-600 dark:text-rose-400 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-lg overflow-x-auto">
                  {JSON.stringify(result.header, null, 2)}
                </pre>
              </div>

              {/* Payload */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-purple-500 uppercase font-mono">Payload: Data & Claims</span>
                  <CopyButton value={JSON.stringify(result.payload, null, 2)} />
                </div>
                <pre className="font-mono text-xs text-purple-600 dark:text-purple-400 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-lg overflow-x-auto">
                  {JSON.stringify(result.payload, null, 2)}
                </pre>
              </div>
            </>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default JwtDecoder;
