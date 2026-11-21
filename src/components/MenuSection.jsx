import { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Minus, 
  Flame, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Info
} from 'lucide-react';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { formatPrice } from '../utils/formatters';

export function MenuSection({
  searchQuery,
  setSearchQuery,
  onAddToCart,
  cartItems = [],
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItemDetail, setSelectedItemDetail] = useState(null);

  // Filtrlangan taomlar
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Savatdagi sonini tekshirish
  const getItemCountInCart = (itemId) => {
    const found = cartItems.find((item) => item.id === itemId);
    return found ? found.quantity : 0;
  };

  return (
    <section id="menu" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bo'lim sarlavhasi */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FFB800] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>O‘zbekiston sevimli fast-food menyusi</span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              BIZNING <span className="text-[#FF7A00]">MENYU</span>
            </h2>
            <p className="mt-2 text-sm text-gray-400 max-w-xl">
              Har bir taom milliy ta’bga mos, faqatgina yangi so‘yilgan halol
              go‘sht va barra sabzavotlardan buyurtmangizdan so‘ng tayyorlanadi.
            </p>
          </div>

          {/* Qidiruv holati ko'rinishi */}
          {searchQuery && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/20 border border-orange-500/40 text-xs text-orange-200">
              <Search className="w-3.5 h-3.5" />
              <span>
                Qidiruv: &ldquo;{searchQuery}&rdquo; ({filteredItems.length} ta
                topildi)
              </span>
              <button
                onClick={() => setSearchQuery("")}
                className="text-white hover:text-[#FFB800] font-bold ml-1"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Kategoriya filtrlari (Pill pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#FF7A00] to-[#FF9E00] text-black shadow-lg shadow-orange-500/25 scale-[1.03]"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Taomlar kartalari to'ri (Grid) */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const countInCart = getItemCountInCart(item.id);

              return (
                <div
                  key={item.id}
                  className="group relative rounded-3xl bg-white/5 border border-white/10 hover:border-orange-500/40 backdrop-blur-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10"
                >
                  {/* Yuqori rasm va nishonlar */}
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-black/40">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#160E09] via-transparent to-black/35 pointer-events-none" />

                    {/* Badge */}
                    {item.badge && (
                      <span
                        className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide text-white shadow-md z-10 ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* 100% Halol nishoni */}
                    {item.isHalal && (
                      <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[10px] font-bold z-10">
                        <ShieldCheck className="w-3 h-3" />
                        <span>HALOL</span>
                      </span>
                    )}

                    {/* Tafsilot tugmasi */}
                    <button
                      onClick={() => setSelectedItemDetail(item)}
                      className="absolute bottom-3 right-3 p-1.5 rounded-xl bg-black/70 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white hover:bg-black/90 transition z-10"
                      title="Batafsil ma'lumot"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Taom ma'lumotlari */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-heading font-black text-base text-white group-hover:text-[#FFB800] transition-colors leading-snug">
                          {item.name}
                        </h3>
                      </div>

                      <p className="mt-2 text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Kaloriya va Tayyorlash vaqti */}
                      <div className="mt-3 flex items-center gap-3 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-orange-400" />
                          <span>{item.calories} kkal</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>{item.prepTime} daqiqa</span>
                        </span>
                      </div>
                    </div>

                    {/* Narx va Savatga qo'shish */}
                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] text-gray-400 block">
                          Narxi:
                        </span>
                        <span className="font-heading font-black text-lg text-white">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      {countInCart > 0 ? (
                        <div className="flex items-center gap-1.5 bg-[#FF7A00] p-1 rounded-xl text-black">
                          <button
                            onClick={() =>
                              onAddToCart({ ...item, quantity: -1 })
                            }
                            className="w-7 h-7 rounded-lg bg-black/20 hover:bg-black/40 flex items-center justify-center font-bold text-sm transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-black text-xs px-2">
                            {countInCart}
                          </span>
                          <button
                            onClick={() =>
                              onAddToCart({ ...item, quantity: 1 })
                            }
                            className="w-7 h-7 rounded-lg bg-black/20 hover:bg-black/40 flex items-center justify-center font-bold text-sm transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => onAddToCart({ ...item, quantity: 1 })}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9E00] text-black font-extrabold text-xs shadow-md shadow-orange-500/20 hover:brightness-110 active:scale-95 transition"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Savatga</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 p-8 rounded-3xl bg-white/5 border border-white/10">
            <span className="text-4xl">🔍</span>
            <h3 className="mt-4 font-heading font-bold text-lg text-white">
              Hech narsa topilmadi
            </h3>
            <p className="mt-1 text-xs text-gray-400">
              Qidiruv so‘zini o‘zgartiring yoki boshqa toifani tanlang.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition"
            >
              Barcha taomlarni ko‘rsatish
            </button>
          </div>
        )}
      </div>

      {/* Taom haqida batafsil modal */}
      {selectedItemDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#1C130D] border border-orange-500/30 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedItemDetail(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition"
            >
              ✕
            </button>

            <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-4 relative shadow-xl border border-white/10">
              <img
                src={selectedItemDetail.image}
                alt={selectedItemDetail.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C130D] via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="text-center">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                100% Halol Kafolatlangan
              </span>
              <h3 className="font-heading font-black text-xl text-white mt-2">
                {selectedItemDetail.name}
              </h3>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                {selectedItemDetail.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 my-5">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] text-gray-400">
                  Energetik qiymat
                </span>
                <div className="font-bold text-sm text-white">
                  {selectedItemDetail.calories} Kkal
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-[10px] text-gray-400">
                  Tayyorlanish muddati
                </span>
                <div className="font-bold text-sm text-white">
                  ~{selectedItemDetail.prepTime} daqiqa
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <span className="text-[10px] text-gray-400 block">Narxi:</span>
                <span className="font-heading font-black text-xl text-[#FFB800]">
                  {formatPrice(selectedItemDetail.price)}
                </span>
              </div>

              <button
                onClick={() => {
                  onAddToCart({ ...selectedItemDetail, quantity: 1 });
                  setSelectedItemDetail(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9E00] text-black font-extrabold text-xs shadow-lg shadow-orange-500/20 hover:brightness-110 transition"
              >
                Savatga qo‘shish
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
