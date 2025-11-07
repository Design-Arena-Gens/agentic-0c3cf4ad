import React, { useEffect, useState } from 'react';
import styles from './FilterSheet.module.css';

const defaultFilters = {
  maxPrice: '',
  carrier: '',
  condition: '',
  storage: ''
};

const FilterSheet = ({ open, onClose, onApply, activeFilters }) => {
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    if (open) {
      setFilters({
        ...defaultFilters,
        ...activeFilters
      });
    }
  }, [open, activeFilters]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <aside className={styles.panel}>
        <header className={styles.header}>
          <button type="button" onClick={onClose}>
            <i className="ri-arrow-left-line" />
          </button>
          <h2>Filters</h2>
        </header>
        <div className={styles.body}>
          <label>
            <span>Max price</span>
            <input
              type="number"
              name="maxPrice"
              placeholder="800"
              value={filters.maxPrice}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Carrier</span>
            <input
              name="carrier"
              placeholder="Unlocked / Verizon / AT&T"
              value={filters.carrier}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Condition</span>
            <select name="condition" value={filters.condition} onChange={handleChange}>
              <option value="">Any</option>
              <option value="New">New</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </label>
          <label>
            <span>Storage</span>
            <input
              name="storage"
              placeholder="128GB+"
              value={filters.storage}
              onChange={handleChange}
            />
          </label>
        </div>
        <footer className={styles.footer}>
          <button type="button" className={styles.clear} onClick={() => setFilters(defaultFilters)}>
            Reset
          </button>
          <button type="button" className={styles.apply} onClick={handleApply}>
            Apply filters
          </button>
        </footer>
      </aside>
    </div>
  );
};

export default FilterSheet;
