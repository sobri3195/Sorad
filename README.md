# Sorad

> **Sorad** adalah aplikasi **frontend-only** berbasis React + Vite untuk pembelajaran, referensi cepat, latihan mandiri, kalkulator radioterapi edukatif, dan pencatatan pribadi di domain onkologi radiasi.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-Educational-blue)](#disclaimer)

---

## Daftar Isi

- [Ringkasan](#ringkasan)
- [Analisis Codebase (Detail & Mendalam)](#analisis-codebase-detail--mendalam)
- [Fitur Utama](#fitur-utama)
- [Struktur Proyek](#struktur-proyek)
- [Alur Data & State Management](#alur-data--state-management)
- [Fungsi dan Modul Inti](#fungsi-dan-modul-inti)
- [Teknologi](#teknologi)
- [Instalasi & Menjalankan Lokal](#instalasi--menjalankan-lokal)
- [Build & Deployment](#build--deployment)
- [Roadmap Pengembangan](#roadmap-pengembangan)
- [Kontributor / Author](#kontributor--author)
- [Kontak & Sosial](#kontak--sosial)
- [Dukungan & Donasi](#dukungan--donasi)
- [Disclaimer](#disclaimer)

---

## Ringkasan

Sorad dirancang sebagai **learning companion** untuk onkologi radiasi dengan orientasi:

- **Offline-ready** (tanpa backend/API eksternal).
- **Mobile-first UI** agar nyaman digunakan dari smartphone.
- **Persistensi data lokal** via `localStorage` (bookmark, progress, history, notes, activity).
- **Arsitektur modular** berdasarkan domain belajar: Quiz, Cards, Atlas, Terms, Guide, OAR, Calc, Notes.

Aplikasi ini cocok untuk:
- Dokter muda, mahasiswa, residen, atau pembelajar mandiri.
- Kebutuhan review cepat konsep radioterapi.
- Pencatatan personal dan latihan kuis/flashcard secara lokal.

---

## Analisis Codebase (Detail & Mendalam)

### 1) Arsitektur aplikasi

Aplikasi dibangun sebagai **Single Page Application (SPA)** menggunakan `react-router-dom` dengan routing utama:

- `/` → Home Dashboard
- `/learn` → Learn Hub (Quiz, Cards, Atlas, Terms, Guide, OAR)
- `/tools` → Tools Hub (Calc, History, Bookmarks)
- `/notes` → Modul catatan
- `/about` → Halaman deskripsi dan disclaimer

`App.jsx` menjadi orchestration layer yang:
- Menampung state global tersentral (bookmarks, quizScores, calcHistory, notes, progress, activity, recentSearches, global search results).
- Menyediakan callback lintas modul (`onBookmark`, `onSaveScore`, `onSaveCalc`, `onActivity`, `onSearch`).
- Mendistribusikan state dan action ke halaman-halaman melalui props.

### 2) Pola persistensi data

Project menggunakan custom hook `useLocalStorageState`:

- Inisialisasi state dari `localStorage` lewat helper `readLocal`.
- Sinkronisasi otomatis ke `localStorage` pada setiap update state lewat `useEffect` + `writeLocal`.

Kelebihan pendekatan ini:
- Implementasi ringan tanpa Redux/Zustand.
- Data user tetap ada walau browser ditutup.
- Sesuai untuk aplikasi edukasi personal yang tidak butuh sinkronisasi server.

### 3) Domain konten terpusat

Semua konten edukasi dikelola di `src/data/contentData.js`, termasuk:

- Atlas items
- Terminologi (Terms)
- Disease site guide
- Organ at Risk (OAR)
- Flashcards
- Kategori dan pertanyaan kuis
- Template catatan

Keunggulan:
- Mudah maintenance konten.
- Mudah diperluas dengan data baru.
- Konsisten dipakai oleh berbagai modul tanpa duplikasi.

### 4) UX dan antarmuka

Desain CSS (`src/styles/app.css`) menunjukkan:

- **Mobile container** (`max-width: 540px`).
- **Sticky topbar** + **bottom navigation fixed** (mirip app mobile native).
- Komponen UI reusable: `Card`, chips, list-item, progress, flashcard.
- Dukungan **dark mode** via `prefers-color-scheme`.

### 5) Keterbatasan saat ini (hasil analisis)

- Belum ada backend/sinkronisasi cloud (single-device persistence).
- Belum ada sistem autentikasi/role management.
- Belum ada validasi file import JSON yang lebih ketat (schema validation).
- Belum ada test otomatis (unit/integration/e2e) pada script NPM.

---

## Fitur Utama

### 1. Home Dashboard
- Ringkasan statistik pembelajaran (cards studied, quiz done, bookmark, notes).
- Shortcut cepat ke modul utama.
- Ringkasan activity dan bookmark terbaru.

### 2. Learn Hub
Tab modular dalam satu halaman:
- **Quiz Offline**: kategori, progres soal, scoring, simpan hasil.
- **Flashcards**: flip card, navigasi, shuffle, tandai dipelajari.
- **Atlas**: konsep inti volume dan workflow radioterapi.
- **Terms**: kamus istilah dengan realtime search.
- **Guide**: ringkasan disease site (overview, role, fractionation, OAR, toxicity).
- **OAR**: filter dan pencarian organ-at-risk.

### 3. Tools Hub
- **BED Calculator** (Linear-Quadratic educational helper).
- **EQD2 Calculator**.
- **Dose & Fraction Helper** (konversi Gy/cGy dan total fraksi).
- Riwayat terpadu (perhitungan, skor kuis, aktivitas).
- Bookmark lintas modul.

### 4. Notes Module
- Create / update / delete catatan.
- Template notes siap pakai.
- Tagging sederhana.
- Favorit note.
- Export notes ke JSON.
- Import notes dari JSON.

### 5. Global Search & Recent Search
- Pencarian lintas data Atlas, Terms, Guide, OAR, Cards.
- Panel hasil cepat.
- Riwayat pencarian terbaru.

### 6. Offline-First Behavior
- Seluruh fitur berjalan lokal.
- Tidak bergantung API eksternal.
- Data pengguna disimpan di browser `localStorage`.

---

## Struktur Proyek

```bash
src/
├─ components/
│  ├─ Card.jsx
│  ├─ Layout.jsx
│  └─ SectionHeader.jsx
├─ data/
│  └─ contentData.js
├─ features/
│  ├─ atlas/AtlasModule.jsx
│  ├─ calc/CalcModule.jsx
│  ├─ cards/CardsModule.jsx
│  ├─ guide/GuideModule.jsx
│  ├─ notes/NotesModule.jsx
│  ├─ oar/OarModule.jsx
│  ├─ quiz/QuizModule.jsx
│  └─ terms/TermsModule.jsx
├─ hooks/
│  └─ useLocalStorageState.js
├─ pages/
│  ├─ AboutPage.jsx
│  ├─ HomePage.jsx
│  ├─ LearnPage.jsx
│  └─ ToolsPage.jsx
├─ styles/
│  └─ app.css
├─ utils/
│  └─ storage.js
├─ App.jsx
└─ main.jsx
```

---

## Alur Data & State Management

### Key localStorage
- `sorad_bookmarks`
- `sorad_calc_history`
- `sorad_quiz_scores`
- `sorad_notes`
- `sorad_activity`
- `sorad_progress`
- `sorad_recent_searches`
- `sorad_module_last_open`

### Mekanisme utama
- `pushUnique` menjaga item unik berdasarkan `id` dan membatasi panjang list.
- Riwayat kalkulasi & kuis dipotong ke jumlah tertentu agar tetap ringan.
- Progress belajar (misalnya `cardsStudied`, `quizDone`, favorit kategori) tersimpan persisten.

---

## Fungsi dan Modul Inti

| Modul | Fungsi Inti | Nilai Guna |
|---|---|---|
| Home | Dashboard statistik + ringkasan aktivitas | Monitoring pembelajaran cepat |
| Quiz | Latihan soal per kategori + simpan skor | Evaluasi pemahaman |
| Cards | Flashcard interaktif + shuffle + bookmark | Retensi konsep |
| Atlas | Konsep volume/targeting radioterapi | Referensi teori inti |
| Terms | Kamus istilah + pencarian realtime | Akses terminologi cepat |
| Guide | Panduan disease site ringkas | Orientasi klinis edukatif |
| OAR | Filter & pencarian OAR | Kesadaran aspek proteksi organ |
| Calc | BED/EQD2 + helper dosis | Simulasi edukatif fraksinasi |
| Notes | Catatan personal + export/import JSON | Knowledge management pribadi |

---

## Teknologi

- **Framework UI:** React 18
- **Build tool:** Vite 5
- **Routing:** React Router DOM v6
- **State persistence:** localStorage + custom hook
- **Styling:** CSS vanilla (mobile-first)

---

## Instalasi & Menjalankan Lokal

```bash
npm install
npm run dev
```

Akses default Vite (biasanya): `http://localhost:5173`

---

## Build & Deployment

### Build production
```bash
npm run build
```

### Preview build
```bash
npm run preview
```

Aplikasi siap dideploy sebagai **static frontend** ke platform seperti:
- Vercel
- Netlify
- GitHub Pages (dengan penyesuaian base path bila perlu)

---

## Roadmap Pengembangan

- [ ] Tambah testing (`Vitest` + React Testing Library).
- [ ] Tambah validasi schema untuk import notes JSON.
- [ ] Tambah fitur export/import data global (bukan hanya notes).
- [ ] Tambah mode multi-bahasa (ID/EN).
- [ ] Tambah analytics lokal untuk insight pembelajaran.
- [ ] Opsional backend sinkronisasi akun (cloud sync).

---

## Kontributor / Author

- **Author:** Lettu Kes dr. Muhammad Sobri Maulana, S.Kom, CEH, OSCP, OSCE  
- **GitHub:** [github.com/sobri3195](https://github.com/sobri3195)

---

## Kontak & Sosial

- **Email:** [muhammadsobrimaulana31@gmail.com](mailto:muhammadsobrimaulana31@gmail.com)
- **YouTube:** [@muhammadsobrimaulana6013](https://www.youtube.com/@muhammadsobrimaulana6013)
- **Telegram:** [winlin_exploit](https://t.me/winlin_exploit)
- **TikTok:** [@dr.sobri](https://www.tiktok.com/@dr.sobri)
- **Grup WhatsApp:** [Join Group](https://chat.whatsapp.com/B8nwRZOBMo64GjTwdXV8Bl)
- **Website:** [muhammadsobrimaulana.netlify.app](https://muhammadsobrimaulana.netlify.app)

---

## Dukungan & Donasi

Jika project ini bermanfaat, dukungan Anda sangat membantu pengembangan berkelanjutan:

- [Lynk.id](https://lynk.id/muhsobrimaulana)
- [Trakteer](https://trakteer.id/g9mkave5gauns962u07t)
- [KaryaKarsa](https://karyakarsa.com/muhammadsobrimaulana)
- [Nyawer](https://nyawer.co/MuhammadSobriMaulana)
- [Sevalla Page](https://muhammad-sobri-maulana-kvr6a.sevalla.page/)
- [Gumroad](https://maulanasobri.gumroad.com/)
- **Toko Online Sobri:** [pegasus-shop.netlify.app](https://pegasus-shop.netlify.app)

---

## Disclaimer

Sorad dibuat untuk **edukasi, referensi cepat, dan pencatatan pribadi**.  
Aplikasi ini **bukan** alat keputusan klinis resmi dan **bukan pengganti** clinical judgement dokter, fisikawan medis, serta guideline terapi resmi yang berlaku.
