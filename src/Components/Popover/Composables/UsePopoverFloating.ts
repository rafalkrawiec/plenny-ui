import { computed } from 'vue';
import { useFloating, offset, flip, shift, arrow as arrowMiddleware } from '@floating-ui/vue';
import { ReversedSide } from '../../../Utils/ReversedSide';

export function usePopoverFloating(reference, floating, arrow) {
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
    const side = placement.value.split('-')[0];

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
