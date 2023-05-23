<script setup lang="ts">
import ChevronLeftIcon from '~/components/icons/ChevronLeftIcon.vue'
import SpinnerIcon from '~/components/icons/SpinnerIcon.vue'
import Input from '~/components/Input.vue'
import { baseApiUrl } from '~/config/constants'
import flattenArray from '~/utils/flattenArray'
import mapNonFalsyValuesToObject from '~/utils/mapNonFalsyValues'
import { ErrorCause } from '~~/types'

let loading = $ref(false)

// form state
const data = $ref<{
  firstname: { value: string; required: boolean; error?: { message: string }[] }
  lastname: { value: string; required: boolean; error?: { message: string }[] }
  othernames: { value: string; required: boolean; error?: { message: string }[] }
  username: { value: string; required: boolean; error?: { message: string }[] }
  dateOfBirth: { value: string; required: boolean; error?: { message: string }[] }
  email: { value: string; required: boolean; error?: { message: string }[] }
  phone: { value: string; required: boolean; error?: { message: string }[] }
  password: { value: string; required: boolean; error?: { message: string }[] }
  confirmPassword: { value: string; required: boolean; error?: { message: string }[] }
}>({
  firstname: { value: '', required: true, error: undefined },
  lastname: { value: '', required: true, error: undefined },
  othernames: { value: '', required: false, error: undefined },
  username: { value: '', required: true, error: undefined },
  dateOfBirth: { value: '', required: true, error: undefined },
  email: { value: '', required: true, error: undefined },
  phone: { value: '', required: true, error: undefined },
  password: { value: '', required: true, error: undefined },
  confirmPassword: { value: '', required: true, error: undefined }
})

// validate firstname
watch(
  () => data.firstname.value,
  firstname => {
    if (firstname && firstname.trim().length < 1)
      data.firstname.error = [{ message: 'Firstname must not be empty' }]
    else data.firstname.error = undefined
  }
)

// validate lastname
watch(
  () => data.lastname.value,
  lastname => {
    if (lastname && lastname.trim().length < 1)
      data.lastname.error = [{ message: 'Lastname must not be empty' }]
    else data.lastname.error = undefined
  }
)

// validate username
watch(
  () => data.username.value,
  username => {
    if (username && username.trim().length < 1)
      data.username.error = [{ message: 'Username must not be empty' }]
    else data.username.error = undefined
  }
)

// validate date of birth
watch(
  () => data.dateOfBirth.value,
  dateOfBirth => {
    if (dateOfBirth && dateOfBirth.trim().length < 1)
      data.dateOfBirth.error = [{ message: 'Date of Birth must not be empty' }]
    else data.dateOfBirth.error = undefined
  }
)

