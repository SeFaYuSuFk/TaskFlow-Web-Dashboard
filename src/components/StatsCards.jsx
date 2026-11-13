// src/components/StatsCards.jsx
// Metrik Kartları ve Canlı İlerleme Çubuğu
// Geliştirici: Sefa Yusuf Kütük

import React from 'react';
import { CheckCircle2, Clock, Flame, ListTodo, TrendingUp } from 'lucide-react';

export default function StatsCards({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const critical = tasks.filter(t => t.priority === 'critical' && t.status !== 'completed').length;

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* İlerleme Çubuğu (Sprint Progress) */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Sprint İlerleme Durumu
            </span>
          </div>
          <span className="text-sm font-extrabold text-emerald-400 font-mono">
            %{percent} Tamamlandı
          </span>
        </div>
        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-500 ease-out shadow-sm shadow-emerald-500/50"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
          <span>{completed} tamamlandı</span>
          <span>{total - completed} kalan iş</span>
        </div>
      </div>

      {/* 4'lü Metrik Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Toplam */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="p-2.5 bg-slate-800/60 rounded-xl text-slate-300 border border-slate-700/50">
            <ListTodo className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Toplam Görev</div>
            <div className="text-2xl font-extrabold text-white font-mono mt-0.5">{total}</div>
          </div>
        </div>

        {/* Tamamlanan */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-emerald-400 font-medium">Tamamlanan</div>
            <div className="text-2xl font-extrabold text-white font-mono mt-0.5">{completed}</div>
          </div>
        </div>

        {/* Devam Eden */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="p-2.5 bg-sky-500/10 rounded-xl text-sky-400 border border-sky-500/20">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-sky-400 font-medium">Devam Eden</div>
            <div className="text-2xl font-extrabold text-white font-mono mt-0.5">{inProgress}</div>
          </div>
        </div>

        {/* Kritik */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
          <div className="p-2.5 bg-rose-500/10 rounded-xl text-rose-400 border border-rose-500/20">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-rose-400 font-medium">Aktif Kritik</div>
            <div className="text-2xl font-extrabold text-white font-mono mt-0.5">{critical}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
