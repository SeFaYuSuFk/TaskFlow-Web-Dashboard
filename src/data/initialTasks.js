// src/data/initialTasks.js
// TaskFlow Web — Başlangıç Görev Veri Seti (LocalStorage Seed Data)
// Geliştirici: Sefa Yusuf Kütük

export const initialTasks = [
  {
    id: "tsk-001",
    title: "NovaStore T-SQL Veritabanı ve Stored Procedure Mimarisi",
    description: "Salih Tekin hocamızın projesi kapsamında 5 ilişkili tablo, akıllı sipariş prosedürü ve otomatik stok düşürme trigger sisteminin tamamlanması.",
    priority: "high",
    status: "completed",
    assignee: "Sefa Yusuf Kütük",
    category: "Veritabanı",
    tags: ["SQL Server", "T-SQL", "Stored Procedure"],
    createdAt: "2026-11-07T10:00:00.000Z",
    completedAt: "2026-11-07T16:30:00.000Z"
  },
  {
    id: "tsk-002",
    title: "TaskFlow REST API Backend ve 5 Katmanlı Güvenlik Kalkanı",
    description: "Musa Kolcuk hocamızın projesi kapsamında Node.js, Express, Helmet, Rate Limiter ve Validation Middleware katmanlarının kodlanması.",
    priority: "critical",
    status: "completed",
    assignee: "Sefa Yusuf Kütük",
    category: "Backend",
    tags: ["Node.js", "Express", "Security", "REST API"],
    createdAt: "2026-11-08T08:00:00.000Z",
    completedAt: "2026-11-08T10:30:00.000Z"
  },
  {
    id: "tsk-003",
    title: "React.js + Tailwind CSS ile Modern Görev Yönetim Arayüzü",
    description: "Onur Yalçın hocamızın projesi kapsamında tam teşekküllü CRUD, LocalStorage kalıcılığı, canlı arama ve filtreleme sekmelerinin geliştirilmesi.",
    priority: "critical",
    status: "in_progress",
    assignee: "Sefa Yusuf Kütük",
    category: "Frontend",
    tags: ["React", "Tailwind CSS", "Vite", "CRUD"],
    createdAt: "2026-11-08T11:00:00.000Z",
    completedAt: null
  },
  {
    id: "tsk-004",
    title: "Canlı Bildirim (Toast) ve Sistem Hata Takip Paneli",
    description: "Kullanıcı hatalarını ve sistem işlemlerini saniyesi saniyesine kayıt altına alan ve arayüzde gösteren interaktif Log / Audit çekmecesi.",
    priority: "high",
    status: "in_progress",
    assignee: "Sefa Yusuf Kütük",
    category: "Frontend",
    tags: ["React", "UI/UX", "Error Handling"],
    createdAt: "2026-11-08T11:15:00.000Z",
    completedAt: null
  },
  {
    id: "tsk-005",
    title: "Netlify Üzerinde Canlı Yayına Alma ve CI/CD Dağıtımı",
    description: "React uygulamasının build edilip Netlify üzerinde herkese açık canlı bağlantı olarak yayına sunulması.",
    priority: "medium",
    status: "todo",
    assignee: "Sefa Yusuf Kütük",
    category: "DevOps",
    tags: ["Netlify", "Deployment", "Vite Build"],
    createdAt: "2026-11-08T11:30:00.000Z",
    completedAt: null
  },
  {
    id: "tsk-006",
    title: "Flutter Mini Katalog ve Sepet Yönetimi Mobil Uygulaması",
    description: "Hüseyin Adıgüzel hocamızın 4. projesi için Dart ve Flutter bileşenlerinin, GridView ve Model yapısının kurgulanması.",
    priority: "medium",
    status: "todo",
    assignee: "Hüseyin Adıgüzel",
    category: "Mobile",
    tags: ["Flutter", "Dart", "Mobile UI"],
    createdAt: "2026-11-08T11:45:00.000Z",
    completedAt: null
  }
];
