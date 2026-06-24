/**
 * Password Suggestions System
 * Provides suggestions to improve a password based on its weaknesses.
 *
 * @param {string} password - The password to analyze
 * @returns {Array<string>} Array of suggestions for improvement
 */
function getPasswordSuggestions(password) {
  // Debug flag - set to true to enable logging
  const DEBUG = false;

  if (DEBUG) {
    console.log(`[DEBUG] Generating suggestions for password: "${password}"`);
  }

  const suggestions = [];

  // Handle non-string and empty input
  if (typeof password !== 'string' || password === null) {
    suggestions.push("Enter a password to check its strength.");
    if (DEBUG) {
      console.log('[DEBUG] Invalid input: not a string or null');
    }
    return suggestions;
  }

  // Trim whitespace
  password = password.trim();

  if (password === '') {
    suggestions.push("Enter a password to check its strength.");
    if (DEBUG) {
      console.log('[DEBUG] Empty string after trimming');
    }
    return suggestions;
  }

  // Check length
  if (password.length < 8) {
    suggestions.push("Use at least 8 characters. 12 or more is better.");
    if (DEBUG) {
      console.log('[DEBUG] Password too short (< 8 chars)');
    }
  } else if (password.length < 12) {
    suggestions.push("Consider using at least 12 characters for stronger protection.");
    if (DEBUG) {
      console.log('[DEBUG] Password length 8-11 chars');
    }
  }

  // Check for lowercase letters
  if (!/[a-z]/.test(password)) {
    suggestions.push("Add lowercase letters (a-z).");
    if (DEBUG) {
      console.log('[DEBUG] No lowercase letters');
    }
  }

  // Check for uppercase letters
  if (!/[A-Z]/.test(password)) {
    suggestions.push("Add uppercase letters (A-Z).");
    if (DEBUG) {
      console.log('[DEBUG] No uppercase letters');
    }
  }

  // Check for numbers
  if (!/[0-9]/.test(password)) {
    suggestions.push("Add numbers (0-9).");
    if (DEBUG) {
      console.log('[DEBUG] No numbers');
    }
  }

  // Check for special characters
  if (!/[^A-Za-z0-9]/.test(password)) {
    suggestions.push("Add special characters such as @, #, $, %, or !.");
    if (DEBUG) {
      console.log('[DEBUG] No special characters');
    }
  }

  // Check for common passwords
  const commonPasswords = [
    'password', '123456', '12345678', 'qwerty', 'abc123',
    'monkey', 'letmein', 'dragon', 'baseball', 'iloveyou',
    'password1', '1234567890', '1234567', '123123', '111111'
  ];

  const lowerPassword = password.toLowerCase();
  if (commonPasswords.includes(lowerPassword)) {
    suggestions.push("Avoid common passwords such as password, 123456, or qwerty.");
    if (DEBUG) {
      console.log('[DEBUG] Common password detected');
    }
  }

  // Check for repeated characters (3 or more consecutive same characters)
  if (/([\s\S])\1\1/.test(password)) {
    suggestions.push("Avoid repeating the same character many times.");
    if (DEBUG) {
      console.log('[DEBUG] Repeated characters (3+ consecutive) detected');
    }
  }

  // Check for sequences of 3 consecutive increasing or decreasing characters
  let foundSequence = false;
  for (let i = 0; i < password.length - 2; i++) {
    const a = password.charCodeAt(i);
    const b = password.charCodeAt(i + 1);
    const c = password.charCodeAt(i + 2);

    // Check for consecutive increasing or decreasing by 1
    if (b - a === 1 && c - b === 1) {
      foundSequence = true;
      if (DEBUG) {
        console.log(`[DEBUG] Increasing sequence detected at position ${i}: ${password.substring(i, i+3)}`);
      }
      break;
    }
    if (b - a === -1 && c - b === -1) {
      foundSequence = true;
      if (DEBUG) {
        console.log(`[DEBUG] Decreasing sequence detected at position ${i}: ${password.substring(i, i+3)}`);
      }
      break;
    }
  }
  if (foundSequence) {
    suggestions.push("Avoid simple sequences such as abc, 123, or qwer.");
    if (DEBUG) {
      console.log('[DEBUG] Sequence (3+ consecutive) detected');
    }
  }

  // If no suggestions, password is good
  if (suggestions.length === 0) {
    suggestions.push("Great work. This password follows the main safety rules.");
    if (DEBUG) {
      console.log('[DEBUG] No issues found, password is good');
    }
  }

  if (DEBUG) {
    console.log(`[DEBUG] Generated ${suggestions.length} suggestions`);
  }

  return suggestions;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getPasswordSuggestions };
} else if (typeof window !== 'undefined') {
  window.getPasswordSuggestions = getPasswordSuggestions;
}