const paths = {
  dev: {
    root: './dev',
    html: './dev/*.html',
    pug: './dev/*.pug',
    pugIncludes: './dev/includes/**/*.pug',
    css: './dev/css/**/*.css',
    cssRoot: './dev/css',
    scss: './dev/scss/**/*.scss',
    js: './dev/js/**/*.js',
    jsRoot: './dev/js',
    images: './dev/images/**/*.{jpg,jpeg,png,svg,ico,gif,webp}',
    imagesRoot: './dev/images',
    fonts: './dev/fonts/**/*.{otf,ttf,woff,woff2}',
    fontsRoot: './dev/fonts',

    mainCss: 'style.css',
    mainJs: 'main.min.js'
  },

  build: {
    root: './dist',
    css: './dist/css/*.css',
    cssRoot: './dist/css',
    jsRoot: './dist/js',
    imagesRoot: './dist/images',
    fontsRoot: './dist/fonts',

    mainCss: 'style.min.css',
    mainJs: 'main.min.js',
    babelJs: 'babelify.min.js'
  }
};

module.exports = paths;