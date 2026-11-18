/**
 * Fixed layer of large, softly blurred colour orbs drifting behind the page.
 * Gives the liquid-glass surfaces something colourful to refract.
 * Only transform is animated (GPU), and it stops under reduced motion.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <div className="orb orb-d" />
      <div className="orb orb-e" />
      {/* fine grain keeps large gradients from banding */}
      <div className="grain absolute inset-0" />
    </div>
  );
}
