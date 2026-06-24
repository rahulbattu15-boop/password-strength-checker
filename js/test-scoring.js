const { scorePassword } = require('./password-scoring.js');

console.log('Testing password scoring function:');
console.log('------------------------------------');

// Test cases
const testCases = [
  { input: '', expected: 0, description: 'Empty string' },
  { input: 'a', expected: 0, description: 'Very short password (length <4)' },
  { input: 'password', expected: 0, description: 'Common password' },
  { input: 'abcdef', expected: 0, description: 'Only letters with sequence' },
  { input: 'abc123', expected: 0, description: 'Letters and numbers with sequences' },
  { input: 'Abcdefg123!@#', expected: 20, description: 'Strong password with sequence penalty' },
  { input: 'aaaaaa', expected: 0, description: 'Repeated characters' },
  { input: 'abc', expected: 0, description: 'Very short password (length=3)' },
  { input: 'XYZ', expected: 0, description: 'Very short password (length=3)' },
  { input: '123', expected: 0, description: 'Very short password (length=3)' },
  { input: 'Abcdefg123', expected: 10, description: 'Missing special char with sequence penalty' },
  { input: 'Abcdefg!@#', expected: 10, description: 'Missing numbers with sequence penalty' },
  { input: 'ABcd12!@', expected: 25, description: 'Medium strength, no penalties' },
];

let passed = 0;
let failed = 0;

testCases.forEach(({ input, expected, description }) => {
  const actual = scorePassword(input);
  const pass = actual === expected;
  if (pass) {
    passed++;
    console.log(`✓ ${description}: "${input}" -> ${actual} (expected ${expected})`);
  } else {
    failed++;
    console.log(`✗ ${description}: "${input}" -> ${actual} (expected ${expected})`);
  }
});

console.log('------------------------------------');
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
}