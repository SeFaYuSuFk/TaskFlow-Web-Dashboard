// src/components/FilterBar.jsx
// Arama Motoru ve Filtreleme Sekmeleri
// Geliştirici: Sefa Yusuf Kütük

import React from 'react';
import { Search, X, Filter } from 'lucide-react';

export default function FilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  counts
}) {
  const statusTabs = [
    { id: 'all', label: 'Tümü', count: counts.all },
    { id: 'todo', label: 'Bekleyenler', count: counts.todo },
    { id: 'in_progress', label: 'Devam Edenler', count: counts.in_progress },
    { id: 'completed', label: 'Tamamlananlar', count: counts.completed }
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 shadow-xl backdrop-blur-sm space-y-3.5">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Arama Motoru */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Görev adı, açıklama, atanan kişi veya etiket ara..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Öncelik Filtreleme Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition"
          >
            <option value="all">Tüm Öncelikler</option>
            <option value="critical">🔴 Kritik Öncelik</option>
            <option value="high">🟠 Yüksek Öncelik</option>
            <option value="medium">🔵 Orta Öncelik</option>
            <option value="low">⚪ Düşük Öncelik</option>
          </select>
        </div>
      </div>

      {/* Durum Sekmeleri */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 border-t border-slate-800/60 pt-3">
        {statusTabs.map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onStatusChange(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
