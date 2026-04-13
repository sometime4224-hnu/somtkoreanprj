from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "assets" / "c14" / "grammar" / "images" / "g1-picture-quiz"
CARD_SIZE = (512, 512)
SOURCE_PATTERN = re.compile(r"하도 아서어서 \((\d+)\)\.png$")
POSITIONS = ("tl", "tr", "bl", "br")

SCENES = [
    {"slug": "eat", "word": "먹다", "sheet": 1, "position": "tl"},
    {"slug": "run", "word": "달리다", "sheet": 1, "position": "tr"},
    {"slug": "cry", "word": "울다", "sheet": 1, "position": "bl"},
    {"slug": "sleep", "word": "자다", "sheet": 1, "position": "br"},
    {"slug": "spicy", "word": "맵다", "sheet": 2, "position": "tl"},
    {"slug": "scary", "word": "무섭다", "sheet": 2, "position": "tr"},
    {"slug": "sweet", "word": "달다", "sheet": 2, "position": "bl"},
    {"slug": "bored-phone", "word": "심심하다", "sheet": 2, "position": "br"},
    {"slug": "cold", "word": "춥다", "sheet": 3, "position": "tl"},
    {"slug": "hot", "word": "뜨겁다", "sheet": 3, "position": "tr"},
    {"slug": "tired", "word": "힘들다", "sheet": 3, "position": "bl"},
    {"slug": "bored-tv", "word": "심심하다", "sheet": 3, "position": "br"},
    {"slug": "wait", "word": "기다리다", "sheet": 4, "position": "tl"},
    {"slug": "shop", "word": "쇼핑하다", "sheet": 4, "position": "tr"},
    {"slug": "work-out", "word": "운동하다", "sheet": 4, "position": "bl"},
    {"slug": "travel", "word": "여행하다", "sheet": 4, "position": "br"},
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate C14 grammar1 picture-quiz assets from 4 source sheets.")
    parser.add_argument(
        "--source-dir",
        type=Path,
        required=True,
        help="Directory containing '하도 아서어서 (1).png' through '(4).png'.",
    )
    return parser.parse_args()


def discover_sources(source_dir: Path) -> dict[int, Path]:
    found: list[tuple[int, Path]] = []
    for path in source_dir.iterdir():
        if not path.is_file():
            continue
        match = SOURCE_PATTERN.match(path.name)
        if match:
            found.append((int(match.group(1)), path))

    ordered = {index: path for index, path in sorted(found)}
    expected = {1, 2, 3, 4}
    if set(ordered) != expected:
        raise FileNotFoundError(f"Expected sheets {sorted(expected)}, found {sorted(ordered)} in {source_dir}")
    return ordered


def crop_quadrant(image: Image.Image, position: str) -> Image.Image:
    width, height = image.size
    half_w = width // 2
    half_h = height // 2

    if position == "tl":
        box = (0, 0, half_w, half_h)
    elif position == "tr":
        box = (half_w, 0, width, half_h)
    elif position == "bl":
        box = (0, half_h, half_w, height)
    elif position == "br":
        box = (half_w, half_h, width, height)
    else:
        raise ValueError(f"Unknown position: {position}")

    return image.crop(box).resize(CARD_SIZE, Image.Resampling.LANCZOS)


def save_webp(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="WEBP", quality=82, method=6)


def build_filename(index: int, scene: dict[str, str]) -> str:
    return f"g1pq_{index:02d}_{scene['slug']}.webp"


def main() -> None:
    args = parse_args()
    sources = discover_sources(args.source_dir)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    manifest: list[dict[str, str | int]] = []
    for index, scene in enumerate(SCENES, start=1):
        with Image.open(sources[scene["sheet"]]) as sheet_image:
            card = crop_quadrant(sheet_image.convert("RGB"), scene["position"])

        filename = build_filename(index, scene)
        output_path = OUTPUT_DIR / filename
        save_webp(card, output_path)

        manifest.append(
            {
                "id": f"g1pq-{index:02d}",
                "index": index,
                "slug": scene["slug"],
                "word": scene["word"],
                "sheet": scene["sheet"],
                "position": scene["position"],
                "src": f"../assets/c14/grammar/images/g1-picture-quiz/{filename}",
            }
        )
        print(f"{index:02d} {scene['word']} -> {output_path.relative_to(ROOT)}")

    manifest_path = OUTPUT_DIR / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Manifest -> {manifest_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
