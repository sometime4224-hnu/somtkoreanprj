from __future__ import annotations

import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT.parent / "imgcreate" / "korean3B" / "c14"
OUTPUT_BASE = ROOT / "assets" / "c14" / "vocabulary" / "images" / "split-variants"
TARGET_SIZE = (256, 256)
POSITIONS = ("tl", "tr", "bl", "br")
FONT_BOLD = Path(r"C:\Windows\Fonts\malgunbd.ttf")
FONT_REGULAR = Path(r"C:\Windows\Fonts\malgun.ttf")

VOCAB_WORDS = [
    "여유가 있다",
    "여유가 없다",
    "활기차다",
    "평화롭다",
    "공기가 맑다",
    "공해가 심하다",
    "따분하다",
    "시간 가는 줄 모르다",
    "편의 시설이 잘되어 있다",
    "불편하다",
    "정원",
    "잔디",
    "채소",
    "농사",
    "가축",
    "물고기",
    "가꾸다",
    "깎다",
    "심다",
    "키우다",
    "짓다",
    "잡다",
    "사라지다",
    "생기다",
    "변하다",
    "몰라보다",
    "상상이 되다",
    "상상이 안 되다",
]

INITIALS = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]
SOURCE_PATTERN = re.compile(r"^vocab_(\d+)_.*\.(png|jpg|jpeg|webp)$", re.IGNORECASE)


def choose_font(size: int, bold: bool = True) -> ImageFont.FreeTypeFont:
    font_path = FONT_BOLD if bold else FONT_REGULAR
    return ImageFont.truetype(str(font_path), size=size)


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


def wrap_text(draw: ImageDraw.ImageDraw, text: str, max_width: int, max_height: int) -> tuple[ImageFont.FreeTypeFont, list[str]]:
    tokens = text.split(" ")
    for size in range(34, 13, -2):
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

        line_height = draw.textbbox((0, 0), "가", font=font)[3] + 4
        total_height = line_height * len(lines)
        widest = max(draw.textbbox((0, 0), line, font=font)[2] for line in lines)
        if widest <= max_width and total_height <= max_height:
            return font, lines

    fallback_font = choose_font(14)
    return fallback_font, [text]


def resize_source(path: Path) -> Image.Image:
    with Image.open(path) as source:
        return source.convert("RGB").resize(TARGET_SIZE, Image.Resampling.LANCZOS)


def mask_regions_for(index: int) -> list[tuple[int, int, int, int]]:
    if index in {23, 24, 25}:
        return [
            (8, 8, 120, 64),
            (136, 8, 248, 78),
            (8, 136, 120, 192),
            (136, 136, 248, 192),
        ]
    if index == 26:
        return [
            (8, 8, 120, 54),
            (8, 136, 120, 182),
        ]
    if index == 8:
        return [(8, 8, 210, 112)]
    return [(8, 8, 168, 118)]


def draw_cover(draw: ImageDraw.ImageDraw, rect: tuple[int, int, int, int]) -> None:
    draw.rounded_rectangle(rect, radius=14, fill=(250, 248, 245), outline=(227, 227, 227), width=2)


def apply_initials_overlay(image: Image.Image, word: str, index: int) -> Image.Image:
    result = image.copy()
    draw = ImageDraw.Draw(result)
    regions = mask_regions_for(index)
    for rect in regions:
        draw_cover(draw, rect)

    left, top, right, bottom = regions[0]
    font, lines = wrap_text(draw, extract_initials(word), max_width=right - left - 18, max_height=bottom - top - 18)
    line_height = draw.textbbox((0, 0), "가", font=font)[3] + 4
    total_height = line_height * len(lines)
    y = top + ((bottom - top) - total_height) // 2
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        x = left + ((right - left) - (bbox[2] - bbox[0])) // 2
        draw.text((x, y), line, fill=(33, 37, 41), font=font)
        y += line_height
    return result


def apply_masked_overlay(image: Image.Image, index: int) -> Image.Image:
    result = image.copy()
    draw = ImageDraw.Draw(result)
    regions = mask_regions_for(index)
    for rect in regions:
        draw_cover(draw, rect)

    left, top, right, bottom = regions[0]
    bar_margin_x = 16
    bar_height = max(18, (bottom - top) // 4)
    bar_top = top + ((bottom - top) - bar_height) // 2
    draw.rounded_rectangle(
        (left + bar_margin_x, bar_top, right - bar_margin_x, bar_top + bar_height),
        radius=8,
        fill=(18, 18, 18),
    )
    return result


def save_webp(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="WEBP", quality=82, method=6)


def source_files() -> list[Path]:
    files: list[tuple[int, Path]] = []
    for path in SOURCE_DIR.iterdir():
        if not path.is_file():
            continue
        match = SOURCE_PATTERN.match(path.name)
        if match:
            files.append((int(match.group(1)), path))
    files.sort(key=lambda item: item[0])
    ordered = [path for _, path in files]
    if len(ordered) != len(VOCAB_WORDS):
        raise ValueError(f"Expected {len(VOCAB_WORDS)} source images, found {len(ordered)}")
    return ordered


def target_name(index: int) -> str:
    sheet = ((index - 1) // 4) + 1
    position = POSITIONS[(index - 1) % 4]
    return f"s{sheet:02d}_{position}_n{index:02d}.webp"


def main() -> None:
    ordered_sources = source_files()
    for index, (word, source_path) in enumerate(zip(VOCAB_WORDS, ordered_sources), start=1):
        base = resize_source(source_path)
        filename = target_name(index)
        save_webp(base, OUTPUT_BASE / "full" / filename)
        save_webp(apply_initials_overlay(base, word, index), OUTPUT_BASE / "initials" / filename)
        save_webp(apply_masked_overlay(base, index), OUTPUT_BASE / "masked" / filename)
        print(f"{index:02d} {word} -> {filename}")


if __name__ == "__main__":
    main()
