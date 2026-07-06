/**
 * Static gradient-mesh backdrop shown while the 3D canvas lazy-loads, on SSR,
 * and as the reduced-motion / low-power equivalent of the particle field.
 * Pure CSS — no JS, no WebGL.
 */
export default function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,var(--accent-glow),transparent_60%)] blur-2xl" />
      <div className="absolute left-[20%] top-[30%] h-[40vmin] w-[40vmin] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_65%)] blur-2xl" />
      <div className="absolute bottom-[12%] right-[16%] h-[46vmin] w-[46vmin] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.2),transparent_65%)] blur-2xl" />
    </div>
  );
}
