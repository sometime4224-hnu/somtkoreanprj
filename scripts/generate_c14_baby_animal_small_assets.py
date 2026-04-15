from __future__ import annotations

import json
import math
import random
from pathlib import Path

from PIL import Image, ImageDraw


CELL_SIZE = 96
SCALE = 4
SHEET_COLUMNS = 5
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "assets" / "c14" / "misc" / "images" / "baby-animal-small-5x5"
ITEM_DIR = OUTPUT_DIR / "items"


ANIMALS = [
    {"id": "baby-01-puppy", "species": "puppy", "renderer": "puppy", "category": "pet", "color": "cream-brown"},
    {"id": "baby-02-kitten", "species": "kitten", "renderer": "kitten", "category": "pet", "color": "orange"},
    {"id": "baby-03-bunny", "species": "bunny", "renderer": "bunny", "category": "small-mammal", "color": "white"},
    {"id": "baby-04-chick", "species": "chick", "renderer": "chick", "category": "bird", "color": "yellow"},
    {"id": "baby-05-duckling", "species": "duckling", "renderer": "duckling", "category": "bird", "color": "yellow-orange"},
    {"id": "baby-06-piglet", "species": "piglet", "renderer": "piglet", "category": "farm", "color": "pink"},
    {"id": "baby-07-calf", "species": "calf", "renderer": "calf", "category": "farm", "color": "white-black"},
    {"id": "baby-08-lamb", "species": "lamb", "renderer": "lamb", "category": "farm", "color": "ivory"},
    {"id": "baby-09-goat-kid", "species": "goat kid", "renderer": "goat", "category": "farm", "color": "tan"},
    {"id": "baby-10-foal", "species": "foal", "renderer": "foal", "category": "farm", "color": "chestnut"},
    {"id": "baby-11-fawn", "species": "fawn", "renderer": "fawn", "category": "forest", "color": "brown-spotted"},
    {"id": "baby-12-fox-kit", "species": "fox kit", "renderer": "fox", "category": "forest", "color": "orange-white"},
    {"id": "baby-13-bear-cub", "species": "bear cub", "renderer": "bear", "category": "forest", "color": "brown"},
    {"id": "baby-14-panda-cub", "species": "panda cub", "renderer": "panda", "category": "forest", "color": "black-white"},
    {"id": "baby-15-koala-joey", "species": "koala joey", "renderer": "koala", "category": "forest", "color": "gray"},
    {"id": "baby-16-penguin-chick", "species": "penguin chick", "renderer": "penguin", "category": "polar", "color": "gray-white"},
    {"id": "baby-17-seal-pup", "species": "seal pup", "renderer": "seal", "category": "sea", "color": "silver"},
    {"id": "baby-18-elephant-calf", "species": "elephant calf", "renderer": "elephant", "category": "savanna", "color": "blue-gray"},
    {"id": "baby-19-giraffe-calf", "species": "giraffe calf", "renderer": "giraffe", "category": "savanna", "color": "gold-spotted"},
    {"id": "baby-20-monkey-infant", "species": "monkey infant", "renderer": "monkey", "category": "jungle", "color": "brown-tan"},
    {"id": "baby-21-squirrel-kit", "species": "squirrel kit", "renderer": "squirrel", "category": "forest", "color": "russet"},
    {"id": "baby-22-hedgehog-hoglet", "species": "hedgehog hoglet", "renderer": "hedgehog", "category": "small-mammal", "color": "brown-cream"},
    {"id": "baby-23-hamster-pup", "species": "hamster pup", "renderer": "hamster", "category": "small-mammal", "color": "golden"},
    {"id": "baby-24-turtle-hatchling", "species": "turtle hatchling", "renderer": "turtle", "category": "reptile", "color": "green"},
    {"id": "baby-25-froglet", "species": "froglet", "renderer": "frog", "category": "amphibian", "color": "green"},
]


def scaled(value: float) -> int:
    return int(round(value * SCALE))


def xy(point: tuple[float, float]) -> tuple[int, int]:
    return scaled(point[0]), scaled(point[1])


def box(x0: float, y0: float, x1: float, y1: float) -> tuple[int, int, int, int]:
    return scaled(x0), scaled(y0), scaled(x1), scaled(y1)


def rgba(value: str, alpha: int = 255) -> tuple[int, int, int, int]:
    value = value.lstrip("#")
    if len(value) == 3:
        value = "".join(channel * 2 for channel in value)
    return int(value[0:2], 16), int(value[2:4], 16), int(value[4:6], 16), alpha


def shade(value: str, factor: float, alpha: int = 255) -> tuple[int, int, int, int]:
    r, g, b, _ = rgba(value)
    if factor >= 1:
        r = r + (255 - r) * (factor - 1)
        g = g + (255 - g) * (factor - 1)
        b = b + (255 - b) * (factor - 1)
    else:
        r *= factor
        g *= factor
        b *= factor
    return int(max(0, min(255, r))), int(max(0, min(255, g))), int(max(0, min(255, b))), alpha


