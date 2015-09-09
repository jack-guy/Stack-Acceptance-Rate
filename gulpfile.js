var gulp = require('gulp');
var zip = require('gulp-zip');

var p = require('./package.json')

gulp.task('default', function () {
   return gulp.src('app/*')
      .pipe(zip('build'+p.version+'.zip'))
      .pipe(gulp.dest('builds'));
});
