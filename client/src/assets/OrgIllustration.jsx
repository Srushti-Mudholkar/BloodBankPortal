const OrgIllustration = () => (
  <svg viewBox="0 0 360 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
    <defs>
      <linearGradient id="orgBuild" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
        <stop offset="100%" stopColor="rgba(235,255,245,0.9)" />
      </linearGradient>
      <linearGradient id="shelfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
      </linearGradient>
      <linearGradient id="bagR" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ff6b6b" />
        <stop offset="100%" stopColor="#c0392b" />
      </linearGradient>
      <filter id="oshadow">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(0,0,0,0.18)" />
      </filter>
    </defs>

    {/* Background glow */}
    <circle cx="180" cy="150" r="140" fill="rgba(255,255,255,0.07)" />

    {/* Ground */}
    <rect x="0" y="258" width="360" height="42" fill="rgba(255,255,255,0.1)" />
    <rect x="0" y="258" width="360" height="3" fill="rgba(255,255,255,0.2)" />

    {/* Main building */}
    <rect x="75" y="70" width="210" height="188" rx="12" fill="url(#orgBuild)" filter="url(#oshadow)" />

    {/* Roof band */}
    <rect x="75" y="70" width="210" height="55" rx="12" fill="rgba(255,255,255,0.2)" />
    <rect x="75" y="110" width="210" height="15" fill="rgba(255,255,255,0.12)" />

    {/* Building name */}
    <text x="180" y="92" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" letterSpacing="1.5">BLOOD BANK</text>
    <text x="180" y="108" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="8">Central Organisation</text>

    {/* Big cross */}
    <rect x="162" y="76" width="36" height="10" rx="5" fill="white" opacity="0.9" />
    <rect x="173" y="70" width="14" height="22" rx="7" fill="white" opacity="0.9" />

    {/* Interior shelves visible through windows */}
    {/* Left window with shelves */}
    <rect x="95" y="140" width="60" height="70" rx="8" fill="rgba(200,240,220,0.5)" />
    <rect x="95" y="140" width="60" height="70" rx="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    {/* Shelves */}
    <rect x="98" y="158" width="54" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />
    <rect x="98" y="175" width="54" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />
    <rect x="98" y="192" width="54" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />
    {/* Blood bags on shelves */}
    <rect x="101" y="145" width="12" height="16" rx="4" fill="url(#bagR)" opacity="0.9" />
    <rect x="116" y="145" width="12" height="16" rx="4" fill="url(#bagR)" opacity="0.7" />
    <rect x="131" y="145" width="12" height="16" rx="4" fill="url(#bagR)" opacity="0.85" />
    <rect x="101" y="162" width="12" height="14" rx="4" fill="url(#bagR)" opacity="0.6" />
    <rect x="116" y="162" width="12" height="14" rx="4" fill="url(#bagR)" opacity="0.9" />
    <rect x="131" y="162" width="12" height="14" rx="4" fill="url(#bagR)" opacity="0.75" />
    <rect x="101" y="179" width="12" height="14" rx="4" fill="url(#bagR)" opacity="0.8" />
    <rect x="131" y="179" width="12" height="14" rx="4" fill="url(#bagR)" opacity="0.65" />

    {/* Right window with shelves */}
    <rect x="205" y="140" width="60" height="70" rx="8" fill="rgba(200,240,220,0.5)" />
    <rect x="205" y="140" width="60" height="70" rx="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    <rect x="208" y="158" width="54" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />
    <rect x="208" y="175" width="54" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />
    <rect x="208" y="192" width="54" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />
    <rect x="211" y="145" width="12" height="16" rx="4" fill="url(#bagR)" opacity="0.85" />
    <rect x="226" y="145" width="12" height="16" rx="4" fill="url(#bagR)" opacity="0.95" />
    <rect x="241" y="145" width="12" height="16" rx="4" fill="url(#bagR)" opacity="0.7" />
    <rect x="211" y="162" width="12" height="14" rx="4" fill="url(#bagR)" opacity="0.75" />
    <rect x="226" y="162" width="12" height="14" rx="4" fill="url(#bagR)" opacity="0.6" />
    <rect x="241" y="162" width="12" height="14" rx="4" fill="url(#bagR)" opacity="0.9" />
    <rect x="226" y="179" width="12" height="14" rx="4" fill="url(#bagR)" opacity="0.8" />

    {/* Center door */}
    <rect x="155" y="215" width="50" height="43" rx="8" fill="rgba(200,240,220,0.6)" />
    <rect x="155" y="215" width="50" height="43" rx="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
    <line x1="180" y1="215" x2="180" y2="258" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    <circle cx="172" cy="238" r="3" fill="rgba(255,255,255,0.6)" />
    <circle cx="188" cy="238" r="3" fill="rgba(255,255,255,0.6)" />

    {/* Steps */}
    <rect x="145" y="252" width="70" height="6" rx="3" fill="rgba(255,255,255,0.2)" />

    {/* Delivery van */}
    <rect x="20" y="225" width="65" height="33" rx="7" fill="rgba(255,255,255,0.85)" filter="url(#oshadow)" />
    <rect x="20" y="230" width="20" height="28" rx="7" fill="rgba(240,240,255,0.9)" />
    <rect x="22" y="232" width="16" height="13" rx="3" fill="rgba(173,216,255,0.8)" />
    {/* Van cross */}
    <rect x="48" y="232" width="14" height="4" rx="2" fill="#e74c3c" opacity="0.8" />
    <rect x="53" y="229" width="4" height="10" rx="2" fill="#e74c3c" opacity="0.8" />
    {/* Van wheels */}
    <circle cx="34" cy="260" r="9" fill="#2c3e50" />
    <circle cx="34" cy="260" r="4.5" fill="#7f8c8d" />
    <circle cx="72" cy="260" r="9" fill="#2c3e50" />
    <circle cx="72" cy="260" r="4.5" fill="#7f8c8d" />

    {/* Person walking */}
    <circle cx="300" cy="215" r="12" fill="#FDBCB4" />
    <path d="M288 210 Q290 200 300 198 Q310 200 312 210" fill="#3d2b1f" />
    <rect x="292" y="227" width="16" height="22" rx="8" fill="rgba(255,255,255,0.8)" />
    <path d="M292 240 Q285 250 283 258" stroke="rgba(255,255,255,0.7)" strokeWidth="6" strokeLinecap="round" />
    <path d="M308 240 Q315 250 317 258" stroke="rgba(255,255,255,0.7)" strokeWidth="6" strokeLinecap="round" />
    {/* Person holding bag */}
    <path d="M308 232 Q320 228 325 235" stroke="rgba(255,255,255,0.7)" strokeWidth="5" strokeLinecap="round" />
    <rect x="322" y="228" width="18" height="24" rx="5" fill="url(#bagR)" opacity="0.85" />
    <rect x="328" y="223" width="6" height="7" rx="3" fill="#c0392b" />

    {/* Floating drops */}
    <path d="M50 100 C50 100 43 90 43 84 C43 79 46 76 50 76 C54 76 57 79 57 84 C57 90 50 100 50 100Z" fill="rgba(255,255,255,0.7)" />
    <path d="M320 90 C320 90 314 81 314 76 C314 72 317 70 320 70 C323 70 326 72 326 76 C326 81 320 90 320 90Z" fill="rgba(255,255,255,0.65)" />
    <path d="M340 180 C340 180 335 173 335 169 C335 166 337 164 340 164 C343 164 345 166 345 169 C345 173 340 180 340 180Z" fill="rgba(255,255,255,0.55)" />

    {/* Sparkles */}
    <path d="M55 55 L56.5 50 L58 55 L63 56.5 L58 58 L56.5 63 L55 58 L50 56.5 Z" fill="rgba(255,255,255,0.75)" />
    <path d="M315 50 L316 47 L317 50 L320 51 L317 52 L316 55 L315 52 L312 51 Z" fill="rgba(255,255,255,0.65)" />
  </svg>
);

export default OrgIllustration;
