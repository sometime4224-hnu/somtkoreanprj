from __future__ import annotations

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = Path.home() / "Downloads"
OUTPUT_DIR = ROOT / "assets" / "c14" / "listening" / "images" / "cuttoon"


CUTS = [
    {
        "lesson": "listening1",
        "filename": "14과 듣기 그림 소스 (3).png",
        "output": "listening1-cut1.webp",
        "crop": (24, 114, 1358, 767),
    },
    {
        "lesson": "listening1",
        "filename": "14과 듣기 그림 소스 (3).png",
        "output": "listening1-cut2.webp",
        "crop": (1386, 114, 2725, 767),
    },
    {
        "lesson": "listening1",
        "filename": "14과 듣기 그림 소스 (3).png",
        "output": "listening1-cut3.webp",
        "crop": (24, 796, 1358, 1517),
    },
    {
        "lesson": "listening1",
        "filename": "14과 듣기 그림 소스 (3).png",
        "output": "listening1-cut4.webp",
        "crop": (1386, 796, 2725, 1517),
    },
    {
        "lesson": "listening1",
        "filename": "14과 듣기 그림 소스 (2).png",
        "output": "listening1-cut5.webp",
        "crop": (0, 0, 2752, 1536),
    },
    {
        "lesson": "listening2",
        "filename": "14과 듣기 그림 소스 (1).png",
        "output": "listening2-cut1.webp",
        "crop": (23, 14, 928, 753),
    },
    {
        "lesson": "listening2",
        "filename": "14과 듣기 그림 소스 (1).png",
        "output": "listening2-cut2.webp",
        "crop": (957, 14, 1860, 753),
    },
    {
        "lesson": "listening2",
        "filename": "14과 듣기 그림 소스 (1).png",
        "output": "listening2-cut3.webp",
        "crop": (1889, 14, 2792, 753),
    },
    {
        "lesson": "listening2",
        "filename": "14과 듣기 그림 소스 (1).png",
        "output": "listening2-cut4.webp",
        "crop": (23, 783, 928, 1519),
    },
    {
        "lesson": "listening2",
        "filename": "14과 듣기 그림 소스 (1).png",
        "output": "listening2-cut5.webp",
        "crop": (957, 783, 1860, 1519),
    },
    {
        "lesson": "listening2",
        "filename": "14과 듣기 그림 소스 (1).png",
        "output": "listening2-cut6.webp",
        "crop": (1889, 783, 2792, 1519),
    },
]


def export_cut(source_path: Path, output_path: Path, crop_box: tuple[int, int, int, int]) -> None:
    with Image.open(source_path) as image:
        panel = image.crop(crop_box).convert("RGBA")
        panel.save(
            output_path,
            format="WEBP",
            quality=84,
            method=6,
        )


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for spec in CUTS:
        source_path = DOWNLOADS / spec["filename"]
        if not source_path.exists():
            raise FileNotFoundError(f"Missing source image for {spec['lesson']}: {source_path}")

        output_name = spec["output"]
        export_cut(source_path, OUTPUT_DIR / output_name, spec["crop"])
        print(f"Saved {output_name}")


if __name__ == "__main__":
    main()
