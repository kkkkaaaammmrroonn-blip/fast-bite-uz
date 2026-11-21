import { 
  Flame, 
  PhoneCall, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Send, 
  Heart, 
  ArrowUp 
} from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer({ onOpenHalalModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0705] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      
      {/* Orqa fon bezagi */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-orange-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asosiy 4 ustun */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* 1. Brend va Ta'rif (4 ustun) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FFB800] flex items-center justify-center text-black shadow-lg shadow-orange-500/30">
                <Flame className="w-6 h-6 fill-black" />
              </div>
              <span className="font-heading font-black text-2xl text-white tracking-wider">
                FAST<span className="text-[#FF7A00]">BITE</span> UZ
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              FAST BITE UZ — Toshkent bo‘ylab 30 daqiqada issiq yetkazib berish. 100% halol masalliqlar, nozik dudlangan mol go‘shti va shirin briosh nonlarimiz bilan haqiqiy mazani kashf eting.
            </p>

            <button
              onClick={onOpenHalalModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold hover:bg-emerald-900/60 transition"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>100% Halol Standarti Kafolatlangan</span>
            </button>
          </div>

          {/* 2. Aloqa va Ish vaqti (3 ustun) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Aloqa & Ish vaqti
            </h4>

            <div className="space-y-2.5 text-xs text-gray-300">
              <a
                href="tel:+998712007777"
                className="flex items-center gap-2 text-white hover:text-[#FFB800] transition font-bold"
              >
                <PhoneCall className="w-4 h-4 text-[#FF7A00]" />
                <span>+998 71 200-77-77</span>
              </a>

              <div className="flex items-start gap-2 text-gray-400">
                <Clock className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                <span>
                  Ish tartibi: <br />
                  <strong className="text-white">Har kuni 09:00 – 03:00</strong> (Tungi smena)
                </span>
              </div>

              <div className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Bosh oshxona: Toshkent sh., Chilonzor 7, Bunyodkor ko‘chasi 14-uy</span>
              </div>
            </div>
          </div>

          {/* 3. Ijtimoiy tarmoqlar (2 ustun) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Ijtimoiy tarmoqlar
            </h4>

            <div className="space-y-2 text-xs">
              <a
                href="https://t.me/fastbite_uz"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-blue-600/20 text-gray-300 hover:text-blue-400 transition"
              >
                <Send className="w-4 h-4 text-blue-400" />
                <span>@fastbite_uz</span>
              </a>

              <a
                href="https://instagram.com/fastbite.uz"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-pink-600/20 text-gray-300 hover:text-pink-400 transition"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>@fastbite.uz</span>
              </a>
            </div>
          </div>

          {/* 4. To'lov tizimlari (3 ustun) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Qabul qilinadigan to‘lovlar
            </h4>
            <p className="text-[11px] text-gray-400">
              O‘zbekistonning barcha asosiy fintech tizimlari orqali xavfsiz to‘lang:
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-[#0072C8] text-white font-extrabold text-[11px]">
                CLICK
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#1DAEEF] text-white font-extrabold text-[11px]">
                payme
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#7000FF] text-white font-extrabold text-[11px]">
                uzum bank
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#1E3A8A] text-white font-extrabold text-[11px]">
                UZCARD
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#DC2626] text-white font-extrabold text-[11px]">
                HUMO
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-800 text-white font-extrabold text-[11px]">
                NAQD PUL
              </span>
            </div>
          </div>

        </div>

        {/* Pastki mualliflik huquqi va Tepaga tugmasi */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2026 FAST BITE UZ. Barcha huquqlar himoyalangan. 100% Halol Toshkent fast-food brendi.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              O‘zbekistonda mehr bilan tayyorlangan <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-orange-500 hover:text-black text-gray-400 transition"
              title="Yuqoriga qaytish"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
