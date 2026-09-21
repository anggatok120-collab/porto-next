"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowSquareOut,
  Bell,
  BookOpenText,
  CalendarBlank,
  CalendarDots,
  CaretLeft,
  CaretRight,
  ChalkboardTeacher,
  Check,
  CheckCircle,
  Circle,
  Clock,
  FishSimple,
  GraduationCap,
  House,
  ListChecks,
  MagnifyingGlass,
  MapPin,
  Moon,
  PencilSimple,
  Plus,
  SidebarSimple,
  Sun,
  TelegramLogo,
  Trash,
  UserCircle,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import styles from "./kuliah.module.css";

const STORAGE_KEY = "akuakalcer-kuliah-v3";
const DAY_ORDER = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

const initialData = {
  courses: [
    {
      id: "course-sfi",
      code: "SFI",
      name: "SFI",
      lecturer: "Bu Poppy",
      room: "Gazebo sebelah Perpustakaan",
    },
    {
      id: "course-integrated",
      code: "INT",
      name: "Integrated",
      lecturer: "Bu Wiwik",
      room: "GKB 1 Ruang 509",
    },
    {
      id: "course-matematika",
      code: "MAT",
      name: "Matematika",
      lecturer: "Pak Dony",
      room: "Laboratorium Perikanan",
    },
    {
      id: "course-fisika-kimia",
      code: "FISKIM",
      name: "Fisika Kimia",
      lecturer: "Bu Anis",
      room: "GKB 1 Ruang 418",
    },
    {
      id: "course-biologi-perikanan",
      code: "BIOPER",
      name: "Biologi Perikanan",
      lecturer: "Bu Hany",
      room: "GKB 1 Ruang 534",
    },
    {
      id: "course-pancasila",
      code: "PKN",
      name: "Pancasila",
      lecturer: "Pak Jusri",
      room: "Masjid Aula Lt. 02",
    },
    {
      id: "course-bahasa-indonesia",
      code: "BIND",
      name: "Bahasa Indonesia",
      lecturer: "Pak Musaffak",
      room: "Masjid Ruang 408 Kelas L",
    },
    {
      id: "course-agrokompleks",
      code: "AGRO",
      name: "Agrokompleks Inovatif",
      lecturer: "Pak David",
      room: "Menyusul",
    },
    {
      id: "course-wawasan",
      code: "WK",
      name: "Wawasan Keberlanjutan",
      lecturer: "Pak Fery",
      room: "Laboratorium Perikanan",
    },
    {
      id: "course-sda",
      code: "SDA",
      name: "SDA",
      lecturer: "Tim LC",
      room: "GKB 1 Ruang 511",
    },
    {
      id: "course-pip",
      code: "PIP",
      name: "Pengantar Ilmu Perikanan",
      lecturer: "Pak Ganjar",
      room: "Laboratorium Perikanan",
    },
  ],
  schedules: [
    { id: "sch-sfi", courseId: "course-sfi", day: "Senin", start: "07:00", end: "08:40" },
    { id: "sch-integrated", courseId: "course-integrated", day: "Senin", start: "08:40", end: "10:20" },
    { id: "sch-matematika", courseId: "course-matematika", day: "Senin", start: "10:20", end: "12:00" },
    { id: "sch-fisika-kimia", courseId: "course-fisika-kimia", day: "Selasa", start: "08:40", end: "10:20" },
    { id: "sch-biologi-perikanan", courseId: "course-biologi-perikanan", day: "Selasa", start: "13:00", end: "14:40" },
    { id: "sch-pancasila", courseId: "course-pancasila", day: "Rabu", start: "07:00", end: "08:40" },
    { id: "sch-bahasa-indonesia", courseId: "course-bahasa-indonesia", day: "Rabu", start: "08:40", end: "10:20" },
    { id: "sch-agrokompleks", courseId: "course-agrokompleks", day: "Kamis", start: "", end: "" },
    { id: "sch-wawasan", courseId: "course-wawasan", day: "Kamis", start: "10:20", end: "12:00" },
    { id: "sch-sda", courseId: "course-sda", day: "Kamis", start: "13:00", end: "14:40" },
    { id: "sch-pip", courseId: "course-pip", day: "Jumat", start: "08:40", end: "10:20" },
  ],
  tasks: [],
  telegram: {
    chatId: "",
    dailyEnabled: true,
    dailyTime: "06:00",
    weeklyEnabled: true,
    weeklyDay: "Minggu",
    weeklyTime: "18:00",
  },
};

const NAV_ITEMS = [
  { id: "ringkasan", label: "Ringkasan", icon: House },
  { id: "jadwal", label: "Jadwal kuliah", icon: CalendarDots },
  { id: "mata-kuliah", label: "Mata kuliah", icon: GraduationCap },
  { id: "tugas", label: "Tugas", icon: ListChecks },
  { id: "pengingat", label: "Pengingat", icon: TelegramLogo },
];

