from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from collections import deque

import cv2
import numpy as np
from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "assets" / "c14" / "vocabulary" / "images" / "split-variants" / "single"
OUTPUT_DIR = ROOT / "assets" / "c14" / "grammar" / "images" / "g4-hires-objects"


@dataclass(frozen=True)
class Seed:
    x: int
    y: int
    r: int


@dataclass(frozen=True)
class ObjectConfig:
    name: str
    source: str
    rect: tuple[int, int, int, int]
    fg_seeds: tuple[Seed, ...]
    bg_seeds: tuple[Seed, ...] = ()
    mirror: bool = False
    clip_polygon: tuple[tuple[int, int], ...] | None = None


CONFIGS: tuple[ObjectConfig, ...] = (
    ObjectConfig(
        name="care-sunflower",
        source="s05_tl_n17.webp",
        rect=(190, 420, 430, 850),
        fg_seeds=(
            Seed(316, 532, 34),
            Seed(302, 616, 24),
            Seed(302, 720, 22),
            Seed(272, 642, 20),
            Seed(342, 652, 18),
        ),
        bg_seeds=(
            Seed(204, 438, 26),
            Seed(416, 440, 20),
            Seed(416, 832, 18),
            Seed(204, 832, 18),
        ),
        mirror=True,
        clip_polygon=(
            (92, 52), (130, 50), (162, 66), (181, 97), (176, 135), (157, 161),
            (137, 180), (135, 225), (164, 239), (172, 269), (154, 298), (129, 308),
            (125, 412), (98, 412), (94, 309), (70, 300), (52, 275), (56, 244),
            (86, 224), (88, 181), (58, 172), (41, 145), (39, 111), (58, 80),
        ),
    ),
    ObjectConfig(
        name="farm-seedling",
        source="s04_tr_n14.webp",
        rect=(435, 720, 590, 940),
        fg_seeds=(
            Seed(508, 804, 18),
            Seed(477, 856, 16),
            Seed(532, 858, 16),
            Seed(509, 897, 18),
        ),
        bg_seeds=(
            Seed(447, 731, 16),
            Seed(577, 732, 16),
            Seed(447, 924, 16),
            Seed(577, 924, 16),
        ),
        mirror=True,
        clip_polygon=(
            (64, 44), (78, 31), (95, 38), (101, 70), (118, 84), (118, 106),
            (104, 121), (94, 132), (92, 170), (96, 207), (85, 219), (72, 219),
            (63, 170), (61, 132), (48, 121), (36, 107), (36, 84), (52, 70), (58, 44),
        ),
    ),
    ObjectConfig(
        name="livestock-cow",
        source="s04_bl_n15.webp",
        rect=(500, 400, 910, 780),
        fg_seeds=(
            Seed(684, 514, 40),
            Seed(598, 588, 30),
            Seed(764, 598, 28),
            Seed(565, 497, 22),
            Seed(822, 520, 18),
        ),
        bg_seeds=(
            Seed(516, 416, 18),
            Seed(892, 416, 18),
            Seed(516, 762, 18),
            Seed(892, 762, 18),
        ),
        mirror=True,
        clip_polygon=(
            (16, 122), (52, 80), (82, 35), (123, 12), (205, 14), (284, 24), (338, 51),
            (355, 86), (350, 129), (334, 148), (330, 214), (318, 226), (300, 224),
            (292, 165), (273, 149), (249, 152), (246, 218), (228, 229), (214, 229),
            (208, 176), (191, 166), (166, 164), (156, 219), (136, 227), (120, 225),
            (120, 159), (102, 145), (70, 142), (58, 164), (56, 218), (36, 228),
            (24, 221), (27, 156), (15, 145), (6, 131),
        ),
    ),
    ObjectConfig(
        name="fish-orange",
        source="s04_br_n16.webp",
        rect=(296, 488, 783, 800),
        fg_seeds=(
            Seed(514, 628, 54),
            Seed(642, 629, 40),
            Seed(403, 645, 34),
            Seed(660, 554, 24),
            Seed(657, 725, 24),
        ),
        bg_seeds=(
            Seed(312, 503, 22),
            Seed(768, 503, 22),
            Seed(312, 786, 22),
            Seed(768, 786, 22),
        ),
        mirror=True,
        clip_polygon=(
            (14, 164), (22, 140), (54, 106), (110, 82), (186, 57), (272, 50), (362, 63),
            (424, 93), (468, 130), (474, 160), (456, 181), (423, 201), (367, 211),
            (341, 243), (340, 265), (314, 258), (298, 210), (217, 205), (171, 205),
            (152, 212), (134, 253), (109, 264), (88, 258), (85, 223), (74, 210),
            (41, 197), (19, 182),
        ),
    ),
    ObjectConfig(
        name="vegetable-carrot",
        source="s04_tl_n13.webp",
        rect=(90, 650, 340, 1024),
        fg_seeds=(
            Seed(205, 814, 28),
            Seed(209, 910, 24),
            Seed(180, 860, 16),
            Seed(238, 858, 16),
        ),
        bg_seeds=(
            Seed(104, 668, 18),
            Seed(324, 668, 18),
            Seed(104, 1006, 18),
            Seed(324, 1006, 18),
        ),
        mirror=True,
        clip_polygon=(
            (82, 0), (134, 0), (158, 24), (158, 70), (145, 94), (176, 106),
            (210, 126), (220, 152), (207, 174), (177, 171), (167, 202), (167, 270),
            (156, 322), (140, 346), (108, 352), (86, 332), (90, 283), (80, 211),
            (58, 248), (35, 249), (30, 220), (45, 180), (37, 154), (54, 126),
            (80, 104), (63, 73), (62, 29),
        ),
    ),
)


