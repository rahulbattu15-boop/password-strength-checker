import pandas as pd

df = pd.read_csv("data/cleaned_passwords_dataset.csv")

# Feature counts
print("Average Password Length:", df["Length"].mean())

print("\nStrength Distribution:")
print(df["Strength"].value_counts())

print("\nPasswords with Uppercase:")
print(df["Has Uppercase"].value_counts())

print("\nPasswords with Special Characters:")
print(df["Has Special Character"].value_counts())