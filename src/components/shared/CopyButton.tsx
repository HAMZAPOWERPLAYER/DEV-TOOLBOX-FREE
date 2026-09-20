import React from 'react';
import { Check, Copy } from 'lucide-react';
import { useClipboard } from '@/hooks/useClipboard';
import { cn } from '@/lib/utils';

export interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  label?: string;
  successMessage?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  label = 'Copy',
  successMessage = 'Copied to clipboard!',
  className,
  ...props
}) => {
  const { hasCopied, copy } = useClipboard({ successMessage });

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      disabled={!value}
      aria-label={label}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all duration-150 select-none cursor-pointer',
        hasCopied
          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
          : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {hasCopied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
