import { Rule } from '../Constraint';
import type { Constraint } from '../ApplyFilter';

export const StringConstraint: Constraint = {
  rules: [
    Rule.EQUAL,
    Rule.NOT_EQUAL,
    Rule.STARTS_WITH,
    Rule.ENDS_WITH,
    Rule.INCLUDES,
  ],
  check(rule, value, check) {
    if (check == null || check === '') {
      return true;
    }

    value = String(value).toLowerCase();
    check = String(check).toLowerCase();

    switch (rule) {
      case Rule.EQUAL:
        return value === check;
      case Rule.NOT_EQUAL:
        return value !== check;
      case Rule.STARTS_WITH:
        return value.startsWith(check);
      case Rule.ENDS_WITH:
        return value.endsWith(check);
      case Rule.INCLUDES:
        return value.includes(check);
      default:
        return false;
    }
  },
};
