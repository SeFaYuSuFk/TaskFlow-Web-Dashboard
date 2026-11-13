// src/components/Header.jsx
// Üst Menü ve Navigasyon Bileşeni
// Geliştirici: Sefa Yusuf Kütük

import React from 'react';
import { Plus, RotateCcw, ShieldAlert, Sparkles, CheckSquare } from 'lucide-react';

export default function Header({ onOpenNewTask, onOpenErrorLog, onResetData, errorCount, taskCount }) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo ve Başlık */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">TaskFlow Web</h1>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                React + Tailwind
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Geliştirici: <span className="text-slate-200 font-medium">Sefa Yusuf Kütük</span> • Eğitmen: <span className="text-slate-300">Onur Yalçın</span>
            </p>
          </div>
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex items-center gap-2.5">
          {/* Hata ve Sistem Günlüğü Butonu */}
          <button
            onClick={onOpenErrorLog}
            className="relative px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center gap-2 hover:border-slate-600"
            title="Sistem & Hata Kayıtları Paneli"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Hata & İşlem Günlüğü</span>
            {errorCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {errorCount}
              </span>
            )}
          </button>

          {/* Varsayılan Verileri Geri Yükle */}
          <button
            onClick={onResetData}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium border border-slate-800 hover:border-slate-700 transition flex items-center gap-1.5"
            title="Tüm verileri ilk haline döndürür"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Sıfırla</span>
          </button>

          {/* Yeni Görev Ekle Butonu */}
          <button
            onClick={onOpenNewTask}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-500/20 transition flex items-center gap-1.5 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Görev</span>
          </button>
        </div>
      </div>
    </header>
  );
}
