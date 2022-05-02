const gulp = require('gulp')
const babel = require('gulp-babel')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const del = require('del')
const webserver = require('gulp-webserver')

// ES6转换成ES5
const jsHandler = function() {
  return gulp
    .src('./src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./build/js/'))
}
// 处理commonjs模块化
const browserifyJsHandler = function() {
  let b = browserify({
    entries: './build/js/index.js'
  })
  return b.bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./dist/js/'))
}
// 编译html
const htmlHandler = function() {
  return gulp
    .src('./src/*.html')
    .pipe(gulp.dest('./dist/'))
}
// 清除文件
const delHandler = function() {
  return del(['./dist/'])
}
// 启动服务
const webHandler = function() {
  return gulp
    .src('./dist')
    .pipe(webserver({
      host: 'localhost',
      port: '8009',
      livereload: true,
      open: './index.html'
    }))
}
// 监控文件变化
const watchHandler = function() {
  gulp.watch('./src/js/*.js', jsHandler),
  gulp.watch('./build/js/*.js', browserifyJsHandler),
  gulp.watch('./src/js/*.html', htmlHandler)
}
// gulp指令
module.exports.default = gulp.series(
  delHandler,
  gulp.parallel(
    gulp.series(jsHandler, browserifyJsHandler),
    htmlHandler
  ),
  webHandler,
  watchHandler
)
