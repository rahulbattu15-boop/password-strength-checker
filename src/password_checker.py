from __future__ import annotations

import re
from dataclasses import dataclass


COMMON_PASSWORDS = {
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
}


@dataclass
class PasswordResult:
    password_length: int
    score: int
    strength: str
    checks_passed: list[str]
    suggestions: list[str]


def check_password_strength(password: str) -> PasswordResult:
    """Check password strength without saving or sending the password anywhere."""
    if not isinstance(password, str):
        raise TypeError("Password must be text.")

    checks_passed: list[str] = []
    suggestions: list[str] = []
    score = 0
    password_lower = password.lower()

    if len(password) >= 12:
        score += 30
        checks_passed.append("Good length")
    elif len(password) >= 8:
        score += 18
        checks_passed.append("Acceptable length")
        suggestions.append("Use at least 12 characters for stronger protection.")
    else:
        suggestions.append("Use at least 8 characters. 12 or more is better.")

    if re.search(r"[a-z]", password):
        score += 12
        checks_passed.append("Contains lowercase letters")
    else:
        suggestions.append("Add lowercase letters.")

    if re.search(r"[A-Z]", password):
        score += 12
        checks_passed.append("Contains uppercase letters")
    else:
        suggestions.append("Add uppercase letters.")

    if re.search(r"\d", password):
        score += 12
        checks_passed.append("Contains numbers")
    else:
        suggestions.append("Add numbers.")

    if re.search(r"[^A-Za-z0-9]", password):
        score += 14
        checks_passed.append("Contains special characters")
    else:
        suggestions.append("Add special characters such as @, #, $, %, or !.")

    if password_lower not in COMMON_PASSWORDS:
        score += 10
        checks_passed.append("Not found in the small common-password list")
    else:
        suggestions.append("Avoid common passwords such as password, 123456, or qwerty.")

    if not re.search(r"(.)\1{2,}", password):
        score += 5
        checks_passed.append("No repeated character pattern")
    else:
        suggestions.append("Avoid repeating the same character many times.")

    if not re.search(r"(1234|abcd|qwer|asdf)", password_lower):
        score += 5
        checks_passed.append("No simple sequence detected")
    else:
        suggestions.append("Avoid simple sequences such as 1234, abcd, or qwer.")

    score = min(score, 100)
    if score >= 75:
        strength = "Strong"
    elif score >= 45:
        strength = "Medium"
    else:
        strength = "Weak"

    if not password:
        strength = "Weak"
        score = 0
        suggestions = ["Enter a password to check its strength."]

    return PasswordResult(
        password_length=len(password),
        score=score,
        strength=strength,
        checks_passed=checks_passed,
        suggestions=suggestions,
    )


def print_result(password: str) -> None:
    result = check_password_strength(password)
    print(f"Password length: {result.password_length}")
    print(f"Score: {result.score}/100")
    print(f"Strength: {result.strength}")
    print("\nChecks passed:")
    for item in result.checks_passed or ["No checks passed yet."]:
        print(f"- {item}")
    print("\nSuggestions:")
    for item in result.suggestions or ["Great work. This password follows the main safety rules."]:
        print(f"- {item}")


if __name__ == "__main__":
    sample_password = input("Enter a password to check: ")
    print_result(sample_password)

