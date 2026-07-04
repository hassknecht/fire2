import { getAmbienceClass } from './ambience.js';
import { createAvatarBurn, createFileBurn, createSketchBurn, createTextBurn } from './burn-engine.js';
import { advanceParticles, createParticlesForBurn } from './particles.js';

function prefersReducedMotion() {
  return globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

function showFeedback(rootDocument, message) {
  const feedback = rootDocument.getElementById('feedbackMessage');
  if (!feedback) return;

  feedback.textContent = message;
  feedback.classList.remove('is-visible');
  void feedback.offsetWidth;
  feedback.classList.add('is-visible');
}

function surgeFire(rootDocument, intensity) {
  const firebox = rootDocument.getElementById('firebox');
  if (!firebox) return;

  firebox.style.setProperty('--surge-scale', String(Math.min(1.8, 1 + intensity * 0.16)));
  firebox.classList.add('is-surge');
  globalThis.setTimeout(() => firebox.classList.remove('is-surge'), 720);
}

function drawParticles(canvas, particles) {
  const context = canvas?.getContext?.('2d');
  if (!canvas || !context) return;

  const rect = canvas.getBoundingClientRect();
  const scale = globalThis.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * scale));
  canvas.height = Math.max(1, Math.floor(rect.height * scale));
  context.setTransform(scale, 0, 0, scale, 0, 0);
  context.clearRect(0, 0, rect.width, rect.height);

  for (const particle of particles) {
    const x = particle.x * rect.width;
    const y = particle.y * rect.height;
    context.globalAlpha = particle.alpha;
    context.fillStyle = particle.kind === 'ash' ? '#9b8f84' : particle.kind === 'pixel' ? '#ffcf78' : '#ff8a2a';
    context.beginPath();
    context.arc(x, y, particle.size, 0, Math.PI * 2);
    context.fill();
  }

  context.globalAlpha = 1;
}

function animateParticles(rootDocument, job) {
  const canvas = rootDocument.getElementById('ashCanvas');
  if (!canvas) return;

  let particles = createParticlesForBurn(job, { reducedMotion: prefersReducedMotion() });
  let previous = performance.now();

  function frame(now) {
    const delta = Math.min(48, now - previous);
    previous = now;
    particles = advanceParticles(particles, delta, {
      width: canvas.clientWidth || 1,
      height: canvas.clientHeight || 1
    });
    drawParticles(canvas, particles);

    if (particles.length > 0) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

function runBurn(rootDocument, job) {
  surgeFire(rootDocument, job.intensity);
  animateParticles(rootDocument, job);
  showFeedback(rootDocument, job.feedback);
}

function setupTextBurn(rootDocument) {
  const form = rootDocument.getElementById('textBurnForm');
  const textarea = rootDocument.getElementById('stressText');

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = textarea?.value || '';
    if (!text.trim()) return;
    runBurn(rootDocument, createTextBurn(text));
    textarea.value = '';
  });
}

function setupFileDrop(rootDocument) {
  const firebox = rootDocument.getElementById('firebox');
  if (!firebox) return;

  rootDocument.addEventListener('dragover', (event) => {
    event.preventDefault();
    firebox.classList.add('is-drop-target');
  });

  rootDocument.addEventListener('dragleave', () => {
    firebox.classList.remove('is-drop-target');
  });

  rootDocument.addEventListener('drop', (event) => {
    event.preventDefault();
    firebox.classList.remove('is-drop-target');
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      runBurn(rootDocument, createFileBurn(file));
    }
  });
}

function setupAvatars(rootDocument) {
  for (const avatar of rootDocument.querySelectorAll('[data-avatar]')) {
    avatar.addEventListener('click', () => {
      runBurn(rootDocument, createAvatarBurn(avatar.dataset.avatar));
    });
  }
}

function setupSketch(rootDocument) {
  const dialog = rootDocument.getElementById('sketchDialog');
  const canvas = rootDocument.getElementById('sketchCanvas');
  const context = canvas?.getContext?.('2d');
  let drawing = false;
  let strokeCount = 0;

  rootDocument.getElementById('openSketch')?.addEventListener('click', () => dialog?.showModal());
  rootDocument.getElementById('closeSketch')?.addEventListener('click', () => dialog?.close());
  rootDocument.getElementById('clearSketch')?.addEventListener('click', () => {
    context?.clearRect(0, 0, canvas.width, canvas.height);
    strokeCount = 0;
  });
  rootDocument.getElementById('burnSketch')?.addEventListener('click', () => {
    if (strokeCount > 0) {
      runBurn(rootDocument, createSketchBurn(strokeCount));
    }
    context?.clearRect(0, 0, canvas.width, canvas.height);
    strokeCount = 0;
    dialog?.close();
  });

  canvas?.addEventListener('pointerdown', (event) => {
    drawing = true;
    context.strokeStyle = '#ffd6a1';
    context.lineWidth = 4;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(event.offsetX, event.offsetY);
  });

  canvas?.addEventListener('pointermove', (event) => {
    if (!drawing) return;
    strokeCount += 1;
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
  });

  canvas?.addEventListener('pointerup', () => {
    drawing = false;
  });
}

export function initCyberHearth(rootDocument = document) {
  rootDocument.body.classList.remove('ambience-morning', 'ambience-dusk', 'ambience-night');
  rootDocument.body.classList.add(getAmbienceClass());

  const privacyDialog = rootDocument.getElementById('privacyDialog');
  rootDocument.getElementById('openPrivacy')?.addEventListener('click', () => privacyDialog?.showModal());
  rootDocument.getElementById('closePrivacy')?.addEventListener('click', () => privacyDialog?.close());

  setupTextBurn(rootDocument);
  setupFileDrop(rootDocument);
  setupAvatars(rootDocument);
  setupSketch(rootDocument);
}

initCyberHearth();
