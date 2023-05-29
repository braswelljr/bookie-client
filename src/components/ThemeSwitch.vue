<template>
  <div class="" :class="$props.class">
    <ul class="flex space-x-1">
      <button
        v-for="([m, icon], i) in Object.entries(theme)"
        :key="m"
        type="button"
        class="relative p-1.5"
        @click="COLORMODE()"
      >
        <div
          v-if="m === $colorMode.value"
          class="absolute inset-0 h-full w-full rounded-sm bg-blue-600"
          :class="{
            'rounded-l-sm': i === 0,
            'rounded-r-sm': i === Object.entries(theme).length - 1
          }"
        ></div>
        <Component
          :is="icon"
          class="relative z-[1] h-5 w-auto"
          :class="m === $colorMode.value && 'text-white'"
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

const color = useColorMode()
const { isMobile } = useDevice()

const COLORMODE = () => (color.preference = color.value === 'dark' ? 'light' : 'dark')
const theme = {
  system: isMobile ? PhoneIcon : DesktopIcon,
  light: SunIcon,
  dark: MoonIcon
}
</script>
