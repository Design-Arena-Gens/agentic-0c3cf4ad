import React, { useEffect, useState } from 'react';
import styles from './ProductComposer.module.css';
import { database } from '../firebase';
import { useAuth } from '../context/AuthContext';

const initialState = {
  title: '',
  price: '',
  storage: '',
  carrier: 'Unlocked',
  condition: 'Excellent',
  imageUrl: '',
  description: '',
  location: '',
  contactUrl: ''
};

const ProductComposer = ({ open, onClose }) => {
  const { user, signInWithGoogle } = useAuth();
  const [formState, setFormState] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setFormState(initialState);
      setSubmitting(false);
    }
  }, [open]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      await signInWithGoogle();
    }

    setSubmitting(true);
    const payload = {
      ...formState,
      price: Number.parseFloat(formState.price || '0'),
      createdAt: Date.now(),
      owner: user
        ? {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          }
        : null
    };

    await database.ref('products').push(payload);
    setSubmitting(false);
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.sheet}>
        <div className={styles.handle} />
        <header className={styles.header}>
          <h2>List a device</h2>
          <button type="button" onClick={onClose}>
            <i className="ri-close-line" />
          </button>
        </header>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            <span>Device title</span>
            <input
              required
              name="title"
              placeholder="iPhone 14 Pro Max"
              value={formState.title}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Price (USD)</span>
            <input
              required
              name="price"
              type="number"
              inputMode="decimal"
              placeholder="699"
              value={formState.price}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Storage</span>
            <input
              name="storage"
              placeholder="256GB"
              value={formState.storage}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Carrier</span>
            <input
              name="carrier"
              placeholder="Unlocked / AT&T / Verizon"
              value={formState.carrier}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Condition</span>
            <select name="condition" value={formState.condition} onChange={handleChange}>
              <option value="New">New</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </label>
          <label>
            <span>Image URL</span>
            <input
              name="imageUrl"
              placeholder="https://images..."
              value={formState.imageUrl}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Short description</span>
            <textarea
              name="description"
              placeholder="Lightly used, includes original box and accessories."
              rows={3}
              value={formState.description}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Location</span>
            <input
              name="location"
              placeholder="San Francisco, CA"
              value={formState.location}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Contact URL</span>
            <input
              name="contactUrl"
              placeholder="https://wa.me/..."
              value={formState.contactUrl}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className={styles.submit} disabled={submitting}>
            {submitting ? 'Publishing…' : 'Publish listing'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductComposer;
