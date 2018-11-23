import { goTo } from './goTo'

export function decorate(root, prev, next) {

  if(!prev) {
    prev = root
    prev._keys = Object.keys(prev).filter( k => k !== 'name')
    prev.isFirst = true
    prev.back = () => root
    prev.next = (value) => prev[value] ? prev[value] : prev[prev._keys[0]]
    prev.matches = (value) => value === prev.name
    prev.first = () => root
    prev.goTo = key => goTo(key, root, root)

    if(prev._keys.length > 1) {
      prev._keys.forEach( k => {
        decorate(root, prev, prev[k])
      })
    } else if(prev._keys.length === 1) {
      return decorate(root, prev, prev[prev._keys[0]])
    }

  } else {
    next._keys = Object.keys(next).filter( k => k !== 'name')
    next.back = () => prev
    next.next = (value) => next[value] ? next[value] : next[next._keys[0]]
    next.matches = (value) => value === next.name
    next.first = () => root
    next.goTo = key => goTo(key, root, root)

    if(next._keys.length > 1) {
      next._keys.forEach( k => {
        decorate(root, next, next[k])
      })
    } else if(next._keys.length === 1) {
      return decorate(root, next, next[next._keys[0]])
    }
  }

  if(next._keys.length === 0) {
    next.isLast = true
    next.next = () => next
  }

  return root

}