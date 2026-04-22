from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "backup" / "asset-sources" / "c16-vocabulary-images" / "generated-sheets"
OUTPUT_BASE = ROOT / "assets" / "c16" / "vocabulary" / "images" / "split-variants"
TARGET_SIZE = (256, 256)
POSITION_ORDER = ("tl", "tr", "bl", "br")
FONT_BOLD = Path(r"C:\Windows\Fonts\malgunbd.ttf")
TRIM_MARGIN = 8

INITIALS = [
    "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
    "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
]

SHEETS: list[tuple[str, list[str]]] = [
    (
        "sheet01_emotions_a.png",
        ["마음이 편안해지다", "마음에 여유가 생기다", "신이 나다", "힘이 나다"],
    ),
    (
        "sheet02_emotions_b_and_instruments.png",
        ["가슴이 뛰다", "마음이 설레다", "피아노", "바이올린"],
    ),
    (
        "sheet03_instruments_and_bowing.png",
        ["트럼펫", "기타", "드럼", "켜다"],
    ),
    (
        "sheet04_playing_actions.png",
        ["누르다", "불다", "튕기다", "치다"],
    ),
    (
        "sheet05_basic_shapes.png",
        ["세모", "네모", "동그라미", "마름모"],
    ),
    (
        "sheet06_shape_descriptors.png",
        ["둥글다", "평평하다", "뾰족하다", "울퉁불퉁하다"],
    ),
    (
        "sheet07_texture_descriptors.png",
        ["딱딱하다", "매끄럽다", "부드럽다", "거칠다"],
    ),
]

VARIANT_SHEETS: dict[str, list[tuple[str, list[str]]]] = {
    "female": [
        (
            "sheet01_emotions_a_female.png",
            ["마음이 편안해지다", "마음에 여유가 생기다", "신이 나다", "힘이 나다"],
        ),
        (
            "sheet03_instruments_and_bowing_female.png",
            ["트럼펫", "기타", "드럼", "켜다"],
        ),
        (
            "sheet04_playing_actions_female.png",
            ["누르다", "불다", "튕기다", "치다"],
        ),
    ],
    "male": [
        (
            "sheet02_emotions_b_and_instruments_male.png",
            ["가슴이 뛰다", "마음이 설레다", "피아노", "바이올린"],
        ),
    ],
}


def build_word_index_map() -> dict[str, int]:
    mapping: dict[str, int] = {}
    index = 1
    for _, words in SHEETS:
        for word in words:
            mapping[word] = index
            index += 1
    return mapping


WORD_TO_INDEX = build_word_index_map()

DEFAULT_LABEL_STYLE: dict[str, int | str] = {
    "anchor": "top-center",
    "max_width": 188,
    "max_height": 60,
    "max_size": 30,
    "min_size": 14,
    "box_min_width": 108,
    "box_horizontal_padding": 26,
    "box_vertical_padding": 16,
    "box_min_height": 42,
    "box_max_height": 72,
    "x_margin": 14,
    "top": 10,
}

LABEL_STYLE_OVERRIDES: dict[str, dict[str, int | str]] = {
    "누르다": {"anchor": "top-right"},
    "불다": {"anchor": "top-left"},
    "튕기다": {"anchor": "top-right"},
    "치다": {"anchor": "top-right"},
    "켜다": {"anchor": "top-right"},
    "뾰족하다": {
        "anchor": "top-right",
        "max_size": 22,
        "min_size": 12,
        "max_width": 132,
        "box_min_width": 80,
        "box_horizontal_padding": 16,
        "box_vertical_padding": 12,
        "box_min_height": 36,
        "box_max_height": 60,
        "x_margin": 0,
        "top": 6,
    },
}


def choose_font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_BOLD), size=size)


