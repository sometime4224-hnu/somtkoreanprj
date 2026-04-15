from __future__ import annotations

import json
import math
import shutil
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw


REPO_ROOT = Path(__file__).resolve().parents[1]
COMMON_ROOT = REPO_ROOT / "assets" / "c14" / "misc" / "images" / "living-things-common"
DOWNLOADS = Path.home() / "Downloads"

PLANT_SMALL = REPO_ROOT / "assets" / "c14" / "misc" / "images" / "plant-small-5x5"
BABY_ANIMAL_SMALL = REPO_ROOT / "assets" / "c14" / "misc" / "images" / "baby-animal-small-5x5"

DOWNLOAD_SHEET_DIR = DOWNLOADS / "\ub3d9\uc2dd\ubb3c \uc774\ubbf8\uc9c0 \uc5d0\uc14b_bg_removed"
DOWNLOAD_SMALL_ANIMALS = DOWNLOAD_SHEET_DIR / "\ub3d9\uc2dd\ubb3c \uc774\ubbf8\uc9c0 \uc5d0\uc14b (1)_transparent.png"
DOWNLOAD_MEDIUM_ANIMALS = DOWNLOAD_SHEET_DIR / "\ub3d9\uc2dd\ubb3c \uc774\ubbf8\uc9c0 \uc5d0\uc14b (2)_transparent.png"
DOWNLOAD_SMALL_PLANTS = DOWNLOAD_SHEET_DIR / "\ub3d9\uc2dd\ubb3c \uc774\ubbf8\uc9c0 \uc5d0\uc14b (3)_transparent.png"
DOWNLOAD_MEDIUM_PLANTS = DOWNLOADS / "\uc911\ud615\uc2dd\ubb3c\uc5d0\uc14b_transparent_no_text.png"

PRODUCE_SHEET_DIR = DOWNLOADS / "\uacfc\ucc44\ub958 \uc774\ubbf8\uc9c0 \uc5d0\uc14b_bg_removed"
PRODUCE_FRUIT = PRODUCE_SHEET_DIR / "\uacfc\ucc44\ub958 \uc774\ubbf8\uc9c0 \uc5d0\uc14b (1)_transparent.png"
PRODUCE_VEGETABLE = PRODUCE_SHEET_DIR / "\uacfc\ucc44\ub958 \uc774\ubbf8\uc9c0 \uc5d0\uc14b (2)_transparent_no_text.png"


SMALL_ANIMAL_NAMES = [
    "cartoon-01-puppy",
    "cartoon-02-hen",
    "cartoon-03-pig",
    "cartoon-04-kitten",
    "cartoon-05-bunny",
    "cartoon-06-foal",
    "cartoon-07-lamb",
    "cartoon-08-duckling",
    "cartoon-09-squirrel",
    "cartoon-10-hamster",
    "cartoon-11-mouse",
    "cartoon-12-guinea-pig",
    "cartoon-13-alpaca",
    "cartoon-14-donkey",
    "cartoon-15-goat",
    "cartoon-16-calf",
]

MEDIUM_ANIMAL_NAMES = [
    "farm-01-cow",
    "farm-02-horse",
    "farm-03-water-buffalo",
    "farm-04-sheep",
    "farm-05-alpaca",
    "farm-06-pig",
    "farm-07-donkey",
    "farm-08-camel",
    "farm-09-deer",
]

SMALL_PLANT_NAMES = [
    "sheet-plant-01-red-tulip",
    "sheet-plant-02-pink-carnation",
    "sheet-plant-03-pink-hydrangea",
    "sheet-plant-04-red-geranium",
    "sheet-plant-05-pink-cosmos",
    "sheet-plant-06-pink-rose",
    "sheet-plant-07-pink-sprig",
    "sheet-plant-08-bluebell",
    "sheet-plant-09-lavender-sprig",
    "sheet-plant-10-purple-pansy",
    "sheet-plant-11-white-daisy",
    "sheet-plant-12-blue-cornflower",
    "sheet-plant-13-blue-bellflower",
    "sheet-plant-14-purple-pansy",
    "sheet-plant-15-sunflower",
    "sheet-plant-16-orange-marigold",
    "sheet-plant-17-yellow-marigold",
    "sheet-plant-18-yellow-blossom",
    "sheet-plant-19-yellow-daisy",
    "sheet-plant-20-orange-lily",
    "sheet-plant-21-orange-tiger-lily",
    "sheet-plant-22-yellow-button-flower",
    "sheet-plant-23-green-sprout",
    "sheet-plant-24-green-sprout-tall",
    "sheet-plant-25-pink-hydrangea-bush",
    "sheet-plant-26-white-clover-flower",
    "sheet-plant-27-white-baby-breath",
    "sheet-plant-28-white-sprig",
    "sheet-plant-29-grass-tuft",
    "sheet-plant-30-ornamental-grass",
    "sheet-plant-31-lavender-bush",
    "sheet-plant-32-clover-patch",
    "sheet-plant-33-fern-leaf",
    "sheet-plant-34-fern-frond",
    "sheet-plant-35-moss-patch",
]

