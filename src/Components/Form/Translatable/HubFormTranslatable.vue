<script setup lang="ts">
  import { ref, computed, type PropType } from 'vue';

  const props = defineProps({
    inline: { type: Boolean as PropType<boolean>, required: false, default: false },
    current: { type: String as PropType<string>, required: false, default: __i18n_fallback },
  });

  const locales = ref(__i18n_available);

  const defaultLocale = computed(() => {
    return locales.value.find(locale => locale.code === props.current);
  });

  const columns = computed(() => {
    return `--languages: ${locales.value.length}`;
  });

  const options = computed(() => {
    return locales.value.map((locale) => ({
      label: locale.name,
      value: locale.code,
    }));
  });

  const open = ref(false);
</script>
<template>
  <template v-if="!inline">
    <div class="translatable-group">

      <HubButtonGroup>
        <HubButton before="translate-regular" small @click="open = true">
          {{ $t('Tłumaczenia') }}
        </HubButton>
      </HubButtonGroup>

      <slot v-bind="defaultLocale" />

      <HubDialog larger v-model:open="open">
        <HubToolbar>
          <h1>Wprowadź tłumaczenia</h1>
        </HubToolbar>
        <div class="translation-grid" v-bind:style="columns">
          <template v-for="locale in locales" :key="locale.code">
            <div class="translation-grid-col">
              <h2>{{ locale.name }}</h2>
              <slot v-bind="locale" />
            </div>
          </template>
        </div>
        <HubToolbar>
          <HubButtonGroup>
            <HubButton @click="open = false">
              Zamknij
            </HubButton>
          </HubButtonGroup>
        </HubToolbar>
      </HubDialog>

    </div>
  </template>
  <template v-else>
    <div class="translation-grid" v-bind:style="columns">
      <template v-for="locale in locales" :key="locale.code">
        <div class="translation-grid-col">
          <h2>{{ locale.name }}</h2>
          <slot v-bind="locale" />
        </div>
      </template>
    </div>
  </template>
</template>
<style scoped lang="scss">
  .translatable-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .translation-grid {
    display: grid;
    grid-template-columns: repeat(var(--languages, 1), minmax(256px, 1fr));
    gap: 16px;

    .translation-grid-col {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }
</style>
