import { Rule } from '../Constraint';
import type { Constraint } from '../ApplyFilter';

export const EmptyConstraint: Constraint = {
  rules: [
    Rule.EMPTY,
    Rule.NOT_EMPTY,
  ],
  check(rule, value) {
    switch (rule) {
      case Rule.EMPTY:
        return empty(value);
      case Rule.NOT_EMPTY:
        return !empty(value);
      default:
        return undefined;
    }
  },
};

function empty(value: any) {
  return (
    value === '' ||
    value === 0 ||
    value === false ||
    value === null ||
    value === undefined ||
    (Array.isArray(value) && value.length === 0)
  );
}
