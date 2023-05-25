import { defineStore } from 'pinia'
import { ToastI } from '~~/types'

const useToast = defineStore('toasts', () => {
  const TOAST_LIMIT = 3
  const toasts = ref<ToastI[]>([])

  const addToast = (toast: ToastI) => {
    toast.id = Date.now().toString(36)
    toast.open = true

    if (toasts.value.length >= TOAST_LIMIT) toasts.value.shift()

    toasts.value.push(toast)
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(
      toast => toast.id === id || toast.title === id || toast.description === id
    )

    // remove toast if found in array with timeout
    if (index > -1) {
      const toast = toasts.value[index]
      toast.open = false

      setTimeout(() => {
        toasts.value.splice(index, 1)
      }, 500)
    }
  }

  const clearToasts = () => (toasts.value = [])

  return { toasts, addToast, removeToast, clearToasts }
})

export default useToast
