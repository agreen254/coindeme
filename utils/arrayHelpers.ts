/**
 * Creates an array of the specified length full of the value n.
 */
export function arrayOfNs(len: number, n: number = 0) {
  const result = [];
  for (let i = 0; i < len; i++) {
    result.push(n);
  }
  return result;
}

/**
 * Creates a dummy array of the specified length.
 */
export function arrayOfSize(len: number) {
  return Array.from(Array(len)).fill(NaN);
}

/**
 * Creates an array of consecutively increasing integers, starting from the begin param (or 0 if this is not specified).
 */
export function consecutiveArray(n: number, begin: number = 0) {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(i + begin);
  }
  return result;
}
