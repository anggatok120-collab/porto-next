'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Analytics } from '@vercel/analytics/react'

export default function AnalyticsClient() {
  const pathname = usePathname()
  const lastTrackedRef = useRef('')

  useEffect(() => {
    try {
      if (!pathname || pathname.startsWith('/admin')) {
        return
      }

      if (lastTrackedRef.current === pathname) {
        return
      }
      lastTrackedRef.current = pathname

      fetch('/api/track-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: pathname,
          referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
        }),
        keepalive: true,
      }).catch(() => {})
    } catch {}
  }, [pathname])

  return <Analytics />
}
