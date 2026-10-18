import test from "node:test";
import assert from "node:assert/strict";
import { POST } from "../app/api/contact/route.js";

test("POST /api/contact menolak permintaan kosong dengan status 400", async () => {
  const req = new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  const res = await POST(req);
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.error, "Semua field harus diisi");
});

test("POST /api/contact menolak format email tidak valid", async () => {
  const req = new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Budi",
      email: "budi-bukan-email",
      message: "Halo test",
    }),
  });

  const res = await POST(req);
  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.error, "Format email tidak valid");
});

test("POST /api/contact berhasil memproses pesan valid dan mengirim notifikasi Telegram", async () => {
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
    const req = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Pengunjung Web",
        email: "pengunjung@example.com",
        message: "Halo, saya tertarik bekerja sama untuk proyek jaringan.",
      }),
    });

    const res = await POST(req);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(telegramCalled, true, "Notifikasi Telegram harus dikirim");
    assert.ok(sentPayload.text.includes("anggot.my.id"), "Pesan harus mencantumkan domain anggot.my.id");
    assert.ok(sentPayload.text.includes("Pengunjung Web"), "Pesan harus mencantumkan nama pengirim");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
