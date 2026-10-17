import test from "node:test";
import assert from "node:assert/strict";
import { POST } from "../app/api/admin/login/route.js";

test("POST /api/admin/login menolak content-type bukan JSON", async () => {
  const req = new Request("http://localhost/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: "test",
  });

  const res = await POST(req);
  assert.equal(res.status, 415);
});

test("POST /api/admin/login menolak password salah dan mengirim notifikasi kegagalan ke Telegram", async () => {
  process.env.AUTH_SECRET = "12345678901234567890123456789012";
  process.env.ADMIN_PASSWORD = "supersecretadminpassword123";

  let telegramCalled = false;
  let sentPayload = null;
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
    const req = new Request("http://localhost/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15",
        "cf-connecting-ip": "114.122.5.6",
      },
      body: JSON.stringify({ password: "password_ngawur" }),
    });

    const res = await POST(req);
    assert.equal(res.status, 401);
    assert.equal(telegramCalled, true, "Telegram alert harus terpanggil saat login gagal");
    assert.ok(sentPayload.text.includes("anggot.my.id"), "Harus mencantumkan domain anggot.my.id");
    assert.ok(sentPayload.text.includes("iPhone"), "Harus mendeteksi perangkat iPhone");
    assert.ok(sentPayload.text.includes("114.122.5.6"), "Harus mencantumkan IP penyerang/pengakses");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("POST /api/admin/login memproses login berhasil dan mengirim notifikasi sukses ke Telegram", async () => {
  process.env.AUTH_SECRET = "12345678901234567890123456789012";
  process.env.ADMIN_PASSWORD = "supersecretadminpassword123";

  let telegramCalled = false;
  let sentPayload = null;
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
    const req = new Request("http://localhost/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0",
        "cf-connecting-ip": "182.1.2.3",
      },
      body: JSON.stringify({ password: "supersecretadminpassword123" }),
    });

    const res = await POST(req);
    assert.equal(res.status, 200);
    assert.equal(telegramCalled, true, "Telegram alert harus terpanggil saat login berhasil");
    assert.ok(sentPayload.text.includes("LOGIN ADMIN"), "Pesan harus bertajuk LOGIN ADMIN");
    assert.ok(sentPayload.text.includes("Windows"), "Harus mendeteksi perangkat Windows");
    assert.ok(sentPayload.text.includes("182.1.2.3"), "Harus mencantumkan IP 182.1.2.3");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
