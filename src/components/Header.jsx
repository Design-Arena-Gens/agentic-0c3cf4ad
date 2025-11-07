import React from 'react';
import styles from './Header.module.css';
import { useAuth } from '../context/AuthContext';

const Header = ({ onOpenComposer, onOpenFilters, searchTerm, onSearchChange }) => {
  const { user, loading, signInWithGoogle, signOutUser } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.safeTop} />
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Mobile Bazaar</h1>
          <p className={styles.subtitle}>Find, sell, and swap the latest smartphones.</p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.iconButton} onClick={onOpenFilters}>
            <i className="ri-equalizer-line" />
          </button>
          <button type="button" className={styles.primaryButton} onClick={onOpenComposer}>
            <i className="ri-add-line" />
            <span>List Device</span>
          </button>
          <button
            type="button"
            className={styles.avatarButton}
            onClick={user ? signOutUser : signInWithGoogle}
            disabled={loading}
          >
            {user ? (
              <img src={user.photoURL ?? `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName}`} alt={user.displayName ?? 'Profile'} />
            ) : (
              <i className="ri-user-add-line" />
            )}
          </button>
        </div>
        <div className={styles.searchRow}>
          <i className="ri-search-line" />
          <input
            type="search"
            placeholder="Search devices, carriers, or storage options"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
