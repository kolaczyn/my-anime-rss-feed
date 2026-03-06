import { expect, test } from "bun:test";

// I added it to make sure tests are correctly setup in this package
test("2 + 2", () => {
  expect(2 + 2).toBe(4);
});
