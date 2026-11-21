import { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  Truck, 
  ArrowRight, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { FoodIllustration } from './MenuSvgIcons';
import { formatPrice } from '../utils/formatters';

export function CartDrawer({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  setAppliedPromo
}) {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);

  if (!isOpen) return null;

  // Mahsulotlar summasi
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Bepul yetkazib berish chegarasi (100 000 so'm)
  const FREE_DELIVERY_THRESHOLD = 100000;
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  // Yetkazib berish narxi
  let deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 15000;
  if (appliedPromo?.code === 'TOSHKENT') {
    deliveryFee = 0;
  }

  // Chegirma hisobi
  let discountAmount = 0;
  if (appliedPromo?.code === 'UZB20') {
    discountAmount = Math.round(subtotal * 0.2); // 20% chegirma
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + (items.length > 0 ? deliveryFee : 0));

  // Promokod qo'llash
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();

    if (cleanCode === 'UZB20') {
      setAppliedPromo({
        code: 'UZB20',
        name: '20% Chegirma',
        type: 'percent',
        value: 20,
      });
      setPromoMessage({ type: 'success', text: "Tabriklaymiz! 20% chegirma qo'llanildi." });
      setPromoInput('');
    } else if (cleanCode === 'TOSHKENT') {
      setAppliedPromo({
        code: 'TOSHKENT',
        name: 'Bepul Yetkazib Berish',
        type: 'free_delivery',
        value: 15000,
      });
      setPromoMessage({ type: 'success', text: "Toshkent promo: Yetkazib berish BEPUL qilindi!" });
      setPromoInput('');
    } else {
      setPromoMessage({ type: 'error', text: "Yaroqsiz promokod. 'UZB20' yoki 'TOSHKENT' kodini sinab ko'ring." });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* O'ng tomondan chiquvchi drawer panel */}
      <div className="relative w-full max-w-md bg-[#17100B] border-l border-white/10 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Yuqori sarlavha */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FFB800] flex items-center justify-center text-black">
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-heading font-black text-lg text-white">
                SAVATCHANGIZ
              </h2>
              <span className="text-xs text-gray-400">
                {items.length} xil taom tanlandi
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Bepul yetkazib berish progress paneli */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-[#24170E] border-b border-orange-500/20">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-semibold text-gray-200">
                <Truck className="w-4 h-4 text-[#FF7A00]" />
                {subtotal >= FREE_DELIVERY_THRESHOLD || appliedPromo?.code === 'TOSHKENT' ? (
                  <span className="text-emerald-400 font-bold">Yetkazib berish BEPUL! 🎉</span>
                ) : (
                  <span>
                    Bepul yetkazish uchun yana <strong className="text-[#FFB800]">{formatPrice(remainingForFreeDelivery)}</strong>
                  </span>
                )}
              </span>
              <span className="text-[11px] text-gray-400 font-bold">
                {Math.round(freeDeliveryProgress)}%
              </span>
            </div>
            
            <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF7A00] to-emerald-400 transition-all duration-300"
                style={{ width: `${appliedPromo?.code === 'TOSHKENT' ? 100 : freeDeliveryProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Mahsulotlar ro'yxati (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-3xl mb-4 border border-white/5">
                🛒
              </div>
              <h3 className="font-heading font-bold text-base text-white">
                Savatchangiz bo‘sh
              </h3>
              <p className="mt-1 text-xs text-gray-400 max-w-xs leading-relaxed">
                Menyudan sevimli fast-foodingizni tanlang yoki o‘z burgeringizni noldan yig‘ing!
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9E00] text-black font-extrabold text-xs shadow-md shadow-orange-500/20"
              >
                Menyuni ko‘rish
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 group hover:border-orange-500/30 transition"
              >
                {/* Rasm yoki belgi */}
                <div className="w-16 h-16 rounded-xl bg-black/30 border border-white/5 shrink-0 flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : item.imageSvg ? (
                    <FoodIllustration type={item.imageSvg} className="w-12 h-12" />
                  ) : (
                    <span className="text-2xl">🍔</span>
                  )}
                </div>

                {/* Nomi, masalliqlari va narxi */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-black text-xs text-white truncate">
                    {item.name}
                  </h4>
                  {item.isCustom ? (
                    <p className="text-[10px] text-orange-400 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  ) : (
                    <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  )}
                  <div className="font-bold text-xs text-[#FFB800] mt-1">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>

                {/* Soni boshqaruvi */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 flex items-center justify-center transition"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-bold text-xs px-1 text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-7 h-7 rounded-lg bg-[#FF7A00] text-black font-bold flex items-center justify-center hover:brightness-110 transition"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition ml-1"
                    title="O'chirish"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pastki qism: Promokod va To'lov hisob-kitobi */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-black/40 space-y-4">
            
            {/* Promokod bo'limi */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="font-bold text-emerald-300">{appliedPromo.code}</span>
                      <span className="text-[10px] text-gray-400 ml-1.5">({appliedPromo.name})</span>
                    </div>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-red-400 hover:text-red-300 font-bold text-xs"
                  >
                    Bekor qilish
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Promokod (masalan: UZB20)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 uppercase focus:outline-none focus:border-[#FF7A00]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition shrink-0"
                  >
                    Qo‘llash
                  </button>
                </form>
              )}

              {promoMessage && (
                <div className={`mt-1.5 text-[11px] flex items-center gap-1 ${
                  promoMessage.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {promoMessage.type === 'success' ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  <span>{promoMessage.text}</span>
                </div>
              )}
            </div>

            {/* Hisob-kitob qatorlari */}
            <div className="space-y-1.5 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Mahsulotlar summasi:</span>
                <span className="text-white font-medium">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Chegirma (20%):</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Yetkazib berish (Toshkent):</span>
                {deliveryFee === 0 ? (
                  <span className="text-emerald-400 font-bold">BEPUL</span>
                ) : (
                  <span className="text-white font-medium">{formatPrice(deliveryFee)}</span>
                )}
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                <span className="font-heading font-bold text-sm text-white">Jami to‘lov:</span>
                <span className="font-heading font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFB800]">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Buyurtmani rasmiylashtirish tugmasi */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF7A00] via-[#FF8C00] to-[#FFB800] text-black font-heading font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:brightness-110 active:scale-98 transition"
            >
              <span>Buyurtmani rasmiylashtirish</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
