/**
 *  ClassObject - An interface to define the object type for the className function
 */
interface ClassObject {
  [key: string]: boolean
}

/**
 * ClassValue - An interface to define the type for the className function
 */
type ClassValue = string | ClassObject | ClassArray | undefined | null

/**
 * ClassArray - An interface to define the array type for the className function
 */
interface ClassArray extends Array<ClassValue> {}

/**
 * className - A utility function to join class names together for use in vue components
 *
 * @params args - class names to join together (string, array, object)
 * @returns {string} - joined class names
 * @example
 * Usage: <div :class="className('class1', 'class2', 'class3', { 'class4': true }, ['class5'])"></div>
 * Output: <div class="class1 class2 class3 class4 class5 class6"></div>
 */
export default function className(...args: ClassValue[]): string {
  const classes: string[] = []

  for (const arg of args) {
    if (!arg) continue

    const argType = typeof arg

    if (argType === 'string') {
      classes.push(arg as string)
    } else if (Array.isArray(arg) && arg.length) {
      // check if there is a nested array, if so, join the array
      const inner = className(...arg)
      // if there is a nested array, push it to the classes array
      if (inner) classes.push(inner)
    } else if (argType === 'object') {
      // check if the object is a class object and if it has a key
      for (const key in arg as ClassObject) {
        // if the key exists and is not an empty string, push it to the classes array
        if ((arg as ClassObject)[key] && key && key.trim().length) {
          classes.push(key)
        }
      }
    }
  }

  return classes.join(' ')
}
