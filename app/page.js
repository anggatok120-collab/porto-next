import '@designcodeio/threeui/style.css'
import SketchbookScene from './SketchbookScene'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.page}>
      <SketchbookScene />
    </main>
  )
}
