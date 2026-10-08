export function HexPattern({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="hex-pattern"
          width="56"
          height="96"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1.05)"
        >
          <path
            d="M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z M28 32 L56 48 M28 32 L0 48 M28 32 L28 64 M28 32 L28 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.08"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-pattern)" />
    </svg>
  );
}