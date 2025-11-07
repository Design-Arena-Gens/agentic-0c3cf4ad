import React from 'react';
import styles from './EmptyState.module.css';

const EmptyState = ({ icon, title, description, action }) => (
  <div className={styles.empty}>
    <div className={styles.icon}>
      <i className={icon} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    {action}
  </div>
);

export default EmptyState;
