import styles from './LetterListSkeleton.module.css';

// Esqueleto da lista de cartas: 2 cartas cinza com o mesmo formato do LetterCard.
function LetterListSkeleton() {
  return (
    <div className={styles.list} aria-hidden="true">
      {[1, 2].map((item) => (
        <div key={item} className={styles.card}>
          <div className={styles.header}>
            <div className={`${styles.line} ${styles.name} ${styles.shimmer}`} />
            <div className={`${styles.line} ${styles.date} ${styles.shimmer}`} />
          </div>
          <div className={`${styles.line} ${styles.shimmer}`} />
          <div className={`${styles.line} ${styles.shimmer}`} />
        </div>
      ))}
    </div>
  );
}

export default LetterListSkeleton;