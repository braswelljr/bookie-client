// flattenArray - repeatedly steps through array and concatenates all nested arrays
//
// @param {Array} array - array to flatten
// @returns {Array} - flattened array
export default function flattenArray<T>(array: (T | T[])[]): T[] {
  return array.reduce<T[]>((flat: T[], toFlat: T | T[]) => {
    return flat.concat(Array.isArray(toFlat) ? flattenArray(toFlat) : toFlat)
  }, [])
}
