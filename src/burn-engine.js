import { getFeedbackCopy } from './copy-bank.js';

let burnSequence = 0;

function nextId(type) {
  burnSequence += 1;
  return `${type}-${burnSequence}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function durationFromIntensity(intensity) {
  return Math.round(900 + intensity * 520);
}

function extensionFromName(name) {
  const parts = String(name || 'file').split('.');
  return parts.length > 1 ? parts.at(-1).toLowerCase() : '';
}

export function createTextBurn(text) {
  const characterCount = String(text || '').trim().length;
  const intensity = clamp(0.8 + characterCount / 80, 0.8, 3.2);

  return {
    id: nextId('text'),
    type: 'text',
    label: 'Text fragment',
    intensity,
    durationMs: durationFromIntensity(intensity),
    feedback: getFeedbackCopy('text', characterCount),
    metadata: {
      characterCount
    }
  };
}

export function createFileBurn(fileLike) {
  const name = String(fileLike?.name || 'untitled-file');
  const size = Number(fileLike?.size || 0);
  const intensity = clamp(1 + size / 2_000_000, 1, 4);

  return {
    id: nextId('file'),
    type: 'file',
    label: name,
    intensity,
    durationMs: durationFromIntensity(intensity),
    feedback: getFeedbackCopy('file', size),
    metadata: {
      extension: extensionFromName(name),
      size,
      type: String(fileLike?.type || '')
    }
  };
}

export function createSketchBurn(strokeCount) {
  const safeStrokeCount = Math.max(0, Number(strokeCount || 0));
  const intensity = clamp(0.9 + safeStrokeCount / 90, 0.9, 3);

  return {
    id: nextId('sketch'),
    type: 'sketch',
    label: 'Sketch',
    intensity,
    durationMs: durationFromIntensity(intensity),
    feedback: getFeedbackCopy('sketch', safeStrokeCount),
    metadata: {
      strokeCount: safeStrokeCount
    }
  };
}

export function createAvatarBurn(label) {
  const safeLabel = String(label || '压力源');
  const intensity = 2.2;

  return {
    id: nextId('avatar'),
    type: 'avatar',
    label: safeLabel,
    intensity,
    durationMs: durationFromIntensity(intensity),
    feedback: getFeedbackCopy('avatar', safeLabel.length),
    metadata: {
      label: safeLabel
    }
  };
}
