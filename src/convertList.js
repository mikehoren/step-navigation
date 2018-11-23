// @method convertList
// @description convertst a list to a list of objects to be used in path generation
// @params
// - list [Array] a path array
// @returns [Array] a formatted path array used to generate a path object

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