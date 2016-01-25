var gulp = require('gulp');
var Server = require('karma').Server;

// Run the unit tests once using Karma/PhantomJS
gulp.task('test', function (done) {
  new Server({ configFile: __dirname + '/karma_conf.js' }).start(null, done);
});

gulp.task('default', [ 'test' ]);