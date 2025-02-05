<template>
  <component :is="is" :class="classes">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import {computed} from "vue";

type TypographyTitleProps = {
  type?: 1 | 2 | 3;
  textColor?: string;
  is?: string;
};

const props = withDefaults(defineProps<TypographyTitleProps>(), {
  type: 1,
  textColor: "text-gray-900",
  is: "p",
});

const classes = computed(() => ({
  [`${props.textColor}`]: true,
  "not-italic": true,
  "font-semibold": true,
  "font-poppins": true,
  "text-base": props.type == 1,
  "text-sm": props.type == 2,
  "text-xs": props.type == 3,
}));
</script>
