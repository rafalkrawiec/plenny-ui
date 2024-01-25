import { Rule } from '../Constraint';
import type { Constraint } from '../ApplyFilter';
import { arrayWrap } from '@plenny/support';

export const DictionaryConstraint: Constraint = {
  rules: [
    Rule.IN,
    Rule.NOT_IN,
  ],
  check(rule, value, check) {
    if (check == null || check === '' || (Array.isArray(check) && check.length === 0)) {
      return true;
    }

    check = arrayWrap(check);

    switch (rule) {
      case Rule.IN:
        return check.includes(value);
      case Rule.NOT_IN:
        return !check.includes(value);
      default:
        return false;
    }
  },
};
