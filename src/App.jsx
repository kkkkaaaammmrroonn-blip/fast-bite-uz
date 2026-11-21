import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BurgerBuilder } from './components/BurgerBuilder';
import { MenuSection } from './components/MenuSection';
import { ComboDealsSection } from './components/ComboDealsSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { SplitBillModal } from './components/SplitBillModal';
import { HalalCertificateModal } from './components/HalalCertificateModal';
import { Footer } from './components/Footer';
import { AmbientParticles } from './components/AmbientParticles';
import { CITIES } from './data/menuData';

export function App() {
  // Savatdagi mahsulotlar
  const [cartItems, setCartItems] = useState([
    {
      id: 'tandir_lavash',
      name: "Tandir Lavash (mol go'shti)",
      category: 'lavash',
      price: 34000,
      calories: 520,
      prepTime: 8,
      quantity: 1,
      imageSvg: 'lavash',
      image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80',
      description: "Tandirda qovurilgan barra mol go'shti, qizil pomidor va maxsus sous",
    },
  ]);

  // UI Holatlari
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [activeSection, setActiveSection] = useState('builder');
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Modallar
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isHalalModalOpen, setIsHalalModalOpen] = useState(false);
  const [splitBillState, setSplitBillState] = useState({
    isOpen: false,
    amount: 0,
    title: '',
  });

  // Xabarnoma (Toast notification)
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Savatga qo'shish yoki sonini oshirish/kamaytirish
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      // Agar maxsus yig'ilgan burger bo'lsa har doim yangi qilib qo'shish
      if (product.isCustom) {
        showToast("Maxsus burger savatchaga qo'shildi! 🍔");
        return [...prevItems, product];
      }

      const existingIndex = prevItems.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + (product.quantity || 1);

        if (newQty <= 0) {
          updated.splice(existingIndex, 1);
          showToast("Mahsulot savatchadan olib tashlandi.");
        } else {
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: newQty,
          };
          showToast(`${product.name} miqdori yangilandi!`);
        }
        return updated;
      } else {
        showToast(`${product.name} savatchaga qo'shildi!`);
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  // Savatdagi sonni o'zgartirish
  const handleUpdateQuantity = (itemId, change) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + change;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Savatdan o'chirish
  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast("Mahsulot savatchadan o'chirildi.");
  };

  // Savatdan Checkout ga o'tish
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Buyurtmani tasdiqlash
  const handleConfirmOrder = (orderInfo) => {
    setOrderDetails(orderInfo);
    setIsCheckoutOpen(false);
    setIsOrderTrackerOpen(true);
    setCartItems([]); // Savatni tozalash
    setAppliedPromo(null);
  };

  // Do'stlar bilan hisobni bo'lish modalini ochish
  const handleOpenSplitBill = (amount, title) => {
    setSplitBillState({
      isOpen: true,
      amount,
      title,
    });
  };

  // Jami summa hisobi
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 100000 || appliedPromo?.code === 'TOSHKENT' ? 0 : 15000;
  const discountAmount = appliedPromo?.code === 'UZB20' ? Math.round(subtotal * 0.2) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + (cartItems.length > 0 ? deliveryFee : 0));

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0C0A] text-[#F3F4F6] selection:bg-[#FF7A00] selection:text-white relative">
      {/* Orqa fon jonli olov va nurlar animatsiyasi */}
      <AmbientParticles />
      
      {/* 1. TOP NAVIGATION BAR */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenHalalModal={() => setIsHalalModalOpen(true)}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Asosiy kontent */}
      <main className="flex-1">
        
        {/* 2. HERO SECTION — INTERAKTIV BURGER BUILDER */}
        <BurgerBuilder
          onAddToCart={handleAddToCart}
          onOpenSplitBill={handleOpenSplitBill}
          onOpenHalalModal={() => setIsHalalModalOpen(true)}
        />

        {/* 3. MENYU BO'LIMI */}
        <MenuSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
        />

        {/* 4. ULFATLAR SETI VA TUNGI AKSIYALAR */}
        <ComboDealsSection
          onAddToCart={handleAddToCart}
          onOpenSplitBill={handleOpenSplitBill}
        />

      </main>

      {/* 5. FOOTER */}
      <Footer onOpenHalalModal={() => setIsHalalModalOpen(true)} />

      {/* 6. SLIDE-OVER SAVATCHA (Cart Drawer) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        appliedPromo={appliedPromo}
        setAppliedPromo={setAppliedPromo}
      />

      {/* 7. BUYURTMANI RASMIYLASHTIRISH MODALI (Checkout) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        finalTotal={finalTotal}
        onConfirmOrder={handleConfirmOrder}
      />

      {/* 8. BUYURTMA KUZATUVCHISI MODALI (Order Tracker) */}
      <OrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        orderDetails={orderDetails}
        onNewOrder={() => {
          setIsOrderTrackerOpen(false);
          setActiveSection('menu');
          const element = document.getElementById('menu');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 9. DO'STLAR BILAN HISOBNI BO'LISH MODALI (Split Bill) */}
      <SplitBillModal
        isOpen={splitBillState.isOpen}
        onClose={() => setSplitBillState((prev) => ({ ...prev, isOpen: false }))}
        amount={splitBillState.amount}
        title={splitBillState.title}
      />

      {/* 10. HALOL SERTIFIKATI MODALI */}
      <HalalCertificateModal
        isOpen={isHalalModalOpen}
        onClose={() => setIsHalalModalOpen(false)}
      />

      {/* Bildirishnoma (Toast Alert) */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#1C130D] border border-orange-500/40 text-white text-xs font-semibold shadow-2xl shadow-orange-500/20 animate-in slide-in-from-bottom duration-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A00] animate-ping" />
          <span>{toast}</span>
        </div>
      )}

    </div>
  );
}

export default App;
