import { useState } from 'react';
import { 
  Flame, 
  ShoppingBag, 
  Search, 
  PhoneCall, 
  MapPin, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { CITIES } from '../data/menuData';

export function Navbar({ 
  cartCount = 0, 
  onOpenCart, 
  searchQuery, 
  setSearchQuery,
  onOpenHalalModal,
  selectedCity,
  setSelectedCity,
  activeSection,
  setActiveSection
}) {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'builder', label: "O'z burgeringni yarat!", isPill: true },
    { id: 'menu', label: 'Menyu', isPill: false },
    { id: 'combos', label: 'Ulfatlar Seti', isPill: false },
    { id: 'deals', label: 'Aksiyalar', isPill: false },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F0C0A]/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          
          {/* Chap qism: Logotip + 100% Halol nishoni + Shaxarlar menyusi */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button 
              onClick={() => handleNavClick('builder')}
              className="flex items-center gap-2.5 text-left group transition"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#FF7A00] to-[#FFB800] flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform duration-300">
                <Flame className="w-6 h-6 text-black fill-black animate-flame" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0F0C0A]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-black text-xl sm:text-2xl tracking-wider text-white">
                    FAST<span className="text-[#FF7A00]">BITE</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-[#FFB800] border border-orange-500/30">
                    UZ
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-medium tracking-tight hidden sm:block">
                  Toshkent tezkor fast-food
                </span>
              </div>
            </button>

            {/* 100% Halol ishonch nishoni */}
            <button
              onClick={onOpenHalalModal}
              title="Halol sertifikatini ko'rish"
              className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-semibold hover:bg-emerald-900/60 transition group cursor-pointer shadow-sm shadow-emerald-500/10"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>100% HALOL</span>
            </button>

            {/* Shahar tanlash dropdowni */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/40 text-xs text-gray-200 transition"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span className="font-medium">{selectedCity.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCityDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 py-1.5 rounded-xl bg-[#1C130D] border border-orange-500/20 shadow-2xl backdrop-blur-xl z-50">
                  <div className="px-3 py-1 text-[11px] font-semibold text-gray-400 border-b border-white/5">
                    Yetkazib berish shahri:
                  </div>
                  {CITIES.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => {
                        setSelectedCity(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-orange-500/15 transition ${
                        selectedCity.id === city.id ? 'text-[#FFB800] font-semibold bg-white/5' : 'text-gray-300'
                      }`}
                    >
                      <span>{city.name}</span>
                      <span className="text-[10px] text-gray-500">{city.time}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* O'rta qism: Navigatsiya havolalari */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              if (link.isPill) {
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFB800] text-black font-extrabold text-xs tracking-wide shadow-md shadow-orange-500/20 hover:brightness-110 transition transform active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </button>
                );
              }
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                    isActive 
                      ? 'text-white bg-white/10' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* O'ng qism: Qidiruv, Aloqa, Savat */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Jonli qidiruv inputi */}
            <div className="relative hidden lg:block w-44 xl:w-56">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Taom qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#FF7A00] transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Aloqa / Qaynoq liniya */}
            <a
              href="tel:+998712007777"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 hover:border-orange-500/40 hover:text-[#FFB800] transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span className="font-semibold">+998 71 200-77-77</span>
            </a>

            {/* Savat tugmasi */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9E00] text-black font-extrabold text-xs shadow-lg shadow-orange-500/25 hover:brightness-110 active:scale-95 transition"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Savat</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-black text-[#FFB800] font-black text-[11px] flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobil menyu tugmasi */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 xl:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobil menyu qavati */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#150E09] border-b border-white/10 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          {/* Mobil qidiruv */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Taom qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#FF7A00]"
            />
          </div>

          {/* Havolalar */}
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2.5 rounded-xl text-left text-xs font-semibold ${
                  link.isPill
                    ? 'bg-gradient-to-r from-[#FF7A00] to-[#FFB800] text-black font-black col-span-2 text-center'
                    : 'bg-white/5 text-gray-200 hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Shahar tanlash va Halol sertifikati */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF7A00]" />
              <span className="text-gray-300">Shahar:</span>
              <select
                value={selectedCity.id}
                onChange={(e) => {
                  const c = CITIES.find((item) => item.id === e.target.value);
                  if (c) setSelectedCity(c);
                }}
                className="bg-[#2A180E] text-white rounded-lg px-2 py-1 text-xs border border-white/10"
              >
                {CITIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenHalalModal();
              }}
              className="flex items-center gap-1 text-emerald-400 font-semibold"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>100% Halol</span>
            </button>
          </div>

          {/* Telefon qo'ng'irog'i */}
          <a
            href="tel:+998712007777"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-orange-400"
          >
            <PhoneCall className="w-4 h-4" />
            <span>+998 71 200-77-77 (Qaynoq liniya)</span>
          </a>
        </div>
      )}
    </header>
  );
}
