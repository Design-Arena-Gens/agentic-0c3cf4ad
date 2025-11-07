import React from 'react';
import styles from './BottomNav.module.css';

const BottomNav = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: 'feed', icon: 'ri-store-2-line', label: 'Marketplace' },
    { id: 'wishlist', icon: 'ri-heart-3-line', label: 'Wishlist' },
    { id: 'alerts', icon: 'ri-notification-3-line', label: 'Alerts' },
    { id: 'profile', icon: 'ri-user-3-line', label: 'Profile' }
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.safeBottom} />
      <div className={styles.bar}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => onChangeTab(tab.id)}
          >
            <i className={tab.icon} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
