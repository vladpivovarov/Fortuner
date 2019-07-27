
'use strict';

const gulp = require("gulp");
const gp = require("gulp-load-plugins")();
const del = require('del');
const bs = require('browser-sync').create();
const fs = require('fs');

var assets = './_assets/';
var path = {
	src: {
		js: './_source/js/**/*.js',
		css: './_source/css/**/*.scss',
		cssMain: './_source/css/main.scss',
		img: './_source/img/**/*.*',
		svg: './_source/svg/**/*\.svg',
		font: './_source/font/**/*\.*',
		module: './_source/module/**/*.*',
		favicon: './_source/favicon/*.*'
	},
	build: {
		js: './_assets/js/',
		css: './_assets/css/',
		img: './_assets/img/',
		svg: './_assets/svg/',
		font: './_assets/font/',
		module: './_assets/module/',
		favicon: './_assets/favicon/'
	}
};

gulp.task('js:work:build', function () {
	return gulp.src(path.src.js)
	    .pipe(gp.concat('bundle.min.js'))
	    .pipe(gulp.dest(path.build.js))
});

gulp.task('js:build', function () {
	return gulp.src(path.src.js)
	    .pipe(gp.uglify())
	    .pipe(gp.concat('bundle.min.js'))	
	    .pipe(gulp.dest(path.build.js))	
});

gulp.task('css:build', function () {
	return gulp.src(path.src.css)
		.pipe(gp.sourcemaps.init())
		.pipe(gp.sassGlob())
		.pipe(gp.sass({outputStyle: 'compressed'}))
		.on("error", gp.notify.onError((err) => {
		    return {
		        title: "Sass",
		        message: err.message
		    }
		}))
	    .pipe(gp.autoprefixer({
	    	browsers: ['last 3 version', '> 1%', 'ie 8', 'ie 9', 'Opera 12.1'],
	    	cascade: false
	    }))
	    .pipe(gp.cssnano())
	    .pipe(gp.sourcemaps.write())
	    .pipe(gulp.dest(path.build.css))
});

gulp.task('img:build', function () {
	return gulp.src(path.src.img)
	    .pipe(gp.imagemin())
	    .pipe(gp.rename(function (path) {
			path.extname = (path.extname + "").toLowerCase();
		}))	
	    .pipe(gulp.dest(path.build.img))
});

gulp.task('img:work:build', function () {
	return gulp.src(path.src.img)
	    .pipe(gp.rename(function (path) {
			path.extname = (path.extname + "").toLowerCase();
		}))	
	    .pipe(gulp.dest(path.build.img))
});

gulp.task('svg:build', function () {
  return gulp.src(path.src.svg)
    .pipe(gp.svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(gp.cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gp.replace('&gt;', '>'))
    .pipe(gp.svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(gulp.dest(path.build.svg))
});


gulp.task('font:build', function () {
	return gulp.src(path.src.font)
	    .pipe(gulp.dest(path.build.font))
});

gulp.task('module:build', function () {
	return gulp.src(path.src.module)
	    .pipe(gulp.dest(path.build.module))
});

gulp.task('favicon:build', function () {
	return gulp.src(path.src.favicon)
	    .pipe(gulp.dest(path.build.favicon))
});

gulp.task("clean", () => {
  return del(assets);
});

gulp.task('build', gulp.parallel(
	'js:build',
	'css:build',
	'img:build',
	'svg:build',
	'font:build',
	'module:build',
	'favicon:build'
	)
);

gulp.task("watch", () => {
	gulp.watch(path.src.js, gulp.series('js:work:build'));
	gulp.watch(path.src.css, gulp.series('css:build'));
	gulp.watch(path.src.img, gulp.series('img:work:build'));
	gulp.watch(path.src.svg, gulp.series('svg:build'));
	gulp.watch(path.src.font, gulp.series('font:build'));
	gulp.watch(path.src.module, gulp.series('module:build'));
});

gulp.task("serve", () => {
  bs.init({
    open: true,
    server: "./"
  });
  bs.watch(`${assets}**/*.*`).on("change", bs.reload);
  bs.watch("./*.html").on("change", bs.reload);
});

gulp.task("default", gulp.series(
	"clean",
	"build",
	gulp.parallel(
	    "watch",
	    "serve"
    )
));
