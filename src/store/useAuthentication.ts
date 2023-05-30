import { defineStore } from 'pinia'
import { bcookies } from '~/config/constants'
import { User } from '~~/types'

const useAuthentication = defineStore('authentication', () => {
  const user = ref<User | undefined>(undefined)
  const token = ref<string | undefined>(undefined)

  // sync states with cookies and set expiration
  const info = useCookie(bcookies.authentication.name, { httpOnly: true, maxAge: 60 * 60 * 24 })

  // watch cookie for first time mount
  const c = computed(() => info.value)
  watch(
    c,
    cookie => {
      if (cookie) {
        const { user, token } = JSON.parse(cookie)
        setUser(user)
        setToken(token)
      }
    },
    { immediate: true }
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

  return { user, setUser, token, setToken }
})

export default useAuthentication