const VIEW_META = {
  ringkasan: ["Ringkasan", "Pantau ritme kuliah dan tugas terdekat."],
  jadwal: ["Jadwal kuliah", "Susun waktu belajar tanpa bentrok ruang dan dosen."],
  "mata-kuliah": ["Mata kuliah", "Kelola dosen, ruang, dan beban studi semester ini."],
  tugas: ["Tugas", "Jaga semua tenggat tetap terlihat dan terkendali."],
  pengingat: ["Pengingat Telegram", "Kirim rangkuman tugas langsung ke akun Telegram Anda."],
};

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatDate(value, options = {}) {
  if (!value) return "Belum ditentukan";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: options.year ? "numeric" : undefined,
    hour: options.time ? "2-digit" : undefined,
    minute: options.time ? "2-digit" : undefined,
  }).format(new Date(value));
}

function formatScheduleTime(schedule) {
  return schedule.start && schedule.end
    ? `${schedule.start} - ${schedule.end}`
    : "Menyusul";
}

function getCourse(courses, courseId) {
  return courses.find((course) => course.id === courseId);
}

function escapeTelegramHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function getTodayName() {
  const day = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    timeZone: "Asia/Jakarta",
  }).format(new Date());
  return day.charAt(0).toUpperCase() + day.slice(1);
}

function getTodayLabel() {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date());
}

function normalizeData(value) {
  const stored = value && typeof value === "object" ? value : {};
  return {
    ...initialData,
    ...stored,
    courses: Array.isArray(stored.courses) ? stored.courses : initialData.courses,
    schedules: Array.isArray(stored.schedules) ? stored.schedules : initialData.schedules,
    tasks: Array.isArray(stored.tasks) ? stored.tasks : initialData.tasks,
    telegram: {
      ...initialData.telegram,
      ...(stored.telegram || {}),
    },
  };
}

function buildTelegramMessage(tasks, courses, schedules, mode = "weekly") {
  const openTasks = tasks
    .filter((task) => !task.done)
    .sort((a, b) => new Date(a.due) - new Date(b.due));

  const taskLines = openTasks.map((task, index) => {
    const course = getCourse(courses, task.courseId);
    return `${index + 1}. <b>${escapeTelegramHtml(task.title)}</b>\n${escapeTelegramHtml(course?.name || "Tanpa mata kuliah")} | ${formatDate(task.due, { time: true })}`;
  });

  const scheduleDays = mode === "daily" ? [getTodayName()] : DAY_ORDER;
  const scheduleLines = scheduleDays.map((day) => {
    const daySchedules = schedules
      .filter((schedule) => schedule.day === day)
      .sort((a, b) => (a.start || "99:99").localeCompare(b.start || "99:99"));
    if (!daySchedules.length) {
      return mode === "daily" ? `<b>${day}</b>\nTidak ada jadwal kuliah.` : "";
    }
    const classes = daySchedules.map((schedule) => {
      const course = getCourse(courses, schedule.courseId);
      return `<b>${formatScheduleTime(schedule)} | ${escapeTelegramHtml(course?.name || "Mata kuliah")}</b>\n${escapeTelegramHtml(course?.room || "Ruang menyusul")}\nPengajar: ${escapeTelegramHtml(course?.lecturer || "Menyusul")}`;
    });
    return `<b>${day}</b>\n${classes.join("\n\n")}`;
  }).filter(Boolean);

  const taskSection = taskLines.length
    ? `<b>Tugas aktif</b>\n${taskLines.join("\n\n")}`
    : "Tidak ada tugas aktif.";

  const heading = mode === "daily" ? "Jadwal Hari Ini" : "Jadwal Mingguan";
  const context = mode === "daily" ? getTodayLabel() : "Senin sampai Jumat";

  return `<b>Akuakalcer</b>\n<b>${heading}</b>\n${context}\n\n${scheduleLines.join("\n\n")}\n\n${taskSection}`;
}

