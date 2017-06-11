const path = require('path');

exports.root = function (it) {
  return path.resolve(__dirname, '..', it);
};
