//Sassコンパイル
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require("gulp-plumber");
const sourcemaps = require('gulp-sourcemaps');
const filter = require('gulp-filter');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');


const path = {
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



// deploy
const destDir = 'public_html/'; // Minify出力用ディレクトリ

gulp.task('filecopy', function() {
    gulp.src([
        'src/**/*',
        '!src/_**/*',
        '!src/**/_*',
        '!src/scss/*',
        '!src/assets/js/_**/*',
        '!src/assets/js/**/*.js',
        '!src/assets/css/_**/*',
        '!src/assets/css/**/*.css',
        '!src/assets/images/**/*'
    ])
    .pipe(gulp.dest(destDir));
});

//CSS圧縮
const cssmin = require('gulp-cssmin');
gulp.task('cssmin', function () {
    gulp.src('src/assets/css/**/*.css')
        .pipe(plumber())
        .pipe(cssmin())
        .pipe(gulp.dest(destDir+'assets/css/'));
});


//JS圧縮
const uglify = require('gulp-uglify');
gulp.task('jsmin', function() {
    gulp.src('src/assets/js/**/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(destDir+'assets/js/'));
});

// 画像圧縮
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
gulp.task('imagemin', function(){
    gulp.src(['src/assets/images/**/*.{jpeg,jpg,png,gif}'])
        .pipe(imagemin([
                pngquant({
                    quality: '60-80',
                    speed: 1,
                    floyd:0
                }),
                mozjpeg({
                    quality:80,
                    progressive: true
                }),
                imagemin.svgo(),
                imagemin.optipng(),
                imagemin.gifsicle()
            ]
        ))
        .pipe(gulp.dest(destDir+'assets/images/'));
});

gulp.task('deploy',
    gulp.parallel('filecopy','cssmin','jsmin','imagemin')
);
