'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle')
  const [formError, setFormError] = useState('')
  const [lang, setLang] = useState('id')

  async function handleSubmit(e) {
    e.preventDefault()
    setFormStatus('loading')
    setFormError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Gagal mengirim')
      setFormStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      setFormError(err.message)
      setFormStatus('error')
    }
  }

  useEffect(() => {
    // NAV
    const toggle = document.getElementById('navToggle')
    const mobileMenu = document.getElementById('mobileMenu')
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open')
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : ''
    })
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open')
        document.body.style.overflow = ''
      })
    })

    const sections = document.querySelectorAll('section[id]')
    const navItems = document.querySelectorAll('.nav__links a')
    window.addEventListener('scroll', () => {
      let current = ''
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 80) current = s.getAttribute('id')
      })
      navItems.forEach(a => {
        a.classList.remove('active')
        if (a.getAttribute('href') === '#' + current) a.classList.add('active')
      })
      document.querySelector('.nav').classList.toggle('scrolled', window.scrollY > 50)
    })

    // FADE IN
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.timeline__card, .skill-group, .stat, .edu__card, .contact__grid, .service-card').forEach(el => {
      el.classList.add('fade-in')
      observer.observe(el)
    })

    // LANGUAGE
    let currentLang = localStorage.getItem('lang') || 'id'
    function applyLang(lang) {
      currentLang = lang
      localStorage.setItem('lang', lang)
      document.querySelectorAll('[data-id][data-en]').forEach(el => {
        el.innerHTML = lang === 'id' ? el.dataset.id : el.dataset.en
      })
      document.querySelectorAll('[data-id-ph][data-en-ph]').forEach(el => {
        el.placeholder = lang === 'id' ? el.dataset.idPh : el.dataset.enPh
      })
      document.querySelectorAll('.lang__option').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang)
      })
      document.documentElement.lang = lang
    }
    document.getElementById('langToggle').addEventListener('click', () => {
      const next = currentLang === 'id' ? 'en' : 'id'
      applyLang(next)
      setLang(next)
    })
    setLang(currentLang)
    applyLang(currentLang)

    // TOOL MODAL DATA
    const toolData = {
      'MikroTik': {
        color: '#e60000', textColor: '#fff',
        cat_id: 'Router OS · Manajemen Jaringan',
        cat_en: 'Router OS · Network Management',
        desc_id: 'MikroTik RouterOS adalah sistem operasi jaringan yang digunakan untuk mengkonfigurasi perangkat router. Dipakai sehari-hari untuk konfigurasi routing statis/dinamis, VLAN, firewall rules, NAT, dan monitoring bandwidth. Antarmuka utamanya adalah Winbox (GUI) dan terminal CLI via SSH.',
        desc_en: 'MikroTik RouterOS is a network operating system used to configure router devices. Used daily for static/dynamic routing configuration, VLAN, firewall rules, NAT, and bandwidth monitoring. Main interfaces are Winbox (GUI) and CLI terminal via SSH.',
        iconBg: '#e60000', iconText: '#fff', iconLabel: 'MT',
        mock: `<div class="mock-window" style="background:#111">
          <div class="mock-bar" style="background:#1c0808">
            <span class="mock-dot" style="background:#ff5f56"></span>
            <span class="mock-dot" style="background:#ffbd2e"></span>
            <span class="mock-dot" style="background:#27c93f"></span>
            <span class="mock-title">RouterOS 7.14.2 — IP → Addresses</span>
          </div>
          <div class="mock-layout">
            <div class="mock-sidebar">
              <div class="mock-menu">Interfaces</div>
              <div class="mock-menu active" style="color:#e60000;background:rgba(230,0,0,0.08)">IP</div>
              <div class="mock-menu">Routing</div>
              <div class="mock-menu">Firewall</div>
              <div class="mock-menu">VLAN</div>
              <div class="mock-menu">Tools</div>
            </div>
            <div class="mock-content">
              <div class="mock-table-head"><span>#</span><span>Address</span><span>Network</span><span>Interface</span></div>
              <div class="mock-table-row"><span style="color:#e60000">0</span><span>10.0.0.1/24</span><span>10.0.0.0</span><span>ether1</span></div>
              <div class="mock-table-row sel"><span style="color:#e60000">1</span><span>192.168.1.1/24</span><span>192.168.1.0</span><span>ether2</span></div>
              <div class="mock-table-row"><span style="color:#e60000">2</span><span>172.16.10.1/24</span><span>172.16.10.0</span><span>vlan100</span></div>
              <div class="mock-table-row"><span style="color:#e60000">3</span><span>10.10.10.1/30</span><span>10.10.10.0</span><span>ether3</span></div>
              <div class="mock-table-row" style="color:#444"><span>4</span><span>—</span><span>—</span><span style="color:#f87171">ether4 (disabled)</span></div>
            </div>
          </div>
        </div>`
      },
      'Zabbix': {
        color: '#5cacee', textColor: '#fff',
        cat_id: 'Network Monitoring · Alerting',
        cat_en: 'Network Monitoring · Alerting',
        desc_id: 'Zabbix adalah platform monitoring jaringan open-source yang digunakan untuk memantau host, layanan, dan threshold. Di NOC, Zabbix dipakai untuk deteksi dini gangguan, trigger alert otomatis, dan dashboard realtime status jaringan seluruh infrastruktur.',
        desc_en: 'Zabbix is an open-source network monitoring platform used to monitor hosts, services, and thresholds. In NOC, Zabbix is used for early incident detection, automatic alert triggering, and realtime network status dashboards across the entire infrastructure.',
        iconBg: '#1a3a5c', iconText: '#5cacee', iconLabel: 'ZB',
        mock: `<div class="mock-window" style="background:#0d1117">
          <div class="mock-zbx-header">
            <span class="mock-zbx-logo">ZABBIX</span>
            <span style="color:#445;font-size:11px">Monitoring → Problems</span>
            <span class="mock-zbx-nav">admin ▾ · Help · Sign out</span>
          </div>
          <div style="padding:8px 0">
            <div class="mock-problem-row" style="background:rgba(122,0,0,0.15)">
              <span class="mock-sev sev-high">HIGH</span>
              <span class="mock-host">sw-core-01</span>
              <span class="mock-prob-name">Interface GE0/1 down</span>
              <span class="mock-age">3m</span>
            </div>
            <div class="mock-problem-row">
              <span class="mock-sev sev-warn">WARN</span>
              <span class="mock-host">router-02</span>
              <span class="mock-prob-name">CPU utilization &gt;85%</span>
              <span class="mock-age">12m</span>
            </div>
            <div class="mock-problem-row" style="background:rgba(122,0,0,0.08)">
              <span class="mock-sev sev-high">HIGH</span>
              <span class="mock-host">olt-bndg-01</span>
              <span class="mock-prob-name">Packet loss &gt;30% on uplink</span>
              <span class="mock-age">28m</span>
            </div>
            <div class="mock-problem-row">
              <span class="mock-sev sev-info">INFO</span>
              <span class="mock-host">server-nms</span>
              <span class="mock-prob-name">Disk usage /var &gt;75%</span>
              <span class="mock-age">1h</span>
            </div>
            <div class="mock-problem-row">
              <span class="mock-sev sev-warn">WARN</span>
              <span class="mock-host">ap-floor3-02</span>
              <span class="mock-prob-name">ICMP unreachable</span>
              <span class="mock-age">2h</span>
            </div>
          </div>
        </div>`
      },
      'Grafana': {
        color: '#f46800', textColor: '#fff',
        cat_id: 'Visualisasi Data · Dashboard Analytics',
        cat_en: 'Data Visualization · Dashboard Analytics',
        desc_id: 'Grafana adalah platform visualisasi data dan analytics yang digunakan untuk membangun dashboard monitoring network. Di NOC, Grafana menampilkan realtime metrics seperti bandwidth usage, uptime, latency, dan packet loss dalam bentuk grafik yang mudah dipahami.',
        desc_en: 'Grafana is a data visualization and analytics platform used to build network monitoring dashboards. In NOC, Grafana displays realtime metrics like bandwidth usage, uptime, latency, and packet loss in easy-to-understand chart formats.',
        iconBg: '#1e1e2e', iconText: '#f46800', iconLabel: 'GF',
        mock: `<div class="mock-window" style="background:#111217">
          <div class="mock-gf-header">
            <span class="mock-gf-logo">⬡</span>
            <span class="mock-gf-title">NOC Network Overview</span>
            <span class="mock-gf-time">Last 6 hours ▾ · 🔄 Auto</span>
          </div>
          <div class="mock-chart-area">
            <div class="mock-chart-panel">
              <div class="mock-panel-title">Bandwidth Usage — ether1 (Mbps)</div>
              <div class="mock-bars">
                ${[45,60,55,80,70,40,90,75,85,60,95,70,50,65,88,72,60,78,85,90,65,55,70,80].map((h,i) =>
                  `<div class="mock-bar-item" style="height:${h}%;background:${i===20?'#f46800':i===12?'#818cf8':'rgba(244,104,0,0.5)'}"></div>`
                ).join('')}
              </div>
            </div>
            <div class="mock-chart-panel">
              <div class="mock-panel-title">Packet Loss % — All Interfaces</div>
              <div class="mock-bars">
                ${[2,1,3,1,0,0,2,8,4,1,0,1,2,1,0,0,3,2,1,0,4,2,1,0].map((h,i) =>
                  `<div class="mock-bar-item" style="height:${h*8+4}%;background:${h>5?'#f87171':h>2?'#fbbf24':'rgba(74,222,128,0.6)'}"></div>`
                ).join('')}
              </div>
            </div>
          </div>
        </div>`
      },
      'Linux': {
        color: '#e8e8f0', textColor: '#000',
        cat_id: 'Server OS · Administrasi Sistem',
        cat_en: 'Server OS · System Administration',
        desc_id: 'Linux Server digunakan untuk administrasi sistem operasi server jaringan, konfigurasi layanan (DNS, DHCP, NTP), manajemen user dan permission, monitoring resource, serta menjalankan tools seperti Zabbix, Grafana, dan MRTG.',
        desc_en: 'Linux Server is used for network server operating system administration, service configuration (DNS, DHCP, NTP), user and permission management, resource monitoring, and running tools like Zabbix, Grafana, and MRTG.',
        iconBg: '#222', iconText: '#fff', iconLabel: '🐧',
        mock: `<div class="mock-window" style="background:#0d0d0d">
          <div class="mock-bar" style="background:#1a1a1a">
            <span class="mock-dot" style="background:#ff5f56"></span>
            <span class="mock-dot" style="background:#ffbd2e"></span>
            <span class="mock-dot" style="background:#27c93f"></span>
            <span class="mock-title">admin@nms-server:~</span>
          </div>
          <div class="mock-terminal">
            <div><span class="mock-prompt">admin@nms-server</span><span style="color:#555">:</span><span style="color:#818cf8">~</span><span style="color:#555">$ </span><span class="mock-cmd">uname -r && cat /etc/os-release | grep PRETTY</span></div>
            <div class="mock-out">6.1.0-28-amd64</div>
            <div class="mock-out">PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"</div>
            <div style="margin-top:6px"><span class="mock-prompt">admin@nms-server</span><span style="color:#555">:~$ </span><span class="mock-cmd">ip addr show ens3 | grep inet</span></div>
            <div class="mock-out">&nbsp;&nbsp;&nbsp;inet 10.0.0.5/24 brd 10.0.0.255 scope global ens3</div>
            <div style="margin-top:6px"><span class="mock-prompt">admin@nms-server</span><span style="color:#555">:~$ </span><span class="mock-cmd">systemctl status zabbix-server --no-pager</span></div>
            <div class="mock-ok">● zabbix-server.service - Zabbix Server</div>
            <div class="mock-out">&nbsp;&nbsp;&nbsp;Loaded: loaded (/lib/systemd/system/zabbix-server.service)</div>
            <div class="mock-ok">&nbsp;&nbsp;&nbsp;Active: active (running) since Mon 2025-01-06 08:14:33 WIB</div>
            <div style="margin-top:6px"><span class="mock-prompt">admin@nms-server</span><span style="color:#555">:~$ </span><span class="mock-cmd">df -h /</span></div>
            <div class="mock-out">Filesystem&nbsp;&nbsp;Size&nbsp;&nbsp;Used&nbsp;&nbsp;Avail&nbsp;&nbsp;Use%</div>
            <div class="mock-out">/dev/sda1&nbsp;&nbsp;&nbsp;40G&nbsp;&nbsp;&nbsp;18G&nbsp;&nbsp;&nbsp;20G&nbsp;&nbsp;&nbsp;<span style="color:#fbbf24">47%</span></div>
          </div>
        </div>`
      },
      'SSH': {
        color: '#00d4ff', textColor: '#000',
        cat_id: 'Protokol Remote Access · Secure Shell',
        cat_en: 'Remote Access Protocol · Secure Shell',
        desc_id: 'SSH (Secure Shell) digunakan untuk remote login ke router, server, dan perangkat jaringan secara aman dan terenkripsi. Di NOC, SSH adalah tool utama untuk troubleshooting jarak jauh, eksekusi perintah, dan konfigurasi perangkat tanpa harus ke lokasi fisik.',
        desc_en: 'SSH (Secure Shell) is used for secure and encrypted remote login to routers, servers, and network devices. In NOC, SSH is the primary tool for remote troubleshooting, command execution, and device configuration without needing physical access.',
        iconBg: '#0d2137', iconText: '#00d4ff', iconLabel: 'SSH',
        mock: `<div class="mock-window" style="background:#090c12">
          <div class="mock-bar" style="background:#111520">
            <span class="mock-dot" style="background:#ff5f56"></span>
            <span class="mock-dot" style="background:#ffbd2e"></span>
            <span class="mock-dot" style="background:#27c93f"></span>
            <span class="mock-title">ssh admin@10.0.0.1</span>
          </div>
          <div class="mock-terminal" style="background:#090c12">
            <div><span class="mock-prompt">local@workstation</span><span style="color:#555">:~$ </span><span class="mock-cmd">ssh admin@10.0.0.1</span></div>
            <div class="mock-warn">The authenticity of host '10.0.0.1 (10.0.0.1)' can't be established.</div>
            <div class="mock-out">ED25519 key fingerprint is SHA256:xK9mP2qLr8TzWvNbY4...</div>
            <div class="mock-warn">Are you sure you want to continue connecting? (yes/no): </div>
            <div class="mock-cmd">yes</div>
            <div class="mock-ok">Warning: Permanently added '10.0.0.1' (ED25519) to known hosts.</div>
            <div class="mock-out" style="margin-top:4px">admin@10.0.0.1's password: </div>
            <div class="mock-ok" style="margin-top:6px">MikroTik 7.14.2 (stable)</div>
            <div class="mock-out">Login: admin, 2025-01-15 09:42:11</div>
            <div style="margin-top:6px"><span style="color:#00d4ff">[admin@MikroTik]</span><span style="color:#555"> > </span><span class="mock-cmd">ip address print</span></div>
            <div class="mock-out">Flags: D - dynamic, X - disabled, I - invalid, G - global</div>
            <div class="mock-out">&nbsp;# &nbsp;ADDRESS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NETWORK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;INTERFACE</div>
            <div class="mock-out">&nbsp;0 &nbsp;10.0.0.1/24&nbsp;&nbsp;&nbsp;10.0.0.0&nbsp;&nbsp;&nbsp;ether1</div>
          </div>
        </div>`
      },
      'Winbox': {
        color: '#c0c0c0', textColor: '#000',
        cat_id: 'GUI Client · MikroTik RouterOS',
        cat_en: 'GUI Client · MikroTik RouterOS',
        desc_id: 'Winbox adalah aplikasi GUI resmi dari MikroTik untuk mengkonfigurasi RouterOS secara visual. Lebih mudah digunakan dibandingkan CLI, mendukung drag-and-drop interface, dan dipakai untuk konfigurasi routing, firewall, VLAN, serta melihat traffic realtime.',
        desc_en: "Winbox is MikroTik's official GUI application for visually configuring RouterOS. Easier to use than CLI, supports drag-and-drop interface, and is used for routing, firewall, VLAN configuration, and viewing realtime traffic.",
        iconBg: '#1a1a1a', iconText: '#e0e0e0', iconLabel: 'WB',
        mock: `<div class="mock-window" style="background:#1e1e1e">
          <div class="mock-bar" style="background:#2d2d2d;justify-content:flex-start;gap:8px">
            <span style="color:#888;font-size:10px">Winbox v3.40</span>
            <span style="color:#555;font-size:10px">— 10.0.0.1 (MikroTik)</span>
            <span style="margin-left:auto;color:#f87171;font-size:12px;cursor:pointer">✕</span>
          </div>
          <div style="background:#252525;padding:4px 8px;display:flex;gap:12px;border-bottom:1px solid #333">
            <span style="font-size:10px;color:#aaa">File</span>
            <span style="font-size:10px;color:#aaa">Tools</span>
            <span style="font-size:10px;color:#aaa">Help</span>
          </div>
          <div class="mock-layout" style="min-height:190px">
            <div class="mock-sidebar" style="width:110px;background:#1a1a1a">
              <div class="mock-menu" style="font-size:10px">Quick Set</div>
              <div class="mock-menu active" style="font-size:10px;color:#ddd;background:#2a2a2a">IP ▸</div>
              <div class="mock-menu" style="font-size:10px">Interfaces</div>
              <div class="mock-menu" style="font-size:10px">Bridge</div>
              <div class="mock-menu" style="font-size:10px">Routing</div>
              <div class="mock-menu" style="font-size:10px">Firewall</div>
              <div class="mock-menu" style="font-size:10px">MPLS</div>
              <div class="mock-menu" style="font-size:10px">System</div>
            </div>
            <div class="mock-content" style="background:#1e1e1e">
              <div style="background:#2a2a2a;padding:6px;border-bottom:1px solid #333;font-size:10px;color:#888;display:flex;gap:8px">
                <span style="color:#ddd">Addresses</span>
                <span>Routes</span><span>DNS</span><span>DHCP Server</span><span>Firewall</span>
              </div>
              <div class="mock-table-head" style="grid-template-columns:1fr 1fr 1fr;font-size:10px"><span>Address</span><span>Network</span><span>Interface</span></div>
              <div class="mock-table-row sel" style="grid-template-columns:1fr 1fr 1fr;font-size:10px"><span>10.0.0.1/24</span><span>10.0.0.0</span><span>ether1</span></div>
              <div class="mock-table-row" style="grid-template-columns:1fr 1fr 1fr;font-size:10px"><span>192.168.1.1/24</span><span>192.168.1.0</span><span>ether2</span></div>
              <div class="mock-table-row" style="grid-template-columns:1fr 1fr 1fr;font-size:10px"><span>172.16.10.1/24</span><span>172.16.10.0</span><span>vlan100</span></div>
            </div>
          </div>
        </div>`
      },
      'MRTG': {
        color: '#00ccaa', textColor: '#fff',
        cat_id: 'Traffic Monitoring · Grafik Bandwidth',
        cat_en: 'Traffic Monitoring · Bandwidth Graph',
        desc_id: 'MRTG (Multi Router Traffic Grapher) adalah tool monitoring bandwidth berbasis SNMP yang menampilkan grafik lalu lintas jaringan masuk/keluar. Di NOC, MRTG digunakan untuk memantau penggunaan bandwidth per interface dan mendeteksi anomali traffic secara visual.',
        desc_en: 'MRTG (Multi Router Traffic Grapher) is an SNMP-based bandwidth monitoring tool that displays incoming/outgoing network traffic graphs. In NOC, MRTG is used to monitor bandwidth usage per interface and visually detect traffic anomalies.',
        iconBg: '#003333', iconText: '#00ccaa', iconLabel: 'MR',
        mock: `<div class="mock-window" style="background:#0a0a10">
          <div class="mock-bar" style="background:#111">
            <span class="mock-dot" style="background:#ff5f56"></span>
            <span class="mock-dot" style="background:#ffbd2e"></span>
            <span class="mock-dot" style="background:#27c93f"></span>
            <span class="mock-title">MRTG — ether1 Daily Traffic</span>
          </div>
          <div class="mock-mrtg-body">
            <div class="mock-mrtg-title">ether1 :: router-bndg-01 (10.0.0.1) — Daily (5 Minute Average)</div>
            <div class="mock-mrtg-graph">
              <div class="mock-mrtg-bars">
                ${[20,35,45,38,60,75,80,70,65,85,90,78,60,50,55,70,88,92,80,65,70,85,78,60,50,45,38,42,55,65,72,78,85,90,82,70].map((h) => {
                  return `<div style="display:flex;flex-direction:column;flex:1;align-items:center;gap:1px;height:100%;justify-content:flex-end">
                    <div class="mock-mrtg-bar-in" style="height:${h}%"></div>
                  </div>`
                }).join('')}
              </div>
              <div style="display:flex;justify-content:space-between;font-size:9px;color:#444;margin-top:3px">
                <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
              </div>
            </div>
            <div class="mock-mrtg-legend">
              <span class="leg-in">Incoming (In)</span>
              <span class="leg-out">Outgoing (Out)</span>
            </div>
            <div class="mock-mrtg-stats">
              <div class="mock-mrtg-stat"><strong>92.4 Mbps</strong>Max In</div>
              <div class="mock-mrtg-stat"><strong>63.1 Mbps</strong>Avg In</div>
              <div class="mock-mrtg-stat"><strong>78.2 Mbps</strong>Cur In</div>
            </div>
          </div>
        </div>`
      },
      'Juniper': {
        color: '#84b135', textColor: '#fff',
        cat_id: 'Network Equipment · Enterprise Routing',
        cat_en: 'Network Equipment · Enterprise Routing',
        desc_id: 'Juniper Networks adalah vendor perangkat jaringan enterprise untuk routing dan switching skala besar. JunOS digunakan untuk konfigurasi BGP, OSPF, firewall filter, dan monitoring interface. Digunakan di NOC untuk troubleshooting dan monitoring core network perusahaan.',
        desc_en: 'Juniper Networks is an enterprise network equipment vendor for large-scale routing and switching. JunOS is used for BGP, OSPF, firewall filter configuration, and interface monitoring. Used in NOC for core network troubleshooting and monitoring.',
        iconBg: '#0f2010', iconText: '#84b135', iconLabel: 'JN',
        mock: `<div class="mock-window" style="background:#090d09">
          <div class="mock-bar" style="background:#111a11">
            <span class="mock-dot" style="background:#ff5f56"></span>
            <span class="mock-dot" style="background:#ffbd2e"></span>
            <span class="mock-dot" style="background:#27c93f"></span>
            <span class="mock-title">ssh admin@192.168.1.254 — Junos 21.4R3</span>
          </div>
          <div class="mock-terminal" style="background:#090d09">
            <div><span class="mock-prompt">admin@core-rtr-01</span><span style="color:#555"> &gt; </span><span class="mock-cmd">show interfaces terse | match ge-</span></div>
            <div class="mock-out">ge-0/0/0&nbsp;&nbsp;&nbsp;up&nbsp;&nbsp;up&nbsp;&nbsp;&nbsp;inet&nbsp;&nbsp;10.0.0.1/30</div>
            <div class="mock-out">ge-0/0/1&nbsp;&nbsp;&nbsp;up&nbsp;&nbsp;up&nbsp;&nbsp;&nbsp;inet&nbsp;&nbsp;172.16.0.1/30</div>
            <div class="mock-out" style="color:#f87171">ge-0/0/2&nbsp;&nbsp;&nbsp;up&nbsp;&nbsp;down inet&nbsp;&nbsp;—</div>
            <div class="mock-out">ge-0/0/3&nbsp;&nbsp;&nbsp;up&nbsp;&nbsp;up&nbsp;&nbsp;&nbsp;inet&nbsp;&nbsp;192.168.100.1/24</div>
            <div style="margin-top:6px"><span class="mock-prompt">admin@core-rtr-01</span><span style="color:#555"> &gt; </span><span class="mock-cmd">show bgp summary</span></div>
            <div class="mock-out">Groups: 2&nbsp;&nbsp;Peers: 3&nbsp;&nbsp;Down peers: 0</div>
            <div class="mock-out">Table&nbsp;&nbsp;&nbsp;&nbsp;Tot Paths&nbsp;&nbsp;Act Paths&nbsp;&nbsp;State</div>
            <div class="mock-out">inet.0&nbsp;&nbsp;&nbsp;148&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;148&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#84b135">Established</span></div>
            <div class="mock-out" style="margin-top:4px">Peer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;State&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Prefixes</div>
            <div class="mock-out">10.0.0.2&nbsp;&nbsp;&nbsp;&nbsp;65001&nbsp;&nbsp;<span style="color:#84b135">Establ</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;64/64</div>
            <div class="mock-out">172.16.0.2&nbsp;&nbsp;65002&nbsp;&nbsp;<span style="color:#84b135">Establ</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;84/84</div>
          </div>
        </div>`
      }
    }

    // MODAL LOGIC
    const modal = document.getElementById('toolModal')
    const modalClose = document.getElementById('modalClose')

    function openToolModal(toolName) {
      const d = toolData[toolName]
      if (!d) return
      document.getElementById('modalIcon').style.cssText = `background:${d.iconBg};color:${d.iconText}`
      document.getElementById('modalIcon').textContent = d.iconLabel
      document.getElementById('modalName').textContent = toolName
      document.getElementById('modalCat').textContent = currentLang === 'id' ? d.cat_id : d.cat_en
      document.getElementById('modalScreen').innerHTML = d.mock
      document.getElementById('modalDesc').textContent = currentLang === 'id' ? d.desc_id : d.desc_en
      modal.classList.add('active')
      document.body.style.overflow = 'hidden'
    }

    function closeModal() {
      modal.classList.remove('active')
      document.body.style.overflow = ''
    }

    document.querySelectorAll('[data-tool]').forEach(el => {
      el.addEventListener('click', () => openToolModal(el.dataset.tool))
    })
    modalClose.addEventListener('click', closeModal)
    modal.addEventListener('click', e => { if (e.target === modal) closeModal() })
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() })
  }, [])

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="nav__logo">AG</div>
        <ul className="nav__links">
          <li><a href="#about" data-id="Tentang" data-en="About">Tentang</a></li>
          <li><a href="#services" data-id="Layanan" data-en="Services">Layanan</a></li>
          <li><a href="#skills" data-id="Kemampuan" data-en="Skills">Kemampuan</a></li>
          <li><a href="#experience" data-id="Pengalaman" data-en="Experience">Pengalaman</a></li>
          <li><a href="#education" data-id="Pendidikan" data-en="Education">Pendidikan</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="#contact" className="nav__cta" data-id="Kontak" data-en="Contact">Kontak</a></li>
        </ul>
        <div className="nav__right">
          <button className="lang__toggle" id="langToggle">
            <span className="lang__option active" data-lang="id">ID</span>
            <span className="lang__sep">/</span>
            <span className="lang__option" data-lang="en">EN</span>
          </button>
          <button className="nav__toggle" id="navToggle">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className="mobile-menu" id="mobileMenu">
        <a href="#about" data-id="Tentang" data-en="About">Tentang</a>
        <a href="#services" data-id="Layanan" data-en="Services">Layanan</a>
        <a href="#skills" data-id="Kemampuan" data-en="Skills">Kemampuan</a>
        <a href="#experience" data-id="Pengalaman" data-en="Experience">Pengalaman</a>
        <a href="#education" data-id="Pendidikan" data-en="Education">Pendidikan</a>
        <a href="/blog">Blog</a>
        <a href="#contact" className="nav__cta" data-id="Kontak" data-en="Contact">Kontak</a>
      </div>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero__bg"><div className="hero__grid"></div></div>
        <div className="container hero__inner">
          <div className="hero__content">
            <p className="hero__greeting" data-id="Halo, Saya" data-en="Hello, I'm">Halo, Saya</p>
            <h1 className="hero__name">ANGGA</h1>
            <div className="hero__roles">
              <span className="hero__role" data-id="Network Engineer" data-en="Network Engineer">Network Engineer</span>
              <span className="hero__sep">/</span>
              <span className="hero__role" data-id="IT Support" data-en="IT Support">IT Support</span>
              <span className="hero__sep">/</span>
              <span className="hero__role" data-id="Helpdesk" data-en="Helpdesk">Helpdesk</span>
            </div>
            <p className="hero__desc" data-id="2.5+ tahun pengalaman di Network Operations Center, monitoring infrastruktur jaringan 24/7, troubleshooting, dan technical support untuk memastikan stabilitas layanan." data-en="2.5+ years of experience in Network Operations Center, 24/7 network infrastructure monitoring, troubleshooting, and technical support to ensure service stability.">2.5+ tahun pengalaman di Network Operations Center, monitoring infrastruktur jaringan 24/7, troubleshooting, dan technical support untuk memastikan stabilitas layanan.</p>
            <div className="hero__actions">
              <a href="#contact" className="btn btn--primary" data-id="Hubungi Saya" data-en="Get in Touch">Hubungi Saya</a>
              <a href="#experience" className="btn btn--ghost" data-id="Lihat Pengalaman" data-en="View Experience">Lihat Pengalaman</a>
            </div>
            <div className="hero__badges">
              <div className="hero__badge">
                <span className="hero__badge-dot"></span>
                <span data-id="Tersedia untuk bekerja" data-en="Available for work">Tersedia untuk bekerja</span>
              </div>
              <div className="hero__badge hero__badge--outline">
                <span>📍</span>
                <span>Malang, Indonesia</span>
              </div>
            </div>
          </div>
          <div className="hero__photo">
            <div className="hero__photo-wrap">
              <img src="/images/angga.jpg" alt="Angga" />
            </div>
            <div className="hero__photo-stats">
              <div className="hero__mini-stat">
                <span className="hero__mini-num">2.5+</span>
                <span className="hero__mini-label" data-id="Tahun" data-en="Years">Tahun</span>
              </div>
              <div className="hero__mini-stat">
                <span className="hero__mini-num">3</span>
                <span className="hero__mini-label" data-id="Perusahaan" data-en="Companies">Perusahaan</span>
              </div>
              <div className="hero__mini-stat">
                <span className="hero__mini-num">24/7</span>
                <span className="hero__mini-label">NOC</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero__scroll"><span></span></div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">01 / <span data-id="Tentang" data-en="About">Tentang</span></span>
            <h2 className="section__title" data-id="Tentang Saya" data-en="About Me">Tentang Saya</h2>
          </div>
          <div className="about__grid">
            <div className="about__text">
              <p data-id="Network Engineer dan IT Support dengan pengalaman lebih dari <strong>2,5 tahun</strong> di bidang Network Operations Center (NOC), Customer Support, dan Helpdesk." data-en="Network Engineer and IT Support with more than <strong>2.5 years</strong> of experience in Network Operations Center (NOC), Customer Support, and Helpdesk.">Network Engineer dan IT Support dengan pengalaman lebih dari <strong>2,5 tahun</strong> di bidang Network Operations Center (NOC), Customer Support, dan Helpdesk.</p>
              <p data-id="Memiliki kompetensi dalam monitoring jaringan, troubleshooting network, konfigurasi MikroTik, routing &amp; switching, administrasi server Linux, serta pengelolaan VLAN dan firewall." data-en="Skilled in network monitoring, network troubleshooting, MikroTik configuration, routing &amp; switching, Linux server administration, and VLAN and firewall management.">Memiliki kompetensi dalam monitoring jaringan, troubleshooting network, konfigurasi MikroTik, routing &amp; switching, administrasi server Linux, serta pengelolaan VLAN dan firewall.</p>
              <p data-id="Terbiasa bekerja dalam lingkungan operasional jaringan yang dinamis dengan kemampuan analisis, problem solving, dan komunikasi yang baik. Berkomitmen untuk menjaga stabilitas infrastruktur IT dan meningkatkan kualitas layanan." data-en="Experienced working in dynamic network operational environments with strong analytical, problem-solving, and communication skills. Committed to maintaining IT infrastructure stability and improving service quality.">Terbiasa bekerja dalam lingkungan operasional jaringan yang dinamis dengan kemampuan analisis, problem solving, dan komunikasi yang baik. Berkomitmen untuk menjaga stabilitas infrastruktur IT dan meningkatkan kualitas layanan.</p>
              <div className="about__meta">
                <div className="about__meta-item">
                  <span className="about__meta-label" data-id="Lokasi" data-en="Location">Lokasi</span>
                  <span className="about__meta-value">Malang, Jawa Timur</span>
                </div>
                <div className="about__meta-item">
                  <span className="about__meta-label" data-id="Bahasa" data-en="Languages">Bahasa</span>
                  <span className="about__meta-value" data-id="Indonesia (Aktif), Inggris (Menengah)" data-en="Indonesian (Active), English (Intermediate)">Indonesia (Aktif), Inggris (Menengah)</span>
                </div>
                <div className="about__meta-item">
                  <span className="about__meta-label" data-id="Bidang" data-en="Field">Bidang</span>
                  <span className="about__meta-value">Networking / IT Infrastructure</span>
                </div>
                <div className="about__meta-item">
                  <span className="about__meta-label">Status</span>
                  <span className="about__meta-value about__meta-value--active" data-id="Mencari Pekerjaan" data-en="Open to Work">Mencari Pekerjaan</span>
                </div>
              </div>
            </div>
            <div className="about__stats">
              <div className="stat">
                <span className="stat__num">2.5+</span>
                <span className="stat__label" data-id="Tahun Pengalaman" data-en="Years Experience">Tahun Pengalaman</span>
              </div>
              <div className="stat">
                <span className="stat__num">3</span>
                <span className="stat__label" data-id="Perusahaan" data-en="Companies">Perusahaan</span>
              </div>
              <div className="stat">
                <span className="stat__num">18+</span>
                <span className="stat__label" data-id="Keahlian Teknis" data-en="Technical Skills">Keahlian Teknis</span>
              </div>
              <div className="stat">
                <span className="stat__num">24/7</span>
                <span className="stat__label" data-id="Operasi NOC" data-en="NOC Operations">Operasi NOC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section--alt" id="services">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">02 / <span data-id="Layanan" data-en="Services">Layanan</span></span>
            <h2 className="section__title" data-id="Apa yang Saya Lakukan" data-en="What I Do">Apa yang Saya Lakukan</h2>
          </div>
          <div className="services__grid">
            <div className="service-card">
              <div className="service-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h3 className="service-card__title" data-id="Network Monitoring" data-en="Network Monitoring">Network Monitoring</h3>
              <p className="service-card__desc" data-id="Monitoring jaringan 24/7 menggunakan tools seperti Zabbix, Grafana, dan MRTG. Deteksi dini gangguan untuk memastikan uptime dan ketersediaan layanan yang optimal." data-en="24/7 network monitoring using tools like Zabbix, Grafana, and MRTG. Early incident detection to ensure optimal uptime and service availability.">Monitoring jaringan 24/7 menggunakan tools seperti Zabbix, Grafana, dan MRTG. Deteksi dini gangguan untuk memastikan uptime dan ketersediaan layanan yang optimal.</p>
              <div className="service-card__tags">
                <span className="tag tag--sm">Zabbix</span>
                <span className="tag tag--sm">Grafana</span>
                <span className="tag tag--sm">MRTG</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
              </div>
              <h3 className="service-card__title" data-id="Troubleshooting Jaringan" data-en="Network Troubleshooting">Troubleshooting Jaringan</h3>
              <p className="service-card__desc" data-id="Analisis dan penanganan gangguan jaringan secara cepat dan efisien. Identifikasi root cause, packet loss, down link, dan konfigurasi ulang perangkat jaringan." data-en="Fast and efficient analysis and resolution of network issues. Root cause identification, packet loss, down links, and network device reconfiguration.">Analisis dan penanganan gangguan jaringan secara cepat dan efisien. Identifikasi root cause, packet loss, down link, dan konfigurasi ulang perangkat jaringan.</p>
              <div className="service-card__tags">
                <span className="tag tag--sm">MikroTik</span>
                <span className="tag tag--sm">Winbox</span>
                <span className="tag tag--sm">SSH</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              </div>
              <h3 className="service-card__title" data-id="Konfigurasi" data-en="Configuration">Konfigurasi</h3>
              <p className="service-card__desc" data-id="Konfigurasi dan manajemen VLAN, routing, firewall rules, serta administrasi server Linux. Pengelolaan IP Address dan dokumentasi infrastruktur jaringan." data-en="Configuration and management of VLAN, routing, firewall rules, and Linux server administration. IP Address management and network infrastructure documentation.">Konfigurasi dan manajemen VLAN, routing, firewall rules, serta administrasi server Linux. Pengelolaan IP Address dan dokumentasi infrastruktur jaringan.</p>
              <div className="service-card__tags">
                <span className="tag tag--sm">VLAN</span>
                <span className="tag tag--sm">Firewall</span>
                <span className="tag tag--sm">Linux</span>
              </div>
            </div>
            <div className="service-card">
              <div className="service-card__icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h3 className="service-card__title" data-id="IT Support & Helpdesk" data-en="IT Support & Helpdesk">IT Support &amp; Helpdesk</h3>
              <p className="service-card__desc" data-id="Dukungan teknis kepada pengguna melalui remote support, ticketing system, dan komunikasi online. Penanganan permasalahan perangkat, koneksi, dan layanan IT secara responsif." data-en="Technical support to users via remote support, ticketing system, and online communication. Responsive handling of device, connectivity, and IT service issues.">Dukungan teknis kepada pengguna melalui remote support, ticketing system, dan komunikasi online. Penanganan permasalahan perangkat, koneksi, dan layanan IT secara responsif.</p>
              <div className="service-card__tags">
                <span className="tag tag--sm" data-id="Dukungan Jarak Jauh" data-en="Remote Support">Dukungan Jarak Jauh</span>
                <span className="tag tag--sm" data-id="Tiket" data-en="Ticketing">Tiket</span>
                <span className="tag tag--sm" data-id="Customer Service" data-en="Customer Service">Customer Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section" id="skills">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">03 / <span data-id="Kemampuan" data-en="Skills">Kemampuan</span></span>
            <h2 className="section__title" data-id="Kemampuan & Tools" data-en="Skills & Tools">Kemampuan &amp; Tools</h2>
          </div>
          <div className="skills__grid">
            <div className="skill-group">
              <h3 className="skill-group__title" data-id="Jaringan" data-en="Networking">Jaringan</h3>
              <div className="skill-group__tags">
                <span className="tag" data-id="Monitoring Jaringan" data-en="Network Monitoring">Monitoring Jaringan</span>
                <span className="tag" data-id="Troubleshooting Jaringan" data-en="Network Troubleshooting">Troubleshooting Jaringan</span>
                <span className="tag" data-id="Routing & Switching" data-en="Routing & Switching">Routing &amp; Switching</span>
                <span className="tag" data-id="Konfigurasi VLAN" data-en="VLAN Configuration">Konfigurasi VLAN</span>
                <span className="tag" data-id="Konfigurasi Firewall" data-en="Firewall Configuration">Konfigurasi Firewall</span>
                <span className="tag" data-id="Manajemen IP Address" data-en="IP Address Management">Manajemen IP Address</span>
                <span className="tag" data-id="Fiber Optik Dasar" data-en="Fiber Optic Basic">Fiber Optik Dasar</span>
                <span className="tag" data-id="Analisis Jaringan" data-en="Network Analysis">Analisis Jaringan</span>
              </div>
            </div>
            <div className="skill-group">
              <h3 className="skill-group__title">Tools &amp; Platform</h3>
              <div className="skill-group__tags">
                <span className="tag tag--accent">MikroTik</span>
                <span className="tag tag--accent">Zabbix</span>
                <span className="tag tag--accent">Grafana</span>
                <span className="tag tag--accent">MRTG</span>
                <span className="tag tag--accent">Linux Server</span>
                <span className="tag tag--accent">SSH</span>
                <span className="tag tag--accent">Winbox</span>
                <span className="tag tag--accent">Juniper</span>
              </div>
            </div>
            <div className="skill-group">
              <h3 className="skill-group__title" data-id="Dukungan" data-en="Support">Dukungan</h3>
              <div className="skill-group__tags">
                <span className="tag" data-id="Dukungan Jarak Jauh" data-en="Remote Support">Dukungan Jarak Jauh</span>
                <span className="tag" data-id="Dukungan Helpdesk" data-en="Helpdesk Support">Dukungan Helpdesk</span>
                <span className="tag" data-id="Administrasi Server" data-en="Server Administration">Administrasi Server</span>
                <span className="tag" data-id="Sistem Tiket" data-en="Ticketing System">Sistem Tiket</span>
              </div>
            </div>
            <div className="skill-group">
              <h3 className="skill-group__title" data-id="Soft Skills" data-en="Soft Skills">Soft Skills</h3>
              <div className="skill-group__tags">
                <span className="tag" data-id="Berpikir Analitis" data-en="Analytical Thinking">Berpikir Analitis</span>
                <span className="tag" data-id="Pemecahan Masalah" data-en="Problem Solving">Pemecahan Masalah</span>
                <span className="tag" data-id="Komunikasi" data-en="Communication">Komunikasi</span>
                <span className="tag" data-id="Kerja Tim" data-en="Teamwork">Kerja Tim</span>
                <span className="tag" data-id="Manajemen Waktu" data-en="Time Management">Manajemen Waktu</span>
                <span className="tag" data-id="Adaptabilitas" data-en="Adaptability">Adaptabilitas</span>
                <span className="tag" data-id="Orientasi Layanan" data-en="Service Orientation">Orientasi Layanan</span>
              </div>
            </div>
          </div>

          {/* TOOLS VISUAL */}
          <div className="tools__section">
            <p className="tools__label" data-id="Tools yang Saya Gunakan Sehari-hari" data-en="Tools I Use Daily">Tools yang Saya Gunakan Sehari-hari</p>
            <div className="tools__grid">
              <div className="tool-item" data-tool="MikroTik">
                <div className="tool-item__icon tool-item__icon--mikrotik">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11.5a5 5 0 0 1 6 0"/>
                    <path d="M6 8.5a9.5 9.5 0 0 1 12 0"/>
                    <rect x="2" y="14" width="20" height="6" rx="2"/>
                    <circle cx="6" cy="17" r="0.8" fill="currentColor" stroke="none"/>
                    <circle cx="9.5" cy="17" r="0.8" fill="currentColor" stroke="none"/>
                  </svg>
                </div>
                <span className="tool-item__name">MikroTik</span>
              </div>
              <div className="tool-item" data-tool="Zabbix">
                <div className="tool-item__icon tool-item__icon--zabbix">
                  <img
                    src="https://cdn.simpleicons.org/zabbix/e8e8ff"
                    alt="Zabbix"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextSibling.style.display = 'inline'
                    }}
                  />
                  <span style={{display:'none', fontSize:'10px', fontWeight:'700', color:'#8ab4f8'}}>ZBX</span>
                </div>
                <span className="tool-item__name">Zabbix</span>
              </div>
              <div className="tool-item" data-tool="Grafana">
                <div className="tool-item__icon tool-item__icon--grafana">
                  <img src="https://cdn.simpleicons.org/grafana/f46800" alt="Grafana" />
                </div>
                <span className="tool-item__name">Grafana</span>
              </div>
              <div className="tool-item" data-tool="Linux">
                <div className="tool-item__icon tool-item__icon--linux">
                  <img src="https://cdn.simpleicons.org/linux/fcc624" alt="Linux" />
                </div>
                <span className="tool-item__name">Linux</span>
              </div>
              <div className="tool-item" data-tool="SSH">
                <div className="tool-item__icon tool-item__icon--ssh">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                </div>
                <span className="tool-item__name">SSH</span>
              </div>
              <div className="tool-item" data-tool="MRTG">
                <div className="tool-item__icon tool-item__icon--mrtg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <span className="tool-item__name">MRTG</span>
              </div>
              <div className="tool-item" data-tool="Juniper">
                <div className="tool-item__icon tool-item__icon--juniper">
                  <img src="https://cdn.simpleicons.org/junipernetworks/84b135" alt="Juniper" />
                </div>
                <span className="tool-item__name">Juniper</span>
              </div>
              <div className="tool-item" data-tool="Winbox">
                <div className="tool-item__icon tool-item__icon--winbox">
                  <img src="https://cdn.simpleicons.org/mikrotik/aaaaaa" alt="Winbox" />
                </div>
                <span className="tool-item__name">Winbox</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section section--alt" id="experience">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">04 / <span data-id="Pengalaman" data-en="Experience">Pengalaman</span></span>
            <h2 className="section__title" data-id="Pengalaman Kerja" data-en="Work Experience">Pengalaman Kerja</h2>
          </div>
          <div className="timeline">

            <div className="timeline__item">
              <div className="timeline__dot"></div>
              <div className="timeline__card">
                <div className="timeline__meta">
                  <span className="timeline__period" data-id="Jan 2024 – Des 2024" data-en="Jan 2024 – Dec 2024">Jan 2024 – Des 2024</span>
                  <span className="timeline__badge timeline__badge--intern" data-id="Magang / PKL" data-en="Internship">Magang / PKL</span>
                </div>
                <h3 className="timeline__role" data-id="Customer Support" data-en="Customer Support">Customer Support</h3>
                <p className="timeline__company">PT. Inovasi Tjaraka Buana MyNet — Bandung</p>
                <ul className="timeline__list">
                  <li data-id="Menangani keluhan pelanggan terkait gangguan internet melalui telepon, WhatsApp, dan ticketing system dengan pelayanan yang responsif dan profesional" data-en="Handle customer complaints related to internet issues via phone, WhatsApp, and ticketing system with responsive and professional service">Menangani keluhan pelanggan terkait gangguan internet melalui telepon, WhatsApp, dan ticketing system dengan pelayanan yang responsif dan profesional</li>
                  <li data-id="Memberikan informasi terkait layanan, paket internet, billing, serta solusi teknis untuk memastikan kepuasan pelanggan" data-en="Provide information on services, internet packages, billing, and technical solutions to ensure customer satisfaction">Memberikan informasi terkait layanan, paket internet, billing, serta solusi teknis untuk memastikan kepuasan pelanggan</li>
                  <li data-id="Mengidentifikasi permasalahan awal dari sisi pelanggan maupun jaringan serta memberikan panduan troubleshooting modem dan ONU secara efektif" data-en="Identify initial issues from the customer and network side, and provide effective modem and ONU troubleshooting guidance">Mengidentifikasi permasalahan awal dari sisi pelanggan maupun jaringan serta memberikan panduan troubleshooting modem dan ONU secara efektif</li>
                  <li data-id="Melakukan eskalasi tiket gangguan teknis ke tim NOC untuk penanganan lanjutan sesuai prosedur dan SLA yang berlaku" data-en="Escalate technical fault tickets to the NOC team for further handling in accordance with applicable procedures and SLA">Melakukan eskalasi tiket gangguan teknis ke tim NOC untuk penanganan lanjutan sesuai prosedur dan SLA yang berlaku</li>
                  <li data-id="Mendokumentasikan setiap interaksi dan solusi penanganan untuk mendukung peningkatan kualitas layanan secara berkelanjutan" data-en="Document every interaction and resolution to support continuous service quality improvement">Mendokumentasikan setiap interaksi dan solusi penanganan untuk mendukung peningkatan kualitas layanan secara berkelanjutan</li>
                </ul>
                <div className="timeline__tags">
                  <span className="tag tag--sm" data-id="Layanan Pelanggan" data-en="Customer Service">Layanan Pelanggan</span>
                  <span className="tag tag--sm" data-id="Tiket" data-en="Ticketing">Tiket</span>
                  <span className="tag tag--sm">Modem / ONU</span>
                  <span className="tag tag--sm">WhatsApp</span>
                  <span className="tag tag--sm">SLA</span>
                </div>
              </div>
            </div>

            <div className="timeline__item">
              <div className="timeline__dot"></div>
              <div className="timeline__card">
                <div className="timeline__meta">
                  <span className="timeline__period" data-id="Jan 2025 – Sekarang" data-en="Jan 2025 – Present">Jan 2025 – Sekarang</span>
                  <span className="timeline__badge timeline__badge--current" data-id="Saat Ini" data-en="Current">Saat Ini</span>
                </div>
                <h3 className="timeline__role">Network Operations Center (NOC)</h3>
                <p className="timeline__company">PT. Inovasi Tjaraka Buana MyNet — Bandung</p>
                <ul className="timeline__list">
                  <li data-id="Memantau performa jaringan 24/7 menggunakan Zabbix, Grafana, dan MRTG untuk memastikan stabilitas dan respons cepat terhadap insiden" data-en="Monitor network performance 24/7 using Zabbix, Grafana, and MRTG to ensure stability and rapid incident response">Memantau performa jaringan 24/7 menggunakan Zabbix, Grafana, dan MRTG untuk memastikan stabilitas dan respons cepat terhadap insiden</li>
                  <li data-id="Melakukan analisis traffic network, packet loss, down link, dan troubleshooting jaringan secara remote guna meningkatkan availability dan performa jaringan" data-en="Analyze network traffic, packet loss, down links, and perform remote troubleshooting to improve network availability and performance">Melakukan analisis traffic network, packet loss, down link, dan troubleshooting jaringan secara remote guna meningkatkan availability dan performa jaringan</li>
                  <li data-id="Mengelola konfigurasi VLAN, routing, firewall rules, backup konfigurasi perangkat, serta dokumentasi IP Address untuk mendukung operasional network infrastructure" data-en="Manage VLAN configuration, routing, firewall rules, device configuration backup, and IP Address documentation to support network infrastructure operations">Mengelola konfigurasi VLAN, routing, firewall rules, backup konfigurasi perangkat, serta dokumentasi IP Address untuk mendukung operasional network infrastructure</li>
                  <li data-id="Mengkonfigurasi dan mengelola perangkat MikroTik menggunakan Winbox dan CLI untuk kebutuhan routing, firewall, dan manajemen bandwidth jaringan ISP" data-en="Configure and manage MikroTik devices using Winbox and CLI for routing, firewall, and bandwidth management of ISP networks">Mengkonfigurasi dan mengelola perangkat MikroTik menggunakan Winbox dan CLI untuk kebutuhan routing, firewall, dan manajemen bandwidth jaringan ISP</li>
                  <li data-id="Berkoordinasi dengan tim lapangan dan tim teknis untuk penanganan gangguan fisik, pemulihan layanan, serta pemenuhan SLA pelanggan" data-en="Coordinate with field and technical teams for physical fault handling, service restoration, and customer SLA fulfillment">Berkoordinasi dengan tim lapangan dan tim teknis untuk penanganan gangguan fisik, pemulihan layanan, serta pemenuhan SLA pelanggan</li>
                </ul>
                <div className="timeline__tags">
                  <span className="tag tag--sm">Zabbix</span>
                  <span className="tag tag--sm">Grafana</span>
                  <span className="tag tag--sm">MRTG</span>
                  <span className="tag tag--sm">VLAN</span>
                  <span className="tag tag--sm">MikroTik</span>
                  <span className="tag tag--sm">Winbox</span>
                  <span className="tag tag--sm">Linux</span>
                  <span className="tag tag--sm">BGP</span>
                </div>
              </div>
            </div>

            <div className="timeline__item">
              <div className="timeline__dot"></div>
              <div className="timeline__card">
                <div className="timeline__meta">
                  <span className="timeline__period" data-id="Jul 2025 – Sekarang" data-en="Jul 2025 – Present">Jul 2025 – Sekarang</span>
                  <span className="timeline__badge timeline__badge--current" data-id="Sekarang" data-en="Current">Current</span>
                  <span className="timeline__badge timeline__badge--freelance" data-id="Freelance" data-en="Freelance">Freelance</span>
                </div>
                <h3 className="timeline__role" data-id="Helpdesk" data-en="Helpdesk">Helpdesk</h3>
                <p className="timeline__company">Nusantara Global Exchange (NGX) — Batam</p>
                <ul className="timeline__list">
                  <li data-id="Memberikan dukungan teknis dan helpdesk kepada pengguna melalui remote support, ticketing system, dan komunikasi online" data-en="Provide technical and helpdesk support to users via remote support, ticketing system, and online communication">Memberikan dukungan teknis dan helpdesk kepada pengguna melalui remote support, ticketing system, dan komunikasi online</li>
                  <li data-id="Menangani troubleshooting dasar perangkat, koneksi internet, serta permasalahan user secara efektif dan responsif" data-en="Handle basic device troubleshooting, internet connections, and user issues effectively and responsively">Menangani troubleshooting dasar perangkat, koneksi internet, serta permasalahan user secara efektif dan responsif</li>
                  <li data-id="Melakukan pencatatan tiket, dokumentasi kendala teknis, dan follow up penyelesaian masalah untuk meningkatkan kualitas layanan support" data-en="Perform ticket logging, technical issue documentation, and problem resolution follow-up to improve support service quality">Melakukan pencatatan tiket, dokumentasi kendala teknis, dan follow up penyelesaian masalah untuk meningkatkan kualitas layanan support</li>
                  <li data-id="Membantu konfigurasi perangkat endpoint, instalasi software, serta troubleshooting sistem operasi dan koneksi VPN pengguna secara remote" data-en="Assist with endpoint device configuration, software installation, and remote troubleshooting of OS and VPN connectivity issues">Membantu konfigurasi perangkat endpoint, instalasi software, serta troubleshooting sistem operasi dan koneksi VPN pengguna secara remote</li>
                  <li data-id="Berkoordinasi dengan tim teknis untuk eskalasi kendala yang membutuhkan penanganan lebih lanjut di luar kapasitas first-level support" data-en="Coordinate with the technical team to escalate issues that require handling beyond first-level support capacity">Berkoordinasi dengan tim teknis untuk eskalasi kendala yang membutuhkan penanganan lebih lanjut di luar kapasitas first-level support</li>
                </ul>
                <div className="timeline__tags">
                  <span className="tag tag--sm">Helpdesk</span>
                  <span className="tag tag--sm" data-id="Dukungan Jarak Jauh" data-en="Remote Support">Dukungan Jarak Jauh</span>
                  <span className="tag tag--sm" data-id="Tiket" data-en="Ticketing">Tiket</span>
                  <span className="tag tag--sm">VPN</span>
                  <span className="tag tag--sm">Windows</span>
                  <span className="tag tag--sm">Juniper</span>
                </div>
              </div>
            </div>

            <div className="timeline__item">
              <div className="timeline__dot"></div>
              <div className="timeline__card">
                <div className="timeline__meta">
                  <span className="timeline__period" data-id="Jul 2025 – Sekarang" data-en="Jul 2025 – Present">Jul 2025 – Sekarang</span>
                  <span className="timeline__badge timeline__badge--current" data-id="Sekarang" data-en="Current">Current</span>
                  <span className="timeline__badge timeline__badge--freelance" data-id="Freelance" data-en="Freelance">Freelance</span>
                </div>
                <h3 className="timeline__role" data-id="Network Operations Center (NOC)" data-en="Network Operations Center (NOC)">Network Operations Center (NOC)</h3>
                <p className="timeline__company">PT 3D Tech — Batam</p>
                <ul className="timeline__list">
                  <li data-id="Melakukan monitoring jaringan dan identifikasi gangguan konektivitas secara remote untuk memastikan operasional jaringan berjalan optimal" data-en="Perform network monitoring and remote connectivity issue identification to ensure optimal network operations">Melakukan monitoring jaringan dan identifikasi gangguan konektivitas secara remote untuk memastikan operasional jaringan berjalan optimal</li>
                  <li data-id="Menangani troubleshooting perangkat jaringan dan koordinasi eskalasi teknis kepada tim terkait untuk percepatan penyelesaian insiden" data-en="Handle network device troubleshooting and coordinate technical escalation to relevant teams for faster incident resolution">Menangani troubleshooting perangkat jaringan dan koordinasi eskalasi teknis kepada tim terkait untuk percepatan penyelesaian insiden</li>
                  <li data-id="Membuat dokumentasi monitoring, laporan gangguan, dan update status jaringan secara berkala untuk mendukung efisiensi operasional NOC" data-en="Create monitoring documentation, incident reports, and periodic network status updates to support NOC operational efficiency">Membuat dokumentasi monitoring, laporan gangguan, dan update status jaringan secara berkala untuk mendukung efisiensi operasional NOC</li>
                  <li data-id="Memantau anomali traffic dan potensi gangguan secara proaktif menggunakan tools monitoring untuk mencegah downtime sebelum berdampak ke layanan" data-en="Proactively monitor traffic anomalies and potential disruptions using monitoring tools to prevent downtime before impacting services">Memantau anomali traffic dan potensi gangguan secara proaktif menggunakan tools monitoring untuk mencegah downtime sebelum berdampak ke layanan</li>
                  <li data-id="Menyusun laporan insiden harian dan mingguan sebagai bahan evaluasi performa jaringan dan peningkatan prosedur operasional NOC" data-en="Prepare daily and weekly incident reports as material for evaluating network performance and improving NOC operational procedures">Menyusun laporan insiden harian dan mingguan sebagai bahan evaluasi performa jaringan dan peningkatan prosedur operasional NOC</li>
                </ul>
                <div className="timeline__tags">
                  <span className="tag tag--sm">Remote NOC</span>
                  <span className="tag tag--sm" data-id="Troubleshooting" data-en="Troubleshooting">Troubleshooting</span>
                  <span className="tag tag--sm" data-id="Dokumentasi" data-en="Documentation">Dokumentasi</span>
                  <span className="tag tag--sm" data-id="Laporan Insiden" data-en="Incident Report">Laporan Insiden</span>
                  <span className="tag tag--sm">Monitoring</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="section" id="education">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">05 / <span data-id="Pendidikan" data-en="Education">Pendidikan</span></span>
            <h2 className="section__title" data-id="Pendidikan" data-en="Education">Pendidikan</h2>
          </div>
          <div className="edu__card">
            <div className="edu__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div className="edu__content">
              <div className="edu__header">
                <div>
                  <h3 className="edu__school">SMK PGRI 3 Malang</h3>
                  <p className="edu__major" data-id="Teknik Komputer dan Jaringan (TKJ)" data-en="Computer and Network Engineering (TKJ)">Teknik Komputer dan Jaringan (TKJ)</p>
                </div>
                <span className="edu__period">2022 – 2025</span>
              </div>
              <div className="edu__subjects">
                <p className="edu__subjects-label" data-id="Mata Pelajaran Relevan:" data-en="Relevant Subjects:">Mata Pelajaran Relevan:</p>
                <div className="edu__tags">
                  <span className="tag tag--sm" data-id="Konfigurasi MikroTik" data-en="MikroTik Configuration">Konfigurasi MikroTik</span>
                  <span className="tag tag--sm" data-id="Routing & Switching" data-en="Routing & Switching">Routing &amp; Switching</span>
                  <span className="tag tag--sm">Linux Server</span>
                  <span className="tag tag--sm" data-id="Fiber Optik Dasar" data-en="Basic Fiber Optics">Fiber Optik Dasar</span>
                  <span className="tag tag--sm" data-id="Administrasi Jaringan" data-en="Network Administration">Administrasi Jaringan</span>
                </div>
              </div>
              <div className="edu__activities">
                <p className="edu__subjects-label" data-id="Aktivitas:" data-en="Activities:">Aktivitas:</p>
                <p className="edu__activity-desc" data-id="Melaksanakan proyek praktikum jaringan komputer dan administrasi server sebagai implementasi keterampilan teknis di bidang IT dan networking." data-en="Carried out computer network practicum projects and server administration as implementation of technical skills in IT and networking.">Melaksanakan proyek praktikum jaringan komputer dan administrasi server sebagai implementasi keterampilan teknis di bidang IT dan networking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section section--alt" id="contact">
        <div className="container">
          <div className="section__header">
            <span className="section__tag">06 / <span data-id="Kontak" data-en="Contact">Kontak</span></span>
            <h2 className="section__title" data-id="Hubungi Saya" data-en="Contact Me">Hubungi Saya</h2>
          </div>
          <div className="contact__grid">
            <div className="contact__info">
              <p className="contact__desc" data-id="Tertarik untuk bekerja sama atau ingin tahu lebih lanjut? Saya terbuka untuk peluang kerja baru, kolaborasi, maupun diskusi seputar jaringan dan IT. Jangan ragu untuk menghubungi saya." data-en="Interested in working together or want to know more? I'm open to new job opportunities, collaborations, or discussions about networking and IT. Feel free to reach out.">Tertarik untuk bekerja sama atau ingin tahu lebih lanjut? Saya terbuka untuk peluang kerja baru, kolaborasi, maupun diskusi seputar jaringan dan IT. Jangan ragu untuk menghubungi saya.</p>
              <div className="contact__links">
                <a href="mailto:anggatok120@gmail.com?subject=Peluang%20Kerja%20%2F%20Kolaborasi&body=Halo%20Angga%2C%0A%0ANama%20saya%20%5BNama%5D%20dari%20%5BPerusahaan%2FInstansi%5D.%0A%0ASaya%20tertarik%20untuk%20berdiskusi%20mengenai%20%5BTopik%5D.%0A%0ATerima%20kasih." className="contact__link">
                  <div className="contact__link-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <span>anggatok120@gmail.com</span>
                </a>
                <a href="https://wa.me/6285147470379?text=Halo%20Angga%2C%20nama%20saya%20%5BNama%5D%20dari%20%5BPerusahaan%2FInstansi%5D.%20Saya%20tertarik%20untuk%20berdiskusi%20mengenai%20%5BTopik%5D.%20Apakah%20Anda%20tersedia%3F" target="_blank" rel="noopener noreferrer" className="contact__link">
                  <div className="contact__link-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <span>085147470379</span>
                </a>
                <a href="https://www.google.com/maps/search/Malang,+Jawa+Timur,+Indonesia" target="_blank" rel="noopener noreferrer" className="contact__link">
                  <div className="contact__link-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <span>Malang, Jawa Timur, Indonesia</span>
                </a>
              </div>
            </div>
            <div className="contact__card">
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="form__group">
                  <label className="form__label" data-id="Nama" data-en="Name">Nama</label>
                  <input
                    className="form__input"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form__group">
                  <label className="form__label">Email</label>
                  <input
                    className="form__input"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form__group">
                  <label className="form__label" data-id="Pesan" data-en="Message">Pesan</label>
                  <textarea
                    className="form__textarea"
                    placeholder="Halo Angga..."
                    data-id-ph="Halo Angga..."
                    data-en-ph="Hi Angga..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>
                {formStatus === 'success' && (
                  <p className="form__status form__status--success">
                    {lang === 'id' ? 'Pesan terkirim! Saya akan segera membalas.' : "Message sent! I'll reply soon."}
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className="form__status form__status--error">Error: {formError || 'Gagal mengirim'}</p>
                )}
                <button
                  type="submit"
                  className="btn btn--primary btn--full"
                  disabled={formStatus === 'loading'}
                >
                  {formStatus === 'loading'
                    ? (lang === 'id' ? 'Mengirim...' : 'Sending...')
                    : (lang === 'id' ? 'Kirim Pesan' : 'Send Message')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL MODAL */}
      <div className="modal-overlay" id="toolModal">
        <div className="modal-card">
          <button className="modal__close" id="modalClose">×</button>
          <div className="modal__header">
            <div className="modal__tool-icon" id="modalIcon"></div>
            <div>
              <div className="modal__tool-name" id="modalName"></div>
              <div className="modal__tool-cat" id="modalCat"></div>
            </div>
          </div>
          <div className="modal__screen" id="modalScreen"></div>
          <div className="modal__desc" id="modalDesc"></div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__inner">
          <p data-id="© 2026 Angga. Semua hak dilindungi." data-en="© 2026 Angga. All rights reserved.">© 2026 Angga. Semua hak dilindungi.</p>
          <p className="footer__sub" data-id="Dibuat dengan Next.js & ❤️" data-en="Built with Next.js & ❤️">Dibuat dengan Next.js &amp; ❤️</p>
        </div>
      </footer>
    </>
  )
}
