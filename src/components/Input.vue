<script setup lang="ts">
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeClosedIcon from '@/components/icons/EyeClosedIcon.vue'

const props = withDefaults(
  defineProps<{
    class?: string
    as?: 'input' | 'textarea'
    type?: 'text' | 'password' | 'date' | 'email' | 'number' | 'tel' | 'url'
    id: string
    rows?: number
    placeholder?: Slottable | string
    header?: string | Slottable
    required?: boolean
    value: any
    error?: {
      message: string
    }[]
  }>(),
  {
    as: 'input',
    type: 'text',
    rows: 1,
    required: false
  }
)

defineEmits<{
  (e: 'change', id: number): void
  (e: 'update:value', value: string): void
}>()

const showPassword = $ref<boolean>(false)

const h = $computed(() => props.header || props.placeholder)

// computed error
const errors = $computed(() => props.error)

// value
const v = $computed(() => props.value)
</script>

<template>
  <div :class="`${$props.class} relative`">
    <div className="relative w-full">
      <!-- input -->
      <Component
        :is="as"
        :id="id"
        v-model="v"
        :type="type === 'password' ? (showPassword ? 'text' : 'password') : type"
        :placeholder="placeholder"
        auto-complete="off"
        autocomplete="off"
        aria-autocomplete="list"
        v-bind="$attrs"
        :rows="rows"
        :class="`peer w-full rounded-sm border bg-white p-2 text-zinc-900 placeholder-transparent focus:outline-none focus:outline-0 focus:ring-0 dark:bg-zinc-900 dark:text-white ${
          error
            ? `border-red-500/50 focus:border-red-600/50 dark:border-red-500/50 dark:focus:border-red-500/50`
            : `border-blue-700/50 dark:border-zinc-900/50`
        }`"
        @input="(e: Event) => $emit('update:value', (e.target as HTMLInputElement | HTMLTextAreaElement ).value)"
      />
      <!-- labels -->
      <label
        :for="id"
        :class="`absolute -top-6 left-2 scale-y-0 transition-all peer-placeholder-shown:scale-y-100 dark:text-zinc-300`"
      >
        {{ h }} <span v-if="required" class="text-red-600">*</span>
      </label>
      <label
        :for="id"
        :class="`absolute -top-6 left-2 transition-all peer-placeholder-shown:right-2 peer-placeholder-shown:top-2 peer-placeholder-shown:overflow-hidden peer-placeholder-shown:truncate peer-placeholder-shown:text-zinc-500 dark:text-zinc-300`"
      >
        {{ placeholder }}
      </label>
      <!-- show password -->
      <button
        v-if="type === 'password'"
        type="button"
        class="absolute inset-y-0 right-2 z-[1] w-6 cursor-pointer space-x-2 overflow-hidden focus:outline-none"
        @click="() => (showPassword = !showPassword)"
      >
        <EyeIcon
          :class="`block h-auto w-4 translate-y-2 transition-all ${
            showPassword ? '-translate-x-full' : 'translate-x-1'
          }`"
        />
        <EyeClosedIcon
          :class="`block h-auto w-4 -translate-y-[50%] transition-all ${
            showPassword ? '-translate-x-1' : 'translate-x-full'
          }`"
        />
      </button>
    </div>
    <!-- error -->
    <div v-if="errors" class="p-1 text-[13px] font-light text-red-500">
      <ul v-if="errors && Array.isArray(errors)" class="list-inside list-disc">
        <li v-for="e in errors" :key="e.message">{{ e.message }}</li>
      </ul>
      <span v-else>{{ 'Enter your ' + placeholder }} </span>
    </div>
  </div>
</template>
