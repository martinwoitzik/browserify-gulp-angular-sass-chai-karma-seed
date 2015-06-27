'use strict';

require('angular').module('storage', [])
  .factory('Storage', function() {

    var Storage = function () {};

    Storage.prototype.serialize = function (data) {
      return JSON.stringify(data);
    };

    Storage.prototype.deserialize = function (string) {
      return JSON.parse(string);
    };

    Storage.prototype.get = function (key) {
      var value = localStorage.getItem(key);
      if (value !== undefined) {
        value = this.deserialize(value);
      }
      return value;
    };

    Storage.prototype.set = function (key, value) {
      if (value !== undefined) {
        value = this.serialize(value);
      }
      localStorage.setItem(key, value);
    };

    Storage.prototype.remove = function (key) {
      localStorage.removeItem(key);
    };

    return new Storage();

  });