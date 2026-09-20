import React, { useState } from 'react';
import { Download, Smartphone } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { Button } from '@/components/ui/button';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <Button
        variant="subtle"
        size="sm"
        onClick={install}
        className="gap-1.5 text-xs font-semibold"
        aria-label="Install offline PWA"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Install PWA</span>
      </Button>
    );
  }

  if (isIOS) {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowIOSGuide(true)}
          className="gap-1.5 text-xs"
          aria-label="Install app on iOS"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Install App</span>
        </Button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-xl bg-white dark:bg-slate-900 p-6 shadow-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Install on iPhone / iPad
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                1. Tap the <strong>Share</strong> icon in Safari toolbar.<br />
                2. Scroll down and choose <strong>Add to Home Screen</strong>.<br />
                3. Enjoy 100% offline access to all developer tools!
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
