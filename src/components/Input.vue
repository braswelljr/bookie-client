<script setup lang="ts">
import { FieldNode } from 'vue-hooks-form/dist/src/utils'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeClosedIcon from '@/components/icons/EyeClosedIcon.vue'

const props = withDefaults(
  defineProps<{
    class?: string
    as?: 'input' | 'textarea' | string
    type?: 'text' | 'password' | 'date' | 'email' | 'number' | 'tel' | 'url'
    id: string
    rows?: number
    placeholder?: Slottable | string
    header?: string | Slottable
    required?: boolean
    fields?: {
      ref: (nodeRef: FieldNode) => void
      value: any
      error:
        | {
            message: string
            field: string
          }[]
        | undefined
      validate: () => Promise<any>
    }
  }>(),
  {
    as: 'input',
    type: 'text',
    rows: 1,
    required: false
  }
)

const showPassword = ref(false)

const header = props.header || props.placeholder
</script>

<template>
  <div :class="`${$props.class} relative`">
    <div className="relative">
      <!-- input -->
      <Component
        :is="as"
        :id="id"
        :ref="fields?.ref"
        :value="fields?.value"
        :type="type === 'password' ? (showPassword ? 'text' : 'password') : type"
        :placeholder="placeholder"
        auto-complete="off"
        autocomplete="off"
        aria-autocomplete="list"
        :rows="rows"
        :class="`peer w-full rounded-sm border bg-white p-2 text-zinc-900 placeholder-transparent focus:outline-none focus:outline-0 focus:ring-0 dark:bg-zinc-900 dark:text-white ${
          fields?.error
            ? `border-red-500/50 focus:border-red-600/50 dark:border-red-500/50 dark:focus:border-red-500/50`
            : `border-blue-700/50 dark:border-zinc-900/50`
        }`"
      />
      <!-- labels -->
      <label
        :for="id"
        :class="`absolute left-2 -top-6 scale-y-0 transition-all peer-placeholder-shown:scale-y-100 dark:text-zinc-300`"
      >
        {{ header }} <span v-if="required" class="text-red-600">*</span>
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
        class="absolute inset-y-0 right-2 w-6 cursor-pointer space-x-2 overflow-hidden focus:outline-none"
        @click="showPassword = !showPassword"
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
    <div v-if="fields?.error" class="p-1 text-[13px] font-light text-red-500">
      {{
        fields?.error && fields.error[0].message
          ? fields.error[0].message
          : 'Enter your ' + placeholder
      }}
    </div>
  </div>
</template>
