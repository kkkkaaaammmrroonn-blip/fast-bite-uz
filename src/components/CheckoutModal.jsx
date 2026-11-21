import { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  ShieldCheck, 
  CheckCircle,
  FileText
} from 'lucide-react';
import { DISTRICTS, PAYMENT_METHODS } from '../data/menuData';
import { formatPrice, formatPhoneNumber } from '../utils/formatters';

export function CheckoutModal({
  isOpen,
  onClose,
  items = [],
  finalTotal = 0,
  onConfirmOrder
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 (90) ',
    district: DISTRICTS[0],
    address: '',
    comment: '',
    paymentMethod: 'click',
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const formatted = formatPhoneNumber(raw);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = "Ismingizni kiriting";
    }
    // Raqamlar sonini tekshirish
    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length < 12) {
      errs.phone = "To'liq telefon raqamini kiriting (masalan: +998 90 123-45-67)";
    }
    if (!formData.address.trim()) {
      errs.address = "Yetkazib berish manzilini kiriting";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onConfirmOrder({
        ...formData,
        orderId: `FB-${Math.floor(1000 + Math.random() * 9000)}`,
        items,
        total: finalTotal,
        date: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#1C130D] border border-orange-500/30 p-6 sm:p-8 shadow-2xl">
        
        {/* Yopish tugmasi */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Sarlavhasi */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Xavfsiz O‘zbekiston to‘lovi</span>
          </div>
          <h2 className="font-heading font-black text-2xl text-white uppercase">
            BUYURTMANI <span className="text-[#FF7A00]">RASMIYLASHTIRISH</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Yetkazib berish ma’lumotlarini kiriting va qulay to‘lov turini tanlang.
          </p>
        </div>

        {/* Shakl (Form) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Ism va Telefon raqami (2 ustun) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                Ismingiz <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Masalan: Sardor"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: null });
                  }}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00] transition ${
                    errors.name ? 'border-red-500' : 'border-white/10'
                  }`}
                />
              </div>
              {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                Telefon raqam <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="+998 (90) 123-45-67"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00] transition ${
                    errors.phone ? 'border-red-500' : 'border-white/10'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-[10px] text-red-400 mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Tuman tanlash */}
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1.5">
              Toshkent shahri tumani <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#FF7A00]" />
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#251810] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF7A00] transition"
              >
                {DISTRICTS.map((district) => (
                  <option key={district} value={district}>
                    {district} (Tezkor yetkazish ~30 daq)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Manzil va mo'ljal */}
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1.5">
              Aniq manzil va mo‘ljal <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Masalan: Chilonzor 9-mavze, 12-uy, 45-xonadon (Mo'ljal: Makro)"
              value={formData.address}
              onChange={(e) => {
                setFormData({ ...formData, address: e.target.value });
                if (errors.address) setErrors({ ...errors, address: null });
              }}
              className={`w-full px-3 py-2.5 rounded-xl bg-white/5 border text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00] transition ${
                errors.address ? 'border-red-500' : 'border-white/10'
              }`}
            />
            {errors.address && <p className="text-[10px] text-red-400 mt-1">{errors.address}</p>}
          </div>

          {/* Kuryer uchun izoh */}
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1.5">
              Kuryer uchun izoh (ixtiyoriy)
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <textarea
                rows="2"
                placeholder="Domofon kodi, eshik qo'ng'irog'i yoki alohida istaklar..."
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF7A00] transition"
              />
            </div>
          </div>

          {/* TO'LOV TIZIMLARI (Click, Payme, Uzum, Humo/Uzcard, Naqd) */}
          <div className="pt-2">
            <label className="text-xs font-semibold text-gray-300 block mb-2">
              To‘lov usulini tanlang:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {PAYMENT_METHODS.map((method) => {
                const isSelected = formData.paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-br from-orange-500/20 to-amber-500/10 border-[#FF7A00] shadow-md shadow-orange-500/20 scale-[1.02]'
                        : 'bg-black/30 border-white/10 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black tracking-wider text-white bg-gradient-to-r ${method.badgeColor}`}>
                        {method.logoText}
                      </span>
                      {isSelected && (
                        <CheckCircle className="w-3.5 h-3.5 text-[#FF7A00]" />
                      )}
                    </div>
                    <span className="font-bold text-xs text-white mt-1">
                      {method.name}
                    </span>
                    <span className="text-[9px] text-gray-400 line-clamp-1 mt-0.5">
                      {method.subtext}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Buyurtma summasi va Tasdiqlash */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-gray-400 block">Jami to‘lanadigan summa:</span>
              <span className="font-heading font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFB800]">
                {formatPrice(finalTotal)}
              </span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF7A00] via-[#FF8C00] to-[#FFB800] text-black font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/30 hover:brightness-110 active:scale-95 transition"
            >
              Buyurtmani tasdiqlash
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
