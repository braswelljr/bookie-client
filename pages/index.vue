<script setup lang="ts"></script>

<template>
  <main class="min-h-screen bg-zinc-100 dark:bg-zinc-900">
    <div class="grid min-h-[90vh] place-content-center">
      <div class="max-w-5xl">
        <!-- Header -->
        <h1 class="">
          <span class="sr-only"> Bookie </span>
          <img class="h-16 w-auto" src="@/assets/images/task.png" alt="task icon" />
        </h1>
      </div>
    </div>
    <!-- footer -->
    <footer>
      <div class="mx-auto flex max-w-7xl justify-between px-4 py-3">
        <!-- logos -->

        <div class=""></div>
        <!-- copyright -->
        <div class="">
          <h6 class="gradient-text px-1 text-2xl font-bold uppercase">
            &copy; {{ new Date().getFullYear() }} Bookie
          </h6>
        </div>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(90deg, #005eff 0%, #f6d365 40%, #fda085 20%, #7740bf 100%);
  background-size: 400% 400%;
  background-clip: text;
  color: transparent;
  animation: gradient 10s cubic-bezier(0.165, 0.84, 0.44, 1) 5s infinite alternate both;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>
