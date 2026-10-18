import { useState, useEffect } from 'react';
import { ScreenId, CartItem, CatalogEdition } from './types';
import { CATALOG_EDITIONS } from './data/editions';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CarriageBagModal } from './components/CarriageBagModal';
import { SearchModal } from './components/SearchModal';
import { SpecimenModal } from './components/SpecimenModal';
import { PassholderModal } from './components/PassholderModal';
import { StationKioskScreen } from './screens/StationKioskScreen';
import { EditionsArchiveScreen } from './screens/EditionsArchiveScreen';
import { FeaturedSolveScreen } from './screens/FeaturedSolveScreen';
import { DispatchSubmissionsScreen } from './screens/DispatchSubmissionsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('station-kiosk');

  // Initial cart with 2 items to match the starting header badge "Carriage Bag: 2"
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'or-01',
      title: 'The Trans-Continental Caesar Cipher',
      price: 24.0,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCOvpMB1zZt0M3ff3u62FvKfc7tR8tA_lqd6rIWTs2K7ZvMfoPB9WjTymu_VLkZQaKZ8Zu9PZSJIKFGnClmVeWjTBLxH3zKm6-pr5iGJ_tfaHhVcsBXqwUc2Ku7fa7YcH7dhiXYH3b-0WSXDRHQht5EUkchZSxmFI14laU8KPPBu68z3DUE6fg_vBW2AEASa-NO6ntdYsqyNBuLmWB4iGmg1BAxmXXvu8RteWoFHVLzdVh-hZk9o2FlGQ',
      tag: 'VOL. 01 • HARDCOVER',
      binding: 'Exposed thread sewn flat',
      quantity: 1,
    },
    {
      id: 'or-02',
      title: 'Railway Terminus & Station Hall Word Searches',
      price: 22.0,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAosv_snvVIa8vpCIgYNM6LDF50bnDnOPLN9AT0X6VqDdBY61-aiRRfUn2yPX3luNBn84Nlc3eyYQb1y_7h2UQMljcnWl0snqGU6vFPXj0qru9aFMwk9DEMEg0LlTkHEC2zyUSKZxMpPfanhYH4aWwwj4LiuLS5ArlDkjIN90OWGmI3E959n2cynhhNgtdc-9m6BWx9jAz32oTiaYrY7rBVOmsvpNgCCW56U8L3ANckXh5uulZUUqPmkg',
      tag: 'VOL. 02 • LAY-FLAT',
      binding: 'Full Lay-Flat A5',
      quantity: 1,
    },
  ]);

  // Vouchers and Discounts
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Modals
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPassholderOpen, setIsPassholderOpen] = useState(false);
  const [specimenEdition, setSpecimenEdition] = useState<CatalogEdition | null>(null);

  // Global Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleNavigate = (screen: ScreenId) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToMakersNote = () => {
    if (currentScreen !== 'station-kiosk') {
      setCurrentScreen('station-kiosk');
      setTimeout(() => {
        const el = document.getElementById('makers-note');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('makers-note');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`✓ Stowed into Carriage Bag: ${item.title}`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearBag = () => {
    setCartItems([]);
  };

  const handleApplyDiscount = (code: string): boolean => {
    if (code.toUpperCase() === 'ENIGMA10') {
      setDiscountCode('ENIGMA10');
      setDiscountPercent(10);
      showToast('✓ Solitude Discount Applied: 10% off');
      return true;
    }
    return false;
  };

  const handleOpenPreview = (edition: CatalogEdition) => {
    setSpecimenEdition(edition);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Sync title based on active screen
  useEffect(() => {
    const titles: Record<ScreenId, string> = {
      'station-kiosk': 'ORMA Editions • Objects for the quiet in-between',
      'editions-and-archive': 'The Complete Catalogue & Print Archive • ORMA Editions',
      'featured-solve-caesar-cipher': 'The Trans-Continental Caesar Cipher • Vol. I Solve',
      'dispatch-and-submissions': 'Open Carriage Submissions & Creator Dispatch • ORMA Editions',
    };
    document.title = titles[currentScreen];
  }, [currentScreen]);

  return (
    <div className="bg-[#fcf9f5] text-[#1c1c1a] font-body-md text-body-md min-h-screen flex flex-col selection:bg-[#ffdbcc] selection:text-[#351000]">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenBag={() => setIsBagOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenPassholder={() => setIsPassholderOpen(true)}
        onScrollToMakersNote={handleScrollToMakersNote}
      />

      {/* Main Content View */}
      <main className="w-full pt-28 bg-[#fcf9f5] flex-1">
        {currentScreen === 'station-kiosk' && (
          <StationKioskScreen
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentScreen === 'editions-and-archive' && (
          <EditionsArchiveScreen
            onOpenPreview={handleOpenPreview}
            onAddToCart={handleAddToCart}
            onOpenBag={() => setIsBagOpen(true)}
          />
        )}

        {currentScreen === 'featured-solve-caesar-cipher' && (
          <FeaturedSolveScreen
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onApplyVoucher={handleApplyDiscount}
            hasDiscount={discountPercent > 0}
          />
        )}

        {currentScreen === 'dispatch-and-submissions' && (
          <DispatchSubmissionsScreen />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onScrollToMakersNote={handleScrollToMakersNote}
      />

      {/* Carriage Bag Slide-over Drawer */}
      <CarriageBagModal
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearBag={handleClearBag}
        discountCode={discountCode}
        onApplyDiscount={handleApplyDiscount}
        discountPercent={discountPercent}
      />

      {/* Search Archive Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectEdition={(id) => {
          const ed = CATALOG_EDITIONS.find((e) => e.id === id);
          if (ed) setSpecimenEdition(ed);
        }}
        onNavigate={handleNavigate}
      />

      {/* Specimen Preview Modal */}
      <SpecimenModal
        isOpen={specimenEdition !== null}
        onClose={() => setSpecimenEdition(null)}
        edition={specimenEdition}
        onSelectEdition={(edition) =>
          handleAddToCart({
            id: edition.id,
            title: edition.title,
            price: edition.price,
            image: edition.image,
            tag: edition.volTag,
            binding: edition.paperDimension,
          })
        }
      />

      {/* Passholder / Station Identification Modal */}
      <PassholderModal
        isOpen={isPassholderOpen}
        onClose={() => setIsPassholderOpen(false)}
      />

      {/* Floating Stamped Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1c1c1a] text-white px-5 py-3 border-2 border-[#9e3d00] shadow-[4px_4px_0px_0px_#9e3d00] font-label-mono-sm text-xs uppercase tracking-wider flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[#ffdbcc] text-[18px]">bookmark</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
