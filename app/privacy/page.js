export const metadata = {
  title: 'Kebijakan Privasi | Angga',
  description: 'Kebijakan privasi situs portofolio Angga.',
}

export default function PrivacyPage() {
  return (
    <main className="privacy">
      <article className="container privacy__content">
        <a className="privacy__back" href="/">← Kembali ke beranda</a>
        <h1>Kebijakan Privasi</h1>
        <p>Terakhir diperbarui: 9 Oktober 2026.</p>

        <h2>Informasi yang dikumpulkan</h2>
        <p>
          Situs ini tidak meminta pembuatan akun. Jika Anda menggunakan formulir kontak,
          nama, alamat email, dan isi pesan yang Anda kirim akan diproses untuk menjawab
          pertanyaan atau permintaan Anda.
        </p>

        <h2>Analitik</h2>
        <p>
          Situs ini menggunakan sistem analitik internal mandiri (self-hosted) untuk memahami penggunaan
          situs secara agregat, seperti jumlah kunjungan dan halaman yang dibuka. Data tersebut disimpan
          secara privat dan tidak dibagikan kepada pihak ketiga maupun digunakan untuk profil iklan.
        </p>

        <h2>Cookie dan penyimpanan lokal</h2>
        <p>
          Situs dapat menggunakan penyimpanan lokal browser untuk mengingat preferensi
          tampilan, seperti tema. Cookie yang diperlukan dapat digunakan pada area
          administrasi untuk menjaga sesi login.
        </p>

        <h2>Pihak ketiga</h2>
        <p>
          Pesan dari formulir kontak diproses secara aman oleh penyedia layanan pengiriman email.
          Seluruh infrastruktur situs dioperasikan secara mandiri pada private Linux VPS. Informasi
          tidak pernah dijual kepada pihak ketiga.
        </p>

        <h2>Hak Anda</h2>
        <p>
          Anda dapat meminta akses, koreksi, atau penghapusan data yang pernah Anda kirim
          melalui formulir kontak. Permintaan dapat dikirim ke{' '}
          <a href="mailto:contact@anggot.my.id">contact@anggot.my.id</a>.
        </p>

        <h2>Perubahan kebijakan</h2>
        <p>
          Kebijakan ini dapat diperbarui apabila layanan atau cara pemrosesan data berubah.
          Tanggal pembaruan terbaru akan selalu dicantumkan di halaman ini.
        </p>
      </article>
    </main>
  )
}
