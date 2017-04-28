/* global describe, it, assert, $live */
describe('create node', function () {

  var ul = _.create('ul'),
      div = _.create('div', { className: 'foobar' });

  ul.innerHTML = '<li></li><li></li><li></li><li></li>';

  _.append( document.body, ul );

  it('append', function() {

    _.append( _(ul, 'li'), div );
    assert.strictEqual( ul.innerHTML, '<li><div class="foobar"></div></li><li></li><li></li><li></li>' );

  });

});
