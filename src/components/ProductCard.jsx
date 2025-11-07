import React from 'react';
import styles from './ProductCard.module.css';
import { formatCurrency, formatRelativeTime } from '../utils/formatters';

const ProductCard = ({ product, onToggleWishlist, wishlist }) => {
  const isWishlisted = wishlist.includes(product.id);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.title} loading="lazy" />
        ) : (
          <div className={styles.placeholder}>
            <i className="ri-smartphone-line" />
          </div>
        )}
        <button
          type="button"
          className={`${styles.wishlistButton} ${isWishlisted ? styles.active : ''}`}
          onClick={() => onToggleWishlist(product.id)}
        >
          <i className={isWishlisted ? 'ri-heart-3-fill' : 'ri-heart-3-line'} />
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.headerRow}>
          <h2>{product.title}</h2>
          {product.storage && <span className={styles.storage}>{product.storage}</span>}
        </div>
        <p className={styles.price}>{formatCurrency(product.price)}</p>
        <p className={styles.meta}>
          <span>
            <i className="ri-building-line" />
            {product.carrier ?? 'Unlocked'}
          </span>
          <span>
            <i className="ri-time-line" />
            {formatRelativeTime(product.createdAt)}
          </span>
        </p>
        {product.description && <p className={styles.description}>{product.description}</p>}
        <footer className={styles.footer}>
          <div className={styles.avatar}>
            {product.owner?.photoURL ? (
              <img src={product.owner.photoURL} alt={product.owner.displayName ?? 'Seller'} />
            ) : (
              <i className="ri-user-shared-line" />
            )}
          </div>
          <div className={styles.sellerInfo}>
            <span>{product.owner?.displayName ?? 'Anonymous seller'}</span>
            <small>{product.location ?? 'Available everywhere'}</small>
          </div>
          <a className={styles.chatButton} href={product.contactUrl ?? '#'} target="_blank" rel="noreferrer">
            <i className="ri-message-3-line" />
            <span>Chat</span>
          </a>
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
