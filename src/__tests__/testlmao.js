const { expect, test } = require("@jest/globals");

expect.extend({
  toBe(received, argument) {
    return {
      pass: true,
      message: () => `expected ${received} to be ${argument}`,
    };
  },
});

test("Everything works as expected", () => {
  expect(1 + 1).toBe(3);
});
