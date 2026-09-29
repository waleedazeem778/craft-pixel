import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('PixelCraft Uncaught Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07080d] text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-8 rounded-3xl bg-[#0e101a] border border-slate-800 shadow-2xl space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h2 className="font-['Space_Grotesk'] text-2xl font-bold text-white">Something went wrong</h2>
            <p className="text-slate-400 text-xs leading-relaxed">
              An unexpected error occurred while loading the studio interface.
            </p>
            {this.state.error && (
              <pre className="p-3 rounded-xl bg-slate-950 text-left text-[11px] font-mono text-rose-300 overflow-x-auto max-h-32 border border-slate-900">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset & Reload App</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
