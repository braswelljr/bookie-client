import { defineStore } from 'pinia'
import { User } from '~~/types'

const useProfile = defineStore('profile', () => {
  const user = ref<User | undefined>(undefined)

  /**
   * setUser - updates the user state
   *
   * @param {User | undefined} user - the user object
   * @returns {void}
   */
  const setUser = (u: User | undefined): void => (user.value = u) as void

  return { user, setUser }
})

export default useProfile
