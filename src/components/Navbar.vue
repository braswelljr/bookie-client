<script setup lang="ts">
import UserIcon from '~/components/icons/UserIcon.vue'
import MenuIcon from '~/components/icons/MenuIcon.vue'
import { cn } from '~/utils/className'

defineProps<{
  class?: string
  o?: 'closed' | 'opened'
  setO?: () => void
}>()
</script>

<template>
  <nav
    :class="
      cn(
        $props.class,
        'flex items-center justify-between border-b-[0.25px] border-zinc-200 bg-zinc-50 px-2 py-4 dark:border-zinc-600 dark:bg-zinc-950'
      )
    "
  >
    <!-- menu button -->
    <button
      type="button"
      :tabindex="-1"
      class="inline-flex h-9 w-9 items-center justify-center"
      @click="setO && setO()"
    >
      <MenuIcon class="h-6 w-auto text-zinc-900 dark:text-white" />
    </button>
    <!-- header -->
    <h1 class="">
      <span class="sr-only">Bookie</span>
      <img class="h-10 w-auto" src="~/assets/images/task.png" alt="task icon" />
    </h1>
    <!-- profile -->
    <button
      type="button"
      :tabindex="-1"
      class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 focus:outline-none focus:ring-0"
    >
      <UserIcon class="h-5 w-auto text-white" />
    </button>
  </nav>
</template>
