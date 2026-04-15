from __future__ import annotations

import json
import math
import random
from pathlib import Path

from PIL import Image, ImageDraw


CELL_SIZE = 96
SCALE = 4
SHEET_COLUMNS = 5
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "assets" / "c14" / "misc" / "images" / "plant-small-5x5"
ITEM_DIR = OUTPUT_DIR / "items"


ASSETS = [
    {"id": "plant-01-red-flower", "category": "flower", "color": "red", "renderer": "flower", "petal": "#e85c5c", "center": "#ffd46a", "petals": 6},
    {"id": "plant-02-pink-flower", "category": "flower", "color": "pink", "renderer": "flower", "petal": "#f27aa8", "center": "#fff0a4", "petals": 7},
    {"id": "plant-03-yellow-flower", "category": "flower", "color": "yellow", "renderer": "flower", "petal": "#f6cf45", "center": "#8a5d2f", "petals": 8},
    {"id": "plant-04-blue-flower", "category": "flower", "color": "blue", "renderer": "flower", "petal": "#5aa7e8", "center": "#f4e38b", "petals": 6},
    {"id": "plant-05-purple-flower", "category": "flower", "color": "purple", "renderer": "flower", "petal": "#9a74e8", "center": "#f6c86b", "petals": 7},
    {"id": "plant-06-white-flower", "category": "flower", "color": "white", "renderer": "daisy", "petal": "#fff8e8", "center": "#f1b940", "petals": 10},
    {"id": "plant-07-orange-tulip", "category": "flower", "color": "orange", "renderer": "tulip", "petal": "#f28a3f", "center": "#f6b45b"},
    {"id": "plant-08-violet-tulip", "category": "flower", "color": "violet", "renderer": "tulip", "petal": "#8b5ed8", "center": "#b189f0"},
    {"id": "plant-09-red-poppy", "category": "flower", "color": "red", "renderer": "poppy", "petal": "#e24b4b", "center": "#25291f"},
    {"id": "plant-10-yellow-daisy", "category": "flower", "color": "yellow", "renderer": "daisy", "petal": "#ffe36c", "center": "#9d672d", "petals": 12},
    {"id": "plant-11-blue-bellflower", "category": "flower", "color": "blue", "renderer": "bell", "petal": "#5d89dd", "center": "#89b8f1"},
    {"id": "plant-12-pink-cosmos", "category": "flower", "color": "pink", "renderer": "cosmos", "petal": "#f7a1c5", "center": "#ffd15c"},
    {"id": "plant-13-lavender-sprig", "category": "herb", "color": "lavender", "renderer": "lavender", "petal": "#8c6fd1", "center": "#bda8f2"},
    {"id": "plant-14-mint-sprout", "category": "sprout", "color": "mint", "renderer": "sprout", "leaf": "#75c98a"},
    {"id": "plant-15-emerald-grass", "category": "grass", "color": "emerald", "renderer": "grass", "leaf": "#2f9952"},
    {"id": "plant-16-lime-grass", "category": "grass", "color": "lime", "renderer": "grass", "leaf": "#73bf43"},
    {"id": "plant-17-dark-grass", "category": "grass", "color": "dark-green", "renderer": "grass", "leaf": "#2e7b46"},
    {"id": "plant-18-meadow-grass", "category": "grass", "color": "mixed-green", "renderer": "meadow", "leaf": "#5fae4f"},
    {"id": "plant-19-tall-reed", "category": "grass", "color": "reed-green", "renderer": "reed", "leaf": "#6aa657"},
    {"id": "plant-20-golden-wheatgrass", "category": "grass", "color": "gold", "renderer": "wheat", "leaf": "#d1a543"},
    {"id": "plant-21-clover", "category": "ground-plant", "color": "green", "renderer": "clover", "leaf": "#4ba65a"},
    {"id": "plant-22-moss-patch", "category": "ground-plant", "color": "moss", "renderer": "moss", "leaf": "#6f9f3d"},
    {"id": "plant-23-leaf-bush", "category": "bush", "color": "green", "renderer": "bush", "leaf": "#4c9a57"},
    {"id": "plant-24-fern", "category": "fern", "color": "green", "renderer": "fern", "leaf": "#3f9a59"},
    {"id": "plant-25-lawn-tuft", "category": "grass", "color": "fresh-green", "renderer": "lawn", "leaf": "#57b65a"},
]


