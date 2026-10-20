import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
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
    console.error('Uncaught error in ORMA Editions applet:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#fcf9f5] text-[#1c1c1a] font-serif flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-[#f6f3ef] border border-[#dec0b4] p-8 shadow-sm text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-[#9e3d00] font-bold block mb-2">
              DISPATCH INTERRUPTION • ORMA EDITIONS
            </span>
            <h1 className="font-serif text-2xl font-bold mb-4 text-[#1c1c1a]">
              The page encountered an unexpected pause
            </h1>
            <p className="text-sm text-[#574239] mb-6 font-sans">
              {this.state.error?.message || 'A script error occurred while rendering the kiosk.'}
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="bg-[#9e3d00] text-white px-5 py-2 text-xs font-mono uppercase tracking-wider hover:bg-[#7c2e00] transition-colors"
              >
                Reload Dispatch
              </button>
              <button
                onClick={() => {
                  window.location.hash = '#/';
                  window.location.reload();
                }}
                className="border border-[#8b7267] text-[#1c1c1a] px-5 py-2 text-xs font-mono uppercase tracking-wider hover:bg-[#ebe8e4] transition-colors"
              >
                Return to Station Kiosk
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
