const SHAPES = {
  tee: (base, ink) => (
    <g>
      <path d="M60 55 L88 40 Q100 34 112 40 L140 55 L152 88 L128 98 L124 78 L124 165 L76 165 L76 78 L72 98 L48 88 Z" fill={base} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M88 40 Q100 52 112 40" fill="none" stroke={ink} strokeWidth="2.5" />
      <circle cx="100" cy="112" r="16" fill="none" stroke={ink} strokeWidth="2" opacity="0.85" />
      <text x="100" y="117" textAnchor="middle" fontSize="13" fontWeight="900" fill={ink} fontFamily="Anton, sans-serif">É</text>
    </g>
  ),
  hoodie: (base, ink) => (
    <g>
      <path d="M62 62 L86 44 Q100 34 114 44 L138 62 L152 96 L130 105 L126 84 L126 168 L74 168 L74 84 L70 105 L48 96 Z" fill={base} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M82 52 Q100 30 118 52 Q112 64 100 64 Q88 64 82 52 Z" fill={base} stroke={ink} strokeWidth="2.5" />
      <line x1="94" y1="64" x2="92" y2="86" stroke={ink} strokeWidth="2.5" />
      <line x1="106" y1="64" x2="108" y2="86" stroke={ink} strokeWidth="2.5" />
      <path d="M80 140 L120 140 L116 162 L84 162 Z" fill="none" stroke={ink} strokeWidth="2" opacity="0.8" />
    </g>
  ),
  cargo: (base, ink) => (
    <g>
      <path d="M72 38 L128 38 L134 172 L106 172 L100 96 L94 172 L66 172 Z" fill={base} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="74" y="86" width="18" height="22" rx="2" fill="none" stroke={ink} strokeWidth="2" opacity="0.85" />
      <rect x="108" y="86" width="18" height="22" rx="2" fill="none" stroke={ink} strokeWidth="2" opacity="0.85" />
      <line x1="72" y1="50" x2="128" y2="50" stroke={ink} strokeWidth="2" opacity="0.85" />
    </g>
  ),
  cap: (base, ink) => (
    <g>
      <path d="M56 112 Q56 62 100 62 Q144 62 144 112 Z" fill={base} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M100 62 L100 112" stroke={ink} strokeWidth="2" opacity="0.7" />
      <path d="M56 112 L144 112 L158 126 Q160 132 152 132 L56 124 Z" fill={base} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <text x="100" y="100" textAnchor="middle" fontSize="15" fontWeight="900" fill={ink} fontFamily="Anton, sans-serif">ÈKÓ</text>
    </g>
  ),
  tote: (base, ink) => (
    <g>
      <path d="M66 84 L134 84 L142 168 L58 168 Z" fill={base} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M80 84 Q80 52 100 52 Q120 52 120 84" fill="none" stroke={ink} strokeWidth="3" />
      <text x="100" y="134" textAnchor="middle" fontSize="14" fontWeight="900" fill={ink} fontFamily="Anton, sans-serif">ÈKÓ</text>
    </g>
  ),
  socks: (base, ink) => (
    <g>
      <path d="M84 44 L118 44 L118 116 Q118 124 126 130 L142 142 Q152 150 144 160 Q136 170 124 162 L92 138 Q84 132 84 120 Z" fill={base} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M84 52 L118 52 M84 62 L118 62" stroke={ink} strokeWidth="4" />
    </g>
  ),
};

export default function Garment({ type, base, ink, size = "100%" }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} role="img" aria-label={type}>
      {SHAPES[type]?.(base, ink)}
    </svg>
  );
}
