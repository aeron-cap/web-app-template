import { NavLink } from 'react-router-dom';
import { Home, Settings, Users, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { clsx } from 'clsx';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      
      <aside className={clsx(styles.sidebar, isOpen ? styles.open : styles.closed)}>
        <div className={styles.header}>
          <span className={styles.logo}>.</span>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
              onClick={onClose}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.footer}>
          <button className={styles.logoutButton} onClick={logout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
