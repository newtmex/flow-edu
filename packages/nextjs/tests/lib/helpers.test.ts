import { describe, expect, test } from "vitest";
import { bytes32ToNormalizedAddress, normalizeAddress } from "~~/app/api/lib/helpers";

describe("bytes32ToNormalizedAddress", () => {
  const cases = [
    {
      expected: "0x9A1B3f5a1c3D4Bf1e6Dd91dEb24C3C76B07Be9F1",
      // rightPadded: "0x9a1b3f5a1c3d4bf1e6dd91deb24c3c76b07be9f1000000000000000000000000",
      leftPadded: "0x0000000000000000000000009a1b3f5a1c3d4bf1e6dd91deb24c3c76b07be9f1",
    },
    {
      expected: "0x32BcA79e46d9898AcbD36eCBab9762Ef6176714F",
      // rightPadded: "0x32bca79e46d9898acbd36ecbab9762ef6176714f000000000000000000000000",
      leftPadded: "0x00000000000000000000000032bca79e46d9898acbd36ecbab9762ef6176714f",
    },
    {
      expected: "0x017C7bEF3bdf75fB7146e08eA8d8e3654C40cAaA",
      // rightPadded: "0x017c7bef3bdf75fb7146e08ea8d8e3654c40caaa000000000000000000000000",
      leftPadded: "0x000000000000000000000000017c7bef3bdf75fb7146e08ea8d8e3654c40caaa",
    },
    {
      expected: "0xAB4C69fCFeAdD7D451aF20c3E3Ad7AfE621fAe7B",
      // rightPadded: "0xab4c69fcfeadd7d451af20c3e3ad7afe621fae7b000000000000000000000000",
      leftPadded: "0x000000000000000000000000ab4c69fcfeadd7d451af20c3e3ad7afe621fae7b",
    },
  ];

  for (const { expected, leftPadded } of cases) {
    // test(`correctly parses right-padded address ${rightPadded}`, () => {
    //   const result = bytes32ToNormalizedAddress(rightPadded);
    //   expect(result).toBe(normalizeAddress(expected));
    // });

    test(`correctly parses left-padded address ${leftPadded}`, () => {
      const result = bytes32ToNormalizedAddress(leftPadded);
      expect(result).toBe(normalizeAddress(expected));
    });

    test(`correctly parses normal address ${expected}`, () => {
      const result = bytes32ToNormalizedAddress(expected);
      expect(result).toBe(normalizeAddress(expected));
    });
  }

  test("throws on invalid address", () => {
    expect(() => bytes32ToNormalizedAddress("0x1234")).toThrow();
  });
});
