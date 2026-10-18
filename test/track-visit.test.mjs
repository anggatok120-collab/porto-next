import test from "node:test";
import assert from "node:assert/strict";
import { POST } from "../app/api/track-visit/route.js";

test("POST /api/track-visit mengabaikan request dari bot atau Uptime-Kuma tanpa mengirim Telegram", async () => {
  let telegramCalled = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    if (String(url).includes("api.telegram.org")) {
      telegramCalled = true;
      return new Response(JSON.stringify({ ok: true }));
    }
    return originalFetch(url, opts);
  };

  try {
    const req = new Request("http://localhost/api/track-visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-agent": "Uptime-Kuma/2.5.6",
      },
      body: JSON.stringify({ path: "/" }),
    });

    const res = await POST(req);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.ignored, true);
    assert.equal(telegramCalled, false, "Uptime Kuma tidak boleh memicu alert Telegram");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("POST /api/track-visit mengirim notifikasi Telegram untuk pengunjung manusia asli", async () => {
  let telegramCalled = false;
  let sentPayload = null;
  process.env.TELEGRAM_LOGS_BOT_TOKEN = "mock_test_token";
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    if (String(url).includes("api.telegram.org")) {
      telegramCalled = true;
      sentPayload = JSON.parse(opts.body);
      return new Response(JSON.stringify({ ok: true }));
    }
    return originalFetch(url, opts);
  };

  try {
    const req = new Request("http://localhost/api/track-visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
        "cf-connecting-ip": "114.122.5.6",
        "cf-ipcountry": "ID",
        "cf-ipcity": "Surabaya",
      },
      body: JSON.stringify({ path: "/", referrer: "https://google.com" }),
    });

    const res = await POST(req);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(telegramCalled, true, "Telegram alert harus terpanggil");
    assert.ok(sentPayload.text.includes("anggot.my.id"), "Pesan harus mencantumkan domain");
    assert.ok(sentPayload.text.includes("iPhone"), "Pesan harus mendeteksi iPhone");
    assert.ok(sentPayload.text.includes("114.122.5.6"), "Pesan harus memuat IP");
    assert.ok(sentPayload.text.includes("Surabaya"), "Pesan harus memuat kota bila tersedia");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("POST /api/track-visit menggunakan clientIp dan lokasi saat request dari gateway NAT 10.10.0.1 tanpa header Cloudflare", async () => {
  let telegramCalled = false;
  let sentPayload = null;
  process.env.TELEGRAM_LOGS_BOT_TOKEN = "mock_test_token";
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, opts) => {
    if (String(url).includes("api.telegram.org")) {
      telegramCalled = true;
      sentPayload = JSON.parse(opts.body);
      return new Response(JSON.stringify({ ok: true }));
    }
    return originalFetch(url, opts);
  };

  try {
    const req = new Request("http://localhost/api/track-visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-agent": "Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
        "x-real-ip": "10.10.0.1",
        "x-forwarded-for": "10.10.0.1",
      },
      body: JSON.stringify({
        path: "/",
        clientIp: "180.252.12.34",
        clientCity: "Malang",
        clientCountry: "Indonesia",
        clientIsp: "Telkomsel"
      }),
    });

    const res = await POST(req);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(telegramCalled, true, "Telegram alert harus terpanggil");
    assert.ok(!sentPayload.text.includes("10.10.0.1"), "Pesan tidak boleh menampilkan IP gateway privat 10.10.0.1");
    assert.ok(sentPayload.text.includes("180.252.12.34"), "Pesan harus memuat real IP pengunjung");
    assert.ok(sentPayload.text.includes("Malang"), "Pesan harus memuat kota");
    assert.ok(sentPayload.text.includes("Indonesia"), "Pesan harus memuat negara");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

