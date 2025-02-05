<template>
  <component :is="is" :class="classes">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import {computed} from "vue";
type TypographyHeadingProps = {
  type?: 1 | 2;
  textColor?: string;
  is?: string;
};

const props = withDefaults(defineProps<TypographyHeadingProps>(), {
  type: 1,
  textColor: "text-gray-900",
  is: "h1",
});

const classes = computed(() => ({
  [`${props.textColor}`]: true,
  "font-bold": true,
  "font-urbanist": true,
  "text-2xl": props.type == 2,
  "text-4xl": props.type == 1,
}));
</script>
