import type { MaybeRef } from 'vue';
import { computed, toRef, ref, watch } from 'vue';

export type PaginatorOptions<T = any> = {
  name: string,
  items: MaybeRef<T[]>,
  perPage: number,
}

export type Paginator = ReturnType<typeof usePaginator>;

export function usePaginator<T = any>(options: PaginatorOptions<T>) {
  const name = toRef(options.name);
  const items = toRef(options.items);
  const perPage = toRef(options.perPage);

  const storageKey = computed(() => 'pagination_' + name.value);

  const pages = computed(() => {
    if (items.value.length === 0) {
      return 1;
    }

    return Math.ceil(items.value.length / perPage.value);
  });

  const current = ref((() => {
    let page = Number(JSON.parse(window.localStorage.getItem(storageKey.value) || '1'));

    if (isNaN(page)) {
      page = 1;
    }

    if (page > pages.value) {
      return pages.value;
    }

    return page;
  })());

  watch(current, (value) => {
    window.localStorage.setItem(storageKey.value, JSON.stringify(value));
  });

  const count = computed(() => items.value.length);
  const start = computed(() => (current.value - 1) * perPage.value);
  const end = computed(() => Math.min(count.value, (start.value + perPage.value)));
  const from = computed(() => ((current.value - 1) * perPage.value) + 1);
  const to = computed(() => Math.min(count.value, (from.value + perPage.value)));

  const elements = computed(() => {
    return items.value.slice(start.value, end.value);
  });

  const links = computed(() => {
    return paginate(current.value, pages.value);
  });

  const hasPages = computed(() => pages.value > 1);
  const onFirstPage = computed(() => current.value === 1);
  const onLastPage = computed(() => current.value === pages.value);

  function next() {
    if (!onLastPage.value) {
      current.value += 1;
    }
  }

  function prev() {
    if (!onFirstPage.value) {
      current.value -= 1;
    }
  }

  function go(page: number) {
    current.value = page;
  }

  function reset() {
    current.value = 1;
  }

  return {
    elements,
    count,
    start,
    end,
    from,
    to,
    current,
    links,
    hasPages,
    onFirstPage,
    onLastPage,
    next,
    prev,
    go,
    reset,
  };
}

export function paginate(current: number, length: number) {
  let delta: number;

  if (length <= 7) {
    // delta === 7: [1 2 3 4 5 6 7]
    delta = 7;
  } else {
    // delta === 2: [1 ... 4 5 6 ... 10]
    // delta === 4: [1 2 3 4 5 ... 10]
    delta = current > 4 && current < length - 3 ? 2 : 4;
  }

  const range = {
    start: Math.round(current - delta / 2),
    end: Math.round(current + delta / 2),
  };

  if (range.start - 1 === 1 || range.end + 1 === length) {
    range.start += 1;
    range.end += 1;
  }

  let pages: any[] = current > delta
    ? getRange(Math.min(range.start, length - delta), Math.min(range.end, length))
    : getRange(1, Math.min(length, delta + 1));

  const withDots = (value: number, pair: Array<string | number>) => {
    return pages.length + 1 !== length ? pair : [value];
  };

  if (pages[0] !== 1) {
    pages = withDots(1, [1, '...']).concat(pages);
  }

  if (pages[pages.length - 1] < length) {
    pages = pages.concat(withDots(length, ['...', length]));
  }

  return pages;
}

function getRange(start: number, end: number) {
  return Array(end - start + 1).fill(null).map((v, i) => i + start);
}
