import React, { useState } from 'react';
import { Eye, FileCode2, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ToolLayout } from '@/components/shared/ToolLayout';
import { CopyButton } from '@/components/shared/CopyButton';

const INITIAL_MD = `# Dev-Toolbox Markdown Preview

Welcome to **DEV-TOOLBOX-FREE**! A 100% client-side privacy-first developer utility suite.

## Features List
- [x] Fast client-side rendering
- [x] Works offline via Service Worker & PWA
- [x] Zero telemetry and zero trackers

## Code Example
\`\`\`typescript
const greeting: string = "Hello, Developer!";
console.log(greeting);
\`\`\`

> "Your data never leaves your device."
`;

export const MarkdownPreview: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(INITIAL_MD);

  return (
    <ToolLayout
      toolId="markdown-preview"
      title="Markdown Live Preview & Editor"
      description="Write Markdown with GitHub Flavored Markdown (GFM) support, live synchronized rendering, and one-click copy."
      icon={FileCode2}
      actions={<CopyButton value={markdown} label="Copy Markdown" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
        {/* Editor */}
        <div className="flex flex-col h-[520px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Markdown Source</span>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex-1 w-full p-4 font-mono text-xs leading-relaxed bg-transparent text-slate-800 dark:text-slate-200 resize-none outline-none focus:ring-1 focus:ring-indigo-500/50"
            placeholder="Type markdown here..."
          />
        </div>

        {/* Live Preview */}
        <div className="flex flex-col h-[520px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-indigo-500" />
              Live Preview
            </span>
          </div>
          <div className="flex-1 p-6 overflow-y-auto prose dark:prose-invert prose-slate prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default MarkdownPreview;
