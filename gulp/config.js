var config = {
  dist: {
    base: 'public/',
    js: 'bundle.min.js',
    localization: 'localization.min.js',
    templates: 'templates.min.js'
  },
  source: {
    base: 'app/',
    entryPoint: 'app.js'
  },
  supportedLanguages: ['de', 'en']
};

module.exports = config;