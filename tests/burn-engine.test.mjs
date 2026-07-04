import assert from 'node:assert/strict';
import test from 'node:test';
import { createAvatarBurn, createFileBurn, createSketchBurn, createTextBurn } from '../src/burn-engine.js';

test('creates a text burn without storing the original content', () => {
  const job = createTextBurn('这里是一段很长很烦的合同条款，需要被烧掉。');

  assert.equal(job.type, 'text');
  assert.equal(job.label, 'Text fragment');
  assert.equal(job.metadata.content, undefined);
  assert.equal(job.metadata.characterCount, 21);
  assert.ok(job.intensity > 0);
  assert.ok(job.durationMs >= 1200);
});

test('creates a file burn from metadata only', () => {
  const job = createFileBurn({ name: 'annoying-contract.pdf', size: 2_400_000, type: 'application/pdf', text: 'secret' });

  assert.equal(job.type, 'file');
  assert.equal(job.label, 'annoying-contract.pdf');
  assert.deepEqual(job.metadata, {
    extension: 'pdf',
    size: 2400000,
    type: 'application/pdf'
  });
  assert.equal(job.metadata.text, undefined);
  assert.ok(job.intensity > 1);
});

test('creates sketch and avatar burns with bounded intensity', () => {
  const sketch = createSketchBurn(140);
  const avatar = createAvatarBurn('拖延症');

  assert.equal(sketch.type, 'sketch');
  assert.equal(sketch.metadata.strokeCount, 140);
  assert.ok(sketch.intensity <= 3);
  assert.equal(avatar.type, 'avatar');
  assert.equal(avatar.label, '拖延症');
  assert.ok(avatar.feedback.length > 0);
});
