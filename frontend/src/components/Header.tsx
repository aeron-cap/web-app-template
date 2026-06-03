import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {onMenuClick && (
          <button className={styles.menuButton} onClick={onMenuClick} aria-label="Toggle menu">
            <Menu size={24} />
          </button>
        )}
        <Link to="/" className={styles.logoMobile}>.</Link>
      </div>

      <div className={styles.rightSection}>
        {user ? (
          <span className={styles.userName}>{user.name}</span>
        ) : (
          <Link to="/login" className={styles.loginLink}>Login</Link>
        )}
      </div>
    </header>
  );
}
