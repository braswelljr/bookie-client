<script setup lang="ts">
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
</script>

<template>
  <main class="mx-auto w-full max-w-3xl max-lg:px-5">
    <!-- Back Button -->
    <NuxtLink
      to="/"
      class="fixed top-4 left-4 flex items-center space-x-2 bg-blue-600 py-1.5 pr-3 pl-1 uppercase hover:bg-blue-700 dark:text-white max-sm:h-10 max-sm:w-10 max-sm:justify-center"
    >
      <ChevronLeftIcon class="h-4 w-auto max-sm:-mr-2 max-sm:h-6" />
      <span class="max-sm:hidden">Back</span>
    </NuxtLink>
    <!-- Main -->
    <div class="flex min-h-screen flex-col items-center max-sm:pt-20 sm:justify-center">
      <div class="flex w-auto items-center justify-center">
        <!-- header -->
        <header class="">
          <h1 class="mx-auto w-auto">
            <span class="sr-only"> Bookie </span>
            <img
              class="mx-auto h-16 w-auto max-sm:h-12"
              src="@/assets/images/task.png"
              alt="task icon"
            />
          </h1>
        </header>
        <!-- body -->
        <div class="">
          <form onsubmit="">
            <!-- email -->
            <div class=""></div>
            <!-- password -->
            <div class=""></div>
            <!-- submit -->
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
