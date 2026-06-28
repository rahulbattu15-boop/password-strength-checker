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

<<<<<<< HEAD
=======
  function getChecklist(password) {
    const hasInput = password.trim().length > 0;
    return [
      { label: "At least 12 characters", passed: password.length >= 12 },
      { label: "Lowercase letters", passed: /[a-z]/.test(password) },
      { label: "Uppercase letters", passed: /[A-Z]/.test(password) },
      { label: "Numbers", passed: /\d/.test(password) },
      { label: "Special characters", passed: /[^A-Za-z0-9]/.test(password) },
      { label: "Not a common password", passed: hasInput && !commonPasswords.has(password.toLowerCase()) },
      { label: "No repeated character pattern", passed: hasInput && !hasRepeatedCharacters(password) },
      { label: "No simple sequence", passed: hasInput && !hasSimpleSequence(password) },
    ];
  }

  function estimateCrackTime(score, passwordLength) {
    if (passwordLength === 0) {
      return "No password entered";
    }
    if (score >= 90) {
      return "Very hard to guess";
    }
    if (score >= 75) {
      return "Hard to guess";
    }
    if (score >= 45) {
      return "Could be guessed with effort";
    }
    return "Easy to guess";
  }

>>>>>>> master
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
<<<<<<< HEAD
=======
        checklist: getChecklist(""),
        crackTime: estimateCrackTime(0, 0),
>>>>>>> master
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
<<<<<<< HEAD
=======
      checklist: getChecklist(password),
      crackTime: estimateCrackTime(score, password.length),
>>>>>>> master
      suggestions: suggestions.length
        ? suggestions
        : ["Great work. This password follows the main safety rules."],
    };
  }

<<<<<<< HEAD
  const api = {
    checkPassword,
=======
  function generatePassword(options) {
    const settings = Object.assign({
      length: 16,
      lowercase: true,
      uppercase: true,
      numbers: true,
      special: true,
    }, options || {});

    const pools = [
      { enabled: settings.lowercase, chars: "abcdefghijkmnopqrstuvwxyz" },
      { enabled: settings.uppercase, chars: "ABCDEFGHJKLMNPQRSTUVWXYZ" },
      { enabled: settings.numbers, chars: "23456789" },
      { enabled: settings.special, chars: "!@#$%&*?" },
    ].filter((pool) => pool.enabled);

    if (!pools.length) {
      throw new Error("Select at least one character type.");
    }

    const length = Math.min(Math.max(Number(settings.length) || 16, pools.length), 32);
    const password = [];

    pools.forEach((pool) => {
      password.push(randomChar(pool.chars));
    });

    const allChars = pools.map((pool) => pool.chars).join("");
    while (password.length < length) {
      password.push(randomChar(allChars));
    }

    return shuffle(password).join("");
  }

  function randomChar(chars) {
    const cryptoApi = typeof crypto !== "undefined" ? crypto : null;
    if (cryptoApi && cryptoApi.getRandomValues) {
      const values = new Uint32Array(1);
      cryptoApi.getRandomValues(values);
      return chars[values[0] % chars.length];
    }
    return chars[Math.floor(Math.random() * chars.length)];
  }

  function shuffle(items) {
    const copy = items.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      const value = copy[index];
      copy[index] = copy[swapIndex];
      copy[swapIndex] = value;
    }
    return copy;
  }

  const api = {
    checkPassword,
    estimateCrackTime,
    generatePassword,
    getChecklist,
>>>>>>> master
    getStrength,
    hasRepeatedCharacters,
    hasSimpleSequence,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  root.PasswordStrengthChecker = api;
})(typeof globalThis !== "undefined" ? globalThis : window);
