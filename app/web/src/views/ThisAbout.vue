<template>
  <TextBody>
    <VList density="compact">
      <VListItem
        v-for="item in items"
        :key="item.title"
        @click="openLink(item.link)"
        link
        :style="{ maxWidth: '300px', whiteSpace: 'normal' }"
        class="hover-expand"
      >
        <VListItemTitle>{{ item.title }}</VListItemTitle>
        <VListItemSubtitle>{{ item.subtitle }}</VListItemSubtitle>
        <template v-slot:prepend>
          <VIcon :icon="item.icon"></VIcon>
        </template>
      </VListItem>
    </VList>
  </TextBody>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { mdiInformationOutline, mdiGithub } from '@mdi/js'

const openLink = (link: string) => {
  window.open(link, '_blank')
}

const items = ref([
  {
    icon: mdiInformationOutline,
    title: 'About',
    subtitle: 'Related blog post.',
    text: '',
    link: 'https://blog.sachasmart.com/pavement-cracks',
  },
  {
    icon: mdiGithub,
    title: 'View Source',
    link: 'https://github.com/sachasmart/pavement_cracks',
  },
])
</script>

<style scoped>
.hover-expand {
  transition: transform 0.3s ease;
}
.hover-expand:hover {
  transform: scale(1.05);
}
</style>
