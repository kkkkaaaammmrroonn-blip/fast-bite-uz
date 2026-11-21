/**
 * Yuqori sifatli, vektorli va to'liq moslashuvchan burger qatlamlari
 */

export function TopBunSvg() {
  return (
    <svg viewBox="0 0 320 120" className="w-full h-auto drop-shadow-2xl">
      <defs>
        <linearGradient id="topBunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E2872A" />
          <stop offset="40%" stopColor="#C86A18" />
          <stop offset="85%" stopColor="#A24D0E" />
          <stop offset="100%" stopColor="#813C08" />
        </linearGradient>
        <radialGradient id="bunGloss" cx="40%" cy="25%" r="60%">
          <stop offset="0%" stopColor="#FFF1D6" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#E2872A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sesameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF4DE" />
          <stop offset="100%" stopColor="#DEC294" />
        </linearGradient>
      </defs>

      {/* Asosiy gumbazsimon bulochka */}
      <path
        d="M 20,105 C 20,40 75,12 160,12 C 245,12 300,40 300,105 C 300,114 285,116 160,116 C 35,116 20,114 20,105 Z"
        fill="url(#topBunGrad)"
      />

      {/* Yaltiroq yog'du */}
      <path
        d="M 25,102 C 25,45 78,16 160,16 C 242,16 295,45 295,102 C 275,106 185,108 160,108 C 135,108 45,106 25,102 Z"
        fill="url(#bunGloss)"
      />

      {/* Qovurilgan kunchut donachalari (Sesame seeds) */}
      {[
        [65, 55, 15], [90, 38, -20], [120, 26, 35], [155, 22, -10],
        [190, 25, 25], [225, 36, -30], [250, 52, 10], [80, 75, -15],
        [110, 56, 40], [135, 42, -5], [170, 40, 30], [200, 50, -25],
        [230, 70, 15], [100, 90, 10], [145, 68, -35], [178, 65, 20],
        [205, 82, -15], [70, 88, 30], [245, 86, -10], [130, 88, 15],
        [165, 85, -20], [188, 92, 5], [52, 70, -25], [268, 68, 20]
      ].map(([cx, cy, rot], i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx="4.2"
          ry="2.4"
          transform={`rotate(${rot} ${cx} ${cy})`}
          fill="url(#sesameGrad)"
          stroke="#935116"
          strokeWidth="0.6"
        />
      ))}
    </svg>
  );
}

export function BottomBunSvg() {
  return (
    <svg viewBox="0 0 320 70" className="w-full h-auto drop-shadow-xl">
      <defs>
        <linearGradient id="bottomBunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C97523" />
          <stop offset="40%" stopColor="#AC5A14" />
          <stop offset="100%" stopColor="#7E3A09" />
        </linearGradient>
      </defs>

      {/* Pastki non qatlami */}
      <path
        d="M 24,10 C 24,4 35,2 160,2 C 285,2 296,4 296,10 C 296,38 270,62 160,62 C 50,62 24,38 24,10 Z"
        fill="url(#bottomBunGrad)"
      />
      {/* Qovurilgan qirrasi */}
      <ellipse cx="160" cy="10" rx="136" ry="6" fill="#883E0A" opacity="0.6" />
      <ellipse cx="160" cy="8" rx="134" ry="4" fill="#DFA056" opacity="0.4" />
    </svg>
  );
}

