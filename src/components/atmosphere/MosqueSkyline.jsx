/**
 * Decorative mosque skyline silhouette — domes, minarets & crescents.
 * Purely ornamental, sits low in a section as a soft horizon line.
 */
export default function MosqueSkyline({ className = '' }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 220"
      preserveAspectRatio="none"
      className={className}
      fill="currentColor"
    >
      <path d="M0 220V150c30-4 55-18 55-40 0-10 8-18 18-18s18 8 18 18c0 22 25 36 55 40v70H0Z" opacity="0.55" />
      <path d="M120 220V120c0-33 27-60 60-60s60 27 60 60v100H120Z" opacity="0.7" />
      <path d="M148 68a32 32 0 0 1 64 0c0 14-14 26-32 26s-32-12-32-26Z" opacity="0.7" />
      <rect x="176" y="8" width="8" height="30" opacity="0.7" />
      <circle cx="180" cy="4" r="5" opacity="0.7" />

      <path d="M260 220v-60c0-14 11-25 25-25s25 11 25 25v60h-50Z" opacity="0.45" />

      <path d="M520 220V100c0-55 45-100 100-100s100 45 100 100v120H520Z" opacity="0.85" />
      <path d="M560 78a60 60 0 0 1 120 0c0 26-27 46-60 46s-60-20-60-46Z" opacity="0.85" />
      <rect x="616" y="2" width="8" height="34" opacity="0.85" />
      <circle cx="620" cy="-3" r="6" opacity="0.85" />

      <path d="M420 220v-90c0-18 15-33 33-33s33 15 33 33v90h-66Z" opacity="0.6" />
      <path d="M780 220v-90c0-18 15-33 33-33s33 15 33 33v90h-66Z" opacity="0.6" />

      <path d="M900 220V120c0-33 27-60 60-60s60 27 60 60v100H900Z" opacity="0.7" />
      <path d="M928 68a32 32 0 0 1 64 0c0 14-14 26-32 26s-32-12-32-26Z" opacity="0.7" />
      <rect x="956" y="8" width="8" height="30" opacity="0.7" />
      <circle cx="960" cy="4" r="5" opacity="0.7" />

      <path d="M1040 220v-60c0-14 11-25 25-25s25 11 25 25v60h-50Z" opacity="0.45" />

      <path d="M1280 220V150c30-4 55-18 55-40 0-10 8-18 18-18s18 8 18 18c0 22 25 36 55 40v70h-146Z" opacity="0.55" />

      <rect x="0" y="210" width="1440" height="10" opacity="0.9" />
    </svg>
  )
}
