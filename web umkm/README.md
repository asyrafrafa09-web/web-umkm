# Website Warung Nasi Krawu

Website untuk warung nasi krawu dengan integrasi Google Spreadsheet untuk manajemen menu.

## Fitur

- Desain responsif dengan Tailwind CSS
- Integrasi dengan Google Spreadsheet untuk data menu
- Menu dinamis yang dapat diupdate melalui spreadsheet
- Tampilan modern dan menarik
- Status ketersediaan menu

## Setup Google Spreadsheet dengan Apps Script

### 1. Buat Spreadsheet Baru

Buat spreadsheet di Google Sheets dengan struktur berikut:

| Nama Menu | Deskripsi | Harga | URL Gambar | Tersedia |
|-----------|-----------|-------|------------|----------|
| Nasi Krawu Komplit | Nasi putih dengan daging sapi krawu, sambal terasi, dan serundeng | 25000 | https://example.com/image.jpg | Ya |
| Nasi Krawu Biasa | Nasi putih dengan daging sapi krawu dan sambal terasi | 20000 | https://example.com/image2.jpg | Ya |

- Sheet name: **Menu**
- Kolom A: Nama Menu
- Kolom B: Deskripsi
- Kolom C: Harga (angka tanpa titik/koma)
- Kolom D: URL Gambar (opsional)
- Kolom E: Tersedia (Ya/Tidak)

### 2. Setup Google Apps Script

1. Di spreadsheet, klik **Extensions** → **Apps Script**
2. Hapus kode default dan paste kode dari file `apps-script.js`
3. Klik **Deploy** → **New deployment**
4. Pilih type: **Web app**
5. Atur:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Klik **Deploy**
7. Copy **Web app URL** yang dihasilkan

### 3. Konfigurasi Website

Edit file `script.js` dan ganti:

```javascript
const APPS_SCRIPT_URL = 'YOUR_WEB_APP_URL'; // Paste URL dari Apps Script
```

## Cara Menjalankan

1. Buka file `index.html` di browser
2. Atau gunakan live server untuk development

## Struktur File

```
├── index.html       # Halaman utama
├── script.js        # JavaScript untuk load data dari spreadsheet
├── apps-script.js   # Kode untuk Google Apps Script (paste di Apps Script Editor)
└── README.md        # Dokumentasi
```

## Catatan

- Jika gagal load dari spreadsheet, website akan menampilkan menu dummy sebagai fallback
- Tidak perlu API Key, lebih mudah dengan Google Apps Script
- Gambar bisa menggunakan URL dari Google Drive, Imgur, atau hosting lainnya
- Untuk gambar di Google Drive, gunakan format: `https://drive.google.com/uc?id=FILE_ID`
- Jika update data di spreadsheet, perubahan akan langsung terlihat di website

## Customisasi

- Warna tema bisa diubah di class Tailwind (orange-600, red-600, dll)
- Informasi kontak bisa diubah di section Contact
- Tambahkan fitur pemesanan dengan menghubungkan ke WhatsApp atau form order
