/**
 * flattenArray - repeatedly steps through array and concatenates all nested arrays
 *
 * @param {Array} array - array to flatten
 * @returns {Array} - flattened array
 */
export default function flattenArray<T>(array: Array<T | Array<T>>): Array<T> {
  return array.reduce<Array<T>>((flat: Array<T>, toFlat: T | Array<T>) => {
    return flat.concat(Array.isArray(toFlat) ? flattenArray(toFlat) : toFlat)
  }, [])
}
