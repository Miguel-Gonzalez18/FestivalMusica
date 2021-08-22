const { series, src, dest, watch, parallel } = require('gulp');
var  sass  =  require ( 'gulp-sass' ) ( require ( 'sass' ) ) ;
const imagemin = require('gulp-imagemin');
const notify  = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
//Utilidades css
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
//Utilidades Js
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');
const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}
function css(){
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe( sass() )
        .pipe( postcss( [autoprefixer(), cssnano()] ) )
        .pipe(sourcemaps.write('.'))
        .pipe( dest('./build/css') )
}
function javascript(){
    return src(paths.js)
        .pipe(sourcemaps.init())    
        .pipe( concat('bundle.js') )
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename( {suffix: '.min'} ))
        .pipe( dest('./build/js') )
}
function watchArchivos(){
    watch(paths.scss, css);
    watch(paths.js, javascript);
}
function imagenes(){
    return src(paths.imagenes)
        .pipe( imagemin() )
        .pipe( dest('./build/img') )
        .pipe( notify({ message: 'Imagen minificada!' }) );
}

function VersionWebp(){
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe( dest('./build/img') )
        .pipe( notify( { message: 'Version WebP lista!!' } ) );
}
exports.css = css;
exports.javascript = javascript;
exports.watchArchivos = watchArchivos;
exports.imagenes = imagenes;
exports.default = series(css, javascript, imagenes, VersionWebp, watchArchivos);