export function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,#d7ebe6_0%,transparent_42%),radial-gradient(ellipse_at_85%_20%,#c5d8e8_0%,transparent_45%),linear-gradient(160deg,#eef4f8_0%,#dfeaf2_48%,#cfdfe9_100%)]" />
      <div className="animate-drift absolute inset-x-0 top-[-6%] h-[48%] opacity-55 sm:inset-x-auto sm:-right-[8%] sm:top-[8%] sm:h-[78%] sm:w-[62%] sm:min-w-[28rem] sm:opacity-100">
        <svg
          viewBox="0 0 720 640"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-full w-auto max-w-none sm:mx-0 sm:w-full"
        >
          <defs>
            <linearGradient id="panel" x1="120" y1="80" x2="620" y2="560" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1a3550" />
              <stop offset="1" stopColor="#0d2236" />
            </linearGradient>
            <linearGradient id="glass" x1="220" y1="140" x2="520" y2="460" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9fd9cf" stopOpacity="0.35" />
              <stop offset="1" stopColor="#7eb4d8" stopOpacity="0.08" />
            </linearGradient>
            <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>

          <ellipse cx="430" cy="520" rx="210" ry="36" fill="#10243a" opacity="0.12" filter="url(#soft)" />

          <rect x="170" y="90" width="380" height="430" rx="28" fill="url(#panel)" />
          <rect x="188" y="112" width="344" height="386" rx="18" fill="#0a1a2a" />
          <rect x="188" y="112" width="344" height="386" rx="18" fill="url(#glass)" />

          <circle cx="360" cy="268" r="78" stroke="#7ad7c6" strokeWidth="2.5" opacity="0.85" />
          <circle cx="360" cy="268" r="96" stroke="#7ad7c6" strokeWidth="1" opacity="0.35" className="origin-[360px_268px] animate-pulse-ring" />
          <circle cx="360" cy="268" r="118" stroke="#7ad7c6" strokeWidth="1" opacity="0.18" className="origin-[360px_268px] animate-pulse-ring [animation-delay:0.7s]" />

          <path
            d="M318 250c8-24 28-40 42-40s34 16 42 40c-6 28-22 48-42 48s-36-20-42-48Z"
            fill="#9fd9cf"
            opacity="0.55"
          />
          <circle cx="360" cy="222" r="22" fill="#b9e8de" opacity="0.7" />

          <rect x="230" y="390" width="260" height="14" rx="7" fill="#1f4d6b" />
          <rect x="260" y="418" width="200" height="10" rx="5" fill="#274a63" opacity="0.8" />
          <rect x="290" y="444" width="140" height="28" rx="14" fill="#0f8f7b" />

          <g className="animate-scan origin-center">
            <rect x="220" y="180" width="280" height="2" fill="#9fd9cf" opacity="0.7" />
          </g>

          <g transform="translate(520 300)">
            <rect x="0" y="0" width="120" height="170" rx="16" fill="#16324a" />
            <rect x="12" y="18" width="96" height="110" rx="10" fill="#0c2234" />
            <circle cx="60" cy="70" r="28" stroke="#7ad7c6" strokeWidth="2" />
            <rect x="28" y="142" width="64" height="10" rx="5" fill="#0f8f7b" />
          </g>

          <g transform="translate(78 330)">
            <rect width="86" height="54" rx="10" fill="#1a3a54" />
            <rect x="12" y="14" width="62" height="8" rx="4" fill="#7ad7c6" opacity="0.7" />
            <rect x="12" y="30" width="42" height="8" rx="4" fill="#4d6275" />
          </g>
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