export function BeefPattySvg() {
  return (
    <div className="relative w-full">
      {/* Grildan chiquvchi issiq bug' to'lqinlari (Steam trails) */}
      <div className="absolute -top-7 left-0 right-0 h-10 pointer-events-none flex justify-around px-8 overflow-visible z-30">
        <svg viewBox="0 0 40 40" className="w-6 h-6 animate-steam-1 text-orange-200/40">
          <path d="M 20,38 Q 12,25 24,15 Q 16,5 22,0" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 40 40" className="w-5 h-5 animate-steam-2 text-amber-200/35">
          <path d="M 18,38 Q 26,26 14,14 Q 24,4 18,0" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 40 40" className="w-6 h-6 animate-steam-3 text-orange-200/40">
          <path d="M 22,38 Q 14,24 26,12 Q 18,4 24,0" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <svg viewBox="0 0 320 60" className="w-full h-auto drop-shadow-xl relative z-10">
        <defs>
          <linearGradient id="beefGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#693318" />
            <stop offset="45%" stopColor="#4A1E0D" />
            <stop offset="100%" stopColor="#2E1107" />
          </linearGradient>
        </defs>

        {/* Kotlet tanasi - sershira mol go'shti */}
        <path
          d="M 18,22 C 16,14 30,10 160,10 C 290,10 304,14 302,22 C 304,36 295,50 160,50 C 25,50 16,36 18,22 Z"
          fill="url(#beefGrad)"
        />

        {/* Gril izlari (barbecue chiziqlari) */}
        <path
          d="M 50,15 L 75,45 M 95,12 L 125,48 M 145,11 L 175,49 M 195,12 L 225,48 M 245,15 L 270,45"
          stroke="#200B04"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Shiradorlik va ziravor nuqtalari */}
        {[
          [60, 28], [110, 22], [140, 36], [180, 24], [210, 38], [250, 26],
          [85, 34], [165, 18], [230, 20], [130, 25], [195, 32]
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.8" fill="#D48A54" opacity="0.7" />
        ))}
      </svg>
    </div>
  );
}

export function ChickenPattySvg() {
  return (
    <svg viewBox="0 0 320 60" className="w-full h-auto drop-shadow-xl">
      <defs>
        <linearGradient id="chickenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5B041" />
          <stop offset="45%" stopColor="#D68910" />
          <stop offset="100%" stopColor="#935116" />
        </linearGradient>
      </defs>

      {/* Qarsildoq qovurilgan tovuq filesi */}
      <path
        d="M 20,24 C 18,12 40,8 160,8 C 280,8 302,12 300,24 C 302,40 286,52 160,52 C 34,52 18,40 20,24 Z"
        fill="url(#chickenGrad)"
      />

      {/* Panko qarsildoq talqon to'lqinlari */}
      {[
        [45, 18], [75, 32], [115, 20], [150, 34], [190, 18], [230, 32], [270, 22],
        [60, 28], [95, 24], [135, 16], [175, 28], [210, 22], [250, 35]
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="5" ry="3" fill="#FAD7A0" opacity="0.8" />
      ))}
    </svg>
  );
}

export function SmokedBeefSvg() {
  return (
    <svg viewBox="0 0 320 48" className="w-full h-auto drop-shadow-lg">
      <defs>
        <linearGradient id="smokedGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#922B21" />
          <stop offset="35%" stopColor="#C0392B" />
          <stop offset="55%" stopColor="#F5B7B1" />
          <stop offset="70%" stopColor="#922B21" />
          <stop offset="100%" stopColor="#78281F" />
        </linearGradient>
        <linearGradient id="smokedGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#78281F" />
          <stop offset="40%" stopColor="#A93226" />
          <stop offset="65%" stopColor="#FADBD8" />
          <stop offset="85%" stopColor="#922B21" />
          <stop offset="100%" stopColor="#641E16" />
        </linearGradient>
      </defs>

      {/* 1-tasma dudlangan mol go'shti (Halol) */}
      <path
        d="M 22,22 C 60,6 100,28 150,14 C 200,4 250,26 298,12 C 300,20 285,28 245,26 C 195,24 150,38 95,28 C 50,20 24,30 22,22 Z"
        fill="url(#smokedGrad1)"
      />

      {/* 2-tasma qovurilgan dudlangan go'sht */}
      <path
        d="M 30,30 C 80,18 125,38 175,26 C 220,16 265,34 290,26 C 292,34 260,42 215,36 C 165,30 120,44 70,38 C 45,34 32,36 30,30 Z"
        fill="url(#smokedGrad2)"
      />
    </svg>
  );
}

