# Project Context & Architecture Decisions

## Portofolio Angga (`porto-next`)

### Hero Layout Standards

#### 1. Desktop Layout (`min-width: 769px`)
- **Composition**:
  - Left column (`.hero-left-box`): Greeting, Name, Role, Bio summary, Buttons (`.hero-actions-group` flex row), Location. Shifted slightly to the right with `margin-left: 80px` on desktop for a centered, well-balanced left-stage composition (reset to `0` on tablet and mobile).
  - Marquee outline text (`.bg-name-marquee`): Raised to `top: 44%` on desktop to fill upper vertical negative space below the navbar. Left-column text automatically synchronizes its vertical position via baseline calculation in `alignWithMarquee`. Mobile remains centered at `top: 50%`.
  - Portrait (`.profile-wrap`) at `left: calc(50% + 350px)` and Floating Terminal (`.hero-term-badge`) at `left: calc(50% + 40px)`: Shifted further to the right preserving the relative 310px distance between them.
  - Radar circles (`.concentric-circles`): Positioned at `top: 46%; left: calc(50% + 350px)` to maintain concentric halo effect directly behind head.
  - Buttons subgroup (`.hero-actions-subgroup`): Uses `display: contents;` on desktop so all three buttons align horizontally in a single flex row without modifying desktop styling.

#### 2. Mobile Layout (`max-width: 768px`)
- **Viewport Target**: 360px to 420px widths (Android & iOS).
- **Portrait Framing**:
  - Centered horizontally, anchored with comfortable breathing room below navbar (`top: 82px`), height capped at `46vh` / `max-height: 400px` so the head never touches or overlaps the floating navbar pill.
  - Subtle bottom gradient mask (`linear-gradient(to bottom, black 0%, black 72%, transparent 98%)`) provides a smooth visual blend into the background watermark marquee.
- **Button Grid Architecture**:
  - Container `.hero-actions-group`: `display: flex; flex-direction: column; width: 100%; gap: 8px;`
  - Primary button (`.hero-btn-action--primary`): Full width (`width: 100%`) for a prominent thumb touch target.
  - Secondary buttons subgroup (`.hero-actions-subgroup`): 2-column grid `display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 8px; width: 100%;`
  - Secondary buttons: `font-size: 11.5px; padding: 9.5px 8px; text-align: center; justify-content: center;`
  - Result: 100% overflow-free layout across all mobile resolutions down to 320px screen width.
- Typography & Content:
  - Bio summary (`.hero-bio-summary`): Shown on mobile (`display: block; font-size: 12px; line-height: 1.45; max-width: 100%;`) to provide immediate context without clutter.
- **Desktop Parity on Mobile**:
  - Terminal Badge (`.hero-term-badge`): Enabled on mobile, floating on upper-left chest of portrait (`top: 212px; left: 14px; width: 165px; transform: rotate(-3deg);`) with compact typography.
  - Stats Pill (`.hero-stat-box`): Enabled on mobile, positioned on right torso (`top: 328px; right: 14px;`) displaying 2.5+ TAHUN / 4 PERUSAHAAN / 24/7 NOC to match desktop credibility aesthetic.

#### 3. Floating Pill Navbar (`.nav-bar`)
- **Desktop**:
  - `top: 36px` (previously `24px`): Lowered slightly to provide breathing room from the top edge and balance with the raised marquee.
  - `scrolled`: `top: 18px` (previously `14px`).
- **Mobile**:
  - `top: 22px` (previously `16px`): Leaves comfortable margin below mobile status bar / notch / dynamic island.
  - Action buttons (`🌙` theme toggle & `☰` hamburger menu) pushed to the far right via `.nav-mobile-header { width: 100%; justify-content: space-between; }` and `.nav-mobile-actions { margin-left: auto; }`, eliminating dead space on the right of the navbar pill.

