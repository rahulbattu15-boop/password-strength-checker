# Day 8: Core Feature 1

## Work Completed

I implemented the first core feature: password scoring.

The scoring function checks:

- password length
- lowercase letters
- uppercase letters
- numbers
- special characters
- common passwords
- repeated characters
- simple sequences

## Manual Tests

- Empty password: shows Weak with a message to enter a password.
- `123456`: shows Weak because it is common and simple.
- `password`: shows Weak because it is a common password.
- `Rahul2026`: shows Medium because it has letters and numbers but no special character.
- `Rahul@2026#Secure`: shows Strong because it has good length and character variety.

## Result

The first core feature is working. It gives a score out of 100 and a strength label of Weak, Medium, or Strong.
