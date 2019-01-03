
export function _normalizeSelector (selector) {
  return selector.trim()
    .replace(/:first(?!-)/, ':first-child')
    .replace(/:last(?!-)/, ':last-child')
    .replace(/:(password|checkbox|file|submit|image)(?!-)/, '[type="$1"]')
}

var _arraySlice = Array.prototype.slice
var _arrayPush = Array.prototype.push

function _findCloseParenthesis (str) {
  var opened_parenthesis = 0

  for( var i = 0, n = str.length ; i < n ; i++ ) {
    if( str[i] === '(' ) {
      opened_parenthesis += 1
    } else if( str[i] === ')' ) {
      if( !opened_parenthesis ) return i
      opened_parenthesis -= 1
    }
  }

  return -1
}

function _querySelectorHas (nodes_list, selector_parts, __querySelectorAll ) {
  var selector_has = (selector_parts.shift() || '').trim() 

  if( !selector_has ) return nodes_list

  var close_parenthesis_pos = _findCloseParenthesis(selector_has)

  if( close_parenthesis_pos < 0 ) throw new Error('malformed :has selector, missing close parenthesis')

  var next_selector = selector_has.substr(close_parenthesis_pos + 1).trim()
  selector_has = selector_has.substr(0, close_parenthesis_pos)

  return nodes_list.reduce(function (_nodes_matched, node_el) {
    if( !node_el.querySelector(selector_has) ) return _nodes_matched

    _arrayPush.apply(
      _nodes_matched,
      _querySelectorHas(
        next_selector ? __querySelectorAll(node_el, next_selector) : [node_el],
        selector_parts.slice(),
        __querySelectorAll
      )
    )
    return _nodes_matched
  }, [])
}

function _querySelectorAll (el, selector) {
  return _arraySlice.call(el.querySelectorAll(selector))
}

function _querySelectorAll1 (el, selector) {
  var matched_el = el.querySelector(selector)
  return matched_el ? [matched_el] : []
}

var has_RE = /:has\(/

export function querySelector (el, selector) {
  if( !has_RE.test(selector) ) return el.querySelector( _normalizeSelector(selector) )

  var selector_parts = _normalizeSelector(selector).split(':has(')

  return _querySelectorHas(
    _querySelectorAll1(el, selector_parts.shift()),
    selector_parts,
    _querySelectorAll1
  )[0] || null
}

export function querySelectorAll (el, selector) {
  if( !has_RE.test(selector) ) return _querySelectorAll(el, _normalizeSelector(selector) )

  var selector_parts = _normalizeSelector(selector).split(':has(')

  return _querySelectorHas(
    _querySelectorAll(el, selector_parts.shift()),
    selector_parts,
    _querySelectorAll
  )
}
