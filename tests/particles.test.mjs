import assert from 'node:assert/strict';
import test from 'node:test';
import { createParticlesForBurn, advanceParticles } from '../src/particles.js';

test('creates more particles for higher intensity burns', () => {
  const quiet = createParticlesForBurn({ type: 'text', intensity: 1 });
  const loud = createParticlesForBurn({ type: 'file', intensity: 4 });

  assert.ok(loud.length > quiet.length);
  assert.ok(quiet.every((particle) => ['spark', 'ash', 'pixel'].includes(particle.kind)));
});

test('reduced motion creates a smaller calmer particle set', () => {
  const normal = createParticlesForBurn({ type: 'avatar', intensity: 3 });
  const reduced = createParticlesForBurn({ type: 'avatar', intensity: 3 }, { reducedMotion: true });

  assert.ok(reduced.length < normal.length);
  assert.ok(reduced.every((particle) => Math.abs(particle.vx) <= 0.6));
});

test('advanceParticles moves particles and removes expired particles', () => {
  const particles = [{ kind: 'ash', x: 10, y: 10, vx: 1, vy: -2, lifeMs: 100, size: 2, alpha: 1 }];
  const advanced = advanceParticles(particles, 50, { width: 500, height: 500 });
  const expired = advanceParticles(particles, 150, { width: 500, height: 500 });

  assert.equal(advanced.length, 1);
  assert.notEqual(advanced[0].x, 10);
  assert.ok(advanced[0].alpha < 1);
  assert.equal(expired.length, 0);
});
