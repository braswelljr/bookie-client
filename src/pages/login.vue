<script setup lang="ts">
import ChevronLeftIcon from '~/components/icons/ChevronLeftIcon.vue'
import SpinnerIcon from '~/components/icons/SpinnerIcon.vue'
import Input from '~/components/Input.vue'
import { baseApiUrl } from '~/config/constants'
import flattenArray from '~/utils/flattenArray'
import mapNonFalsyValuesToObject from '~/utils/mapNonFalsyValues'

let loading = $ref(false)

// form state
const data = $ref<{
  email: { value: string; required: boolean; error?: { message: string }[] }
  password: { value: string; required: boolean; error?: { message: string }[] }
}>({
  email: { value: '', required: true, error: undefined },
  password: { value: '', required: true, error: undefined }
})

// validate email
watch(
  () => data.email.value,
  email => {
    if (email && !email.match(/^(?!:\/\/)([^\s@]+@[^\s@]+\.)+[^\s@]{2,}$/)) {
      data.email.error = [
        {
          message: 'Enter a valid Email Address'
        }
      ]
    } else data.email.error = undefined
  }
)

// validate password
watch(
  () => data.password.value,
  password => {
    if (password) {
      data.password.error = undefined

      // check for length of password
      if (password.length < 8)
        data.password.error = [{ message: 'Password must be at least 8 characters' }]

      // check for uppercase
      if (!password.match(/[A-Z]/))
        data.password.error = [
          ...(data.password.error || []),
          { message: 'Password must contain at least one uppercase letter.' }
        ]

      // check for lowercase
      if (!password.match(/[a-z]/))
        data.password.error = [
          ...(data.password.error || []),
          { message: 'Password must contain at least one lowercase letter.' }
        ]

      // check for number
      if (!password.match(/[0-9]/))
        data.password.error = [
          ...(data.password.error || []),
          { message: 'Password must contain at least one number.' }
        ]

      // check for special character
      if (!password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/))
        data.password.error = [
          ...(data.password.error || []),
          { message: 'Password must contain at least one special character.' }
        ]

      // check for spaces in password
      if (password.match(/\s/))
        data.password.error = [
          ...(data.password.error || []),
          { message: 'Password must not contain any spaces' }
        ]
    } else data.password.error = undefined
  }
)

const onSubmit = async (e: Event) => {
  // change loading state
  loading = true
  // prevent default during submision
  e.preventDefault()
  // loop and map all errors into onto
  const errors = flattenArray(
    Object.entries(data).map(([key, { value, required, error }]) => {
      let all: string[] = []
      if (error && error.length > 0) {
        all = [...all, ...error.map(v => v.message)]
      }

      if (value && value.trim().length < 1 && required) {
        all = [...all, `Value of ${key} should not be empty.`]
      }

      return all
    })
  )

  // check for errors and
  if (errors.length > 0) {
    // change loading state and return
    loading = false
    console.log(errors)
    return
  }

  // map all data key value.value into a new object
  const values = Object.entries(data).reduce((acc, [key, value]) => {
    acc[key] = value.value
    return acc
  }, {} as Record<string, string>)

  // map and add the non-empty fields into a new object
  const payload = mapNonFalsyValuesToObject(values)

  try {
    // fetch from url
    const response = await fetch(`${baseApiUrl}/login`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    // check for response status
    if (response.ok || response.status === 200 || response.status === 201) {
      // get the response data
      const data = await response.json()

      // check for data
      if (data) {
        // set the token in local storage
        localStorage.setItem('token', data.token)
        // redirect to dashboard
        // $router.push('/dashboard')
      }
    } else {
      // change loading state
      loading = false
      // get the response data
      const data = await response.json()
      // check for data
      if (data) {
        // log the error
        console.log(data)
      }
    }
  } catch (error) {
    console.log(error)
  }

  // loading
  loading = false
}
</script>

<template>
  <main class="w-full">
    <!-- Back Button -->
    <NuxtLink
      to="/"
      class="fixed left-4 top-4 z-10 flex items-center space-x-2 bg-blue-600 py-1.5 pl-1 pr-3 uppercase hover:bg-blue-700 dark:text-white max-sm:h-10 max-sm:w-10 max-sm:justify-center"
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
          @submit="onSubmit"
        >
          <!-- email -->
          <Input
            :id="`email`"
            v-model:value="data.email.value"
            v-model:error="data.email.error"
            :type="`email`"
            :required="true"
            :header="`Email`"
            :class="`mx-5 lg:mx-0`"
            :placeholder="`Email`"
          />
          <!-- password -->
          <Input
            :id="`password`"
            v-model:value="data.password.value"
            v-model:error="data.password.error"
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
