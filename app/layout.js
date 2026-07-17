import './globals.css'
import dynamic from 'next/dynamic'
const Analytics = dynamic(() => import('@vercel/analytics/react'), { ssr: false })

export const metadata = {
  title: 'Angga — Network Engineer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preload" as="image" href="/images/foto_HD.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" onLoad="this.rel='stylesheet'" />
        <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" /></noscript>
        <style>{`/* Critical hero + header CSS inlined for faster first paint */
.hero__name{font-size:clamp(52px,8vw,96px);font-weight:700;line-height:1;margin:0;display:block}
.hero__roles{display:flex;justify-content:center;gap:12px;margin-bottom:24px}
.hero__photo-wrap{width:240px;height:320px;margin:0 auto}
.hero__actions .btn{display:inline-block;padding:10px 14px;border-radius:8px}
.nav{position:fixed;top:0;left:0;right:0}
`}</style>
      </head>
      <body>
        <a href="#hero" className="skip-link">Skip to content</a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
