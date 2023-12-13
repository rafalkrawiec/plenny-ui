export function SortStrategyNumber(a: any, b: any) {
    if (a == null) return -1;
    if (b == null) return 1;

    return a - b;
}
