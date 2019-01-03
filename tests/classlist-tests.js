/* global describe, it */

import classListEnv from '../src/classlist'
import jsdom from 'jsdom'
import {assert} from 'chai'

const { JSDOM } = jsdom

const DOM = new JSDOM()
const classes = classListEnv(DOM.window.document)

describe('classlist: has', function () {

  it('hasClass :not(.foobar)', function () {

    var div = DOM.window.document.createElement('div')
    div.classList = 'alt-foobar foobar-alt'

    assert.isFalse( classes.has(div, 'foobar') , 'hasClass')
    assert.isFalse( classes._hasClassList(div, 'foobar') , '_hasClassRegExp')
    assert.isFalse( classes._hasClassRegExp(div, 'foobar') , '_hasClassRegExp')

  })

  it('hasClass .foobar', function () {

    var div = DOM.window.document.createElement('div')
    div.className = 'foobar'

    assert.isTrue( classes.has(div, 'foobar') , '_hasClassList')
    assert.isTrue( classes._hasClassList(div, 'foobar') , '_hasClassRegExp')
    assert.isTrue( classes._hasClassRegExp(div, 'foobar') , '_hasClassRegExp')

  })

  it('addClass .foobar', function () {

    ['add', '_addClassList', '_addClassRegExp'].forEach(function (_method) {
      var div = DOM.window.document.createElement('div')
      classes[_method](div, 'foobar')
      assert.strictEqual( div.className, 'foobar' , _method)
    })

  })

  it('removeClass .foobar', function () {

    ['remove', '_removeClassList', '_removeClassRegExp'].forEach(function (_method) {
      var div = DOM.window.document.createElement('div')
      div.className = ' foobar '

      classes[_method](div, 'foobar')
      assert.strictEqual( div.className, '' , _method)
    })

  })

  it('toggleClass .foobar', function () {

    ['toggle', '_toggleClassList', '_toggleClassListFull', '_toggleClassListPonyfill', '_toggleClassRegExp'].forEach(function (_method) {
      var div = DOM.window.document.createElement('div')

      classes[_method](div, 'foobar')
      assert.strictEqual( div.className, 'foobar' , _method + ': .foobar')

      classes[_method](div, 'foobar', true)
      assert.strictEqual( div.className, 'foobar' , _method + ': .foobar (forced)')

      classes[_method](div, 'foobar')
      assert.strictEqual( div.className, '' , _method + ': :not(.foobar)')

      classes[_method](div, 'foobar', false)
      assert.strictEqual( div.className, '' , _method + ': :not(.foobar) (forced)')
    })

  })

})
