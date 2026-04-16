from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = Path(r"C:\Users\somet\.gemini\antigravity\brain\3415b97b-2274-4af3-88e2-f6129c174729")
OUTPUT_BASE = ROOT / "assets" / "c15" / "vocabulary" / "images" / "split-variants"
TARGET_SIZE = (256, 256)
POSITION_ORDER = ("tl", "tr", "bl", "br")
QUADRANT_BOXES = {
    "tl": (0, 0, 512, 512),
    "tr": (512, 0, 1024, 512),
    "bl": (0, 512, 512, 1024),
    "br": (512, 512, 1024, 1024),
}
FONT_BOLD = Path(r"C:\Windows\Fonts\malgunbd.ttf")

INITIALS = [
    "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
    "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
]

SHEETS: list[tuple[str, list[str]]] = [
    (
        "korean_house_issues_1_1776337644405.png",
        ["수돗물이 안 나오다", "전기가 나가다", "변기가 막히다", "물이 새다"],
    ),
    (
        "korean_house_issues_2_1776337657492.png",
        ["소음이 심하다", "난방이 안 되다", "이상한 냄새가 나다", "물이 안 내려가다"],
    ),
    (
        "contract_management_1_1776337670196.png",
        ["계약서", "보증금", "계약 기간", "계약하다"],
    ),
    (
        "contract_management_2_1776337680324.png",
        ["포함되다", "공과금", "납부하다", "연체료"],
    ),
    (
        "living_expenses_1_1776337709497.png",
        ["지출", "수입", "늘다", "줄다"],
    ),
    (
        "living_expenses_2_1776337724344.png",
        ["아끼다", "절약하다", "낭비하다", "저축하다"],
    ),
]

FALLBACK_INDEX = 17
FALLBACK_WORD = "밀리다"
FALLBACK_SOURCE = ("contract_management_2_1776337680324.png", "br")


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
    max_size: int = 36,
    min_size: int = 18,
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

        line_height = draw.textbbox((0, 0), "가", font=font)[3] + 4
        total_height = line_height * len(lines)
        widest = max(draw.textbbox((0, 0), line, font=font)[2] for line in lines)
        if widest <= max_width and total_height <= max_height:
            return font, lines

    fallback_font = choose_font(min_size)
    return fallback_font, [text]


def split_crop(sheet_path: Path, position: str) -> Image.Image:
    with Image.open(sheet_path) as source:
        crop = source.convert("RGB").crop(QUADRANT_BOXES[position])
        return crop.resize(TARGET_SIZE, Image.Resampling.LANCZOS)


def detect_label_inner_rect(image: Image.Image) -> tuple[int, int, int, int]:
    arr = np.asarray(image.convert("RGB"))
    height, width, _ = arr.shape
    search_height = min(140, height)
    search = arr[:search_height]
    white_mask = (
        (search[:, :, 0] > 232)
        & (search[:, :, 1] > 232)
        & (search[:, :, 2] > 232)
    )
    visited = np.zeros(white_mask.shape, dtype=bool)
    candidates: list[tuple[int, tuple[int, int, int, int]]] = []

    for y in range(search_height):
        for x in range(width):
            if not white_mask[y, x] or visited[y, x]:
                continue

            queue = deque([(x, y)])
            visited[y, x] = True
            area = 0
            min_x = max_x = x
            min_y = max_y = y

            while queue:
                current_x, current_y = queue.popleft()
                area += 1
                min_x = min(min_x, current_x)
                max_x = max(max_x, current_x)
                min_y = min(min_y, current_y)
                max_y = max(max_y, current_y)

                for next_x, next_y in (
                    (current_x + 1, current_y),
                    (current_x - 1, current_y),
                    (current_x, current_y + 1),
                    (current_x, current_y - 1),
                ):
                    if (
                        0 <= next_x < width
                        and 0 <= next_y < search_height
                        and white_mask[next_y, next_x]
                        and not visited[next_y, next_x]
                    ):
                        visited[next_y, next_x] = True
                        queue.append((next_x, next_y))

            box_width = max_x - min_x + 1
            box_height = max_y - min_y + 1
            if area < 1800:
                continue
            if not (70 <= box_width <= 220 and 35 <= box_height <= 120):
                continue
            if min_x < 20 or max_x < 120 or max_y > 130:
                continue

            score = area + (max_x * 2) - (min_y * 3)
            candidates.append((score, (min_x, min_y, max_x + 1, max_y + 1)))

    if not candidates:
        raise ValueError("Could not detect label box")

    candidates.sort(reverse=True)
    return candidates[0][1]


