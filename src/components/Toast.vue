<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { cn } from '~/utils/className'
import XIcon from '~/components/icons/XIcon.vue'
import useToast from '~/store/useToast'
import { ToastI } from '~~/types'

const props = defineProps<{
  class?: string
}>()

const toastVariants = cva(
  'grow-1 group relative pointer-events-auto flex w-full duration-200 flex-col items-start justify-between space-y-4 overflow-hidden rounded-md border px-4 pb-4 pr-8 shadow-lg transition-all mt-4 dark:border-zinc-700 last:mt-0 sm:last:mt-4',
  {
    variants: {
      variant: {
        default: 'bg-white border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700',
        error: 'group error bg-red-600 text-white border-red-600 dark:border-red-600',
        success: 'group success bg-green-600 text-white border-green-600 dark:border-green-600',
        info: 'group info bg-blue-600 text-white border-blue-600 dark:border-blue-600',
        warning: 'group warning bg-yellow-600 text-white border-yellow-600 dark:border-yellow-600'
      },
      state: {
        open: 'animate-in slide-in-from-bottom',
        closed: 'animate-in slide-in-from-left'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

const { toasts, removeToast } = useToast()

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>() // map of toast id to timeout
// watch and remove toast after 5 seconds
watch(toasts, (ts: ToastI[]) => {
  ts.length > 0 &&
    ts.forEach(t => {
      if (t.open)
        toastTimeouts.set(
          t.id,
          setTimeout(() => removeToast(t.id), 5000)
        )
      else {
        const timeout = toastTimeouts.get(t.id)
        if (timeout) {
          clearTimeout(timeout)
          toastTimeouts.delete(t.id)
        }
      }
    })
})
</script>

<template>
  <!-- toast viewport -->
  <div
    v-if="toasts.length > 0"
    class="fixed bottom-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[520px]"
  >
    <!-- toast -->
    <div
      v-for="{ id, variant, title, description, actions, open } in toasts"
      :key="id"
      :class="cn(toastVariants({ variant, state: open ? 'open' : 'closed' }), props.class)"
    >
      <!-- button -->
      <button
        type="button"
        class="absolute right-2 top-2 rounded-md border-zinc-50 p-1.5"
        toast-close=""
        @click="() => removeToast(id)"
      >
        <XIcon class="h-5 w-5" />
      </button>
      <div cn="grid gap-3">
        <!-- title -->
        <h3 v-if="title" class="text-sm font-semibold uppercase">
          {{ title }}
        </h3>
        <!-- body -->
        <p v-if="description" class="text-xsm">{{ description }}</p>
      </div>
      <div v-if="actions" class="flex flex-1 justify-between space-x-2">
        <button
          v-for="action in actions"
          :key="action.toString()"
          class="inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.error]:border-red-100 group-[.info]:border-blue-100 group-[.success]:border-green-100 group-[.warning]:border-yellow-100 group-[.error]:hover:border-zinc-50 group-[.info]:hover:border-zinc-50 group-[.success]:hover:border-zinc-50 group-[.warning]:hover:border-zinc-50 group-[.error]:hover:bg-red-100 group-[.info]:hover:bg-blue-100 group-[.success]:hover:bg-green-100 group-[.warning]:hover:bg-yellow-100 group-[.error]:hover:text-red-600 group-[.info]:hover:text-blue-600 group-[.success]:hover:text-green-600 group-[.warning]:hover:text-yellow-600 group-[.error]:focus:ring-red-400 group-[.info]:focus:ring-blue-400 group-[.success]:focus:ring-green-400 group-[.warning]:focus:ring-yellow-400 group-[.error]:focus:ring-offset-red-600 group-[.info]:focus:ring-offset-blue-600 group-[.success]:focus:ring-offset-green-600 group-[.warning]:focus:ring-offset-yellow-600 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900 dark:data-[state=open]:bg-zinc-800"
        >
          {{ action }}
        </button>
      </div>
    </div>
  </div>
</template>
