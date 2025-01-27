<template>
  <VApp class="app">
    <RouterView v-if="!loadingApp" />
    <LayoutStack v-else class="app__loader">
      <VProgressCircular color="primary" indeterminate size="80" />
    </LayoutStack>
  </VApp>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
</style>

<style lang="scss" scoped>
.app {
  flex-grow: 1;
  min-height: 100vh;
}

.app__loader {
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}
</style>
