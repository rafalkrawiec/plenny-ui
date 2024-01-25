import { Rule } from '../Constraint';
import type { Constraint } from '../ApplyFilter';
import { arrayWrap } from '@plenny/support';

export const CollectionConstraint: Constraint = {
  rules: [
    Rule.CONTAINS_ANY,
    Rule.CONTAINS_ALL,
    Rule.NOT_CONTAINS_ANY,
    Rule.NOT_CONTAINS_ALL,
  ],
  check(rule, value, check) {
    if (check == null || check === '' || (Array.isArray(check) && check.length === 0)) {
      return true;
    }

    check = arrayWrap(check);

    switch (rule) {
      case Rule.CONTAINS_ALL:
        return check.every((item: any) => value.includes(item));
      case Rule.CONTAINS_ANY:
        return check.some((item: any) => value.includes(item));
      case Rule.NOT_CONTAINS_ANY:
        return !check.some((item: any) => value.includes(item));
      case Rule.NOT_CONTAINS_ALL:
        return !check.every((item: any) => value.includes(item));
      default:
        return false;
    }
  },
};