def build_mask(image_bgr: np.ndarray, config: ObjectConfig) -> np.ndarray:
    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    special_mask = build_special_mask(image_rgb, config)
    if special_mask is not None:
        return special_mask

    height, width = image_bgr.shape[:2]
    mask = np.full((height, width), cv2.GC_BGD, np.uint8)

    x1, y1, x2, y2 = config.rect
    x1 = max(0, x1)
    y1 = max(0, y1)
    x2 = min(width, x2)
    y2 = min(height, y2)
    mask[y1:y2, x1:x2] = cv2.GC_PR_BGD

    inset_x = max(12, (x2 - x1) // 6)
    inset_y = max(12, (y2 - y1) // 6)
    mask[y1 + inset_y:y2 - inset_y, x1 + inset_x:x2 - inset_x] = cv2.GC_PR_FGD

    for seed in config.bg_seeds:
        cv2.circle(mask, (seed.x, seed.y), seed.r, cv2.GC_BGD, -1)

    for seed in config.fg_seeds:
        cv2.circle(mask, (seed.x, seed.y), seed.r, cv2.GC_FGD, -1)

    bg_model = np.zeros((1, 65), np.float64)
    fg_model = np.zeros((1, 65), np.float64)
    cv2.grabCut(image_bgr, mask, None, bg_model, fg_model, 8, cv2.GC_INIT_WITH_MASK)

    binary = np.where(
        (mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD),
        255,
        0,
    ).astype(np.uint8)

    binary = keep_seed_components(binary, config.fg_seeds)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    binary = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel, iterations=1)
    binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel, iterations=1)

    alpha = cv2.GaussianBlur(binary, (0, 0), sigmaX=1.4, sigmaY=1.4)
    alpha = np.clip(alpha.astype(np.float32) * 1.08, 0, 255).astype(np.uint8)
    alpha[binary == 0] = np.minimum(alpha[binary == 0], 18)

    if config.clip_polygon:
        poly = np.array(
            [[x1 + px, y1 + py] for px, py in config.clip_polygon],
            dtype=np.int32,
        )
        clip_mask = np.zeros_like(alpha)
        cv2.fillPoly(clip_mask, [poly], 255)
        clip_mask = cv2.GaussianBlur(clip_mask, (0, 0), sigmaX=0.8, sigmaY=0.8)
        alpha = ((alpha.astype(np.float32) / 255.0) * (clip_mask.astype(np.float32))).clip(0, 255).astype(np.uint8)

    return alpha


def build_special_mask(image_rgb: np.ndarray, config: ObjectConfig) -> np.ndarray | None:
    if config.name == "care-sunflower":
        return build_sunflower_mask(image_rgb)
    if config.name == "vegetable-carrot":
        return build_carrot_mask(image_rgb, config)
    return None


