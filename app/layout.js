import './globals.css'
import AnalyticsClient from './AnalyticsClient'
import { ThemeProvider } from '../components/ThemeProvider'
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
    <html lang="id" className={`dark ${inter.variable} ${jetBrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme'); if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');}else{document.documentElement.classList.add('dark');}}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <AnalyticsClient />
      </body>
    </html>
  )
}
