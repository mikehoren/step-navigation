import { generatePath } from './generatePath'
import { convertList } from './convertList'
import { decorate } from './decorate'

export function create(path, root = {}) {

  if(!Array.isArray(path)) {
    return root
  }

  path = convertList(path)

  const result = generatePath(path, null, root)

  return decorate(result, null, null)

}

export default create