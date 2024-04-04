export function replaceArrayUnit<T>(array: T[], newUnit: T, index: number) {
  return [
    ...array.slice(0, index),
    newUnit,
    ...array.slice(index + 1, array.length),
  ];
}
