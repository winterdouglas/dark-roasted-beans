import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorScreen } from "~screens/ErrorScreen";
import { reportCrash } from "~utils/crashReporter";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * This component handles when there's a JS error
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null, errorInfo: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.state.error) return;

    this.setState({
      error,
      errorInfo,
    });

    reportCrash(error);
  }

  resetError = () => {
    this.setState({ error: null, errorInfo: null });
  };

  shouldComponentUpdate(
    nextProps: Readonly<ErrorBoundaryProps>,
    nextState: Readonly<ErrorBoundaryState>,
  ): boolean {
    return nextState.error !== this.state.error;
  }

  render() {
    return this.state.error ? (
      <ErrorScreen
        onReset={this.resetError}
        error={this.state.error}
        errorInfo={this.state.errorInfo}
      />
    ) : (
      this.props.children
    );
  }
}
