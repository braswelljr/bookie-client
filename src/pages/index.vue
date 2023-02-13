<script setup lang="ts">
import Github from '@/assets/icons/GithubIcon.vue'

const points = ref([
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
])
</script>

<template>
  <main class="min-h-screen bg-zinc-100 dark:bg-zinc-900">
    <div class="grid min-h-[90vh] place-content-center">
      <div class="max-w-5xl">
        <!-- Header -->
        <h1 class="">
          <span class="sr-only"> Bookie </span>
          <img class="h-16 w-auto" src="@/assets/images/task.png" alt="task icon" />
        </h1>

        <!-- Body -->
        <div class="">
          <div v-for="(point, i) in points" :key="i" class="">
            <div class="">
              <h2 class="text-3xl font-bold text-neutral-900 dark:text-white">
                {{ point.title }}
              </h2>
              <p class="text-neutral-600 dark:text-neutral-400">
                {{ point.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <footer>
      <div class="mx-auto flex max-w-5xl justify-between px-4 py-3">
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
