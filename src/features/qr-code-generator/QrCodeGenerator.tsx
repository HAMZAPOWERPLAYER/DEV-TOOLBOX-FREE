import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Download } from 'lucide-react';
import QRCode from 'qrcode';
import { ToolLayout } from '@/components/shared/ToolLayout';
import { Button } from '@/components/ui/button';

export const QrCodeGenerator: React.FC = () => {
  const [text, setText] = useState<string>('https://dev-toolbox-free.local');
  const [dataUrl, setDataUrl] = useState<string>('');
  const [size, setSize] = useState<number>(256);
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');

  useEffect(() => {
    if (!text) {
      setDataUrl('');
      return;
    }
    QRCode.toDataURL(text, {
      width: size,
      margin: 2,
      errorCorrectionLevel: errorCorrection,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    })
      .then((url) => setDataUrl(url))
      .catch((err) => console.error(err));
  }, [text, size, errorCorrection]);

  const downloadQr = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `qrcode-${Date.now()}.png`;
    a.click();
  };

  return (
    <ToolLayout
      toolId="qr-code-generator"
      title="QR Code Generator"
      description="Create custom QR codes for URLs, plain text, Wi-Fi credentials, and contact cards with instant PNG download."
      icon={QrCode}
      actions={
        <Button size="sm" onClick={downloadQr} disabled={!dataUrl} className="text-xs">
          <Download className="w-3.5 h-3.5 mr-1" />
          Download PNG
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            QR Code Content
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter URL or text..."
            className="w-full h-36 p-3 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs bg-transparent text-slate-800 dark:text-slate-200 resize-none outline-none focus:ring-1 focus:ring-indigo-500/50"
          />

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block mb-1 font-medium">Size</span>
              <select
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent text-slate-700 dark:text-slate-300"
              >
                <option value={180}>Small (180px)</option>
                <option value={256}>Medium (256px)</option>
                <option value={380}>Large (380px)</option>
              </select>
            </div>

            <div>
              <span className="text-slate-500 block mb-1 font-medium">Error Correction</span>
              <select
                value={errorCorrection}
                onChange={(e) => setErrorCorrection(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent text-slate-700 dark:text-slate-300"
              >
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col items-center justify-center">
          {dataUrl ? (
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
              <img src={dataUrl} alt="Generated QR code" className="rounded-lg max-w-[240px] max-h-[240px]" />
              <span className="text-[10px] text-slate-400 font-mono mt-3">Scan with camera</span>
            </div>
          ) : (
            <p className="text-xs text-slate-400">Enter text to generate QR code</p>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default QrCodeGenerator;
