import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';

const root = require('./helpers').root;

const build = require(root('modules/widget/build'));


gulp.task('build:lib', (cb) => {
  console.log('building lib');
  build().then(() => {
    console.log('build complete.');
    cb();
  }).catch(err => {
    console.log(`build err: ${err.message}`)
  })
});

gulp.task('copy:lib', () => {
  return gulp
    .src('modules/widget/dist/**/*')
    .pipe(gulp.dest('node_modules/@rankit/widget'));
});

gulp.task('update:lib', (cb) => runSequence('build:lib', 'copy:lib', cb));

gulp.task('watch:lib', () => {
  return gulp.watch([ root('modules/widget/src/lib/**/*.{ts,scss,html}') ], [ 'update:lib' ]);
});
