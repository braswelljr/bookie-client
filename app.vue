<script setup>
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  charset: 'utf-8',
  title: 'Bookie',
  titleTemplate: title => (title !== 'Bookie' ? `${title} · Bookie` : title),
  meta: [{ name: 'description', content: 'Bookie is a task manager.' }],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/task.png'
    }
  ]
})
</script>

<template>
  <div class="bg-white min-h-screen text-black dark:bg-black dark:text-white">
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
