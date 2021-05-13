module.exports = {
  plugins: [
    require('postcss-preset-env')
    ({
        browsers: 'last 1 versions',
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
    }),
  ],
};
