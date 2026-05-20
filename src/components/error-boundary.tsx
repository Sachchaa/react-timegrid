import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback !== undefined) return this.props.fallback;
      return (
        <div
          role="alert"
          className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive"
        >
          <p className="font-semibold">Something went wrong rendering the calendar.</p>
          <p className="mt-1 opacity-90">{this.state.error.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
