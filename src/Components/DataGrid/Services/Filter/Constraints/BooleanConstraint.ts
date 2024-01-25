import { Rule } from '../Constraint';
import type { Constraint } from '../ApplyFilter';

export const BooleanConstraint: Constraint = {
  rules: [
    Rule.IS_TRUE,
    Rule.IS_FALSE,
  ],
  check(rule, value) {
    switch (rule) {
      case Rule.IS_TRUE:
        return !!value;
      case Rule.IS_FALSE:
        return !value;
      default:
        return false;
    }
  },
};
