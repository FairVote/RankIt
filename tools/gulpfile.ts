import * as gulp from 'gulp';

const root = require('./helpers').root;

const build = require(root('modules/widget/build'));


gulp.task('build:lib', () => {
  console.log('building lib');
  return build();
});

gulp.task('watch:lib', () => {
  return gulp.watch([ root('modules/widget/src/lib/**/*.{ts,scss,html}') ], [ 'build:lib' ]);
});