### Deployments & Architecture
- **Primary Host**: Standalone VPS Linux `45.66.153.146:20132` (`/var/www/porto-next`).
- **Process Manager**: PM2 daemon (`porto-next`, port `3005`).
- **Web Server / Reverse Proxy**: Nginx with SSL termination, HTTP to HTTPS 301 redirection, static Next.js asset caching (`/_next/static/`), and instant HTTP 444 Drop on scanner attacks (`.env`, `.git`, `wp-login`, etc.).
- **Cloudflare Fully Deactivated**:
  - Removed `@opennextjs/cloudflare` and `wrangler` dependencies from `package.json` (removed 308 bloated packages).
  - Deleted `wrangler.jsonc`, `open-next.config.ts`, and `scripts/patch-opennext.mjs`.
  - Removed `initOpenNextCloudflareForDev()` from `next.config.mjs` to eliminate background Wrangler dev processes.
  - Neutralized `npm run deploy` script in `package.json` so no accidental uploads to Cloudflare occur.
  - Automatic builds on Cloudflare Pages disabled at repo level (no OpenNext configuration exists).
  - **Visitor Tracking & Real IP Resolution Architecture**:
  - **Issue Diagnosed**: VPS network sits on a private interface (`10.10.0.134/22`) behind an upstream gateway router (`10.10.0.1`). Direct incoming traffic undergoes SNAT (masquerade), making `$remote_addr = 10.10.0.1`.
  - **Resolution**:
    - `AnalyticsClient.jsx` asynchronously queries visitor public IP & Geo location (`https://ipwho.is/`, fallback `https://api.ipify.org`) with a 2.5s timeout, cached in `sessionStorage` (`__visitor_geo`) so it only runs once per visitor session with zero navigation lag.
    - `next.config.mjs` allows `https://ipwho.is` and `https://api.ipify.org` in CSP `connect-src`.
    - Server routes (`/api/track-visit` & `/api/admin/login`) check `isPrivateIp(ip)`. If server sees private gateway IP (`10.10.0.1`), it seamlessly resolves to the validated client public IP, displaying: `IP Address: <clientIp> (City, Country · ISP)`.
    - If Cloudflare Proxy (Orange Cloud) is ever re-enabled, `cf-connecting-ip` is automatically prioritized.

### Security & Secrets Management (Telegram Bots & Resend Email)
- **Zero Raw Secrets in Git**: No raw tokens allowed in source code or unit test fixtures.
- **Environment Variables**:
  - `TELEGRAM_BOT_TOKEN`: Monitor bot (`MonitoringServerAnggots_Bot`).
  - `TELEGRAM_LOGS_BOT_TOKEN`: Logs bot for visitor tracking, contact alerts, and admin login notifications (`NotificationLogsAnggots_Bot`).
  - `TELEGRAM_ADMIN_CHAT_ID`: Admin notification receiver ID (`7633699633`).
  - `RESEND_API_KEY`: API Key for sending contact notifications via Resend API to user's personal email.
  - `CONTACT_TO_EMAIL`: Destination email address (`anggatok120@gmail.com`).
- **Files**: Stored in `.env.local` (Next.js) strictly ignored in `.gitignore`. Configured directly on VPS `/var/www/porto-next/.env.local` with `600` permissions. Removed legacy `.dev.vars`.

### Golden Releases
- **v1.2.0-golden** (Current Golden Snapshot):
  - Hero desktop layout: photo & terminal shifted right, left box shifted +80px for centered balance, raised marquee text to `top: 44%` and radar circles to `top: 46%`.
  - Hero mobile layout:
    - Navbar pill: Hamburger menu and theme toggle moved to the far right edge (`width: 100%; justify-content: space-between`).
    - Center alignment: All content (tag, name, role, bio) and objects (action buttons, location pill) 100% centered with symmetrical margins (fixed 380px max-width clamp removed in favor of full 100% width with equal 16px edge padding).
    - Viewport overflow lock: Strictly enforced `overflow-x: hidden; max-width: 100vw;` on `html, body` and `overflow: hidden` on `#work`, `#about`, and `.about-trait-container` to eliminate horizontal scroll bleed.
    - Moving marquee text: Raised to `top: 36%` (behind neck/shoulders) with opacity increased to `0.45` and stroke `1.6px` for crisp legibility.
    - Floating badges: Terminal card (`top: 212px; left: 14px`) and stat card (`top: 328px; right: 14px`) flanking photo symmetrically without overflowing.
  - Floating pill navbar lowered slightly (`top: 36px` desktop, `top: 22px` mobile, `top: 18px` scrolled).
  - Contact form integration: Dual notification enabled (Telegram bot + Resend transactional email to `anggatok120@gmail.com`).
  - Interactive Showcase Projects:
    - `/terminal`: Terminal Linux Interaktif CLI.
    - `/network-lab`: Simulator Topologi Jaringan Enterprise.
    - `/aquaculture`: Smart Aquaculture IoT & Telemetri simulator with live MQTT stream, ESP32 telemetry, water quality sensor dials, and automated actuator controls.
  - Work Gallery Header: Multi-action button group (`Buka Terminal`, `Network Lab`, `Smart Aquaculture`).
  - Zero raw secrets in Git; all bot tokens and API keys secured in `.env.local` (permissions `600` on VPS).
  - VPS snapshot archived at `/var/backups/porto-next-golden/porto-next-golden-v1.2.0.tar.gz`.

