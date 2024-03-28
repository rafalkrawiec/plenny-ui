<script setup lang="ts">
  import { ref, computed, nextTick, type PropType } from 'vue';
  import { onClickOutside, useVirtualList } from '@vueuse/core';
  import { useControl, Control } from '../../../Composables/UseControl';
  import { useFormSelectFloating } from './Composables/UseFormSelectFloating';
  import { useFormSelectFocusTrap } from './Composables/UseFormSelectFocusTrap';
  import { useFocusNavigation } from '../../../Composables/UseFocusNavigation';
  import { trans } from '@plenny/translator';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps({
    ...Control,
    multiple: { type: Boolean as PropType<boolean>, required: false, default: false },
    searchable: { type: Boolean as PropType<boolean>, required: false, default: true },
    clearable: { type: Boolean as PropType<boolean>, required: false, default: true },
    options: { type: [Array, Object] as PropType<Iterable<{ value: any, label: string }>>, required: true, default: [] },
    placeholder: { type: String as PropType<string>, required: false },
    clear: { type: String as PropType<string>, required: false },
  });

  const emit = defineEmits([
    'hide:dataList',
    'update:modelValue',
  ]);

  const htmlWrapper = ref();
  const htmlControl = ref();
  const htmlInput = ref();
  const htmlList = ref();

  const { floatingStyles } = useFormSelectFloating(htmlWrapper, htmlList);
  const { activate, deactivate } = useFormSelectFocusTrap(htmlList);
  const { focusNext, focusPrev } = useFocusNavigation(htmlList);
  const { control, input, model } = useControl({ props, emit });

  onClickOutside(htmlList, () => {
    hide();
  });

  const open = ref(false);
  const search = ref('');

  const selected = computed(() => {
    if (model.value != null) {
      if (model.value instanceof Array) {
        return Array.from(props.options).filter((option) => model.value.includes(option.value));
      } else {
        return Array.from(props.options).filter((option) => option.value === model.value);
      }
    } else {
      return [];
    }
  });

  const filtered = computed(() => {
    let options = [...props.options];

    if (!props.multiple && !props.required && props.clearable) {
      options = [
        { label: props.clear || trans('Wyczyść wartość'), value: null },
        ...options,
      ];
    }

    if (search.value != null && search.value !== '') {
      const searchBy = String(search.value).toLowerCase();

      return options.filter((option) => {
        return (
          String(option.label).toLowerCase().includes(searchBy) ||
          String(option.value).toLowerCase().includes(searchBy)
        );
      });
    }

    return options;
  });

  const { list, containerProps, wrapperProps } = useVirtualList(filtered, {
    itemHeight: 32,
  });

  const hide = () => {
    deactivate();

    open.value = false;
    search.value = '';

    emit('hide:dataList');
  };

  const show = () => {
    open.value = true;
    search.value = '';

    nextTick(() => {
      activate();
    });
  };

  function select(value: any) {
    if (props.multiple) {
      if (model.value instanceof Array) {
        if (model.value.includes(value)) {
          model.value = model.value.filter((v) => v !== value);
        } else {
          model.value = [...model.value, value];
        }
      } else {
        if (value === null || value === undefined || value === '') {
          model.value = [];
        } else {
          model.value = [value];
        }
      }
    } else {
      model.value = value;
      hide();
    }

    // Add native event when value is changed.
    // This will allow to react on changes in certain situations.
    nextTick(() => {
      htmlInput.value.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  const computeOptionClasses = (option: { label: string, value: any }) => ({
    'selected': (
      props.multiple
        ? model.value?.includes(option.value)
        : model.value === option.value
    ),
  });

  const selectedClasses = computed(() => ({
    'selected': selected.value.length > 1,
    'disabled': selected.value.length < 1,
  }));

  const selectedText = computed(() => {
    if (props.multiple) {
      if (selected.value.length > 0) {
        return 'Wybrano: ' + selected.value.length;
      } else {
        return props.placeholder;
      }
    }

    return selected.value[0]?.label || props.placeholder;
  });

  defineExpose({
    focus: () => htmlControl.value?.focus(),
    open: () => show(),
  });
</script>
<template>
  <HubFormControl ref="htmlWrapper" v-bind="control">
    <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
      <slot :name="slot" v-bind="props" />
    </template>
    <template #control>
      <div class="select-wrapper">
        <select ref="htmlInput" v-bind="{ multiple, ...input, ...$attrs }">
          <option v-if="required" value="" disabled>
            {{ placeholder || $t('Wybierz wartość') }}
          </option>
          <option v-for="option in options" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <div ref="htmlControl" class="select-control" @click="show()" @keydown.space.prevent="show()" tabindex="0">
          <span class="select-control-value" :class="selectedClasses" v-text="selectedText || $t('Wybierz wartość')" />
          <span class="select-icon icon chevron-up-down-regular" />
        </div>
        <teleport to="body">
          <transition name="select">
            <div v-if="open" ref="htmlList" class="select-list" tabindex="-1" v-bind:style="floatingStyles" @keydown.esc="hide()" @keydown.down="focusNext()" @keydown.up="focusPrev()">
              <div v-if="searchable" class="select-list-search-container">
                <HubFormInput type="text" placeholder="Szukaj" before="search-regular" v-model="search" />
              </div>
              <!-- @vue-ignore -->
              <div class="select-list-options-container" v-bind="containerProps">
                <template v-if="filtered.length > 0">
                  <div class="select-option-wrapper" v-bind="wrapperProps">
                    <!-- @vue-ignore -->
                    <template v-for="{ data, index } in list" :key="index">
                      <div class="select-option" tabindex="0" :class="computeOptionClasses(data)" @click="select(data.value)" @keydown.enter="select(data.value)" @keydown.space="select(data.value)">
                        <span class="select-option-icon icon checkmark-filled" />
                        <span class="select-option-label" v-text="data.label" />
                      </div>
                    </template>
                  </div>
                </template>
                <template v-if="filtered.length <= 0">
                  <div class="select-option select-option-missing">
                    <span class="select-option-label">
                      {{ $t('Brak opcji do wyboru') }}
                    </span>
                  </div>
                </template>
              </div>
            </div>
          </transition>
        </teleport>
      </div>
    </template>
  </HubFormControl>
</template>
<style scoped lang="scss">
  .select-wrapper {
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    line-height: 20px;

    select {
      position: absolute;
      visibility: hidden;
      width: 0;
      height: 0;
    }

    .select-control {
      flex: 1 1 auto;
      display: flex;
      flex-direction: row;
      gap: 12px;
      cursor: text;

      &:focus {
        outline: none;
      }

      .select-control-value {
        flex: 1 1 auto;
        font-family: var(--fontSans);
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &.disabled {
          color: var(--themeDisabledForeground);
        }
      }

      .select-icon {
        flex: 0 0 14px;
        width: 14px;
        height: 20px;
        font-size: 14px;
      }
    }
  }

  .select-list {
    position: absolute;
    display: flex;
    flex-direction: column;
    background: var(--themeNeutralLightBackground);
    box-shadow: var(--v-shadow-neutral-8);
    border-radius: 4px;
    padding: 4px;
    gap: 4px;
    z-index: 300000;

    .select-list-options-container {
      border-radius: 4px;
      overflow-x: hidden;
      overflow-y: auto;

      .select-option-wrapper {
        display: flex;
        flex-direction: column;
      }
    }

    .select-option {
      flex: 0 0 32px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      height: 32px;
      padding: 5px 8px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      outline: none;
      color: var(--themeNeutralForeground);
      background-color: var(--themeNeutralLightBackground);
      font-size: 12px;
      font-weight: var(--fontWeightSemi);
      border-radius: 4px;

      &:focus {
        color: var(--themeNeutralForegroundFocus);
        background-color: var(--themeNeutralLightBackgroundFocus);
      }

      &:hover {
        cursor: pointer;
        background-color: var(--themeNeutralLightBackgroundHover);
      }

      &.disabled {
        color: var(--themeDisabledForeground);
        pointer-events: none;
      }

      &.selected {
        .select-option-icon {
          visibility: visible;
        }
      }

      &.select-option-missing {
        color: var(--themeNeutralAltForeground);

        .select-option-icon {
          visibility: visible;
        }
      }

      .select-option-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 8px;
        visibility: hidden;
        font-size: 14px;
      }

      .select-option-label {
        white-space: pre;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .select-enter-active,
  .select-leave-active {
    transition-property: opacity;
    transition-timing-function: var(--v-curve-easy-ease);
    transition-duration: var(--v-duration-faster);
  }

  .select-enter-from,
  .select-leave-to {
    opacity: 0;
  }
</style>
