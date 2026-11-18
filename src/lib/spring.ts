/**
 * Tiny spring-physics engine (damped harmonic oscillator) shared by all
 * "liquid" interactions. One requestAnimationFrame loop drives every active
 * spring and stops when they all settle.
 */

export type SpringConfig = { stiffness: number; damping: number };

/** Build a spring from a period (seconds) and damping ratio (<1 = wobbly, 1 = no overshoot). */
export function springPreset(period: number, dampingRatio: number): SpringConfig {
  const w = (2 * Math.PI) / period;
  return { stiffness: w * w, damping: 2 * dampingRatio * w };
}

export const springs = {
  /** quick, firm response to a finger press */
  press: springPreset(0.2, 0.85),
  /** iOS-like jelly release: overshoots and wobbles back */
  jelly: springPreset(0.42, 0.36),
  /** soft hover lift */
  lift: springPreset(0.3, 0.75),
  /** follow the pointer while dragging */
  drag: springPreset(0.14, 0.9),
  /** liquid indicator sliding between items */
  glide: springPreset(0.38, 0.68),
  /** gentle background parallax */
  float: springPreset(1.4, 0.9),
};

type SpringState = {
  value: number;
  target: number;
  velocity: number;
  cfg: SpringConfig;
  onUpdate: (value: number, velocity: number) => void;
};

const active = new Set<SpringState>();
let raf = 0;
let last = 0;

function prefersReduced() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function frame(now: number) {
  const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
  last = now;
  // fixed sub-steps keep stiff springs stable at any frame rate
  const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
  const h = dt / steps;

  for (const s of active) {
    for (let i = 0; i < steps; i++) {
      const accel = -s.cfg.stiffness * (s.value - s.target) - s.cfg.damping * s.velocity;
      s.velocity += accel * h;
      s.value += s.velocity * h;
    }
    if (Math.abs(s.value - s.target) < 1e-4 && Math.abs(s.velocity) < 1e-3) {
      s.value = s.target;
      s.velocity = 0;
      active.delete(s);
    }
    s.onUpdate(s.value, s.velocity);
  }
  raf = active.size ? requestAnimationFrame(frame) : 0;
}

function wake() {
  if (!raf) {
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
}

export type Spring = ReturnType<typeof createSpring>;

export function createSpring(initial: number, cfg: SpringConfig, onUpdate: (value: number, velocity: number) => void) {
  const s: SpringState = { value: initial, target: initial, velocity: 0, cfg, onUpdate };
  return {
    get value() {
      return s.value;
    },
    get velocity() {
      return s.velocity;
    },
    /** Animate to a new target (optionally switching the spring feel). */
    to(target: number, nextCfg?: SpringConfig) {
      if (nextCfg) s.cfg = nextCfg;
      s.target = target;
      if (prefersReduced() || document.hidden) {
        s.value = target;
        s.velocity = 0;
        active.delete(s);
        s.onUpdate(s.value, 0);
        return;
      }
      active.add(s);
      wake();
    },
    /** Jump without animating. */
    snap(value: number) {
      s.value = s.target = value;
      s.velocity = 0;
      active.delete(s);
      s.onUpdate(value, 0);
    },
    /** Kick the spring (adds velocity), e.g. a wobble on click. */
    impulse(v: number) {
      if (prefersReduced()) return;
      s.velocity += v;
      active.add(s);
      wake();
    },
    stop() {
      active.delete(s);
    },
  };
}

/** Rubber-band resistance (like iOS overscroll): grows fast then flattens toward `max`. */
export function rubberband(distance: number, max: number, c = 0.55) {
  return Math.sign(distance) * (1 - 1 / ((Math.abs(distance) * c) / max + 1)) * max;
}
