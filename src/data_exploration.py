import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("data/passwords_dataset.csv")

# Graph 1
plt.figure()
df["Strength"].value_counts().plot(kind="bar")
plt.title("Password Strength Distribution")
plt.savefig("docs/strength_distribution.png")

# Graph 2
plt.figure()
df["Length"].hist(bins=20)
plt.title("Password Length Distribution")
plt.savefig("docs/password_length_distribution.png")

print("Graphs saved successfully!")