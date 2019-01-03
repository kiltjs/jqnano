
export default function classListEnv (document) {
  var _classlist_enabled = 'classList' in document.documentElement

  // hasClass

  function _hasClassList (el, className) {
    return el.classList.contains(className)
  }

  function _hasClassRegExp (el, className) {
    return new RegExp(' ' + className + ' ','').test(' ' + el.className + ' ')
  }

  // addClass

  function _addClassList (el, className) {
    el.classList.add(className)
  }

  function _addClassRegExp (el, className) {
    if( !_hasClassRegExp(el, className) ) el.className += (el.className ? ' ' : '') + className
  }

  
  // removeClass

  function _removeClassList (el, className) {
    el.classList.remove(className)
  }

  function _removeClassRegExp (el, className) {
    el.className = el.className.replace(new RegExp('\\s*' + className + '\\s*','g'), ' ').trim()
  }

  function _toggleClassListFull (el, className, toggle) {
    el.classList.toggle(className, toggle)
  }

  function _toggleClassListPonyfill (el, className, toggle) {
    if( toggle === undefined ) toggle = !el.classList.contains(className)

    if( toggle ) el.classList.add(className)
    else el.classList.remove(className)

    return toggle
  }

  var _toggleClassList = (function () {
    var aux = document.createElement('span')

    aux.classList.toggle('test', true)
    aux.classList.toggle('test', true)

    // IE does not support second parameter toggle
    return aux.classList.contains('test') ? _toggleClassListFull : _toggleClassListPonyfill

  })()

  function _toggleClassRegExp (el, className, toggle) {
    if( toggle === undefined ) toggle = !_hasClassRegExp(el, className)

    if( toggle ) _addClassRegExp(el, className)
    else _removeClassRegExp(el, className)
  }

  var class_methods = Object.create({
    _hasClassList: _hasClassList,
    _hasClassRegExp: _hasClassRegExp,

    _addClassList: _addClassList,
    _addClassRegExp: _addClassRegExp,

    _removeClassList: _removeClassList,
    _removeClassRegExp: _removeClassRegExp,

    _toggleClassList: _toggleClassList,
    _toggleClassListFull: _toggleClassListFull,
    _toggleClassListPonyfill: _toggleClassListPonyfill,
    _toggleClassRegExp: _toggleClassRegExp,
  })

  class_methods.has = _classlist_enabled ? _hasClassList : _hasClassRegExp
  class_methods.add = _classlist_enabled ? _addClassList : _addClassRegExp
  class_methods.remove = _classlist_enabled ? _removeClassList : _removeClassRegExp
  class_methods.toggle = _classlist_enabled ? _toggleClassList : _toggleClassRegExp

  return class_methods
}
