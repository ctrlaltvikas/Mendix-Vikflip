import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class WidgetErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[VikFlip Widget Error]:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            minHeight: '360px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-surface, #F2F2F7)',
            color: 'var(--text-primary, #1C1C1E)',
            padding: '24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'rgba(239, 68, 68, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}
          >
            <AlertTriangle size={28} color="#EF4444" />
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
            Unable to Display Flipbook
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary, #636366)', maxWidth: '360px', marginBottom: '20px', lineHeight: 1.5 }}>
            {this.state.error?.message || this.props.fallbackMessage || 'An unexpected rendering error occurred while loading pages.'}
          </p>

          <button
            onClick={this.handleReset}
            style={{
              background: 'var(--accent, #0071E3)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '9999px',
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RefreshCw size={14} />
            Reload Flipbook
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
