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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  'mainEntity': {
    '@type': 'Person',
    'name': 'Angga',
    'alternateName': 'Anggot',
    'jobTitle': 'Network Engineer & NOC Specialist',
    'url': 'https://anggot.my.id',
    'description': 'Network Engineer, NOC (Network Operations Center), MikroTik, Cisco, Linux Server, dan IT Infrastructure Specialist.',
    'knowsAbout': [
      'Computer Networking',
      'MikroTik RouterOS',
      'Cisco CCNA',
      'Linux Server Administration',
      'NOC Monitoring',
      'IoT Telemetry',
      'Next.js Web Development'
    ]
  }
}

export const metadata = {
  metadataBase: new URL('https://anggot.my.id'),
  title: {
    default: 'Angga | Network Engineer & NOC Specialist',
    template: '%s | Angga'
  },
  description: 'Portofolio profesional Angga — Network Engineer, NOC (Network Operations Center), MikroTik, Cisco, Linux Server, dan IT Infrastructure Specialist.',
  keywords: [
    'Angga',
    'Portofolio Angga',
    'Network Engineer',
    'NOC Specialist',
    'Network Operations Center',
    'MikroTik',
    'Cisco',
    'Linux Server',
    'IT Infrastructure',
    'Network Administrator',
    'anggot.my.id',
    'Portfolio Network Engineer Indonesia'
  ],
  authors: [{ name: 'Angga', url: 'https://anggot.my.id' }],
  creator: 'Angga',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Angga | Network Engineer & NOC Specialist',
    description: 'Portofolio profesional Angga — Network Engineer, NOC, MikroTik, Cisco, Linux Server, dan IT Infrastructure Specialist.',
    url: 'https://anggot.my.id',
    siteName: 'Portofolio Angga',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Angga | Network Engineer & NOC Specialist',
    description: 'Portofolio profesional Angga — Network Engineer, NOC, dan IT Infrastructure Specialist.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg?v=6', type: 'image/svg+xml' },
      { url: '/favicon-48x48.png?v=6', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png?v=6', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico?v=6', sizes: 'any' },
    ],
    shortcut: '/favicon.svg?v=6',
    apple: [
      { url: '/apple-touch-icon.png?v=6', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'google832f2eff07073811',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
