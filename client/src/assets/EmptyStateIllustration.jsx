const EmptyStateIllustration = () => (
  <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-44 h-36 mx-auto">
    <defs>
      <linearGradient id="emptyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#f1f5f9" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="100" cy="168" rx="65" ry="8" fill="#e2e8f0" />
    {/* Document */}
    <rect x="45" y="30" width="110" height="135" rx="12" fill="url(#emptyGrad)" stroke="#e2e8f0" strokeWidth="2" />
    {/* Fold corner */}
    <path d="M130 30 L155 55 L130 55 Z" fill="#e2e8f0" />
    <path d="M130 30 L155 55 L130 55 Z" fill="#cbd5e1" opacity="0.5" />
    {/* Lines */}
    <rect x="60" y="70" width="80" height="8" rx="4" fill="#e2e8f0" />
    <rect x="60" y="86" width="65" height="8" rx="4" fill="#e2e8f0" />
    <rect x="60" y="102" width="72" height="8" rx="4" fill="#e2e8f0" />
    <rect x="60" y="118" width="50" height="8" rx="4" fill="#e2e8f0" />
    {/* Search circle */}
    <circle cx="100" cy="42" r="22" fill="#fef2f2" stroke="#fecaca" strokeWidth="2" />
    <circle cx="97" cy="39" r="9" stroke="#ef4444" strokeWidth="2.5" fill="none" />
    <line x1="103" y1="46" x2="110" y2="53" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
    {/* X mark */}
    <path d="M93 35 L101 43 M101 35 L93 43" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default EmptyStateIllustration;
