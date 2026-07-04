import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import test from 'node:test';

const manifest = JSON.parse(await readFile(new URL('../manifest.json', import.meta.url), 'utf8'));

test('manifest uses a full-screen new-tab extension page', () => {
  assert.equal(manifest.manifest_version, 3);
  assert.equal(manifest.name, 'Cyber Hearth');
  assert.equal(manifest.chrome_url_overrides.newtab, 'src/hearth.html');
});

test('manifest does not request broad or remote-capable permissions', () => {
  assert.deepEqual(manifest.permissions ?? [], []);
  assert.deepEqual(manifest.host_permissions ?? [], []);
  assert.equal(manifest.action, undefined);
  assert.equal(manifest.background, undefined);
  assert.equal(manifest.content_scripts, undefined);
});
