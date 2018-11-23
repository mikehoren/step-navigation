import { goTo } from './goTo'

// @method decorate
// @description decorates the paths with helper methods and properties
// @params
// - root [Object] the root step in the path
// - prev [Object|null] the previous step
// - next [Object|null] the next step
// @returns [Object] returns the root step

export function decorate(root, prev, next) {

  // we're on the initial step
  if(!prev) {
    prev = root
    prev._keys = Object.keys(prev).filter( k => k !== 'name')
    prev.isFirst = true
    prev.back = () => root
    prev.next = (value) => prev[value] ? prev[value] : prev[prev._keys[0]]
    prev.matches = (value) => value === prev.name
    prev.first = () => root
    prev.goTo = key => goTo(key, root, root)

    // if we're forking to two paths
    if(prev._keys.length > 1) {
      prev._keys.forEach( k => {
        decorate(root, prev, prev[k])
      })
    } else if(prev._keys.length === 1) {
      return decorate(root, prev, prev[prev._keys[0]])
    }

  // all other steps other than initial
  } else {
    next._keys = Object.keys(next).filter( k => k !== 'name')
    next.back = () => prev
    next.next = (value) => next[value] ? next[value] : next[next._keys[0]]
    next.matches = (value) => value === next.name
    next.first = () => root
    next.goTo = key => goTo(key, root, root)

    // if we're forking to two paths
    if(next._keys.length > 1) {
      next._keys.forEach( k => {
        decorate(root, next, next[k])
      })
    } else if(next._keys.length === 1) {
      return decorate(root, next, next[next._keys[0]])
    }
  }

  // we're on the last step
  if(next._keys.length === 0) {
    next.isLast = true
    next.next = () => next
  }

  return root

}