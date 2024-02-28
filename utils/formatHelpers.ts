/**
 * Shortens very long coin names that will cause styling issues in the market table.
 */
export function formatLongName(name: string, maxLen: number = 18) {
  if (name.length >= maxLen) {
    return name.slice(0, 14).trim() + "...";
  } else {
    return name;
  }
}

/**
 * Formats the price change percentage, ensure it will only have two digits after the decimal.
 */
export function formatPricePercentageChange(price: number) {
  return padTwoDecimals(roundDigits(price, 2).toString());
}

/**
 * Prices less than 0.01 will use scientific notation to save space.
 * Prices greater than 0.01 will use prefixes to save space.
 *
 * 0.001 -> 1e-3
 * 10000 -> 10k
 */
export function formatPriceCompact(price: number) {
  return price < 0.01
    ? formatSmallNum(price)
    : Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 2,
      }).format(price);
}

/**
 * Saves table space by using scientific notation for very small numbers.
 * e.g. 0.000001 -> 1e-6
 */
export function formatSmallNum(n: number): string {
  return n < 0.01 ? n.toExponential(2) : n.toString();
}

/**
 * Used so percentage changes or currency will have two numbers after the decimal.
 * e.g. 10.2% -> 10.20%
 */
export function padTwoDecimals(input: string) {
  const [beforeDecimal, afterDecimal] = input.split(".");

  if (!afterDecimal) return `${beforeDecimal}.00`;
  else return `${beforeDecimal}.${afterDecimal.padEnd(2, "0")}`;
}

/**
 * Rounds the input to the specified number of digits.
 */
export function roundDigits(n: number, numDigits: number): number {
  const tenPow = 10 ** numDigits;
  return Math.abs(Math.round(n * tenPow) / tenPow);
}
