from __future__ import annotations

from pathlib import Path

import pandas as pd
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "passwords_dataset.csv"
DOCS = ROOT / "docs"


def draw_bar_chart(values: pd.Series, title: str, output: Path) -> None:
    width, height = 900, 540
    left, top, bottom, right = 110, 80, 95, 45
    plot_width = width - left - right
    plot_height = height - top - bottom
    max_value = max(int(values.max()), 1)
    colors = ["#0f766e", "#b45309", "#b42318", "#2563eb"]

    image = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(image)
    font = ImageFont.load_default()
    draw.text((left, 30), title, fill="#111827", font=font)
    draw.line((left, top, left, top + plot_height), fill="#334155", width=2)
    draw.line((left, top + plot_height, left + plot_width, top + plot_height), fill="#334155", width=2)

    slot = plot_width / max(len(values), 1)
    bar_width = min(120, slot * 0.55)
    for index, (label, value) in enumerate(values.items()):
        bar_height = int((int(value) / max_value) * (plot_height - 20))
        x0 = int(left + index * slot + (slot - bar_width) / 2)
        y0 = top + plot_height - bar_height
        x1 = int(x0 + bar_width)
        y1 = top + plot_height
        draw.rectangle((x0, y0, x1, y1), fill=colors[index % len(colors)])
        draw.text((x0, y0 - 20), str(int(value)), fill="#111827", font=font)
        draw.text((x0, y1 + 12), str(label), fill="#111827", font=font)

    image.save(output)


def main() -> None:
    DOCS.mkdir(parents=True, exist_ok=True)
    df = pd.read_csv(DATA)

    strength_counts = df["Strength"].value_counts()
    length_groups = pd.cut(
        df["Length"],
        bins=[0, 6, 10, 14, 100],
        labels=["1-6", "7-10", "11-14", "15+"],
        include_lowest=True,
    ).value_counts().sort_index()

    draw_bar_chart(strength_counts, "Password Strength Distribution", DOCS / "strength_distribution.png")
    draw_bar_chart(length_groups, "Password Length Distribution", DOCS / "password_length_distribution.png")

    insights = [
        "# Day 3: Data Exploration",
        "",
        f"Dataset shape: {df.shape[0]} rows x {df.shape[1]} columns",
        "",
        "## Columns",
        "",
        ", ".join(df.columns),
        "",
        "## Missing Values",
        "",
    ]
    for column, value in df.isna().sum().items():
        insights.append(f"- {column}: {int(value)}")

    insights.extend(
        [
            "",
            "## Key Findings",
            "",
            f"- Average password length: {df['Length'].mean():.2f}",
            f"- Shortest password length: {int(df['Length'].min())}",
            f"- Longest password length: {int(df['Length'].max())}",
            f"- Strength distribution: {strength_counts.to_dict()}",
            "- Longer passwords and a mix of character types usually improve password strength.",
            "",
            "## Charts",
            "",
            "- `docs/strength_distribution.png`",
            "- `docs/password_length_distribution.png`",
        ]
    )
    (DOCS / "day3_insights.md").write_text("\n".join(insights), encoding="utf-8")

    print("Exploration completed.")
    print(f"Rows: {df.shape[0]}")
    print("Charts saved in docs folder.")


if __name__ == "__main__":
    main()

