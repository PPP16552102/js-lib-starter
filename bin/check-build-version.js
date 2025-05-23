import fs from 'fs';
import assert from 'assert';
import app from '../index.js';

const { version } = JSON.parse(fs.readFileSync('./package.json'));

console.log('Checking versions...\n----------------------------');

console.log(`Package version: v${version}`);
console.log(`App version: v${app.VERSION}`);
console.log(`----------------------------`);

assert.strictEqual(
  version,
  app.VERSION,
  `Version mismatch between package and App ${version} != ${app.VERSION}`,
);

console.log('✔️ PASSED\n');
