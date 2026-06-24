const { getPasswordSuggestions } = require('./password-suggestions.js');
const { scorePassword } = require('./password-scoring.js');

console.log('Testing password suggestions function:');
console.log('------------------------------------');

// Test cases for suggestions
const testCases = [
  { input: '', suggestionsContain: ['Enter a password'], description: 'Empty string' },
  { input: 'a', suggestionsContain: ['Use at least 8 characters'], description: 'Very short password' },
  { input: 'password', suggestionsContain: ['Avoid common passwords'], description: 'Common password' },
  { input: 'ABCDEF', suggestionsContain: ['Add lowercase letters', 'Add numbers'], description: 'Only uppercase letters' },
  { input: 'abcdef', suggestionsContain: ['Add uppercase letters', 'Add numbers'], description: 'Only lowercase letters' },
  { input: '123456', suggestionsContain: ['Avoid common passwords', 'Add lowercase letters'], description: 'Only numbers' },
  { input: 'Abcdefg', suggestionsContain: ['Add numbers'], description: 'Letters only, no numbers' },
  { input: 'Abcdefg123', suggestionsContain: ['Add special characters'], description: 'Letters and numbers only' },
  { input: 'Abcdefg123!@#', suggestionsContain: ['Avoid simple sequences'], description: 'Has abc sequence' },
  { input: 'aaaaaa', suggestionsContain: ['Avoid repeating the same character'], description: 'Repeated characters' },
  { input: 'abc', suggestionsContain: ['Use at least 8 characters', 'Avoid simple sequences'], description: 'Very short with sequence' },
  { input: 'XYZYX', suggestionsContain: ['Use at least 8 characters'], description: 'No clear weaknesses' },
];

let passed = 0;
let failed = 0;

testCases.forEach(({ input, suggestionsContain, description }) => {
  const actual = getPasswordSuggestions(input);
  // Check if all expected suggestions are in the actual suggestions
  const allContained = suggestionsContain.every(expected =>
    actual.some(actual => actual.includes(expected))
  );

  if (allContained) {
    passed++;
    console.log(`✓ ${description}: "${input}"`);
    console.log(`  Suggestions: ${actual.join('; ')}`);
  } else {
    failed++;
    console.log(`✗ ${description}: "${input}"`);
    console.log(`  Expected to contain: ${suggestionsContain.join('; ')}`);
    console.log(`  Actual suggestions: ${actual.join('; ')}`);
  }
});

console.log('------------------------------------');
console.log(`Results: ${passed} passed, ${failed} failed`);

// Test combination: scoring and suggestions together
console.log('\nTesting combination of scoring and suggestions:');
console.log('------------------------------------');

const comboTestCases = [
  { input: 'password', expectedScore: 0, expectedSuggestionTypes: ['common'] },
  { input: 'Abcdefg123!@#', expectedScore: 20, expectedSuggestionTypes: ['sequence'] },
  { input: 'ABcd12!@', expectedScore: 25, expectedSuggestionTypes: ['length'] },
  { input: 'MyPass123!', expectedScore: 15, expectedSuggestionTypes: ['length', 'sequence'] }, // Contains "123", length 10
  { input: 'GoodPass123', expectedScore: 10, expectedSuggestionTypes: ['length', 'special', 'sequence'] }, // Missing special, has "123", length 11
];

let comboPassed = 0;
let comboFailed = 0;

comboTestCases.forEach(({ input, expectedScore, expectedSuggestionTypes }) => {
  const score = scorePassword(input);
  const suggestions = getPasswordSuggestions(input);

  let scoreOk = score === expectedScore;

  // Check if suggestions contain expected types
  let suggestionsOk = false;
  if (expectedSuggestionTypes.includes('common')) {
    suggestionsOk = suggestions.some(s => s.toLowerCase().includes('common'));
  } else if (expectedSuggestionTypes.includes('sequence')) {
    suggestionsOk = suggestions.some(s => s.toLowerCase().includes('sequence') || s.toLowerCase().includes('abc') || s.toLowerCase().includes('123'));
  } else if (expectedSuggestionTypes.includes('length')) {
    suggestionsOk = suggestions.some(s => s.toLowerCase().includes('at least 8 characters') || s.toLowerCase().includes('12 characters'));
  } else if (expectedSuggestionTypes.includes('special')) {
    suggestionsOk = suggestions.some(s => s.toLowerCase().includes('special characters') || s.toLowerCase().includes('such as @'));
  }

  if (scoreOk && suggestionsOk) {
    comboPassed++;
    console.log(`✓ Combo test: "${input}" -> Score: ${score}, Suggestions count: ${suggestions.length}`);
  } else {
    comboFailed++;
    console.log(`✗ Combo test: "${input}" -> Score: ${score} (expected ${expectedScore}), Suggestions: ${suggestions.join('; ')}`);
    console.log(`  Score OK: ${scoreOk}, Suggestions OK: ${suggestionsOk}`);
  }
});

console.log('------------------------------------');
console.log(`Combo Results: ${comboPassed} passed, ${comboFailed} failed`);

if (failed > 0 || comboFailed > 0) {
  process.exit(1);
}