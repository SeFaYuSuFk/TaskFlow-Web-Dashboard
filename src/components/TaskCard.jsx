// src/components/TaskCard.jsx
// Görev Kartı Bileşeni
// Geliştirici: Sefa Yusuf Kütük

import React from 'react';
import { Check, Clock, Edit2, Trash2, Tag, User } from 'lucide-react';

export default function TaskCard({ task, onToggleStatus, onEdit, onDelete }) {
  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in_progress';

  // Öncelik Renkleri
  const priorityConfig = {
    critical: { label: 'Kritik', bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
    high: { label: 'Yüksek', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
    medium: { label: 'Orta', bg: 'bg-sky-500/10 text-sky-400 border-sky-500/30' },
    low: { label: 'Düşük', bg: 'bg-slate-500/10 text-slate-400 border-slate-500/30' }
  };

  const priorityInfo = priorityConfig[task.priority] || priorityConfig.medium;

  return (
    <div
      className={`group rounded-2xl border transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between ${
        isCompleted
          ? 'bg-slate-900/30 border-slate-800/50 opacity-75'
          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:shadow-xl hover:shadow-emerald-500/5'
      }`}
    >
      <div>
        {/* Üst Kısım: Checkbox + Rozetler + Aksiyonlar */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            {/* Tamamlandı Checkbox */}
            <button
              onClick={() => onToggleStatus(task.id)}
              className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                isCompleted
                  ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'border-slate-700 hover:border-emerald-400 bg-slate-950/60'
              }`}
              title={isCompleted ? 'Görevi devam edene çek' : 'Görevi tamamla'}
            >
              {isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
            </button>

            {/* Öncelik Rozeti */}
            <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${priorityInfo.bg}`}>
              {priorityInfo.label}
            </span>

            {/* Kategori Rozeti */}
            {task.category && (
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {task.category}
              </span>
            )}
          </div>

          {/* Düzenle / Sil Butonları */}
          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-800 transition"
              title="Görevi Düzenle"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
              title="Görevi Sil"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Görev Başlığı */}
        <h3
          className={`text-base font-bold transition ${
            isCompleted ? 'line-through text-slate-500' : 'text-slate-100 group-hover:text-emerald-300'
          }`}
        >
          {task.title}
        </h3>

        {/* Görev Açıklaması */}
        {task.description && (
          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}

        {/* Etiketler (Tags) */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {task.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/70 text-slate-400 border border-slate-800 flex items-center gap-1"
              >
                <Tag className="w-2.5 h-2.5 opacity-50" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Alt Kısım: Atanan Kişi & Durum Bilgisi */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60 pt-3 mt-4">
        {/* Atanan Kişi */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-600 to-sky-600 text-white flex items-center justify-center font-bold text-[10px]">
            {task.assignee ? task.assignee.charAt(0).toUpperCase() : 'U'}
          </div>
          <span className="font-medium text-slate-300">{task.assignee || 'Atanmamış'}</span>
        </div>

        {/* Durum İkonu */}
        <div className="flex items-center gap-1 text-[11px] font-mono">
          {isCompleted ? (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Bitti
            </span>
          ) : isInProgress ? (
            <span className="text-sky-400 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Devam Ediyor
            </span>
          ) : (
            <span className="text-slate-500">Beklemede</span>
          )}
        </div>
      </div>
    </div>
  );
}