def build_sunflower_mask(image_rgb: np.ndarray) -> np.ndarray:
    """Use the line art for the flower head and tight hand gates for thin leaves."""
    height, width = image_rgb.shape[:2]
    hsv = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2HSV)
    hue, saturation, value = cv2.split(hsv)
    red = image_rgb[:, :, 0]
    green = image_rgb[:, :, 1]
    blue = image_rgb[:, :, 2]

    head_gate = np.zeros((height, width), np.uint8)
    cv2.ellipse(head_gate, (315, 530), (76, 78), 0, 0, 360, 255, -1)
    head = flood_enclosed_line_art(
        image_rgb,
        head_gate,
        seeds=((315, 530), (300, 520), (330, 545)),
        dark_threshold=145,
    )

    petal = (
        (red > 185)
        & (green > 140)
        & (blue < 125)
        & (hue >= 14)
        & (hue <= 35)
        & (saturation > 95)
        & (value > 165)
    )
    center = (
        (red > 95)
        & (red < 190)
        & (green > 55)
        & (green < 140)
        & (blue < 80)
        & (hue >= 6)
        & (hue <= 24)
        & (saturation > 100)
        & (value > 65)
        & (value < 190)
    )
    near_head = cv2.dilate(head, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7)), iterations=2)
    head_colors = np.where(petal | center, 255, 0).astype(np.uint8)
    head = cv2.bitwise_or(head, cv2.bitwise_and(head_colors, cv2.bitwise_and(head_gate, near_head)))

    stem_shape = Image.new("L", (width, height), 0)
    leaf_shape = Image.new("L", (width, height), 0)
    stem_draw = ImageDraw.Draw(stem_shape)
    leaf_draw = ImageDraw.Draw(leaf_shape)
    stem_draw.polygon([(297, 552), (310, 552), (310, 718), (296, 718)], fill=255)
    for leaf in (
        [(305, 618), (327, 598), (356, 605), (373, 625), (360, 638), (329, 636), (309, 628)],
        [(298, 628), (265, 615), (238, 625), (229, 648), (256, 658), (292, 647)],
        [(298, 665), (265, 654), (234, 665), (225, 690), (255, 703), (294, 689)],
        [(307, 677), (333, 657), (367, 666), (383, 694), (365, 710), (331, 703), (310, 691)],
    ):
        leaf_draw.polygon(leaf, fill=255)

    stem_gate = np.array(stem_shape)
    leaf_gate = np.array(leaf_shape)
    green_fill = np.where(
        (hue >= 28) & (hue <= 58) & (saturation > 55) & (value > 72),
        255,
        0,
    ).astype(np.uint8)
    dark_line = np.where((value < 132) & (saturation > 25), 255, 0).astype(np.uint8)
    stem = cv2.bitwise_and(stem_gate, cv2.bitwise_or(green_fill, dark_line))

    base = cv2.bitwise_or(head, cv2.bitwise_or(stem, leaf_gate))
    nearby = cv2.dilate(base, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7)), iterations=1)
    line_art = np.where((value < 135) & (saturation > 25), 255, 0).astype(np.uint8)
    mask = cv2.bitwise_or(base, cv2.bitwise_and(line_art, nearby))
    mask = keep_seed_components(
        mask,
        (
            Seed(315, 530, 1),
            Seed(304, 615, 1),
            Seed(303, 700, 1),
            Seed(335, 625, 1),
            Seed(260, 650, 1),
            Seed(350, 690, 1),
        ),
    )
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3)), iterations=1)
    alpha = cv2.GaussianBlur(mask, (0, 0), sigmaX=0.75, sigmaY=0.75)
    return alpha


def build_carrot_mask(image_rgb: np.ndarray, config: ObjectConfig) -> np.ndarray:
    height, width = image_rgb.shape[:2]
    hsv = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2HSV)
    hue, saturation, value = cv2.split(hsv)
    red = image_rgb[:, :, 0]
    green = image_rgb[:, :, 1]
    blue = image_rgb[:, :, 2]

    x1, y1, _, _ = config.rect
    clip = np.zeros((height, width), np.uint8)
    if config.clip_polygon:
        polygon = np.array([[x1 + px, y1 + py] for px, py in config.clip_polygon], dtype=np.int32)
        cv2.fillPoly(clip, [polygon], 255)

    leaf_shape = Image.new("L", (width, height), 0)
    leaf_draw = ImageDraw.Draw(leaf_shape)
    leaf_draw.polygon(
        [(173, 746), (181, 724), (193, 710), (208, 715), (224, 726), (236, 744), (225, 763), (199, 765), (180, 758)],
        fill=255,
    )
    leaf_gate = np.array(leaf_shape)

    orange = (
        (hue >= 7)
        & (hue <= 23)
        & (saturation > 145)
        & (value > 150)
        & (red > 165)
        & ((red.astype(np.int16) - green.astype(np.int16)) > 62)
        & (blue < 105)
    )
    pink = (
        ((hue <= 7) | (hue >= 165))
        & (saturation > 80)
        & (value > 150)
        & (red > 185)
        & (green < 160)
        & (blue < 150)
    )
    visible_leaf = (
        (hue >= 34)
        & (hue <= 58)
        & (saturation > 80)
        & (value > 75)
        & (leaf_gate > 0)
    )
    darker_leaf_edge = (value < 170) & (saturation > 45) & (leaf_gate > 0)
    base = np.where(orange | pink | visible_leaf | darker_leaf_edge, 255, 0).astype(np.uint8)
    base = cv2.bitwise_and(base, clip)

    nearby = cv2.dilate(base, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)), iterations=1)
    line_art = np.where((value < 125) & (saturation > 35), 255, 0).astype(np.uint8)
    mask = cv2.bitwise_or(base, cv2.bitwise_and(line_art, nearby))
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)), iterations=2)
    mask = keep_seed_components(
        mask,
        (
            Seed(205, 780, 1),
            Seed(205, 840, 1),
            Seed(245, 800, 1),
            Seed(200, 735, 1),
            Seed(220, 745, 1),
            Seed(313, 812, 1),
            Seed(150, 825, 1),
        ),
    )
    mask = fill_holes(mask)
    mask = cv2.bitwise_and(mask, clip)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2, 2)), iterations=1)
    alpha = cv2.GaussianBlur(mask, (0, 0), sigmaX=0.75, sigmaY=0.75)
    return alpha


