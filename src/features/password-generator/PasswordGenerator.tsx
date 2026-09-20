import React, { useState } from 'react';
import { ShieldAlert, RefreshCw, Key } from 'lucide-react';
import { ToolLayout } from '@/components/shared/ToolLayout';
import { CopyButton } from '@/components/shared/CopyButton';
import { Button } from '@/components/ui/button';

export const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(18);
  const [useUpper, setUseUpper] = useState<boolean>(true);
  const [useLower, setUseLower] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useSymbols, setUseSymbols] = useState<boolean>(true);

  const generatePassword = () => {
    let chars = '';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('');
      return;
    }

    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[randomValues[i] % chars.length];
    }
    setPassword(result);
  };

  React.useEffect(() => {
    generatePassword();
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  // Compute entropy and strength
  const getStrength = () => {
    let pool = 0;
    if (useLower) pool += 26;
    if (useUpper) pool += 26;
    if (useNumbers) pool += 10;
    if (useSymbols) pool += 32;
    const entropy = Math.round(length * Math.log2(pool || 1));
    let label = 'Very Weak';
    let color = 'bg-rose-500';
    if (entropy >= 80) {
      label = 'Very Strong';
      color = 'bg-emerald-500';
    } else if (entropy >= 60) {
      label = 'Strong';
      color = 'bg-emerald-400';
    } else if (entropy >= 45) {
      label = 'Moderate';
      color = 'bg-amber-400';
    } else if (entropy >= 30) {
      label = 'Weak';
      color = 'bg-orange-400';
    }
    return { entropy, label, color };
  };

  const strength = getStrength();

  return (
    <ToolLayout
      toolId="password-generator"
      title="Secure Password & Secret Generator"
      description="Create cryptographically secure, high-entropy passwords with custom character sets."
      icon={Key}
      actions={
        <Button size="sm" onClick={generatePassword} className="text-xs">
          <RefreshCw className="w-3.5 h-3.5 mr-1" />
          Generate New
        </Button>
      }
    >
      <div className="space-y-6 max-w-3xl">
        {/* Output display */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Generated Secret
            </span>
            <CopyButton value={password} label="Copy Password" />
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-base font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider break-all border border-slate-200/60 dark:border-slate-800/60">
            {password}
          </div>

          {/* Strength bar */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-500">
                Strength: <strong className="text-slate-800 dark:text-slate-200">{strength.label}</strong>
              </span>
              <span className="text-slate-400">{strength.entropy} bits of entropy</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${strength.color} transition-all duration-300`}
                style={{ width: `${Math.min(100, (strength.entropy / 90) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Configuration settings */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span>Length: {length}</span>
            </div>
            <input
              type="range"
              min={8}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useUpper}
                onChange={(e) => setUseUpper(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useLower}
                onChange={(e) => setUseLower(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useNumbers}
                onChange={(e) => setUseNumbers(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Numbers (0-9)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={(e) => setUseSymbols(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Symbols (!@#$)</span>
            </label>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PasswordGenerator;
