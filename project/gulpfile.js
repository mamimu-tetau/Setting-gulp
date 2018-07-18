//静的サイト構成

//Sassコンパイル
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var filter = require('gulp-filter');
var plumber = require("gulp-plumber");
var notify = require('gulp-notify');

//browser-sync
var browserSync = require('browser-sync');

//CSS圧縮
//var cssmin = require('gulp-cssmin');

// 画像圧縮
//var imagemin = require('gulp-imagemin');
//var mozjpeg = require('imagemin-mozjpeg');
//var pngquant = require('imagemin-pngquant');

//JS圧縮
//var uglify = require('gulp-uglify');

var destDir = 'public_html/'; // Minify出力用ディレクトリ
var assetsDir = 'assets/';    // 案件によってcommonとかassetsとかあるんでとりあえず変数

var path = {
	scss: './src/scss/**/*.scss',
	js: './src/js/**/*.js',
	html: './src/**/*.html',
	css: './src/css',
	php: './src/**/*.php'
};

//Sassコンパイル + Browsersync
gulp.task('sass', function() {
	gulp.src(path.scss)
	.pipe(sourcemaps.init())
	.pipe(plumber())
	.pipe(sass({
		includePaths: [
			'./src/scss/core/',
			'./src/scss/base/',
			'./src/scss/page/',
			'./src/scss/parts/'
			],
		errLogToConsole: true,
		outputStyle: 'expanded',
	}))
	.pipe(autoprefixer({
		browsers: ["last 2 versions", "ie 9", "android 3"], // 対応ブラウザ。案件によって変更する
	}))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('src/'+assetsDir+'css/'))
	.pipe(filter(['**', '!**/*.map']))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('cssmin', function () {
	gulp.src('src/'+assetsDir+'css/**/*.css')
		.pipe(plumber())
		.pipe(cssmin())
		.pipe(gulp.dest(destDir+assetsDir+'css/'));
});


gulp.task('jsmin', function() {
	gulp.src('src/'+assetsDir+'js/**/*.js')
		.pipe(plumber())
		.pipe(uglify())
		.pipe(gulp.dest(destDir+assetsDir+'js/'));
});

gulp.task('imagemin', function(){
	gulp.src(['src/'+assetsDir+'images/**/*.{jpeg,jpg,png,gif}'])
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
		.pipe(gulp.dest(destDir+assetsDir+'images/'));
});

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

gulp.task('deploy', ['filecopy', 'cssmin', 'jsmin', 'imagemin']);

gulp.task('reload', function () {
	browserSync.reload();
});

gulp.task('browser-sync', function () {
	browserSync({
		notify: false,
		proxy: "http://localhost.mamimu.div"    // 案件によってここのドメインは変えてね
	});
});

gulp.task('default', ['browser-sync'], function () {
	gulp.watch([path.php,path.html,path.js], ['reload']);
	gulp.watch(path.scss, ['sass']);
});

gulp.task('build', ['sass']);