// validate email
watch(
  () => data.email.value,
  email => {
    if (email) {
      data.email.error = undefined

      // check for the length of the username part(email)
      if (email.split('@')[0].length < 1)
        data.email.error = [{ message: 'Email must not be empty' }]

      // check if the email has an @ symbol
      if (!email.includes('@'))
        data.email.error = [
          ...(data.email.error || []),
          { message: 'Email must contain an @ symbol' }
        ]

      // check for tld (top level domain) after the @ symbol
      const domain = email.split('@')[1] || undefined
      // /^(?!:\/\/)([a-z0-9]+(-[a-z0-9]+)*\.)+[a-a-zA-Z]{2,}$/i.test(domain)
      if (domain) {
        // check if the email has a domain
        if (!domain.includes('.')) {
          data.email.error = [...(data.email.error || []), { message: 'Email must contain a .' }]
        }

        // check if the domain has a tld (top level domain)
        const tld = domain.split('.')[1] || undefined
        if (!tld || !/^[a-zA-Z]{2,}$/.test(tld)) {
          data.email.error = [
            ...(data.email.error || []),
            { message: 'Email must contain a valid TLD eg. .com, .co, .org, ' }
          ]
        }

        // check if the domain has a subdomain
        const subdomain = domain.split('.')[0] || undefined
        if (!subdomain || !/^[a-zA-Z0-9-]+$/.test(subdomain)) {
          data.email.error = [
            ...(data.email.error || []),
            { message: 'Email must contain a valid subdomain eg. example in example.com' }
          ]
        }
      } else {
        data.email.error = [
          ...(data.email.error || []),
          { message: 'Email must contain a domain ie. example.com' }
        ]
      }
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
        data.password.error = [
          ...(data.password.error || []),
          { message: 'Password must be at least 8 characters' }
        ]

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

// watch confirm password
watch(
  () => data.confirmPassword.value,
  confirmPassword => {
    if (confirmPassword && confirmPassword !== data.password.value)
      data.confirmPassword.error = [{ message: 'Passwords do not match' }]
    else data.confirmPassword.error = undefined
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
    const response = await fetch(`${baseApiUrl}/signup`, {
      method: 'POST',
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(payload)
    })

    // check if response is not ok throw error
    if (!response.ok) throw new Error("Couldn't Signup User", { cause: { response } })
  } catch (error) {
    let err: ErrorCause
    if (error instanceof Error) err = error as ErrorCause
    else err = new Error("Couldn't Signup User", { cause: { error } }) as ErrorCause

    switch (err.cause?.res?.status) {
      default:
        console.log(err)
        break
    }
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
      <div class="h-auto w-full pb-12 pt-14 md:pt-20">
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
          @submit="onSubmit"
        >
          <!-- Names -->
          <div class="">
            <!-- header -->
            <h2 class="mx-5 text-xl font-bold uppercase tracking-wider lg:mx-0">Names</h2>
            <!-- fields -->
            <div class="grid gap-x-6 gap-y-11 lg:grid-cols-2">
              <Input
                :id="`firstname`"
                v-model:value="data.firstname.value"
                v-model:error="data.firstname.error"
                :type="`text`"
                :required="data.firstname.required"
                :header="`Firstname`"
                :class="`mx-5 lg:mx-0`"
                :placeholder="`Firstname`"
              />
              <Input
                :id="`lastname`"
                v-model:value="data.lastname.value"
                v-model:error="data.lastname.error"
                :type="`text`"
                :required="data.lastname.required"
                :header="`Lastname`"
                :class="`mx-5 lg:mx-0`"
                :placeholder="`Lastname`"
              />
              <Input
                :id="`othernames`"
                v-model:value="data.othernames.value"
                v-model:error="data.othernames.error"
                :type="`text`"
                :required="data.othernames.required"
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
            <div class="grid gap-x-6 gap-y-11 lg:grid-cols-2">
              <!-- phone -->
              <Input
                :id="`phone`"
                v-model:value="data.phone.value"
                v-model:error="data.phone.error"
                :type="`text`"
                :required="data.phone.required"
                :header="`Phone`"
                :class="`mx-5 lg:mx-0`"
                :placeholder="`Phone`"
              />
              <!-- dateOfBirth -->
              <Input
                :id="`dateOfBirth`"
                v-model:value="data.dateOfBirth.value"
                v-model:error="data.dateOfBirth.error"
                :type="`date`"
                :required="data.dateOfBirth.required"
                :header="`Date of Birth`"
                :class="`mx-5 lg:mx-0`"
                :placeholder="`Date of Birth`"
              />
            </div>
          </div>

          <!-- Account Details -->
          <div class="">
            <!-- header -->
            <h2 class="mx-5 text-xl font-bold uppercase tracking-wider lg:mx-0">Account Detals</h2>
            <!-- fields -->
            <div class="grid gap-x-6 gap-y-11 lg:grid-cols-2">
              <!-- username -->
              <Input
                :id="`username`"
                v-model:value="data.username.value"
                v-model:error="data.username.error"
                :type="`text`"
                :required="data.username.required"
                :header="`Username`"
                :class="`mx-5 lg:mx-0`"
                :placeholder="`Username`"
              />
              <!-- email -->
              <Input
                :id="`email`"
                v-model:value="data.email.value"
                v-model:error="data.email.error"
                :type="`email`"
                :required="data.email.required"
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
            <div class="grid gap-x-6 gap-y-11 lg:grid-cols-2">
              <!-- password -->
              <Input
                :id="`password`"
                v-model:value="data.password.value"
                v-model:error="data.password.error"
                :type="`password`"
                :required="data.password.required"
                :header="`Password`"
                :class="`mx-5 lg:mx-0`"
                :placeholder="`Password`"
              />
              <!-- confirm password -->
              <Input
                :id="`confirmPassword`"
                v-model:value="data.confirmPassword.value"
                v-model:error="data.confirmPassword.error"
                :type="`password`"
                :required="data.confirmPassword.required"
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
