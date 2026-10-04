import styles from './LetterList.module.css';
import LetterCard from './LetterCard';
import { useAppContext } from '../contexts/AppContext';

function LetterList() {
  const { letters, loading } = useAppContext();

  if (loading) {
    return <p className={styles.empty}>Carregando cartas...</p>;
  }

  // Estado vazio amigável: orienta o usuário em vez de mostrar uma área em branco
  if (letters.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>Nenhuma carta enviada ainda</p>
        <p className={styles.emptyText}>
          Que tal escrever a primeira palavra de encorajamento?
        </p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {letters.map((letter) => (
        // O id é opcional no tipo Letter, então há uma chave alternativa
        <LetterCard
          key={letter.id ?? `${letter.missionaryId}-${letter.date}`}
          letter={letter}
        />
      ))}
    </div>
  );
}

export default LetterList;