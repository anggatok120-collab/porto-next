import './globals.css'
import AnalyticsClient from './AnalyticsClient'

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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" />
        <style>{`/* Critical hero + header CSS inlined for faster first paint */
.hero__content{text-align:left}
.hero__name{font-size:clamp(64px,10vw,124px);font-weight:700;line-height:.82;margin:0 0 28px;display:block;text-align:left}
.hero__roles{display:flex;justify-content:flex-start;gap:12px;margin-bottom:24px;text-align:left}
.hero__photo-wrap{width:320px;height:430px;margin:0 auto}
.hero__actions{display:flex;justify-content:flex-start;margin:0}
.hero__actions .btn{display:inline-flex;padding:12px 22px;border-radius:999px}
.nav{position:fixed;top:16px;left:24px;right:24px}
@media(max-width:768px){.hero__content,.hero__name{text-align:center}.hero__roles,.hero__actions{justify-content:center}.hero__photo-wrap{width:220px;height:280px}.nav{top:10px;left:12px;right:12px}}
`}</style>
        <script dangerouslySetInnerHTML={{__html: "(function(){try{var t=localStorage.getItem('theme'); if(t) document.documentElement.setAttribute('data-theme', t);}catch(e){} })()"}} />
      </head>
      <body>
        {children}
        <AnalyticsClient />
      </body>
    </html>
  )
}
