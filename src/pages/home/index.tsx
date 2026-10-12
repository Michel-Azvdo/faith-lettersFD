import { UserButton } from '@clerk/clerk-react';
import { lazy, Suspense, useState } from 'react';
import styles from '../../App.module.css';
import { Heart, Send } from 'lucide-react';
import { CreateLetterModal } from '../../components/CreateLetterModal/CreateLetterModal';
// Os skeletons NÃO usam lazy: são o fallback, então precisam estar disponíveis
// imediatamente, antes de qualquer pedaço assíncrono terminar de baixar.
import MissionaryListSkeleton from '../../components/MissionaryListSkeleton';
import LetterListSkeleton from '../../components/LetterListSkeleton';

// Lazy Loading: as listas viram "pedaços" separados do bundle e só são
// baixadas quando renderizadas.
const MissionaryList = lazy(() => import('../../components/MissionaryList'));
const LetterList = lazy(() => import('../../components/LetterList'));

export default function HomePage() {
  // Estado que controla se o modal está aberto
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Heart className={styles.logoIcon} />
          <span>Faith Letters</span>
        </div>
        <button
          className={styles.sendButton}
          onClick={() => setIsModalOpen(true)}
        >
          <Send size={16} />
          Enviar carta
          <UserButton />
            
        </button>
                <button
          className={styles.sendButton}
          onClick={() => setIsModalOpen(true)}
        >
          <Send size={16} />
          Enviar carta
        </button>
        <UserButton />
      
      </header>

      <main className={styles.main}>
        <section className={styles.missionariesSection}>
          <h2 className={styles.sectionTitle}>Missionários</h2>
          <Suspense fallback={<MissionaryListSkeleton />}>
            <MissionaryList />
          </Suspense>
        </section>

        <section className={styles.missionariesSection}>
          <h2 className={styles.sectionTitle}>Cartas</h2>
          <Suspense fallback={<LetterListSkeleton />}>
            <LetterList />
          </Suspense>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h3 className={styles.footerTitle}>
            Envie uma palavra de encorajamento
          </h3>
          <p className={styles.footerDescription}>
            Feito com <Heart className={styles.heartIcon} /> para quem serve
          </p>
        </div>
      </footer>

      <CreateLetterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}