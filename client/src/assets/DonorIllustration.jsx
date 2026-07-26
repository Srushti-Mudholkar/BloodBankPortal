const DonorIllustration = () => (
  <svg viewBox="0 0 360 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
    <defs>
      <radialGradient id="donorBg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
      <linearGradient id="armGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FDBCB4" />
        <stop offset="100%" stopColor="#f0a898" />
      </linearGradient>
      <linearGradient id="tubeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ff8a80" />
        <stop offset="100%" stopColor="#c62828" />
      </linearGradient>
      <filter id="ds">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgba(0,0,0,0.18)" />
      </filter>
    </defs>

    {/* Background circle glow */}
    <circle cx="180" cy="150" r="130" fill="url(#donorBg)" />

    {/* Bed / table */}
    <rect x="60" y="210" width="240" height="18" rx="9" fill="rgba(255,255,255,0.25)" />
    <rect x="80" y="228" width="8" height="30" rx="4" fill="rgba(255,255,255,0.2)" />
    <rect x="272" y="228" width="8" height="30" rx="4" fill="rgba(255,255,255,0.2)" />

    {/* Person lying - body */}
    <rect x="90" y="175" width="180" height="38" rx="19" fill="rgba(255,255,255,0.9)" filter="url(#ds)" />
    {/* Shirt detail */}
    <rect x="130" y="178" width="100" height="32" rx="16" fill="rgba(255,100,100,0.15)" />

    {/* Head */}
    <circle cx="105" cy="185" r="32" fill="#FDBCB4" filter="url(#ds)" />
    {/* Hair */}
    <path d="M76 178 Q78 155 105 153 Q132 155 134 178 Q125 162 105 161 Q85 162 76 178Z" fill="#3d2b1f" />
    {/* Eyes closed (relaxed) */}
    <path d="M94 182 Q99 179 104 182" stroke="#3d2b1f" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M106 182 Q111 179 116 182" stroke="#3d2b1f" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Smile */}
    <path d="M97 193 Q105 200 113 193" stroke="#c0392b" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Blush */}
    <ellipse cx="90" cy="190" rx="7" ry="4" fill="#ffb3a7" opacity="0.5" />
    <ellipse cx="120" cy="190" rx="7" ry="4" fill="#ffb3a7" opacity="0.5" />

    {/* Arm extended */}
    <rect x="240" y="182" width="80" height="22" rx="11" fill="url(#armGrad)" filter="url(#ds)" />
    {/* Hand */}
    <ellipse cx="328" cy="193" rx="16" ry="12" fill="#FDBCB4" />
    <path d="M318 186 Q315 180 320 178" stroke="#FDBCB4" strokeWidth="8" strokeLinecap="round" />
    <path d="M323 184 Q321 177 326 176" stroke="#FDBCB4" strokeWidth="8" strokeLinecap="round" />
    <path d="M329 184 Q328 177 333 177" stroke="#FDBCB4" strokeWidth="7" strokeLinecap="round" />

    {/* IV needle on arm */}
    <rect x="268" y="186" width="22" height="10" rx="5" fill="rgba(255,255,255,0.6)" />
    <rect x="286" y="188" width="18" height="6" rx="3" fill="rgba(200,220,255,0.8)" />
    {/* Tape */}
    <rect x="264" y="185" width="30" height="12" rx="4" fill="rgba(255,220,180,0.6)" />

    {/* IV tube going up */}
    <path d="M278 186 Q278 160 278 130 Q278 110 295 100" stroke="url(#tubeGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />

    {/* IV bag */}
    <rect x="285" y="55" width="50" height="68" rx="12" fill="rgba(255,255,255,0.9)" filter="url(#ds)" />
    <rect x="285" y="55" width="50" height="68" rx="12" stroke="rgba(255,100,100,0.3)" strokeWidth="1.5" />
    {/* Blood inside bag */}
    <rect x="290" y="75" width="40" height="40" rx="8" fill="rgba(220,50,50,0.15)" />
    <path d="M290 85 Q310 78 330 85" stroke="rgba(220,50,50,0.3)" strokeWidth="1" fill="none" />
    <path d="M290 93 Q310 86 330 93" stroke="rgba(220,50,50,0.3)" strokeWidth="1" fill="none" />
    <path d="M290 101 Q310 94 330 101" stroke="rgba(220,50,50,0.3)" strokeWidth="1" fill="none" />
    {/* Bag top hook */}
    <rect x="305" y="45" width="10" height="14" rx="5" fill="rgba(255,255,255,0.7)" />
    <path d="M310 45 Q310 38 316 36 Q322 34 322 40" stroke="rgba(255,255,255,0.7)" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Cross on bag */}
    <rect x="305" y="60" width="10" height="3" rx="1.5" fill="#e74c3c" opacity="0.8" />
    <rect x="308" y="57" width="3" height="9" rx="1.5" fill="#e74c3c" opacity="0.8" />

    {/* Floating hearts */}
    <path d="M60 100 C60 100 50 90 50 84 C50 79 54 76 60 76 C66 76 70 79 70 84 C70 90 60 100 60 100Z" fill="rgba(255,255,255,0.7)" />
    <path d="M290 240 C290 240 283 232 283 227 C283 223 286 221 290 221 C294 221 297 223 297 227 C297 232 290 240 290 240Z" fill="rgba(255,255,255,0.6)" />
    <path d="M330 130 C330 130 324 123 324 119 C324 116 326 114 330 114 C334 114 336 116 336 119 C336 123 330 130 330 130Z" fill="rgba(255,255,255,0.5)" />

    {/* Floating hearts (actual heart shape) */}
    <g transform="translate(40,60) scale(0.7)" opacity="0.8">
      <path d="M20 35 C20 35 0 22 0 10 C0 4 5 0 10 0 C14 0 18 3 20 6 C22 3 26 0 30 0 C35 0 40 4 40 10 C40 22 20 35 20 35Z" fill="rgba(255,255,255,0.8)" />
    </g>
    <g transform="translate(295,145) scale(0.5)" opacity="0.7">
      <path d="M20 35 C20 35 0 22 0 10 C0 4 5 0 10 0 C14 0 18 3 20 6 C22 3 26 0 30 0 C35 0 40 4 40 10 C40 22 20 35 20 35Z" fill="rgba(255,255,255,0.8)" />
    </g>

    {/* Sparkles */}
    <g opacity="0.7">
      <path d="M155 60 L157 54 L159 60 L165 62 L159 64 L157 70 L155 64 L149 62 Z" fill="white" />
      <path d="M310 80 L311.5 76 L313 80 L317 81.5 L313 83 L311.5 87 L310 83 L306 81.5 Z" fill="white" opacity="0.8" />
    </g>
  </svg>
);

export default DonorIllustration;
