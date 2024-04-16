import { useFloating, autoUpdate, offset, size, flip, shift, type MiddlewareState } from '@floating-ui/vue';
import { watch, ref, type Ref } from 'vue';

type FormControl = {
  htmlControl: HTMLElement
}

type SizeMiddlewareState = MiddlewareState & {
  availableWidth: number;
  availableHeight: number;
};

export function useFormSelectFloating(reference: Ref<FormControl>, floating: Ref<HTMLElement>) {
  const target = ref();

  watch(reference, () => {
    if (reference.value?.htmlControl) {
      target.value = reference.value.htmlControl;
    } else {
      target.value = undefined;
    }
  });

  return useFloating(target, floating, {

    /**
     * Apply "anchoring" of floating select list to select field. While select
     * list is mounted in DOM, it will automatically update floating position
     * and size when scrolling or resizing the page.
     *
     * IMPORTANT! Use "v-if" directive to show select list element.
     * Otherwise, the auto update handler will work even when list is hidden,
     * which may cause some performance problems.
     */
    whileElementsMounted: autoUpdate,

    /**
     * We always want to align select list to the field's left side.
     * Also, we want the list to appear at the bottom by default.
     */
    placement: 'bottom-start',

    middleware: [

      /**
       * Apply offset middleware to make select list to cover the original
       * select field which height is 32px.
       */
      offset(({ rects }) => {
        return {
          mainAxis: rects.reference.height * -1,
          crossAxis: 0,
        };
      }),

      /**
       * Apply size middleware to match the size of select list with available
       * space above or below the select field and appropriate widths
       * and heights.
       *
       * See {@code applySelectListSizeBoundaries} function for more details.
       */
      size({
        apply: (args) => {
          applySelectListSizeBoundaries(args, floating);
        },
      }),

      /**
       * Apply flip middleware to flip select list above or below of
       * the select field depending on available space.
       */
      flip(),

      /**
       * When select field is very narrow and close to the screen edge,
       * we might run into situation where select list would overflow.
       * In such case we want to shift list horizontally, so it fits
       * the screen.
       */
      shift({
        mainAxis: false,
        crossAxis: true,
      }),
    ],
  });
}

function applySelectListSizeBoundaries({ availableHeight, rects }: SizeMiddlewareState, floating: Ref<HTMLElement>) {
  Object.assign(floating.value.style, {

    /**
     * Always force select list to be at least the same height
     * as the select field itself.
     */
    minWidth: `${rects.reference.width}px`,

    /**
     * Usually we want the select list to match the select field width,
     * but sometimes, depending on layout a select field might be very narrow.
     * In that case we provide a minimum 164px width for select list,
     * which is reasonable size for the list to become usable.
     */
    maxWidth: `max(164px, ${rects.reference.width}px)`,

    /**
     * We always want to keep 32px padding from the screen edge. Available
     * height is calculated to the edge, so simply reduce it by 32px.
     *
     * When using only available height as max height limit, the select might
     * position wrong, since when very close to the edge, the available height
     * will be so small that it won't even display a single option in list.
     * That's why we provide additional minimum height of 112px which includes
     * a standard configuration with search field, single list element and
     * a clear value button. With this minimum set, a flip middleware will
     * do its job to flip the list to other side and recalculate the height.
     */
    maxHeight: `max(112px, ${availableHeight - 32}px)`,

  });
}
