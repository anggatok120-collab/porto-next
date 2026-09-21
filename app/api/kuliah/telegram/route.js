const TELEGRAM_API = "https://api.telegram.org";

export async function GET() {
  return Response.json({
    configured: Boolean(
      process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID,
    ),
  });
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Format permintaan tidak valid." }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = String(body?.chatId || process.env.TELEGRAM_CHAT_ID || "").trim();
  const message = String(body?.message || "").trim();

  if (!token) {
    return Response.json(
      {
        message:
          "TELEGRAM_BOT_TOKEN belum tersedia. Tambahkan token ke .env lalu jalankan ulang server.",
        code: "BOT_NOT_CONFIGURED",
      },
      { status: 503 },
    );
  }

  if (!chatId || !message) {
    return Response.json(
      { message: "Chat ID dan isi pesan wajib diisi." },
      { status: 400 },
    );
  }

  if (message.length > 4096) {
    return Response.json(
      { message: "Pesan melebihi batas 4096 karakter Telegram." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      return Response.json(
        { message: result.description || "Telegram menolak permintaan." },
        { status: response.status || 502 },
      );
    }

    return Response.json({ message: "Pengingat berhasil dikirim ke Telegram." });
  } catch {
    return Response.json(
      { message: "Tidak dapat terhubung ke Telegram saat ini." },
      { status: 502 },
    );
  }
}
