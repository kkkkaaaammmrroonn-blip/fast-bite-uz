import { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Flame, 
  Bike, 
  Home, 
  Phone, 
  Send
} from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export function OrderTrackerModal({ isOpen, onClose, orderDetails, onNewOrder }) {
  const [currentStep, setCurrentStep] = useState(1); // 0: Qabul qilindi, 1: Tayyorlanmoqda, 2: Kuryer yo'lda, 3: Yetkazildi

  useEffect(() => {
    if (!isOpen) return;

    // Har 8 soniyada holatni simulyatsiya qilib oldinga siljitish
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 8000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen || !orderDetails) return null;

  const steps = [
    { title: 'Qabul qilindi', desc: 'Buyurtma tizimda ro‘yxatga olindi', icon: CheckCircle2 },
    { title: 'Oshxonada tayyorlanmoqda', desc: 'Grilda go‘sht va briosh qovurilmoqda', icon: Flame },
    { title: 'Kuryer yo‘lda', desc: 'Issiq termosumkada tezkor yetkazilmoqda', icon: Bike },
    { title: 'Yetkazib berildi', desc: 'Yoqimli ishtaha tilaymiz!', icon: Home },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#1C130D] border border-orange-500/30 p-6 sm:p-8 shadow-2xl">
        
        {/* Yopish */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Yuqori buyurtma ID va Muvaffaqiyat */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-bold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Buyurtmangiz qabul qilindi!</span>
          </div>

          <h2 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase">
            BUYURTMA <span className="text-[#FF7A00]">{orderDetails.orderId}</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Taxminiy yetkazib berish vaqti: <strong className="text-white">25-35 daqiqa</strong>
          </p>
        </div>

        {/* Progress chizig'i va bosqichlar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 mb-6">
          <div className="relative flex items-center justify-between mb-8 px-2">
            {/* Orqa fon chizig'i */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-white/10 z-0" />
            <div 
              className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-[#FF7A00] to-emerald-400 z-0 transition-all duration-700"
              style={{ width: `${(currentStep / (steps.length - 1)) * 88}%` }}
            />

            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isPassed = idx <= currentStep;
              const isCurrent = idx === currentStep;

              return (
                <div key={idx} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCurrent
                        ? 'bg-[#FF7A00] text-black shadow-lg shadow-orange-500/40 scale-110 ring-4 ring-orange-500/20'
                        : isPassed
                        ? 'bg-emerald-500 text-black font-bold'
                        : 'bg-white/10 text-gray-400 border border-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span className={`text-[10px] font-bold mt-2 text-center max-w-[70px] ${
                    isCurrent ? 'text-[#FFB800]' : isPassed ? 'text-white' : 'text-gray-500'
                  }`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="text-center p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20">
            <span className="text-xs text-orange-200 font-medium">
              🔥 Hozirgi holat: <strong className="text-white">{steps[currentStep].title}</strong> — {steps[currentStep].desc}
            </span>
          </div>
        </div>

        {/* Tayinlangan kuryer ma'lumotlari kartasi */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.08] border border-white/10 flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF7A00] to-[#FFB800] p-0.5 shrink-0">
              <div className="w-full h-full bg-[#1C130D] rounded-[14px] flex items-center justify-center text-xl">
                🛵
              </div>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                Tayinlangan kuryer
              </span>
              <h4 className="font-heading font-black text-sm text-white">
                Sardor Aliyev
              </h4>
              <p className="text-[11px] text-[#FFB800] flex items-center gap-1 mt-0.5">
                <Bike className="w-3 h-3" />
                <span>Tezkor skuter (Kulrang)</span>
              </p>
            </div>
          </div>

          <a
            href="tel:+998901234567"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md shadow-emerald-600/20"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Qo‘ng‘iroq</span>
          </a>
        </div>

        {/* Manzil va to'lov xulosasi */}
        <div className="space-y-2 text-xs text-gray-300 p-4 rounded-2xl bg-black/40 border border-white/5 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Yetkazish manzili:</span>
            <span className="font-semibold text-white">{orderDetails.district}, {orderDetails.address}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Mijoz:</span>
            <span className="font-semibold text-white">{orderDetails.name} ({orderDetails.phone})</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">To‘lov turi:</span>
            <span className="font-bold text-[#FFB800] uppercase">{orderDetails.paymentMethod}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/10 font-bold">
            <span className="text-white">Jami summa:</span>
            <span className="text-[#FF7A00] text-sm">{formatPrice(orderDetails.total)}</span>
          </div>
        </div>

        {/* Telegram bildirishnomasi */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-300 mb-6">
          <Send className="w-4 h-4 text-blue-400 shrink-0" />
          <span>
            Buyurtma holati va kuryer geolokatsiyasi sizning Telegram profilingizga yuborildi.
          </span>
        </div>

        {/* Yangi buyurtma tugmasi */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNewOrder}
            className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition"
          >
            Yangi buyurtma berish
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FF7A00] to-[#FF9E00] text-black font-extrabold text-xs shadow-lg shadow-orange-500/25 hover:brightness-110 transition"
          >
            Tushundim, rahmat!
          </button>
        </div>

      </div>
    </div>
  );
}
