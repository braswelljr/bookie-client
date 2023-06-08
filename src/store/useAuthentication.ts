import { defineStore } from 'pinia'
import { User } from '~~/types'

const useAuthentication = defineStore('authentication', () => {
  const user = ref<User | undefined>(undefined)
  const token = ref<string | undefined>(undefined)
  const elevatedMode = computed(
    () => user.value?.role === 'superadmin' || user.value?.role === 'admin'
  )

  /**
   * setUser - updates the user state
   * @returns {void}
   */
  const setUser = (u: User | undefined): void => (user.value = u) as void

  /**
   * setToken - updates the token state
   * @param {string | undefined} t - the token string
   * @returns {void}
   */
  const setToken = (t: string | undefined): void => (token.value = t) as void

  return { user, setUser, token, setToken, elevatedMode }
})

export default useAuthentication
