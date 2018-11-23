export function generatePath(path, base, root = {}, returnLast = false) {

  if(path.length === 0) {
    return root
  }

  path = path.concat([])

  const step = path.shift()
  let nextStep = null

  if(!base) {
    base = root
    base.name = step.name
    nextStep = base
  } else {
    if(Array.isArray(step)) {
      const _steps = step.map( (s, idx) => {
        const _step = s.shift()
        base[_step.name] = {
          ..._step,
        }
        return generatePath(s, base[_step.name], root, s.length === 1)
      })

      if(_steps.length > 0) {
        _steps.forEach( s => generatePath(path.concat([]), s, root))
      } else if(path.length > 0) {
        return generatePath(path, nextStep, root)
      }

      return root
    } else {
      base[step.name] = {
        ...step,
      }
      nextStep = base[step.name]
    }
  }

  if(path.length > 0) {
    return generatePath(path, nextStep, root)
  }

  if(returnLast) {
    return base[step.name]
  }

  return root
}