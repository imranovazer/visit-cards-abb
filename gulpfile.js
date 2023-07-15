const concat = require("gulp-concat");
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const browsersync = require('browser-sync').create();
const cleanCSS = require("gulp-clean-css");
const clean = require("gulp-clean");
const minify = require("gulp-js-minify");

//Convert html files

gulp.task("convertHtml", () => {
  return gulp.src("*.html").pipe(gulp.dest("dist"));
});

//Convert Images

gulp.task("convertImages", function () {
  return gulp.src("src/img/**/*").pipe(imagemin()).pipe(gulp.dest("dist/img"));
});

//Compile scss files

gulp.task("compileScss", () => {
  return gulp
    .src("src/scss/styles.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("styles.min.css"))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest("dist/css"))
    .pipe(browsersync.stream());
});

//Minify js

gulp.task("minifyJs", () => {
  return gulp
    .src("src/js/*.js")
    .pipe(concat("scripts.min.js"))
    .pipe(uglify())
    .pipe(minify())
    .pipe(gulp.dest("dist/js"));
});
//clean task

gulp.task('clean', function () {
  return gulp.src('dist', { allowEmpty: true, read: false })
    .pipe(clean());
});
//Watch gulp tasks

gulp.task("watch", () => {
  browsersync.init({
    server: {
      baseDir: ".",
    },
  });
  gulp.watch("index.html", gulp.series("convertHtml")).on('change', browsersync.reload);
  gulp.watch("src/scss/**/*.scss", gulp.series("compileScss")).on('change', browsersync.reload);
  gulp.watch("src/js/*.js", gulp.series("minifyJs")).on('change', browsersync.reload);
  gulp.watch("src/img/**/*", gulp.series("convertImages")).on('change', browsersync.reload);
});

gulp.task("build", gulp.series("clean", "compileScss", "minifyJs", "convertHtml", "convertImages"))


gulp.task("dev", gulp.series("watch"))

gulp.task('default', gulp.series('dev'));