MEDIUM_PLANT_NAMES = [
    "medium-plant-01-oak-tree",
    "medium-plant-02-maple-tree",
    "medium-plant-03-pine-tree",
    "medium-plant-04-cherry-blossom-tree",
    "medium-plant-05-palm-tree",
    "medium-plant-06-coconut-palm",
    "medium-plant-07-bamboo",
    "medium-plant-08-apple-tree",
    "medium-plant-09-silver-birch",
    "medium-plant-10-fiddle-leaf-fig",
]

PRODUCE_FRUIT_NAMES = [
    "produce-fruit-01-red-apple",
    "produce-fruit-02-green-apple",
    "produce-fruit-03-pear",
    "produce-fruit-04-strawberry",
    "produce-fruit-05-strawberry-alt",
    "produce-fruit-06-peeled-banana",
    "produce-fruit-07-banana",
    "produce-fruit-08-watermelon-slice",
    "produce-fruit-09-watermelon",
    "produce-fruit-10-orange",
    "produce-fruit-11-purple-grapes",
    "produce-fruit-12-green-grapes",
    "produce-fruit-13-lemon",
    "produce-fruit-14-lime",
    "produce-fruit-15-blueberry",
    "produce-fruit-16-green-pear",
    "produce-fruit-17-peach",
    "produce-fruit-18-cherry",
    "produce-fruit-19-cherries",
    "produce-fruit-20-mango",
    "produce-fruit-21-pineapple",
    "produce-fruit-22-honeydew-slice",
    "produce-fruit-23-raspberry",
    "produce-fruit-24-kiwi",
    "produce-fruit-25-plum",
    "produce-fruit-26-tangerine",
    "produce-fruit-27-lychee",
    "produce-fruit-28-mangosteen",
]

PRODUCE_VEGETABLE_NAMES = [
    "produce-vegetable-01-napa-cabbage",
    "produce-vegetable-02-carrot",
    "produce-vegetable-03-green-onion",
    "produce-vegetable-04-onion",
    "produce-vegetable-05-garlic",
    "produce-vegetable-06-shallot",
    "produce-vegetable-07-green-chili",
    "produce-vegetable-08-broccoli",
    "produce-vegetable-09-cauliflower",
    "produce-vegetable-10-radish",
    "produce-vegetable-11-spinach",
    "produce-vegetable-12-lettuce",
    "produce-vegetable-13-zucchini",
    "produce-vegetable-14-red-chili",
    "produce-vegetable-15-shiitake-mushroom",
    "produce-vegetable-16-yellow-bell-pepper",
    "produce-vegetable-17-red-bell-pepper",
    "produce-vegetable-18-asparagus",
    "produce-vegetable-19-eggplant",
    "produce-vegetable-20-beet",
    "produce-vegetable-21-turnip",
    "produce-vegetable-22-sweet-potato",
    "produce-vegetable-23-sweet-potato-alt",
    "produce-vegetable-24-potato",
    "produce-vegetable-25-cucumber",
    "produce-vegetable-26-green-pea",
    "produce-vegetable-27-snap-peas",
    "produce-vegetable-28-corn",
]


def rel(path: Path) -> str:
    return str(path.relative_to(COMMON_ROOT)).replace("\\", "/")


def ensure_source(path: Path) -> None:
    if not path.exists():
        raise FileNotFoundError(f"Required source is missing: {path}")


def reset_common_subdir(path: Path) -> None:
    resolved_root = COMMON_ROOT.resolve()
    resolved_path = path.resolve()
    if not resolved_path.is_relative_to(resolved_root):
        raise ValueError(f"Refusing to reset path outside common asset root: {path}")
    if path.exists():
        shutil.rmtree(path)
    path.mkdir(parents=True, exist_ok=True)


