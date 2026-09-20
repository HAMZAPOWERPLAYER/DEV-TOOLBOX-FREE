import { useEffect } from 'react';

type KeyCombo = string; // e.g. 'k', 'mod+k', 'escape', 'mod+enter'

export function useHotkeys(keyCombo: KeyCombo, callback: (e: KeyboardEvent) => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMod = event.metaKey || event.ctrlKey;
      const key = event.key.toLowerCase();

      const parts = keyCombo.toLowerCase().split('+');
      const requiresMod = parts.includes('mod') || parts.includes('ctrl') || parts.includes('cmd');
      const targetKey = parts[parts.length - 1];

      if (requiresMod && !isMod) return;
      if (!requiresMod && isMod) return;

      if (targetKey === 'escape' && key === 'escape') {
        callback(event);
      } else if (targetKey === 'enter' && key === 'enter') {
        callback(event);
      } else if (key === targetKey) {
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyCombo, callback]);
}
