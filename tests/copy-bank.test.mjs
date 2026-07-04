import assert from 'node:assert/strict';
import test from 'node:test';
import { getFeedbackCopy } from '../src/copy-bank.js';

test('returns deterministic local copy for a type and seed', () => {
  assert.equal(getFeedbackCopy('text', 0), '繁文缛节皆化虚无，还你自由清净。');
  assert.equal(getFeedbackCopy('avatar', 1), '你的宇宙已恢复通透。');
});

test('falls back to text copy for unknown burn types', () => {
  assert.equal(getFeedbackCopy('unknown', 0), '繁文缛节皆化虚无，还你自由清净。');
});

test('wraps seeds across the local copy list', () => {
  assert.equal(getFeedbackCopy('sketch', 99), getFeedbackCopy('sketch', 3));
});
