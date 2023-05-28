<script setup lang="ts">
import Github from '@/components/icons/GithubIcon.vue'
import ThemeSwitch from '~/components/ThemeSwitch.vue'

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
              :class="`relative w-full transform px-4 py-4 transition duration-100 ease-in-out hover:translate-y-[-0.15rem] max-sm:px-2 max-sm:py-2 md:bg-blue-100 md:dark:bg-blue-600`"
            >
              <h2 class="text-xl font-bold text-zinc-950 dark:text-white max-xs:text-base">
                {{ point.title }}
              </h2>
              <p class="text-zinc-700 dark:text-zinc-300 max-xs:text-sm">
                {{ point.description }}
              </p>
            </div>
          </div>
          <!-- Link -->
          <div class="my-6 space-x-2">
            <NuxtLink
              to="/login"
              class="bg-blue-600 px-5 py-2.5 text-center text-white transition duration-100 ease-in-out hover:bg-blue-700"
            >
              Get Started
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <footer>
      <div class="mx-auto max-w-3xl py-3 max-lg:px-5">
        <!-- logos -->
        <div class="flex items-center justify-between">
          <!-- github link icon -->
          <a
            href="https://github.com/braswelljr/bookie-client"
            rel="noopener noreferrer"
            target="_blank"
            class="inline-flex items-center space-x-2 text-neutral-900 dark:text-white"
          >
            <Github class="h-7 w-auto" />
            <span>Source code</span>
          </a>
          <!-- copyright -->
          <div class="">
            <h6 class="gradient-text px-1 font-bold uppercase">
              &copy; <span class="max-xs:hidden">{{ new Date().getFullYear() }}</span> Bookie
            </h6>
          </div>
        </div>
        <!-- theme switch -->
        <div class="mt-4 flex justify-end">
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  </main>
</template>
