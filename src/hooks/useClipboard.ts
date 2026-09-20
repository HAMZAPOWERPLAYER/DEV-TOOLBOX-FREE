import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface UseClipboardOptions {
  timeout?: number;
  successMessage?: string;
}

export function useClipboard(options: UseClipboardOptions = {}) {
  const { timeout = 2000, successMessage = 'Copied to clipboard' } = options;
  const [hasCopied, setHasCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      if (!text) return false;
      try {
        await navigator.clipboard.writeText(text);
        setHasCopied(true);
        toast.success(successMessage);
        setTimeout(() => setHasCopied(false), timeout);
        return true;
      } catch (err) {
        console.warn('Failed to copy text using Clipboard API:', err);
        // Fallback for older browsers or restricted permissions
        try {
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          if (successful) {
            setHasCopied(true);
            toast.success(successMessage);
            setTimeout(() => setHasCopied(false), timeout);
            return true;
          }
        } catch {
          // ignore
        }
        toast.error('Could not copy to clipboard');
        return false;
      }
    },
    [timeout, successMessage]
  );

  return { hasCopied, copy };
}
