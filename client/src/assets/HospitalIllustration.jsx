const HospitalIllustration = () => (
  <svg viewBox="0 0 360 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
    <defs>
      <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
        <stop offset="100%" stopColor="rgba(240,248,255,0.9)" />
      </linearGradient>
      <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
      </linearGradient>
      <linearGradient id="ambGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff5252" />
        <stop offset="100%" stopColor="#ff1744" />
      </linearGradient>
      <filter id="bshadow">
        <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="rgba(0,0,0,0.2)" />
      </filter>
      <filter id="wshadow">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.12)" />
      </filter>
    </defs>

    {/* Sky background glow */}
    <circle cx="180" cy="120" r="140" fill="rgba(255,255,255,0.08)" />

    {/* Ground */}
    <rect x="0" y="258" width="360" height="42" rx="0" fill="rgba(255,255,255,0.12)" />
    <rect x="0" y="258" width="360" height="4" fill="rgba(255,255,255,0.2)" />

    {/* Road markings */}
    <rect x="20" y="268" width="35" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
    <rect x="75" y="268" width="35" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
    <rect x="250" y="268" width="35" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
    <rect x="305" y="268" width="35" height="4" rx="2" fill="rgba(255,255,255,0.3)" />

    {/* Main hospital building */}
    <rect x="90" y="80" width="180" height="178" rx="10" fill="url(#buildingGrad)" filter="url(#bshadow)" />

    {/* Roof / header band */}
    <rect x="90" y="80" width="180" height="52" rx="10" fill="url(#roofGrad)" />
    <rect x="90" y="118" width="180" height="14" fill="rgba(255,255,255,0.15)" />

    {/* Hospital name */}
    <text x="180" y="100" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" letterSpacing="1">CITY HOSPITAL</text>
    <text x="180" y="116" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8">Est. 2010</text>

    {/* Big cross on building */}
    <rect x="162" y="88" width="36" height="10" rx="5" fill="white" opacity="0.95" />
    <rect x="173" y="82" width="14" height="22" rx="7" fill="white" opacity="0.95" />

    {/* Windows row 1 */}
    <rect x="108" y="145" width="38" height="32" rx="6" fill="rgba(173,216,255,0.6)" filter="url(#wshadow)" />
    <rect x="161" y="145" width="38" height="32" rx="6" fill="rgba(173,216,255,0.6)" filter="url(#wshadow)" />
    <rect x="214" y="145" width="38" height="32" rx="6" fill="rgba(255,220,150,0.5)" filter="url(#wshadow)" />
    {/* Window cross lines */}
    <line x1="127" y1="145" x2="127" y2="177" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    <line x1="108" y1="161" x2="146" y2="161" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    <line x1="180" y1="145" x2="180" y2="177" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    <line x1="161" y1="161" x2="199" y2="161" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    <line x1="233" y1="145" x2="233" y2="177" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    <line x1="214" y1="161" x2="252" y2="161" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

    {/* Windows row 2 */}
    <rect x="108" y="192" width="38" height="28" rx="6" fill="rgba(173,216,255,0.5)" filter="url(#wshadow)" />
    <rect x="214" y="192" width="38" height="28" rx="6" fill="rgba(173,216,255,0.5)" filter="url(#wshadow)" />

    {/* Main entrance door */}
    <rect x="152" y="210" width="56" height="48" rx="8" fill="rgba(173,216,255,0.7)" filter="url(#wshadow)" />
    <rect x="152" y="210" width="56" height="48" rx="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    {/* Door arch */}
    <path d="M152 218 Q180 205 208 218" fill="rgba(255,255,255,0.2)" />
    {/* Door handle */}
    <circle cx="196" cy="236" r="3.5" fill="rgba(255,255,255,0.7)" />
    {/* Door center line */}
    <line x1="180" y1="210" x2="180" y2="258" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

    {/* Steps */}
    <rect x="142" y="252" width="76" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
    <rect x="148" y="248" width="64" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />

    {/* Flag pole */}
    <rect x="178" y="42" width="4" height="40" rx="2" fill="rgba(255,255,255,0.5)" />
    <path d="M182 42 L210 50 L182 58 Z" fill="rgba(255,255,255,0.8)" />

    {/* Ambulance */}
    <rect x="18" y="222" width="72" height="36" rx="8" fill="url(#ambGrad)" filter="url(#wshadow)" />
    {/* Cab */}
    <rect x="18" y="228" width="22" height="30" rx="8" fill="#ff1744" />
    {/* Windshield */}
    <rect x="20" y="230" width="18" height="14" rx="4" fill="rgba(173,216,255,0.7)" />
    {/* Side window */}
    <rect x="44" y="226" width="20" height="12" rx="3" fill="rgba(173,216,255,0.6)" />
    {/* Cross on ambulance */}
    <rect x="60" y="232" width="16" height="5" rx="2.5" fill="white" opacity="0.95" />
    <rect x="65" y="228" width="5" height="13" rx="2.5" fill="white" opacity="0.95" />
    {/* Wheels */}
    <circle cx="34" cy="260" r="10" fill="#1a1a2e" />
    <circle cx="34" cy="260" r="5" fill="#4a4a6a" />
    <circle cx="34" cy="260" r="2" fill="#8a8aaa" />
    <circle cx="74" cy="260" r="10" fill="#1a1a2e" />
    <circle cx="74" cy="260" r="5" fill="#4a4a6a" />
    <circle cx="74" cy="260" r="2" fill="#8a8aaa" />
    {/* Siren lights */}
    <rect x="28" y="220" width="10" height="5" rx="2.5" fill="#ff1744" />
    <rect x="42" y="220" width="10" height="5" rx="2.5" fill="#2196f3" />
    {/* Siren glow */}
    <ellipse cx="33" cy="220" rx="8" ry="4" fill="rgba(255,50,50,0.3)" />
    <ellipse cx="47" cy="220" rx="8" ry="4" fill="rgba(33,150,243,0.3)" />

    {/* Trees */}
    <rect x="282" y="228" width="8" height="30" rx="4" fill="rgba(255,255,255,0.3)" />
    <circle cx="286" cy="218" r="18" fill="rgba(255,255,255,0.2)" />
    <circle cx="286" cy="212" r="14" fill="rgba(255,255,255,0.15)" />

    <rect x="316" y="235" width="6" height="23" rx="3" fill="rgba(255,255,255,0.3)" />
    <circle cx="319" cy="226" r="14" fill="rgba(255,255,255,0.18)" />

    {/* Stars / sparkles */}
    <path d="M60 80 L61.5 75 L63 80 L68 81.5 L63 83 L61.5 88 L60 83 L55 81.5 Z" fill="rgba(255,255,255,0.7)" />
    <path d="M310 100 L311 97 L312 100 L315 101 L312 102 L311 105 L310 102 L307 101 Z" fill="rgba(255,255,255,0.6)" />
    <path d="M330 60 L331 58 L332 60 L334 61 L332 62 L331 64 L330 62 L328 61 Z" fill="rgba(255,255,255,0.5)" />
  </svg>
);

export default HospitalIllustration;
