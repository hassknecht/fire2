import assert from 'node:assert/strict';
import test from 'node:test';
import { getAmbienceClass, getAmbienceForHour } from '../src/ambience.js';

test('selects morning ambience from 5:00 through 10:59', () => {
  assert.equal(getAmbienceForHour(5), 'morning');
  assert.equal(getAmbienceForHour(10), 'morning');
});

test('selects dusk ambience from 11:00 through 20:59', () => {
  assert.equal(getAmbienceForHour(11), 'dusk');
  assert.equal(getAmbienceForHour(20), 'dusk');
});

test('selects night ambience for late night and pre-dawn', () => {
  assert.equal(getAmbienceForHour(21), 'night');
  assert.equal(getAmbienceForHour(4), 'night');
});

test('returns the class name used by the stylesheet', () => {
  assert.equal(getAmbienceClass(new Date('2026-07-04T06:30:00')), 'ambience-morning');
  assert.equal(getAmbienceClass(new Date('2026-07-04T18:30:00')), 'ambience-dusk');
  assert.equal(getAmbienceClass(new Date('2026-07-04T23:30:00')), 'ambience-night');
});
