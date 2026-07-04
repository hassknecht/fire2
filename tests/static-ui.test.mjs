import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import test from 'node:test';

const html = await readFile(new URL('../src/hearth.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');
const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');

test('hearth page contains accessible controls for all first-version interactions', () => {
  assert.match(html, /id="textBurnForm"/);
  assert.match(html, /aria-label="Burn pasted text"/);
  assert.match(html, /id="avatarRail"/);
  assert.match(html, /aria-label="Symbolic avatars"/);
  assert.match(html, /id="sketchDialog"/);
  assert.match(html, /aria-label="Open sketch canvas"/);
  assert.match(html, /id="privacyDialog"/);
  assert.match(html, /Local only/);
});

test('styles include reduced motion and minimum touch target rules', () => {
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /min-width:\s*44px/);
});

test('app and styles expose hooks for burn interaction states', () => {
  assert.match(css, /\.is-surge/);
  assert.match(css, /\.is-drop-target/);
  assert.match(css, /\.burn-token/);
  assert.match(css, /\.ash-pile/);
  assert.match(html, /data-avatar="拖延症"/);
});

test('README documents local-only privacy and unpacked extension loading', () => {
  assert.match(readme, /chrome:\/\/extensions/);
  assert.match(readme, /Load unpacked/);
  assert.match(readme, /No account/);
  assert.match(readme, /No backend/);
  assert.match(readme, /No analytics/);
  assert.match(readme, /No upload/);
});
