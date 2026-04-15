# Mitsubishi Sleman Astro — Website Dealer Resmi

Website resmi dealer Mitsubishi di Sleman, Yogyakarta. Dibangun dengan [Astro](https://astro.build/) dan di-deploy otomatis ke [Netlify](https://www.netlify.com/).

🌐 **Live:** [mitsubishi-sleman.online](https://mitsubishi-sleman.online)

---

## 🚀 Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Astro 6.x (SSG) |
| Styling | Vanilla CSS (`src/styles/style.css`) |
| JavaScript | Vanilla JS (`public/js/script.js`) |
| CMS | Netlify CMS (Decap CMS) |
| Deploy | Netlify (auto dari branch `main`) |
| Font | MMC Regular + Google Fonts (Inter, Outfit) |
| Icons | Font Awesome 6 (CDN) |
| Sitemap | `@astrojs/sitemap` (otomatis) |

---

## 📁 Struktur Proyek

```
src/
├── components/
│   ├── Breadcrumb.astro       ← Navigasi breadcrumb reusable
│   ├── RelatedProducts.astro  ← Grid rekomendasi produk
│   └── SidebarCTA.astro       ← Sidebar WhatsApp sticky
├── layouts/
│   └── Layout.astro           ← Layout utama (header, nav, footer, WA float)
├── pages/
│   ├── index.astro            ← Homepage
│   ├── 404.astro              ← Halaman 404 custom
│   ├── xpander-sleman.astro
│   ├── pajero-sport-sleman.astro
│   ├── xforce-jogja.astro
│   ├── dealer-mitsubishi-sleman.astro
│   └── blog/
│       ├── kredit-mitsubishi-sleman.astro
│       └── perbandingan-xpander-vs-xforce.astro
├── styles/
│   └── style.css              ← Stylesheet utama (di-bundle oleh Astro)
└── data/
    ├── cars.json              ← Katalog 7 unit mobil (editable via CMS)
    └── siteConfig.json        ← Konfigurasi hero, promo, kontak (editable via CMS)

public/
├── images/                    ← Aset gambar (.webp, .png)
├── fonts/                     ← Custom font MMC Regular
├── js/script.js               ← Script interaktif
├── admin/                     ← Netlify CMS admin panel
└── robots.txt
```

---

## ⚙️ Setup Development

**Prasyarat:** Node.js ≥ 22.12.0 (gunakan [nvm](https://github.com/nvm-sh/nvm))

```bash
# Install dependencies
npm install

# Jalankan server development
npm run dev
# → http://localhost:4321

# Build production
npm run build

# Preview hasil build
npm run preview
```

---

## 🔑 CMS Admin

Akses panel CMS Netlify di: **`https://mitsubishi-sleman.online/admin/`**

Login menggunakan akun GitHub yang memiliki akses ke repository.

### Yang Bisa Diubah via CMS:
- **Pengaturan Website** — Teks hero, deskripsi promo, nomor WhatsApp, pesan WA
- **Katalog Mobil** — Nama, harga, deskripsi, foto, slug untuk setiap unit

> ⚠️ Spesifikasi detail, tabel harga, dan simulasi kredit di halaman produk masih **hardcoded** di file `.astro` dan perlu diedit langsung via kode.

---

## 🚀 Deploy ke Netlify

Deploy otomatis terjadi setiap kali ada `git push` ke branch `main`.

### Sync ke GitHub (Linux):

```bash
chmod +x sync_github.sh
./sync_github.sh
```

### Sync ke GitHub (Windows):

```bat
sync_github.bat
```

---

## 📄 Halaman

| URL | Deskripsi |
|---|---|
| `/` | Homepage |
| `/xpander-sleman.html` | Harga & Promo Xpander |
| `/pajero-sport-sleman.html` | Harga & Promo Pajero Sport |
| `/xforce-jogja.html` | Harga & Promo Xforce |
| `/dealer-mitsubishi-sleman.html` | Info Dealer Sun Star Motor |
| `/blog/kredit-mitsubishi-sleman.html` | Tips kredit Mitsubishi |
| `/blog/perbandingan-xpander-vs-xforce.html` | Komparasi Xpander vs Xforce |
| `/sitemap-index.xml` | Sitemap (auto-generate) |
| `/admin/` | Panel CMS Netlify |

---

## 👤 Kontak

**Putra** — Sales Consultant Resmi Mitsubishi Sleman  
📞 [+62 897-4362-666](tel:+628974362666)  
💬 [WhatsApp](https://wa.me/628974362666)  
📍 Sun Star Motor — Jl. Magelang Km. 14, Sleman, DIY
