import { defineStore } from 'pinia'

const useProfile = defineStore('profile', () => {
  const profile = ref({})

  return { profile }
})

export default useProfile
