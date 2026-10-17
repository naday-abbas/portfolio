import { Component } from "react";

/**
 * ThreeErrorBoundary
 * Catches any WebGL context creation failure, Three.js runtime error,
 * or shader compilation failure, preventing the error from bubbling up
 * and breaking the rest of the application.
 *
 * Supports automatic error state reset when resetKey changes,
 * allowing recovery cycles to re-mount 3D scenes after GPU recovery.
 */
export default class ThreeErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("3D WebGL component caught by ErrorBoundary:", error?.message || error);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.hasError && this.props.resetKey !== prevProps.resetKey) {
      this.setState({ hasError: false, error: null });
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === "function") {
        return this.props.fallback({ error: this.state.error, reset: this.resetError });
      }
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}
