function particleCountFor(intensity, reducedMotion) {
  const base = Math.round(12 + Number(intensity || 1) * 10);
  return reducedMotion ? Math.max(4, Math.round(base * 0.28)) : base;
}

function makeParticle(index, total, type, reducedMotion) {
  const spread = total <= 1 ? 0 : index / (total - 1) - 0.5;
  const avatarPixel = type === 'avatar' && index % 3 === 0;
  const ash = index % 4 === 0;
  const kind = avatarPixel ? 'pixel' : ash ? 'ash' : 'spark';
  const calm = reducedMotion ? 0.28 : 1;

  return {
    kind,
    x: 0.5 + spread * 0.18,
    y: 0.68,
    vx: spread * 2.2 * calm,
    vy: (-1.4 - (index % 5) * 0.18) * calm,
    lifeMs: 900 + (index % 7) * 120,
    size: kind === 'pixel' ? 3 : kind === 'ash' ? 2 : 2.6,
    alpha: 1
  };
}

export function createParticlesForBurn(job, options = {}) {
  const reducedMotion = Boolean(options.reducedMotion);
  const total = particleCountFor(job?.intensity ?? 1, reducedMotion);

  return Array.from({ length: total }, (_, index) => makeParticle(index, total, job?.type, reducedMotion));
}

export function advanceParticles(particles, deltaMs, bounds) {
  const seconds = deltaMs / 1000;
  const width = bounds?.width || 1;
  const height = bounds?.height || 1;

  return particles
    .map((particle) => {
      const lifeMs = particle.lifeMs - deltaMs;

      return {
        ...particle,
        x: particle.x + (particle.vx * seconds) / width,
        y: particle.y + (particle.vy * seconds) / height,
        vy: particle.vy + 0.55 * seconds,
        lifeMs,
        alpha: Math.max(0, lifeMs / particle.lifeMs)
      };
    })
    .filter((particle) => particle.lifeMs > 0);
}
