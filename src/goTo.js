// @method goTo
// @description method to jump to a particular position within the path change
// @params
// - key [String] the key to search for and jump to
// - current [Object] The current path object
// - root [Object] the root object within a path
// @returns [Object] the current object if matching the key or root

export function goTo(key, current, root) {

  // if the current step matches the key return the current step
  if(current.matches(key)) {
    return current
  }

  // if we're at a step that forks into two or more use recursion to search each path to find the match
  if(current._keys.length > 1) {
    const match = current._keys
      .map( k => goTo(key, current[k], root))
      .filter( m => m.name === key)[0]
    // if the match is found return it, otherwise return the root object
    return match ? match : root
  // if we're on a linear path check the next step
  } else if(current._keys.length === 1) {
    return goTo(key, current.next(), root)
  }

  // we're at the last step with no match
  return root

}