- **v1.2.1-golden** (Security Hardening, HTTP 405 Method Filtering, HSTS, & Rate Limiting):
  - **HTTP 405 Method Filtering (proxy.js)**:
    - Seluruh rute non-API (/, /admin, /blog, /privacy, dsb.) hanya mengizinkan method GET, POST, HEAD, dan OPTIONS.
    - Probing method non-standar (PUT, DELETE, TRACE, dsb.) ditolak dengan status **HTTP 405 Method Not Allowed** beserta header Allow: GET, POST, HEAD, OPTIONS.
    - Rute API (/api/contact, /api/track-visit, /api/admin/*) tetap berjalan normal.
  - **Security Headers & HSTS**:
    - Strict-Transport-Security: max-age=63072000; includeSubDomains; preload (2 tahun - standar HSTS preload).
    - poweredByHeader: false di next.config.mjs untuk menyembunyikan eksposur X-Powered-By: Next.js.
    - Camouflage headers: X-Framework: Laravel 11 & X-Powered-By: PHP/8.3 (Laravel 11).
    - Nginx config /etc/nginx/sites-available/anggot.my.id menambahkan alias domain anggot.web.id dan www.anggot.web.id.
  - **Rate Limiting**:
    - Form Login Admin (app/api/admin/login/route.js): Maksimal 5 percobaan gagal per 15 menit per IP (status 429 Too Many Requests, Retry-After: 900).
    - Form Kontak (app/api/contact/route.js): Maksimal 5 pengiriman pesan per 10 menit per IP untuk mencegah spam/abuse.
  - **Automated Tests**: 14/14 tests lolos (100% Green) via npm test.

- **v1.2.2-golden** (Google Search Console Verification, Nginx Camouflage & Cross-Origin Security Hardening):
  - **Google Search Console**:
    - File verifikasi HTML public/google832f2eff07073811.html aktif mengembalikan token verifikasi Google.
    - Meta tag verifikasi otomatis di <head>: <meta name="google-site-verification" content="google832f2eff07073811" /> di app/layout.js.
  - **Nginx & Cross-Origin Security Hardening**:
    - server_tokens off; diaktifkan di /etc/nginx/nginx.conf untuk membuang kebocoran banner versi nginx/1.24.0 (Ubuntu).
    - Menambahkan header proteksi lintas-domain:
      - X-Permitted-Cross-Domain-Policies: none
      - Cross-Origin-Opener-Policy: same-origin
      - Cross-Origin-Resource-Policy: same-origin
      - Cross-Origin-Embedder-Policy: unsafe-none
  - **Cloudflare Edge Integration**:
    - anggot.my.id dan www.anggot.my.id aktif pada Cloudflare Orange Cloud (Proxied) dengan HSTS, SSL Full, dan restorasi Real IP.
  - **Automated Tests**: 14/14 tests lolos (100% Green).

- **v1.2.3-golden** (Cyber Stealth Delta Monogram & Multi-Resolution Google Favicons):
  - **Brand Identity Upgrade**:
    - Mengganti teks monogram 'AG' kotak lama dengan **Monogram Geometris 'A' Cyber Stealth** berbingkai lingkaran obsidian dengan bilah emerald green NOC.
    - Sesuai dengan spesifikasi Google Search Favicon (safe circular crop, high contrast di ukuran 16x16 dan 32x32 px).
    - Memperbarui navbar logo pada `components/Header.jsx` dengan ikon SVG geometris yang serasi.
  - **Asset Suite Google & Web App**:
    - `public/favicon.svg` (vektor scalable).
    - `public/favicon-48x48.png` (resolusi standar Google Search Crawler).
    - `public/icon-192.png` & `public/icon-512.png` (high-res PWA icon).
    - `public/apple-touch-icon.png` (180x180).
    - `public/favicon.ico` (multi-res 16, 32, 48).
  - **Live Deploy**:
    - Seluruh aset telah di-build dan di-deploy ke VPS Linux (`porto-next` port 3005).
    - Seluruh endpoint ikon berstatus HTTP 200 OK.

  - **Custom Domain Email Integration**:
    - Email kontak publik resmi diubah dari `anggatok120@gmail.com` menjadi `contact@anggot.my.id`.
    - Diperbarui pada `components/Contact.jsx`, `app/privacy/page.js`, dan `app/admin/dashboard/page.js`.
    - Cloudflare Email Routing aktif meneruskan seluruh pesan masuk `contact@anggot.my.id` ke `anggatok120@gmail.com`.
