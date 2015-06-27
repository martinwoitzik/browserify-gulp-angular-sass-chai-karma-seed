'use strict';

module.exports = ['Texts', function (Texts) {

  return function (textId, context) {
    return Texts.translate(textId, context);
  };

}];