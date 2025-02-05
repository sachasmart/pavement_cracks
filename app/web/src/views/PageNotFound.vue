<template>
  <AppPage>
    <VCard class="mx-auto ma-10 pa-8" max-width="600px">
      <LayoutStack align-items="center">
        <VImg alt="Page Not Found" contain :src="notFound" width="100" />
        <TypographyHeading>Whoops!</TypographyHeading>
        <iframe
          allowFullScreen
          class="giphy-embed"
          frameBorder="0"
          height="222"
          src="https://giphy.com/embed/xUPGcvrXl7RBEp3zC8"
          width="240"
        />
        <p class="not-found__text">This page you have requested could not be found.</p>
        <VBtn class="mt-8" color="primary" :prepend-icon="mdiHome" size="large" to="/" />
      </LayoutStack>
    </VCard>
  </AppPage>
</template>

<script lang="ts" setup>
import { mdiHome } from '@mdi/js'

import TypographyHeading from '@components/typography/TypographyHeading.vue'

const notFound = new URL('/src/assets/logo-primary-colour.svg', import.meta.url).href
</script>

<style lang="scss" scoped>
.giphy-embed {
  border-radius: 5%;
}
</style>