def load_rgba(path: Path) -> Image.Image:
    ensure_source(path)
    return Image.open(path).convert("RGBA")


def alpha_bbox(image: Image.Image, threshold: int = 8, pad: int = 8) -> tuple[int, int, int, int] | None:
    alpha = np.array(image.getchannel("A"))
    points = np.argwhere(alpha > threshold)
    if points.size == 0:
        return None
    y0, x0 = points.min(axis=0)
    y1, x1 = points.max(axis=0) + 1
    return max(0, x0 - pad), max(0, y0 - pad), min(image.width, x1 + pad), min(image.height, y1 + pad)


def remove_edge_specks(image: Image.Image, max_area: int = 600) -> Image.Image:
    arr = np.array(image.convert("RGBA"))
    alpha = arr[:, :, 3]
    mask = (alpha > 8).astype(np.uint8)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(mask, connectivity=8)
    height, width = alpha.shape
    for label in range(1, count):
        x, y, w, h, area = [int(value) for value in stats[label, :5]]
        touches_edge = x <= 1 or y <= 1 or x + w >= width - 1 or y + h >= height - 1
        if touches_edge and area <= max_area:
            alpha[labels == label] = 0
    arr[:, :, 3] = alpha
    return Image.fromarray(arr, "RGBA")


def save_crop(image: Image.Image, out_path: Path, pad: int = 8, clean_edge_specks: bool = False) -> tuple[int, int]:
    bbox = alpha_bbox(image, pad=pad)
    if bbox is None:
        raise ValueError(f"No visible pixels found for {out_path.name}")
    crop = image.crop(bbox)
    if clean_edge_specks:
        crop = remove_edge_specks(crop)
        recrop = alpha_bbox(crop, pad=0)
        if recrop is not None:
            crop = crop.crop(recrop)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    crop.save(out_path)
    return crop.size


def copy_generated_set(source_root: Path, dest_dir: Path, source_key: str, group: str) -> list[dict]:
    manifest_path = source_root / "manifest.json"
    ensure_source(manifest_path)
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    items = []
    for entry in manifest["items"]:
        source_file = source_root / entry["file"]
        ensure_source(source_file)
        dest_file = dest_dir / Path(entry["file"]).name
        dest_file.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source_file, dest_file)
        image = Image.open(dest_file)
        items.append(
            {
                "id": entry["id"],
                "file": rel(dest_file),
                "group": group,
                "source": source_key,
                "width": image.width,
                "height": image.height,
                "category": entry.get("category"),
                "color": entry.get("color"),
                "species": entry.get("species"),
            }
        )
    return items


def split_connected_components(
    source_path: Path,
    names: list[str],
    dest_dir: Path,
    group: str,
    source_key: str,
    min_area: int = 1000,
    pad: int = 10,
    row_major_columns: int | None = None,
) -> list[dict]:
    image = load_rgba(source_path)
    alpha = np.array(image.getchannel("A"))
    mask = (alpha > 8).astype(np.uint8)
    count, labels, stats, cents = cv2.connectedComponentsWithStats(mask, connectivity=8)
    components = []
    for label in range(1, count):
        area = int(stats[label, cv2.CC_STAT_AREA])
        if area < min_area:
            continue
        x, y, w, h = [int(value) for value in stats[label, :4]]
        components.append((y, x, w, h, area, label, float(cents[label][0]), float(cents[label][1])))
    if row_major_columns:
        rows = []
        by_centroid_y = sorted(components, key=lambda item: item[7])
        for index in range(0, len(by_centroid_y), row_major_columns):
            rows.append(sorted(by_centroid_y[index : index + row_major_columns], key=lambda item: item[6]))
        components = [component for row in rows for component in row]
    else:
        components.sort(key=lambda item: (item[0], item[1]))
    if len(components) != len(names):
        raise ValueError(f"{source_path.name}: expected {len(names)} components, found {len(components)}")

    items = []
    arr = np.array(image)
    for name, (_, _, _, _, area, label, cx, cy) in zip(names, components):
        comp_mask = labels == label
        comp_alpha = np.where(comp_mask, arr[:, :, 3], 0).astype(np.uint8)
        comp = arr.copy()
        comp[:, :, 3] = comp_alpha
        comp_image = Image.fromarray(comp, "RGBA")
        dest_file = dest_dir / f"{name}.png"
        width, height = save_crop(comp_image, dest_file, pad=pad)
        items.append(
            {
                "id": name,
                "file": rel(dest_file),
                "group": group,
                "source": source_key,
                "width": width,
                "height": height,
                "sourceArea": area,
                "sourceCentroid": [round(cx, 1), round(cy, 1)],
            }
        )
    return items


