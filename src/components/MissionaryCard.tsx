import { memo, useMemo } from 'react';
import styles from './MissionaryCard.module.css';
import { getCountryFlag } from '../utils/getCountryFlag';
import type { Missionary } from '../types';

interface MissionaryCardProps {
  missionary: Missionary;
}

function MissionaryCard({ missionary }: MissionaryCardProps) {
  // useMemo: a bandeira só é recalculada quando o país muda.
  // Em renderizações em que o país é o mesmo, o valor anterior é reaproveitado.
  const flag = useMemo(
    () => getCountryFlag(missionary.country),
    [missionary.country],
  );

  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={missionary.imageUrl}
        alt={missionary.name}
      />
      <div className={styles.content}>
        <h3 className={styles.name}>{missionary.name}</h3>
        <p className={styles.field}>{missionary.field}</p>
        <p className={styles.country}>
          <span className={styles.flag}>{flag}</span>
          {missionary.country}
        </p>
        <p className={styles.bio}>{missionary.bio}</p>
      </div>
    </article>
  );
}

// React.memo: o card só renderiza de novo se a prop "missionary" mudar.
// Evita renderizações desnecessárias quando a lista renderiza mas os dados são os mesmos.
export default memo(MissionaryCard);