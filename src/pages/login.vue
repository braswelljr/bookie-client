<script setup lang="ts">
import ChevronLeftIcon from '~/components/icons/ChevronLeftIcon.vue'
import SpinnerIcon from '~/components/icons/SpinnerIcon.vue'
import Input from '~/components/Input.vue'
import { baseApiUrl, bcookies } from '~/config/constants'
import flattenArray from '~/utils/flattenArray'
import mapNonFalsyValuesToObject from '~/utils/mapNonFalsyValues'
import { AuthenticationPayload, ErrorCause } from '~~/types'
import useToast from '~/store/useToast'

const router = useRouter()
const { addToast } = useToast()

const loading = ref(false)

// form state
const data = ref<{
  email: { value: string; required: boolean; error?: { message: string }[] }
  password: { value: string; required: boolean; error?: { message: string }[] }
}>({
  email: { value: '', required: true, error: undefined },
  password: { value: '', required: true, error: undefined }
})

// validate email
watch(
  () => data.value.email.value,
  email => {
    if (email && !email.match(/^(?!:\/\/)([^\s@]+@[^\s@]+\.)+[^\s@]{2,}$/)) {
      data.value.email.error = [
        {
          message: 'Enter a valid Email Address'
        }
      ]
    } else data.value.email.error = undefined
  }
)

// validate password
watch(
  () => data.value.password.value,
  password => {
    if (password) {
      data.value.password.error = undefined

      // check for length of password
      if (password.length < 8)
        data.value.password.error = [{ message: 'Password must be at least 8 characters' }]

      // check for spaces in password
      if (password.match(/\s/))
        data.value.password.error = [
          ...(data.value.password.error || []),
          { message: 'Password must not contain any spaces' }
        ]
    } else data.value.password.error = undefined
  }
)

// prevent submission if there are errors
watch(
  () => data.value,
  d => {
    const errors = flattenArray(
      Object.entries(d).map(([key, { value, required, error }]) => {
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

    if (errors.length > 0) {
      loading.value = false
    }
  },
  { deep: true }
)

const onSubmit = async (e: Event) => {
  // change loading state
  loading.value = true
  // prevent default during submision
  e.preventDefault()
  // loop and map all errors into onto
  const errors = flattenArray(
    Object.entries(data.value).map(([key, { value, required, error }]) => {
      let all: string[] = []
      if (error && error.length > 0) {
        all = [...all, ...error.map(v => v.message)]
      }

      if (value.trim().length < 1 && required) {
        all = [...all, `Value of ${key} should not be empty.`]
      }

      return all
    })
  )

  // check for errors and
  if (errors.length > 0) {
    // change loading state and return
    loading.value = false

    // toast error message for authentication failure
    addToast({
      variant: 'error',
      title: 'Authentication Error',
      description: `They are required fields are have Invalid values or are empty.`
    })

    return
  }

  // map all data key value.value into a new object
  const values = Object.entries(data.value).reduce((acc, [key, value]) => {
    acc[key] = value.value
    return acc
  }, {} as Record<string, string>)

  // map and add the non-empty fields into a new object
  const payload = mapNonFalsyValuesToObject(values)

  try {
    const response = await fetch(`${baseApiUrl}/login`, {
      method: 'POST',
      headers: {
        mode: 'cors',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Basic ${btoa(`${payload.email}:${payload.password}`)}`
      }
    })

    // check if response is not ok throw error
    if (!response.ok) throw new Error("Couldn't login user", { cause: { response } })

    // get data from response
    const data: AuthenticationPayload = await response.json()

    // check if data.payload is not empty
    if (!data.payload || !data.token) throw new Error(data.message, { cause: { data } })

    // get cookie
    const cookie = useCookie(bcookies.authentication.name, bcookies.authentication.options)

    // set cookie
    cookie.value = JSON.stringify({ token: data.token, user: data.payload })

    // toast
    addToast({
      variant: 'success',
      title: 'Authentication Successful',
      description: 'Successfully logged in.'
    })

    // redirect to home
    router.push('/dashboard')
  } catch (error) {
    let err: ErrorCause
    if (error instanceof Error) err = error as ErrorCause
    else err = new Error("Couldn't Signup User", { cause: { error } }) as ErrorCause

    switch (err.cause?.res?.status) {
      case 500:
        addToast({
          variant: 'error',
          title: 'Authentication Error',
          description: 'Something went wrong. Please try again later.'
        })
        break

      case 401:
        addToast({
          variant: 'error',
          title: 'Authentication Error',
          description: 'Invalid email or password.'
        })
        break

      case 400:
        addToast({
          variant: 'error',
          title: 'Authentication Error',
          description: 'Invalid email or password.'
        })
        break

      default:
        console.log(err)
        addToast({
          variant: 'error',
          title: 'Authentication Error',
          description: err.message
        })
        break
    }
  } finally {
    // change loading state
    loading.value = false
  }
}
</script>

<template>
  <main class="w-full">
    <!-- Back Button -->
    <NuxtLink
      to="/"
      class="fixed left-4 top-4 z-10 flex items-center space-x-2 bg-blue-600 py-1.5 pl-1 pr-3 uppercase text-white hover:bg-blue-700 max-sm:h-10 max-sm:w-10 max-sm:justify-center"
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
          <div class="mx-5 space-y-5 lg:mx-0">
            <!-- submit -->
            <button
              type="submit"
              class="inline-flex w-full justify-center rounded bg-blue-600 p-2 font-semibold uppercase text-white transition-transform hover:-translate-y-[2px] focus:outline-none focus:ring-0 dark:bg-blue-600"
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