def split_grid(
    source_path: Path,
    names: list[str],
    columns: int,
    rows: int,
    dest_dir: Path,
    group: str,
    source_key: str,
    pad: int = 10,
    clean_edge_specks: bool = False,
) -> list[dict]:
    image = load_rgba(source_path)
    if len(names) != columns * rows:
        raise ValueError(f"{source_path.name}: names do not match grid size")
    items = []
    cell_w = image.width / columns
    cell_h = image.height / rows
    for index, name in enumerate(names):
        col = index % columns
        row = index // columns
        left = int(round(col * cell_w))
        top = int(round(row * cell_h))
        right = int(round((col + 1) * cell_w))
        bottom = int(round((row + 1) * cell_h))
        cell = image.crop((left, top, right, bottom))
        dest_file = dest_dir / f"{name}.png"
        width, height = save_crop(cell, dest_file, pad=pad, clean_edge_specks=clean_edge_specks)
        items.append(
            {
                "id": name,
                "file": rel(dest_file),
                "group": group,
                "source": source_key,
                "width": width,
                "height": height,
                "sourceGrid": {"row": row, "column": col, "columns": columns, "rows": rows},
            }
        )
    return items


def write_readme(item_count: int) -> None:
    readme = COMMON_ROOT / "README.md"
    readme.write_text(
        "\n".join(
            [
                "# Living Things Common Assets",
                "",
                "Reusable transparent PNG assets for C14 activities and future work.",
                "",
                "Folders:",
                "- `animals/baby-small`: generated small baby animal assets.",
                "- `animals/cartoon-small`: split cartoon animal assets from the processed download sheet.",
                "- `animals/farm-medium`: split medium farm/wild animal assets from the processed download sheet.",
                "- `plants/generated-small`: generated small plant assets.",
                "- `plants/sheet-small`: split small plant and flower assets from the processed download sheet.",
                "- `plants/medium`: split medium plant and tree assets from the processed download sheet with text removed.",
                "- `plants/produce-fruit`: split fruit assets from the processed produce download sheet.",
                "- `plants/produce-vegetable`: split vegetable assets from the processed produce download sheet with grid/text removed.",
                "",
                f"Total PNG items: {item_count}",
                "",
                "All item files are PNG RGBA and are intended to have transparent backgrounds.",
                "Use `manifest.json` for file paths, dimensions, groups, and source notes.",
                "",
            ]
        ),
        encoding="utf-8",
    )


