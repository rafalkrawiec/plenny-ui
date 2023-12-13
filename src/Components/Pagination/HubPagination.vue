<script setup lang="ts">
  import type { PropType } from 'vue';
  import type { Paginator } from '../../Composables/UsePaginator';

  const props = defineProps({
    paginator: { type: Object as PropType<Paginator>, required: true },
  });

  const { current, from, to, count, hasPages, onFirstPage, onLastPage, links, prev, next, go } = props.paginator;
</script>
<template>
  <nav v-if="hasPages" class="pagination" role="navigation">
    <p v-html="$t('Wyświetlanie <b>:from</b> do <b>:to</b> z <b>:count</b> wyników', { from, to, count })"/>
    <div class="pagination-buttons">
      <button type="button" @click="prev()" :disabled="onFirstPage">
        <span class="icon chevron-left-filled"/>
      </button>

      <template v-for="page in links">
        <template v-if="typeof page === 'number'">
          <button class="page" :class="{ 'active': current === page }" type="button" @click="go(page)">
            {{ page }}
          </button>
        </template>
        <template v-else>
          <button type="button">
            ...
          </button>
        </template>
      </template>

      <button type="button" @click="next()" :disabled="onLastPage">
        <span class="icon chevron-right-filled"/>
      </button>
    </div>
  </nav>
</template>
<style scoped lang="scss">
  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 32px;
    margin-bottom: 32px;

    p {
      font-size: 12px;
      line-height: 32px;
    }

    .pagination-buttons {
      display: flex;
      box-shadow: var(--v-btn-box-shadow);
      border-radius: 4px;

      button {
        position: relative;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        background: var(--themeNeutralLightBackground);
        color: var(--themeNeutralAltForeground);
        border-top: 2px solid transparent;
        border-bottom: 2px solid transparent;
        border-radius: 0;
        border-left-width: 0;
        border-right-width: 0;
        font-size: 12px;
        font-weight: var(--fontWeightSemi);
        cursor: pointer;
        outline: none;

        &:hover, &:focus {
          color: var(--themeBlack);
        }

        &:disabled {
          color: rgba(0, 0, 0, 0.15);
          cursor: not-allowed;
        }

        &:first-child {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }

        &:last-child {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }

        &.page {
          &:after {
            position: absolute;
            left: 50%;
            right: 50%;
            bottom: 1px;
            content: "";
            height: 2px;
            border-radius: 2px;
            background: var(--themePrimaryBackground);
            transition-timing-function: cubic-bezier(0, 0, .2, 1);
            transition-duration: 200ms;
            transition-property: left, right;
          }

          &:hover, &:focus, &.active {
            color: var(--themeBlack);

            &:after {
              left: 2px;
              right: 2px;
            }
          }
        }
      }
    }
  }
</style>
