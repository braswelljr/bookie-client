<script setup lang="ts">
import Github from '@/components/icons/GithubIcon.vue'
import useToast from '~/store/useToast'

const points = [
  {
    title: 'Organize Your Tasks',
    description: 'Easily categorize and prioritize your tasks to stay on top of your to-do list.'
  },
  {
    title: 'Stay Focused',
    description: 'Focus on the task at hand and get things done without distractions.'
  },
  {
    title: 'Get More Done',
    description: 'Get more done in less time with a simple and intuitive interface.'
  },
  {
    title: 'Stay Organized',
    description: 'Stay organized and keep track of your tasks with ease.'
  }
]

const { addToast } = useToast()

// add toast
</script>

<template>
  <main class="relative min-h-screen w-full bg-zinc-100 dark:bg-zinc-900">
    <!-- Main -->
    <div class="min-h-[90vh] pt-10 sm:pt-14 md:pt-20">
      <div class="mx-auto w-full max-w-3xl space-y-14 max-lg:px-5 max-sm:space-y-10">
        <!-- Header -->
        <header class="">
          <h1 class="mx-auto w-auto">
            <span class="sr-only">Bookie</span>
            <img class="mx-auto h-16 w-auto" src="@/assets/images/task.png" alt="task icon" />
          </h1>
        </header>

        <!-- Body -->
        <div class="">
          <!-- List -->
          <div class="grid w-full gap-5 md:grid-cols-2">
            <div
              v-for="(point, i) in points"
              :key="i"
              :class="`relative min-h-[7.5rem] w-full transform bg-zinc-800/25 px-4 py-4 transition duration-100 ease-in-out hover:translate-y-[-0.15rem] max-sm:px-2 max-sm:py-2`"
            >
              <h2 class="text-xl font-bold text-neutral-900 dark:text-white max-xs:text-base">
                {{ point.title }}
              </h2>
              <p class="text-neutral-600 dark:text-neutral-400 max-xs:text-sm">
                {{ point.description }}
              </p>
            </div>
          </div>
          <!-- Link -->
          <div class="my-6 space-x-2">
            <NuxtLink
              to="/login"
              class="bg-blue-600 px-5 py-2.5 text-center text-neutral-900 transition duration-100 ease-in-out hover:bg-blue-700 dark:text-white"
            >
              Get Started
            </NuxtLink>

            <button
              class="bg-red-600 px-5 py-2.5 text-center text-neutral-900 transition duration-100 ease-in-out hover:bg-red-700 dark:text-white"
              @click="
                addToast({
                  id: '',
                  variant: 'error',
                  title: 'Welcome to Bookie!',
                  description: 'Bookie is a simple and intuitive task management app.',
                  actions: ['Get Started', 'Learn More']
                })
              "
            >
              Add Toast
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <footer>
      <div class="mx-auto flex max-w-3xl justify-between py-3 max-lg:px-5">
        <!-- logos -->
        <div class="">
          <!-- github link icon -->
          <a
            href="https://github.com/braswelljr/bookie-client"
            rel="noopener noreferrer"
            target="_blank"
            class="text-neutral-900 dark:text-white"
          >
            <Github class="h-10 w-auto" />
          </a>
        </div>
        <!-- copyright -->
        <div class="">
          <h6 class="gradient-text px-1 text-2xl font-bold uppercase">
            &copy; <span class="max-xs:hidden">{{ new Date().getFullYear() }}</span> Bookie
          </h6>
        </div>
      </div>
    </footer>
  </main>
</template>
