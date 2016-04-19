/* eslint-disable */
/*
 * Add some polyfill for old browser without ES6 support
 */

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
if (!Array.prototype.find) {
 Array.prototype.find = function(predicate) {
   if (this === null) {
     throw new TypeError('Array.prototype.find called on null or undefined');
   }
   if (typeof predicate !== 'function') {
     throw new TypeError('predicate must be a function');
   }
   var list = Object(this);
   var length = list.length >>> 0;
   var thisArg = arguments[1];
   var value;

   for (var i = 0; i < length; i++) {
     value = list[i];
     if (predicate.call(thisArg, value, i, list)) {
       return value;
     }
   }
   return undefined;
 };
}

// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}