export default function KuliahApp() {
  const [data, setData] = useState(initialData);
  const [view, setView] = useState("ringkasan");
  const [mobileNav, setMobileNav] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [query, setQuery] = useState("");
  const [taskFilter, setTaskFilter] = useState("Aktif");
  const [telegramStatus, setTelegramStatus] = useState("idle");
  const [telegramConfigured, setTelegramConfigured] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setData(normalizeData(JSON.parse(stored)));
    } catch {
      setToast({ kind: "error", message: "Data lokal tidak dapat dibaca. Data contoh digunakan." });
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const nextTheme = savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : preferredTheme;
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 3600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    let active = true;
    fetch("/api/kuliah/telegram")
      .then((response) => response.json())
      .then((result) => {
        if (active) setTelegramConfigured(Boolean(result.configured));
      })
      .catch(() => {
        if (active) setTelegramConfigured(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const openTasks = useMemo(
    () => data.tasks.filter((task) => !task.done).sort((a, b) => new Date(a.due) - new Date(b.due)),
    [data.tasks],
  );

  const nextSchedule = useMemo(() => {
    const todayIndex = (new Date().getDay() + 6) % 7;
    return data.schedules.filter((schedule) => schedule.start).sort((a, b) => {
      const aIndex = DAY_ORDER.indexOf(a.day);
      const bIndex = DAY_ORDER.indexOf(b.day);
      const aDistance = (aIndex - todayIndex + 7) % 7;
      const bDistance = (bIndex - todayIndex + 7) % 7;
      return aDistance - bDistance || a.start.localeCompare(b.start);
    })[0];
  }, [data.schedules]);

  const changeView = (nextView) => {
    setView(nextView);
    setMobileNav(false);
    setQuery("");
  };

  const updateData = (updater, message) => {
    setData((current) => updater(current));
    setModal(null);
    setToast({ kind: "success", message });
  };

  const toggleTask = (taskId) => {
    setData((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    }));
  };

  const deleteItem = (type, id) => {
    if (type === "course") {
      updateData(
        (current) => ({
          ...current,
          courses: current.courses.filter((item) => item.id !== id),
          schedules: current.schedules.filter((item) => item.courseId !== id),
          tasks: current.tasks.filter((item) => item.courseId !== id),
        }),
        "Mata kuliah dan data terkait dihapus.",
      );
      return;
    }

    const key = type === "schedule" ? "schedules" : "tasks";
    updateData(
      (current) => ({ ...current, [key]: current[key].filter((item) => item.id !== id) }),
      type === "schedule" ? "Jadwal dihapus." : "Tugas dihapus.",
    );
  };

  const sendTelegram = async (mode) => {
    if (!data.telegram.chatId.trim() && !telegramConfigured) {
      setToast({ kind: "error", message: "Isi Chat ID Telegram terlebih dahulu." });
      return;
    }

    setTelegramStatus(`sending-${mode}`);
    try {
      const response = await fetch("/api/kuliah/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: data.telegram.chatId,
          message: buildTelegramMessage(data.tasks, data.courses, data.schedules, mode),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setTelegramStatus(`sent-${mode}`);
      setToast({ kind: "success", message: result.message });
    } catch (error) {
      setTelegramStatus("error");
      setToast({ kind: "error", message: error.message || "Pengingat gagal dikirim." });
    }
  };

  const [title, subtitle] = VIEW_META[view];

  return (
    <div className={styles.appShell}>
      <aside className={`${styles.sidebar} ${mobileNav ? styles.sidebarOpen : ""}`}>
        <div className={styles.brand}>
          <span className={styles.brandMark} aria-label="Logo ikan Akuakalcer"><FishSimple size={27} weight="fill" /></span>
          <span><strong>Akuakalcer</strong><small>Ruang kuliahmu</small></span>
        </div>

        <nav className={styles.nav} aria-label="Navigasi utama">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                type="button"
                key={item.id}
                className={view === item.id ? styles.navActive : ""}
                onClick={() => changeView(item.id)}
                aria-current={view === item.id ? "page" : undefined}
              >
                <Icon size={20} weight={view === item.id ? "fill" : "regular"} />
                <span>{item.label}</span>
                {item.id === "tugas" && openTasks.length > 0 ? <b>{openTasks.length}</b> : null}
              </button>
            );
          })}
        </nav>

        <div className={styles.sidebarNote}>
          <CalendarBlank size={21} weight="duotone" />
          <div><strong>Semester ganjil</strong><span>{data.courses.length} mata kuliah aktif</span></div>
        </div>
      </aside>

      {mobileNav ? <button className={styles.scrim} aria-label="Tutup navigasi" onClick={() => setMobileNav(false)} /> : null}

      <main className={styles.main}>
        <header className={styles.topbar}>
          <button className={styles.iconButtonMobile} type="button" onClick={() => setMobileNav(true)} aria-label="Buka navigasi">
            <SidebarSimple size={22} />
          </button>
          <div className={styles.pageTitle}>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className={styles.topActions}>
            <button className={`${styles.iconButton} ${styles.themeToggle}`} type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Gunakan mode terang" : "Gunakan mode gelap"} aria-pressed={theme === "dark"}>
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={styles.iconButton} type="button" onClick={() => changeView("pengingat")} aria-label="Buka pengingat">
              <Bell size={20} />
              {openTasks.length ? <span className={styles.notificationCount}>{openTasks.length}</span> : null}
            </button>
            <div className={styles.profile}>
              <span>AP</span>
              <div><strong>Angga Pratama</strong><small>Mahasiswa akuakultur</small></div>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          {view === "ringkasan" ? (
            <Dashboard
              data={data}
              openTasks={openTasks}
              nextSchedule={nextSchedule}
              changeView={changeView}
              setModal={setModal}
              toggleTask={toggleTask}
            />
          ) : null}
          {view === "jadwal" ? <ScheduleView data={data} setModal={setModal} deleteItem={deleteItem} /> : null}
          {view === "mata-kuliah" ? (
            <CoursesView data={data} query={query} setQuery={setQuery} setModal={setModal} deleteItem={deleteItem} />
          ) : null}
          {view === "tugas" ? (
            <TasksView
              data={data}
              query={query}
              setQuery={setQuery}
              filter={taskFilter}
              setFilter={setTaskFilter}
              setModal={setModal}
              toggleTask={toggleTask}
              deleteItem={deleteItem}
            />
          ) : null}
          {view === "pengingat" ? (
            <TelegramView
              data={data}
              setData={setData}
              sendTelegram={sendTelegram}
              status={telegramStatus}
              configured={telegramConfigured}
            />
          ) : null}
        </div>
      </main>

      {modal ? (
        <ItemModal modal={modal} data={data} setModal={setModal} updateData={updateData} />
      ) : null}

      {toast ? (
        <div className={`${styles.toast} ${toast.kind === "error" ? styles.toastError : ""}`} role="status">
          {toast.kind === "error" ? <WarningCircle size={20} /> : <CheckCircle size={20} weight="fill" />}
          <span>{toast.message}</span>
          <button type="button" onClick={() => setToast(null)} aria-label="Tutup notifikasi"><X size={16} /></button>
        </div>
      ) : null}
    </div>
  );
}