def flood_enclosed_line_art(
    image_rgb: np.ndarray,
    roi_mask: np.ndarray,
    seeds: tuple[tuple[int, int], ...],
    dark_threshold: int,
) -> np.ndarray:
    hsv = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2HSV)
    _, saturation, value = cv2.split(hsv)
    height, width = value.shape
    barrier = np.where((value < dark_threshold) & (saturation > 25), 255, 0).astype(np.uint8)
    barrier = cv2.bitwise_and(barrier, roi_mask)
    barrier = cv2.dilate(barrier, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3)), iterations=1)

    fill_area = np.where((roi_mask > 0) & (barrier == 0), 255, 0).astype(np.uint8)
    filled = fill_area.copy()
    flood_mask = np.zeros((height + 2, width + 2), np.uint8)
    ys, xs = np.where(roi_mask > 0)
    x_min, x_max = xs.min(), xs.max() + 1
    y_min, y_max = ys.min(), ys.max() + 1

    for x in range(x_min, x_max):
        for y in (y_min, y_max - 1):
            if filled[y, x] == 255:
                cv2.floodFill(filled, flood_mask, (x, y), 128)
    for y in range(y_min, y_max):
        for x in (x_min, x_max - 1):
            if filled[y, x] == 255:
                cv2.floodFill(filled, flood_mask, (x, y), 128)

    interior = np.where((fill_area == 255) & (filled != 128), 255, 0).astype(np.uint8)
    foreground = cv2.bitwise_and(cv2.bitwise_or(interior, barrier), roi_mask)
    seed_objects = tuple(Seed(x, y, 1) for x, y in seeds)
    return keep_seed_components(foreground, seed_objects)


def fill_holes(binary: np.ndarray) -> np.ndarray:
    filled = binary.copy()
    height, width = filled.shape
    flood_mask = np.zeros((height + 2, width + 2), np.uint8)

    for x in range(width):
        if filled[0, x] == 0:
            cv2.floodFill(filled, flood_mask, (x, 0), 128)
        if filled[height - 1, x] == 0:
            cv2.floodFill(filled, flood_mask, (x, height - 1), 128)
    for y in range(height):
        if filled[y, 0] == 0:
            cv2.floodFill(filled, flood_mask, (0, y), 128)
        if filled[y, width - 1] == 0:
            cv2.floodFill(filled, flood_mask, (width - 1, y), 128)

    holes = np.where(filled == 0, 255, 0).astype(np.uint8)
    return cv2.bitwise_or(binary, holes)


def keep_seed_components(binary: np.ndarray, seeds: tuple[Seed, ...]) -> np.ndarray:
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(binary, connectivity=8)
    if num_labels <= 1:
        return binary

    keep_labels: set[int] = set()
    for seed in seeds:
        label = labels[min(max(seed.y, 0), labels.shape[0] - 1), min(max(seed.x, 0), labels.shape[1] - 1)]
        if label != 0:
            keep_labels.add(int(label))

    if not keep_labels:
        largest = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
        keep_labels.add(largest)

    kept = np.where(np.isin(labels, list(keep_labels)), 255, 0).astype(np.uint8)
    return kept