def scaled(value: float) -> int:
    return int(round(value * SCALE))


def xy(point: tuple[float, float]) -> tuple[int, int]:
    return scaled(point[0]), scaled(point[1])


def box(x0: float, y0: float, x1: float, y1: float) -> tuple[int, int, int, int]:
    return scaled(x0), scaled(y0), scaled(x1), scaled(y1)


def rgba(value: str, alpha: int = 255) -> tuple[int, int, int, int]:
    value = value.lstrip("#")
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


def new_canvas() -> Image.Image:
    return Image.new("RGBA", (CELL_SIZE * SCALE, CELL_SIZE * SCALE), (0, 0, 0, 0))


def finish(canvas: Image.Image) -> Image.Image:
    return canvas.resize((CELL_SIZE, CELL_SIZE), Image.Resampling.LANCZOS)


def draw_shadow(draw: ImageDraw.ImageDraw, x0: float = 31, x1: float = 65, y: float = 83, alpha: int = 34) -> None:
    draw.ellipse(box(x0, y - 3, x1, y + 3), fill=rgba("#163621", alpha))


def curve_points(points: list[tuple[float, float]], steps: int = 18) -> list[tuple[int, int]]:
    if len(points) != 3:
        return [xy(point) for point in points]
    (x0, y0), (x1, y1), (x2, y2) = points
    result = []
    for index in range(steps + 1):
        t = index / steps
        mt = 1 - t
        x = mt * mt * x0 + 2 * mt * t * x1 + t * t * x2
        y = mt * mt * y0 + 2 * mt * t * y1 + t * t * y2
        result.append(xy((x, y)))
    return result


def draw_curve(draw: ImageDraw.ImageDraw, points: list[tuple[float, float]], fill: str, width: float = 3, outline: str | None = None) -> None:
    line = curve_points(points)
    if outline:
        draw.line(line, fill=rgba(outline, 180), width=scaled(width + 1.8), joint="curve")
    draw.line(line, fill=rgba(fill, 255), width=scaled(width), joint="curve")


