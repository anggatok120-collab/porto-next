# Akuakalcer

Aplikasi manajemen jadwal perkuliahan tersedia di `/kuliah`.

## Menjalankan aplikasi

```bash
npm install
npm run dev
```

Buka `http://localhost:3000/kuliah`. Mata kuliah, jadwal, tugas, dan preferensi Telegram disimpan di `localStorage` browser.

## Mengaktifkan Telegram

1. Buat bot melalui `@BotFather` di Telegram.
2. Tambahkan token ke `.env`:

```env
TELEGRAM_BOT_TOKEN=token_bot_anda
```

3. Jalankan ulang server.
4. Mulai percakapan dengan bot, masukkan Chat ID pada halaman Pengingat, lalu gunakan tombol `Kirim pengingat sekarang`.

Token hanya dibaca oleh route server `/api/kuliah/telegram` dan tidak dikirim ke browser.

Preferensi waktu harian disimpan untuk integrasi scheduler. Agar pengiriman tetap berjalan saat aplikasi tertutup, panggil endpoint dari cron platform deployment dengan penyimpanan data server yang sesuai.
