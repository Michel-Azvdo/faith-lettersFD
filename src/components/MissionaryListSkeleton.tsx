import styles from './MissionaryListSkeleton.module.css';

// Esqueleto da lista de missionários: 3 cards cinza com o mesmo formato dos reais.
// aria-hidden esconde o esqueleto de leitores de tela, que não precisam dele.
function MissionaryListSkeleton() {
  return (
    <div className={styles.grid} aria-hidden="true">
      {[1, 2, 3].map((item) => (
        <div key={item} className={styles.card}>
          <div className={`${styles.image} ${styles.shimmer}`} />
          <div className={styles.content}>
            <div className={`${styles.line} ${styles.title} ${styles.shimmer}`} />
            <div className={`${styles.line} ${styles.short} ${styles.shimmer}`} />
            <div className={`${styles.line} ${styles.shimmer}`} />
            <div className={`${styles.line} ${styles.shimmer}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MissionaryListSkeleton;