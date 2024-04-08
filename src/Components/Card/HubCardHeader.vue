<script setup lang="ts">
  defineSlots<{
    handler(props: {}): any,
    image(props: {}): any,
    title(props: {}): any,
    subtitle(props: {}): any,
    actions(props: {}): any,
  }>();
</script>
<template>
  <div class="card-header">
    <div class="handler" v-if="$slots.handler">
      <slot name="handler" />
    </div>
    <div class="image" v-if="$slots.image">
      <slot name="image" />
    </div>
    <div class="header">
      <div class="title" v-if="$slots.title">
        <slot name="title" />
      </div>
      <div class="subtitle" v-if="$slots.subtitle">
        <slot name="subtitle" />
      </div>
    </div>
    <div class="actions" v-if="$slots.actions">
      <slot name="actions" />
    </div>
  </div>
</template>
<style scoped lang="scss">
  .card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--size12);
    width: 100%;
    min-width: 0;
    height: 42px;

    .handler {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 20px;
      width: 20px;
      height: 20px;

      :deep(.icon) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        font-size: 12px;
        line-height: 20px;
      }
    }

    .image {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 0 0 42px;
      width: 42px;
      height: 42px;

      img {
        width: 42px;
        height: 42px;
        object-fit: contain;
        object-position: center;
      }

      :deep(.icon) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        font-size: 32px;
        line-height: 32px;
      }
    }

    .header {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: var(--size2);
      min-width: 0;

      .title {
        color: var(--card-theme-title);
        font-weight: var(--fontWeightBold);
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        :deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5), :deep(h6) {
          font-weight: var(--fontWeightBold);
          font-size: 14px;
        }
      }

      .subtitle {
        color: var(--card-theme-subtitle);
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .actions {
      flex: 0 1 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .card.horizontal {
    .card-header {
      flex: 1 1 100%;
      min-width: 0;
    }
  }
</style>
