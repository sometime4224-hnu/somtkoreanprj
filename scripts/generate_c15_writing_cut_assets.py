from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
TMP_DIR = ROOT / ".codex_tmp"
CUTTOON_DIR = ROOT / "assets" / "c15" / "reading-writing" / "images" / "cuttoon"
OUT_DIR = ROOT / "assets" / "c15" / "reading-writing" / "images" / "writing-cut"

TMP_SOURCE_SHEETS = [
    TMP_DIR / "c15-cuttoon-source-1.png",
    TMP_DIR / "c15-cuttoon-source-2.png",
]
CUTTOON_SOURCE_SHEETS = [
    CUTTOON_DIR / "c15-reading-cuttoon-sheet-1.png",
    CUTTOON_DIR / "c15-reading-cuttoon-sheet-2.png",
]


# body_top removes the reading sentence strip at the top of each panel.
PANEL_SPECS = [
    ("c15-cut01", 0, (14, 11, 512, 400), 68, False),
    ("c15-cut02", 0, (522, 11, 1040, 400), 67, False),
    ("c15-cut03", 0, (14, 413, 512, 765), 64, False),
    ("c15-cut04", 0, (522, 413, 1040, 765), 64, False),
    ("c15-cut05", 0, (14, 778, 512, 1111), 79, False),
    ("c15-cut06", 0, (522, 778, 1040, 1111), 63, False),
    ("c15-cut07", 0, (14, 1123, 1040, 1474), 63, True),
    ("c15-cut08", 1, (15, 12, 507, 415), 69, False),
    ("c15-cut09", 1, (517, 12, 1040, 415), 91, False),
    ("c15-cut10", 1, (15, 429, 507, 828), 65, False),
    ("c15-cut11", 1, (517, 429, 1040, 828), 99, False),
    ("c15-cut12", 1, (15, 842, 507, 1184), 84, False),
    ("c15-cut13", 1, (517, 842, 1040, 1184), 90, False),
    ("c15-cut14", 1, (15, 1198, 1040, 1474), 59, True),
]


def resolve_source_sheet(index: int) -> Path:
    if TMP_SOURCE_SHEETS[index].exists():
        return TMP_SOURCE_SHEETS[index]
    if CUTTOON_SOURCE_SHEETS[index].exists():
        return CUTTOON_SOURCE_SHEETS[index]
    raise FileNotFoundError(
        f"Missing c15 source sheet {index + 1}. Expected {TMP_SOURCE_SHEETS[index]} or {CUTTOON_SOURCE_SHEETS[index]}."
    )


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


def save_webp(image: Image.Image, stem: str) -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OUT_DIR / f"{stem}.webp"
    image.save(out_path, "WEBP", quality=88, method=6)
    print(f"saved {out_path.relative_to(ROOT)}")


def main() -> None:
    source_sheets = [resolve_source_sheet(0), resolve_source_sheet(1)]

    for stem, source_index, crop_box, body_top, wide in PANEL_SPECS:
        with Image.open(source_sheets[source_index]) as source:
            panel = source.convert("RGB").crop(crop_box)
            body_only = panel.crop((0, body_top, panel.width, panel.height))
            normalized = normalize_panel(body_only, wide)
            save_webp(normalized, stem)


if __name__ == "__main__":
    main()
