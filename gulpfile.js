import gulp from 'gulp';
import fs from 'fs-extra';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const clear = gulp.task('clear', async function () {
  await fs.emptydir('./dist/');
});

const bower = gulp.task('bower', async function () {
  const npm = JSON.parse(await fs.readFile('package.json'));
  const bower = JSON.parse(await fs.readFile('bower.json'));

  const fields = [
    'name',
    'description',
    'version',
    'homepage',
    'license',
    'keywords',
  ];

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    bower[field] = npm[field];
  }

  await fs.writeFile('bower.json', JSON.stringify(bower, null, 2));
});

const env = gulp.task('env', async function () {
  var npm = JSON.parse(await fs.readFile('package.json'));

  const envFilePath = './lib/env/data.js';

  await fs.writeFile(
    envFilePath,
    Object.entries({
      VERSION: (argv.bump || npm.version).replace(/^v/, ''),
    })
      .map(([key, value]) => {
        return `export const ${key} = ${JSON.stringify(value)}`;
      })
      .join('\n'),
  );
});

const version = gulp.series('bower', 'env');

export { clear, bower, env, version };
