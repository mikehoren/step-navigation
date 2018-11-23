export function convertList(list) {
  return list.map( v => {
    if(typeof v === 'string') {
      return {
        name: v
      }
    }
    if(Array.isArray(v)) {
      return convertList(v)
    }
    if(!v || !v.name) {
      throw new Error('Input path must be an array of strings, an array of objects with a name property or an array of arrays of the previous.')
    }
    return v
  })
}