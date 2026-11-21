import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Minus, 
  RotateCcw, 
  Flame, 
  Clock, 
  ShoppingBag, 
  Users, 
  ShieldCheck, 
  Sparkles,
  Layers,
  ChevronRight,
  Eye,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  INGREDIENTS, 
  PRESETS, 
  BASE_BUN_PRICE, 
  BASE_BUN_CALORIES, 
  BASE_BUN_TIME 
} from '../data/burgerIngredients';
import { 
  TopBunSvg, 
  BottomBunSvg, 
  RenderLayerSvg 
} from './BurgerSvgLayers';
import { formatPrice } from '../utils/formatters';

export function BurgerBuilder({ onAddToCart, onOpenSplitBill, onOpenHalalModal }) {
  // Tanlangan qatlamlar massivi (tartibi bilan)
  const [layers, setLayers] = useState([
    'lettuce',
    'tomato',
    'beef_patty',
    'cheddar',
    'pickles',
    'fried_onion',
  ]);

  // Portlagan (Exploded 3D) ko'rinish rejimi
  const [isExploded, setIsExploded] = useState(true);
  const [selectedPreset, setSelectedPreset] = useState('toshkent_klassik');
  const [justAddedId, setJustAddedId] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 18, y: -y * 18 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Masalliqlar soni hisobi
  const ingredientCounts = useMemo(() => {
    const counts = {};
    INGREDIENTS.forEach((ing) => {
      counts[ing.id] = layers.filter((id) => id === ing.id).length;
    });
    return counts;
  }, [layers]);

  // Jami summa, kaloriyalar va tayyorlash vaqti
  const { totalPrice, totalCalories, totalPrepTime } = useMemo(() => {
    let price = BASE_BUN_PRICE;
    let cal = BASE_BUN_CALORIES;
    let time = BASE_BUN_TIME;

    layers.forEach((id) => {
      const ing = INGREDIENTS.find((i) => i.id === id);
      if (ing) {
        price += ing.price;
        cal += ing.calories;
        time += ing.prepTime;
      }
    });

    return {
      totalPrice: price,
      totalCalories: cal,
      totalPrepTime: Math.min(time, 25), // maksimal 25 daqiqa
    };
  }, [layers]);

  // Masalliq qo'shish
  const handleAddIngredient = (id) => {
    if (layers.length >= 14) {
      alert("Maksimal 14 ta qatlam qo'shish mumkin!");
      return;
    }
    setLayers((prev) => [...prev, id]);
    setSelectedPreset(null);
    setJustAddedId(id);
    setTimeout(() => setJustAddedId(null), 800);
  };

  // Masalliqni oxirgisini ayirish
  const handleRemoveIngredient = (id) => {
    const lastIndex = layers.lastIndexOf(id);
    if (lastIndex !== -1) {
      const newLayers = [...layers];
      newLayers.splice(lastIndex, 1);
      setLayers(newLayers);
      setSelectedPreset(null);
    }
  };

  // Muayyan indeksdagi qatlamni o'chirish
  const handleRemoveLayerAtIndex = (index) => {
    const newLayers = [...layers];
    newLayers.splice(index, 1);
    setLayers(newLayers);
    setSelectedPreset(null);
  };

  // Retseptni yuklash
  const applyPreset = (preset) => {
    setSelectedPreset(preset.id);
    setLayers([...preset.ingredients]);
  };

  // Tozalash
  const handleReset = () => {
    setLayers([]);
    setSelectedPreset(null);
  };

  // Savatga qo'shish
  const handleAddToCartWithCelebration = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FF7A00', '#FFB800', '#10B981', '#FFFFFF'],
    });

    const customBurger = {
      id: `custom_burger_${Date.now()}`,
      name: `Maxsus Mualliflik Burgeri`,
      category: 'burgers',
      price: totalPrice,
      calories: totalCalories,
      prepTime: totalPrepTime,
      isCustom: true,
      layers: [...layers],
      description: layers.length > 0
        ? `${layers.map((id) => INGREDIENTS.find((i) => i.id === id)?.name).filter(Boolean).join(', ')}`
        : 'Faqat kunchutli briosh bulochkasi',
      quantity: 1,
    };

    onAddToCart(customBurger);
  };

  return (
    <section id="builder" className="relative pt-6 pb-20 overflow-hidden">
      {/* Orqa fon nur dog'lari (Ambient glow orbs) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#FF7A00]/15 via-orange-950/20 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/10 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Yuqori kichik xabar / Trust banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-bold">100% Halol Go‘sht</span>
            <span className="text-gray-500">•</span>
            <span>Toshkent bo‘ylab 30 daqiqada yetkazib berish</span>
          </div>

          <button
            onClick={onOpenHalalModal}
            className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sertifikatni tekshirish</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Ustunli asosiy tuzilma */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================
              1-USTUN (Chap): Sarlavha, Ta'rif va Tayyor retseptlar
              ======================================================== */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-orange-500/20 text-[#FFB800] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interaktiv Konstruktor</span>
              </div>
              
              <h1 className="font-heading font-black text-3xl sm:text-4xl xl:text-5xl tracking-tight text-white uppercase leading-[1.1]">
                BURGERINGNI <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] via-[#FF9E00] to-[#FFB800]">
                  NOLDAN YIG‘!
                </span>
              </h1>
              
              <p className="mt-4 text-sm text-gray-300 leading-relaxed">
                100% halol va barra masalliqlardan o‘zingizga mos mukammal burgerni yarating! Har bir qatlamni o‘zingiz nazorat qiling.
              </p>
            </div>

            {/* Tayyor retseptlar bo'limi */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <span className="font-heading font-extrabold text-xs uppercase tracking-wider text-gray-300">
                  ⚡ Tayyor retseptlar
                </span>
                <span className="text-[11px] text-gray-400">4 ta variant</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {PRESETS.map((preset) => {
                  const isSelected = selectedPreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset)}
                      className={`text-left p-3 rounded-xl border transition-all duration-200 group ${
                        isSelected
                          ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/10 border-[#FF7A00] shadow-lg shadow-orange-500/10'
                          : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-heading font-bold text-xs uppercase tracking-wide ${
                          isSelected ? 'text-[#FFB800]' : 'text-white group-hover:text-orange-400'
                        }`}>
                          {preset.name}
                        </span>
                        {isSelected ? (
                          <div className="w-4 h-4 rounded-full bg-[#FF7A00] flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-black stroke-[3]" />
                          </div>
                        ) : (
                          <span className="text-[10px] text-gray-500 group-hover:text-gray-300">Tanlash</span>
                        )}
                      </div>
                      <p className="mt-1 text-[11px] text-gray-400 line-clamp-2 leading-snug">
                        {preset.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Afzalliklar */}
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Bekon o‘rniga toza Halol dudlangan mol go‘shti</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-500/20 text-[#FF7A00] flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Har kuni tongda pishiriladigan briosh bulochka</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">✓</span>
                <span>Shveytsariya texnologiyasidagi sariq Cheddar</span>
              </div>
            </div>

          </div>

          {/* ========================================================
              2-USTUN (O'rta): Exploded 3D Burger ko'rinishi & Vizual
              ======================================================== */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Yuqori boshqaruv paneli */}
            <div className="w-full flex items-center justify-between px-3 py-2 rounded-2xl bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExploded(!isExploded)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    isExploded 
                      ? 'bg-[#FF7A00] text-black font-bold shadow-md shadow-orange-500/30' 
                      : 'bg-white/10 text-gray-300 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isExploded ? '3D Portlatilgan ko‘rinish' : 'Ixcham ko‘rinish'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-400 font-medium">
                  {layers.length} ta qatlam
                </span>
                <button
                  onClick={handleReset}
                  title="Qayta yig'ish"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-gray-300 text-xs transition"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Tozalash</span>
                </button>
              </div>
            </div>

            {/* Asosiy burger stend konteyneri */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full min-h-[460px] sm:min-h-[520px] flex flex-col items-center justify-center p-4 rounded-3xl bg-gradient-to-b from-[#1C130D]/70 to-[#0F0C0A]/90 border border-orange-500/20 shadow-2xl backdrop-blur-xl overflow-hidden cursor-crosshair"
            >
              
              {/* Orqa fon radial nur va dekorativ pishloq/olov elementlari */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent pointer-events-none" />
              
              {/* Burger tagidagi poydevor (stend nuri) */}
              <div className="absolute bottom-6 w-64 h-8 bg-black/60 rounded-[100%] blur-md pointer-events-none" />
              <div className="absolute bottom-8 w-48 h-4 bg-orange-500/20 rounded-[100%] blur-sm pointer-events-none" />

              {/* Burger qatlamlari stacki (3D Parallax Tilt) */}
              <motion.div 
                animate={{ rotateX: tilt.y, rotateY: tilt.x }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                style={{ perspective: 1000 }}
                className="relative w-full max-w-[320px] flex flex-col items-center z-10 py-4"
              >
                
                {/* 1. YUQORI NON (Top Bun) */}
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  style={{ marginBottom: isExploded ? '18px' : '-22px' }}
                  animate={isExploded ? { y: [0, -3, 0] } : { y: 0 }}
                  transition={{ y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } }}
                  className="w-full relative z-30 group cursor-pointer"
                >
                  <TopBunSvg />
                  {isExploded && (
                    <div className="absolute -right-3 top-2 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition">
                      <div className="w-5 h-[1px] bg-orange-400/60" />
                      <div className="glass-panel px-2 py-0.5 rounded-full text-[10px] font-bold text-[#FFB800] border border-orange-500/30 whitespace-nowrap shadow-sm">
                        Kunchutli Briosh
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* 2. O'RTA QATAMLAR (Dynamic layers) */}
                <div className="w-full flex flex-col-reverse items-center relative z-20">
                  <AnimatePresence initial={false}>
                    {layers.map((layerId, index) => {
                      const ing = INGREDIENTS.find((i) => i.id === layerId);
                      const isEven = index % 2 === 0;

                      return (
                        <motion.div
                          key={`${layerId}_${index}`}
                          layout
                          initial={{ opacity: 0, y: -45, scale: 0.8 }}
                          animate={{ 
                            opacity: 1, 
                            y: isExploded ? [0, -2.5, 0] : 0, 
                            scale: 1 
                          }}
                          exit={{ opacity: 0, scale: 0.5, y: 20 }}
                          transition={{ 
                            y: {
                              duration: 3 + (index * 0.3),
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: index * 0.15,
                            },
                            type: 'spring', 
                            stiffness: 450, 
                            damping: 28 
                          }}
                          style={{
                            marginBottom: isExploded ? '14px' : '-24px',
                            zIndex: 20 + index,
                          }}
                          className="w-full relative group cursor-pointer"
                          onClick={() => handleRemoveLayerAtIndex(index)}
                          title="O'chirish uchun ustiga bosing"
                        >
                          {/* Svg qatlami */}
                          <div className="w-full transform group-hover:scale-[1.03] transition-transform">
                            <RenderLayerSvg ingredientId={layerId} />
                          </div>

                          {/* Floating pointer tag with price in Exploded mode */}
                          {isExploded && ing && (
                            <motion.div
                              initial={{ opacity: 0, x: isEven ? 10 : -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none ${
                                isEven ? '-right-6 sm:-right-8' : '-left-6 sm:-left-8 flex-row-reverse'
                              }`}
                            >
                              <div className="relative flex items-center justify-center shrink-0">
                                <span className="w-2 h-2 rounded-full bg-[#FF7A00]" />
                                <span className="absolute w-4 h-4 rounded-full bg-[#FF7A00]/50 animate-radar pointer-events-none" />
                              </div>
                              <div className="w-4 sm:w-6 h-[1px] bg-orange-400/50" />
                              <div className="glass-panel px-2 py-0.5 rounded-lg border border-white/10 text-[10px] text-gray-200 whitespace-nowrap shadow-lg flex items-center gap-1 bg-[#1A120D]/90 backdrop-blur-md">
                                <span className="font-semibold text-white">{ing.name}</span>
                                <span className="text-[#FFB800] font-bold">+{formatPrice(ing.price)}</span>
                              </div>
                            </motion.div>
                          )}

                          {/* O'chirish ko'rsatkichi (hoverda ko'rinadi) */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40 rounded-xl pointer-events-none">
                            <span className="text-[10px] font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded-md border border-red-500/40">
                              ✕ Olib tashlash
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* 3. PASTKI NON (Bottom Bun) */}
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="w-full relative z-10 group"
                  style={{ marginTop: isExploded ? '10px' : '-22px' }}
                >
                  <BottomBunSvg />
                  {isExploded && (
                    <div className="absolute -left-3 bottom-2 flex items-center gap-1.5 flex-row-reverse opacity-90 group-hover:opacity-100 transition">
                      <div className="w-5 h-[1px] bg-orange-400/60" />
                      <div className="glass-panel px-2 py-0.5 rounded-full text-[10px] font-bold text-gray-300 border border-white/10 whitespace-nowrap shadow-sm">
                        Qovurilgan asos ({formatPrice(BASE_BUN_PRICE)})
                      </div>
                    </div>
                  )}
                </motion.div>

              </motion.div>

              {/* Bo'sh holat ko'rsatkichi */}
              {layers.length === 0 && (
                <div className="mt-4 text-center z-20">
                  <p className="text-xs text-orange-400 font-semibold">
                    Masalliqlar tanlanmagan. O‘ng tomondan istagan masalliqlarni qo‘shing!
                  </p>
                </div>
              )}
            </div>

            {/* Maslahat */}
            <p className="mt-3 text-[11px] text-gray-500 text-center">
              💡 Maslahat: Har bir qatlam ustiga bosib uni o‘chirishingiz mumkin.
            </p>

          </div>

          {/* ========================================================
              3-USTUN (O'ng): Masalliqlar paneli va Jonli hisob-kitob
              ======================================================== */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* KARTA 1: Masalliqlar qo'shish */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center text-[#FF7A00]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-sm uppercase tracking-wide text-white">
                      Masalliqlar qo‘shish
                    </h3>
                    <p className="text-[10px] text-emerald-400 font-medium">100% Halol sertifikatlangan</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-400">
                  {layers.length} / 14
                </span>
              </div>

              {/* 10 ta masalliq ro'yxati */}
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {INGREDIENTS.map((ing) => {
                  const count = ingredientCounts[ing.id] || 0;
                  const isJustAdded = justAddedId === ing.id;

                  return (
                    <div
                      key={ing.id}
                      className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all duration-200 ${
                        count > 0 
                          ? 'bg-[#1F1610] border-orange-500/30 shadow-sm' 
                          : 'bg-black/20 border-white/5 hover:border-white/15'
                      } ${isJustAdded ? 'scale-[1.02] border-[#FF7A00]' : ''}`}
                    >
                      {/* Masalliq belgisi va ma'lumoti */}
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xl shrink-0 p-1 rounded-xl bg-white/5 border border-white/10">
                          {ing.icon}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-xs text-white truncate">
                              {ing.name}
                            </span>
                            {count > 0 && (
                              <span className="px-1.5 py-0.2 rounded-full bg-[#FF7A00] text-black font-black text-[10px]">
                                {count}x
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-gray-400">
                            <span className="text-[#FFB800] font-bold">+{formatPrice(ing.price)}</span>
                            <span>•</span>
                            <span>{ing.calories} kkal</span>
                          </div>
                        </div>
                      </div>

                      {/* Tugmalar (+ / -) */}
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        {count > 0 && (
                          <button
                            onClick={() => handleRemoveIngredient(ing.id)}
                            className="w-7 h-7 rounded-xl bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-red-400 flex items-center justify-center transition"
                            title="Ayirish"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleAddIngredient(ing.id)}
                          className="w-7 h-7 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9E00] text-black font-extrabold flex items-center justify-center hover:brightness-110 active:scale-95 transition shadow-sm shadow-orange-500/20"
                          title="Qo'shish"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* KARTA 2: Jonli hisob-kitob (Live Summary) */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#241710] to-[#140D09] border border-orange-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400">
                  Hisob-kitob
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-[10px] font-bold text-emerald-400">
                  Tayyorlashga tayyor
                </span>
              </div>

              {/* Kaloriya va Vaqt ko'rsatkichlari */}
              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-gray-400">Umumiy energiya</div>
                    <div className="text-xs font-bold text-white">{totalCalories} Kkal</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-gray-400">Tayyorlanish vaqti</div>
                    <div className="text-xs font-bold text-white">~{totalPrepTime} daqiqa</div>
                  </div>
                </div>
              </div>

              {/* Jami narx (so'mda) */}
              <div className="my-3 flex items-baseline justify-between">
                <span className="text-xs text-gray-300 font-medium">Jami summa:</span>
                <div className="text-right">
                  <div className="font-heading font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FFB800]">
                    {formatPrice(totalPrice)}
                  </div>
                  <span className="text-[10px] text-gray-500">Briosh bulochkasi kiritilgan</span>
                </div>
              </div>

              {/* 2 ta Asosiy Harakat Tugmalari */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleAddToCartWithCelebration}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FF7A00] via-[#FF8C00] to-[#FFB800] text-black font-heading font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:brightness-110 active:scale-98 transition cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  <span>Savatga qo‘shish</span>
                </button>

                <button
                  onClick={() => onOpenSplitBill(totalPrice, "Maxsus Mualliflik Burgeri")}
                  className="w-full py-2.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 font-semibold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Users className="w-4 h-4 text-[#FF7A00]" />
                  <span>Do‘stlar bilan hisobni bo‘lish</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
