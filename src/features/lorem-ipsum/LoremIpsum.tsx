import React, { useState } from 'react';
import { Type, RefreshCw } from 'lucide-react';
import { ToolLayout } from '@/components/shared/ToolLayout';
import { CopyButton } from '@/components/shared/CopyButton';
import { Button } from '@/components/ui/button';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
  'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
  'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit'
];

export const LoremIpsum: React.FC = () => {
  const [count, setCount] = useState<number>(3);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [asHtml, setAsHtml] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const generate = () => {
    if (type === 'words') {
      const words = Array.from({ length: count }, (_, i) => LOREM_WORDS[i % LOREM_WORDS.length]);
      setText(words.join(' '));
    } else if (type === 'sentences') {
      const sentences = Array.from({ length: count }, () => {
        const len = 6 + Math.floor(Math.random() * 8);
        const w = Array.from({ length: len }, (_, i) => LOREM_WORDS[i % LOREM_WORDS.length]);
        const s = w.join(' ');
        return s.charAt(0).toUpperCase() + s.slice(1) + '.';
      });
      setText(asHtml ? sentences.map((s) => `<p>${s}</p>`).join('\n') : sentences.join(' '));
    } else {
      const paragraphs = Array.from({ length: count }, () => {
        const sentenceCount = 3 + Math.floor(Math.random() * 3);
        const p = Array.from({ length: sentenceCount }, () => {
          const len = 7 + Math.floor(Math.random() * 6);
          const w = Array.from({ length: len }, (_, i) => LOREM_WORDS[i % LOREM_WORDS.length]);
          const s = w.join(' ');
          return s.charAt(0).toUpperCase() + s.slice(1) + '.';
        }).join(' ');
        return p;
      });
      setText(asHtml ? paragraphs.map((p) => `<p>${p}</p>`).join('\n\n') : paragraphs.join('\n\n'));
    }
  };

  React.useEffect(() => {
    generate();
  }, [count, type, asHtml]);

  return (
    <ToolLayout
      toolId="lorem-ipsum"
      title="Lorem Ipsum Text Generator"
      description="Generate placeholder copy in paragraphs, sentences, or word counts with optional HTML tags."
      icon={Type}
      actions={
        <Button size="sm" onClick={generate} className="text-xs">
          <RefreshCw className="w-3.5 h-3.5 mr-1" />
          Regenerate
        </Button>
      }
    >
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">Count:</span>
            <input
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
              className="w-16 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 bg-transparent text-center font-mono"
            />
          </div>

          <div className="flex items-center gap-2">
            {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
              <Button
                key={t}
                variant={type === t ? 'default' : 'outline'}
                size="sm"
                onClick={() => setType(t)}
                className="capitalize text-xs"
              >
                {t}
              </Button>
            ))}
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={asHtml}
              onChange={(e) => setAsHtml(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>HTML &lt;p&gt; tags</span>
          </label>

          <div className="ml-auto">
            <CopyButton value={text} />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <textarea
            readOnly
            value={text}
            className="w-full h-80 font-mono text-xs leading-relaxed bg-transparent text-slate-800 dark:text-slate-200 resize-none outline-none"
          />
        </div>
      </div>
    </ToolLayout>
  );
};

export default LoremIpsum;
