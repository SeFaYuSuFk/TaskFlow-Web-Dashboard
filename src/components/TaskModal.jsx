// src/components/TaskModal.jsx
// Görev Ekleme ve Güncelleme Modal Penceresi
// Geliştirici: Sefa Yusuf Kütük

import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onSave, editingTask, onError }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'Geliştirme',
    assignee: 'Sefa Yusuf Kütük',
    tags: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        description: editingTask.description || '',
        priority: editingTask.priority || 'medium',
        category: editingTask.category || 'Geliştirme',
        assignee: editingTask.assignee || 'Sefa Yusuf Kütük',
        tags: Array.isArray(editingTask.tags) ? editingTask.tags.join(', ') : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        category: 'Geliştirme',
        assignee: 'Sefa Yusuf Kütük',
        tags: ''
      });
    }
    setFormErrors({});
  }, [editingTask, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    // 1. Title Kontrolü
    if (!formData.title.trim()) {
      errors.title = 'Görev başlığı boş bırakılamaz.';
    } else if (formData.title.trim().length < 3) {
      errors.title = 'Görev başlığı en az 3 karakter olmalıdır.';
    }

    // 2. Assignee Kontrolü
    if (!formData.assignee.trim()) {
      errors.assignee = 'Atanan kişi adı boş bırakılamaz.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      if (onError) {
        onError('Doğrulama Hatası (Validation)', 'Formdaki zorunlu alanlar doldurulmadı.', JSON.stringify(errors));
      }
      return;
    }

    // Etiketleri diziye çevir
    const tagsArray = formData.tags
      ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    onSave({
      ...formData,
      tags: tagsArray
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-scale-in">
        {/* Modal Başlık */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <h3 className="text-lg font-bold text-white">
              {editingTask ? 'Görevi Düzenle' : 'Yeni Görev Oluştur'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              TaskFlow Proje ve Sprint Yönetim Sistemi
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Görev Başlığı */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Görev Başlığı <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Örn: React + Tailwind CSS Bileşenleri"
              className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition ${
                formErrors.title
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500'
              }`}
            />
            {formErrors.title && (
              <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {formErrors.title}
              </p>
            )}
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Görev Detayı ve Açıklaması
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Görevin kapsamını ve yapılacakları belirtin..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition resize-none"
            />
          </div>

          {/* Öncelik & Kategori Yan Yana */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Öncelik Seviyesi
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition"
              >
                <option value="critical">🔴 Kritik (Critical)</option>
                <option value="high">🟠 Yüksek (High)</option>
                <option value="medium">🔵 Orta (Medium)</option>
                <option value="low">⚪ Düşük (Low)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Kategori
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition"
              >
                <option value="Frontend">Frontend Web</option>
                <option value="Backend">Backend API</option>
                <option value="Veritabanı">SQL / Veritabanı</option>
                <option value="Mobile">Mobil / Flutter</option>
                <option value="DevOps">DevOps & Cloud</option>
              </select>
            </div>
          </div>

          {/* Atanan Kişi */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Atanan Geliştirici <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.assignee}
              onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
              placeholder="Örn: Sefa Yusuf Kütük"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
            {formErrors.assignee && (
              <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {formErrors.assignee}
              </p>
            )}
          </div>

          {/* Etiketler */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Etiketler (Virgülle ayırın)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Örn: React, UI, State, CRUD"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Aksiyon Butonları */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition flex items-center gap-1.5 active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>{editingTask ? 'Güncelle' : 'Görevi Kaydet'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