function Dashboard({ data, openTasks, nextSchedule, changeView, setModal, toggleTask }) {
  const nextCourse = nextSchedule ? getCourse(data.courses, nextSchedule.courseId) : null;

  return (
    <div className={styles.dashboardGrid}>
      <section className={styles.seaPanel}>
        <div>
          <span className={styles.eyebrow}>Hari yang terarah</span>
          <h2>Selamat datang. Satu arus, semua agenda.</h2>
          <p>Lihat jadwal berikutnya, selesaikan tugas penting, lalu biarkan pengingat menjaga sisanya.</p>
          <button className={styles.lightButton} type="button" onClick={() => setModal({ type: "task" })}>
            <Plus size={18} weight="bold" /> Tambah tugas
          </button>
        </div>
        <div className={styles.tideVisual} aria-hidden="true">
          <FishSimple size={76} weight="duotone" />
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className={styles.metrics} aria-label="Ringkasan semester">
        <div><BookOpenText size={22} weight="duotone" /><strong>{data.courses.length}</strong><span>Mata kuliah</span></div>
        <div><CalendarDots size={22} weight="duotone" /><strong>{data.schedules.length}</strong><span>Sesi per minggu</span></div>
        <div className={openTasks.length ? styles.metricAccent : ""}><ListChecks size={22} weight="duotone" /><strong>{openTasks.length}</strong><span>Tugas aktif</span></div>
      </section>

      <section className={styles.panelLarge}>
        <div className={styles.sectionHead}>
          <div><h2>Agenda terdekat</h2><p>Tiga hal yang perlu perhatian Anda.</p></div>
          <button className={styles.textButton} type="button" onClick={() => changeView("tugas")}>Lihat semua <CaretRight size={16} /></button>
        </div>
        <div className={styles.taskPreview}>
          {openTasks.slice(0, 3).map((task) => {
            const course = getCourse(data.courses, task.courseId);
            return (
              <article key={task.id}>
                <button type="button" className={styles.checkButton} onClick={() => toggleTask(task.id)} aria-label={`Tandai ${task.title} selesai`}>
                  <Circle size={22} />
                </button>
                <div><strong>{task.title}</strong><span>{course?.name || "Tanpa mata kuliah"}</span></div>
                <time dateTime={task.due}>{formatDate(task.due, { time: true })}</time>
                <span className={task.priority === "Tinggi" ? styles.priorityHigh : styles.priority}>{task.priority}</span>
              </article>
            );
          })}
          {!openTasks.length ? <EmptyState type="tasks" onAction={() => setModal({ type: "task" })} /> : null}
        </div>
      </section>

      <section className={styles.nextClassPanel}>
        <div className={styles.sectionHead}><div><h2>Kelas berikutnya</h2><p>Siapkan materi sebelum berangkat.</p></div></div>
        {nextSchedule && nextCourse ? (
          <div className={styles.nextClass}>
            <span className={styles.dateBlock}><b>{nextSchedule.day.slice(0, 3)}</b><small>{nextSchedule.start}</small></span>
            <div>
              <strong>{nextCourse.name}</strong>
              <span><MapPin size={16} /> {nextCourse.room}</span>
              <span><ChalkboardTeacher size={16} /> {nextCourse.lecturer}</span>
            </div>
          </div>
        ) : <EmptyState type="schedule" onAction={() => setModal({ type: "schedule" })} />}
        <button className={styles.secondaryButton} type="button" onClick={() => changeView("jadwal")}>Lihat jadwal lengkap</button>
      </section>
    </div>
  );
}

