//

import { asNumber, asTimestamp } from "../../../src/util/converter/converter";

//

describe("asTimestamp", () => {
  it.each`
    input                         | date
    ${"1970-01-01T00:00:00.000Z"} | ${new Date(0)}
  `("returns '$date' for Date('$input')", ({ input, date }) => {
    expect(asTimestamp(input)).toEqual(date.getTime());
  });

  it("should return null with no arguments", () => {
    expect(asTimestamp()).toBeNull();
  });
});

describe("asNumber", () => {
  it.each`
    input         | numberValue
    ${"123"}      | ${123}
    ${"-123"}     | ${-123}
    ${"Infinity"} | ${NaN}
    ${"4321e+"}   | ${4321}
    ${"4321hop"}  | ${4321}
  `("returns '$number' for '$input'", ({ input, numberValue }) => {
    expect(asNumber(input, 42)).toBe(numberValue);
  });
  it("should return NaN value if not numeric", () => {
    expect(asNumber("", 42)).toBeNaN();
  });
  it("should return default value if undefined", () => {
    expect(asNumber(undefined, 42)).toBe(42);
  });
});