def shade_hex(value: str, factor: float) -> str:
    r, g, b, _ = shade(value, factor)
    return f"#{r:02x}{g:02x}{b:02x}"


def new_canvas() -> Image.Image:
    return Image.new("RGBA", (CELL_SIZE * SCALE, CELL_SIZE * SCALE), (0, 0, 0, 0))


def finish(canvas: Image.Image) -> Image.Image:
    return canvas.resize((CELL_SIZE, CELL_SIZE), Image.Resampling.LANCZOS)


def ellipse(
    draw: ImageDraw.ImageDraw,
    bounds: tuple[float, float, float, float],
    fill: str | tuple[int, int, int, int],
    outline: str = "#2d2a24",
    width: float = 1.4,
) -> None:
    fill_color = rgba(fill) if isinstance(fill, str) else fill
    draw.ellipse(box(*bounds), fill=fill_color, outline=rgba(outline, 230), width=scaled(width))


def polygon(draw: ImageDraw.ImageDraw, points: list[tuple[float, float]], fill: str, outline: str = "#2d2a24") -> None:
    draw.polygon([xy(point) for point in points], fill=rgba(outline, 230))
    cx = sum(x for x, _ in points) / len(points)
    cy = sum(y for _, y in points) / len(points)
    inner = [(cx + (x - cx) * 0.88, cy + (y - cy) * 0.88) for x, y in points]
    draw.polygon([xy(point) for point in inner], fill=rgba(fill))


def line(draw: ImageDraw.ImageDraw, points: list[tuple[float, float]], fill: str, width: float = 1.4, alpha: int = 230) -> None:
    draw.line([xy(point) for point in points], fill=rgba(fill, alpha), width=scaled(width), joint="curve")


def curve(draw: ImageDraw.ImageDraw, points: list[tuple[float, float]], fill: str, width: float = 1.4, alpha: int = 230) -> None:
    if len(points) != 3:
        line(draw, points, fill, width, alpha)
        return
    (x0, y0), (x1, y1), (x2, y2) = points
    path = []
    for index in range(20):
        t = index / 19
        mt = 1 - t
        x = mt * mt * x0 + 2 * mt * t * x1 + t * t * x2
        y = mt * mt * y0 + 2 * mt * t * y1 + t * t * y2
        path.append((x, y))
    line(draw, path, fill, width, alpha)


