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

## Pengiriman otomatis di Vercel

Tambahkan `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, dan `CRON_SECRET` pada environment Production Vercel. `CRON_SECRET` harus berupa nilai acak minimal 16 karakter.

Konfigurasi `vercel.json` mengirim pengingat harian pukul 06.00 WIB dan pengingat mingguan setiap Minggu pukul 18.00 WIB. Vercel Cron menggunakan UTC, sehingga ekspresi cron sudah dikonversi dari zona waktu Asia/Jakarta.

Endpoint cron dilindungi header `Authorization: Bearer <CRON_SECRET>` yang ditambahkan otomatis oleh Vercel.