def fill_label_inner(draw: ImageDraw.ImageDraw, rect: tuple[int, int, int, int]) -> None:
    left, top, right, bottom = rect
    radius = max(8, min(16, min(right - left, bottom - top) // 5))
    draw.rounded_rectangle(
        rect,
        radius=radius,
        fill=(250, 248, 245),
    )


def draw_label(draw: ImageDraw.ImageDraw, text: str, rect: tuple[int, int, int, int]) -> None:
    left, top, right, bottom = rect
    fill_label_inner(draw, rect)
    font, lines = wrap_text(draw, text, right - left - 24, bottom - top - 24)
    line_height = draw.textbbox((0, 0), "가", font=font)[3] + 4
    total_height = line_height * len(lines)
    y = top + ((bottom - top) - total_height) // 2
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        x = left + ((right - left) - (bbox[2] - bbox[0])) // 2
        draw.text((x, y), line, fill=(12, 12, 12), font=font)
        y += line_height


def apply_initials_overlay(image: Image.Image, word: str) -> Image.Image:
    result = image.copy()
    draw = ImageDraw.Draw(result)
    draw_label(draw, extract_initials(word), detect_label_inner_rect(result))
    return result


def apply_masked_overlay(image: Image.Image) -> Image.Image:
    result = image.copy()
    draw = ImageDraw.Draw(result)
    left, top, right, bottom = detect_label_inner_rect(result)
    fill_label_inner(draw, (left, top, right, bottom))
    bar_margin_x = 22
    bar_height = 26
    bar_top = top + ((bottom - top) - bar_height) // 2
    draw.rounded_rectangle(
        (left + bar_margin_x, bar_top, right - bar_margin_x, bar_top + bar_height),
        radius=8,
        fill=(18, 18, 18),
    )
    return result


def apply_full_label_overlay(image: Image.Image, word: str) -> Image.Image:
    result = image.copy()
    draw = ImageDraw.Draw(result)
    draw_label(draw, word, detect_label_inner_rect(result))
    return result


def save_webp(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="WEBP", quality=80, method=6)


def target_name(index: int) -> str:
    sheet = ((index - 1) // 4) + 1
    position = POSITION_ORDER[(index - 1) % 4]
    return f"s{sheet:02d}_{position}_n{index:02d}.webp"


def full_sequence() -> list[tuple[int, str, Image.Image]]:
    sequence: list[tuple[int, str, Image.Image]] = []
    index = 1
    for source_name, words in SHEETS:
        source_path = SOURCE_DIR / source_name
        for position, word in zip(POSITION_ORDER, words, strict=True):
            sequence.append((index, word, split_crop(source_path, position)))
            index += 1
            if index == FALLBACK_INDEX:
                fallback_path = SOURCE_DIR / FALLBACK_SOURCE[0]
                fallback_image = split_crop(fallback_path, FALLBACK_SOURCE[1])
                sequence.append((FALLBACK_INDEX, FALLBACK_WORD, apply_full_label_overlay(fallback_image, FALLBACK_WORD)))
                index += 1
    return sequence


def main() -> None:
    sequence = full_sequence()
    if len(sequence) != 25:
        raise ValueError(f"Expected 25 assets, found {len(sequence)}")

    for index, word, image in sequence:
        filename = target_name(index)
        save_webp(image, OUTPUT_BASE / "full" / filename)
        save_webp(apply_initials_overlay(image, word), OUTPUT_BASE / "initials" / filename)
        save_webp(apply_masked_overlay(image), OUTPUT_BASE / "masked" / filename)
        print(f"{index:02d} {word} -> {filename}")


if __name__ == "__main__":
    main()
