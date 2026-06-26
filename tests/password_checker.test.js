const assert = require("assert");
const {
  checkPassword,
  hasRepeatedCharacters,
  hasSimpleSequence,
} = require("../src/password_checker");

function runTest(name, testFn) {
  try {
    testFn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

runTest("empty password returns clear weak result", () => {
  const result = checkPassword("");
  assert.strictEqual(result.score, 0);
  assert.strictEqual(result.strength, "Weak");
  assert.ok(result.suggestions.includes("Enter a password to check its strength."));
});

runTest("common password is weak and gets a warning", () => {
  const result = checkPassword("password");
  assert.strictEqual(result.strength, "Weak");
  assert.ok(result.suggestions.some((item) => item.includes("Avoid common passwords")));
});

runTest("medium password gets improvement suggestions", () => {
  const result = checkPassword("Rahul2026");
  assert.strictEqual(result.strength, "Medium");
  assert.ok(result.suggestions.length > 0);
});

runTest("strong password scores high", () => {
  const result = checkPassword("Rahul@2026#Secure");
  assert.strictEqual(result.strength, "Strong");
  assert.ok(result.score >= 75);
});

runTest("wrong type input is handled safely", () => {
  const result = checkPassword(12345678);
  assert.ok(["Weak", "Medium", "Strong"].includes(result.strength));
  assert.ok(Number.isInteger(result.score));
});

runTest("pattern helpers detect repeated characters and sequences", () => {
  assert.strictEqual(hasRepeatedCharacters("aaaPass123!"), true);
  assert.strictEqual(hasRepeatedCharacters("SafePass123!"), false);
  assert.strictEqual(hasSimpleSequence("Safe1234!"), true);
  assert.strictEqual(hasSimpleSequence("Safe9275!"), false);
});
