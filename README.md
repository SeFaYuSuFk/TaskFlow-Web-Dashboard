# ⚡ TaskFlow Web — Modern Görev & Sprint Yönetim Paneli

**Bitirme Projesi:** Web Geliştirme (JavaScript / React.js)  
**Eğitmen:** Onur Yalçın  
**Kurum:** TNC Group  
**Geliştirici:** Sefa Yusuf Kütük    
**Durum:** Tamamlandı (%100 Kapsam + Canlı Hata Takip Paneli)

---

## 📌 Proje Genel Bakışı

Bu proje; modern yazılım ekiplerinin sprint görevlerini, iş akışlarını ve önceliklerini takip etmesini sağlayan, **React.js** ve **Tailwind CSS** kullanılarak geliştirilmiş yüksek performanslı bir tek sayfa web uygulamasıdır (SPA).

1. Projemiz olan **NovaStore SQL** veritabanı ve 2. Projemiz olan **TaskFlow REST API** ile tam entegre çalışacak bir mimaride tasarlanmış; böylece tüm staj programı birbiriyle konuşan **bütüncül bir kurumsal yazılım ekosistemine** dönüştürülmüştür.

---

## 📂 Teslimat Klasörü İçeriği

Bu klasör, eğitmenimiz Onur Yalçın'a sunulmak üzere en temiz ve doğrudan erişilebilir biçimde organize edilmiştir:

```text
Web Geliştirme/
├── TaskFlow Web Proje Raporu.docx   (4 Canlı Ekran Görüntüsü İçeren Resmi Proje Raporu)
├── TaskFlow-Web-Uygulamasi.js       (Tek tıkla açılıp doğrudan incelenebilen tam proje kaynak kodu)
├── README.md                        (Proje tanıtımı, 6 büyük değer ve çalıştırma kılavuzu)
├── Ekran Görüntüleri/               (Sistemden alınan yüksek çözünürlüklü 4 ekran görüntüsü)
│   ├── Gorsel_1_Ana_Pano_Gorunumu.jpg
│   ├── Gorsel_2_Hata_ve_Sistem_Gunlugu_Drawer.png
│   ├── Gorsel_3_Yeni_Gorev_Ekleme_Modal_Formu.jpg
│   └── Gorsel_4_Gorev_Kartlari_ve_Rozetler.png
└── Proje Kodları/                   (Eksiksiz React + Tailwind + Vite kaynak kodları)
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    └── src/
        ├── components/
        │   ├── Header.jsx           (Navigasyon, Hata Sayacı, Hızlı Aksiyonlar)
        │   ├── StatsCards.jsx       (Metrikler ve Canlı İlerleme Çubuğu)
        │   ├── FilterBar.jsx        (Arama Motoru ve Durum Sekmeleri)
        │   ├── TaskCard.jsx         (Görev Kartı, Durum Değiştirme, Düzenle, Sil)
        │   ├── TaskModal.jsx        (Görev Ekleme/Güncelleme ve Validasyon)
        │   ├── Toast.jsx            (Kayar Canlı Bildirimler)
        │   └── ErrorLogDrawer.jsx   (Sistem ve Hata Günlüğü Çekmecesi)
        ├── pages/
        │   └── Dashboard.jsx        (Ana Pano ve LocalStorage Motoru)
        ├── data/
        │   └── initialTasks.js      (Başlangıç Görev Verileri)
        ├── App.jsx                  (React Error Boundary Kalkanı)
        ├── main.jsx                 (React Giriş Noktası)
        └── index.css                (Tailwind Direktifleri)
```

---

## 🌟 Projemizin 6 Büyük Değeri

1. **Tam Teşekküllü CRUD:** Ekleme (Create), Listeleme (Read), Güncelleme (Update), Silme (Delete) ve Anlık Durum Değiştirme (Toggle Todo/Completed).
2. **Kalıcı LocalStorage Motoru:** Sayfa veya tarayıcı kapansa bile tüm görevler, etiketler ve sistem logları yerel bellekte güvenle saklanır.
3. **Canlı Sprint İlerleme Çubuğu (Progress Bar):** Görevler tamamlandıkça %0'dan %100'e doğru akıcı bir animasyonla dolan görsel ilerleme motoru.
4. **Anlık Klavye Arama Motoru & Sekmeli Filtreleme:** Başlık, açıklama, atanan kişi veya etiket yazıldığı an harf harf filtreleme; durumlara ve öncelik seviyelerine göre ayrıştırma.
5. **Canlı Hata & İşlem Günlüğü (Audit Drawer):** Kullanıcının yaptığı tüm işlemleri ve sistemde yakalanan tüm uyarıları saniyesi saniyesine kayıt altına alan çekmece paneli. Ayrıca hata sistemini test etmek için **"Test Et (Hata Simülasyonu)"** butonu.
6. **React Çökme Kalkanı (Error Boundary):** Beklenmedik bir JavaScript hatasında uygulamanın beyaz ekrana düşmesini engelleyen kurumsal kurtarma katmanı.

---

## 🚀 Yerel Kurulum ve Çalıştırma

### Adım 1: "Proje Kodları" Klasörüne Geçin
```bash
cd "Proje Kodları"
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
npm install
```

### Adım 3: Geliştirme Sunucusunu Başlatın
```bash
npm run dev
# Veya Windows terminalinde:
npm.cmd run dev
```

Terminalde açılan **`http://localhost:3000`** bağlantısını tarayıcınızda açarak TaskFlow Web uygulamasını anında kullanabilirsiniz!

---
**Geliştirici:** Sefa Yusuf Kütük  
**Eğitmen:** Onur Yalçın  
**Kurum:** TNC Group
