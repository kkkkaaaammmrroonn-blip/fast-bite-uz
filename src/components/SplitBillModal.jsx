import { useState } from 'react';
import { 
  X, 
  Users, 
  Check, 
  Send
} from 'lucide-react';
import { formatPrice } from '../utils/formatters';

export function SplitBillModal({ isOpen, onClose, amount = 0, title = 'FAST BITE Buyurtmasi' }) {
  const [peopleCount, setPeopleCount] = useState(4);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const perPersonAmount = Math.ceil(amount / peopleCount / 500) * 500; // 500 so'mga yaxlitlash

  const friendNames = [
    'Sardor (tashkilotchi)',
    'Jasur (achchiqsevar)',
    'Farrux (burger ixlosmandi)',
    'Bobur (pepsisevar)',
    'Sanjar (lavashchi)',
    'Dilshod',
    'Nodir',
    'Sherzod',
    'Rustam',
    'Akmal',
  ];

  const handleCopy = () => {
    const textToCopy = `🍔 FAST BITE UZ — Do'stlar bilan hisobni bo'lish!

📦 Buyurtma: ${title}
💰 Umumiy summa: ${formatPrice(amount)}
👥 Do'stlar soni: ${peopleCount} kishi
👉 Har bir kishiga: ${formatPrice(perPersonAmount)}

💳 To'lov uchun karta (Click / Payme):
8600 3100 4589 7722 (Sardor A.)

Iltimos, tezroq tashavoringlar, kuryer allaqachon yo'lda! 🚀🔥`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#1C130D] border border-orange-500/30 p-6 sm:p-8 shadow-2xl">
        
        {/* Yopish */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Sarlavha */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FFB800] text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Do‘stlar va hamkasblar uchun</span>
          </div>

          <h2 className="font-heading font-black text-2xl text-white uppercase">
            HISOBNI <span className="text-[#FF7A00]">BO‘LISH</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Buyurtma: <strong className="text-white">{title}</strong> ({formatPrice(amount)})
          </p>
        </div>

        {/* Odamlar sonini tanlash */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-300">
              Necha kishi bo‘lishmoqchi?
            </span>
            <span className="font-heading font-black text-lg text-[#FFB800]">
              {peopleCount} kishi
            </span>
          </div>

          {/* Slayder */}
          <input
            type="range"
            min="2"
            max="10"
            value={peopleCount}
            onChange={(e) => setPeopleCount(Number(e.target.value))}
            className="w-full accent-[#FF7A00] h-2 bg-black/40 rounded-lg cursor-pointer"
          />

          {/* Tezkor tugmalar */}
          <div className="flex items-center justify-between gap-1.5 mt-3">
            {[2, 3, 4, 5, 6, 8, 10].map((num) => (
              <button
                key={num}
                onClick={() => setPeopleCount(num)}
                className={`flex-1 py-1 rounded-lg text-xs font-bold transition ${
                  peopleCount === num
                    ? 'bg-[#FF7A00] text-black'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Har bir kishiga tushadigan summa ko'rgazmasi */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-950/40 via-[#26170E] to-[#120B07] border border-orange-500/30 text-center mb-6">
          <span className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold block">
            Har bir kishi to‘laydi:
          </span>
          <div className="font-heading font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFB800] my-1">
            {formatPrice(perPersonAmount)}
          </div>
          <span className="text-[10px] text-gray-500">
            Jami: {formatPrice(amount)} / {peopleCount} kishi
          </span>
        </div>

        {/* Do'stlar ro'yxati oldindan ko'rish */}
        <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 mb-6">
          {friendNames.slice(0, peopleCount).map((name, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-xl bg-black/30 border border-white/5 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/10 text-gray-300 flex items-center justify-center text-[10px] font-bold">
                  {index + 1}
                </span>
                <span className="text-gray-300">{name}</span>
              </div>
              <span className="font-bold text-[#FFB800]">
                {formatPrice(perPersonAmount)}
              </span>
            </div>
          ))}
        </div>

        {/* Telegram nusxalash tugmasi */}
        <div className="space-y-3">
          <button
            onClick={handleCopy}
            className={`w-full py-3.5 rounded-2xl font-heading font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg ${
              isCopied
                ? 'bg-emerald-500 text-black shadow-emerald-500/20'
                : 'bg-gradient-to-r from-[#FF7A00] to-[#FF9E00] text-black shadow-orange-500/25 hover:brightness-110 active:scale-98'
            }`}
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Nusxalandi! Telegramga yuborishingiz mumkin</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Telegram / Nusxalash</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-gray-500 text-center">
            Matn nusxalangandan so‘ng uni Telegram guruhingizga jo‘nating.
          </p>
        </div>

      </div>
    </div>
  );
}
