'use client'

import React, { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'

export default function AnalyticsClient() {
  useEffect(() => {
    try {
      const pathname = window.location.pathname || '/'
      const sessionKey = `visited_${pathname}`
      if (!sessionStorage.getItem(sessionKey)) {
        sessionStorage.setItem(sessionKey, '1')
        fetch('/api/track-visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: pathname,
            referrer: document.referrer || '',
          }),
          keepalive: true,
        }).catch(() => {})
      }
    } catch {}
  }, [])

  return <Analytics />
}
