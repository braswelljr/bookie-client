/**
 * mapNonFalsyValuesToObject - Maps non-falsy values to an object
 */
export default function mapNonFalsyValuesToObject<T extends object>(object: T): Partial<T> {
  // return an object with the non-falsy values
  return Object.entries(object).reduce((result: Partial<T>, [key, value]) => {
    // check if the value is not falsy
    if (value) (result as Partial<T>)[key as keyof T] = value

    return result
  }, {})
}
