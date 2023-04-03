var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
browserSync.create();

function css_style(done) {

    gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        erorrLogToConsole: true,
        outputStyle: 'compressed'   
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
    .pipe(rename({
        basename:"style",
        suffix: ".min"
        
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());


    done();
}

function print(done) {
    console.log("Hi!");
    done()
}
function watchFiles() {
    gulp.watch("./scss/**/*", css_style);
    gulp.watch("./**/*.html", browserReload);
    gulp.watch("./**/*.php", browserReload);
    gulp.watch("./**/*.js", browserReload);
}

function sync(done) {
    browserSync.init({
        server: {
            baseDir:"./"
        },
        port:3000
    });
    done();
}

function browserReload(done) {
    browserSync.reload();
    done();
}
//gulp.task(css_style);
//gulp.task(print);
gulp.task('default', gulp.parallel(watchFiles, sync));
//exports.default = defaultSomeTask;
gulp.task(sync);

