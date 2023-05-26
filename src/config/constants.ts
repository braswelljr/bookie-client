/**
 * baseApiUrl: The base URL for the API
 */
export const baseApiUrl = 'https://stage-bookie-api-7kt2.encr.app'

export const bcookies = {
  authentication: {
    name: '_host__user__data_',
    options: {
      path: '/',
      secure: true,
      watch: true,
      maxAge: 60 * 60 * 24 // 1 day
    }
  }
}
