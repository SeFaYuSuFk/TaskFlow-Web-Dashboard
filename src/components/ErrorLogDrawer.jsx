// src/components/ErrorLogDrawer.jsx
// Sistem & Hata Günlüğü Paneli (Kullanıcının Özel İsteği: "Alınan tüm hataları gösteren panel")
// Geliştirici: Sefa Yusuf Kütük

import React, { useState } from 'react';
import { X, AlertCircle, AlertTriangle, Info, CheckCircle2, Trash2, Bug, ShieldAlert } from 'lucide-react';

export default function ErrorLogDrawer({ isOpen, onClose, logs, onClearLogs, onSimulateError }) {
  const [filter, setFilter] = useState('all'); // all, error, warning, info

  if (!isOpen) return null;

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.type === filter;
  });

  const errorCount = logs.filter(l => l.type === 'error').length;
  const warningCount = logs.filter(l => l.type === 'warning').length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20 text-rose-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Sistem & Hata Günlüğü</h3>
                <p className="text-xs text-slate-400">Canlı Hata Takibi ve İşlem Kayıtları</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Aksiyon Barı */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between gap-2">
            <div className="flex gap-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition ${
                  filter === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tümü ({logs.length})
              </button>
              <button
                onClick={() => setFilter('error')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition flex items-center gap-1 ${
                  filter === 'error' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-slate-400 hover:text-rose-400'
                }`}
              >
                Hatalar ({errorCount})
              </button>
              <button
                onClick={() => setFilter('warning')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition ${
                  filter === 'warning' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-amber-400'
                }`}
              >
                Uyarılar ({warningCount})
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={onSimulateError}
                title="Hata yakalama sistemini test etmek için örnek hata üretir"
                className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-xs font-semibold flex items-center gap-1 border border-rose-500/30 transition"
              >
                <Bug className="w-3.5 h-3.5" />
                Test Et
              </button>
              <button
                onClick={onClearLogs}
                title="Günlüğü Temizle"
                className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Log Listesi */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500/40 mb-2" />
                <p className="text-sm font-medium text-slate-400">Henüz kayıtlı bir hata bulunmuyor.</p>
                <p className="text-xs text-slate-500 mt-1">Sistem kararlı ve sıfır hata ile çalışıyor.</p>
              </div>
            ) : (
              filteredLogs.map((log) => {
                const isError = log.type === 'error';
                const isWarning = log.type === 'warning';
                const isSuccess = log.type === 'success';

                return (
                  <div
                    key={log.id}
                    className={`p-3 rounded-xl border text-xs leading-relaxed transition ${
                      isError
                        ? 'bg-rose-950/40 border-rose-800/50 text-rose-200'
                        : isWarning
                        ? 'bg-amber-950/40 border-amber-800/50 text-amber-200'
                        : isSuccess
                        ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-200'
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 font-mono text-[11px] opacity-75">
                      <span className="flex items-center gap-1 font-semibold uppercase">
                        {isError && <AlertCircle className="w-3.5 h-3.5 text-rose-400" />}
                        {isWarning && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                        {isSuccess && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        {!isError && !isWarning && !isSuccess && <Info className="w-3.5 h-3.5 text-sky-400" />}
                        {log.type}
                      </span>
                      <span>{log.timestamp}</span>
                    </div>
                    <div className="font-semibold text-white/95">{log.title}</div>
                    <div className="mt-0.5 opacity-90">{log.message}</div>
                    {log.details && (
                      <pre className="mt-1.5 p-1.5 bg-black/40 rounded text-[10px] text-slate-400 font-mono overflow-x-auto">
                        {log.details}
                      </pre>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Bilgilendirme */}
          <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 text-center">
            Geliştirici: <span className="text-emerald-400 font-semibold">Sefa Yusuf Kütük</span> — LocalStorage Güvencesi
          </div>
        </div>
      </div>
    </div>
  );
}
