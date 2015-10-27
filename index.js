'use strict';

const _template = require('lodash.template');
const fs = require('vinyl-fs');
const through = require('through2');
const path = require('path');
const addsrc = require('gulp-add-src');

/**
 * Generate index.
 *
 * @param {object} pkg
 */

exports.generateIndex = function (pkg) {
  return fs.src(path.join(__dirname, 'templates/index.html'))
    .pipe(through.obj((file, enc, cb) => {
      const compiled = _template(file.contents.toString('utf8'));
      const matches = pkg.repository.url.match(/([^\/]+\/[^\/]+).git$/);
      const shortRepo = matches ? matches[1] : 'doctolib/' + pkg.name;
      pkg.examples = pkg.examples || {};

      const data = compiled({
        title: pkg.examples.title || pkg.name,
        description: pkg.examples.description || pkg.description,
        keywords: pkg.examples.keywords || pkg.keywords,
        license: pkg.license,
        codeHighlighting: pkg.examples.codeHighlighting || false,
        url: pkg.homepage,
        repository: {
          url: 'https://github.com/' + shortRepo,
          short: shortRepo
        },
        private: pkg.license === 'UNLICENSED'
      });

      file.contents = new Buffer(data, 'utf8');

      cb(null, file);
    }));
};

/**
 * Generate vendor.
 *
 * @param {object} pkg
 */

exports.generateVendor = function (pkg) {
  return pkg.examples && pkg.examples.codeHighlighting ?
    addsrc(path.join(__dirname, 'templates/vendor/prism*'), {
      base: path.join(__dirname, 'templates/vendor')
    }) :
    through.obj();
};
