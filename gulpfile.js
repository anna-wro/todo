const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');

/***
 *
 *  Development tasks
 *
 ***/

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
});

// Watchers
gulp.task('watch', function() {
    gulp.watch('app/css/**/*.css', browserSync.reload);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

/***
 *
 *  Optimization tasks
 *
 ***/

// Optimizing CSS and JavaScript
gulp.task('useref', function() {

    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', (autoprefixer({
        browsers: ['last 4 versions', '>1%']
    }))))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

// Cleaning
gulp.task('clean', function() {
    return del.sync('dist').then(function(cb) {
        return cache.clearAll(cb);
    });
});

gulp.task('clean:dist', function() {
    return del.sync(['dist/**/*', '!dist/img', '!dist/img/**/*']);
});

/***
 *
 *  Build sequences
 *
 ***/

gulp.task('default', function(callback) {
    runSequence('browserSync', 'watch',
        callback
    )
});

gulp.task('build', function(callback) {
    runSequence(
        'clean:dist',
        'useref',
        callback
    )
});