export type DecimalInput = string | number | Decimal;

const SCALE = 6;
const ZERO = BigInt(0);
const TEN = BigInt(10);
const FACTOR = TEN ** BigInt(SCALE);

function parseUnits(value: DecimalInput): bigint {
  if (value instanceof Decimal) {
    return value.units;
  }
  const text = String(value).trim();
  if (!text) {
    return ZERO;
  }
  const negative = text.startsWith("-");
  const raw = negative ? text.slice(1) : text;
  const [wholePart, fractionPart = ""] = raw.split(".");
  const whole = BigInt(wholePart || "0");
  const fraction = BigInt((fractionPart + "0".repeat(SCALE)).slice(0, SCALE));
  const units = whole * FACTOR + fraction;
  return negative ? ZERO - units : units;
}

function roundHalfUp(units: bigint, places: number): bigint {
  const drop = SCALE - places;
  if (drop <= 0) {
    return units;
  }
  const factor = TEN ** BigInt(drop);
  const half = factor / BigInt(2);
  if (units >= ZERO) {
    return ((units + half) / factor) * factor;
  }
  return ((units - half) / factor) * factor;
}

function formatUnits(units: bigint, places: number): string {
  const rounded = roundHalfUp(units, places);
  const negative = rounded < ZERO;
  const absolute = negative ? ZERO - rounded : rounded;
  const asString = absolute.toString().padStart(SCALE + 1, "0");
  const whole = asString.slice(0, -SCALE) || "0";
  const fraction = asString.slice(-SCALE).slice(0, places);
  const body = places > 0 ? `${whole}.${fraction}` : whole;
  return negative ? `-${body}` : body;
}

export class Decimal {
  readonly units: bigint;

  constructor(value: DecimalInput | { __units: bigint } = 0) {
    if (typeof value === "object" && value !== null && "__units" in value) {
      this.units = value.__units;
      return;
    }
    this.units = parseUnits(value);
  }

  static fromUnits(units: bigint) {
    return new Decimal({ __units: units });
  }

  plus(value: DecimalInput) {
    return Decimal.fromUnits(this.units + parseUnits(value));
  }

  minus(value: DecimalInput) {
    return Decimal.fromUnits(this.units - parseUnits(value));
  }

  times(value: DecimalInput) {
    return Decimal.fromUnits((this.units * parseUnits(value)) / FACTOR);
  }

  dividedBy(value: DecimalInput) {
    const divisor = parseUnits(value);
    if (divisor === ZERO) {
      throw new Error("Division by zero.");
    }
    return Decimal.fromUnits((this.units * FACTOR) / divisor);
  }

  negated() {
    return Decimal.fromUnits(-this.units);
  }

  toDecimalPlaces(places: number) {
    return Decimal.fromUnits(roundHalfUp(this.units, places));
  }

  cmp(value: DecimalInput) {
    const other = parseUnits(value);
    if (this.units < other) return -1;
    if (this.units > other) return 1;
    return 0;
  }

  gt(value: DecimalInput) {
    return this.cmp(value) > 0;
  }

  gte(value: DecimalInput) {
    return this.cmp(value) >= 0;
  }

  lt(value: DecimalInput) {
    return this.cmp(value) < 0;
  }

  lte(value: DecimalInput) {
    return this.cmp(value) <= 0;
  }

  eq(value: DecimalInput) {
    return this.cmp(value) === 0;
  }

  equals(value: DecimalInput) {
    return this.eq(value);
  }

  isZero() {
    return this.units === ZERO;
  }

  toFixed(places: number) {
    return formatUnits(this.units, places);
  }

  toString() {
    return formatUnits(this.units, SCALE).replace(/\.?0+$/, "") || "0";
  }
}
