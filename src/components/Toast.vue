<script setup lang="ts">
import { cva } from 'class-variance-authority'
import className from '~/utils/className'
import XIcon from '~/components/icons/XIcon.vue'

defineProps<{
  class?: string
  closeClass?: string
  variant?: 'default' | 'error' | 'success' | 'info' | 'warning'
}>()

const toastVariants = cva(
  'data-[swipe=move]:transition-none grow-1 group relative pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=move]:tranneutral-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:tranneutral-x-0 data-[swipe=end]:tranneutral-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full mt-4 data-[state=closed]:slide-out-to-right-full dark:border-neutral-700 last:mt-0 sm:last:mt-4',
  {
    variants: {
      variant: {
        default: 'bg-white border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700',
        error: 'group destructive bg-red-600 text-white border-red-600 dark:border-red-600',
        success: 'group success bg-green-600 text-white border-green-600 dark:border-green-600',
        info: 'group info bg-blue-600 text-white border-blue-600 dark:border-blue-600',
        warning: 'group warning bg-yellow-600 text-white border-yellow-600 dark:border-yellow-600'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
</script>

<template>
  <div
    class="fixed bottom-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[520px]"
  >
    <!-- toast -->
    <div :class="className(toastVariants({ variant }))">
      <!-- button -->
      <button type="button" class="absolute right-2 top-2 rounded-md p-1" :class="closeClass">
        <XIcon class="h-6 w-6" />
      </button>
    </div>
  </div>
</template>
