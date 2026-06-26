(function (root) {
  const commonPasswords = new Set([
    "123456",
    "123456789",
    "password",
    "qwerty",
    "admin",
    "welcome",
    "iloveyou",
    "abc123",
    "password123",
    "rahul123",
  ]);

  function normalizePassword(password) {
    if (password === null || password === undefined) {
      return "";
    }
    return String(password);
  }

  function hasRepeatedCharacters(password) {
    return /(.)\1{2,}/.test(password);
  }

  function hasSimpleSequence(password) {
    return /(1234|2345|3456|abcd|bcde|qwer|asdf|zxcv)/.test(password.toLowerCase());
  }

  function getStrength(score) {
    if (score >= 75) {
      return "Strong";
    }
    if (score >= 45) {
      return "Medium";
    }
    return "Weak";
  }

  function checkPassword(input) {
    const password = normalizePassword(input);
    const lower = password.toLowerCase();
    const passed = [];
    const suggestions = [];
    let score = 0;

    if (!password.trim()) {
      return {
        score: 0,
        strength: "Weak",
        passed,
        suggestions: ["Enter a password to check its strength."],
      };
    }

    if (password.length >= 12) {
      score += 30;
      passed.push("Good length");
    } else if (password.length >= 8) {
      score += 18;
      passed.push("Acceptable length");
      suggestions.push("Use at least 12 characters for stronger protection.");
    } else {
      suggestions.push("Use at least 8 characters. 12 or more is better.");
    }

    if (/[a-z]/.test(password)) {
      score += 12;
      passed.push("Contains lowercase letters");
    } else {
      suggestions.push("Add lowercase letters.");
    }

    if (/[A-Z]/.test(password)) {
      score += 12;
      passed.push("Contains uppercase letters");
    } else {
      suggestions.push("Add uppercase letters.");
    }

    if (/\d/.test(password)) {
      score += 12;
      passed.push("Contains numbers");
    } else {
      suggestions.push("Add numbers.");
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 14;
      passed.push("Contains special characters");
    } else {
      suggestions.push("Add special characters such as @, #, $, %, or !.");
    }

    if (commonPasswords.has(lower)) {
      score = Math.max(0, score - 20);
      suggestions.push("Avoid common passwords such as password, 123456, or qwerty.");
    } else {
      score += 10;
      passed.push("Not in the common-password list");
    }

    if (hasRepeatedCharacters(password)) {
      score = Math.max(0, score - 10);
      suggestions.push("Avoid repeating the same character many times.");
    } else {
      score += 5;
      passed.push("No repeated character pattern found");
    }

    if (hasSimpleSequence(password)) {
      score = Math.max(0, score - 10);
      suggestions.push("Avoid simple sequences such as 1234, abcd, or qwer.");
    } else {
      score += 5;
      passed.push("No simple sequence found");
    }

    score = Math.min(Math.max(score, 0), 100);

    return {
      score,
      strength: getStrength(score),
      passed,
      suggestions: suggestions.length
        ? suggestions
        : ["Great work. This password follows the main safety rules."],
    };
  }

  const api = {
    checkPassword,
    getStrength,
    hasRepeatedCharacters,
    hasSimpleSequence,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  root.PasswordStrengthChecker = api;
})(typeof globalThis !== "undefined" ? globalThis : window);
