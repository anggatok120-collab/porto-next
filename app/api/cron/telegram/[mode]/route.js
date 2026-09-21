const TELEGRAM_API = "https://api.telegram.org";
const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

const schedule = {
  Senin: [
    ["07.00 - 08.40", "SFI", "Gazebo sebelah Perpustakaan", "Bu Poppy"],
    ["08.40 - 10.20", "Integrated", "GKB 1 Ruang 509", "Bu Wiwik"],
    ["10.20 - 12.00", "Matematika", "Laboratorium Perikanan", "Pak Dony"],
  ],
  Selasa: [
    ["08.40 - 10.20", "Fisika Kimia", "GKB 1 Ruang 418", "Bu Anis"],
    ["13.00 - 14.40", "Biologi Perikanan", "GKB 1 Ruang 534", "Bu Hany"],
  ],
  Rabu: [
    ["07.00 - 08.40", "Pancasila", "Masjid Aula Lt. 02", "Pak Jusri"],
    ["08.40 - 10.20", "Bahasa Indonesia", "Masjid Ruang 408 Kelas L", "Pak Musaffak"],
  ],
  Kamis: [
    ["Menyusul", "Agrokompleks Inovatif", "Menyusul", "Pak David"],
    ["10.20 - 12.00", "Wawasan Keberlanjutan", "Laboratorium Perikanan", "Pak Fery"],
    ["13.00 - 14.40", "SDA", "GKB 1 Ruang 511", "Tim LC"],
  ],
  Jumat: [
    ["08.40 - 10.20", "Pengantar Ilmu Perikanan", "Laboratorium Perikanan", "Pak Ganjar"],
  ],
};

function todayInJakarta() {
  const now = new Date();
  const day = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    timeZone: "Asia/Jakarta",
  }).format(now);
  const label = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(now);
  return { day: day.charAt(0).toUpperCase() + day.slice(1), label };
}

function formatClasses(day) {
  const items = schedule[day] || [];
  if (!items.length) return `<b>${day}</b>\nTidak ada jadwal kuliah.`;
  const rows = items.map(([time, subject, room, lecturer]) =>
    `<b>${time} | ${subject}</b>\n${room}\nPengajar: ${lecturer}`,
  );
  return `<b>${day}</b>\n${rows.join("\n\n")}`;
}

function buildMessage(mode) {
  if (mode === "daily") {
    const { day, label } = todayInJakarta();
    return `<b>Akuakalcer</b>\n<b>Jadwal Hari Ini</b>\n${label}\n\n${formatClasses(day)}`;
  }

  return `<b>Akuakalcer</b>\n<b>Jadwal Mingguan</b>\nSenin sampai Jumat\n\n${DAYS.map(formatClasses).join("\n\n")}`;
}

export async function GET(request, context) {
  const authorization = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ message: "Tidak diizinkan." }, { status: 401 });
  }

  const { mode } = await context.params;
  if (mode !== "daily" && mode !== "weekly") {
    return Response.json({ message: "Mode pengingat tidak dikenal." }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return Response.json({ message: "Telegram belum dikonfigurasi." }, { status: 503 });
  }

  try {
    const response = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildMessage(mode),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      cache: "no-store",
    });
    const result = await response.json();
    if (!response.ok || !result.ok) {
      return Response.json(
        { message: result.description || "Telegram menolak pengingat." },
        { status: response.status || 502 },
      );
    }
    return Response.json({ message: `Pengingat ${mode} berhasil dikirim.` });
  } catch {
    return Response.json({ message: "Telegram tidak dapat dijangkau." }, { status: 502 });
  }
}
