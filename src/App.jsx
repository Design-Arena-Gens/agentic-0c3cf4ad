import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ProductComposer from './components/ProductComposer';
import FilterSheet from './components/FilterSheet';
import ProductCard from './components/ProductCard';
import EmptyState from './components/EmptyState';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useRealtimeList } from './hooks/useRealtimeList';
import { database } from './firebase';

const curatedHighlights = [
  {
    id: 'drop-1',
    name: 'Midnight Upgrade',
    description: 'Curated flagship devices in pristine condition.',
    icon: 'ri-shining-2-line'
  },
  {
    id: 'drop-2',
    name: 'Battery Plus',
    description: 'Verified devices with 90%+ battery health.',
    icon: 'ri-battery-charge-line'
  },
  {
    id: 'drop-3',
    name: 'Unlocked Picks',
    description: 'Carrier-free phones ready for global travel.',
    icon: 'ri-suitcase-3-line'
  }
];

const ActivitySection = () => (
  <section className="timeline">
    <div className="timeline-card">
      <div className="badge">
        <i className="ri-flashlight-line" />
        Live
      </div>
      <h4>Live carrier unlock concierge</h4>
      <p>Connect with verified technicians directly from a listing.</p>
    </div>
    <div className="timeline-card">
      <h4>Same-day pickup available</h4>
      <p>Seamless pickup scheduling in 18 major cities, now rolling out globally.</p>
    </div>
  </section>
);

const AppContent = () => {
  const { user } = useAuth();
  const { data: products, loading: productsLoading } = useRealtimeList('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [activeTab, setActiveTab] = useState('feed');
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = window.localStorage.getItem('mb-wishlist');
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('mb-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const productsRef = database.ref('products');
    productsRef.once('value', (snapshot) => {
      if (snapshot.exists()) return;
      const demoPayload = {
        demo1: {
          title: 'iPhone 15 Pro Max',
          price: 1099,
          storage: '256GB',
          carrier: 'Unlocked',
          condition: 'Excellent',
          imageUrl:
            'https://images.unsplash.com/photo-1694977121254-8ae0c82c21cc?auto=format&fit=crop&w=1200&q=80',
          description:
            'Graphite finish with AppleCare+ through 2025. Includes original box and MagSafe case.',
          location: 'Brooklyn, NY',
          contactUrl: 'https://wa.me/15555551234',
          createdAt: Date.now() - 1000 * 60 * 35
        },
        demo2: {
          title: 'Samsung Galaxy S23 Ultra',
          price: 899,
          storage: '512GB',
          carrier: 'AT&T',
          condition: 'Good',
          imageUrl:
            'https://images.unsplash.com/photo-1679669010650-87d29f0690fb?auto=format&fit=crop&w=1200&q=80',
          description:
            'Phantom Black, includes S Pen and wireless charger. 85% battery health.',
          location: 'Austin, TX',
          contactUrl: 'mailto:seller@s23.market',
          createdAt: Date.now() - 1000 * 60 * 90
        },
        demo3: {
          title: 'Google Pixel 8 Pro',
          price: 799,
          storage: '128GB',
          carrier: 'Unlocked',
          condition: 'New',
          imageUrl:
            'https://images.unsplash.com/photo-1695731826036-4909c328cf03?auto=format&fit=crop&w=1200&q=80',
          description:
            'Sky Blue color with Pixel Buds Pro bundle. Factory sealed with receipt.',
          location: 'San Francisco, CA',
          contactUrl: 'https://t.me/pixelprosource',
          createdAt: Date.now() - 1000 * 60 * 140
        }
      };
      productsRef.update(demoPayload);
    });
  }, []);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return products
      .filter((product) => {
        if (!product) return false;
        const matchesSearch =
          term.length === 0 ||
          [product.title, product.description, product.carrier, product.storage]
            .join(' ')
            .toLowerCase()
            .includes(term);

        const priceFilter =
          !activeFilters.maxPrice || product.price <= Number(activeFilters.maxPrice);
        const carrierFilter =
          !activeFilters.carrier ||
          (product.carrier ?? '').toLowerCase().includes(activeFilters.carrier.toLowerCase());
        const conditionFilter =
          !activeFilters.condition ||
          (product.condition ?? '').toLowerCase() === activeFilters.condition.toLowerCase();
        const storageFilter =
          !activeFilters.storage ||
          (product.storage ?? '').toLowerCase().includes(activeFilters.storage.toLowerCase());

        return matchesSearch && priceFilter && carrierFilter && conditionFilter && storageFilter;
      })
      .map((item) => ({
        ...item,
        id: item.id
      }));
  }, [products, searchTerm, activeFilters]);

  const wishlistProducts = useMemo(
    () => filteredProducts.filter((product) => wishlist.includes(product.id)),
    [filteredProducts, wishlist]
  );

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const displayedProducts = activeTab === 'wishlist' ? wishlistProducts : filteredProducts;

  return (
    <div className="app-shell">
      <Header
        onOpenComposer={() => setComposerOpen(true)}
        onOpenFilters={() => setFiltersOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <main className="content">
        <div className="pill-group">
          <span className="chip">
            <i className="ri-map-pin-line" />
            Global drops
          </span>
          <span className="chip">
            <i className="ri-shield-check-line" />
            Buyer protection
          </span>
          {user && (
            <span className="chip">
              <i className="ri-verified-badge-line" />
              Signed in as {user.displayName ?? 'Seller'}
            </span>
          )}
        </div>

        <section>
          <h3 className="section-title">Curated releases</h3>
          <div className="grid">
            {curatedHighlights.map((highlight) => (
              <div key={highlight.id} className="timeline-card">
                <div className="badge">
                  <i className={highlight.icon} />
                  Drop
                </div>
                <h4>{highlight.name}</h4>
                <p>{highlight.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="section-title">
            {activeTab === 'wishlist' ? 'Saved devices' : 'Marketplace feed'}
          </h3>
          {productsLoading ? (
            <EmptyState
              icon="ri-loader-4-line"
              title="Fetching devices"
              description="Hold tight while we sync fresh drops from the marketplace."
            />
          ) : displayedProducts.length === 0 ? (
            <EmptyState
              icon="ri-search-eye-line"
              title="No devices match"
              description="Try adjusting filters or check back later for fresh releases."
              action={
                <button className="chip" type="button" onClick={() => setActiveFilters({})}>
                  <i className="ri-refresh-line" />
                  Clear filters
                </button>
              }
            />
          ) : (
            <div className="grid">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  wishlist={wishlist}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          )}
        </section>

        <ActivitySection />
      </main>
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
      <ProductComposer open={composerOpen} onClose={() => setComposerOpen(false)} />
      <FilterSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApply={setActiveFilters}
        activeFilters={activeFilters}
      />
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
