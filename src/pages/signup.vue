<script setup lang="ts">
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue'
import Input from '@/components/Input.vue'

const loading = $ref(false)

// form state
const firstname = $ref('')
const lastname = $ref('')
const othernames = $ref('')
const username = $ref('')
const dateOfBirth = $ref('')
const email = $ref('')
const phone = $ref('')
const address = $ref('')
const city = $ref('')
const country = $ref('')
const password = $ref('')
const confirmPassword = $ref('')

// validation
const errors = $ref<{
  firstname?: { message: string }[]
  lastname?: { message: string }[]
  othernames?: { message: string }[]
  username?: { message: string }[]
  dateOfBirth?: { message: string }[]
  email?: { message: string }[]
  phone?: { message: string }[]
  address?: { message: string }[]
  city?: { message: string }[]
  country?: { message: string }[]
  password?: { message: string }[]
  confirmPassword?: { message: string }[]
}>({
  firstname: undefined,
  lastname: undefined,
  othernames: undefined,
  username: undefined,
  dateOfBirth: undefined,
  email: undefined,
  phone: undefined,
  address: undefined,
  city: undefined,
  country: undefined,
  password: undefined,
  confirmPassword: undefined
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

// watch confirm password
watch(
  () => confirmPassword,
  confirmPassword => {
    if (confirmPassword && confirmPassword !== password)
      errors.confirmPassword = [{ message: 'Passwords do not match' }]
    else errors.confirmPassword = undefined
  }
)
</script>

<template>
  <main class="w-full">
    <!-- Back Button -->
    <NuxtLink
      to="/"
      class="fixed top-4 left-4 z-10 flex items-center space-x-2 bg-blue-600 py-1.5 pr-3 pl-1 uppercase hover:bg-blue-700 dark:text-white max-sm:h-10 max-sm:w-10 max-sm:justify-center"
    >
      <ChevronLeftIcon class="h-4 w-auto max-sm:-mr-2 max-sm:h-6" />
      <span class="max-sm:hidden">Back</span>
    </NuxtLink>
    <!-- Main -->
    <div class="relative min-h-screen w-full">
      <div class="h-auto w-full pt-14 pb-12 md:pt-20">
        <!-- header -->
        <header class="w-auto">
          <h1 class="mx-auto flex w-auto items-center justify-center space-x-4">
            <span class="sr-only">Bookie</span>
            <img class="mx-auto h-10 w-auto" src="@/assets/images/task.png" alt="task icon" />
            <div class="mx-auto text-center text-2xl font-bold uppercase tracking-wider">
              Register
            </div>
          </h1>
        </header>
        <!-- forms -->
        <!-- body -->
        <form
          id="login-form"
          action="#"
          method="post"
          class="mt-10 space-y-10 not-last:space-y-10 md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/5"
          @submit="() => {}"
        >
          <!-- Names -->
          <div class="">
            <!-- header -->
            <h2 class="mx-5 text-xl font-bold uppercase tracking-wider lg:mx-0">Names</h2>
            <!-- fields -->
            <div class="grid gap-y-11 gap-x-6 lg:grid-cols-2">
              <Input
                :id="`firstname`"
                v-model:value="firstname"
                v-model:error="errors.firstname"
                :type="`text`"
                :required="true"
                :header="`Firstname`"
                :class="`mx-5 lg:mx-0`"
                :placeholder="`Firstname`"
              />
              <Input
                :id="`lastname`"
                v-model:value="lastname"
                v-model:error="errors.lastname"
                :type="`text`"
                :required="true"
                :header="`Lastname`"
                :class="`mx-5 lg:mx-0`"
                :placeholder="`Lastname`"
              />
              <Input
                :id="`othernames`"
                v-model:value="othernames"
                v-model:error="errors.othernames"
                :type="`text`"
                :required="false"
                :header="`Othernames`"
                :class="`mx-5 lg:mx-0`"
                :placeholder="`Othernames`"
              />
            </div>
          </div>
          <!-- contact -->
          <div class="">
            <!-- header -->
            <h2 class="mx-5 text-xl font-bold uppercase tracking-wider lg:mx-0">
              Contact and Dates
            </h2>
            <!-- fields -->
            <div class="grid gap-y-11 gap-x-6 lg:grid-cols-2">
              <!-- phone -->
              <Input
                :id="`phone`"
                v-model:value="phone"
                v-model:error="errors.phone"
                :type="`text`"
                :required="false"
                :header="`Phone`"
                :class="`mx-5 lg:mx-0`"
                :placeholder="`Phone`"
              />
              <!-- dateOfBirth -->
              <Input
                :id="`dateOfBirth`"
                v-model:value="dateOfBirth"
                v-model:error="errors.dateOfBirth"
                :type="`date`"
                :required="true"
                :header="`Date of Birth`"
                :class="`mx-5 lg:mx-0`"
                :placeholder="`Date of Birth`"
              />
            </div>
          </div>
          <!-- Address -->
          <div class="">
            <!-- header -->
            <h2 class="mx-5 text-xl font-bold uppercase tracking-wider lg:mx-0">Address</h2>
            <!-- fields -->
            <div class="grid gap-y-11 gap-x-6 lg:grid-cols-2">
              <!-- city -->
              <Input
                :id="`city`"
                v-model:value="city"
                v-model:error="errors.city"
                :type="`text`"
                :required="false"
                :header="`City`"
                :class="`mx-5 lg:mx-0`"
                :placeholder="`City`"
              />
              <!-- country -->
              <Input
                :id="`country`"
                v-model:value="country"
                v-model:error="errors.country"
                :type="`text`"
                :required="false"
                :header="`Country`"
                :class="`mx-5 lg:mx-0`"
                :placeholder="`Country`"
              />
              <!-- address -->
              <Input
                :id="`address`"
                v-model:value="address"
                v-model:error="errors.address"
                :type="`text`"
                :required="false"
                :header="`Address`"
                :class="`mx-5 lg:mx-0`"
                :placeholder="`Address`"
              />
            </div>
          </div>

          <!-- Account Details -->
          <div class="">
            <!-- header -->
            <h2 class="mx-5 text-xl font-bold uppercase tracking-wider lg:mx-0">Account Detals</h2>
            <!-- fields -->
            <div class="grid gap-y-11 gap-x-6 lg:grid-cols-2">
              <!-- username -->
              <Input
                :id="`username`"
                v-model:value="username"
                v-model:error="errors.username"
                :type="`text`"
                :required="true"
                :header="`Username`"
                :class="`mx-5 lg:mx-0`"
                :placeholder="`Username`"
              />
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
            </div>
          </div>
          <!-- Passwords -->
          <div class="">
            <!-- header -->
            <h2 class="mx-5 text-xl font-bold uppercase tracking-wider lg:mx-0">Passwords</h2>
            <!-- fields -->
            <div class="grid gap-y-11 gap-x-6 lg:grid-cols-2">
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
              <!-- confirm password -->
              <Input
                :id="`confirmPassword`"
                v-model:value="confirmPassword"
                v-model:error="errors.confirmPassword"
                :type="`password`"
                :required="true"
                :header="`Confirm Password`"
                :class="`mx-5 lg:mx-0`"
                :placeholder="`Confirm Password`"
              />
            </div>
          </div>
          <!-- footer -->
          <div className="mx-5 lg:mx-0 space-y-5">
            <!-- submit -->
            <button
              type="submit"
              class="w-full rounded bg-blue-600 p-2 font-semibold uppercase text-white transition-transform hover:-translate-y-[2px] focus:outline-none focus:ring-0 dark:bg-blue-600"
            >
              <SpinnerIcon v-if="loading" class="h-5 w-auto" />
              <span v-else>Signup</span>
            </button>
            <!-- Don't have an account? -->
            <div class="text-center">
              Already have an account?
              <NuxtLink to="/login" class="cursor-pointer text-blue-500 hover:text-blue-400"
                >Login</NuxtLink
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