export function CheddarSvg() {
  return (
    <svg viewBox="0 0 320 52" className="w-full h-auto drop-shadow-xl">
      <defs>
        <linearGradient id="cheeseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD13B" />
          <stop offset="50%" stopColor="#FFA000" />
          <stop offset="100%" stopColor="#E67E00" />
        </linearGradient>
      </defs>

      {/* Erigan cheddar pishlog'i - qirralari erib oqayotgan ko'rinishda */}
      <path
        d="M 22,12 C 80,14 160,10 298,12 C 302,24 292,38 280,36 C 265,34 255,48 245,46 C 235,44 230,28 200,26 C 180,24 175,44 160,45 C 145,46 140,28 115,26 C 90,24 85,50 72,50 C 60,50 55,30 40,32 C 26,34 20,24 22,12 Z"
        fill="url(#cheeseGrad)"
      />
      {/* Pishloq yaltiroqligi */}
      <path
        d="M 35,16 C 90,17 150,14 285,16"
        stroke="#FFF59D"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function PicklesSvg() {
  return (
    <svg viewBox="0 0 320 44" className="w-full h-auto drop-shadow-md">
      <defs>
        <radialGradient id="pickleGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A9DFBF" />
          <stop offset="70%" stopColor="#52BE80" />
          <stop offset="95%" stopColor="#196F3D" />
          <stop offset="100%" stopColor="#145A32" />
        </radialGradient>
      </defs>

      {/* 3 ta bodring parraklari */}
      {[
        [65, 22, -12],
        [160, 20, 5],
        [250, 23, 14]
      ].map(([cx, cy, rot], i) => (
        <g key={i} transform={`rotate(${rot} ${cx} ${cy})`}>
          <ellipse cx={cx} cy={cy} rx="42" ry="16" fill="url(#pickleGrad)" stroke="#145A32" strokeWidth="2.5" />
          {/* Ichki urug'lar va qovurg'alar */}
          <ellipse cx={cx} cy={cy} rx="26" ry="8" fill="none" stroke="#239B56" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx={cx - 12} cy={cy} r="1.5" fill="#145A32" />
          <circle cx={cx} cy={cy - 2} r="1.5" fill="#145A32" />
          <circle cx={cx + 12} cy={cy + 1} r="1.5" fill="#145A32" />
        </g>
      ))}
    </svg>
  );
}

export function FriedOnionSvg() {
  return (
    <svg viewBox="0 0 320 38" className="w-full h-auto drop-shadow-md">
      <defs>
        <linearGradient id="onionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5CBA7" />
          <stop offset="50%" stopColor="#D35400" />
          <stop offset="100%" stopColor="#873600" />
        </linearGradient>
      </defs>

      {/* Qarsildoq qovurilgan piyoz halqalari */}
      <path
        d="M 35,24 C 60,10 90,30 115,16 M 85,28 C 110,14 140,32 170,18 M 150,26 C 185,12 215,30 245,16 M 220,28 C 245,14 275,26 295,18"
        stroke="url(#onionGrad)"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 50,18 C 75,32 105,14 130,28 M 125,20 C 150,34 185,16 215,26 M 205,18 C 235,32 265,16 285,24"
        stroke="#BA4A00"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function JalapenoSvg() {
  return (
    <svg viewBox="0 0 320 42" className="w-full h-auto drop-shadow-md">
      <defs>
        <linearGradient id="jalapenoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2ECC71" />
          <stop offset="70%" stopColor="#27AE60" />
          <stop offset="100%" stopColor="#1E8449" />
        </linearGradient>
      </defs>

      {/* 3 ta achchiq xalapeno halqalari */}
      {[
        [70, 20, -10],
        [160, 22, 6],
        [248, 19, 12]
      ].map(([cx, cy, rot], i) => (
        <g key={i} transform={`rotate(${rot} ${cx} ${cy})`}>
          <ellipse cx={cx} cy={cy} rx="36" ry="14" fill="url(#jalapenoGrad)" stroke="#145A32" strokeWidth="3" />
          <ellipse cx={cx} cy={cy} rx="18" ry="6" fill="#145A32" opacity="0.6" />
          {/* Urug'lar */}
          <circle cx={cx - 7} cy={cy} r="1.6" fill="#F9E79F" />
          <circle cx={cx + 7} cy={cy - 1} r="1.6" fill="#F9E79F" />
        </g>
      ))}
    </svg>
  );
}

export function MushroomsSvg() {
  return (
    <svg viewBox="0 0 320 44" className="w-full h-auto drop-shadow-md">
      <defs>
        <linearGradient id="shroomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D7CCC8" />
          <stop offset="50%" stopColor="#A1887F" />
          <stop offset="100%" stopColor="#5D4037" />
        </linearGradient>
      </defs>

      {/* Sariyog'da qovurilgan qo'ziqorin bo'laklari */}
      {[
        [60, 22, -15],
        [125, 18, 10],
        [195, 24, -8],
        [260, 20, 15]
      ].map(([cx, cy, rot], i) => (
        <g key={i} transform={`rotate(${rot} ${cx} ${cy})`}>
          <path
            d={`M ${cx - 24},${cy + 4} C ${cx - 24},${cy - 16} ${cx + 24},${cy - 16} ${cx + 24},${cy + 4} Z`}
            fill="url(#shroomGrad)"
            stroke="#4E342E"
            strokeWidth="1.5"
          />
          <rect x={cx - 6} y={cy + 4} width="12" height="10" rx="3" fill="#D7CCC8" />
          {/* Qovurilgan qoramtir chiziqlar */}
          <line x1={cx - 16} y1={cy + 2} x2={cx + 16} y2={cy + 2} stroke="#3E2723" strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}

export function TomatoSvg() {
  return (
    <svg viewBox="0 0 320 48" className="w-full h-auto drop-shadow-md">
      <defs>
        <radialGradient id="tomatoGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF4D4D" />
          <stop offset="60%" stopColor="#E61C1C" />
          <stop offset="100%" stopColor="#A80707" />
        </radialGradient>
      </defs>

      {/* 2 ta katta sershira pomidor doirasi */}
      {[
        [100, 24, -6],
        [220, 24, 6]
      ].map(([cx, cy, rot], i) => (
        <g key={i} transform={`rotate(${rot} ${cx} ${cy})`}>
          <ellipse cx={cx} cy={cy} rx="70" ry="17" fill="url(#tomatoGrad)" stroke="#800000" strokeWidth="2.5" />
          {/* Urug' kameralari */}
          <ellipse cx={cx - 30} cy={cy} rx="15" ry="6" fill="#800000" opacity="0.6" />
          <ellipse cx={cx + 30} cy={cy} rx="15" ry="6" fill="#800000" opacity="0.6" />
          <ellipse cx={cx} cy={cy} rx="12" ry="5" fill="#800000" opacity="0.6" />
          {/* Urug'lar */}
          <circle cx={cx - 28} cy={cy} r="2" fill="#FFF176" />
          <circle cx={cx + 28} cy={cy} r="2" fill="#FFF176" />
          <circle cx={cx} cy={cy} r="2" fill="#FFF176" />
        </g>
      ))}
    </svg>
  );
}

export function LettuceSvg() {
  return (
    <svg viewBox="0 0 320 50" className="w-full h-auto drop-shadow-md">
      <defs>
        <linearGradient id="lettuceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7DCEA0" />
          <stop offset="40%" stopColor="#52BE80" />
          <stop offset="100%" stopColor="#1E8449" />
        </linearGradient>
      </defs>

      {/* To'lqinsimon barra salat bargi */}
      <path
        d="M 12,24 C 18,12 35,32 55,18 C 75,4 95,30 115,16 C 135,2 155,28 175,16 C 195,4 215,30 235,16 C 255,2 275,28 295,18 C 310,12 318,28 310,34 C 295,46 265,36 240,44 C 210,50 180,38 150,46 C 120,38 90,48 65,42 C 40,46 20,38 12,24 Z"
        fill="url(#lettuceGrad)"
      />
      {/* Barg tomirlari */}
      <path
        d="M 30,26 C 90,20 160,22 285,26 M 90,21 L 110,12 M 140,22 L 160,34 M 200,23 L 220,14"
        stroke="#A9DFBF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

export function RenderLayerSvg({ ingredientId }) {
  switch (ingredientId) {
    case 'beef_patty':
      return <BeefPattySvg />;
    case 'chicken_patty':
      return <ChickenPattySvg />;
    case 'smoked_beef':
      return <SmokedBeefSvg />;
    case 'cheddar':
      return <CheddarSvg />;
    case 'pickles':
      return <PicklesSvg />;
    case 'fried_onion':
      return <FriedOnionSvg />;
    case 'jalapeno':
      return <JalapenoSvg />;
    case 'mushrooms':
      return <MushroomsSvg />;
    case 'tomato':
      return <TomatoSvg />;
    case 'lettuce':
      return <LettuceSvg />;
    default:
      return null;
  }
}
