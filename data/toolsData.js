export const TOOLS_DATA = {
  MikroTik: {
    color: "#e60000",
    textColor: "#fff",
    cat: "Router OS · Manajemen Jaringan",
    desc: "MikroTik RouterOS adalah sistem operasi jaringan yang digunakan untuk mengkonfigurasi perangkat router. Dipakai sehari-hari untuk konfigurasi routing statis/dinamis, VLAN, firewall rules, NAT, dan monitoring bandwidth. Antarmuka utamanya adalah Winbox (GUI) dan terminal CLI via SSH.",
    iconBg: "#e60000",
    iconText: "#fff",
    iconLabel: "MT",
    mock: `
      <div class="mock-window" style="background:#111;border-radius:8px;overflow:hidden;border:1px solid #333;font-family:monospace;font-size:12px;color:#eee;">
        <div style="background:#1c0808;padding:8px 12px;display:flex;align-items:center;gap:6px;border-bottom:1px solid #331010;">
          <span style="width:10px;height:10px;border-radius:50%;background:#ff5f56;display:inline-block"></span>
          <span style="width:10px;height:10px;border-radius:50%;background:#ffbd2e;display:inline-block"></span>
          <span style="width:10px;height:10px;border-radius:50%;background:#27c93f;display:inline-block"></span>
          <span style="margin-left:8px;font-size:11px;color:#aaa;">RouterOS 7.14.2 — IP → Addresses</span>
        </div>
        <div style="display:flex;min-height:160px;">
          <div style="width:100px;background:#151515;border-right:1px solid #222;padding:8px 0;">
            <div style="padding:4px 10px;color:#888;">Interfaces</div>
            <div style="padding:4px 10px;color:#e60000;background:rgba(230,0,0,0.12);font-weight:bold;">IP</div>
            <div style="padding:4px 10px;color:#888;">Routing</div>
            <div style="padding:4px 10px;color:#888;">Firewall</div>
            <div style="padding:4px 10px;color:#888;">VLAN</div>
            <div style="padding:4px 10px;color:#888;">Tools</div>
          </div>
          <div style="flex:1;padding:10px;">
            <div style="display:grid;grid-template-columns:30px 110px 90px 1fr;padding:4px 0;border-bottom:1px solid #333;color:#888;font-size:11px;">
              <span>#</span><span>Address</span><span>Network</span><span>Interface</span>
            </div>
            <div style="display:grid;grid-template-columns:30px 110px 90px 1fr;padding:5px 0;border-bottom:1px solid #222;">
              <span style="color:#e60000;">0</span><span>10.0.0.1/24</span><span>10.0.0.0</span><span>ether1</span>
            </div>
            <div style="display:grid;grid-template-columns:30px 110px 90px 1fr;padding:5px 0;border-bottom:1px solid #222;background:rgba(255,255,255,0.04);">
              <span style="color:#e60000;">1</span><span>192.168.1.1/24</span><span>192.168.1.0</span><span>ether2</span>
            </div>
            <div style="display:grid;grid-template-columns:30px 110px 90px 1fr;padding:5px 0;border-bottom:1px solid #222;">
              <span style="color:#e60000;">2</span><span>172.16.10.1/24</span><span>172.16.10.0</span><span>vlan100</span>
            </div>
            <div style="display:grid;grid-template-columns:30px 110px 90px 1fr;padding:5px 0;">
              <span style="color:#e60000;">3</span><span>10.10.10.1/30</span><span>10.10.10.0</span><span>ether3</span>
            </div>
          </div>
        </div>
      </div>
    `,
  },
  Zabbix: {
    color: "#d40000",
    textColor: "#fff",
    cat: "Network Monitoring · Alerting & Triggers",
    desc: "Zabbix adalah platform monitoring jaringan open-source yang digunakan untuk memantau host, layanan, dan threshold. Di NOC, Zabbix dipakai untuk deteksi dini gangguan, trigger alert otomatis, dan dashboard realtime status jaringan seluruh infrastruktur.",
    iconBg: "#2a0e0e",
    iconText: "#ff6b6b",
    iconLabel: "ZB",
    mock: `
      <div style="background:#0d0d0d;border-radius:8px;overflow:hidden;border:1px solid #333;font-family:monospace;font-size:12px;color:#eee;">
        <div style="background:#180606;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #331515;">
          <span style="color:#ff4d4d;font-weight:bold;letter-spacing:1px;">ZABBIX 6.4</span>
          <span style="color:#888;font-size:11px;">Monitoring → Problems</span>
          <span style="color:#4ade80;font-size:11px;">System Status: OK</span>
        </div>
        <div style="padding:10px;display:flex;flex-direction:column;gap:6px;">
          <div style="background:rgba(220,38,38,0.15);border-left:3px solid #dc2626;padding:6px 10px;display:flex;justify-content:space-between;">
            <span style="color:#f87171;font-weight:bold;">[HIGH] sw-core-01 : Interface GE0/1 down</span>
            <span style="color:#888;font-size:11px;">3m ago</span>
          </div>
          <div style="background:rgba(234,179,8,0.12);border-left:3px solid #eab308;padding:6px 10px;display:flex;justify-content:space-between;">
            <span style="color:#fbbf24;">[WARN] router-02 : CPU utilization &gt; 85%</span>
            <span style="color:#888;font-size:11px;">12m ago</span>
          </div>
          <div style="background:rgba(59,130,246,0.1);border-left:3px solid #3b82f6;padding:6px 10px;display:flex;justify-content:space-between;">
            <span style="color:#60a5fa;">[INFO] server-nms : Disk usage /var &gt; 75%</span>
            <span style="color:#888;font-size:11px;">1h ago</span>
          </div>
        </div>
      </div>
    `,
  },
  Grafana: {
    color: "#f46800",
    textColor: "#fff",
    cat: "Visualisasi Data · Dashboard Analytics",
    desc: "Grafana adalah platform visualisasi data dan analytics yang digunakan untuk membangun dashboard monitoring network. Di NOC, Grafana menampilkan realtime metrics seperti bandwidth usage, uptime, latency, dan packet loss dalam grafik yang mudah dipahami.",
    iconBg: "#1e1e2e",
    iconText: "#f46800",
    iconLabel: "GF",
    mock: `
      <div style="background:#111217;border-radius:8px;overflow:hidden;border:1px solid #333;font-family:monospace;font-size:12px;color:#eee;padding:12px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
          <span style="color:#f46800;font-weight:bold;">⬡ NOC Network Overview</span>
          <span style="color:#888;font-size:11px;">Bandwidth ether1 (Mbps) · Last 6 hours</span>
        </div>
        <div style="display:flex;align-items:flex-end;gap:5px;height:90px;padding:8px 0;border-bottom:1px solid #222;">
          <div style="flex:1;background:rgba(244,104,0,0.5);height:40%;"></div>
          <div style="flex:1;background:rgba(244,104,0,0.5);height:65%;"></div>
          <div style="flex:1;background:rgba(244,104,0,0.5);height:50%;"></div>
          <div style="flex:1;background:rgba(244,104,0,0.5);height:80%;"></div>
          <div style="flex:1;background:rgba(244,104,0,0.5);height:70%;"></div>
          <div style="flex:1;background:#f46800;height:95%;border-radius:2px 2px 0 0;"></div>
          <div style="flex:1;background:rgba(244,104,0,0.5);height:75%;"></div>
          <div style="flex:1;background:rgba(244,104,0,0.5);height:85%;"></div>
          <div style="flex:1;background:rgba(244,104,0,0.5);height:60%;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;color:#888;font-size:10px;margin-top:6px;">
          <span>Current: 94.2 Mbps</span>
          <span>Avg: 68.4 Mbps</span>
          <span>Max: 98.7 Mbps</span>
        </div>
      </div>
    `,
  },
  Linux: {
    color: "#fcc624",
    textColor: "#000",
    cat: "Server OS · Administrasi Sistem",
    desc: "Linux Server digunakan untuk administrasi sistem operasi server jaringan, konfigurasi layanan (DNS, DHCP, NTP), manajemen user dan permission, monitoring resource, serta menjalankan tools seperti Zabbix, Grafana, dan MRTG.",
    iconBg: "#222",
    iconText: "#fcc624",
    iconLabel: "🐧",
    mock: `
      <div style="background:#0c0d10;border-radius:8px;overflow:hidden;border:1px solid #333;font-family:monospace;font-size:12px;color:#eee;">
        <div style="background:#181920;padding:6px 12px;display:flex;align-items:center;gap:6px;border-bottom:1px solid #282930;">
          <span style="width:10px;height:10px;border-radius:50%;background:#ff5f56;display:inline-block"></span>
          <span style="width:10px;height:10px;border-radius:50%;background:#ffbd2e;display:inline-block"></span>
          <span style="width:10px;height:10px;border-radius:50%;background:#27c93f;display:inline-block"></span>
          <span style="margin-left:8px;font-size:11px;color:#aaa;">admin@nms-server:~</span>
        </div>
        <div style="padding:12px;line-height:1.6;">
          <div><span style="color:#4ade80;">admin@nms-server</span>:<span style="color:#38bdf8;">~</span>$ systemctl status zabbix-server --no-pager</div>
          <div style="color:#4ade80;">● zabbix-server.service - Zabbix Server</div>
          <div style="color:#aaa;">   Active: <span style="color:#4ade80;font-weight:bold;">active (running)</span> since Mon 2026-08-10 08:00:00 WIB</div>
          <div style="color:#aaa;">   Tasks: 38 (limit: 4915) | Memory: 512.4M</div>
          <div style="margin-top:6px;"><span style="color:#4ade80;">admin@nms-server</span>:<span style="color:#38bdf8;">~</span>$ uptime</div>
          <div style="color:#aaa;"> 09:30:15 up 84 days, 2:14, 1 user, load average: 0.18, 0.22, 0.19</div>
        </div>
      </div>
    `,
  },
  SSH: {
    color: "#38bdf8",
    textColor: "#000",
    cat: "Protokol Remote Access · Secure Shell",
    desc: "SSH (Secure Shell) digunakan untuk remote login ke router, server, dan perangkat jaringan secara aman dan terenkripsi. Di NOC, SSH adalah tool utama untuk troubleshooting jarak jauh, eksekusi perintah, dan konfigurasi perangkat tanpa harus ke lokasi fisik.",
    iconBg: "#112233",
    iconText: "#38bdf8",
    iconLabel: "SSH",
    mock: `
      <div style="background:#090d12;border-radius:8px;overflow:hidden;border:1px solid #1e3a5f;font-family:monospace;font-size:12px;color:#eee;padding:12px;line-height:1.6;">
        <div><span style="color:#38bdf8;">workstation</span>:~$ ssh admin@10.0.0.1 -p 22</div>
        <div style="color:#aaa;">Authenticated to 10.0.0.1 using ed25519 key.</div>
        <div style="color:#4ade80;font-weight:bold;">MikroTik RouterOS 7.14.2 (stable)</div>
        <div style="color:#e5e5e5;">[admin@MikroTik-Core] &gt; <span style="color:#fbbf24;">ip route print</span></div>
        <div style="color:#aaa;">0  dst-address=0.0.0.0/0 gateway=103.10.x.1 gateway-status=103.10.x.1 reachable via ether1 distance=1</div>
        <div style="color:#aaa;">1  dst-address=192.168.10.0/24 gateway=bridge-lan distance=1</div>
      </div>
    `,
  },
  MRTG: {
    color: "#00ccaa",
    textColor: "#fff",
    cat: "Traffic Monitoring · Grafik Bandwidth",
    desc: "MRTG (Multi Router Traffic Grapher) adalah tool monitoring bandwidth berbasis SNMP yang menampilkan grafik lalu lintas jaringan masuk/keluar. Di NOC, MRTG digunakan untuk memantau penggunaan bandwidth per interface dan mendeteksi anomali traffic secara visual.",
    iconBg: "#003333",
    iconText: "#00ccaa",
    iconLabel: "MR",
    mock: `
      <div style="background:#081010;border-radius:8px;overflow:hidden;border:1px solid #005544;font-family:monospace;font-size:12px;color:#eee;padding:12px;">
        <div style="color:#00ccaa;font-weight:bold;margin-bottom:8px;">MRTG — ether1 Daily Traffic (5 Minute Average)</div>
        <div style="display:flex;align-items:flex-end;gap:3px;height:75px;padding:6px 0;border-bottom:1px solid #004433;">
          <div style="flex:1;background:#00ccaa;height:45%;"></div>
          <div style="flex:1;background:#00ccaa;height:60%;"></div>
          <div style="flex:1;background:#00ccaa;height:75%;"></div>
          <div style="flex:1;background:#00ccaa;height:88%;"></div>
          <div style="flex:1;background:#00ccaa;height:92%;"></div>
          <div style="flex:1;background:#00ccaa;height:78%;"></div>
          <div style="flex:1;background:#00ccaa;height:65%;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;color:#00ccaa;font-size:10.5px;margin-top:8px;">
          <span>Max In: 92.4 Mbps</span>
          <span>Avg In: 63.1 Mbps</span>
          <span>Cur In: 78.2 Mbps</span>
        </div>
      </div>
    `,
  },
  Juniper: {
    color: "#84b135",
    textColor: "#fff",
    cat: "Network Equipment · Enterprise Routing",
    desc: "Juniper Networks adalah vendor perangkat jaringan enterprise untuk routing dan switching skala besar. JunOS digunakan untuk konfigurasi BGP, OSPF, firewall filter, dan monitoring interface. Digunakan di NOC untuk troubleshooting dan monitoring core network.",
    iconBg: "#0f2010",
    iconText: "#84b135",
    iconLabel: "JN",
    mock: `
      <div style="background:#090e09;border-radius:8px;overflow:hidden;border:1px solid #234515;font-family:monospace;font-size:12px;color:#eee;padding:12px;line-height:1.6;">
        <div style="color:#84b135;">admin@core-rtr-01 &gt; show bgp summary</div>
        <div style="color:#aaa;">Groups: 2   Peers: 3   Down peers: 0</div>
        <div style="color:#aaa;">Table inet.0 : 148 Paths, 148 Act Paths, <span style="color:#84b135;font-weight:bold;">Established</span></div>
        <div style="color:#aaa;">Peer 10.0.0.2  AS 65001 : <span style="color:#84b135;">Established</span> (64/64 prefixes)</div>
        <div style="color:#aaa;">Peer 172.16.0.2 AS 65002 : <span style="color:#84b135;">Established</span> (84/84 prefixes)</div>
      </div>
    `,
  },
  Winbox: {
    color: "#3b82f6",
    textColor: "#fff",
    cat: "GUI Client · MikroTik RouterOS",
    desc: "Winbox adalah aplikasi GUI resmi dari MikroTik untuk mengkonfigurasi RouterOS secara visual. Lebih mudah digunakan dibandingkan CLI, mendukung drag-and-drop interface, dan dipakai untuk konfigurasi routing, firewall, VLAN, serta melihat traffic realtime.",
    iconBg: "#1a1a2e",
    iconText: "#3b82f6",
    iconLabel: "WB",
    mock: `
      <div style="background:#1e1e1e;border-radius:8px;overflow:hidden;border:1px solid #444;font-family:monospace;font-size:12px;color:#eee;">
        <div style="background:#2d2d2d;padding:6px 10px;display:flex;justify-content:space-between;font-size:11px;color:#aaa;">
          <span>Winbox v3.40 — 10.0.0.1 (MikroTik Core)</span>
          <span style="color:#4ade80;">Connected via MAC</span>
        </div>
        <div style="padding:10px;background:#252525;border-bottom:1px solid #333;display:flex;gap:12px;font-size:11px;color:#ccc;">
          <span style="color:#38bdf8;font-weight:bold;">Addresses</span><span>Routes</span><span>DNS</span><span>DHCP Server</span><span>Firewall</span>
        </div>
        <div style="padding:10px;font-size:11.5px;">
          <div>10.0.0.1/24 &nbsp;ether1 (WAN)</div>
          <div>192.168.1.1/24 ether2 (LAN)</div>
          <div>172.16.10.1/24 vlan100 (Management)</div>
        </div>
      </div>
    `,
  },
  Huawei: {
    color: "#e41e2b",
    textColor: "#fff",
    cat: "Network Equipment · Enterprise Switch & Routing",
    desc: "Huawei Switch (VRP OS) digunakan untuk manajemen switching enterprise, VLAN tagging, L2/L3 routing, ACL, port security, dan stacking (iStack). Dipakai di jaringan enterprise, data center, dan ISP.",
    iconBg: "#2a080a",
    iconText: "#e41e2b",
    iconLabel: "HW",
    mock: `
      <div style="background:#0a0707;border-radius:8px;overflow:hidden;border:1px solid #4a1515;font-family:monospace;font-size:12px;color:#eee;padding:12px;line-height:1.6;">
        <div style="color:#e41e2b;">&lt;Huawei-S5735&gt; display vlan</div>
        <div style="color:#aaa;">Total VLANs: 4</div>
        <div style="color:#aaa;">VLAN ID 10 : <span style="color:#4ade80;">enable</span> (GE0/0/1, GE0/0/2)</div>
        <div style="color:#aaa;">VLAN ID 20 : <span style="color:#4ade80;">enable</span> (GE0/0/3, GE0/0/4)</div>
        <div style="color:#aaa;">VLAN ID 100: <span style="color:#4ade80;">enable</span> (GE0/0/24 - Trunk Uplink)</div>
      </div>
    `,
  },
  Ruijie: {
    color: "#0066cc",
    textColor: "#fff",
    cat: "Network Equipment · Enterprise Switch & Cloud AP",
    desc: "Ruijie Networks (RGOS) digunakan untuk manajemen switch, VLAN, PoE management, trunking, serta integrasi dengan Ruijie Cloud untuk pemantauan jaringan kampus dan bisnis secara terpusat.",
    iconBg: "#0a192f",
    iconText: "#38bdf8",
    iconLabel: "RJ",
    mock: `
      <div style="background:#0a101d;border-radius:8px;overflow:hidden;border:1px solid #15325b;font-family:monospace;font-size:12px;color:#eee;padding:12px;line-height:1.6;">
        <div style="color:#38bdf8;">Ruijie# show interfaces status</div>
        <div style="color:#aaa;">Gi0/1 : <span style="color:#4ade80;">Connected</span> (Vlan 10, Full 1000M)</div>
        <div style="color:#aaa;">Gi0/2 : <span style="color:#4ade80;">Connected</span> (Vlan 20, Full 1000M)</div>
        <div style="color:#aaa;">Ruijie Cloud Status : <span style="color:#4ade80;font-weight:bold;">ONLINE</span> (RG-NBS3100-24GT4FP-P)</div>
      </div>
    `,
  },
};
