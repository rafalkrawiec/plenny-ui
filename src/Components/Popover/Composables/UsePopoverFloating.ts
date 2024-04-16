import { computed, type Ref } from 'vue';
import { useFloating, offset, flip, shift, arrow as arrowMiddleware, type MaybeElement, type ReferenceElement } from '@floating-ui/vue';
import { ReversedSide } from '../../../Utils/ReversedSide';

export function usePopoverFloating<T extends ReferenceElement = ReferenceElement>(
  reference: Readonly<Ref<MaybeElement<T>>>,
  floating: Readonly<Ref<MaybeElement<HTMLElement>>>,
  arrow: Readonly<Ref<MaybeElement<HTMLElement>>>,
) {
  const { middlewareData, placement, ...other } = useFloating(reference, floating, {
    placement: 'bottom-start',
    middleware: [
      offset(5),
      flip(),
      shift({
        crossAxis: true,
      }),
      arrowMiddleware({
        element: arrow,
        padding: 8,
      }),
    ],
  });

  const arrowStyles = computed(() => {
    const arrow = middlewareData.value.arrow;

    if (!arrow) {
      return {};
    }

    const { x, y } = arrow;
    const side = placement.value.split('-')[0] as 'left' | 'right' | 'top' | 'bottom';

    return {
      left: x != null ? `${x}px` : '',
      top: y != null ? `${y}px` : '',
      right: '',
      bottom: '',
      [ReversedSide[side]]: '-5px',
    };
  });

  return { middlewareData, placement, arrowStyles, ...other };
}
