import styles from "./kuliah.module.css";

export default function Loading() {
  return (
    <main className={styles.loadingShell} aria-label="Memuat aplikasi">
      <div className={styles.loadingSidebar} />
      <div className={styles.loadingMain}>
        <div className={styles.loadingHeader} />
        <div className={styles.loadingGrid}>
          <div />
          <div />
          <div />
        </div>
        <div className={styles.loadingPanel} />
      </div>
    </main>
  );
}
