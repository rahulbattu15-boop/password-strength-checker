from __future__ import annotations

from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
CLEAN_DATA = ROOT / "data" / "cleaned_passwords_dataset.csv"
FEATURE_DATA = ROOT / "data" / "password_features.csv"
DOCS = ROOT / "docs"


def main() -> None:
    df = pd.read_csv(CLEAN_DATA)

    df["Has Number"] = df["Password"].str.contains(r"\d", regex=True)
    df["Character Variety Score"] = (
        df["Has Lowercase"].astype(int)
        + df["Has Uppercase"].astype(int)
        + df["Has Number"].astype(int)
        + df["Has Special Character"].astype(int)
    )
    df["Is Long Password"] = df["Length"] >= 12
    df["Estimated Score"] = (
        df["Length"].clip(upper=20) * 3
        + df["Character Variety Score"] * 10
        + df["Is Long Password"].astype(int) * 15
    ).clip(upper=100)

    df.to_csv(FEATURE_DATA, index=False)

    report = [
        "# Day 5: Feature Engineering",
        "",
        "New features created:",
        "",
        "- `Has Number`: checks whether the password contains digits.",
        "- `Character Variety Score`: counts lowercase, uppercase, number, and special-character categories.",
        "- `Is Long Password`: marks passwords with 12 or more characters.",
        "- `Estimated Score`: simple score from length and character variety.",
        "",
        f"Average password length: {df['Length'].mean():.2f}",
        f"Average character variety score: {df['Character Variety Score'].mean():.2f}",
        f"Average estimated score: {df['Estimated Score'].mean():.2f}",
        "",
        f"Feature dataset saved at `{FEATURE_DATA.as_posix()}`.",
    ]
    DOCS.mkdir(parents=True, exist_ok=True)
    (DOCS / "day5_insights.md").write_text("\n".join(report), encoding="utf-8")

    print("Feature engineering completed.")
    print(f"Saved: {FEATURE_DATA}")


if __name__ == "__main__":
    main()

