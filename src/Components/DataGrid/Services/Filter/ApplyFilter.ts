import { Operator, Rule } from './Constraint';

export interface Constraint {
  rules: Rule[];

  check(rule: Rule, value: any, check: any): boolean | undefined;
}

export interface Condition {
  column: string | undefined;
  constraints: Constraint[] | undefined;
  rule: Rule | undefined;
  check: any;
}

export interface ConditionGroup {
  conditions: Array<ConditionGroup | Condition>;
  operator: Operator;
}

export function defaultConditionGroup(): ConditionGroup {
  return {
    conditions: [],
    operator: Operator.AND,
  };
}

/**
 * Applies filter for data set. When root level condition group is empty,
 * simply return data as is, to save computing power on unnecessary
 * iterating through whole data set which might be huge.
 *
 * @param data
 * @param filters
 */
export function applyFilter<T extends Record<string, any>>(data: T, filters: ConditionGroup) {
  if (filters.conditions.length > 0) {
    return data.filter((entry: T) => passes(entry, filters));
  }

  return data;
}

/**
 * Check if given condition group passes filter rule.
 * For empty groups we have two specific cases to handle:
 *
 * - When parent group operator is set to `AND` we should return `true`,
 *   otherwise empty group would always exclude record,
 * - When parent group operator is set to `OR` we should return `false`,
 *   otherwise empty group would always include record.
 *
 * When no parent is provided (meaning it's root level group),
 * we always return `true` to display all results.
 */
function passes(entry: Record<string, any>, group: ConditionGroup, parent?: ConditionGroup): boolean {
  if (group.conditions.length === 0) {
    return parent ? parent.operator === Operator.AND : true;
  }

  if (group.operator === Operator.AND) {
    return group.conditions.every((node) => processNode(entry, node, group));
  }

  return group.conditions.some((node) => processNode(entry, node, group));
}

function processNode(entry: Record<string, any>, node: ConditionGroup | Condition, parent?: ConditionGroup) {
  if ('conditions' in node) {
    return passes(entry, node, parent);
  } else {
    return check(entry, node);
  }
}

function check(entry: Record<string, any>, condition: Condition) {
  let column = condition.column;
  let rule = condition.rule;
  let constraints = condition.constraints;

  if (!column || !rule || !constraints) {
    return true;
  }

  let value = entry[column];
  let check = condition.check;

  for (let constraint of constraints) {
    let result = constraint.check(rule, value, check);

    if (result == undefined) {
      continue;
    }

    return result;
  }

  return false;
}
