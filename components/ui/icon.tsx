import type { CSSProperties } from "react";

const paths = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  chevron: <path d="m7 10 5 5 5-5" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  cart: (
    <>
      <path d="M2 3h3l3 12h11l3-9H6M9 19h.01M18 19h.01" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M4 22v-3a8 8 0 0 1 16 0v3" />
    </>
  ),
  truck: (
    <>
      <path d="M2 5h12v12H2zM14 9h4l4 5v3h-8M2 9h7M2 12h5" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  shield: (
    <>
      <path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  gift: (
    <>
      <path d="M3 10h18v4H3zM5 14v7h14v-7M12 10v11" />
      <path d="M12 10S3 10 5 5s7 5 7 5Zm0 0s9 0 7-5-7 5-7 5Z" />
    </>
  ),
  box: (
    <>
      <path d="m12 2 10 5-10 5L2 7zM2 7v11l10 5 10-5V7M12 12v11M7 4.5l10 5" />
    </>
  ),
  chat: (
    <>
      <path d="M21 11a9 9 0 0 1-9 9 12 12 0 0 1-4-1l-6 3 2-6a9 9 0 1 1 17-5Z" />
      <path d="M7 10h10M7 14h6" />
    </>
  ),
  star: (
    <path d="m12 2 3 6.3 7 .9-5 4.9 1.2 6.9L12 17.7 5.8 21 7 14.1 2 9.2l7-.9z" />
  ),
  fire: (
    <path d="M13 2c1 5-4 6-3 10 2 0 4-2 4-4 4 4 7 7 4 11-3 4-11 3-13-2C3 12 8 10 7 6c2 1 3 2 3 3 2-3 1-5 3-7Z" />
  ),
  diaper: (
    <>
      <path d="M3 5h18v6c0 7-6 11-9 11S3 18 3 11zM3 8h18M3 13c6 0 6 4 6 8m12-8c-6 0-6 4-6 8" />
      <path d="M5 4v4m14-4v4" />
    </>
  ),
  bottle: (
    <>
      <path d="M10 2h4v4h2v4l2 3v9H6v-9l2-3V6h2zM8 10h8M7 15h4M7 18h4" />
    </>
  ),
  bowl: (
    <>
      <path d="M2 11h20c0 7-5 10-10 10S2 18 2 11Zm12 0 5-8a2 2 0 0 1 3 2l-6 6M8 22h8" />
    </>
  ),
  bath: (
    <>
      <path d="M2 12h20l-2 7H4zM6 19v3m12-3v3" />
      <circle cx="7" cy="7" r="2" />
      <circle cx="15" cy="4" r="2" />
      <circle cx="18" cy="9" r="1" />
    </>
  ),
  stroller: (
    <>
      <path d="M3 3h3l4 14h9M8 10h14a10 10 0 0 1-12 7M12 10V2a9 9 0 0 1 10 8" />
      <circle cx="10" cy="21" r="1.5" />
      <circle cx="19" cy="21" r="1.5" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 22V10M12 15C2 16 2 8 2 8s10-2 10 7Zm0-5C12 1 22 2 22 2s1 9-10 8Z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" />
    </>
  ),
  bear: (
    <>
      <circle cx="5" cy="5" r="3" />
      <circle cx="19" cy="5" r="3" />
      <circle cx="12" cy="13" r="9" />
      <path d="M8 11h.01M16 11h.01M10 16c0 3 4 3 4 0M11 15h2" />
    </>
  ),
  balloon: (
    <>
      <ellipse cx="12" cy="9" rx="7" ry="8" />
      <path d="m12 17-2 3h4zM12 20c-3 3 3 3 0 6M8 7c0-2 1-3 3-3" />
    </>
  ),
  moon: (
    <>
      <path d="M20 15A9 9 0 0 1 9 3 9 9 0 1 0 20 15Z" />
      <path d="M18 2v4m-2-2h4M22 8v2m-1-1h2" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
} as const;

export type IconName = keyof typeof paths;
export function Icon({
  name,
  size = 24,
  className = "",
  style,
}: {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {paths[name]}
    </svg>
  );
}
