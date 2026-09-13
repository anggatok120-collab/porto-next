# Angga Portfolio

Portfolio full-stack modern untuk **Angga — Software Developer & Cybersecurity Enthusiast**. Dibangun dengan Next.js App Router, TypeScript, PostgreSQL, Prisma, Auth.js, Tailwind CSS, dan Framer Motion.

## Fitur

- Public portfolio responsif: hero terminal, about, skills, experience, project case studies, certificates, blog, dan contact.
- Project search/filter, Markdown blog, metadata dinamis, JSON-LD, sitemap, robots, theme system, command palette (`Ctrl/Cmd + K`), loading/error/404 states.
- Admin authentication dengan password bcrypt, JWT session, secure cookies, route protection, dan server-side authorization.
- Dashboard dan CMS untuk projects, skills, experience, certificates, blog, messages, analytics, dan site settings.
- Contact API tervalidasi Zod, honeypot, in-memory rate limit, PostgreSQL persistence, dan notifikasi Resend opsional.
- Prisma schema dan realistic seed data (6 projects, 12 skills, 3 experiences, 5 certificates, 5 articles).
- Tampilan publik memiliki fallback demo sehingga dapat dipreview sebelum database tersambung.

## Menjalankan lokal

```bash
npm install
copy .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Buka `http://localhost:3000`. Admin tersedia di `http://localhost:3000/admin/login`.

## PostgreSQL dan admin

1. Buat database PostgreSQL di Neon, Supabase, atau Railway.
2. Salin connection string pooled ke `DATABASE_URL`.
3. Buat `AUTH_SECRET` dengan nilai acak minimal 32 byte.
4. Isi `ADMIN_EMAIL` dan `ADMIN_PASSWORD` (minimal 12 karakter).
5. Jalankan migrasi lalu `npm run create-admin`. `npm run seed` juga membuat admin jika kedua env tersedia.

Password tidak pernah disimpan plaintext; script menyimpan hash bcrypt dengan cost 12.

## Environment variables

| Variable | Wajib | Kegunaan |
|---|---:|---|
| `DATABASE_URL` | Ya | PostgreSQL connection string |
| `AUTH_SECRET` | Ya | Menandatangani session Auth.js |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Setup | Membuat admin |
| `NEXT_PUBLIC_SITE_URL` | Ya di produksi | Canonical URL dan sitemap |
| `NEXT_PUBLIC_GITHUB_USERNAME` / `GITHUB_TOKEN` | Opsional | GitHub profile/API |
| `RESEND_API_KEY` / `CONTACT_TO_EMAIL` | Opsional | Notifikasi contact email |
| `CLOUDINARY_*` | Opsional | Kredensial storage media |

## Personalisasi

Default identitas dan link sosial berada di [`src/config/site.ts`](src/config/site.ts). Sesudah database diaktifkan, konten operasional dapat dikelola dari `/admin/settings`; data demo ada di [`src/data/demo.ts`](src/data/demo.ts).

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Deploy ke Vercel

1. Push repository ke GitHub dan import ke Vercel.
2. Tambahkan seluruh environment variable production di Vercel.
3. Jalankan migrasi production: `npx prisma migrate deploy`.
4. Deploy. Build script otomatis menjalankan `prisma generate` sebelum `next build`.
5. Gunakan PostgreSQL region yang dekat dengan Vercel deployment. Aktifkan SSL dan connection pooling dari provider.

Untuk upload production, sambungkan Cloudinary/Supabase Storage dan simpan hanya URL tervalidasi di database. Kerangka env sudah tersedia; jangan pernah expose API secret ke `NEXT_PUBLIC_*`.
