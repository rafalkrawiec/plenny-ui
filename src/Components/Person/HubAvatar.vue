<script setup lang="ts">
  import type { PropType } from 'vue';
  import { computed } from 'vue';
  import { useComponentSize, SizeProps } from '../../Composables/UseComponentSize';

  const props = defineProps({
    initials: { type: String as PropType<string>, required: false },
    avatar: { type: String as PropType<string>, required: false },
    state: { type: String as PropType<string>, required: false },
    color: { type: String as PropType<string>, required: false },
    guest: { type: Boolean as PropType<boolean>, required: false, default: false },
    square: { type: Boolean as PropType<boolean>, required: false, default: false },
    ...SizeProps,
  });

  const { size } = useComponentSize(props);

  const foreground = computed(() => props.color ? `color-${props.color}` : null);
  const background = computed(() => props.color ? `bg-${props.color}` : null);
</script>
<template>
  <div class="avatar" :class="[ foreground, background, { ...size } ]">
    <template v-if="guest">
      <span class="icon person-regular" />
    </template>
    <template v-else>
      <img v-if="avatar" :src="`/photos/128x128/${avatar}`" :alt="initials" />
      <span v-else v-text="initials" />
    </template>
  </div>
</template>
<style scoped lang="scss">
  .avatar {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--themePrimaryBackground);
    color: var(--themePrimaryForeground);
    font-size: 12px;

    &.smaller {
      width: 24px;
      height: 24px;
      font-size: 10px;
      line-height: 10px;
    }

    &.larger {
      width: 42px;
      height: 42px;
      font-size: 14px;
      line-height: 14px;
    }

    &.large {
      width: 128px;
      height: 128px;
      font-size: 28px;
      line-height: 28px;
    }

    &.square {
      border-radius: 4px;

      img {
        border-radius: 4px;
      }
    }

    .icon {
      width: 20px;
      height: 20px;
      font-size: 20px;
      line-height: 20px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 50%;
    }
  }
</style>
