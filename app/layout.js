import './globals.css'
import AnalyticsClient from './AnalyticsClient'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata = {
  title: 'Angga | Network Engineer',
  description: 'Portfolio Angga — Network Engineer, NOC, dan IT Support.',
  icons: {
    icon: [
      { url: '/favicon.svg?v=5', type: 'image/svg+xml' },
      { url: '/favicon.ico?v=5', sizes: '32x32' },
    ],
    shortcut: '/favicon.svg?v=5',
    apple: '/apple-touch-icon.png?v=5',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <head>
        <style>{`/* Critical hero + header CSS inlined for faster first paint */
.hero__content{text-align:left}
.hero__name{max-width:100%;font-size:clamp(60px,9vw,112px);font-weight:700;line-height:.94;margin:0 0 28px;display:block;padding:.08em .12em .1em .025em;overflow:visible;text-align:left}
.hero__roles{display:flex;justify-content:flex-start;gap:12px;margin-bottom:24px;text-align:left}
.hero__photo-wrap{width:320px;height:430px;margin:0 auto}
.hero__actions{display:flex;justify-content:flex-start;margin:0}
.hero__actions .btn{display:inline-flex;padding:12px 22px;border-radius:999px}
@media(max-width:768px){.hero__content,.hero__name{text-align:center}.hero__roles,.hero__actions{justify-content:center}.hero__photo-wrap{width:220px;height:280px}}
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
