const { scorePassword } = require('./password-scoring.js');
const { getPasswordSuggestions } = require('./password-suggestions.js');

console.log('=== Integration Test: Password Scoring + Suggestions ===\n');

// Test cases with expected behaviors
const testCases = [
    { password: '', description: 'Empty password' },
    { password: 'a', description: 'Single character' },
    { password: 'password', description: 'Common password' },
    { password: 'abc123', description: 'Simple pattern' },
    { password: 'ABCDEF', description: 'Only uppercase' },
    { password: 'abcdefgh', description: 'Only lowercase, good length' },
    { password: '12345678', description: 'Only numbers' },
    { password: '!@#$%^&*', description: 'Only special characters' },
    { password: 'Abcdefg123!@#', description: 'Good password with sequence' },
    { password: 'MySecurePass123!', description: 'Medium strength' },
    { password: 'VerySecurePass!@#123', description: 'Strong password' }
];

testCases.forEach(({ password, description }) => {
    console.log(`Testing: ${description}`);
    console.log(`Password: "${password}"`);

    // Get score
    const score = scorePassword(password);

    // Get strength level
    let strength;
    if (score >= 75) strength = 'Strong';
    else if (score >= 45) strength = 'Medium';
    else strength = 'Weak';

    // Get suggestions
    const suggestions = getPasswordSuggestions(password);

    console.log(`Score: ${score}/100 (${strength})`);
    console.log(`Suggestions (${suggestions.length}):`);
    suggestions.forEach((suggestion, index) => {
        console.log(`  ${index + 1}. ${suggestion}`);
    });
    console.log('');
});

console.log('=== End of Integration Test ===');