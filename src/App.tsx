import { lazy, Suspense } from 'react';
import styles from './App.module.css';
import { Heart, Send } from 'lucide-react';
// Os skeletons NÃO usam lazy: são o fallback, então precisam estar disponíveis
// imediatamente, antes de qualquer pedaço assíncrono terminar de baixar.
import MissionaryListSkeleton from './components/MissionaryListSkeleton';
import LetterListSkeleton from './components/LetterListSkeleton';

// Lazy Loading: em vez de importar as listas no início, elas viram "pedaços"
// separados do bundle. O navegador só baixa o código de cada lista quando
// ela é renderizada. Isso reduz o bundle inicial e acelera a primeira tela.
// Requisito: o componente precisa ter "export default" (as listas têm).
const MissionaryList = lazy(() => import('./components/MissionaryList'));
const LetterList = lazy(() => import('./components/LetterList'));

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Heart className={styles.logoIcon} />
          <span>Faith Letters</span>
        </div>
        <button className={styles.sendButton}>
          <Send size={16} />
          Enviar carta
        </button>
      </header>

      <main className={styles.main}>
        <section className={styles.missionariesSection}>
          <h2 className={styles.sectionTitle}>Missionários</h2>
          {/* Suspense exibe o Skeleton enquanto o código da lista é baixado,
              evitando a "tela branca" e melhorando a percepção de velocidade. */}
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
    </div>
  );
}

export default App;