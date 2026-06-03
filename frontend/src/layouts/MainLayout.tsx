import type { ReactNode } from 'react';
import styles from './MainLayout.module.css';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
