import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px] border border-rose-200 dark:border-rose-900/40 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 m-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-3.5">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-rose-900 dark:text-rose-200 mb-1">
            {this.props.fallbackTitle || 'Something went wrong in this tool'}
          </h3>
          <p className="text-xs text-rose-600 dark:text-rose-400 max-w-md mb-4 font-mono bg-white/50 dark:bg-black/30 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/40 break-words">
            {this.state.error?.message || 'An unexpected error occurred during execution.'}
          </p>
          <Button variant="outline" size="sm" onClick={this.handleReset} className="gap-2">
            <RotateCcw className="w-3.5 h-3.5" />
            Reload Applet
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