def build_preview(items: list[dict]) -> Path:
    thumbs = []
    for item in items:
        image = Image.open(COMMON_ROOT / item["file"]).convert("RGBA")
        image.thumbnail((80, 80), Image.Resampling.LANCZOS)
        thumbs.append((item, image.copy()))

    cols = 12
    tile = 104
    label_h = 16
    rows = math.ceil(len(thumbs) / cols)
    preview = Image.new("RGBA", (cols * tile, rows * (tile + label_h)), (68, 96, 91, 255))
    draw = ImageDraw.Draw(preview)
    for index, (item, image) in enumerate(thumbs):
        col = index % cols
        row = index // cols
        x = col * tile
        y = row * (tile + label_h)
        preview.alpha_composite(image, (x + (tile - image.width) // 2, y + (tile - image.height) // 2))
        label = item["id"].split("-")[-1][:12]
        draw.text((x + 4, y + tile), label, fill=(235, 242, 238, 255))

    out = REPO_ROOT / ".codex_tmp" / "living-things-common-preview.png"
    out.parent.mkdir(parents=True, exist_ok=True)
    preview.save(out)
    return out


def validate_pngs(items: list[dict]) -> dict:
    errors = []
    transparent_count = 0
    for item in items:
        path = COMMON_ROOT / item["file"]
        image = Image.open(path)
        if image.mode != "RGBA":
            errors.append(f"{item['file']}: not RGBA ({image.mode})")
        alpha = image.getchannel("A")
        hist = alpha.histogram()
        if hist[0] > 0:
            transparent_count += 1
        if alpha.getextrema() == (255, 255):
            errors.append(f"{item['file']}: no transparent pixels")
    return {"errors": errors, "itemsWithTransparentPixels": transparent_count}


def main() -> None:
    COMMON_ROOT.mkdir(parents=True, exist_ok=True)
    for subdir in [
        COMMON_ROOT / "animals" / "baby-small",
        COMMON_ROOT / "animals" / "cartoon-small",
        COMMON_ROOT / "animals" / "farm-medium",
        COMMON_ROOT / "plants" / "generated-small",
        COMMON_ROOT / "plants" / "medium",
        COMMON_ROOT / "plants" / "produce-fruit",
        COMMON_ROOT / "plants" / "produce-vegetable",
        COMMON_ROOT / "plants" / "sheet-small",
    ]:
        reset_common_subdir(subdir)

    items: list[dict] = []

    items.extend(copy_generated_set(PLANT_SMALL, COMMON_ROOT / "plants" / "generated-small", "generated-plant-small-5x5", "plants/generated-small"))
    items.extend(copy_generated_set(BABY_ANIMAL_SMALL, COMMON_ROOT / "animals" / "baby-small", "generated-baby-animal-small-5x5", "animals/baby-small"))

    items.extend(
        split_connected_components(
            DOWNLOAD_SMALL_ANIMALS,
            SMALL_ANIMAL_NAMES,
            COMMON_ROOT / "animals" / "cartoon-small",
            "animals/cartoon-small",
            "download-dongsikmul-1-bg-removed",
            min_area=1000,
            pad=10,
        )
    )
    items.extend(
        split_grid(
            DOWNLOAD_MEDIUM_ANIMALS,
            MEDIUM_ANIMAL_NAMES,
            columns=3,
            rows=3,
            dest_dir=COMMON_ROOT / "animals" / "farm-medium",
            group="animals/farm-medium",
            source_key="download-dongsikmul-2-bg-removed",
            pad=10,
            clean_edge_specks=True,
        )
    )
    items.extend(
        split_grid(
            DOWNLOAD_SMALL_PLANTS,
            SMALL_PLANT_NAMES,
            columns=7,
            rows=5,
            dest_dir=COMMON_ROOT / "plants" / "sheet-small",
            group="plants/sheet-small",
            source_key="download-dongsikmul-3-bg-removed",
            pad=10,
        )
    )
    items.extend(
        split_grid(
            DOWNLOAD_MEDIUM_PLANTS,
            MEDIUM_PLANT_NAMES,
            columns=5,
            rows=2,
            dest_dir=COMMON_ROOT / "plants" / "medium",
            group="plants/medium",
            source_key="download-medium-plant-transparent-no-text",
            pad=12,
        )
    )
    items.extend(
        split_connected_components(
            PRODUCE_FRUIT,
            PRODUCE_FRUIT_NAMES,
            COMMON_ROOT / "plants" / "produce-fruit",
            "plants/produce-fruit",
            "download-produce-1-bg-removed",
            min_area=250,
            pad=10,
            row_major_columns=7,
        )
    )
    items.extend(
        split_grid(
            PRODUCE_VEGETABLE,
            PRODUCE_VEGETABLE_NAMES,
            columns=7,
            rows=4,
            dest_dir=COMMON_ROOT / "plants" / "produce-vegetable",
            group="plants/produce-vegetable",
            source_key="download-produce-2-bg-grid-text-removed",
            pad=10,
            clean_edge_specks=True,
        )
    )

    validation = validate_pngs(items)
    manifest = {
        "name": "living-things-common",
        "description": "Reusable common plant and animal PNG assets split from generated and processed source sheets.",
        "format": "PNG RGBA",
        "transparentBackground": True,
        "root": "assets/c14/misc/images/living-things-common",
        "itemCount": len(items),
        "groups": sorted({item["group"] for item in items}),
        "notes": [
            "Download sheet (4) was skipped because it duplicates download sheet (1).",
            "Medium plant labels were removed before splitting.",
            "Produce vegetable grid and labels were removed before splitting.",
        ],
        "validation": validation,
        "items": items,
    }
    (COMMON_ROOT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    write_readme(len(items))
    preview = build_preview(items)

    if validation["errors"]:
        raise RuntimeError("\n".join(validation["errors"]))

    print(f"wrote {len(items)} PNG assets")
    print(COMMON_ROOT)
    print(preview)


if __name__ == "__main__":
    main()