function ScheduleView({ data, setModal, deleteItem }) {
  return (
    <div className={styles.viewStack}>
      <div className={styles.toolbar}>
        <div className={styles.weekSwitch}><button type="button" aria-label="Minggu sebelumnya"><CaretLeft size={18} /></button><strong>Jadwal rutin mingguan</strong><button type="button" aria-label="Minggu berikutnya"><CaretRight size={18} /></button></div>
        <button className={styles.primaryButton} type="button" onClick={() => setModal({ type: "schedule" })}><Plus size={18} weight="bold" /> Tambah jadwal</button>
      </div>
      <section className={styles.scheduleBoard}>
        {DAY_ORDER.map((day) => {
          const items = data.schedules.filter((schedule) => schedule.day === day).sort((a, b) => {
            if (!a.start) return 1;
            if (!b.start) return -1;
            return a.start.localeCompare(b.start);
          });
          return (
            <div className={styles.dayColumn} key={day}>
              <header><strong>{day}</strong><span>{items.length} kelas</span></header>
              <div className={styles.dayItems}>
                {items.map((item) => {
                  const course = getCourse(data.courses, item.courseId);
                  return (
                    <article key={item.id}>
                      <time>{formatScheduleTime(item)}</time>
                      <strong>{course?.name || "Mata kuliah dihapus"}</strong>
                      <span><MapPin size={15} /> {course?.room || "Ruang belum ada"}</span>
                      <div className={styles.rowActions}>
                        <button type="button" onClick={() => setModal({ type: "schedule", item })} aria-label="Edit jadwal"><PencilSimple size={16} /></button>
                        <button type="button" onClick={() => deleteItem("schedule", item.id)} aria-label="Hapus jadwal"><Trash size={16} /></button>
                      </div>
                    </article>
                  );
                })}
                {!items.length ? <div className={styles.emptyDay}>Tidak ada kelas</div> : null}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

function CoursesView({ data, query, setQuery, setModal, deleteItem }) {
  const normalized = query.toLowerCase();
  const courses = data.courses.filter((course) =>
    [course.name, course.code, course.lecturer, course.room].some((value) => value.toLowerCase().includes(normalized)),
  );

  return (
    <div className={styles.viewStack}>
      <div className={styles.toolbar}>
        <SearchInput value={query} setValue={setQuery} placeholder="Cari mata kuliah, dosen, atau ruang" />
        <button className={styles.primaryButton} type="button" onClick={() => setModal({ type: "course" })}><Plus size={18} weight="bold" /> Tambah mata kuliah</button>
      </div>
      <section className={styles.courseLayout}>
        <div className={styles.courseList}>
          {courses.map((course) => {
            const sessions = data.schedules.filter((item) => item.courseId === course.id);
            const tasks = data.tasks.filter((item) => item.courseId === course.id && !item.done);
            return (
              <article key={course.id}>
                <div className={styles.courseCode}>{course.code.slice(0, 3)}</div>
                <div className={styles.courseBody}>
                  <span>{course.code}</span>
                  <h2>{course.name}</h2>
                  <div className={styles.courseMeta}>
                    <span><ChalkboardTeacher size={16} /> {course.lecturer}</span>
                    <span><MapPin size={16} /> {course.room}</span>
                  </div>
                </div>
                <div className={styles.courseStats}><strong>{sessions.length}</strong><span>Sesi/minggu</span><strong>{tasks.length}</strong><span>Tugas aktif</span></div>
                <div className={styles.rowActions}>
                  <button type="button" onClick={() => setModal({ type: "course", item: course })} aria-label={`Edit ${course.name}`}><PencilSimple size={17} /></button>
                  <button type="button" onClick={() => deleteItem("course", course.id)} aria-label={`Hapus ${course.name}`}><Trash size={17} /></button>
                </div>
              </article>
            );
          })}
          {!courses.length ? <EmptyState type="search" onAction={() => setQuery("")} /> : null}
        </div>
        <aside className={styles.directoryPanel}>
          <h2>Direktori semester</h2>
          <div className={styles.directoryGroup}>
            <h3><ChalkboardTeacher size={18} /> Dosen</h3>
            {[...new Set(data.courses.map((course) => course.lecturer))].map((lecturer) => <span key={lecturer}>{lecturer}</span>)}
          </div>
          <div className={styles.directoryGroup}>
            <h3><MapPin size={18} /> Ruang kelas</h3>
            {[...new Set(data.courses.map((course) => course.room))].map((room) => <span key={room}>{room}</span>)}
          </div>
        </aside>
      </section>
    </div>
  );
}

function TasksView({ data, query, setQuery, filter, setFilter, setModal, toggleTask, deleteItem }) {
  const tasks = data.tasks
    .filter((task) => filter === "Semua" || (filter === "Selesai" ? task.done : !task.done))
    .filter((task) => {
      const course = getCourse(data.courses, task.courseId);
      return `${task.title} ${course?.name}`.toLowerCase().includes(query.toLowerCase());
    })
    .sort((a, b) => Number(a.done) - Number(b.done) || new Date(a.due) - new Date(b.due));

  return (
    <div className={styles.viewStack}>
      <div className={styles.toolbar}>
        <SearchInput value={query} setValue={setQuery} placeholder="Cari tugas" />
        <div className={styles.filterGroup}>
          {["Aktif", "Selesai", "Semua"].map((item) => <button type="button" key={item} className={filter === item ? styles.filterActive : ""} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <button className={styles.primaryButton} type="button" onClick={() => setModal({ type: "task" })}><Plus size={18} weight="bold" /> Tambah tugas</button>
      </div>
      <section className={styles.taskList}>
        <header><span>Status</span><span>Tugas</span><span>Mata kuliah</span><span>Tenggat</span><span>Prioritas</span><span>Aksi</span></header>
        {tasks.map((task) => {
          const course = getCourse(data.courses, task.courseId);
          return (
            <article key={task.id} className={task.done ? styles.taskDone : ""}>
              <button type="button" className={styles.checkButton} onClick={() => toggleTask(task.id)} aria-label={task.done ? `Aktifkan kembali ${task.title}` : `Tandai ${task.title} selesai`}>
                {task.done ? <CheckCircle size={23} weight="fill" /> : <Circle size={23} />}
              </button>
              <strong>{task.title}</strong>
              <span>{course?.name || "Tanpa mata kuliah"}</span>
              <time dateTime={task.due}>{formatDate(task.due, { time: true })}</time>
              <span className={task.priority === "Tinggi" ? styles.priorityHigh : styles.priority}>{task.priority}</span>
              <div className={styles.rowActions}>
                <button type="button" onClick={() => setModal({ type: "task", item: task })} aria-label="Edit tugas"><PencilSimple size={17} /></button>
                <button type="button" onClick={() => deleteItem("task", task.id)} aria-label="Hapus tugas"><Trash size={17} /></button>
              </div>
            </article>
          );
        })}
        {!tasks.length ? <EmptyState type="tasks" onAction={() => setModal({ type: "task" })} /> : null}
      </section>
    </div>
  );
}

function TelegramView({ data, setData, sendTelegram, status, configured }) {
  const [previewMode, setPreviewMode] = useState("daily");
  const message = buildTelegramMessage(data.tasks, data.courses, data.schedules, previewMode).replaceAll("<b>", "").replaceAll("</b>", "");

  return (
    <div className={styles.telegramGrid}>
      <section className={styles.telegramSetup}>
        <div className={styles.telegramIcon}><TelegramLogo size={34} weight="fill" /></div>
        <h2>Hubungkan bot Telegram</h2>
        <p>{configured ? "Bot dan Chat ID server sudah terhubung. Pengingat siap dikirim." : "Bot mengirim rangkuman tugas dari server. Token bot disimpan aman di environment project."}</p>
        <label className={styles.field}>
          <span>Chat ID Telegram {configured ? "(opsional)" : ""}</span>
          <input value={data.telegram.chatId || ""} onChange={(event) => setData((current) => ({ ...current, telegram: { ...current.telegram, chatId: event.target.value } }))} placeholder="Contoh: 123456789" />
          <small>{configured ? "Kosongkan untuk memakai Chat ID yang tersimpan aman di server." : "Dapatkan Chat ID dari bot @userinfobot, lalu mulai percakapan dengan bot Anda."}</small>
        </label>
        <div className={styles.reminderPlans}>
          <div className={styles.reminderPlan}>
            <label className={styles.switchRow}>
              <input type="checkbox" checked={Boolean(data.telegram.dailyEnabled)} onChange={(event) => setData((current) => ({ ...current, telegram: { ...current.telegram, dailyEnabled: event.target.checked } }))} />
              <span aria-hidden="true"><i /></span>
              <div><strong>Pengingat harian</strong><small>Jadwal hari ini dan tugas aktif.</small></div>
            </label>
            <label className={styles.field}>
              <span>Waktu setiap hari</span>
              <input type="time" value={data.telegram.dailyTime || "06:00"} onChange={(event) => setData((current) => ({ ...current, telegram: { ...current.telegram, dailyTime: event.target.value } }))} />
            </label>
            <button className={styles.secondaryButton} type="button" onClick={() => sendTelegram("daily")} disabled={status === "sending-daily" || !data.telegram.dailyEnabled}>
              <TelegramLogo size={18} weight="fill" /> {status === "sending-daily" ? "Mengirim..." : "Kirim versi harian"}
            </button>
          </div>
          <div className={styles.reminderPlan}>
            <label className={styles.switchRow}>
              <input type="checkbox" checked={Boolean(data.telegram.weeklyEnabled)} onChange={(event) => setData((current) => ({ ...current, telegram: { ...current.telegram, weeklyEnabled: event.target.checked } }))} />
              <span aria-hidden="true"><i /></span>
              <div><strong>Pengingat mingguan</strong><small>Seluruh jadwal Senin-Jumat.</small></div>
            </label>
            <div className={styles.formGrid}>
              <label className={styles.field}>
                <span>Hari pengiriman</span>
                <select value={data.telegram.weeklyDay || "Minggu"} onChange={(event) => setData((current) => ({ ...current, telegram: { ...current.telegram, weeklyDay: event.target.value } }))}>
                  {["Sabtu", "Minggu", "Senin"].map((day) => <option key={day}>{day}</option>)}
                </select>
              </label>
              <label className={styles.field}>
                <span>Waktu</span>
                <input type="time" value={data.telegram.weeklyTime || "18:00"} onChange={(event) => setData((current) => ({ ...current, telegram: { ...current.telegram, weeklyTime: event.target.value } }))} />
              </label>
            </div>
            <button className={styles.secondaryButton} type="button" onClick={() => sendTelegram("weekly")} disabled={status === "sending-weekly" || !data.telegram.weeklyEnabled}>
              <TelegramLogo size={18} weight="fill" /> {status === "sending-weekly" ? "Mengirim..." : "Kirim versi mingguan"}
            </button>
          </div>
        </div>
        <a className={styles.setupLink} href="https://core.telegram.org/bots/tutorial" target="_blank" rel="noreferrer">Panduan membuat bot <ArrowSquareOut size={16} /></a>
      </section>
      <section className={styles.messagePreview}>
        <div className={styles.previewHead}>
          <div><TelegramLogo size={18} weight="fill" /><strong>Pratinjau pesan</strong></div>
          <div className={styles.previewTabs}>
            <button type="button" className={previewMode === "daily" ? styles.previewTabActive : ""} onClick={() => setPreviewMode("daily")}>Harian</button>
            <button type="button" className={previewMode === "weekly" ? styles.previewTabActive : ""} onClick={() => setPreviewMode("weekly")}>Mingguan</button>
          </div>
        </div>
        <div className={styles.chatWindow}>
          <div className={styles.chatDate}>{previewMode === "daily" ? "Hari ini" : "Minggu ini"}</div>
          <div className={styles.chatBubble}>
            <pre>{message}</pre>
            <time>{previewMode === "daily" ? (data.telegram.dailyTime || "06:00") : `${data.telegram.weeklyDay || "Minggu"}, ${data.telegram.weeklyTime || "18:00"}`}</time>
          </div>
        </div>
        <div className={styles.integrationNote}>
          <WarningCircle size={20} />
          <p>Untuk pengiriman otomatis saat aplikasi tertutup, hubungkan endpoint ini ke cron pada platform deployment Anda.</p>
        </div>
      </section>
    </div>
  );
}

function SearchInput({ value, setValue, placeholder }) {
  return <label className={styles.search}><MagnifyingGlass size={18} /><span className={styles.srOnly}>Pencarian</span><input value={value} onChange={(event) => setValue(event.target.value)} placeholder={placeholder} /></label>;
}

function EmptyState({ type, onAction }) {
  const isSearch = type === "search";
  const isSchedule = type === "schedule";
  return (
    <div className={styles.emptyState}>
      {isSchedule ? <CalendarDots size={30} weight="duotone" /> : isSearch ? <MagnifyingGlass size={30} /> : <ListChecks size={30} weight="duotone" />}
      <strong>{isSearch ? "Tidak ada hasil" : isSchedule ? "Belum ada jadwal" : "Tidak ada tugas aktif"}</strong>
      <span>{isSearch ? "Coba kata kunci lain." : "Tambahkan data untuk memulai."}</span>
      <button type="button" onClick={onAction}>{isSearch ? "Bersihkan pencarian" : "Tambah sekarang"}</button>
    </div>
  );
}

function ItemModal({ modal, data, setModal, updateData }) {
  const item = modal.item || {};
  const type = modal.type;
  const labels = { course: "mata kuliah", schedule: "jadwal", task: "tugas" };

  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (type === "course") {
      const course = {
        id: item.id || uid("course"),
        code: form.get("code").trim().toUpperCase(),
        name: form.get("name").trim(),
        lecturer: form.get("lecturer").trim(),
        room: form.get("room").trim(),
      };
      updateData((current) => ({ ...current, courses: item.id ? current.courses.map((value) => value.id === item.id ? course : value) : [...current.courses, course] }), item.id ? "Mata kuliah diperbarui." : "Mata kuliah ditambahkan.");
    }
    if (type === "schedule") {
      const schedule = { id: item.id || uid("schedule"), courseId: form.get("courseId"), day: form.get("day"), start: form.get("start"), end: form.get("end") };
      updateData((current) => ({ ...current, schedules: item.id ? current.schedules.map((value) => value.id === item.id ? schedule : value) : [...current.schedules, schedule] }), item.id ? "Jadwal diperbarui." : "Jadwal ditambahkan.");
    }
    if (type === "task") {
      const task = { id: item.id || uid("task"), title: form.get("title").trim(), courseId: form.get("courseId"), due: form.get("due"), priority: form.get("priority"), done: item.done || false };
      updateData((current) => ({ ...current, tasks: item.id ? current.tasks.map((value) => value.id === item.id ? task : value) : [...current.tasks, task] }), item.id ? "Tugas diperbarui." : "Tugas ditambahkan.");
    }
  };

  return (
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setModal(null)}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header><div><span>{item.id ? "Perbarui data" : "Data baru"}</span><h2 id="modal-title">{item.id ? "Edit" : "Tambah"} {labels[type]}</h2></div><button type="button" onClick={() => setModal(null)} aria-label="Tutup"><X size={20} /></button></header>
        <form onSubmit={submit}>
          {type === "course" ? (
            <>
              <FormField label="Kode mata kuliah"><input name="code" defaultValue={item.code} placeholder="Contoh: SFI" required /></FormField>
              <FormField label="Nama mata kuliah"><input name="name" defaultValue={item.name} placeholder="Manajemen Kualitas Air" required /></FormField>
              <FormField label="Dosen pengampu"><input name="lecturer" defaultValue={item.lecturer} placeholder="Nama lengkap dan gelar" required /></FormField>
              <FormField label="Ruang kelas"><input name="room" defaultValue={item.room} placeholder="Gedung dan nomor ruang" required /></FormField>
            </>
          ) : null}
          {type === "schedule" ? (
            <>
              <FormField label="Mata kuliah"><select name="courseId" defaultValue={item.courseId} required><option value="" disabled>Pilih mata kuliah</option>{data.courses.map((course) => <option value={course.id} key={course.id}>{course.name}</option>)}</select></FormField>
              <FormField label="Hari"><select name="day" defaultValue={item.day || "Senin"}>{DAY_ORDER.map((day) => <option key={day}>{day}</option>)}</select></FormField>
              <div className={styles.formGrid}>
                <FormField label="Waktu mulai"><input name="start" type="time" defaultValue={item.id ? item.start : "08:00"} /></FormField>
                <FormField label="Waktu selesai"><input name="end" type="time" defaultValue={item.id ? item.end : "09:40"} /></FormField>
              </div>
            </>
          ) : null}
          {type === "task" ? (
            <>
              <FormField label="Judul tugas"><input name="title" defaultValue={item.title} placeholder="Apa yang perlu diselesaikan?" required /></FormField>
              <FormField label="Mata kuliah"><select name="courseId" defaultValue={item.courseId} required><option value="" disabled>Pilih mata kuliah</option>{data.courses.map((course) => <option value={course.id} key={course.id}>{course.name}</option>)}</select></FormField>
              <div className={styles.formGrid}>
                <FormField label="Tenggat"><input name="due" type="datetime-local" defaultValue={item.due} required /></FormField>
                <FormField label="Prioritas"><select name="priority" defaultValue={item.priority || "Sedang"}><option>Rendah</option><option>Sedang</option><option>Tinggi</option></select></FormField>
              </div>
            </>
          ) : null}
          <footer><button className={styles.secondaryButton} type="button" onClick={() => setModal(null)}>Batal</button><button className={styles.primaryButton} type="submit"><Check size={18} weight="bold" /> Simpan</button></footer>
        </form>
      </section>
    </div>
  );
}

function FormField({ label, children }) {
  return <label className={styles.field}><span>{label}</span>{children}</label>;
}
