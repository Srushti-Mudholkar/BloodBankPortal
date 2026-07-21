// Hero illustration for Login page
const HeroIllustration = () => (
  <svg viewBox="0 0 520 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
    <defs>
      <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
      <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f0f4ff" />
      </linearGradient>
      <linearGradient id="bagGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ff6b6b" />
        <stop offset="100%" stopColor="#c0392b" />
      </linearGradient>
      <linearGradient id="dropGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ff8a80" />
        <stop offset="100%" stopColor="#e53935" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(0,0,0,0.2)" />
      </filter>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Background glow */}
    <circle cx="260" cy="210" r="200" fill="url(#bgGlow)" />

    {/* Floating decorative circles */}
    <circle cx="80" cy="80" r="40" fill="rgba(255,255,255,0.08)" />
    <circle cx="440" cy="340" r="55" fill="rgba(255,255,255,0.06)" />
    <circle cx="460" cy="100" r="25" fill="rgba(255,255,255,0.1)" />
    <circle cx="60" cy="320" r="30" fill="rgba(255,255,255,0.08)" />

    {/* Ground shadow */}
    <ellipse cx="260" cy="395" rx="110" ry="14" fill="rgba(0,0,0,0.18)" />

    {/* Doctor coat / body */}
    <rect x="195" y="235" width="130" height="130" rx="28" fill="url(#bodyGrad)" filter="url(#shadow)" />
    {/* Coat lapels */}
    <path d="M240 235 L260 270 L280 235" fill="#e8eeff" />
    {/* Shirt / tie area */}
    <rect x="248" y="240" width="24" height="55" rx="5" fill="white" />
    <path d="M256 248 L260 268 L264 248 Z" fill="#e74c3c" />
    {/* Coat buttons */}
    <circle cx="260" cy="280" r="3" fill="#d0d8f0" />
    <circle cx="260" cy="295" r="3" fill="#d0d8f0" />
    {/* Stethoscope */}
    <path d="M225 265 Q210 285 215 305 Q220 325 235 320 Q250 315 248 300" stroke="#c0392b" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <circle cx="248" cy="300" r="9" fill="#e74c3c" stroke="#c0392b" strokeWidth="2" />
    <circle cx="248" cy="300" r="4" fill="#fff" opacity="0.6" />
    <circle cx="225" cy="265" r="4" fill="#c0392b" />
    <circle cx="232" cy="262" r="4" fill="#c0392b" />

    {/* Neck */}
    <rect x="248" y="215" width="24" height="25" rx="8" fill="#FDBCB4" />

    {/* Head */}
    <circle cx="260" cy="195" r="42" fill="#FDBCB4" filter="url(#shadow)" />
    {/* Ear left */}
    <ellipse cx="219" cy="197" rx="7" ry="10" fill="#FDBCB4" />
    <ellipse cx="220" cy="197" rx="4" ry="7" fill="#f0a898" />
    {/* Ear right */}
    <ellipse cx="301" cy="197" rx="7" ry="10" fill="#FDBCB4" />
    <ellipse cx="300" cy="197" rx="4" ry="7" fill="#f0a898" />

    {/* Hair */}
    <path d="M222 182 Q224 155 260 152 Q296 155 298 182 Q290 165 260 163 Q230 165 222 182Z" fill="#3d2b1f" />
    <path d="M222 182 Q218 190 220 200" stroke="#3d2b1f" strokeWidth="3" fill="none" />
    <path d="M298 182 Q302 190 300 200" stroke="#3d2b1f" strokeWidth="3" fill="none" />

    {/* Eyebrows */}
    <path d="M242 178 Q248 174 254 177" stroke="#3d2b1f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M266 177 Q272 174 278 178" stroke="#3d2b1f" strokeWidth="2.5" fill="none" strokeLinecap="round" />

    {/* Eyes */}
    <ellipse cx="248" cy="190" rx="7" ry="8" fill="white" />
    <ellipse cx="272" cy="190" rx="7" ry="8" fill="white" />
    <circle cx="249" cy="191" r="5" fill="#3d2b1f" />
    <circle cx="273" cy="191" r="5" fill="#3d2b1f" />
    <circle cx="251" cy="189" r="2" fill="white" />
    <circle cx="275" cy="189" r="2" fill="white" />
    {/* Eyelashes */}
    <path d="M241 184 L240 181 M244 183 L243 180 M247 183 L247 180" stroke="#3d2b1f" strokeWidth="1.2" />
    <path d="M265 183 L265 180 M268 183 L269 180 M271 184 L272 181" stroke="#3d2b1f" strokeWidth="1.2" />

    {/* Nose */}
    <path d="M257 200 Q260 207 263 200" stroke="#e8a090" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <circle cx="256" cy="203" r="2" fill="#e8a090" opacity="0.5" />
    <circle cx="264" cy="203" r="2" fill="#e8a090" opacity="0.5" />

    {/* Smile */}
    <path d="M249 213 Q260 222 271 213" stroke="#c0392b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    {/* Teeth */}
    <path d="M252 214 Q260 220 268 214" fill="white" opacity="0.7" />

    {/* Cheek blush */}
    <ellipse cx="238" cy="208" rx="8" ry="5" fill="#ffb3a7" opacity="0.4" />
    <ellipse cx="282" cy="208" rx="8" ry="5" fill="#ffb3a7" opacity="0.4" />

    {/* Left arm */}
    <path d="M195 255 Q165 265 155 285 Q148 300 158 308" stroke="#f0f4ff" strokeWidth="22" fill="none" strokeLinecap="round" />
    <path d="M195 255 Q165 265 155 285 Q148 300 158 308" stroke="#e8eeff" strokeWidth="18" fill="none" strokeLinecap="round" />
    {/* Left hand */}
    <ellipse cx="160" cy="312" rx="14" ry="10" fill="#FDBCB4" />
    <path d="M150 308 Q148 302 153 300" stroke="#FDBCB4" strokeWidth="7" strokeLinecap="round" />
    <path d="M155 306 Q152 299 157 297" stroke="#FDBCB4" strokeWidth="7" strokeLinecap="round" />

    {/* Right arm */}
    <path d="M325 255 Q355 265 365 285 Q372 300 362 308" stroke="#f0f4ff" strokeWidth="22" fill="none" strokeLinecap="round" />
    <path d="M325 255 Q355 265 365 285 Q372 300 362 308" stroke="#e8eeff" strokeWidth="18" fill="none" strokeLinecap="round" />
    {/* Right hand */}
    <ellipse cx="360" cy="312" rx="14" ry="10" fill="#FDBCB4" />

    {/* Blood bag in left hand */}
    <rect x="130" y="270" width="36" height="48" rx="8" fill="url(#bagGrad)" filter="url(#shadow)" />
    {/* Bag tube top */}
    <rect x="144" y="260" width="8" height="14" rx="4" fill="#c0392b" />
    <rect x="141" y="256" width="14" height="6" rx="3" fill="#a93226" />
    {/* Bag content lines */}
    <path d="M138 285 L158 285 M138 293 L158 293 M138 301 L158 301" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
    {/* Cross on bag */}
    <rect x="144" y="272" width="10" height="3" rx="1.5" fill="white" opacity="0.9" />
    <rect x="147" y="269" width="3" height="9" rx="1.5" fill="white" opacity="0.9" />
    {/* Bag shine */}
    <path d="M134 274 Q136 268 142 270" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Clipboard in right hand */}
    <rect x="348" y="268" width="34" height="44" rx="6" fill="white" filter="url(#shadow)" />
    <rect x="348" y="268" width="34" height="10" rx="6" fill="#e74c3c" />
    <rect x="358" y="264" width="14" height="8" rx="4" fill="#c0392b" />
    <rect x="354" y="284" width="22" height="3" rx="1.5" fill="#e2e8f0" />
    <rect x="354" y="291" width="18" height="3" rx="1.5" fill="#e2e8f0" />
    <rect x="354" y="298" width="20" height="3" rx="1.5" fill="#e2e8f0" />
    <rect x="354" y="305" width="14" height="3" rx="1.5" fill="#e2e8f0" />

    {/* Floating blood drops */}
    <g filter="url(#glow)">
      {/* Large drop top right */}
      <path d="M410 95 C410 95 396 75 396 65 C396 56 402 50 410 50 C418 50 424 56 424 65 C424 75 410 95 410 95Z" fill="url(#dropGrad)" opacity="0.95" />
      <path d="M404 62 Q406 56 412 58" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Medium drop top left */}
      <path d="M108 130 C108 130 97 114 97 106 C97 99 102 95 108 95 C114 95 119 99 119 106 C119 114 108 130 108 130Z" fill="url(#dropGrad)" opacity="0.8" />
      <path d="M103 104 Q105 99 110 101" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* Small drop right */}
      <path d="M430 240 C430 240 422 228 422 222 C422 217 425 214 430 214 C435 214 438 217 438 222 C438 228 430 240 430 240Z" fill="url(#dropGrad)" opacity="0.75" />

      {/* Tiny drop left */}
      <path d="M78 260 C78 260 72 251 72 247 C72 243 74 241 78 241 C82 241 84 243 84 247 C84 251 78 260 78 260Z" fill="url(#dropGrad)" opacity="0.65" />

      {/* Extra small */}
      <path d="M380 160 C380 160 375 153 375 149 C375 146 377 144 380 144 C383 144 385 146 385 149 C385 153 380 160 380 160Z" fill="url(#dropGrad)" opacity="0.6" />
    </g>

    {/* Heartbeat line */}
    <path d="M30 355 L80 355 L100 325 L118 385 L138 340 L158 355 L490 355"
      stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    {/* Heartbeat glow */}
    <path d="M30 355 L80 355 L100 325 L118 385 L138 340 L158 355 L490 355"
      stroke="rgba(255,255,255,0.12)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />

    {/* Stat bubbles */}
    <g filter="url(#shadow)">
      <rect x="340" y="108" width="120" height="62" rx="16" fill="rgba(255,255,255,0.18)" />
      <rect x="340" y="108" width="120" height="62" rx="16" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <text x="400" y="132" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="800">500+</text>
      <text x="400" y="152" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="12">Active Donors</text>
    </g>
    <g filter="url(#shadow)">
      <rect x="60" y="78" width="120" height="62" rx="16" fill="rgba(255,255,255,0.18)" />
      <rect x="60" y="78" width="120" height="62" rx="16" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <text x="120" y="102" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="800">2000+</text>
      <text x="120" y="122" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="12">Lives Saved</text>
    </g>

    {/* Heart pulse icon */}
    <g transform="translate(232, 155)">
      <circle cx="0" cy="0" r="16" fill="rgba(255,255,255,0.2)" />
      <path d="M-7 -2 C-7 -6 -4 -8 0 -5 C4 -8 7 -6 7 -2 C7 2 0 8 0 8 C0 8 -7 2 -7 -2Z" fill="white" opacity="0.9" />
    </g>
  </svg>
);

export default HeroIllustration;
