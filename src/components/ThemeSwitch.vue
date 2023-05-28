<template>
  <div class="" :class="$props.class">
    <ul class="flex space-x-1">
      <button
        v-for="[mode, icon] in Object.entries({
          system: isMobile ? PhoneIcon : DesktopIcon,
          light: SunIcon,
          dark: MoonIcon
        })"
        :key="mode"
        type="button"
        class="relative p-1.5"
        @click="() => ($colorMode.value = mode)"
      >
        <div
          v-if="mode === $colorMode.value"
          v-motion
          class="absolute inset-0 h-full w-full rounded-sm bg-blue-600"
        ></div>
        <Component
          :is="icon"
          class="relative z-[1] h-5 w-auto"
          :class="mode === $colorMode.value && 'text-white'"
        />
      </button>
    </ul>
  </div>
</template>

<script setup lang="ts">
import SunIcon from '~/components/icons/SunIcon.vue'
import MoonIcon from '~/components/icons/MoonIcon.vue'
import PhoneIcon from '~/components/icons/PhoneIcon.vue'
import DesktopIcon from '~/components/icons/DesktopIcon.vue'

defineProps<{
  class?: string
}>()

const { isMobile } = useDevice()
</script>
