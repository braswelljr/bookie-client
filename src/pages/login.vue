<script setup lang="ts">
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue'
import Input from '@/components/Input.vue'

const loading = $ref(false)

// form state
const email = $ref('')
const password = $ref('')

// validation
const errors = $ref<{
  email?: {
    message: string
  }[]
  password?: {
    message: string
  }[]
}>({
  email: undefined,
  password: undefined
})

// validate email
watch(
  () => email,
  email => {
    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = [
        {
          message: 'Enter a valid Email Address'
        }
      ]
    } else errors.password = undefined
  }
)

// validate password
watch(
  () => password,
  password => {
    if (password) {
      errors.password = undefined

      // check for length of password
      if (password.length < 8)
        errors.password = [{ message: 'Password must be at least 8 characters' }]

      // check for uppercase
      if (!password.match(/[A-Z]/))
        errors.password = [
          ...(errors.password || []),
          { message: 'Password must contain at least one uppercase letter.' }
        ]

      // check for lowercase
      if (!password.match(/[a-z]/))
        errors.password = [
          ...(errors.password || []),
          { message: 'Password must contain at least one lowercase letter.' }
        ]

      // check for number
      if (!password.match(/[0-9]/))
        errors.password = [
          ...(errors.password || []),
          { message: 'Password must contain at least one number.' }
        ]

      // check for special character
      if (!password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/))
        errors.password = [
          ...(errors.password || []),
          { message: 'Password must contain at least one special character.' }
        ]

      // check for spaces in password
      if (password.match(/\s/))
        errors.password = [
          ...(errors.password || []),
          { message: 'Password must not contain any spaces' }
        ]
    } else errors.password = undefined
  }
)
</script>

<template>
  <main class="w-full">
    <!-- Back Button -->
    <NuxtLink
      to="/"
      class="fixed left-4 top-4 flex items-center space-x-2 bg-blue-600 py-1.5 pl-1 pr-3 uppercase hover:bg-blue-700 dark:text-white max-sm:h-10 max-sm:w-10 max-sm:justify-center"
    >
      <ChevronLeftIcon class="h-4 w-auto max-sm:-mr-2 max-sm:h-6" />
      <span class="max-sm:hidden">Back</span>
    </NuxtLink>
    <!-- Main -->
    <div class="relative min-h-screen w-full">
      <div class="h-auto w-full translate-y-1/3">
        <!-- header -->
        <header class="w-auto">
          <h1 class="mx-auto flex w-auto items-center justify-center space-x-4">
            <span class="sr-only">Bookie</span>
            <img class="mx-auto h-10 w-auto" src="@/assets/images/task.png" alt="task icon" />
            <div class="mx-auto text-center text-2xl font-bold uppercase tracking-wider">Login</div>
          </h1>
        </header>
        <!-- body -->
        <form
          id="login-form"
          action="#"
          method="post"
          class="mt-14 space-y-10 md:mx-auto md:w-2/3 lg:w-1/2 xl:w-2/5"
          @submit="() => {}"
        >
          <!-- email -->
          <Input
            :id="`email`"
            v-model:value="email"
            v-model:error="errors.email"
            :type="`email`"
            :required="true"
            :header="`Email`"
            :class="`mx-5 lg:mx-0`"
            :placeholder="`Email`"
          />
          <!-- password -->
          <Input
            :id="`password`"
            v-model:value="password"
            v-model:error="errors.password"
            :type="`password`"
            :required="true"
            :header="`Password`"
            :class="`mx-5 lg:mx-0`"
            :placeholder="`Password`"
          />
          <!-- footer -->
          <div className="mx-5 lg:mx-0 space-y-5">
            <!-- submit -->
            <button
              type="submit"
              class="w-full rounded bg-blue-600 p-2 font-semibold uppercase text-white transition-transform hover:-translate-y-[2px] focus:outline-none focus:ring-0 dark:bg-blue-600"
            >
              <SpinnerIcon v-if="loading" class="h-5 w-auto" />
              <span v-else>Login</span>
            </button>
            <!-- Don't have an account? -->
            <div class="text-center">
              Don't have an account?
              <NuxtLink to="/signup" class="cursor-pointer text-blue-500 hover:text-blue-400"
                >Register</NuxtLink
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
