import fs from 'fs';
import assert from 'assert';
import app from '../index.js';
// import appBuild from '../dist/node/app.cjs';

const { version } = JSON.parse(fs.readFileSync('./package.json'));

console.log('Checking versions...\n----------------------------');

console.log(`Package version: v${version}`);
console.log(`Axios version: v${app.VERSION}`);
// console.log(`Axios build version: v${appBuild.VERSION}`);
console.log(`----------------------------`);

assert.strictEqual(
  version,
  app.VERSION,
  `Version mismatch between package and Axios ${version} != ${app.VERSION}`,
);

// assert.strictEqual(
//   version,
//   appBuild.VERSION,
//   `Version mismatch between package and build ${version} != ${appBuild.VERSION}`,
// );

console.log('✔️ PASSED\n');
