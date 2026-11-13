// src/App.jsx
// TaskFlow Web Ana Uygulama ve Hata Kalkanı (Error Boundary)
// Geliştirici: Sefa Yusuf Kütük

import React, { Component } from 'react';
import Dashboard from './pages/Dashboard';
import { AlertOctagon, RotateCcw } from 'lucide-react';

// Kurumsal Çökme Kalkanı (React Error Boundary)
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('TaskFlow Kritik React Hatası Yakalandı:', error, errorInfo);
  }

  handleReset = () => {
    localStorage.removeItem('taskflow_tasks_v1');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white">
          <div className="max-w-md w-full bg-slate-900 border border-rose-500/30 rounded-3xl p-8 text-center shadow-2xl">
            <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-rose-400 mx-auto mb-4">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold">Kritik Uygulama Hatası</h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              TaskFlow Güvenlik Kalkanı uygulamanın çökmesini engelledi. Veritabanını sıfırlayarak kurtarabilirsiniz.
            </p>
            <div className="mt-4 p-3 bg-black/40 rounded-xl text-[11px] text-rose-300 font-mono text-left overflow-x-auto">
              {this.state.error?.message || 'Bilinmeyen Hata'}
            </div>
            <button
              onClick={this.handleReset}
              className="mt-6 w-full py-3 bg-emerald-500 hover:bg-emerald-600 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <RotateCcw className="w-4 h-4" />
              Verileri Sıfırla ve Yeniden Başlat
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
}
