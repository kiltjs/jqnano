
  export function first (list, iteratee, thisArg) {
    for( var i = 0, n = list.length ; i < n ; i++ ) {
      if( iteratee.call(thisArg, list[i], i) ) return list[i]
    }
  }

  export function last (list, iteratee, thisArg) {
    for( var i = list.length - 1 ; i >= 0 ; i-- ) {
      if( iteratee.call(thisArg, list[i], i) ) return list[i]
    }
  }

  export function each (o, iteratee, thisArg) {
    if( o instanceof Array ) return o.forEach(iteratee, thisArg)
    for( var key in o ) {
      iteratee.call(thisArg, o[key], key)
    }
  }
