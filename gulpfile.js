var gulp = require('gulp');
var Server = require('karma').Server;

var concat = require('gulp-concat');
var jade = require('gulp-jade');
var less = require('gulp-less');
var ngHtml2Js = require("gulp-ng-html2js");
var rename = require('gulp-rename');

// Compile our LESS files into CSS
gulp.task('css', function () {
  return gulp.src('app/styles.less')
    .pipe(less())
    .pipe(gulp.dest('build/'));
});

// Process the templates
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

gulp.task('copy', function () {
  return gulp.src([ 'app/**/*.js', '!app/**/*.unit.spec.js',
                    'app/index.html',
                    'node_modules/angular/angular.js',
                    'node_modules/angular-messages/angular-messages.js' ])
    .pipe(gulp.dest('build/'));
})

// Run the unit tests once using Karma/PhantomJS
// NB: we need the templates modules to run the unit tests
gulp.task('test', [ 'templates' ], function (done) {
  new Server({ configFile: __dirname + '/karma_conf.js' }).start(null, done);
});

gulp.task('default', [ 'css', 'templates', 'test', 'copy' ]);