const path = require('path');

// Register TS compilation.
require('ts-node').register({
  project: path.join(__dirname, 'tools/tsconfig-gulp.json')
});

require('./tools/gulpfile');
