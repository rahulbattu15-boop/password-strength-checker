from __future__ import annotations

from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
RAW_DATA = ROOT / "data" / "passwords_dataset.csv"
CLEAN_DATA = ROOT / "data" / "cleaned_passwords_dataset.csv"
DOCS = ROOT / "docs"


def main() -> None:
    df = pd.read_csv(RAW_DATA)
    original_shape = df.shape

    df = df.drop_duplicates().copy()
    df["Password"] = df["Password"].fillna("").astype(str)
    df["Length"] = df["Password"].str.len()
    df["Has Lowercase"] = df["Password"].str.contains(r"[a-z]", regex=True)
    df["Has Uppercase"] = df["Password"].str.contains(r"[A-Z]", regex=True)
    df["Has Special Character"] = df["Password"].str.contains(r"[^A-Za-z0-9]", regex=True)

    if "Strength" not in df.columns:
        df["Strength"] = "Unknown"
    df["Strength"] = df["Strength"].fillna("Unknown").astype(str).str.title()

    CLEAN_DATA.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(CLEAN_DATA, index=False)

    DOCS.mkdir(parents=True, exist_ok=True)
    report = [
        "# Day 4: Data Cleaning",
        "",
        f"Original shape: {original_shape[0]} rows x {original_shape[1]} columns",
        f"Cleaned shape: {df.shape[0]} rows x {df.shape[1]} columns",
        f"Duplicate rows removed: {original_shape[0] - df.shape[0]}",
        f"Missing values after cleaning: {int(df.isna().sum().sum())}",
        "",
        "Cleaning steps completed:",
        "",
        "- Removed duplicate rows.",
        "- Filled missing password values with blank text.",
        "- Recalculated password length from the actual password text.",
        "- Recalculated lowercase, uppercase, and special-character flags.",
        "- Standardized the strength label text.",
        "",
        f"Cleaned file saved at `{CLEAN_DATA.as_posix()}`.",
    ]
    (DOCS / "day4_insights.md").write_text("\n".join(report), encoding="utf-8")

    print("Cleaning completed.")
    print(f"Original shape: {original_shape}")
    print(f"Cleaned shape: {df.shape}")
    print(f"Saved: {CLEAN_DATA}")


if __name__ == "__main__":
    main()

