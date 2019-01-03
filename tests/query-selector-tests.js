/* global describe, it */

import {querySelector, querySelectorAll, _normalizeSelector} from '../src/query-selector'
import jsdom from 'jsdom'
import {assert} from 'chai'

const { JSDOM } = jsdom

describe('matches-selector: _normalizeSelector', function () {

    function _runTestCase(src_selector, expected_selector) {
        assert.strictEqual( _normalizeSelector(src_selector), expected_selector )
    }

    [
        ['a:first button', 'a:first-child button'],
    ].forEach(function (test_case) {
        _runTestCase.apply(null, test_case)
    })

})

describe('matches-selector: querySelector', function () {

    it('p', function () {

        const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)

        var matched_node = querySelector(dom.window.document, 'p')

        assert.strictEqual(matched_node.nodeName, 'P')

    })

    it('p:has(a) button', function () {

        const dom = new JSDOM(`<!DOCTYPE html><p><a href=""></a><button></button></p>`)

        var matched_node = querySelector(dom.window.document, 'p:has(a) button')

        assert.strictEqual(matched_node.nodeName, 'BUTTON')

    })

})

describe('matches-selector: querySelectorAll', function () {

    it('p', function () {

        const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p><p>See you later!</p>`)

        var matched_nodes = querySelectorAll(dom.window.document, 'p')

        assert.strictEqual(matched_nodes.map( (node) => node.textContent ).join(', '), 'Hello world, See you later!')

    })

    it('p:has(a) button', function () {

        const dom = new JSDOM(`<!DOCTYPE html><p><a href=""></a><button>Click!</button></p><p>See you later!</p>`)

        var matched_nodes = querySelectorAll(dom.window.document, 'p:has(a) button')

        assert.strictEqual(matched_nodes.map( (node) => node.textContent ).join(', '), 'Click!')

    })

})
