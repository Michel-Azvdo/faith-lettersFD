import { memo } from 'react';
import styles from './LetterCard.module.css';
import type { Letter } from '../types';

// Recebe uma carta por prop e exibe em formato de card.
interface LetterCardProps {
  letter: Letter;
}

function LetterCard({ letter }: LetterCardProps) {
  // Formata a data para o padrão brasileiro.
  // Se a data vier inválida, mostra o texto original.
  const parsed = new Date(letter.date);
  const formattedDate = isNaN(parsed.getTime())
    ? letter.date
    : parsed.toLocaleDateString('pt-BR');

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.sender}>{letter.senderName}</span>
        <span className={styles.date}>{formattedDate}</span>
      </div>

      <p className={styles.content}>{letter.content}</p>

      {/* O verso é opcional (verse?: Verse), então só renderiza se existir */}
      {letter.verse && (
        <blockquote className={styles.verse}>
          “{letter.verse.text}”
          <span className={styles.verseReference}>
            {letter.verse.reference}
          </span>
        </blockquote>
      )}
    </article>
  );
}

// React.memo: a carta só renderiza de novo se a prop "letter" mudar.
export default memo(LetterCard);