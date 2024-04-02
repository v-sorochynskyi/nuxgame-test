<template>
  <header class="h-[60px] bg-dark-grey flex-none" />
  <main class="bg-davys-grey flex-auto overflow-hidden">
    <RouterView />
  </main>
  <footer class="h-[60px] md:h-[270px] bg-dark-grey flex-none" />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>
