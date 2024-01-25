import { Rule } from '../Constraint';
import type { Constraint } from '../ApplyFilter';
import moment from 'moment';

export const DateTimeConstraint: Constraint = {
  rules: [
    Rule.EQUAL,
    Rule.NOT_EQUAL,
    Rule.HIGHER,
    Rule.HIGHER_OR_EQUAL,
    Rule.LOWER,
    Rule.LOWER_OR_EQUAL,
  ],
  check(rule, value, check) {
    if (check == null || check === '') {
      return true;
    }

    if (!value) {
      return false;
    }

    value = moment.tz(value, __app_timezone).local().unix();
    check = moment(check).unix();

    switch (rule) {
      case Rule.EQUAL:
        return value === check;
      case Rule.NOT_EQUAL:
        return value !== check;
      case Rule.HIGHER:
        return value > check;
      case Rule.HIGHER_OR_EQUAL:
        return value >= check;
      case Rule.LOWER:
        return value < check;
      case Rule.LOWER_OR_EQUAL:
        return value <= check;
      default:
        return false;
    }
  },
};
