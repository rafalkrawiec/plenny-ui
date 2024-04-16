import type { Directive } from 'vue';
import { computePosition, offset, arrow, autoUpdate, autoPlacement, size } from '@floating-ui/vue';
import { ReversedSide } from '../../Utils/ReversedSide';

export const Tooltip: Directive<HTMLElement, string> = {
  mounted(element, binding) {
    element.tooltipText = binding.value;

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
  },

  updated(element, binding) {
    if (element.tooltipElement) {
      let inner = element.tooltipElement.querySelector('span');

      element.tooltipText = binding.value;

      if (inner) {
        inner.innerText = element.tooltipText;
      }
    }
  },

  beforeUnmount(element) {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);

    // Perform a fallback cleanup in case a mouseleave event is not
    // triggered before unmounting target component.
    cleanup(element);
  },
};

function handleMouseEnter(event: MouseEvent) {
  createTooltip(event);
}

function handleMouseLeave(event: MouseEvent) {
  cleanup(event.target as HTMLElement);
}

function createTooltip(event: MouseEvent) {
  let targetElement = event.target as HTMLElement;

  if (targetElement.tooltipElement) {
    return;
  }

  const tooltipElement = document.createElement('div');
  tooltipElement.classList.add('tooltip');

  const tooltipTextElement = document.createElement('span');
  tooltipTextElement.innerText = targetElement.tooltipText || '';
  tooltipElement.append(tooltipTextElement);

  const arrowElement = document.createElement('div');
  arrowElement.classList.add('arrow');
  tooltipElement.append(arrowElement);

  targetElement.tooltipElement = tooltipElement;

  document.body.append(tooltipElement);

  targetElement.tooltipCleanup = autoUpdate(targetElement, tooltipElement, () => {
    computePosition(targetElement, tooltipElement, {
      middleware: [
        offset(5),
        autoPlacement(),
        size({
          apply({ availableWidth, availableHeight, elements }) {
            Object.assign(elements.floating.style, {
              maxWidth: `${availableWidth}px`,
              maxHeight: `${availableHeight}px`,
            });
          },
        }),
        arrow({
          element: arrowElement,
        }),
      ],
    }).then(({ x, y, middlewareData, placement }) => {
      Object.assign(tooltipElement.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      if (middlewareData.arrow) {
        const { x, y } = middlewareData.arrow;
        const side = placement.split('-')[0] as 'left' | 'right' | 'top' | 'bottom';

        Object.assign(arrowElement.style, {
          left: x != null ? `${x}px` : '',
          top: y != null ? `${y}px` : '',
          right: '',
          bottom: '',
          [ReversedSide[side]]: '-5px',
          transform: 'rotate(45deg)',
        });
      }
    });
  });
}

function cleanup(target: HTMLElement) {
  if (target && target.tooltipElement && target.tooltipCleanup) {
    target.tooltipCleanup();
    target.tooltipElement.remove();

    delete target.tooltipElement;
    delete target.tooltipCleanup;
  }
}
