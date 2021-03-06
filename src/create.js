import { generatePath } from './generatePath'
import { convertList } from './convertList'
import { decorate } from './decorate'

// @method create
// @description create a path object a developer can work with and return
// @params
// - path [Array] the path array
// - root [Object] the root step object
// @returns [Object] the path object

export function create(path, root = {}) {

  if(!Array.isArray(path) || path.length === 0) {
    root.name = root.name || 'step1'
    return decorate(root, null, null)
  }

  path = convertList(path)

  const result = generatePath(path, null, root)

  return decorate(result, null, null)

}

export default create