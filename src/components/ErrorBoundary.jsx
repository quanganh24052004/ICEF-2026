import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught an error]:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="card-3d rounded-3xl p-6 sm:p-8 my-6 bg-white border-2 border-red-200 text-center space-y-4 max-w-lg mx-auto shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-red-100 border-2 border-red-300 flex items-center justify-center mx-auto text-red-600">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-duo-dark tracking-tight">
            Đã xảy ra sự cố khi tải giao diện
          </h3>
          <p className="text-xs text-duo-muted font-bold leading-relaxed">
            Hệ thống đã tự động bảo vệ dữ liệu để không bị mất. Bạn có thể nhấn nút bên dưới để khôi phục lại màn hình.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="btn-3d-hust text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-2xl inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Khôi phục hiển thị</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
