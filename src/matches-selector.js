
var matches_selector_properties = [
  'matches',
  'matchesSelector',
  'webkitMatchesSelector',
  'mozMatchesSelector',
  'msMatchesSelector',
  'oMatchesSelector',
]

var matches_selector_property = matches_selector_properties.reduce(function (matched_name, property_name) {
  if( matched_name ) return matched_name
  if( property_name in Element.prototype ) return property_name
}, null)

export default function matchesSelector (el, selector) {
  return el[matches_selector_property](selector)
}