def rotated_ellipse(
    canvas: Image.Image,
    center: tuple[float, float],
    radii: tuple[float, float],
    angle: float,
    fill: tuple[int, int, int, int],
    outline: tuple[int, int, int, int] | None = None,
    outline_width: float = 1.0,
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
    if outline:
        draw.ellipse(bounds, fill=outline)
        inset = scaled(outline_width)
        inner = (bounds[0] + inset, bounds[1] + inset, bounds[2] - inset, bounds[3] - inset)
        draw.ellipse(inner, fill=fill)
    else:
        draw.ellipse(bounds, fill=fill)
    rotated = patch.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    left = scaled(center[0]) - rotated.width // 2
    top = scaled(center[1]) - rotated.height // 2
    canvas.alpha_composite(rotated, (left, top))


def draw_leaf(canvas: Image.Image, center: tuple[float, float], color: str, angle: float, size: tuple[float, float] = (7, 13)) -> None:
    rotated_ellipse(canvas, center, size, angle, shade(color, 1.04), shade(color, 0.62), 1.1)
    draw = ImageDraw.Draw(canvas, "RGBA")
    dx = math.cos(math.radians(angle)) * size[1] * 0.55
    dy = math.sin(math.radians(angle)) * size[1] * 0.55
    draw.line([xy((center[0] - dx, center[1] - dy)), xy((center[0] + dx, center[1] + dy))], fill=shade(color, 1.25, 130), width=scaled(0.8))


def draw_stem_and_leaves(canvas: Image.Image, stem: str = "#438a46", leaf: str = "#57a85e") -> None:
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw_shadow(draw)
    draw_curve(draw, [(48, 82), (47, 66), (49, 51)], stem, 3.0, "#246235")
    draw_leaf(canvas, (40.5, 69), leaf, -35, (5.4, 12.5))
    draw_leaf(canvas, (56.2, 63), leaf, 34, (5.4, 12.5))


def render_flower(spec: dict) -> Image.Image:
    canvas = new_canvas()
    petal = spec["petal"]
    center = spec["center"]
    draw_stem_and_leaves(canvas)
    c = (48, 43)
    petal_count = spec.get("petals", 6)
    for index in range(petal_count):
        angle = 360 / petal_count * index
        px = c[0] + math.cos(math.radians(angle)) * 8.4
        py = c[1] + math.sin(math.radians(angle)) * 8.0
        rotated_ellipse(canvas, (px, py), (5.6, 10.2), angle, shade(petal, 1.08), shade(petal, 0.68), 1)
    rotated_ellipse(canvas, (44.2, 39.4), (2.0, 3.5), -35, shade(petal, 1.35, 120))
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.ellipse(box(41.4, 36.8, 54.6, 50.0), fill=shade(center, 0.72))
    draw.ellipse(box(43.0, 38.3, 53.0, 48.3), fill=rgba(center))
    draw.ellipse(box(45.5, 40.1, 48.2, 42.8), fill=shade(center, 1.25, 150))
    return finish(canvas)


def render_daisy(spec: dict) -> Image.Image:
    canvas = new_canvas()
    petal = spec["petal"]
    center = spec["center"]
    draw_stem_and_leaves(canvas, leaf="#5ba75d")
    c = (48, 43)
    for index in range(spec.get("petals", 11)):
        angle = 360 / spec.get("petals", 11) * index
        px = c[0] + math.cos(math.radians(angle)) * 9.2
        py = c[1] + math.sin(math.radians(angle)) * 8.8
        rotated_ellipse(canvas, (px, py), (3.7, 10.0), angle, shade(petal, 1.03), shade(petal, 0.76), 0.8)
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.ellipse(box(40.8, 35.8, 55.2, 50.2), fill=shade(center, 0.62))
    draw.ellipse(box(42.2, 37.2, 53.8, 48.8), fill=rgba(center))
    for x, y in [(45, 40), (49, 42), (47, 46), (51, 39)]:
        draw.ellipse(box(x, y, x + 1.8, y + 1.8), fill=shade(center, 1.35, 145))
    return finish(canvas)


def render_tulip(spec: dict) -> Image.Image:
    canvas = new_canvas()
    petal = spec["petal"]
    draw_stem_and_leaves(canvas, stem="#3f8848", leaf="#5eb468")
    draw = ImageDraw.Draw(canvas, "RGBA")
    outline = shade(petal, 0.58)
    draw.polygon([xy((34, 44)), xy((39, 26)), xy((47, 38)), xy((54, 26)), xy((62, 44)), xy((56, 57)), xy((40, 57))], fill=outline)
    draw.polygon([xy((36.5, 43)), xy((40.5, 30)), xy((47.5, 41)), xy((54.5, 30)), xy((59.5, 43)), xy((54, 54)), xy((42, 54))], fill=rgba(petal))
    rotated_ellipse(canvas, (42.5, 43), (6.2, 14), -16, shade(petal, 1.12, 230))
    rotated_ellipse(canvas, (53.5, 43), (6.2, 14), 16, shade(petal, 0.93, 235))
    rotated_ellipse(canvas, (48, 41), (5.5, 15.5), 0, shade(spec.get("center", petal), 1.08, 235))
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.arc(box(39, 34, 57, 54), start=198, end=338, fill=shade(petal, 1.32, 120), width=scaled(1.2))
    return finish(canvas)


def render_poppy(spec: dict) -> Image.Image:
    canvas = new_canvas()
    petal = spec["petal"]
    draw_stem_and_leaves(canvas, stem="#3c8448", leaf="#619e62")
    c = (48, 43)
    for center, radii, angle in [((39, 40), (9, 13), -32), ((57, 40), (9, 13), 32), ((42, 49), (10, 12), 26), ((54, 49), (10, 12), -26)]:
        rotated_ellipse(canvas, center, radii, angle, shade(petal, 1.05), shade(petal, 0.55), 1.1)
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.ellipse(box(c[0] - 6.2, c[1] - 5.8, c[0] + 6.2, c[1] + 6.0), fill=rgba(spec["center"]))
    draw.ellipse(box(45.7, 40.4, 48.2, 43.0), fill=rgba("#f4c65c", 170))
    draw.ellipse(box(50.1, 43.2, 52.4, 45.5), fill=rgba("#f4c65c", 150))
    return finish(canvas)


def render_bell(spec: dict) -> Image.Image:
    canvas = new_canvas()
    petal = spec["petal"]
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw_shadow(draw, 34, 62, 83)
    draw_curve(draw, [(45, 82), (47, 61), (55, 42)], "#3f8646", 2.8, "#246235")
    draw_leaf(canvas, (40, 68), "#61a865", -34, (4.8, 12))
    draw_leaf(canvas, (51, 60), "#64ad6a", 28, (4.4, 10.5))
    draw_curve(draw, [(54, 43), (50, 40), (45, 40)], "#3f8646", 2.2, "#246235")
    draw.polygon([xy((34, 39)), xy((57, 39)), xy((63, 57)), xy((47, 65)), xy((31, 56))], fill=shade(petal, 0.58))
    draw.polygon([xy((36.5, 41)), xy((55.5, 41)), xy((60, 55)), xy((47, 61)), xy((34, 55))], fill=rgba(petal))
    rotated_ellipse(canvas, (40, 53), (4.3, 12), 9, shade(petal, 1.12, 190))
    rotated_ellipse(canvas, (53, 53), (4.3, 12), -9, shade(petal, 0.92, 190))
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.arc(box(36, 48, 58, 64), start=8, end=172, fill=shade(spec["center"], 1.05, 170), width=scaled(1.4))
    return finish(canvas)


def render_cosmos(spec: dict) -> Image.Image:
    canvas = new_canvas()
    petal = spec["petal"]
    draw_stem_and_leaves(canvas, stem="#438a46", leaf="#5fae65")
    c = (48, 43)
    for index in range(8):
        angle = index * 45
        px = c[0] + math.cos(math.radians(angle)) * 8
        py = c[1] + math.sin(math.radians(angle)) * 8
        rotated_ellipse(canvas, (px, py), (4.8, 11.8), angle, shade(petal, 1.08), shade(petal, 0.66), 0.8)
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw.ellipse(box(42.0, 37.1, 54.0, 49.1), fill=shade(spec["center"], 0.68))
    draw.ellipse(box(43.2, 38.4, 52.8, 48.0), fill=rgba(spec["center"]))
    return finish(canvas)


def render_lavender(spec: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw_shadow(draw, 34, 62, 83)
    draw_curve(draw, [(48, 83), (47, 59), (49, 27)], "#4d8650", 2.8, "#2b6034")
    draw_leaf(canvas, (40, 69), "#6fae65", -35, (4.2, 12))
    draw_leaf(canvas, (55, 64), "#74b66f", 33, (4.2, 11))
    for index, y in enumerate(range(29, 58, 5)):
        offset = -4.5 if index % 2 == 0 else 4.5
        rotated_ellipse(canvas, (48 + offset, y), (4.2, 6.0), -25 if offset < 0 else 25, shade(spec["petal"], 1.0 + (index % 3) * 0.08), shade(spec["petal"], 0.62), 0.6)
    rotated_ellipse(canvas, (49, 24), (3.8, 5.4), 0, shade(spec["center"], 1.02), shade(spec["petal"], 0.62), 0.6)
    return finish(canvas)


def render_sprout(spec: dict) -> Image.Image:
    canvas = new_canvas()
    leaf = spec["leaf"]
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw_shadow(draw, 34, 62, 83)
    draw_curve(draw, [(48, 82), (49, 68), (48, 52)], "#3e8845", 3.0, "#255c34")
    draw_leaf(canvas, (39, 57), leaf, -24, (6.5, 15))
    draw_leaf(canvas, (57, 55), shade_hex(leaf, 1.04), 28, (6.7, 15))
    draw_leaf(canvas, (48, 46), shade_hex(leaf, 1.12), 0, (5.5, 11))
    return finish(canvas)


def shade_hex(value: str, factor: float) -> str:
    r, g, b, _ = shade(value, factor)
    return f"#{r:02x}{g:02x}{b:02x}"


def draw_grass_blade(draw: ImageDraw.ImageDraw, base: tuple[float, float], length: float, bend: float, color: str, width: float = 2.4) -> None:
    x, y = base
    tip = (x + bend, y - length)
    ctrl = (x + bend * 0.24, y - length * 0.58)
    draw_curve(draw, [base, ctrl, tip], color, width, shade_hex(color, 0.58))


def render_grass(spec: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw_shadow(draw, 27, 69, 84, 30)
    rng = random.Random(spec["id"])
    base_color = spec["leaf"]
    for index in range(17):
        base_x = 36 + rng.random() * 24
        base_y = 82 + rng.random() * 4
        length = 16 + rng.random() * 21
        bend = -14 + rng.random() * 28
        color = shade_hex(base_color, 0.75 + rng.random() * 0.52)
        draw_grass_blade(draw, (base_x, base_y), length, bend, color, 1.7 + rng.random() * 1.3)
    return finish(canvas)


def render_meadow(spec: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw_shadow(draw, 25, 72, 84, 32)
    rng = random.Random(spec["id"])
    for index in range(20):
        color = rng.choice(["#3f954f", "#67af45", "#85bb4b", "#4b9f64"])
        draw_grass_blade(draw, (33 + rng.random() * 31, 84 + rng.random() * 2), 12 + rng.random() * 24, -14 + rng.random() * 28, color, 1.5 + rng.random())
    for x, y, c in [(39, 61, "#f2d65d"), (55, 64, "#f7a4c7"), (49, 56, "#e7f2ff")]:
        draw.ellipse(box(x - 2.4, y - 2.4, x + 2.4, y + 2.4), fill=shade(c, 0.66))
        draw.ellipse(box(x - 1.6, y - 1.6, x + 1.6, y + 1.6), fill=rgba(c))
    return finish(canvas)


def render_reed(spec: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw_shadow(draw, 31, 66, 84, 32)
    stems = [(42, 82, -9, 43), (50, 83, 1, 51), (58, 83, 9, 45)]
    for x, y, bend, length in stems:
        draw_grass_blade(draw, (x, y), length, bend, "#5f9651", 2.2)
    for center, angle in [((35, 38), -22), ((51, 32), 3), ((66, 39), 23)]:
        rotated_ellipse(canvas, center, (3.6, 12), angle, rgba("#9b7a45"), rgba("#6e5935", 220), 0.8)
    return finish(canvas)


def render_wheat(spec: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw_shadow(draw, 29, 68, 84, 30)
    for x, bend, length in [(41, -5, 45), (49, 0, 50), (57, 7, 43)]:
        draw_grass_blade(draw, (x, 84), length, bend, "#b98f39", 1.9)
        tip = (x + bend, 84 - length)
        for k in range(5):
            y = tip[1] + 5 + k * 5
            rotated_ellipse(canvas, (tip[0] - 3.2, y), (2.2, 5.2), -45, shade(spec["leaf"], 1.12), shade(spec["leaf"], 0.72), 0.5)
            rotated_ellipse(canvas, (tip[0] + 3.2, y), (2.2, 5.2), 45, shade(spec["leaf"], 1.0), shade(spec["leaf"], 0.72), 0.5)
    return finish(canvas)


def render_clover(spec: dict) -> Image.Image:
    canvas = new_canvas()
    leaf = spec["leaf"]
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw_shadow(draw, 30, 66, 83, 35)
    for cx, cy, scale in [(42, 64, 1.0), (53, 61, 0.92), (49, 74, 0.82)]:
        draw_curve(draw, [(48, 83), (cx, 76), (cx, cy + 5)], "#397c42", 1.5, "#275a33")
        for angle in [-35, 35, 90]:
            px = cx + math.cos(math.radians(angle)) * 4.2 * scale
            py = cy + math.sin(math.radians(angle)) * 3.6 * scale
            rotated_ellipse(canvas, (px, py), (4.4 * scale, 5.4 * scale), angle, shade(leaf, 1.05), shade(leaf, 0.62), 0.6)
    return finish(canvas)


def render_moss(spec: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw_shadow(draw, 25, 72, 83, 30)
    rng = random.Random(spec["id"])
    for index in range(22):
        x = 31 + rng.random() * 33
        y = 67 + rng.random() * 14
        r = 3.2 + rng.random() * 5.2
        color = shade_hex(spec["leaf"], 0.72 + rng.random() * 0.55)
        draw.ellipse(box(x - r, y - r * 0.72, x + r, y + r * 0.72), fill=shade(color, 0.68, 220))
        draw.ellipse(box(x - r + 0.8, y - r * 0.72 + 0.8, x + r - 0.8, y + r * 0.72 - 0.8), fill=rgba(color, 238))
    return finish(canvas)


def render_bush(spec: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw_shadow(draw, 27, 70, 83, 38)
    clusters = [(42, 59, 13), (55, 58, 12), (48, 48, 12), (36, 67, 10), (60, 68, 10), (48, 70, 13)]
    for x, y, r in clusters:
        color = shade_hex(spec["leaf"], 0.78 + ((x + y) % 5) * 0.08)
        draw.ellipse(box(x - r, y - r * 0.86, x + r, y + r * 0.86), fill=shade(color, 0.55, 235))
        draw.ellipse(box(x - r + 1.3, y - r * 0.86 + 1.3, x + r - 1.3, y + r * 0.86 - 1.3), fill=rgba(color, 246))
    for x, y in [(43, 50), (54, 55), (38, 63), (57, 66)]:
        draw.ellipse(box(x, y, x + 3, y + 2), fill=rgba("#9fd66f", 115))
    return finish(canvas)


def render_fern(spec: dict) -> Image.Image:
    canvas = new_canvas()
    leaf = spec["leaf"]
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw_shadow(draw, 30, 66, 83, 34)
    draw_curve(draw, [(49, 83), (47, 61), (52, 37)], "#377843", 2.4, "#265b34")
    for index in range(8):
        y = 75 - index * 4.8
        span = 7.5 + index * 0.4
        center_x = 49 + math.sin(index * 0.7) * 2
        rotated_ellipse(canvas, (center_x - span, y), (2.5, 8.2), -62, shade(leaf, 0.9 + index * 0.025), shade(leaf, 0.56), 0.5)
        rotated_ellipse(canvas, (center_x + span, y - 1.5), (2.5, 8.2), 62, shade(leaf, 1.02), shade(leaf, 0.56), 0.5)
    return finish(canvas)


def render_lawn(spec: dict) -> Image.Image:
    canvas = new_canvas()
    draw = ImageDraw.Draw(canvas, "RGBA")
    draw_shadow(draw, 24, 72, 84, 30)
    rng = random.Random(spec["id"])
    for index in range(24):
        x = 30 + rng.random() * 36
        y = 83 + rng.random() * 3
        length = 8 + rng.random() * 16
        bend = -8 + rng.random() * 16
        draw_grass_blade(draw, (x, y), length, bend, shade_hex(spec["leaf"], 0.82 + rng.random() * 0.5), 1.3 + rng.random() * 0.8)
    for x in [34, 43, 52, 61]:
        draw.ellipse(box(x, 80.5, x + 4, 83.2), fill=rgba("#7fcf62", 120))
    return finish(canvas)


RENDERERS = {
    "flower": render_flower,
    "daisy": render_daisy,
    "tulip": render_tulip,
    "poppy": render_poppy,
    "bell": render_bell,
    "cosmos": render_cosmos,
    "lavender": render_lavender,
    "sprout": render_sprout,
    "grass": render_grass,
    "meadow": render_meadow,
    "reed": render_reed,
    "wheat": render_wheat,
    "clover": render_clover,
    "moss": render_moss,
    "bush": render_bush,
    "fern": render_fern,
    "lawn": render_lawn,
}


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    ITEM_DIR.mkdir(parents=True, exist_ok=True)

    sheet = Image.new("RGBA", (CELL_SIZE * SHEET_COLUMNS, CELL_SIZE * SHEET_COLUMNS), (0, 0, 0, 0))
    manifest = {
        "name": "plant-small-5x5",
        "description": "Twenty-five small single-object plant PNG assets with transparent alpha backgrounds.",
        "format": "PNG RGBA",
        "transparentBackground": True,
        "cellSize": CELL_SIZE,
        "columns": SHEET_COLUMNS,
        "rows": SHEET_COLUMNS,
        "spritesheet": "plant-spritesheet-5x5.png",
        "individualDir": "items",
        "items": [],
    }

    for index, spec in enumerate(ASSETS):
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
                "color": spec["color"],
            }
        )

    sheet.save(OUTPUT_DIR / "plant-spritesheet-5x5.png")
    (OUTPUT_DIR / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
