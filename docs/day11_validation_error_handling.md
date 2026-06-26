# Day 11: Error Handling And Validation

## Work Completed

I added validation and error handling to the password checker.

## Validation Added

- Empty password input is handled safely.
- Spaces-only input is treated as empty.
- Wrong input types are converted safely instead of breaking the checker.
- Score is kept between 0 and 100.
- Common passwords lower the score.
- Repeated characters and simple sequences lower the score.

## Result

The password checker now handles edge cases without crashing and gives clear messages to the user.
