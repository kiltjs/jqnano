/* global describe, it, assert, _, document */

describe('create node', function () {

  var ul = _.create('ul'),
      div = _.create('div', { className: 'foobar' })

  ul.innerHTML = '<li></li><li></li><li></li><li></li>'

  _.append( document.body, ul )

  it('append', function() {

    _.append( _(ul, 'li'), div )
    assert.strictEqual( ul.innerHTML, '<li><div class="foobar"></div></li><li></li><li></li><li></li>', 'into li')

    _.append( ul, div )
    assert.strictEqual( ul.innerHTML, '<li></li><li></li><li></li><li></li><div class="foobar"></div>', 'into ul')

  })

  it('prepend', function() {

    _.prepend( _(ul, 'li'), div )
    assert.strictEqual( ul.innerHTML, '<li><div class="foobar"></div></li><li></li><li></li><li></li>', 'into li')

    _.prepend( ul, div )
    assert.strictEqual( ul.innerHTML, '<div class="foobar"></div><li></li><li></li><li></li><li></li>', 'into ul')

  })

})
