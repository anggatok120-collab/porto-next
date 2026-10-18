'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Analytics } from '@vercel/analytics/react'

async function getVisitorGeo() {
  if (typeof window === 'undefined') return null

  try {
    const cached = sessionStorage.getItem('__visitor_geo')
    if (cached) {
      const parsed = JSON.parse(cached)
      if (parsed && parsed.ip) return parsed
    }
  } catch {}

  // Coba ambil dari ipwho.is (cepat, mendukung CORS & ada kota/negara/ISP)
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 2500)
    const res = await fetch('https://ipwho.is/', {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    })
    clearTimeout(timer)
    if (res.ok) {
      const data = await res.json()
      if (data && data.success && data.ip) {
        const geoInfo = {
          ip: data.ip,
          city: data.city || '',
          country: data.country || data.country_code || '',
          isp: data.connection?.isp || data.connection?.org || ''
        }
        try {
          sessionStorage.setItem('__visitor_geo', JSON.stringify(geoInfo))
        } catch {}
        return geoInfo
      }
    }
  } catch {}

  // Fallback ke api.ipify.org jika ipwho.is gagal atau terblokir
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 2000)
    const res = await fetch('https://api.ipify.org?format=json', {
      signal: controller.signal
    })
    clearTimeout(timer)
    if (res.ok) {
      const data = await res.json()
      if (data && data.ip) {
        const geoInfo = { ip: data.ip, city: '', country: '', isp: '' }
        try {
          sessionStorage.setItem('__visitor_geo', JSON.stringify(geoInfo))
        } catch {}
        return geoInfo
      }
    }
  } catch {}

  return null
}

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

      const track = async () => {
        let geo = null
        try {
          geo = await getVisitorGeo()
        } catch {}

        fetch('/api/track-visit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: pathname,
            referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
            clientIp: geo?.ip || '',
            clientCity: geo?.city || '',
            clientCountry: geo?.country || '',
            clientIsp: geo?.isp || '',
          }),
          keepalive: true,
        }).catch(() => {})
      }

      track()
    } catch {}
  }, [pathname])

  return <Analytics />
}
