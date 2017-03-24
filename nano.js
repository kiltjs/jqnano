
(function (root) {

  function _(parent, selector) {
    if( typeof parent === 'string' ) return document.querySelector(parent);
    return parent.querySelector(selector);
  }

  function $$(parent, selector) {
    if( typeof parent === 'string' ) return document.querySelectorAll(parent);
    return parent.querySelectorAll(selector);
  }

  _.$ = $$;

  // events

  var on = function (el, eventName, handler, useCapture) {
    if( typeof el === 'string' ) {
      return document.documentElement.addEventListener(el, eventName, handler);
    }
    return el.addEventListener(eventName, handler, useCapture);
  };
  var off = function (el, eventName, handler, useCapture) {
    if( typeof el === 'string' ) {
      return document.documentElement.removeEventListener(el, eventName, handler);
    }
    return el.removeEventListener(eventName, handler, useCapture);
  };
  var trigger = document.createEvent ? function (element, eventName, data) {
    var event = document.createEvent('HTMLEvents');
    event.data = data;
    event.initEvent(eventName, true, true);
    element.dispatchEvent(event);
    return event;
  } : function (element, eventName, data) {
    var event = document.createEventObject();
    event.data = data;
    element.fireEvent('on' + eventName, event);
    return event;
  };

  _.on = on;
  _.off = off;
  _.trigger = trigger;

  // ready

  var readyListeners = [],
      initReady = function () {
        var listeners = readyListeners;
        readyListeners = undefined;
        [].forEach.call(listeners, function (cb) { cb(); });
        document.removeEventListener('DOMContentLoaded', initReady);
        window.removeEventListener('load', initReady);
      };

  document.addEventListener('DOMContentLoaded', initReady);
  window.addEventListener('load', initReady);

  function ready (callback) {
    if( callback instanceof Function ) {
      if( readyListeners ) {
        readyListeners.push(callback);
      } else {
        callback();
      }
    }
  }

  _.ready = ready;

  // classList manipulation

  var classListEnabled = 'classList' in document.documentElement;

  var classListHas = classListEnabled ? function (el, className) {
        return el.classList.contains(className);
      } : function (el, className) {
        return new RegExp('\\b' + (className || '') + '\\b','').test(el.className);
      },
      classListAdd = classListEnabled ? function (el, className) {
        el.classList.add(className);
      } : function (el, className) {
        if( !classListHas(el, className) ) {
          el.className += ' ' + className;
        }
      },
      classListRemove = classListEnabled ? function (el, className) {
        el.classList.remove(className);
      } : function (el, className) {
        el.className = el.className.replace(new RegExp('\\s*' + className + '\\s*','g'), ' ');
      },
      classListToggle = classListEnabled ? (function () {
        var aux = document.createElement('span');
        aux.classList.toggle('test', true);
        aux.classList.toggle('test', true);

        // IE does not support second parameter toggle
        return aux.classList.contains('test') ? function (el, className, toggle) {
          el.classList.toggle(className, toggle);
        } : function (el, className, toggle) {
          toggle = toggle === undefined ? !el.classList.contains(className) : toggle;
          if( toggle ) el.classList.add(className);
          else el.classList.remove(className);
        };
      })() : function (el, className) {
        el.className = el.className.replace(new RegExp('\\s*' + className + '\\s*','g'), ' ');
      };

  _.classList = { has: classListHas, add: classListAdd, rm: classListRemove, toggle: classListToggle };
  _.hasClass = classListHas;
  _.addClass = classListAdd;
  _.removeClass = classListRemove;
  _.toggleClass = classListToggle;

  _.tmpClass = function (el, className, duration, cb) {
    var isCollection = !(el instanceof Element ) && el.length;

    if( isCollection ) {
      [].forEach.call(el, function (_el) {
        classListAdd(_el, className);
      });
    } else {
      classListAdd(el, className);
    }
    setTimeout(function () {
      if( isCollection ) {
        [].forEach.call(el, function (_el) {
          classListRemove(_el, className);
        });
      } else {
        classListRemove(el, className);
      }
      if( cb instanceof Function ) {
        cb();
      }
    }, duration instanceof Function ? duration() : duration );
  };

  // utils

  _.first = function (list, iteratee, thisArg) {
    for( var i = 0, n = list.length ; i < n ; i++ ) {
      if( iteratee.call(thisArg, list[i], i) ) return list[i];
    }
  };

  _.last = function (list, iteratee, thisArg) {
    for( var i = list.length - 1 ; i >= 0 ; i-- ) {
      if( iteratee.call(thisArg, list[i], i) ) return list[i];
    }
  };

  _.each = function (o, iteratee, thisArg) {
    if( o instanceof Array ) return o.forEach(iteratee, thisArg);
    for( var key in o ) {
      iteratee.call(thisArg, o[key], key);
    }
  };

  _.noop = function () {};
  _.noopValue = function (value) { return value; };

  _.once = function (fn) {
    var result;
    return function () {
      if( fn ) result = fn.apply(this, arguments);
      fn = null;
      return result;
    };
  };
  _.now = Date.now ? function () {
    return Date.now();
  } : function () {
    return new Date().getTime();
  };

  // ponyfills

  var matchmedia = root.matchMedia || root.webkitMatchMedia || root.mozMatchMedia || root.msMatchMedia;
  _.matchMedia = function (query) {
    return matchmedia(query);
  };

  _.matchesSelector = Element.prototype.matchesSelector ? function (el, selector) {
    return el.matchesSelector(selector);
  } : (function (matchesSelector) {
    return function (el, selector) {
      return el[matchesSelector](selector);
    };
  })( _.first([
    'matchesSelector',
    'webkitMatchesSelector',
    'mozMatchesSelector',
    'msMatchesSelector',
    'oMatchesSelector',
  ], function (matchesSelector) {
    return matchesSelector in Element.prototype;
  }) );

  _.currentScript = document.currentScript || (function() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  // dom nodes

  _.closest = Element.prototype.closest ? function (el, selector) {
    return el.closest(selector);
  } : function (el, selector) {
    while( el ) {
      if( _.matchesSelector(el, selector) ) {
        break;
      }
      el = el.parentElement;
    }
    return el;
  };

  _.create = function (tagName, attrs, html) {
    var el = document.createElement(tagName);

    if( html ) el.innerHTML = html;
    if( attrs ) {
      for( var attr in attrs ) el[attr] = attrs[attr];
    }
    return el;
  };

  _.append = function (el, node) {
    el.appendChild(node);
  };

  _.prepend = function (el, node) {
    if( !el.children.length ) el.appendChild(node);
    else el.insertBefore(node, el.firstElementChild || el.firstChild);
  };

  _.remove = function (el) {
    var parent = el.parentElement || el.parentNode;
    if( parent ) parent.removeChild(el);
  };

  _.formParams = function (form) {
    if( !(form instanceof Element) && form.length ) form = form[0];

    var data = {};
    [].forEach.call(form.elements, function (el) {
      if( el.name && !el.disabled ) {
        if( el.type === 'radio' ) {
          if( el.checked ) data[el.name] = el.value;
        } else {
          data[el.name] = el.value;
        }
      }
    });
    return data;
  };

  // scroll ponyfill

  function getScrollRoot () {
    var html = document.documentElement, body = document.body;

    if( html.scrollTop ) return html;
    if( body.scrollTop ) return body;

    var cacheTop = ((typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : null) || body.scrollTop || html.scrollTop, // cache the window's current scroll position
        root;

    html.scrollTop = body.scrollTop = cacheTop + (cacheTop > 0) ? -1 : 1;
    // find root by checking which scrollTop has a value larger than the cache.
    root = (html.scrollTop !== cacheTop) ? html : body;

    root.scrollTop = cacheTop; // restore the window's scroll position to cached value

    return root; // return the scrolling root element
  }

  var scrollRoot;

  Object.defineProperty(_, 'scrollTop', {
    get: function () {
      return scrollRoot.scrollTop;
    },
    set: function (value) {
      scrollRoot.scrollTop = value;
    }
  });

  ready(function () {
    scrollRoot = getScrollRoot();
  });

  if( typeof exports === 'object' && typeof module !== 'undefined' ) {
    // CommonJS
    module.exports = _;
  } else if( typeof define === 'function' && define.amd ) {
    // AMD. Register as an anonymous module.
    define([], function () { return _; });
  } else {
    // Browser globals
    root._ = _;
    root.$$ = root.$$ || $$;
  }

})(this);
