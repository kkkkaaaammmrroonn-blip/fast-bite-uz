import { motion } from 'framer-motion';

// Olov zarralari va ambient nurlar (toza deterministik konfiguratsiya)
const STATIC_PARTICLES = [
  { id: 0, x: 12, y: 85, size: 3.5, duration: 8.2, delay: 0.5, color: '#FF7A00', opacity: 0.45, driftX: 18 },
  { id: 1, x: 28, y: 70, size: 2.2, duration: 9.5, delay: 1.8, color: '#FFB800', opacity: 0.35, driftX: -14 },
  { id: 2, x: 45, y: 90, size: 4.8, duration: 7.1, delay: 0.2, color: '#E63946', opacity: 0.5, driftX: 25 },
  { id: 3, x: 62, y: 65, size: 3.0, duration: 10.4, delay: 2.5, color: '#FF7A00', opacity: 0.4, driftX: -20 },
  { id: 4, x: 78, y: 80, size: 2.6, duration: 8.8, delay: 1.1, color: '#FFB800', opacity: 0.38, driftX: 12 },
  { id: 5, x: 88, y: 95, size: 5.2, duration: 6.9, delay: 0.8, color: '#E63946', opacity: 0.55, driftX: -16 },
  { id: 6, x: 18, y: 45, size: 2.8, duration: 11.2, delay: 3.2, color: '#FF7A00', opacity: 0.32, driftX: 15 },
  { id: 7, x: 35, y: 55, size: 4.1, duration: 8.4, delay: 1.4, color: '#FFB800', opacity: 0.42, driftX: -22 },
  { id: 8, x: 52, y: 40, size: 3.2, duration: 9.8, delay: 2.1, color: '#E63946', opacity: 0.48, driftX: 10 },
  { id: 9, x: 72, y: 50, size: 2.4, duration: 12.0, delay: 4.0, color: '#FF7A00', opacity: 0.3, driftX: -18 },
  { id: 10, x: 84, y: 35, size: 4.5, duration: 7.6, delay: 0.9, color: '#FFB800', opacity: 0.52, driftX: 20 },
  { id: 11, x: 94, y: 60, size: 3.6, duration: 9.1, delay: 1.7, color: '#E63946', opacity: 0.44, driftX: -12 },
  { id: 12, x: 8, y: 25, size: 2.5, duration: 10.8, delay: 3.5, color: '#FF7A00', opacity: 0.36, driftX: 14 },
  { id: 13, x: 25, y: 15, size: 4.2, duration: 8.0, delay: 1.2, color: '#FFB800', opacity: 0.46, driftX: -15 },
  { id: 14, x: 42, y: 20, size: 3.8, duration: 9.4, delay: 2.8, color: '#E63946', opacity: 0.4, driftX: 18 },
  { id: 15, x: 60, y: 10, size: 2.9, duration: 11.5, delay: 4.2, color: '#FF7A00', opacity: 0.34, driftX: -25 },
  { id: 16, x: 80, y: 18, size: 5.0, duration: 7.3, delay: 0.6, color: '#FFB800', opacity: 0.58, driftX: 16 },
  { id: 17, x: 92, y: 5, size: 3.4, duration: 8.7, delay: 1.9, color: '#E63946', opacity: 0.42, driftX: -10 },
];

export function AmbientParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 2 ta sekin harakatlanuvchi katta radial nur shariklari */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.12, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#FF7A00]/12 via-orange-900/10 to-transparent blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 30, -40, 0],
          scale: [1, 0.92, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#FFB800]/10 via-amber-950/10 to-transparent blur-[150px]"
      />

      {/* Suzuvchi olov uchqunlari (Embers) */}
      {STATIC_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: `${p.y}vh`,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: [`${p.y}vh`, `${p.y - 35}vh`],
            x: [`${p.x}vw`, `${p.x + (p.driftX / 10)}vw`],
            opacity: [0, p.opacity, p.opacity * 1.3, 0],
            scale: [0.5, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}
