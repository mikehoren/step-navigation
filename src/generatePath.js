// @method generatePath
// @description the main generation method that creates the linked-list style path
// @params
// - path [Array] the path input array
// - base [Object] the current step object we're on
// - root [Object] the root step of the path
// - returnLast [Boolean] returns the last result of the path not root (used in forked paths)
// @returns [Object] either the root of the path or the current step

export function generatePath(path, base, root = {}, returnLast = false) {

  // if we have no path return root
  if(path.length === 0) {
    return root
  }

  // we concat here to avoid mutability
  path = path.concat([])

  const step = path.shift()
  let nextStep = null

  // if we're on the first step
  if(!base) {
    base = root
    base.name = step.name
    base.data = step.data || {}
    nextStep = base
  // we're not on the first step
  } else {
    // if we're at a fork in the path
    if(Array.isArray(step)) {

      let connectToBridge = false

      // generate forked paths, return the last step of each
      let _steps = step.map( (s, idx) => {

        // if an empty array is included it specifies we also want a direct connection from the current step to the bridged step later down the line
        if(s.length === 0) {
          connectToBridge = true
          return null
        }

        const _step = s.shift()
        base[_step.name] = {
          ..._step,
        }
        return generatePath(s, base[_step.name], root, s.length === 1)
      })

      _steps = _steps.filter( s => !!s)

      // if we're not bridging back to a single path complete the paths
      if(_steps.length > 0) {
        // generate the fork directly to the bridged path
        if(connectToBridge && path.length > 0) {
          base._bridge = path[0].name
          generatePath(path, base, root)
        }
        _steps.forEach( s => generatePath(path.concat([]), s, root))
      // if this is a bridge complete the single path
      } else if(path.length > 0) {
        return generatePath(path, base, root)
      }

      return root
    // we're on a linear path
    } else {
      base[step.name] = {
        ...step,
      }
      nextStep = base[step.name]
    }
  }

  // we're not done yet, keep going
  if(path.length > 0) {
    return generatePath(path, nextStep, root)
  }

  // used when working with forked paths
  if(returnLast) {
    return base[step.name]
  }

  return root
}