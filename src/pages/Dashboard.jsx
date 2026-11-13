// src/pages/Dashboard.jsx
// Ana Görev ve Sprint Yönetim Paneli Sayfası
// Geliştirici: Sefa Yusuf Kütük

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import Toast from '../components/Toast';
import ErrorLogDrawer from '../components/ErrorLogDrawer';
import { initialTasks } from '../data/initialTasks';
import { Plus, Inbox, Sparkles, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'taskflow_tasks_v1';
const LOGS_KEY = 'taskflow_logs_v1';

export default function Dashboard() {
  // 1. Görevler State'i (LocalStorage Entegre)
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialTasks;
    } catch (e) {
      console.error('LocalStorage okuma hatası:', e);
      return initialTasks;
    }
  });

  // 2. Sistem & Hata Günlüğü State'i (LocalStorage Entegre)
  const [logs, setLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(LOGS_KEY);
      return saved ? JSON.parse(saved) : [
        {
          id: 'log-init',
          type: 'info',
          title: 'Sistem Başlatıldı',
          message: 'TaskFlow Web uygulaması başarıyla yüklendi ve LocalStorage senkronize edildi.',
          timestamp: new Date().toLocaleTimeString('tr-TR'),
          details: null
        }
      ];
    } catch (e) {
      return [];
    }
  });

  // 3. Arama & Filtreleme State'leri
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, todo, in_progress, completed
  const [priorityFilter, setPriorityFilter] = useState('all'); // all, critical, high, medium, low

  // 4. Modal & Drawer & Toast State'leri
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isErrorLogOpen, setIsErrorLogOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // LocalStorage Senkronizasyonu
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      addLog('error', 'Depolama Hatası', 'Görevler LocalStorage üzerine yazılamadı.', e.message);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
    } catch (e) {}
  }, [logs]);

  // Yardımcı: Log Ekle
  const addLog = (type, title, message, details = null) => {
    const newLog = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      type, // 'error', 'warning', 'info', 'success'
      title,
      message,
      timestamp: new Date().toLocaleTimeString('tr-TR'),
      details
    };
    setLogs(prev => [newLog, ...prev]);
  };

  // Yardımcı: Bildirim (Toast) Göster
  const showToast = (type, title, message) => {
    setToast({ type, title, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // CRUD: 1. Yeni Görev Ekle veya Güncelle
  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Güncelleme (UPDATE)
      setTasks(prev =>
        prev.map(t =>
          t.id === editingTask.id
            ? { ...t, ...taskData, updatedAt: new Date().toISOString() }
            : t
        )
      );
      addLog('success', 'Görev Güncellendi', `'${taskData.title}' başlıklı görev başarıyla güncellendi.`);
      showToast('success', 'Güncellendi', `'${taskData.title}' görevi kaydedildi.`);
      setEditingTask(null);
    } else {
      // Yeni Ekleme (CREATE)
      const newTask = {
        id: 'tsk-' + String(tasks.length + 1).padStart(3, '0'),
        ...taskData,
        status: 'todo',
        createdAt: new Date().toISOString(),
        completedAt: null
      };
      setTasks(prev => [newTask, ...prev]);
      addLog('success', 'Yeni Görev Eklendi', `'${newTask.title}' sisteme eklendi (ID: ${newTask.id}).`);
      showToast('success', 'Görev Eklendi', `'${newTask.title}' panonuza eklendi.`);
    }
  };

  // CRUD: 2. Durum Değiştir (Todo <-> Completed)
  const handleToggleStatus = (id) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextStatus = t.status === 'completed' ? 'in_progress' : 'completed';
          const isDone = nextStatus === 'completed';
          addLog(
            'info',
            'Durum Güncellendi',
            `'${t.title}' görevi '${nextStatus}' durumuna çekildi.`
          );
          showToast(
            isDone ? 'success' : 'info',
            isDone ? 'Görev Tamamlandı! 🎉' : 'Göreve Devam Ediliyor',
            t.title
          );
          return {
            ...t,
            status: nextStatus,
            completedAt: isDone ? new Date().toISOString() : null
          };
        }
        return t;
      })
    );
  };

  // CRUD: 3. Görev Sil (DELETE)
  const handleDeleteTask = (id) => {
    const taskToDelete = tasks.find(t => t.id === id);
    if (!taskToDelete) return;

    if (window.confirm(`'${taskToDelete.title}' başlıklı görevi silmek istediğinize emin misiniz?`)) {
      setTasks(prev => prev.filter(t => t.id !== id));
      addLog('warning', 'Görev Silindi', `'${taskToDelete.title}' görevi sistemden kalıcı olarak kaldırıldı.`);
      showToast('warning', 'Görev Silindi', `'${taskToDelete.title}' silindi.`);
    }
  };

  // CRUD: 4. Düzenleme Başlat
  const handleStartEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Hata Yakalama Tetikleyicisi (Modal Validasyonu)
  const handleValidationError = (title, message, details) => {
    addLog('error', title, message, details);
    showToast('error', title, message);
  };

  // Hata Simülasyonu (Kullanıcının ve Hocanın Test Edebilmesi İçin)
  const handleSimulateError = () => {
    addLog(
      'error',
      'Test Hatası: Doğrulama Başarısız Oldu',
      "Kullanıcı 'title' alanını boş bırakarak görev kaydetmeye çalıştı.",
      "Validation Error: field 'title' is required (min 3 chars)."
    );
    showToast('error', 'Test Hatası Tetiklendi', 'Sistem hata günlüğüne örnek bir hata kaydı başarıyla eklendi.');
  };

  // Verileri Varsayılana Sıfırla
  const handleResetData = () => {
    if (window.confirm('Tüm görevleri başlangıçtaki örnek veri setine sıfırlamak istiyor musunuz?')) {
      setTasks(initialTasks);
      addLog('info', 'Veriler Sıfırlandı', 'Kullanıcı tüm görevleri fabrika ayarlarına döndürdü.');
      showToast('info', 'Sıfırlandı', 'Tüm görevler ilk haline getirildi.');
    }
  };

  // Filtreleme ve Arama Algoritması
  const filteredTasks = tasks.filter(task => {
    // 1. Durum Filtresi
    if (statusFilter !== 'all' && task.status !== statusFilter) return false;

    // 2. Öncelik Filtresi
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

    // 3. Arama Filtresi (Kelime bazlı)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const inTitle = task.title.toLowerCase().includes(q);
      const inDesc = (task.description || '').toLowerCase().includes(q);
      const inAssignee = (task.assignee || '').toLowerCase().includes(q);
      const inCategory = (task.category || '').toLowerCase().includes(q);
      const inTags = Array.isArray(task.tags) && task.tags.some(t => t.toLowerCase().includes(q));
      if (!inTitle && !inDesc && !inAssignee && !inCategory && !inTags) return false;
    }

    return true;
  });

  const counts = {
    all: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  };

  const errorCount = logs.filter(l => l.type === 'error').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {/* Üst Menü */}
      <Header
        onOpenNewTask={() => {
          setEditingTask(null);
          setIsModalOpen(true);
        }}
        onOpenErrorLog={() => setIsErrorLogOpen(true)}
        onResetData={handleResetData}
        errorCount={errorCount}
        taskCount={tasks.length}
      />

      {/* Ana Gövde */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Metrik Kartları ve İlerleme Çubuğu */}
        <StatsCards tasks={tasks} />

        {/* Arama ve Filtreleme */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          counts={counts}
        />

        {/* Görev Kartları Grid'i */}
        {filteredTasks.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-12 text-center">
            <Inbox className="w-12 h-12 mx-auto text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-slate-300">Aramanıza uygun görev bulunamadı</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Filtrelerinizi değiştirebilir veya sağ üstteki <strong>"Yeni Görev"</strong> butonuna tıklayarak ilk görevinizi oluşturabilirsiniz.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setPriorityFilter('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleStatus={handleToggleStatus}
                onEdit={handleStartEdit}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </main>

      {/* Alt Bilgi (Footer) */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>TaskFlow Web • React.js + Tailwind CSS Bitirme Projesi</span>
          <span>
            Geliştirici: <strong className="text-slate-300">Sefa Yusuf Kütük</strong> • Eğitmen: <strong>Onur Yalçın</strong>
          </span>
        </div>
      </footer>

      {/* Modal: Görev Ekle / Düzenle */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        editingTask={editingTask}
        onError={handleValidationError}
      />

      {/* Drawer: Canlı Hata & İşlem Günlüğü */}
      <ErrorLogDrawer
        isOpen={isErrorLogOpen}
        onClose={() => setIsErrorLogOpen(false)}
        logs={logs}
        onClearLogs={() => setLogs([])}
        onSimulateError={handleSimulateError}
      />

      {/* Canlı Bildirim (Toast) */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
