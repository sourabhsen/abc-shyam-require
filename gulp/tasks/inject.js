'use strict';

var config = require('../config');
var gulp   = require('gulp');
var $      = require('gulp-load-plugins')({lazy: true});
var path   = require('path');
var series = require('stream-series');
var sort = require('sort-stream');
/**
 * Inject both JS, CSS into /build/index.html
 */
gulp.task('inject', function(){
  config.log('Injecting assets');
  
  var  injectStyles = gulp.src([
          path.join(config.build, '/**/*.css')
          //path.join('!' + config.paths.tmp, '/serve/app/vendor.css')
        ], {
          read: false
        });
        
  var miso    = gulp
                .src([config.build + '/**/*.miso.js'])
                .pipe(sort(function (a, b) {
                  if (a > b) {return 1;}
                  if (a < b) {return -1;}
                  return 0;
                }));

   var injects = gulp
                .src([config.build + '/**/*.js','!'+config.build + '/**/*.miso.js'])
                .pipe($.angularFilesort()).on('error', config.errorHandler('AngularFilesort'));



   var injectScripts = gulp.src([
      path.join('!' + config.build, '/app/app.js'),
      path.join(config.build, '/app/**/*.js'),
      path.join('!' + config.build, '/**/*.miso.js'),
      path.join('!' + config.src, '/app/**/*.spec.js'),
      path.join('!' + config.src, '/app/**/*.mock.js')
    ])
    .pipe($.angularFilesort()).on('error', config.errorHandler('AngularFilesort'));

  var injectApp = gulp.src([
        path.join(path.join(config.build, '/app/*.js'))
    ])

  return  gulp
          .src(config.build+'/index.html')
          .pipe($.inject(injectStyles,config.inject))
          .pipe($.inject(series(miso, injectScripts,injectApp), config.inject))
          .pipe(gulp.dest(config.build));
});
/**
 * Inject minifed vendor and app JS, CSS into /dist/index.html
 */
gulp.task('inject:dist', function(){
  config.log('Injecting assets');

  var vendor = gulp.src([ path.join(config.dist, '/vendor/*.js'), path.join(config.dist, '/vendor/*.css')])
        ;
  var app    = gulp.src([path.join(config.dist, '/app/*.js'), path.join(config.dist, '/styles/**.css')]);

  return  gulp
          .src(config.index)
          .pipe($.inject(series(vendor, app), config.inject))
          .pipe(gulp.dest(config.dist));
});
