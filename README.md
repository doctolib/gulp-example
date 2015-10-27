# gulp-example

Gulp plugin to generate example.

## Install

```
npm install @doctolib/gulp-example
```

## Usage

### Configuration

The package.json is used to generate example, you can provide custom values:

```js
{
  "examples": {
    "title": "Custom title",
    "description": "Custom description",
    "keywords": ["custom", "keywords"],
    "codeHighlighting": true
  }
}
```

### generateIndex(pkg)

Generate templated index.

```js
gulp.task('build:examples:html', () => {
  const pkg = require('./package.json');
  return githubExample.generateIndex(pkg)
    .pipe(gulp.dest(config.examples.dest));
  });
```

### generateVendor(pkg)

Generate vendor dependencies.

```js
gulp.task('build:examples:vendor', () => {
  const pkg = require('./package.json');
  return gulp.src(path.join(config.examples.src, 'vendor', '**/*'), {
      base: path.join(config.examples.src, 'vendor')
    })
    .pipe(githubExample.generateVendor(pkg))
    .pipe(gulp.dest(path.join(config.examples.dest, 'vendor')));
  });
```

## License

MIT
