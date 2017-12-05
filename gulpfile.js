var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('default');

gulp.task('browserSync', function() {
  browserSync.init({
      server: {
        baseDir: 'docs',
        index: 'index.html'
      },
  });
});

gulp.task('serve',['browserSync'], function() {
  gulp.watch('docs/*', browserSync.reload);
})
