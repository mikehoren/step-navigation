export function goTo(key, current, root) {

  if(current.matches(key)) {
    return current
  }

  if(current._keys.length > 1) {
    const match = current._keys
      .map( k => goTo(key, current[k], root))
      .filter( m => m.name === key)[0]

    return match ? match : root
  } else if(current._keys.length === 1) {
    return goTo(key, current.next(), root)
  }

  return root

}