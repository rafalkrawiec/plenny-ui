import { arrayWrap } from '@plenny/support';

export enum Rule {
  EMPTY = 'EMPTY',
  NOT_EMPTY = 'NOT_EMPTY',
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  STARTS_WITH = 'STARTS_WITH',
  ENDS_WITH = 'ENDS_WITH',
  CONTAINS = 'CONTAINS',
  HIGHER = 'HIGHER',
  HIGHER_OR_EQUAL = 'HIGHER_OR_EQUAL',
  LOWER = 'LOWER',
  LOWER_OR_EQUAL = 'LOWER_OR_EQUAL',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
}

export enum Operator {
  AND = 'AND',
  OR = 'OR',
}

export function constraint(constraint: Rule, value: any, check: any) {
  switch (constraint) {

    case Rule.EMPTY:
    case Rule.NOT_EMPTY:
      return checkEmpty(value);

    case Rule.EQUAL:
    case Rule.NOT_EQUAL:
      return typeof value === 'string'
        ? checkString(constraint, value, check)
        : checkNumeric(constraint, value, check);

    case Rule.STARTS_WITH:
    case Rule.ENDS_WITH:
    case Rule.CONTAINS:
      return checkString(constraint, value, check);

    case Rule.HIGHER:
    case Rule.HIGHER_OR_EQUAL:
    case Rule.LOWER:
    case Rule.LOWER_OR_EQUAL:
      return checkNumeric(constraint, value, check);

    case Rule.NOT_IN:
    case Rule.IN:
      return checkIn(constraint, value, check);
  }
}

function checkEmpty(value: any) {
  return (
    value === '' ||
    value === 0 ||
    value === false ||
    value === null ||
    value === undefined
  );
}

function checkString(constraint: Rule, value: any, check: any) {
  if (check === null || check === undefined) {
    return true;
  }

  value = String(value).toLowerCase();
  check = String(check).toLowerCase();

  switch (constraint) {
    case Rule.EQUAL:
      return value === check;
    case Rule.NOT_EQUAL:
      return value !== check;
    case Rule.STARTS_WITH:
      return value.startsWith(check);
    case Rule.ENDS_WITH:
      return value.endsWith(check);
    case Rule.CONTAINS:
      return value.includes(check);
    default:
      return false;
  }
}

function checkNumeric(constraint: Rule, value: any, check: any) {
  if (check === null || check === undefined) {
    return true;
  }

  value = Number(value);
  check = Number(check);

  if (isNaN(value) || isNaN(check)) {
    return false;
  }

  switch (constraint) {
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
}

function checkIn(constraint: Rule, value: any, check: any) {
  check = arrayWrap(check);

  switch (constraint) {
    case Rule.IN:
      return check.includes(value);
    case Rule.NOT_IN:
      return !check.includes(value);
    default:
      return false;
  }
}
