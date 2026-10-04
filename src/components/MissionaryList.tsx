import styles from './MissionaryList.module.css';
import MissionaryCard from './MissionaryCard';
import { useAppContext } from '../contexts/AppContext';

// A lista lê os dados do contexto e delega a exibição de cada item ao MissionaryCard.
function MissionaryList() {
  const { missionaries, loading } = useAppContext();

  // Feedback ao usuário enquanto os dados ainda estão sendo buscados
  if (loading) {
    return <p className={styles.loading}>Carregando missionários...</p>;
  }

  return (
    <div className={styles.grid}>
      {missionaries.map((missionary) => (
        <MissionaryCard key={missionary.id} missionary={missionary} />
      ))}
    </div>
  );
}

export default MissionaryList;