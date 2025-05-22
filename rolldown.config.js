import { readFileSync } from 'fs';
const entry = './lib/app.js';
const outputFileName = 'app';
const name = outputFileName;
const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url)),
);

const year = new Date().getFullYear();
const banner = `/*! ${pkg.name} v${pkg.version} Copyright (c) ${year} ${pkg.author} and contributors */`;

console.log(banner);

export default [
  {
    input: entry,
    output: {
      file: `dist/esm/${outputFileName}.js`,
      name,
      format: 'esm',
    },
  },
  {
    input: entry,
    output: {
      file: `dist/browser/${outputFileName}.js`,
      name,
      format: 'cjs',
    },
  },
  {
    input: entry,
    output: {
      file: `dist/node/${outputFileName}.js`,
      name,
      format: 'cjs',
    },
  },
  {
    input: entry,
    output: {
      file: `dist/${outputFileName}.js`,
      name,
      format: 'esm',
    },
  },
];
