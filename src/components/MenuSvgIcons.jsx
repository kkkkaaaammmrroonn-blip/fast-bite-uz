export function FoodIllustration({ type, className = 'w-full h-full' }) {
  switch (type) {
    case 'lavash':
    case 'lavash_cheese':
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <defs>
            <linearGradient id="lavashBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9E79F" />
              <stop offset="60%" stopColor="#E59866" />
              <stop offset="100%" stopColor="#BA4A00" />
            </linearGradient>
            <linearGradient id="grillMark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6E2C00" />
              <stop offset="100%" stopColor="#4A1E0D" />
            </linearGradient>
          </defs>
          {/* Soyabon soya */}
          <ellipse cx="100" cy="140" rx="80" ry="14" fill="#000000" opacity="0.3" />
          
          {/* Lavash o'ramasi - diagonal qizdirilgan */}
          <g transform="rotate(-15 100 80)">
            <rect x="30" y="50" width="140" height="58" rx="29" fill="url(#lavashBody)" stroke="#873600" strokeWidth="2" />
            
            {/* Tandir panjara izlari */}
            <line x1="50" y1="52" x2="68" y2="106" stroke="url(#grillMark)" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="75" y1="52" x2="93" y2="106" stroke="url(#grillMark)" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="100" y1="52" x2="118" y2="106" stroke="url(#grillMark)" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="125" y1="52" x2="143" y2="106" stroke="url(#grillMark)" strokeWidth="4.5" strokeLinecap="round" />

            {/* Kesilgan uchi va ichidagi go'sht/sabzavotlar */}
            <ellipse cx="165" cy="79" rx="12" ry="26" fill="#873600" />
            <ellipse cx="163" cy="79" rx="10" ry="24" fill="#581845" />
            {/* Ichidagi masalliqlar */}
            <circle cx="163" cy="72" r="4" fill="#E74C3C" />
            <circle cx="163" cy="85" r="4.5" fill="#2ECC71" />
            <ellipse cx="162" cy="79" rx="3.5" ry="5.5" fill={type === 'lavash_cheese' ? '#F4D03F' : '#922B21'} />
          </g>
        </svg>
      );

    case 'big_burger':
    case 'cheeseburger':
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <defs>
            <linearGradient id="burgerBun" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E59866" />
              <stop offset="100%" stopColor="#A04000" />
            </linearGradient>
            <linearGradient id="burgerCheese" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F4D03F" />
              <stop offset="100%" stopColor="#F39C12" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="142" rx="75" ry="12" fill="#000000" opacity="0.4" />
          
          {/* Pastki non */}
          <path d="M 35,115 C 35,135 60,138 100,138 C 140,138 165,135 165,115 Z" fill="url(#burgerBun)" />
          
          {/* Salat bargi */}
          <path d="M 28,110 Q 50,118 70,110 Q 95,120 125,110 Q 150,118 172,110 Q 170,118 160,122 L 40,122 Z" fill="#27AE60" />
          
          {/* 1-Kotlet */}
          <rect x="32" y="96" width="136" height="15" rx="7" fill="#4E342E" />
          
          {/* Pishloq */}
          <path d="M 32,98 L 168,98 L 155,108 L 140,100 L 125,112 L 105,100 L 80,112 L 60,100 L 40,108 Z" fill="url(#burgerCheese)" />

          {type === 'big_burger' && (
            <>
              {/* O'rta non va 2-kotlet */}
              <rect x="34" y="80" width="132" height="14" rx="6" fill="#3E2723" />
              {/* Pomidor */}
              <ellipse cx="70" cy="76" rx="28" ry="6" fill="#E74C3C" />
              <ellipse cx="130" cy="76" rx="28" ry="6" fill="#E74C3C" />
            </>
          )}

          {/* Yuqori non */}
          <path d="M 30,72 C 30,24 60,18 100,18 C 140,18 170,24 170,72 Z" fill="url(#burgerBun)" />
          {/* Kunchutlar */}
          <circle cx="70" cy="42" r="2" fill="#FFF9C4" />
          <circle cx="100" cy="32" r="2.2" fill="#FFF9C4" />
          <circle cx="130" cy="40" r="2" fill="#FFF9C4" />
          <circle cx="85" cy="54" r="2" fill="#FFF9C4" />
          <circle cx="115" cy="52" r="2" fill="#FFF9C4" />
          <circle cx="145" cy="58" r="1.8" fill="#FFF9C4" />
        </svg>
      );

    case 'hotdog':
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <ellipse cx="100" cy="138" rx="80" ry="12" fill="#000000" opacity="0.35" />
          <g transform="rotate(-10 100 80)">
            {/* Non */}
            <rect x="25" y="60" width="150" height="42" rx="21" fill="#D35400" />
            <rect x="30" y="63" width="140" height="36" rx="18" fill="#E59866" />
            {/* Sosiska */}
            <rect x="15" y="70" width="170" height="22" rx="11" fill="#922B21" />
            <ellipse cx="20" cy="81" rx="4" ry="9" fill="#78281F" />
            {/* Xantal va ketchub to'lqini */}
            <path d="M 28,81 Q 45,72 60,81 Q 75,90 90,81 Q 105,72 120,81 Q 135,90 150,81 Q 165,72 175,81" stroke="#F1C40F" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <path d="M 32,83 Q 48,90 64,83 Q 80,74 96,83 Q 112,92 128,83 Q 144,74 160,83" stroke="#C0392B" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Qarsildoq piyoz sepmalari */}
            <circle cx="65" cy="74" r="2" fill="#F39C12" />
            <circle cx="105" cy="74" r="2.2" fill="#F39C12" />
            <circle cx="140" cy="74" r="2" fill="#F39C12" />
          </g>
        </svg>
      );

    case 'sandwich':
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <ellipse cx="100" cy="140" rx="75" ry="12" fill="#000000" opacity="0.35" />
          {/* Uchburchak sendvichlar */}
          <polygon points="30,125 150,30 170,125" fill="#D35400" />
          <polygon points="35,122 148,36 165,122" fill="#F5CBA7" />
          
          {/* Ichki qatlamlar */}
          <line x1="45" y1="112" x2="162" y2="112" stroke="#27AE60" strokeWidth="5" />
          <line x1="55" y1="102" x2="158" y2="102" stroke="#922B21" strokeWidth="5" />
          <line x1="68" y1="92" x2="155" y2="92" stroke="#F1C40F" strokeWidth="5" />
          <line x1="82" y1="82" x2="152" y2="82" stroke="#E74C3C" strokeWidth="5" />
          <line x1="98" y1="72" x2="150" y2="72" stroke="#E59866" strokeWidth="5" />
          {/* Zaytunli tishkovlagich (toothpick) */}
          <line x1="120" y1="18" x2="120" y2="70" stroke="#7F8C8D" strokeWidth="3" />
          <circle cx="120" cy="22" r="7" fill="#196F3D" />
          <circle cx="120" cy="22" r="3" fill="#E74C3C" />
        </svg>
      );

    case 'fries':
    case 'cheese_fries':
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <ellipse cx="100" cy="142" rx="65" ry="12" fill="#000000" opacity="0.35" />
          
          {/* Qizil/Qora quti orqasi */}
          <polygon points="55,80 145,80 135,138 65,138" fill="#900C3F" />

          {/* Oltin fri tayoqchalari */}
          {[
            [65, 30, -14], [78, 22, -8], [90, 18, 0], [105, 18, 5],
            [120, 24, 12], [132, 34, 18], [72, 45, -10], [86, 38, -2],
            [100, 36, 4], [115, 42, 10], [80, 60, -5], [108, 58, 6]
          ].map(([x, y, rot], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width="9"
              height="60"
              rx="3"
              transform={`rotate(${rot} ${x + 4} ${y + 30})`}
              fill="#F4D03F"
              stroke="#D68910"
              strokeWidth="1.2"
            />
          ))}

          {/* Quti old tomoni (Fast Bite brendi bilan) */}
          <polygon points="50,75 150,75 138,140 62,140" fill="#E74C3C" stroke="#C0392B" strokeWidth="1.5" />
          <circle cx="100" cy="106" r="18" fill="#FFB800" />
          <path d="M 94,114 Q 100,98 106,114 Z" fill="#900C3F" />
          <text x="100" y="110" textAnchor="middle" fill="#900C3F" fontSize="10" fontWeight="900" fontFamily="sans-serif">FB</text>

          {/* Sirli bo'lsa erigan cheddar sousi */}
          {type === 'cheese_fries' && (
            <path
              d="M 54,78 Q 70,95 85,78 Q 100,98 115,80 Q 130,95 146,78 L 140,90 Q 120,105 100,94 Q 80,105 60,88 Z"
              fill="#F39C12"
            />
          )}
        </svg>
      );

    case 'pepsi':
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <ellipse cx="100" cy="144" rx="45" ry="10" fill="#000000" opacity="0.35" />
          
          {/* Banka / Stakan tanasi */}
          <rect x="70" y="32" width="60" height="106" rx="10" fill="#004B93" stroke="#002D5A" strokeWidth="2" />
          
          {/* Ustki qopqoq va naycha */}
          <ellipse cx="100" cy="32" rx="30" ry="7" fill="#BDC3C7" />
          <path d="M 108,30 L 126,6 L 140,10" stroke="#FF5722" strokeWidth="5" strokeLinecap="round" fill="none" />
          
          {/* Pepsi aylana logotipi */}
          <circle cx="100" cy="85" r="22" fill="#FFFFFF" />
          <path d="M 80,85 C 80,72 90,70 100,75 C 110,80 120,74 120,85 C 120,74 110,63 100,63 C 90,63 80,74 80,85 Z" fill="#E74C3C" />
          <path d="M 80,85 C 80,98 90,98 100,95 C 110,92 120,98 120,85 C 120,96 110,107 100,107 C 90,107 80,96 80,85 Z" fill="#004B93" />
          
          {/* Muzdek terlash tomchilari */}
          <circle cx="78" cy="55" r="1.5" fill="#E8F8F5" opacity="0.8" />
          <circle cx="122" cy="65" r="1.8" fill="#E8F8F5" opacity="0.8" />
          <circle cx="82" cy="115" r="2" fill="#E8F8F5" opacity="0.8" />
          <circle cx="118" cy="110" r="1.5" fill="#E8F8F5" opacity="0.8" />
        </svg>
      );

    case 'mojito':
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <ellipse cx="100" cy="144" rx="42" ry="9" fill="#000000" opacity="0.3" />
          
          {/* Shaffof baland bokal */}
          <path d="M 72,25 L 78,138 Q 100,144 122,138 L 128,25 Z" fill="#A3E4D7" fillOpacity="0.35" stroke="#48C9B0" strokeWidth="2" />
          
          {/* Ichidagi moxito suyuqligi */}
          <path d="M 74,45 L 78,136 Q 100,142 122,136 L 126,45 Z" fill="#D4EFDF" fillOpacity="0.55" />
          
          {/* Yalpiz barglari */}
          <ellipse cx="90" cy="65" rx="14" ry="7" transform="rotate(-30 90 65)" fill="#27AE60" />
          <ellipse cx="110" cy="95" rx="16" ry="8" transform="rotate(25 110 95)" fill="#1E8449" />
          
          {/* Laym doirasi */}
          <circle cx="100" cy="78" r="16" fill="#A9DFBF" stroke="#229954" strokeWidth="2.5" />
          <circle cx="100" cy="78" r="7" fill="#E8F8F5" />

          {/* Naycha (Straw) */}
          <line x1="90" y1="130" x2="135" y2="8" stroke="#F39C12" strokeWidth="5" strokeLinecap="round" />
          
          {/* Gaz pufakchalari */}
          <circle cx="95" cy="115" r="2" fill="#FFFFFF" opacity="0.8" />
          <circle cx="105" cy="125" r="1.5" fill="#FFFFFF" opacity="0.8" />
          <circle cx="88" cy="85" r="2.5" fill="#FFFFFF" opacity="0.8" />
        </svg>
      );

    case 'tea':
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <ellipse cx="100" cy="142" rx="60" ry="11" fill="#000000" opacity="0.3" />
          {/* Likopcha */}
          <ellipse cx="100" cy="132" rx="65" ry="12" fill="#2C3E50" stroke="#BDC3C7" strokeWidth="1.5" />
          {/* Piyola */}
          <path d="M 55,65 C 55,120 70,128 100,128 C 130,128 145,120 145,65 Z" fill="#34495E" stroke="#BDC3C7" strokeWidth="2" />
          {/* Oltin choy sathi */}
          <ellipse cx="100" cy="68" rx="42" ry="12" fill="#D35400" />
          {/* Limon bo'lagi */}
          <ellipse cx="105" cy="68" rx="18" ry="8" fill="#F4D03F" stroke="#F39C12" strokeWidth="1.5" />
          {/* Bug' to'lqinlari */}
          <path d="M 85,50 Q 80,35 90,20" stroke="#BDC3C7" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
          <path d="M 100,48 Q 108,30 98,15" stroke="#BDC3C7" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
          <path d="M 115,50 Q 122,35 112,20" stroke="#BDC3C7" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
        </svg>
      );

    case 'shaurma':
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <ellipse cx="100" cy="140" rx="70" ry="12" fill="#000000" opacity="0.3" />
          <g transform="rotate(-20 100 80)">
            <rect x="40" y="52" width="120" height="52" rx="26" fill="#F5CBA7" stroke="#BA4A00" strokeWidth="2" />
            <line x1="60" y1="54" x2="72" y2="102" stroke="#A04000" strokeWidth="4" strokeLinecap="round" />
            <line x1="85" y1="54" x2="97" y2="102" stroke="#A04000" strokeWidth="4" strokeLinecap="round" />
            <line x1="110" y1="54" x2="122" y2="102" stroke="#A04000" strokeWidth="4" strokeLinecap="round" />
            {/* O'ralgan qog'oz (wrapping) */}
            <rect x="40" y="70" width="75" height="34" rx="6" fill="#E74C3C" opacity="0.9" />
          </g>
        </svg>
      );

    case 'combo2':
    case 'combo4':
    case 'combo6':
    default:
      return (
        <svg viewBox="0 0 200 160" className={className}>
          <ellipse cx="100" cy="142" rx="80" ry="14" fill="#000000" opacity="0.4" />
          {/* Stakan (ichimlik) orqada */}
          <rect x="122" y="42" width="36" height="65" rx="6" fill="#004B93" />
          <line x1="140" y1="42" x2="152" y2="20" stroke="#FF5722" strokeWidth="4" strokeLinecap="round" />
          
          {/* Fri qutisi */}
          <polygon points="50,75 88,75 80,122 58,122" fill="#E74C3C" />
          <rect x="58" y="55" width="5" height="30" fill="#F4D03F" />
          <rect x="66" y="50" width="5" height="35" fill="#F4D03F" />
          <rect x="74" y="56" width="5" height="30" fill="#F4D03F" />

          {/* Asosiy burger oldinda */}
          <path d="M 72,122 C 72,132 85,134 110,134 C 135,134 148,132 148,122 Z" fill="#D35400" />
          <rect x="70" y="112" width="80" height="9" rx="4" fill="#4E342E" />
          <path d="M 70,113 L 150,113 L 138,120 L 120,114 L 100,120 L 80,114 Z" fill="#F4D03F" />
          <path d="M 68,106 C 68,78 85,74 110,74 C 135,74 152,78 152,106 Z" fill="#E59866" />
          <circle cx="95" cy="88" r="1.5" fill="#FFF9C4" />
          <circle cx="115" cy="85" r="1.5" fill="#FFF9C4" />
          <circle cx="130" cy="92" r="1.5" fill="#FFF9C4" />

          {/* Combo nishoni */}
          <circle cx="160" cy="40" r="18" fill="#FF7A00" />
          <text x="160" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">SET</text>
        </svg>
      );
  }
}
