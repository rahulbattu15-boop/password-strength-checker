import pandas as pd

df = pd.read_csv("data/passwords_dataset.csv")

print("Original Shape:", df.shape)

# Remove duplicates
df = df.drop_duplicates()

print("After Removing Duplicates:", df.shape)

# Check missing values
print("\nMissing Values:")
print(df.isnull().sum())

# Save cleaned dataset
df.to_csv("data/cleaned_passwords_dataset.csv", index=False)

print("\nCleaned dataset saved successfully!")