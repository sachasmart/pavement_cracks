<template>
  <VApp class="app">
    <!-- <RouterView v-if="!loadingApp" /> -->
    <div class="pa-4">
      <ThisPavementCracks />
      <div class="my-4" />
      <VCard> About section here </VCard>
    </div>
  </VApp>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ThisPavementCracks } from './views'
/**
 * Whether app data is loading (authentication, etc)
 *
 * NOTE: Must start 'true' to avoid double mounting components!
 * NOTE: Should only be changed after any potential route validation redirects have happened, to ensure
 *         the `RouterView` (and corresponding component) is not mounted with for invalid routes!
 */
const loadingApp = ref(true)

onMounted(async () => {
  loadingApp.value = true
})
</script>

<style lang="scss">
.v-btn {
  border-radius: 2px !important;
}

.app {
  flex-grow: 1;
  min-height: 100vh;
}

.app__loader {
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
