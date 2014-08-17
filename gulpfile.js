var path = require('path');
var gulp = require('gulp');
var tsc = require('gulp-tsc');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var compass = require('gulp-compass');

const CONF_PATH = 'conf/';
const SRC_PATH = 'frontend_src/';
const PUBLIC_PATH = 'public/';

gulp.task('tsc', function() {
    gulp.src(_pj(SRC_PATH, 'ts/**/*.ts'))
        .pipe(tsc({
            target: 'ES5'
        }))
        .pipe(concat('app.js'))
        .pipe(uglify({
            outSourceMap: true
        }))
        .pipe(gulp.dest(_pj(PUBLIC_PATH, 'js')))
});

gulp.task('compass', function() {
    gulp.src(_pj(SRC_PATH, 'sass/**/*.sass'))
        .pipe(compass({
            config_file : _pj(CONF_PATH, 'compass_config.rb'),
            sass        : _pj(SRC_PATH, 'sass'),
            css         : _pj(PUBLIC_PATH, 'css'),
            sourcemap   : true,
        }));
});

gulp.task('develop', ['default'], function() {
    gulp.watch([
        _pj(SRC_PATH, 'ts/**/*.ts')
    ], ['tsc']);
    gulp.watch([
        _pj(SRC_PATH, 'sass/**/*.sass')
    ], ['compass']);
});

gulp.task('default', ['compass', 'tsc']);


function _pj() {
    return path.join.apply(null, arguments);
}
