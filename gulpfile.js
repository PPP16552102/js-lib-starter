import gulp from 'gulp';
import fs from 'fs-extra';

const clear = gulp.task('clear', async function () {
  await fs.emptydir('./dist/');
});

export { clear };