def save_cutout(image_rgb: np.ndarray, alpha: np.ndarray, output_path: Path, mirror: bool) -> None:
    ys, xs = np.where(alpha > 12)
    if len(xs) == 0 or len(ys) == 0:
        raise RuntimeError(f"Failed to isolate foreground for {output_path.name}")

    pad = 18
    x1 = max(0, xs.min() - pad)
    y1 = max(0, ys.min() - pad)
    x2 = min(alpha.shape[1], xs.max() + pad + 1)
    y2 = min(alpha.shape[0], ys.max() + pad + 1)

    crop_rgb = image_rgb[y1:y2, x1:x2]
    crop_alpha = alpha[y1:y2, x1:x2]
    crop_alpha = strip_edge_background(crop_rgb, crop_alpha)
    rgba = np.dstack([crop_rgb, crop_alpha])
    Image.fromarray(rgba, "RGBA").save(output_path)

    if mirror:
        mirror_path = output_path.with_stem(f"{output_path.stem}-flip")
        Image.fromarray(rgba, "RGBA").transpose(Image.Transpose.FLIP_LEFT_RIGHT).save(mirror_path)


def strip_edge_background(crop_rgb: np.ndarray, crop_alpha: np.ndarray) -> np.ndarray:
    visible = crop_alpha > 10
    height, width = crop_alpha.shape
    visited = np.zeros((height, width), dtype=bool)
    to_clear = np.zeros((height, width), dtype=bool)

    border_points: list[tuple[int, int]] = []
    for x in range(width):
        border_points.append((x, 0))
        border_points.append((x, height - 1))
    for y in range(1, height - 1):
        border_points.append((0, y))
        border_points.append((width - 1, y))

    for x, y in border_points:
        if not visible[y, x] or visited[y, x]:
            continue

        seed_color = crop_rgb[y, x].astype(np.int16)
        queue: deque[tuple[int, int]] = deque([(x, y)])
        visited[y, x] = True
        component: list[tuple[int, int]] = []

        while queue:
            cx, cy = queue.popleft()
            component.append((cx, cy))
            current_color = crop_rgb[cy, cx].astype(np.int16)

            for nx, ny in ((cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)):
                if nx < 0 or ny < 0 or nx >= width or ny >= height:
                    continue
                if visited[ny, nx] or not visible[ny, nx]:
                    continue

                neighbor_color = crop_rgb[ny, nx].astype(np.int16)
                if (
                    np.linalg.norm(neighbor_color - seed_color) <= 50
                    and np.linalg.norm(neighbor_color - current_color) <= 28
                ):
                    visited[ny, nx] = True
                    queue.append((nx, ny))

        if component:
            xs = [point[0] for point in component]
            ys = [point[1] for point in component]
            to_clear[ys, xs] = True

    cleaned = crop_alpha.copy()
    cleaned[to_clear] = 0
    return cv2.GaussianBlur(cleaned, (0, 0), sigmaX=0.7, sigmaY=0.7)


def make_preview(output_dir: Path) -> None:
    files = sorted(output_dir.glob("*.png"))
    if not files:
        return

    thumb_w = 180
    thumb_h = 180
    pad = 16
    cols = 3
    rows = (len(files) + cols - 1) // cols
    canvas = Image.new("RGBA", (pad + cols * (thumb_w + pad), pad + rows * (thumb_h + 44 + pad)), (255, 255, 255, 255))
    checker = Image.new("RGBA", (thumb_w, thumb_h), (255, 255, 255, 255))
    draw_checker = ImageDraw.Draw(checker)
    tile = 18
    for y in range(0, thumb_h, tile):
        for x in range(0, thumb_w, tile):
            if ((x // tile) + (y // tile)) % 2 == 0:
                draw_checker.rectangle((x, y, x + tile - 1, y + tile - 1), fill=(232, 236, 240, 255))

    draw = ImageDraw.Draw(canvas)
    for idx, path in enumerate(files):
        x = pad + (idx % cols) * (thumb_w + pad)
        y = pad + (idx // cols) * (thumb_h + 44 + pad)
        canvas.alpha_composite(checker, (x, y))
        image = Image.open(path).convert("RGBA")
        image.thumbnail((thumb_w, thumb_h))
        paste_x = x + (thumb_w - image.width) // 2
        paste_y = y + (thumb_h - image.height) // 2
        canvas.alpha_composite(image, (paste_x, paste_y))
        draw.text((x, y + thumb_h + 6), path.stem, fill=(20, 32, 48, 255))

    canvas.save(output_dir / "preview.png")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for config in CONFIGS:
        source_path = SOURCE_DIR / config.source
        image_rgb = np.array(Image.open(source_path).convert("RGB"))
        image_bgr = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2BGR)
        alpha = build_mask(image_bgr, config)
        save_cutout(image_rgb, alpha, OUTPUT_DIR / f"{config.name}.png", config.mirror)

    make_preview(OUTPUT_DIR)
    print(f"saved to {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
