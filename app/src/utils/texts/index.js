'use strict';

require('utils/storage');

require('angular').module('texts', [
  'storage'
])
  .factory('Texts', require('./texts.factory'))
  .filter('translate', require('./texts.filter'))
  .run(['Texts', function(Texts){
    Texts.init();
  }]);
