import { useState, useEffect } from 'react';
import { 
  Gift, 
  Clock, 
  Users, 
  Plus, 
  Truck, 
  Moon, 
  CheckCircle2, 
  Share2
} from 'lucide-react';
import { COMBOS } from '../data/menuData';
import { formatPrice } from '../utils/formatters';

export function ComboDealsSection({ onAddToCart, onOpenSplitBill }) {
  // Jonli ortga hisoblash taymeri (Tungi aksiya uchun)
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="combos" className="py-16 sm:py-24 relative overflow-hidden">
      
      {/* Orqa fon nuri */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TUNGI AKSIYA BANNERI */}
        <div id="deals" className="mb-16 relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#2B140B] via-[#1E1109] to-[#120B07] border border-orange-500/30 shadow-2xl overflow-hidden">
          {/* Bezak elementlari */}
          <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-[#FFB800] border border-orange-500/30 text-xs font-bold">
              <Moon className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>Har kuni soat 22:00 – 03:00</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-500/20 text-red-400 text-xs font-extrabold uppercase tracking-wide">
                <Truck className="w-4 h-4" />
                <span>Maxsus Chegirma</span>
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
                TUNGI AKSIYA: 100 000 SO‘MDAN YUQORI BUYURTMAGA <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFB800]">
                  YETKAZIB BERISH BEPUL!
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                Toshkentning barcha tumanlariga issiq, yangi pishirilgan burger va lavashlarni tekinga yetkazib beramiz. Kechki ziyofatni Fast Bite bilan o‘tkazing!
              </p>
            </div>

            {/* Ortga hisoblash jonli taymeri */}
            <div className="lg:col-span-4 flex flex-col sm:items-end">
              <span className="text-[11px] text-gray-400 font-medium mb-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>Aksiya tugashiga qoldi:</span>
              </span>

              <div className="flex items-center gap-2">
                <div className="w-14 sm:w-16 p-2 rounded-2xl bg-white/10 border border-white/10 text-center">
                  <div className="font-heading font-black text-xl sm:text-2xl text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <span className="text-[9px] text-gray-400 uppercase font-bold">Soat</span>
                </div>
                <span className="font-black text-xl text-orange-500">:</span>
                <div className="w-14 sm:w-16 p-2 rounded-2xl bg-white/10 border border-white/10 text-center">
                  <div className="font-heading font-black text-xl sm:text-2xl text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <span className="text-[9px] text-gray-400 uppercase font-bold">Daqiqa</span>
                </div>
                <span className="font-black text-xl text-orange-500">:</span>
                <div className="w-14 sm:w-16 p-2 rounded-2xl bg-white/10 border border-white/10 text-center">
                  <div className="font-heading font-black text-xl sm:text-2xl text-[#FFB800]">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <span className="text-[9px] text-gray-400 uppercase font-bold">Soniya</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ULFATLAR SETI BO'LIMI SARLAVHASI */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FFB800] text-xs font-bold uppercase tracking-wider mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>Kompaniya va do‘stlar uchun tejamkor to‘plamlar</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
            ULFATLAR <span className="text-[#FF7A00]">SETI</span>
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Alohida buyurtma qilgandan 25% gacha arzonroq! Har bir setda bir nechta taomlar, souslar va sovuq ichimliklar mujassam.
          </p>
        </div>

        {/* 3 ta Katta Combo Kartalari */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMBOS.map((combo) => (
            <div
              key={combo.id}
              className="relative rounded-3xl bg-gradient-to-b from-[#211710] to-[#120B07] border border-orange-500/30 p-6 flex flex-col justify-between shadow-2xl hover:border-orange-500/60 transition-all duration-300 hover:-translate-y-1.5 group"
            >
              {/* Yuqori qism: Haqiqiy hayotdagi kabi sershira taom surati */}
              <div>
                <div className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden mb-5 bg-black/50 border border-white/10 group-hover:border-orange-500/50 shadow-2xl transition-all duration-300">
                  <img
                    src={combo.image}
                    alt={combo.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Qoramtir gradient soya */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C130D] via-transparent to-black/40 pointer-events-none" />

                  {/* Yuqori yorliqlar rasm ustida */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-black text-xs uppercase tracking-wider shadow-lg">
                      {combo.badge}
                    </span>
                    
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-gray-200 shadow-md">
                      <Users className="w-3.5 h-3.5 text-[#FF7A00]" />
                      <span>{combo.peopleCount} kishi uchun</span>
                    </div>
                  </div>
                </div>

                {/* Sarlavha va ta'rif */}
                <h3 className="font-heading font-black text-xl text-white group-hover:text-[#FFB800] transition">
                  {combo.name}
                </h3>
                <p className="mt-1 text-xs text-gray-400 leading-relaxed">
                  {combo.description}
                </p>

                {/* Set tarkibi */}
                <div className="mt-5 p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wide block mb-1">
                    Set tarkibi:
                  </span>
                  {combo.contents.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Narxlar va Tugmalar */}
              <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(combo.oldPrice)}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-black">
                        {combo.discount}
                      </span>
                    </div>
                    <div className="font-heading font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFB800]">
                      {formatPrice(combo.price)}
                    </div>
                  </div>

                  <span className="text-[11px] text-gray-400 text-right">
                    ~{Math.round(combo.price / combo.peopleCount / 1000) * 1000} so‘m / kishi
                  </span>
                </div>

                {/* Harakatlar */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onAddToCart({ ...combo, quantity: 1, isCombo: true })}
                    className="py-3 px-3 rounded-2xl bg-gradient-to-r from-[#FF7A00] to-[#FF9E00] text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 hover:brightness-110 active:scale-95 transition"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Setni olish</span>
                  </button>

                  <button
                    onClick={() => onOpenSplitBill(combo.price, combo.name)}
                    className="py-3 px-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#FF7A00]" />
                    <span>Bo‘lish</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
