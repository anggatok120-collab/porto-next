import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  title: 'Angga — Network Engineer',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preload" as="image" href="/images/foto_HD-1200.avif" type="image/avif" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" onLoad="this.rel='stylesheet'" />
        <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" /></noscript>
        <style>{`/* Critical hero CSS inlined for faster first paint */\n.hero__name{font-size:clamp(52px,8vw,96px);font-weight:700;line-height:1;margin:0;display:block}\n.hero__roles{display:flex;justify-content:center;gap:12px;margin-bottom:24px}\n.hero__photo-wrap{width:240px;height:320px;margin:0 auto}\n`}</style>
      </head>
      <body>{children}<Analytics /><SpeedInsights /></body>
    </html>
  )
}
