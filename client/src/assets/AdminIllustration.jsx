const AdminIllustration = () => (
  <svg viewBox="0 0 360 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
    <defs>
      <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
        <stop offset="100%" stopColor="rgba(240,240,255,0.9)" />
      </linearGradient>
      <linearGradient id="barR" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#ff5252" />
        <stop offset="100%" stopColor="#ff8a80" />
      </linearGradient>
      <linearGradient id="barB" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#448aff" />
        <stop offset="100%" stopColor="#82b1ff" />
      </linearGradient>
      <linearGradient id="barG" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#69f0ae" />
        <stop offset="100%" stopColor="#b9f6ca" />
      </linearGradient>
      <linearGradient id="barP" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#e040fb" />
        <stop offset="100%" stopColor="#ea80fc" />
      </linearGradient>
      <filter id="ashadow">
        <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="rgba(0,0,0,0.2)" />
      </filter>
      <filter id="cshadow">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.15)" />
      </filter>
    </defs>

    {/* Background glow */}
    <circle cx="180" cy="150" r="145" fill="rgba(255,255,255,0.06)" />

    {/* Monitor stand */}
    <rect x="162" y="248" width="36" height="12" rx="6" fill="rgba(255,255,255,0.3)" />
    <rect x="140" y="258" width="80" height="8" rx="4" fill="rgba(255,255,255,0.25)" />

    {/* Monitor frame */}
    <rect x="55" y="55" width="250" height="195" rx="16" fill="rgba(255,255,255,0.2)" filter="url(#ashadow)" />
    <rect x="55" y="55" width="250" height="195" rx="16" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />

    {/* Screen */}
    <rect x="65" y="65" width="230" height="175" rx="10" fill="url(#screenGrad)" />

    {/* Top bar */}
    <rect x="65" y="65" width="230" height="28" rx="10" fill="rgba(124,58,237,0.85)" />
    <rect x="65" y="80" width="230" height="13" fill="rgba(124,58,237,0.85)" />
    {/* Top bar dots */}
    <circle cx="82" cy="79" r="5" fill="rgba(255,255,255,0.4)" />
    <circle cx="97" cy="79" r="5" fill="rgba(255,255,255,0.4)" />
    <circle cx="112" cy="79" r="5" fill="rgba(255,255,255,0.4)" />
    {/* Title */}
    <text x="195" y="83" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" letterSpacing="1">BLOODCARE ADMIN</text>

    {/* Stat cards row */}
    <rect x="73" y="100" width="48" height="38" rx="7" fill="rgba(255,82,82,0.12)" filter="url(#cshadow)" />
    <rect x="73" y="100" width="48" height="38" rx="7" stroke="rgba(255,82,82,0.25)" strokeWidth="1" />
    <text x="97" y="116" textAnchor="middle" fill="#ff5252" fontSize="13" fontWeight="800">500</text>
    <text x="97" y="130" textAnchor="middle" fill="#9ca3af" fontSize="7">Donors</text>

    <rect x="129" y="100" width="48" height="38" rx="7" fill="rgba(68,138,255,0.12)" filter="url(#cshadow)" />
    <rect x="129" y="100" width="48" height="38" rx="7" stroke="rgba(68,138,255,0.25)" strokeWidth="1" />
    <text x="153" y="116" textAnchor="middle" fill="#448aff" fontSize="13" fontWeight="800">120</text>
    <text x="153" y="130" textAnchor="middle" fill="#9ca3af" fontSize="7">Hospitals</text>

    <rect x="185" y="100" width="48" height="38" rx="7" fill="rgba(105,240,174,0.12)" filter="url(#cshadow)" />
    <rect x="185" y="100" width="48" height="38" rx="7" stroke="rgba(105,240,174,0.25)" strokeWidth="1" />
    <text x="209" y="116" textAnchor="middle" fill="#00c853" fontSize="13" fontWeight="800">45</text>
    <text x="209" y="130" textAnchor="middle" fill="#9ca3af" fontSize="7">Orgs</text>

    <rect x="241" y="100" width="46" height="38" rx="7" fill="rgba(224,64,251,0.12)" filter="url(#cshadow)" />
    <rect x="241" y="100" width="46" height="38" rx="7" stroke="rgba(224,64,251,0.25)" strokeWidth="1" />
    <text x="264" y="116" textAnchor="middle" fill="#e040fb" fontSize="13" fontWeight="800">2K+</text>
    <text x="264" y="130" textAnchor="middle" fill="#9ca3af" fontSize="7">Saved</text>

    {/* Chart area */}
    <rect x="73" y="148" width="108" height="82" rx="8" fill="rgba(255,255,255,0.6)" filter="url(#cshadow)" />
    <text x="127" y="162" textAnchor="middle" fill="#374151" fontSize="8" fontWeight="700">Blood Group Chart</text>
    {/* Chart bars */}
    <rect x="82" y="195" width="12" height="28" rx="3" fill="url(#barR)" />
    <rect x="98" y="183" width="12" height="40" rx="3" fill="url(#barB)" />
    <rect x="114" y="175" width="12" height="48" rx="3" fill="url(#barG)" />
    <rect x="130" y="188" width="12" height="35" rx="3" fill="url(#barP)" />
    <rect x="146" y="179" width="12" height="44" rx="3" fill="url(#barR)" opacity="0.7" />
    {/* Chart baseline */}
    <line x1="78" y1="223" x2="168" y2="223" stroke="#e5e7eb" strokeWidth="1" />
    {/* X labels */}
    <text x="88" y="230" textAnchor="middle" fill="#9ca3af" fontSize="6">A+</text>
    <text x="104" y="230" textAnchor="middle" fill="#9ca3af" fontSize="6">B+</text>
    <text x="120" y="230" textAnchor="middle" fill="#9ca3af" fontSize="6">O+</text>
    <text x="136" y="230" textAnchor="middle" fill="#9ca3af" fontSize="6">AB+</text>
    <text x="152" y="230" textAnchor="middle" fill="#9ca3af" fontSize="6">O-</text>

    {/* Table area */}
    <rect x="189" y="148" width="98" height="82" rx="8" fill="rgba(255,255,255,0.6)" filter="url(#cshadow)" />
    <text x="238" y="162" textAnchor="middle" fill="#374151" fontSize="8" fontWeight="700">Recent Activity</text>
    {/* Table rows */}
    <rect x="196" y="168" width="84" height="7" rx="3" fill="#fef2f2" />
    <rect x="196" y="168" width="28" height="7" rx="3" fill="#fca5a5" />
    <rect x="196" y="180" width="84" height="7" rx="3" fill="#eff6ff" />
    <rect x="196" y="180" width="22" height="7" rx="3" fill="#93c5fd" />
    <rect x="196" y="192" width="84" height="7" rx="3" fill="#f0fdf4" />
    <rect x="196" y="192" width="32" height="7" rx="3" fill="#86efac" />
    <rect x="196" y="204" width="84" height="7" rx="3" fill="#fef2f2" />
    <rect x="196" y="204" width="18" height="7" rx="3" fill="#fca5a5" />
    <rect x="196" y="216" width="84" height="7" rx="3" fill="#faf5ff" />
    <rect x="196" y="216" width="26" height="7" rx="3" fill="#d8b4fe" />

    {/* Shield badge */}
    <g transform="translate(248, 62)">
      <path d="M12 0 L24 5 L24 14 C24 20 18 25 12 27 C6 25 0 20 0 14 L0 5 Z" fill="rgba(255,255,255,0.25)" />
      <path d="M12 0 L24 5 L24 14 C24 20 18 25 12 27 C6 25 0 20 0 14 L0 5 Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
      <path d="M7 13 L10 16 L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Floating elements */}
    <path d="M30 120 C30 120 23 110 23 104 C23 99 26 96 30 96 C34 96 37 99 37 104 C37 110 30 120 30 120Z" fill="rgba(255,255,255,0.65)" />
    <path d="M335 100 C335 100 329 91 329 86 C329 82 332 80 335 80 C338 80 341 82 341 86 C341 91 335 100 335 100Z" fill="rgba(255,255,255,0.6)" />
    <path d="M340 200 C340 200 335 193 335 189 C335 186 337 184 340 184 C343 184 345 186 345 189 C345 193 340 200 340 200Z" fill="rgba(255,255,255,0.5)" />

    {/* Sparkles */}
    <path d="M30 60 L31.5 55 L33 60 L38 61.5 L33 63 L31.5 68 L30 63 L25 61.5 Z" fill="rgba(255,255,255,0.7)" />
    <path d="M330 240 L331 237 L332 240 L335 241 L332 242 L331 245 L330 242 L327 241 Z" fill="rgba(255,255,255,0.6)" />
    <path d="M20 200 L21 198 L22 200 L24 201 L22 202 L21 204 L20 202 L18 201 Z" fill="rgba(255,255,255,0.55)" />
  </svg>
);

export default AdminIllustration;
