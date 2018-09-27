const plugins = {
  'postcss-nested': {},
  'postcss-flexbugs-fixes': {},
  'postcss-preset-env': {
    'custom-properties': {
      preserve: true,
    },
    browsers: [
      '>0.5%',
      'last 2 versions',
      'Firefox ESR',
      'not ie <= 11',
    ],
    autoprefixer: {
      flexbox: 'no-2009',
    },
  },
};

if (process.env.NODE_ENV === 'production') {
  plugins.cssnano = { svgo: false, autoprefixer: false, zindex: false };
}

module.exports = {
  plugins,
};
