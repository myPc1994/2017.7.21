/*
* @Author: Marte
* @Date:   2017-12-13 16:02:32
* @Last Modified by:   Marte
* @Last Modified time: 2017-12-14 09:56:09
*/

'use strict';
var gulp = require("gulp");
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
//less的转换 压缩 合并
gulp.task("style",()=>{
   return gulp.src(["src/styles/*.less","!src/styles/_*.less"])
    //less转 css
    .pipe(less())
    //css代码压缩
    .pipe(cssnano())
    .pipe(gulp.dest("dist/css/"))
      .pipe(browserSync.reload({
      stream: true
    }));
    })


var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//js的合并 压缩 混淆
gulp.task("script",()=>{
   return  gulp.src('src/scripts/*.js')
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js/"))
      .pipe(browserSync.reload({
      stream: true
    }));
    })
//图片的复制
gulp.task("copyimg",()=>{
    return gulp.src('src/images/*.*')
    .pipe(gulp.dest("dist/images/"))
      .pipe(browserSync.reload({
      stream: true
    }));
    })

//html代码压缩
var htmlmin = require('gulp-htmlmin');
gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true,
                    removeComments:true
                 }))
    .pipe(gulp.dest('dist/'))
      .pipe(browserSync.reload({
      stream: true
    }));
});
//监听改变
/*gulp.task("sss",function(){
    gulp.watch("src/styles/*.less",['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['copyimg']);
    gulp.watch('src/*.html',['minify']);
    })
*/

var browserSync = require('browser-sync');
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: ['dist']
    },
  }, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });

    gulp.watch("src/styles/*.less",['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['copyimg']);
    gulp.watch('src/*.html',['minify']);
});
