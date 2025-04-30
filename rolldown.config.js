import lib from './package.json' assert { type: 'json' };
const defaultInput = './lib/app.js';
const outputFileName = 'app';
const name = outputFileName;

const year = new Date().getFullYear();
const banner = `/*! ${lib.name} v${lib.version} Copyright (c) ${year} ${lib.author} and contributors */`;

console.log(banner);

export default [
  {
    input: defaultInput,
    output: {
      file: `dist/${outputFileName}.js`,
      name,
      format: 'umd',
    },
  },
];
