/**
 * Password Scoring System
 * Scores a password out of 100 based on:
 * - Length (longer is better)
 * - Character variety (lowercase, uppercase, numbers, special characters)
 * - Penalties for common passwords, repeated characters, and sequences
 *
 * @param {string} password - The password to score
 * @returns {number} Score from 0 to 100
 */
function scorePassword(password) {
  // Debug flag - set to true to enable logging
  const DEBUG = false;

  if (DEBUG) {
    console.log(`[DEBUG] Scoring password: "${password}"`);
  }

  // Handle non-string and empty input
  if (typeof password !== 'string' || password === null) {
    if (DEBUG) {
      console.log('[DEBUG] Invalid input: not a string or null, returning 0');
    }
    return 0;
  }

  // Trim whitespace and check if empty after trimming
  password = password.trim();
  if (password === '') {
    if (DEBUG) {
      console.log('[DEBUG] Empty string after trimming, returning 0');
    }
    return 0;
  }

  // Very short passwords are weak (less than 4 characters)
  if (password.length < 4) {
    if (DEBUG) {
      console.log(`[DEBUG] Password too short (${password.length} chars), returning 0`);
    }
    return 0;
  }

  // Common passwords list (top 10 common passwords)
  const commonPasswords = [
    'password', '123456', '12345678', 'qwerty', 'abc123',
    'monkey', 'letmein', 'dragon', 'baseball', 'iloveyou'
  ];

  // Check if password is common (case-insensitive)
  const lowerPassword = password.toLowerCase();
  if (commonPasswords.includes(lowerPassword)) {
    if (DEBUG) {
      console.log(`[DEBUG] Common password detected: "${password}", returning 0`);
    }
    return 0;
  }

  // Calculate length score (0-20 points)
  let lengthScore = 0;
  const len = password.length;
  if (len >= 20) lengthScore = 20;
  else if (len >= 16) lengthScore = 15;
  else if (len >= 12) lengthScore = 10;
  else if (len >= 8) lengthScore = 5;

  if (DEBUG) {
    console.log(`[DEBUG] Length score: ${lengthScore} (for ${len} characters)`);
  }

  // Calculate variety score (0-20 points: 5 each for lower, upper, digit, special)
  let varietyScore = 0;
  if (/[a-z]/.test(password)) varietyScore += 5;
  if (/[A-Z]/.test(password)) varietyScore += 5;
  if (/[0-9]/.test(password)) varietyScore += 5;
  if (/[^A-Za-z0-9]/.test(password)) varietyScore += 5;

  if (DEBUG) {
    console.log(`[DEBUG] Variety score: ${varietyScore}`);
    console.log(`[DEBUG]  - Has lowercase: ${/[a-z]/.test(password)}`);
    console.log(`[DEBUG]  - Has uppercase: ${/[A-Z]/.test(password)}`);
    console.log(`[DEBUG]  - Has numbers: ${/[0-9]/.test(password)}`);
    console.log(`[DEBUG]  - Has special chars: ${/[^A-Za-z0-9]/.test(password)}`);
  }

  const baseScore = lengthScore + varietyScore; // 0-40

  if (DEBUG) {
    console.log(`[DEBUG] Base score (length + variety): ${baseScore}`);
  }

  // Initialize penalty
  let penalty = 0;

  // Check for repeated characters (3 or more consecutive same characters)
  const repeatedMatch = password.match(/([\s\S])\1\1/);
  if (repeatedMatch) {
    penalty += 10;
    if (DEBUG) {
      console.log(`[DEBUG] Repeated characters detected: "${repeatedMatch[0]}", penalty += 10`);
    }
  }

  // Check for sequences of 3 consecutive increasing or decreasing characters
  // We'll check for both letters and numbers, and both forward and reverse.
  let foundSequence = false;
  let sequenceChars = '';
  for (let i = 0; i < password.length - 2; i++) {
    const a = password.charCodeAt(i);
    const b = password.charCodeAt(i + 1);
    const c = password.charCodeAt(i + 2);

    // Check for consecutive increasing or decreasing by 1
    if (b - a === 1 && c - b === 1) {
      foundSequence = true;
      sequenceChars = password.substring(i, i + 3);
      break;
    }
    if (b - a === -1 && c - b === -1) {
      foundSequence = true;
      sequenceChars = password.substring(i, i + 3);
      break;
    }
  }
  if (foundSequence) {
    penalty += 10;
    if (DEBUG) {
      console.log(`[DEBUG] Sequence detected: "${sequenceChars}", penalty += 10`);
    }
  }

  // Calculate adjusted score (can be negative)
  let adjustedScore = baseScore - penalty;

  if (DEBUG) {
    console.log(`[DEBUG] Adjusted score (base - penalty): ${adjustedScore} (base: ${baseScore}, penalty: ${penalty})`);
  }

  // Clamp between 0 and 100
  if (adjustedScore < 0) adjustedScore = 0;
  if (adjustedScore > 100) adjustedScore = 100;

  const finalScore = Math.round(adjustedScore);

  if (DEBUG) {
    console.log(`[DEBUG] Final score: ${finalScore} (clamped and rounded)`);
  }

  return finalScore;
}

// Export for use in other modules (if using a module system)
// In a browser environment, this function will be available globally if attached to window
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { scorePassword };
} else if (typeof window !== 'undefined') {
  window.scorePassword = scorePassword;
}