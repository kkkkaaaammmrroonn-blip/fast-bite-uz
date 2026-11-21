import { X, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

export function HalalCertificateModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#141F18] border border-emerald-500/40 p-6 sm:p-8 shadow-2xl text-white">
        
        {/* Yopish */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Emerald Sertifikat belgisi */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-600 to-green-400 p-0.5 mb-3 shadow-lg shadow-emerald-500/30">
            <div className="w-full h-full bg-[#0D1811] rounded-[22px] flex items-center justify-center">
              <ShieldCheck className="w-9 h-9 text-emerald-400" />
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wider uppercase">
            Rasmiy Halol Kafolati
          </span>

          <h2 className="font-heading font-black text-2xl text-white mt-2">
            100% HALOL SERTIFIKATI
          </h2>
          <p className="text-xs text-gray-300 mt-1">
            Sertifikat raqami: <strong className="text-emerald-400">#HALAL-UZ-2026-9814</strong>
          </p>
        </div>

        {/* Sertifikat tafsilotlari */}
        <div className="space-y-3 p-4 rounded-2xl bg-black/40 border border-emerald-500/20 text-xs mb-6">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Go‘sht mahsulotlari:</strong>
              <span className="text-gray-300">
                Faqatgina &ldquo;Bismillah&rdquo; bilan shariat talablari asosida so‘yilgan mahalliy Toshkent va Jizzax fermalari barra mol va tovuq go‘shti.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Cho‘chqa yog‘i va bekon mutlaqo yo‘q:</strong>
              <span className="text-gray-300">
                Barcha menyuda cho‘chqa go‘shti (bekon) o‘rniga maxsus tabiiy dudlangan barra mol go‘shti ishlatiladi.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Sanitariya va gigiyena:</strong>
              <span className="text-gray-300">
                Oshxonadagi barcha idish-tovoqlar va gril uskunalari faqat halol masalliqlar uchun ajratilgan.
              </span>
            </div>
          </div>
        </div>

        {/* Qonuniy muhr va imzo ko'rinishi */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#FFB800]" />
            <span>Tekshiruv organi: O‘zbekiston Standartlashtirish</span>
          </div>
          <span className="text-emerald-400 font-bold">Muddati: 2027-yilgacha faol</span>
        </div>

        {/* Tugma */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-emerald-500/20"
        >
          Yopish
        </button>

      </div>
    </div>
  );
}
