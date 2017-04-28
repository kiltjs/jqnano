
# jqNano

Nano library to manipulate the DOM

[![npm](https://img.shields.io/npm/v/jqnano.svg)](https://www.npmjs.com/package/jqnano)
[![Build Status](https://travis-ci.org/kiltjs/jqnano.svg?branch=master)](https://travis-ci.org/kiltjs/jqnano)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

``` sh
npm install jqnano --save

# or via bower
bower install jqnano --save
```

### Object

``` js
// alias of document.querySelector('.item')
_('.item')

// alias of el.querySelector('.item')
_(el, '.item')

// alias of document.querySelectorAll('.item')
_.$('.item')

// alias of el.querySelectorAll('.item')
_.$(el, '.item')
```

### Create, atach, detach

``` js

var el = _.create('div', {
  style: 'color: red'
}, 'Lorem ipsum dolor sit amet...');

// adds to parent as last child
_.append(parent, el);

// adds to parent as first child
_.prepend(parent, el);

// removes element from dom
_.remove(el);

```

### Class Handling

``` js

// also _.classList.has(el, 'active');
_.hasClass(el, 'active');

// also _.classList.add(el, 'active');
_.addClass(el, 'active');

// also _.classList.rm(el, 'active');
_.removeClass(el, 'active');

// also _.classList.toggle(el, 'active', value'?' );
_.toggleClass(el, 'active', value'?' );

```

### Utils

``` js
_.each(list, function (item, index) {
  // do stuff
});

_.each(object, function (item, key) {
  // do stuff
});

// _.first(list, iteratee, thisArg? );
_.first([1,2,3,4,5,6], function (num, i) {
  // first odd
  return num%2;
});
//: 1

// _.last(list, iteratee, thisArg? );
_.last([1,2,3,4,5,6], function (num, i) {
  // first odd
  return num%2;
});
//: 5

_.noop('foo')
//: undefined

_.noopValue('foo')
//: foo

var foo = _.once(function () {
  console.log('hello world'); return 'foo';
});
foo();
foo();
//: hello world
//: foo
//: foo

// ponyfill of:
// Date.now ? Date.now() : new Date().getTime()
_.now()

```

### Ponyfills

``` js

_.matchMedia('max-width: 767px');

_.matchesSelector(el, selector);

_.currentScript;

_.scrollTop;

```
