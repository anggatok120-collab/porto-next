import test from "node:test";
import assert from "node:assert/strict";

const MOCK_LOGS_TOKEN = "mock_logs_bot_token_12345";
const MOCK_MONITOR_TOKEN = "mock_monitor_bot_token_67890";

test("Porto Routes: Visitor tracker mengutamakan TELEGRAM_LOGS_BOT_TOKEN", async () => {
  let capturedToken = null;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    const urlStr = String(url);
    if (urlStr.includes("api.telegram.org")) {
      const match = urlStr.match(/\/bot([^/]+)\//);
      if (match) capturedToken = match[1];
      return {
        ok: true,
        json: async () => ({ ok: true, result: {} }),
      };
    }
    return originalFetch(url, options);
  };

  try {
    process.env.TELEGRAM_LOGS_BOT_TOKEN = MOCK_LOGS_TOKEN;
    process.env.TELEGRAM_BOT_TOKEN = MOCK_MONITOR_TOKEN;

    const { POST: trackPost } = await import("../app/api/track-visit/route.js");
    const req = new Request("http://localhost/api/track-visit", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        "x-forwarded-for": "103.111.140.230",
      },
      body: JSON.stringify({ path: "/projects" }),
    });

    const res = await trackPost(req);
    assert.equal(res.status, 200);
    assert.equal(capturedToken, MOCK_LOGS_TOKEN, "Visitor tracker harus mengutamakan token Log");
  } finally {
    globalThis.fetch = originalFetch;
    delete process.env.TELEGRAM_LOGS_BOT_TOKEN;
    delete process.env.TELEGRAM_BOT_TOKEN;
  }
});

test("Porto Routes: Visitor tracker fallback ke TELEGRAM_BOT_TOKEN jika LOGS token tidak ada", async () => {
  let capturedToken = null;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    const urlStr = String(url);
    if (urlStr.includes("api.telegram.org")) {
      const match = urlStr.match(/\/bot([^/]+)\//);
      if (match) capturedToken = match[1];
      return {
        ok: true,
        json: async () => ({ ok: true, result: {} }),
      };
    }
    return originalFetch(url, options);
  };

  try {
    delete process.env.TELEGRAM_LOGS_BOT_TOKEN;
    process.env.TELEGRAM_BOT_TOKEN = MOCK_MONITOR_TOKEN;

    const { POST: trackPost } = await import("../app/api/track-visit/route.js");
    const req = new Request("http://localhost/api/track-visit", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        "x-forwarded-for": "103.111.140.231",
      },
      body: JSON.stringify({ path: "/about" }),
    });

    const res = await trackPost(req);
    assert.equal(res.status, 200);
    assert.equal(capturedToken, MOCK_MONITOR_TOKEN, "Visitor tracker harus fallback ke token Monitor");
  } finally {
    globalThis.fetch = originalFetch;
    delete process.env.TELEGRAM_LOGS_BOT_TOKEN;
    delete process.env.TELEGRAM_BOT_TOKEN;
  }
});
