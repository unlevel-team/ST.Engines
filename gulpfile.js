var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var path = require('path');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var browserify = require('browserify');
var pump = require('pump');
var gutil = require('gulp-util');
var child_exec = require('child_process').exec;


var paths = {
    es6: ['lib/**/*.js'],
    es5: 'lib_es5',
    // Must be absolute or relative to source map
    sourceRoot: path.join(__dirname, 'es6'),
    es5_min: 'lib_es5_min',
};



gulp.task('docs', function(done) {
//  child_exec('node ./node_modules/jsdoc/jsdoc.js ./lib -c ./jsdoc.json', undefined, done);
  child_exec('node ./node_modules/jsdoc/jsdoc.js -c ./jsdoc_conf.json', undefined, done);
});


gulp.task('compress', function (cb) {
	pump([
	        gulp.src(paths.es5),
	        uglify(),
	        gulp.dest(paths.es5_min)
	    ],
	    cb 
	);
});



gulp.task('babel', function () {
    return gulp.src(paths.es6)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.', { sourceRoot: paths.sourceRoot }))
        .pipe(gulp.dest(paths.es5));
});


gulp.task('watch', function() {
    gulp.watch(paths.es6, ['babel']);
});


gulp.task('default', ['watch']);
