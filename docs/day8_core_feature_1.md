# Day 8: Core Feature 1

## Work Done

I have implemented the first core feature: Password scoring.

Password scoring evaluates the following criteria:

- Length of the password
- Lowercase letters
- Uppercase letters
- Numbers
- Special characters
- Common password
- Repeated characters
- Sequence of characters

## Manual Testing

- Blank password: Displays Weak with a message to provide a password.
- 123456: Displayed Weak as it is common and sequence of characters.
- password: Displayed Weak as it is common password.
- Rahul2026: Displayed Medium as it has alphabets and digits but not a special character.
- Rahul@2026#Secure: Displayed Strong as it has good length and variety of characters.

## Conclusion

First core feature has been implemented successfully. It provides a score out of 100 and strength category as Weak, Medium or Strong.