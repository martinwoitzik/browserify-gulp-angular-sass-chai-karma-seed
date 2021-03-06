var config = {
  bundle: {
    js: 'bundle-assets.js'
  },
  images: {
    dist: 'images/',
    source: 'common/images/'
  },
  localization: {
    output: 'localization',
    supportedLanguages: [
      'de',
      'en'
    ]
  },
  project: {
    dist: 'public/',
    source: 'app/'
  },
  scripts: {
    dist: 'js/',
    entryPoint: 'app.js',
    output: 'bundle',
    source: 'src/'
  },
  sass: {
    dist: 'css/',
    entryPoint: 'app.scss',
    concatenatedModuleStyleImports: '_moduleStyleImports.scss'
  },
  templates: {
    entryPoint: 'index.html',
    moduleName: 'app.templates',
    output: 'templates'
  }
};

module.exports = config;