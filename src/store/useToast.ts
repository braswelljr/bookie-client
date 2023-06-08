import { defineStore } from 'pinia'
import { ToastI, ToastRequest } from '~~/types'

const useToast = defineStore('toasts', () => {
  const TOAST_LIMIT = 3
  const toasts = ref<ToastI[]>([])

  const addToast = (t: ToastRequest) => {
    const toast: ToastI = {
      id: Date.now().toString(36),
      title: t.title,
      description: t.description,
      actions: t.actions,
      variant: t.variant,
      open: t.open || true,
      onOpenChange: t.onOpenChange
    }

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
