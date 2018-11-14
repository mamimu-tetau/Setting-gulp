//Sassコンパイル
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require("gulp-plumber");
var sourcemaps = require('gulp-sourcemaps');
var filter = require('gulp-filter');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');


var path = {
    base:'./',
    scss:'./scss/**/*.scss',
   image:'./assets/images/**/*',
      js:'./assets/js/**/*.js',
     css:'./assets/css',
    html:'./**/*.html',
     php:'./**/*.php'
};

gulp.task('sass', function(){
    return gulp.src(path.scss)
    .pipe(plumber({
      errorHandler: notify.onError({
        title: "失敗してるよ！",
        message: "<%= error.message %>"
        })
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded',
    }))
    .pipe(autoprefixer({
        browsers: ["last 2 versions", "Firefox ESR"],
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(path.css))
    .pipe(filter(['**', '!**/*.map']))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('server', function () {
    browserSync({
        notify: false,
        proxy: "http://localhost.tanaban.com/"
    });
});

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});

gulp.task('watch', function() {
  gulp.watch(path.scss, gulp.series('sass'));
  gulp.watch(path.php, gulp.series('reload'));
});

gulp.task('default',
    gulp.parallel('server','watch')
);
