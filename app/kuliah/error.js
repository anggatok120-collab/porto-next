"use client";

import { WarningCircle } from "@phosphor-icons/react";
import styles from "./kuliah.module.css";

export default function ErrorPage({ reset }) {
  return (
    <main className={styles.errorPage}>
      <WarningCircle size={40} weight="duotone" aria-hidden="true" />
      <h1>Aplikasi tidak dapat dimuat</h1>
      <p>Data lokal Anda tetap aman. Coba muat ulang bagian ini.</p>
      <button type="button" className={styles.primaryButton} onClick={reset}>
        Coba lagi
      </button>
    </main>
  );
}
