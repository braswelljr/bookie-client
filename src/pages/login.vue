<script setup lang="ts">
import { useForm } from 'vue-hooks-form'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue'
import Input from '@/components/Input.vue'

const loading = $ref(false)

const { useField, handleSubmit, errors } = useForm()

const email = useField('email', {
  rule: {
    required: true,
    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    message: 'Invalid email address'
  }
})

const password = useField('password', {
  rule: {
    required: true,
    // pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/,
    min: 8,
    message: 'Enter a valid Password'
  }
})

const onSubmit = handleSubmit(data => {
  // eslint-disable-next-line no-console
  console.log(data)
})
</script>

<template>
  <main class="w-full">
    <!-- Back Button -->
    <NuxtLink
      to="/"
      class="fixed top-4 left-4 flex items-center space-x-2 bg-blue-600 py-1.5 pr-3 pl-1 uppercase hover:bg-blue-700 dark:text-white max-sm:h-10 max-sm:w-10 max-sm:justify-center"
    >
      <ChevronLeftIcon class="h-4 w-auto max-sm:-mr-2 max-sm:h-6" />
      <span class="max-sm:hidden">Back</span>
    </NuxtLink>
    <!-- Main -->
    <div class="relative min-h-screen w-full">
      <div class="h-auto w-full translate-y-1/3">
        <!-- header -->
        <header class="w-auto space-y-5">
          <h1 class="mx-auto w-auto">
            <span class="sr-only">Bookie</span>
            <img
              class="mx-auto h-16 w-auto max-sm:h-12"
              src="@/assets/images/task.png"
              alt="task icon"
            />
          </h1>
          <h2 class="mx-auto text-center text-2xl font-bold uppercase tracking-wider">Login</h2>
        </header>
        <!-- body -->
        <form
          id="login-form"
          action="#"
          method="post"
          class="mt-14 space-y-10 md:mx-auto md:w-2/3 lg:w-1/2 xl:w-2/5"
          @submit="onSubmit"
        >
          <!-- email -->
          <Input
            :id="`email`"
            :error="email.error ? email.error[0] : undefined"
            :required="true"
            :header="`Email`"
            :class="`mx-5 lg:mx-0`"
            :errormessage="`Enter a valid Email Address`"
            :placeholder="`Email`"
            :value="email"
          />
          <!-- password -->
          <Input
            :id="`password`"
            :type="`password`"
            :error="password.error ? password.error[0] : undefined"
            :required="true"
            :header="`Password`"
            :class="`mx-5 lg:mx-0`"
            :errormessage="`Enter a valid Password`"
            :placeholder="`Password`"
            :fields="password"
          />
          <!-- submit -->
          <div className="mx-5 lg:mx-0">
            <button
              type="submit"
              class="w-full rounded bg-blue-600 p-2 font-semibold uppercase text-white transition-transform hover:-translate-y-[2px] focus:outline-none focus:ring-0 dark:bg-blue-600"
            >
              <SpinnerIcon v-if="loading" class="h-5 w-auto" />
              <span v-else>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
