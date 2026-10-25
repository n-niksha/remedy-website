type P = { size?: number; className?: string; strokeWidth?: number };

function base(size: number, sw: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };
}

export const Check = ({ size = 16, className, strokeWidth = 2.4 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const Arrow = ({ size = 16, className = "arrow", strokeWidth = 2 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Play = ({ size = 28, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" fill="currentColor" />
  </svg>
);

export const Scan = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10" />
  </svg>
);

export const Text = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M4 7V5h16v2M9 19h6M12 5v14" />
  </svg>
);

export const Shield = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Bell = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

export const Pill = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7ZM8.5 8.5l7 7" />
  </svg>
);

export const Calendar = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <rect x="3" y="4" width="18" height="18" rx="3" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

export const Chat = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
  </svg>
);

export const Sun = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const Lock = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <rect x="4" y="11" width="16" height="11" rx="3" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
);

export const Phone = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <rect x="6" y="2" width="12" height="20" rx="3" />
    <path d="M11 18h2" />
  </svg>
);

export const Quote = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M6 9h4v4H6zM6 13c0 3 1 4 3 5M14 9h4v4h-4zM14 13c0 3 1 4 3 5" />
  </svg>
);

export const Alert = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0ZM12 9v4M12 17h.01" />
  </svg>
);

export const Users = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const Building = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1M14 9h1M9 13h1M14 13h1M10 21v-4h4v4" />
  </svg>
);

export const Heart = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" />
  </svg>
);

export const Doc = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v6h6M8 13h8M8 17h5" />
  </svg>
);

export const Wifi = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M2 2l20 20M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 5.17-2.8M19 13a10 10 0 0 0-2.2-1.6M2 8.8a15 15 0 0 1 4.2-2.6M22 8.8A15 15 0 0 0 11 4.6M12 20h.01" />
  </svg>
);

export const Spark = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2Z" />
  </svg>
);

export const Plus = ({ size = 16, className, strokeWidth = 2 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Chart = ({ size = 20, className, strokeWidth = 1.9 }: P) => (
  <svg {...base(size, strokeWidth, className)}>
    <path d="M3 3v18h18M7 15l4-4 3 3 5-6" />
  </svg>
);
