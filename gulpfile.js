var gulp = require('gulp');
var Server = require('karma').Server;

var concat = require('gulp-concat');
var jade = require('gulp-jade');
var ngHtml2Js = require("gulp-ng-html2js");
var rename = require('gulp-rename');

// Process the templates so we can properly test the components
gulp.task('templates', function () {
  // Preprocess JADE templates before passing them to html2js
  return gulp.src([ 'app/**/*.tpl.jade' ])
    .pipe(jade())
    // Keep jade as the file extenstion so we can require the modules by the original filename (and not filename -.jade +.html)
    .pipe(rename(function (path) { path.extname = '.jade' }))
    // Compile the templates into a JS module that puts them in $templateCache
    .pipe(ngHtml2Js())
    // Concatenate all the templates together into a single file
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('build/'));
});

// Run the unit tests once using Karma/PhantomJS
gulp.task('test', [ 'templates' ], function (done) {
  new Server({ configFile: __dirname + '/karma_conf.js' }).start(null, done);
});

gulp.task('default', [ 'test' ]);