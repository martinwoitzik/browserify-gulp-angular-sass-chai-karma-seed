'use strict';

module.exports = ['Storage', '$interpolate', function(Storage, $interpolate) {

    var defaultLang = "en";

    var Container = function () {
      this.interpolations = {};
      this.currentLanguage = null;
      this.languageStorageKey = 'saved-language-key';
    };

    /**
     *  Translations are being synchronously loaded via static js-files including plain key-value-Objects.
     *  All language-files are being concatenated to 'localization.min.js' in the dist-folder.
     *  For every supported language one global-object is automatically created.
     *  e.g. 'language_de', 'language_en', 'language_fr', ...
     *
     *  Supported languages can be defined via 'gulp/config.js'.
     *
     */
    function getLanguageVariable(isoCode){
      return window["language_"+isoCode];
    }

    Container.prototype.init = function () {
      var lang = Storage.get(this.languageStorageKey);
      if (lang) {
        this.loadLanguage(lang);
      }
      else {
        this.loadLanguage(defaultLang);
      }
    };

    Container.prototype.getLanguage = function () {
      return this.currentLanguage;
    };

    Container.prototype.findTextId = function (textId, textObjects) {
      var text = null;
      // Makes a copy of the list.
      textObjects = textObjects.slice();
      while (text === null && textObjects.length > 0) {
        var part = textObjects.splice(0, 1)[0];
        textId.split('.').forEach(function (bit) {
          if (part !== undefined) {
            part = part[bit];
          }
        });
        if (part !== undefined) {
          text = part;
        }
      }
      return text;
    };

    Container.prototype.getText = function (textId) {
      var text = this.findTextId(textId, [this._lang, this._defaultLang]);
      if (text === null) {
        console.error('Cannot find textId: ', textId);
        return textId;
      }
      return text;
    };

    /*
     * Give a textId (string) as first argument like
     * 'modalDirectory.alreadyExists'. If you want to interpolate the
     * content of the translated string with some data, than give a
     * object as the second argument. That way you can use
     * angular templating to fill in data.
     */
    Container.prototype.translate = function (textId, context) {
      var text = this.getText(textId);
      if (text.search(/{{/) !== -1) {
        // Setup interpolation expression if it does not exist.
        if (this.interpolations[text] === undefined) {
          this.interpolations[text] = $interpolate(text);
        }
        text = this.interpolations[text](context);
      }
      return text;
    };

    Container.prototype.loadLanguage = function (lang) {
      this.currentLanguage = lang;

      this._defaultLang = getLanguageVariable([defaultLang]);
      this._lang = getLanguageVariable([lang]);
    };

    Container.prototype.setLanguage = function (lang) {
      this.loadLanguage(lang);
      Storage.set(this.languageStorageKey, lang);
    };

    return new Container();

  }];