def rotated_ellipse(
    canvas: Image.Image,
    center: tuple[float, float],
    radii: tuple[float, float],
    angle: float,
    fill: str,
    outline: str = "#2d2a24",
    outline_width: float = 1.2,
    alpha: int = 255,
) -> None:
    rx, ry = radii
    pad = max(rx, ry) + 4
    width = scaled((rx + pad) * 2)
    height = scaled((ry + pad) * 2)
    patch = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(patch, "RGBA")
    bounds = (
        width // 2 - scaled(rx),
        height // 2 - scaled(ry),
        width // 2 + scaled(rx),
        height // 2 + scaled(ry),
    )
    draw.ellipse(bounds, fill=rgba(outline, 220))
    inset = scaled(outline_width)
    inner = (bounds[0] + inset, bounds[1] + inset, bounds[2] - inset, bounds[3] - inset)
    draw.ellipse(inner, fill=rgba(fill, alpha))
    rotated = patch.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    canvas.alpha_composite(rotated, (scaled(center[0]) - rotated.width // 2, scaled(center[1]) - rotated.height // 2))


def shadow(draw: ImageDraw.ImageDraw, x0: float = 24, x1: float = 72, y: float = 82) -> None:
    draw.ellipse(box(x0, y - 4, x1, y + 4), fill=rgba("#1e2b30", 34))


def eye(draw: ImageDraw.ImageDraw, cx: float, cy: float, scale: float = 1.0) -> None:
    ellipse(draw, (cx - 2.6 * scale, cy - 3.0 * scale, cx + 2.6 * scale, cy + 3.0 * scale), "#242424", "#242424", 0.5)
    draw.ellipse(box(cx - 1.1 * scale, cy - 1.9 * scale, cx + 0.4 * scale, cy - 0.5 * scale), fill=rgba("#ffffff", 210))


def cheeks(draw: ImageDraw.ImageDraw, y: float = 46, color: str = "#f08f91") -> None:
    draw.ellipse(box(33.5, y, 39.5, y + 3.5), fill=rgba(color, 95))
    draw.ellipse(box(56.5, y, 62.5, y + 3.5), fill=rgba(color, 95))


def smile(draw: ImageDraw.ImageDraw, cx: float = 48, cy: float = 50, color: str = "#5b3a33") -> None:
    line(draw, [(cx, cy), (cx - 3.0, cy + 3.1), (cx - 5.2, cy + 2.2)], color, 1.0, 180)
    line(draw, [(cx, cy), (cx + 3.0, cy + 3.1), (cx + 5.2, cy + 2.2)], color, 1.0, 180)


def small_feet(draw: ImageDraw.ImageDraw, color: str = "#d78337", y: float = 79) -> None:
    ellipse(draw, (33, y - 2, 44, y + 4), color, "#7d522d", 1.0)
    ellipse(draw, (52, y - 2, 63, y + 4), color, "#7d522d", 1.0)


def draw_round_baby(
    canvas: Image.Image,
    body: str,
    head: str | None = None,
    belly: str | None = None,
    muzzle: str | None = None,
    ear: str | None = None,
    tail: str | None = None,
) -> ImageDraw.ImageDraw:
    head = head or body
    ear = ear or head
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw)
    if tail:
        rotated_ellipse(canvas, (68, 62), (6.5, 14), 34, tail)
    ellipse(draw, (26, 47, 70, 83), body)
    if belly:
        ellipse(draw, (37, 58, 59, 81), belly, shade_hex(belly, 0.68), 0.9)
    ellipse(draw, (25, 22, 71, 61), head)
    rotated_ellipse(canvas, (34, 27), (7, 9), -22, ear)
    rotated_ellipse(canvas, (62, 27), (7, 9), 22, ear)
    eye(draw, 39, 42)
    eye(draw, 57, 42)
    if muzzle:
        ellipse(draw, (39, 44, 57, 56), muzzle, shade_hex(muzzle, 0.72), 0.9)
    return draw


def render_puppy(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw)
    rotated_ellipse(canvas, (70, 61), (5, 13), 35, "#b78454")
    ellipse(draw, (27, 48, 69, 82), "#d8b483")
    ellipse(draw, (25, 24, 71, 62), "#e7c99a")
    rotated_ellipse(canvas, (29, 38), (7, 16), 23, "#9a673e")
    rotated_ellipse(canvas, (67, 38), (7, 16), -23, "#9a673e")
    ellipse(draw, (39, 43, 57, 56), "#f3dfbe", "#ad7f55", 0.9)
    ellipse(draw, (45.2, 44.3, 50.8, 49.2), "#3a2d2b", "#3a2d2b", 0.5)
    eye(draw, 39, 40)
    eye(draw, 57, 40)
    cheeks(draw)
    smile(draw, 48, 49)
    ellipse(draw, (31, 30, 43, 43), rgba("#b78454", 210), "#9a673e", 0.7)
    return finish(canvas)


def render_kitten(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw)
    curve(draw, [(67, 74), (77, 58), (66, 49)], "#d88342", 5.0, 230)
    ellipse(draw, (28, 48, 68, 82), "#e49a54")
    ellipse(draw, (25, 24, 71, 62), "#eba660")
    polygon(draw, [(29, 31), (34, 13), (43, 30)], "#e49a54")
    polygon(draw, [(53, 30), (62, 13), (67, 31)], "#e49a54")
    polygon(draw, [(33.5, 29), (35.2, 20), (40, 30)], "#f6c4b3", "#a7633b")
    polygon(draw, [(56, 30), (60.8, 20), (62.5, 29)], "#f6c4b3", "#a7633b")
    eye(draw, 39, 42)
    eye(draw, 57, 42)
    ellipse(draw, (42, 45, 54, 54), "#f3d1ac", "#b97749", 0.8)
    ellipse(draw, (46, 45, 50, 48.5), "#8b4d49", "#8b4d49", 0.4)
    for side in [-1, 1]:
        line(draw, [(48 + side * 5, 49), (48 + side * 16, 46)], "#7a563f", 0.9, 160)
        line(draw, [(48 + side * 5, 51), (48 + side * 15, 53)], "#7a563f", 0.9, 160)
    line(draw, [(38, 29), (39, 35)], "#b56b38", 1.1, 170)
    line(draw, [(46, 27), (46, 35)], "#b56b38", 1.1, 170)
    line(draw, [(56, 29), (55, 35)], "#b56b38", 1.1, 170)
    return finish(canvas)


def render_bunny(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw)
    rotated_ellipse(canvas, (38, 25), (6.2, 19.5), -11, "#f5efe4")
    rotated_ellipse(canvas, (58, 25), (6.2, 19.5), 11, "#f5efe4")
    rotated_ellipse(canvas, (38, 25), (3.0, 14.2), -11, "#f1b9c4", "#d8a7ad", 0.7, 210)
    rotated_ellipse(canvas, (58, 25), (3.0, 14.2), 11, "#f1b9c4", "#d8a7ad", 0.7, 210)
    ellipse(draw, (29, 49, 67, 83), "#f4eee6")
    ellipse(draw, (25, 29, 71, 65), "#fbf7ef")
    eye(draw, 39, 46)
    eye(draw, 57, 46)
    ellipse(draw, (43, 47, 53, 56), "#fffaf3", "#ddd0c5", 0.7)
    ellipse(draw, (46, 47, 50, 50.5), "#dd7f90", "#dd7f90", 0.5)
    cheeks(draw, 51, "#eca0a8")
    smile(draw, 48, 51, "#7d5f55")
    ellipse(draw, (63, 63, 73, 73), "#fffaf3", "#d8cbc1", 0.8)
    return finish(canvas)


def render_chick(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw, 27, 69, 82)
    ellipse(draw, (28, 39, 68, 80), "#ffd557", "#b9862a")
    ellipse(draw, (30, 23, 66, 58), "#ffe174", "#b9862a")
    polygon(draw, [(46, 45), (54, 49), (46, 53)], "#f28c3a", "#9d5e27")
    eye(draw, 39, 40, 0.85)
    eye(draw, 57, 40, 0.85)
    rotated_ellipse(canvas, (30, 58), (4, 12), -32, "#ffdd69", "#b9862a", 1.0)
    rotated_ellipse(canvas, (66, 58), (4, 12), 32, "#ffdd69", "#b9862a", 1.0)
    small_feet(draw, "#e99439", 79)
    for x in [43, 48, 53]:
        line(draw, [(48, 25), (x, 18)], "#d9a63e", 1.5, 170)
    return finish(canvas)


def render_duckling(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw, 25, 73, 82)
    ellipse(draw, (24, 48, 70, 80), "#f4d34d", "#a98225")
    ellipse(draw, (31, 25, 66, 58), "#ffe06a", "#a98225")
    ellipse(draw, (52, 42, 72, 51), "#ee8b35", "#9b5f28", 1.0)
    eye(draw, 42, 39, 0.85)
    rotated_ellipse(canvas, (32, 61), (5, 14), -43, "#ffdf6d", "#a98225")
    small_feet(draw, "#e99135", 79)
    return finish(canvas)


def render_piglet(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = draw_round_baby(canvas, "#f5a8b9", "#f7b5c5", "#ffd4dc", "#ffc1cf", "#f5a8b9", "#f4a4b3")
    polygon(draw, [(31, 32), (28, 18), (43, 29)], "#f7b5c5", "#a76371")
    polygon(draw, [(53, 29), (68, 18), (65, 32)], "#f7b5c5", "#a76371")
    ellipse(draw, (40.5, 43, 55.5, 52.5), "#ffc1cf", "#a76371", 1.0)
    draw.ellipse(box(44, 46, 46.6, 48.5), fill=rgba("#8e5260", 180))
    draw.ellipse(box(49.4, 46, 52, 48.5), fill=rgba("#8e5260", 180))
    cheeks(draw, 51, "#ef7f96")
    return finish(canvas)


def render_calf(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = draw_round_baby(canvas, "#f8f3e7", "#fff7ea", "#f3dfca", "#e6b493", "#fff7ea", "#faf3e8")
    rotated_ellipse(canvas, (29, 35), (5, 10), -48, "#d8a06e")
    rotated_ellipse(canvas, (67, 35), (5, 10), 48, "#d8a06e")
    ellipse(draw, (30, 27, 44, 42), "#3a3532", "#3a3532", 0.5)
    ellipse(draw, (55, 53, 66, 65), "#3a3532", "#3a3532", 0.5)
    ellipse(draw, (39, 43, 57, 55), "#e7b99a", "#9a6b56", 0.9)
    draw.ellipse(box(44, 46.5, 46.5, 49), fill=rgba("#7e5447", 170))
    draw.ellipse(box(49.5, 46.5, 52, 49), fill=rgba("#7e5447", 170))
    eye(draw, 39, 41)
    eye(draw, 57, 41)
    return finish(canvas)


def render_lamb(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw)
    for cx, cy, r in [(34, 57, 10), (45, 53, 11), (57, 56, 10), (39, 69, 12), (52, 69, 12), (62, 68, 9)]:
        ellipse(draw, (cx - r, cy - r, cx + r, cy + r), "#f4ead9", "#9b8d77", 1.0)
    ellipse(draw, (31, 29, 65, 59), "#3d342d", "#2a2521", 1.2)
    for cx, cy in [(34, 28), (43, 23), (53, 25), (61, 31)]:
        ellipse(draw, (cx - 6, cy - 5, cx + 6, cy + 5), "#f6efdf", "#9b8d77", 0.9)
    rotated_ellipse(canvas, (28, 42), (5, 10), 60, "#3d342d")
    rotated_ellipse(canvas, (68, 42), (5, 10), -60, "#3d342d")
    eye(draw, 40, 43, 0.85)
    eye(draw, 56, 43, 0.85)
    ellipse(draw, (45, 47, 51, 52), "#6b5145", "#6b5145", 0.5)
    return finish(canvas)


def render_goat(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = draw_round_baby(canvas, "#d4b189", "#e0c29d", "#ead4b6", "#f0d2ae", "#d4b189", "#d4b189")
    rotated_ellipse(canvas, (39, 23), (3.6, 10), -17, "#cda76f", "#735d41", 0.8)
    rotated_ellipse(canvas, (57, 23), (3.6, 10), 17, "#cda76f", "#735d41", 0.8)
    rotated_ellipse(canvas, (29, 36), (5, 11), 58, "#d4b189")
    rotated_ellipse(canvas, (67, 36), (5, 11), -58, "#d4b189")
    ellipse(draw, (40, 43, 56, 55), "#efd2b1", "#9a7558", 0.9)
    ellipse(draw, (45, 44.5, 51, 49), "#6c5144", "#6c5144", 0.5)
    line(draw, [(48, 55), (45, 60), (51, 60), (48, 55)], "#d8c0a0", 1.3, 220)
    return finish(canvas)


def render_foal(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw, 23, 73, 82)
    ellipse(draw, (25, 49, 68, 80), "#b87948", "#6f482e")
    rotated_ellipse(canvas, (60, 45), (14, 17), -9, "#c58a57", "#6f482e", 1.2)
    ellipse(draw, (40, 47, 66, 60), "#e0b07e", "#7c543a", 0.9)
    polygon(draw, [(46, 35), (48, 19), (55, 35)], "#b87948", "#6f482e")
    polygon(draw, [(61, 35), (68, 21), (70, 38)], "#b87948", "#6f482e")
    line(draw, [(50, 29), (51, 43), (48, 53)], "#5b3528", 4.0, 220)
    eye(draw, 57, 43)
    ellipse(draw, (62, 51, 66, 55), "#4b302b", "#4b302b", 0.5)
    line(draw, [(28, 77), (28, 84)], "#6f482e", 3.0)
    line(draw, [(63, 77), (63, 84)], "#6f482e", 3.0)
    return finish(canvas)


def render_fawn(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = draw_round_baby(canvas, "#b9854d", "#c49259", "#e5c08d", "#e2b887", "#c49259", "#b9854d")
    polygon(draw, [(32, 33), (29, 18), (43, 30)], "#c49259", "#6d4a33")
    polygon(draw, [(53, 30), (67, 18), (64, 33)], "#c49259", "#6d4a33")
    for x, y in [(36, 58), (46, 61), (58, 58), (41, 70), (55, 70)]:
        ellipse(draw, (x - 2.2, y - 1.7, x + 2.2, y + 1.7), "#fff1cf", "#fff1cf", 0.2)
    ellipse(draw, (41, 44, 55, 55), "#dfb47e", "#8c6040", 0.8)
    ellipse(draw, (45, 44.7, 51, 49), "#3c2d29", "#3c2d29", 0.5)
    return finish(canvas)


def render_fox(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw)
    rotated_ellipse(canvas, (69, 61), (8, 18), 34, "#df7f35")
    rotated_ellipse(canvas, (73, 53), (4, 9), 34, "#fff1dc", "#8e4b2b", 0.8)
    ellipse(draw, (28, 48, 68, 82), "#df7f35")
    ellipse(draw, (38, 58, 58, 81), "#fff1dc", "#8e4b2b", 0.8)
    ellipse(draw, (25, 24, 71, 62), "#e98b3f")
    polygon(draw, [(30, 33), (34, 13), (44, 31)], "#e98b3f", "#8e4b2b")
    polygon(draw, [(52, 31), (62, 13), (66, 33)], "#e98b3f", "#8e4b2b")
    ellipse(draw, (38, 42, 58, 56), "#fff1dc", "#8e4b2b", 0.8)
    eye(draw, 39, 41)
    eye(draw, 57, 41)
    ellipse(draw, (45, 44, 51, 49), "#2f2a27", "#2f2a27", 0.5)
    return finish(canvas)


def render_bear(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = draw_round_baby(canvas, "#8c5e3c", "#9b6a45", "#c99a66", "#d5ac76", "#9b6a45", "#8c5e3c")
    ellipse(draw, (32, 24, 45, 37), "#9b6a45", "#593b28", 1.0)
    ellipse(draw, (51, 24, 64, 37), "#9b6a45", "#593b28", 1.0)
    ellipse(draw, (40, 43, 56, 55), "#d9b47f", "#6e4c34", 0.9)
    ellipse(draw, (45, 44.5, 51, 49.5), "#2c2725", "#2c2725", 0.5)
    return finish(canvas)


def render_panda(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = draw_round_baby(canvas, "#f4efe6", "#fbf7ee", "#fff7e8", "#f6eddf", "#2e2d2c", "#f4efe6")
    ellipse(draw, (31, 24, 45, 38), "#2e2d2c", "#2e2d2c", 0.5)
    ellipse(draw, (51, 24, 65, 38), "#2e2d2c", "#2e2d2c", 0.5)
    rotated_ellipse(canvas, (39, 42), (5.8, 8.5), -23, "#2f2f2f", "#2f2f2f", 0.5)
    rotated_ellipse(canvas, (57, 42), (5.8, 8.5), 23, "#2f2f2f", "#2f2f2f", 0.5)
    eye(draw, 39, 42, 0.75)
    eye(draw, 57, 42, 0.75)
    ellipse(draw, (42, 46, 54, 55), "#f5e8d5", "#c4b3a1", 0.8)
    ellipse(draw, (45.5, 46.5, 50.5, 50.5), "#2c2928", "#2c2928", 0.5)
    ellipse(draw, (29, 54, 40, 76), "#2f2f2f", "#2f2f2f", 0.5)
    ellipse(draw, (56, 54, 67, 76), "#2f2f2f", "#2f2f2f", 0.5)
    return finish(canvas)


def render_koala(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = draw_round_baby(canvas, "#9aa0a0", "#aeb4b3", "#d7d7d0", "#d9d6cf", "#aeb4b3", "#9aa0a0")
    ellipse(draw, (24, 23, 43, 42), "#aeb4b3", "#5d6564", 1.0)
    ellipse(draw, (53, 23, 72, 42), "#aeb4b3", "#5d6564", 1.0)
    ellipse(draw, (28, 27, 39, 38), "#e5dfd5", "#9c958d", 0.7)
    ellipse(draw, (57, 27, 68, 38), "#e5dfd5", "#9c958d", 0.7)
    ellipse(draw, (42, 42, 54, 54), "#3a3635", "#3a3635", 0.5)
    eye(draw, 39, 41)
    eye(draw, 57, 41)
    return finish(canvas)


def render_penguin(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw, 26, 70, 82)
    ellipse(draw, (30, 25, 66, 82), "#6f7880", "#35393d", 1.4)
    ellipse(draw, (37, 40, 59, 79), "#f3eee2", "#77766e", 0.8)
    rotated_ellipse(canvas, (31, 56), (4, 15), -22, "#555e66")
    rotated_ellipse(canvas, (65, 56), (4, 15), 22, "#555e66")
    eye(draw, 40, 39, 0.8)
    eye(draw, 56, 39, 0.8)
    polygon(draw, [(46, 45), (50, 48), (46, 51)], "#efa13d", "#9c6329")
    small_feet(draw, "#efa13d", 80)
    return finish(canvas)


def render_seal(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw, 21, 77, 83)
    ellipse(draw, (22, 45, 75, 80), "#cfd5d7", "#6f777a", 1.3)
    ellipse(draw, (31, 30, 66, 61), "#dbe1e2", "#6f777a", 1.2)
    rotated_ellipse(canvas, (27, 67), (5, 13), -46, "#b7bec1")
    rotated_ellipse(canvas, (67, 68), (5, 13), 46, "#b7bec1")
    eye(draw, 40, 43, 0.8)
    eye(draw, 56, 43, 0.8)
    ellipse(draw, (42, 46, 54, 55), "#eef1ef", "#8a9091", 0.8)
    ellipse(draw, (46, 46.5, 50, 50), "#3b3837", "#3b3837", 0.4)
    for side in [-1, 1]:
        line(draw, [(48 + side * 3, 51), (48 + side * 14, 48)], "#777", 0.8, 150)
        line(draw, [(48 + side * 3, 53), (48 + side * 13, 55)], "#777", 0.8, 150)
    return finish(canvas)


def render_elephant(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw)
    ellipse(draw, (28, 48, 68, 82), "#9eb4c4", "#526777", 1.3)
    ellipse(draw, (24, 30, 72, 65), "#aabfce", "#526777", 1.3)
    ellipse(draw, (15, 34, 37, 61), "#9eb4c4", "#526777", 1.2)
    ellipse(draw, (59, 34, 81, 61), "#9eb4c4", "#526777", 1.2)
    ellipse(draw, (21, 41, 33, 56), "#c7d4dc", "#7f909c", 0.7)
    ellipse(draw, (63, 41, 75, 56), "#c7d4dc", "#7f909c", 0.7)
    curve(draw, [(48, 50), (50, 62), (44, 70)], "#8fa7b8", 7.2, 255)
    line(draw, [(44, 70), (39, 67)], "#526777", 1.1, 160)
    eye(draw, 39, 43, 0.82)
    eye(draw, 57, 43, 0.82)
    return finish(canvas)


def render_giraffe(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw, 24, 72, 82)
    ellipse(draw, (30, 56, 68, 82), "#d9a94d", "#7d5a29", 1.2)
    draw.rounded_rectangle(box(43, 32, 56, 64), radius=scaled(5), fill=rgba("#d9a94d"), outline=rgba("#7d5a29"), width=scaled(1.2))
    ellipse(draw, (35, 24, 69, 53), "#e0b75c", "#7d5a29", 1.2)
    rotated_ellipse(canvas, (36, 31), (4, 9), -48, "#d9a94d")
    rotated_ellipse(canvas, (67, 31), (4, 9), 48, "#d9a94d")
    line(draw, [(45, 25), (43, 17)], "#7d5a29", 2.0)
    line(draw, [(58, 25), (60, 17)], "#7d5a29", 2.0)
    ellipse(draw, (40, 14, 46, 20), "#9b6b2f", "#7d5a29", 0.7)
    ellipse(draw, (57, 14, 63, 20), "#9b6b2f", "#7d5a29", 0.7)
    for x, y, r in [(39, 61, 3), (54, 65, 3), (60, 75, 2.6), (49, 42, 2.7), (58, 37, 2.3)]:
        ellipse(draw, (x - r, y - r, x + r, y + r), "#a76d31", "#a76d31", 0.3)
    eye(draw, 46, 39, 0.78)
    eye(draw, 59, 39, 0.78)
    ellipse(draw, (48, 45, 62, 53), "#efce88", "#9e743a", 0.7)
    return finish(canvas)


def render_monkey(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw)
    curve(draw, [(68, 72), (82, 56), (68, 50)], "#8a5a36", 4.4, 230)
    ellipse(draw, (28, 48, 68, 82), "#8a5a36")
    ellipse(draw, (25, 24, 71, 62), "#8f613c")
    ellipse(draw, (20, 35, 36, 51), "#8f613c", "#553a2a", 1.0)
    ellipse(draw, (60, 35, 76, 51), "#8f613c", "#553a2a", 1.0)
    ellipse(draw, (24, 39, 33, 48), "#d8ad7b", "#8c6b50", 0.6)
    ellipse(draw, (63, 39, 72, 48), "#d8ad7b", "#8c6b50", 0.6)
    ellipse(draw, (34, 32, 62, 57), "#d8ad7b", "#6f4b32", 0.8)
    eye(draw, 40, 41, 0.8)
    eye(draw, 56, 41, 0.8)
    ellipse(draw, (44, 46, 52, 52), "#9a6d55", "#9a6d55", 0.5)
    smile(draw, 48, 51, "#6b4734")
    return finish(canvas)


def render_squirrel(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw)
    rotated_ellipse(canvas, (69, 53), (10, 25), 24, "#b56a35")
    rotated_ellipse(canvas, (71, 48), (5, 16), 24, "#e0a060", "#704426", 0.8)
    ellipse(draw, (28, 48, 66, 82), "#bc7440")
    ellipse(draw, (29, 28, 63, 59), "#c98049")
    polygon(draw, [(33, 35), (37, 21), (45, 34)], "#c98049", "#704426")
    polygon(draw, [(51, 34), (59, 21), (63, 35)], "#c98049", "#704426")
    ellipse(draw, (39, 44, 55, 55), "#efc28d", "#8c5a37", 0.8)
    eye(draw, 39, 41, 0.85)
    eye(draw, 55, 41, 0.85)
    ellipse(draw, (45, 45, 49, 48.5), "#3a2d28", "#3a2d28", 0.4)
    return finish(canvas)


def render_hedgehog(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw, 24, 72, 82)
    points = [(26, 72), (25, 56), (30, 48), (29, 37), (39, 42), (45, 32), (51, 42), (61, 34), (62, 47), (72, 50), (67, 60), (71, 72)]
    draw.polygon([xy(point) for point in points], fill=rgba("#6b4b34", 230))
    inner = [(48 + (x - 48) * 0.9, 59 + (y - 59) * 0.9) for x, y in points]
    draw.polygon([xy(point) for point in inner], fill=rgba("#8a6347"))
    ellipse(draw, (30, 43, 62, 72), "#e2bd91", "#6b4b34", 1.0)
    eye(draw, 40, 54, 0.82)
    eye(draw, 55, 54, 0.82)
    ellipse(draw, (45, 58, 50, 62), "#3a2d28", "#3a2d28", 0.5)
    for x in [33, 39, 47, 55, 62]:
        line(draw, [(x, 42), (x + 2, 50)], "#d8a86d", 1.0, 120)
    return finish(canvas)


def render_hamster(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = draw_round_baby(canvas, "#dca75e", "#e2b56d", "#ffe1a3", "#ffe6be", "#e2b56d", None)
    ellipse(draw, (31, 25, 44, 38), "#e2b56d", "#8a5d2e", 1.0)
    ellipse(draw, (52, 25, 65, 38), "#e2b56d", "#8a5d2e", 1.0)
    ellipse(draw, (34, 46, 45, 57), "#ffe6be", "#b98757", 0.7)
    ellipse(draw, (51, 46, 62, 57), "#ffe6be", "#b98757", 0.7)
    eye(draw, 39, 41, 0.86)
    eye(draw, 57, 41, 0.86)
    ellipse(draw, (45, 46, 51, 50), "#704b3d", "#704b3d", 0.5)
    smile(draw, 48, 51, "#7e5746")
    return finish(canvas)


def render_turtle(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw, 23, 73, 82)
    rotated_ellipse(canvas, (70, 58), (8, 10), 17, "#72b56c", "#345f39")
    rotated_ellipse(canvas, (28, 57), (6, 11), -28, "#67a85f", "#345f39")
    rotated_ellipse(canvas, (31, 75), (6, 10), 32, "#67a85f", "#345f39")
    rotated_ellipse(canvas, (61, 75), (6, 10), -32, "#67a85f", "#345f39")
    ellipse(draw, (27, 42, 67, 78), "#4f8e45", "#2d572f", 1.2)
    ellipse(draw, (34, 47, 60, 72), "#87bd56", "#3d7036", 1.0)
    line(draw, [(47, 47), (47, 72)], "#4d7e38", 1.0, 160)
    line(draw, [(35, 58), (59, 58)], "#4d7e38", 1.0, 160)
    eye(draw, 70, 55, 0.72)
    ellipse(draw, (73, 60, 76, 62.5), "#315536", "#315536", 0.3)
    return finish(canvas)


def render_frog(_: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    shadow(draw, 24, 72, 82)
    ellipse(draw, (27, 46, 69, 80), "#68b957", "#2d6b35", 1.2)
    ellipse(draw, (29, 30, 67, 64), "#7ccc61", "#2d6b35", 1.2)
    ellipse(draw, (33, 25, 45, 37), "#7ccc61", "#2d6b35", 0.9)
    ellipse(draw, (51, 25, 63, 37), "#7ccc61", "#2d6b35", 0.9)
    eye(draw, 39, 32, 0.78)
    eye(draw, 57, 32, 0.78)
    line(draw, [(38, 49), (48, 53), (58, 49)], "#2f6734", 1.2, 160)
    rotated_ellipse(canvas, (30, 78), (4, 10), 70, "#65b255", "#2d6b35")
    rotated_ellipse(canvas, (66, 78), (4, 10), -70, "#65b255", "#2d6b35")
    return finish(canvas)


RENDERERS = {
    "puppy": render_puppy,
    "kitten": render_kitten,
    "bunny": render_bunny,
    "chick": render_chick,
    "duckling": render_duckling,
    "piglet": render_piglet,
    "calf": render_calf,
    "lamb": render_lamb,
    "goat": render_goat,
    "foal": render_foal,
    "fawn": render_fawn,
    "fox": render_fox,
    "bear": render_bear,
    "panda": render_panda,
    "koala": render_koala,
    "penguin": render_penguin,
    "seal": render_seal,
    "elephant": render_elephant,
    "giraffe": render_giraffe,
    "monkey": render_monkey,
    "squirrel": render_squirrel,
    "hedgehog": render_hedgehog,
    "hamster": render_hamster,
    "turtle": render_turtle,
    "frog": render_frog,
}


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    ITEM_DIR.mkdir(parents=True, exist_ok=True)

    sheet = Image.new("RGBA", (CELL_SIZE * SHEET_COLUMNS, CELL_SIZE * SHEET_COLUMNS), (0, 0, 0, 0))
    manifest = {
        "name": "baby-animal-small-5x5",
        "description": "Twenty-five small single-object baby animal PNG assets with transparent alpha backgrounds.",
        "format": "PNG RGBA",
        "transparentBackground": True,
        "cellSize": CELL_SIZE,
        "columns": SHEET_COLUMNS,
        "rows": SHEET_COLUMNS,
        "spritesheet": "baby-animal-spritesheet-5x5.png",
        "individualDir": "items",
        "items": [],
    }

    for index, spec in enumerate(ANIMALS):
        image = RENDERERS[spec["renderer"]](spec)
        file_name = f"{spec['id']}.png"
        image.save(ITEM_DIR / file_name)
        col = index % SHEET_COLUMNS
        row = index // SHEET_COLUMNS
        sheet.alpha_composite(image, (col * CELL_SIZE, row * CELL_SIZE))
        manifest["items"].append(
            {
                "id": spec["id"],
                "file": f"items/{file_name}",
                "index": index,
                "row": row,
                "column": col,
                "x": col * CELL_SIZE,
                "y": row * CELL_SIZE,
                "width": CELL_SIZE,
                "height": CELL_SIZE,
                "category": spec["category"],
                "species": spec["species"],
                "color": spec["color"],
            }
        )

    sheet.save(OUTPUT_DIR / "baby-animal-spritesheet-5x5.png")
    (OUTPUT_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    random.seed(1414)
    main()
