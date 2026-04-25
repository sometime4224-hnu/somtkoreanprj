from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
TMP_DIR = ROOT / ".codex_tmp"
OUT_DIR = ROOT / "assets" / "c15" / "reading-writing" / "images" / "cuttoon"

TMP_SOURCE_SHEETS = [
    TMP_DIR / "c15-cuttoon-source-1.png",
    TMP_DIR / "c15-cuttoon-source-2.png",
]
ASSET_SOURCE_SHEETS = [
    OUT_DIR / "c15-reading-cuttoon-sheet-1.png",
    OUT_DIR / "c15-reading-cuttoon-sheet-2.png",
]

PANEL_SPECS = [
    ("c15-reading-cut01", 0, (14, 11, 512, 400), False),
    ("c15-reading-cut02", 0, (522, 11, 1040, 400), False),
    ("c15-reading-cut03", 0, (14, 413, 512, 765), False),
    ("c15-reading-cut04", 0, (522, 413, 1040, 765), False),
    ("c15-reading-cut05", 0, (14, 778, 512, 1111), False),
    ("c15-reading-cut06", 0, (522, 778, 1040, 1111), False),
    ("c15-reading-cut07", 0, (14, 1123, 1040, 1474), True),
    ("c15-reading-cut08", 1, (15, 12, 507, 415), False),
    ("c15-reading-cut09", 1, (517, 12, 1040, 415), False),
    ("c15-reading-cut10", 1, (15, 429, 507, 828), False),
    ("c15-reading-cut11", 1, (517, 429, 1040, 828), False),
    ("c15-reading-cut12", 1, (15, 842, 507, 1184), False),
    ("c15-reading-cut13", 1, (517, 842, 1040, 1184), False),
    ("c15-reading-cut14", 1, (15, 1198, 1040, 1474), True),
]


def save_png_and_webp(image: Image.Image, stem: str) -> None:
    png_path = OUT_DIR / f"{stem}.png"
    webp_path = OUT_DIR / f"{stem}.webp"
    image.save(png_path)
    image.save(webp_path, "WEBP", quality=88, method=6)
    print(f"saved {png_path.relative_to(ROOT)}")
    print(f"saved {webp_path.relative_to(ROOT)}")


def normalize_panel(panel: Image.Image, wide: bool) -> Image.Image:
    canvas_size = (1024, 576)
    canvas = Image.new("RGB", canvas_size, "#f6f7ef")
    panel = panel.convert("RGB")
    padding = 12 if wide else 34
    max_size = (canvas_size[0] - padding * 2, canvas_size[1] - padding * 2)
    fitted = ImageOps.contain(panel, max_size, Image.Resampling.LANCZOS)
    x = (canvas_size[0] - fitted.width) // 2
    y = (canvas_size[1] - fitted.height) // 2
    canvas.paste(fitted, (x, y))
    return canvas


def resolve_source_sheet(index: int) -> Path:
    if TMP_SOURCE_SHEETS[index].exists():
        return TMP_SOURCE_SHEETS[index]
    if ASSET_SOURCE_SHEETS[index].exists():
        return ASSET_SOURCE_SHEETS[index]
    raise FileNotFoundError(
        f"Missing c15 source sheet {index + 1}. Expected {TMP_SOURCE_SHEETS[index]} or {ASSET_SOURCE_SHEETS[index]}."
    )


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    source_sheets = [resolve_source_sheet(0), resolve_source_sheet(1)]

    for index, source_path in enumerate(source_sheets, start=1):
        with Image.open(source_path) as source:
            sheet = source.convert("RGB")
            save_png_and_webp(sheet, f"c15-reading-cuttoon-sheet-{index}")

    for stem, source_index, crop_box, wide in PANEL_SPECS:
        source_path = source_sheets[source_index]
        with Image.open(source_path) as source:
            panel = source.crop(crop_box)
            normalized = normalize_panel(panel, wide)
            save_png_and_webp(normalized, stem)


if __name__ == "__main__":
    main()