def extract_initials(text: str) -> str:
    parts: list[str] = []
    for char in text:
        code = ord(char)
        if char == " ":
            parts.append(" ")
        elif 0xAC00 <= code <= 0xD7A3:
            parts.append(INITIALS[(code - 0xAC00) // 588])
        else:
            parts.append(char)
    return "".join(parts)


def wrap_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    max_width: int,
    max_height: int,
    max_size: int = 30,
    min_size: int = 14,
) -> tuple[ImageFont.FreeTypeFont, list[str]]:
    tokens = text.split(" ")
    for size in range(max_size, min_size - 1, -2):
        font = choose_font(size)
        lines: list[str] = []
        current = ""
        for token in tokens:
            candidate = token if not current else f"{current} {token}"
            width = draw.textbbox((0, 0), candidate, font=font)[2]
            if width <= max_width:
                current = candidate
            else:
                if current:
                    lines.append(current)
                current = token
        if current:
            lines.append(current)

        if not lines:
            continue

        line_height = draw.textbbox((0, 0), "가", font=font)[3] + 2
        total_height = line_height * len(lines)
        widest = max(draw.textbbox((0, 0), line, font=font)[2] for line in lines)
        if widest <= max_width and total_height <= max_height:
            return font, lines

    return choose_font(min_size), [text]


def source_quadrant_box(image: Image.Image, position: str) -> tuple[int, int, int, int]:
    width, height = image.size
    half_w = width // 2
    half_h = height // 2
    if position == "tl":
        return (TRIM_MARGIN, TRIM_MARGIN, half_w - TRIM_MARGIN, half_h - TRIM_MARGIN)
    if position == "tr":
        return (half_w + TRIM_MARGIN, TRIM_MARGIN, width - TRIM_MARGIN, half_h - TRIM_MARGIN)
    if position == "bl":
        return (TRIM_MARGIN, half_h + TRIM_MARGIN, half_w - TRIM_MARGIN, height - TRIM_MARGIN)
    return (half_w + TRIM_MARGIN, half_h + TRIM_MARGIN, width - TRIM_MARGIN, height - TRIM_MARGIN)


def split_crop(sheet_path: Path, position: str) -> Image.Image:
    with Image.open(sheet_path) as source:
        crop = source.convert("RGB").crop(source_quadrant_box(source, position))
        return crop.resize(TARGET_SIZE, Image.Resampling.LANCZOS)


def label_style_for(word: str) -> dict[str, int | str]:
    style = dict(DEFAULT_LABEL_STYLE)
    style.update(LABEL_STYLE_OVERRIDES.get(word, {}))
    return style


def compute_label_layout(
    image: Image.Image,
    text: str,
    *,
    word: str,
) -> tuple[tuple[int, int, int, int], ImageFont.FreeTypeFont, list[str], int]:
    style = label_style_for(word)
    measure_draw = ImageDraw.Draw(Image.new("RGB", image.size, "white"))
    font, lines = wrap_text(
        measure_draw,
        text,
        max_width=min(int(style["max_width"]), image.width - (int(style["x_margin"]) * 2) - 8),
        max_height=int(style["max_height"]),
        max_size=int(style["max_size"]),
        min_size=int(style["min_size"]),
    )
    line_height = measure_draw.textbbox((0, 0), "가", font=font)[3] + 2
    widest = max(measure_draw.textbbox((0, 0), line, font=font)[2] for line in lines)
    content_height = line_height * len(lines)
    box_width = min(
        image.width - (int(style["x_margin"]) * 2),
        max(int(style["box_min_width"]), widest + int(style["box_horizontal_padding"])),
    )
    box_height = min(
        int(style["box_max_height"]),
        max(int(style["box_min_height"]), content_height + int(style["box_vertical_padding"])),
    )

    anchor = str(style["anchor"])
    if anchor == "top-left":
        left = int(style["x_margin"])
    elif anchor == "top-right":
        left = image.width - int(style["x_margin"]) - box_width
    else:
        left = (image.width - box_width) // 2

    top = int(style["top"])
    return (left, top, left + box_width, top + box_height), font, lines, line_height


def draw_label_box(draw: ImageDraw.ImageDraw, rect: tuple[int, int, int, int]) -> None:
    draw.rounded_rectangle(
        rect,
        radius=12,
        fill=(251, 248, 244),
        outline=(24, 24, 24),
        width=2,
    )


def draw_label_text(
    draw: ImageDraw.ImageDraw,
    rect: tuple[int, int, int, int],
    font: ImageFont.FreeTypeFont,
    lines: list[str],
    line_height: int,
) -> None:
    left, top, right, bottom = rect
    total_height = line_height * len(lines)
    y = top + ((bottom - top) - total_height) // 2
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        x = left + ((right - left) - (bbox[2] - bbox[0])) // 2
        draw.text((x, y), line, fill=(16, 16, 16), font=font)
        y += line_height


def apply_full_overlay(image: Image.Image, word: str) -> Image.Image:
    result = image.copy()
    draw = ImageDraw.Draw(result)
    rect, font, lines, line_height = compute_label_layout(result, word, word=word)
    draw_label_box(draw, rect)
    draw_label_text(draw, rect, font, lines, line_height)
    return result


def apply_initials_overlay(image: Image.Image, word: str) -> Image.Image:
    result = image.copy()
    draw = ImageDraw.Draw(result)
    rect, font, lines, line_height = compute_label_layout(result, extract_initials(word), word=word)
    draw_label_box(draw, rect)
    draw_label_text(draw, rect, font, lines, line_height)
    return result


def apply_masked_overlay(image: Image.Image, word: str) -> Image.Image:
    result = image.copy()
    draw = ImageDraw.Draw(result)
    left, top, right, bottom = compute_label_layout(result, word, word=word)[0]
    draw_label_box(draw, (left, top, right, bottom))
    bar_height = min(24, bottom - top - 16)
    bar_width = max(72, int((right - left) * 0.56))
    bar_left = left + ((right - left) - bar_width) // 2
    bar_right = bar_left + bar_width
    bar_top = top + ((bottom - top) - bar_height) // 2
    draw.rounded_rectangle(
        (bar_left, bar_top, bar_right, bar_top + bar_height),
        radius=9,
        fill=(16, 16, 16),
    )
    return result


def save_webp(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="WEBP", quality=84, method=6)


def target_name(index: int) -> str:
    sheet = ((index - 1) // 4) + 1
    position = POSITION_ORDER[(index - 1) % 4]
    return f"s{sheet:02d}_{position}_n{index:02d}.webp"


def build_sequence(sheets: list[tuple[str, list[str]]]) -> list[tuple[int, str, Image.Image]]:
    sequence: list[tuple[int, str, Image.Image]] = []
    for sheet_name, words in sheets:
        sheet_path = SOURCE_DIR / sheet_name
        if not sheet_path.exists():
            raise FileNotFoundError(f"Missing source sheet: {sheet_path}")
        for position, word in zip(POSITION_ORDER, words, strict=True):
            sequence.append((WORD_TO_INDEX[word], word, split_crop(sheet_path, position)))
    return sequence


def export_sequence(
    sequence: list[tuple[int, str, Image.Image]],
    *,
    full_dir: str,
    initials_dir: str,
    masked_dir: str,
    label: str,
) -> None:
    for index, word, image in sequence:
        filename = target_name(index)
        save_webp(apply_full_overlay(image, word), OUTPUT_BASE / full_dir / filename)
        save_webp(apply_initials_overlay(image, word), OUTPUT_BASE / initials_dir / filename)
        save_webp(apply_masked_overlay(image, word), OUTPUT_BASE / masked_dir / filename)
        print(f"saved [{label}] {filename} -> {word}")


def main() -> None:
    export_sequence(
        build_sequence(SHEETS),
        full_dir="full",
        initials_dir="initials",
        masked_dir="masked",
        label="default",
    )
    for variant_name, variant_sheets in VARIANT_SHEETS.items():
        export_sequence(
            build_sequence(variant_sheets),
            full_dir=f"full-{variant_name}",
            initials_dir=f"initials-{variant_name}",
            masked_dir=f"masked-{variant_name}",
            label=variant_name,
        )


if __name__ == "__main__":
    main()
