(() => {
  "use strict";

  const canvas = document.getElementById("sandboxCanvas");
  const ctx = canvas.getContext("2d");

  const ui = {
    palette: document.getElementById("palette"),
    paletteTitle: document.getElementById("paletteTitle"),
    selectedLabel: document.getElementById("selectedLabel"),
    statusPill: document.getElementById("statusPill"),
    fieldCount: document.getElementById("fieldCount"),
    orchardCount: document.getElementById("orchardCount"),
    pastureCount: document.getElementById("pastureCount"),
    scatterButton: document.getElementById("scatterButton"),
    clearModeButton: document.getElementById("clearModeButton"),
    clearAllButton: document.getElementById("clearAllButton"),
    motionButton: document.getElementById("motionButton"),
    modeTabs: Array.from(document.querySelectorAll("[data-mode]"))
  };

  const ASSET_ROOT = "../../assets/c14/misc/images/living-things-common";
  const asset = (path) => `${ASSET_ROOT}/${path}`;

  const zones = {
    field: {
      label: "밭",
      title: "밭 생물",
      rect: { x: 52, y: 318, w: 348, h: 332 },
      tone: "#4f9d56"
    },
    orchard: {
      label: "과수원",
      title: "과수원 생물",
      rect: { x: 430, y: 272, w: 338, h: 378 },
      tone: "#1f8a6b"
    },
    pasture: {
      label: "가축농장",
      title: "가축농장 생물",
      rect: { x: 806, y: 292, w: 342, h: 358 },
      tone: "#d97745"
    }
  };

  const catalog = {
    field: [
      item("carrot", "당근", "field", "plants/produce-vegetable/produce-vegetable-02-carrot.png", 58, "crop"),
      item("napa", "배추", "field", "plants/produce-vegetable/produce-vegetable-01-napa-cabbage.png", 60, "crop"),
      item("lettuce", "상추", "field", "plants/produce-vegetable/produce-vegetable-12-lettuce.png", 62, "crop"),
      item("radish", "무", "field", "plants/produce-vegetable/produce-vegetable-10-radish.png", 58, "crop"),
      item("broccoli", "브로콜리", "field", "plants/produce-vegetable/produce-vegetable-08-broccoli.png", 56, "crop"),
      item("corn", "옥수수", "field", "plants/produce-vegetable/produce-vegetable-28-corn.png", 64, "crop"),
      item("cucumber", "오이", "field", "plants/produce-vegetable/produce-vegetable-25-cucumber.png", 56, "crop"),
      item("potato", "감자", "field", "plants/produce-vegetable/produce-vegetable-24-potato.png", 56, "crop"),
      item("sprout", "새싹", "field", "plants/sheet-small/sheet-plant-23-green-sprout.png", 48, "crop")
    ],
    orchard: [
      item("apple-tree", "사과나무", "orchard", "plants/medium/medium-plant-08-apple-tree.png", 138, "tree"),
      item("cherry-tree", "벚나무", "orchard", "plants/medium/medium-plant-04-cherry-blossom-tree.png", 138, "tree"),
      item("maple-tree", "단풍나무", "orchard", "plants/medium/medium-plant-02-maple-tree.png", 132, "tree"),
      item("pine-tree", "소나무", "orchard", "plants/medium/medium-plant-03-pine-tree.png", 132, "tree"),
      item("apple", "사과", "orchard", "plants/produce-fruit/produce-fruit-01-red-apple.png", 48, "fruit"),
      item("strawberry", "딸기", "orchard", "plants/produce-fruit/produce-fruit-04-strawberry.png", 48, "fruit"),
      item("grapes", "포도", "orchard", "plants/produce-fruit/produce-fruit-11-purple-grapes.png", 50, "fruit"),
      item("orange", "귤", "orchard", "plants/produce-fruit/produce-fruit-26-tangerine.png", 48, "fruit"),
      item("grass", "풀", "orchard", "plants/generated-small/plant-18-meadow-grass.png", 44, "grass")
    ],
    pasture: [
      item("cow", "소", "pasture", "animals/farm-medium/farm-01-cow.png", 96, "animal"),
      item("horse", "말", "pasture", "animals/farm-medium/farm-02-horse.png", 98, "animal"),
      item("sheep", "양", "pasture", "animals/farm-medium/farm-04-sheep.png", 86, "animal"),
      item("pig", "돼지", "pasture", "animals/farm-medium/farm-06-pig.png", 86, "animal"),
      item("deer", "사슴", "pasture", "animals/farm-medium/farm-09-deer.png", 94, "animal"),
      item("goat", "염소", "pasture", "animals/cartoon-small/cartoon-15-goat.png", 76, "animal"),
      item("hen", "닭", "pasture", "animals/cartoon-small/cartoon-02-hen.png", 68, "animal"),
      item("calf", "송아지", "pasture", "animals/baby-small/baby-07-calf.png", 56, "animal"),
      item("chick", "병아리", "pasture", "animals/baby-small/baby-04-chick.png", 44, "animal")
    ]
  };

  const images = new Map();
  const state = {
    mode: "field",
    selectedId: "carrot",
    items: [],
    draggingId: null,
    dragOffset: { x: 0, y: 0 },
    motion: true,
    lastTime: performance.now(),
    nextId: 1,
    wind: Math.random() * 10
  };

  setup();

  function item(id, label, zone, file, baseSize, kind) {
    return {
      id,
      label,
      zone,
      src: asset(file),
      baseSize,
      kind
    };
  }

  function setup() {
    ui.modeTabs.forEach((button) => {
      button.addEventListener("click", () => setMode(button.dataset.mode));
    });
    ui.scatterButton.addEventListener("click", () => scatterMode(state.mode));
    ui.clearModeButton.addEventListener("click", () => clearMode(state.mode));
    ui.clearAllButton.addEventListener("click", clearAll);
    ui.motionButton.addEventListener("click", toggleMotion);

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerUp);
    canvas.addEventListener("dblclick", handleDoubleClick);

    renderPalette();
    seedInitialScene();
    updateUi();
    requestAnimationFrame(loop);
  }

  function seedInitialScene() {
    [
      ["field", "carrot", 126, 520],
      ["field", "lettuce", 242, 468],
      ["field", "corn", 330, 536],
      ["orchard", "apple-tree", 540, 472],
      ["orchard", "apple", 654, 556],
      ["pasture", "cow", 912, 500],
      ["pasture", "sheep", 1030, 548]
    ].forEach(([mode, id, x, y]) => addItem(id, x, y, { zone: mode }));
  }

  function setMode(mode) {
    if (!zones[mode]) {
      return;
    }
    state.mode = mode;
    state.selectedId = catalog[mode][0].id;
    renderPalette();
    updateUi();
  }

  function renderPalette() {
    const assets = catalog[state.mode];
    ui.palette.innerHTML = assets
      .map((entry) => `
        <button class="asset-button${entry.id === state.selectedId ? " is-selected" : ""}" type="button" data-asset-id="${escapeAttr(entry.id)}">
          <img src="${escapeAttr(entry.src)}" alt="" />
          <span>${escapeHtml(entry.label)}</span>
        </button>
      `)
      .join("");

    ui.palette.querySelectorAll("[data-asset-id]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedId = button.dataset.assetId;
        renderPalette();
        updateUi();
      });
    });
  }

  function selectedDefinition() {
    return catalog[state.mode].find((entry) => entry.id === state.selectedId) || catalog[state.mode][0];
  }

  function findDefinition(assetId) {
    return Object.values(catalog).flat().find((entry) => entry.id === assetId);
  }

  function addItem(assetId, x, y, options = {}) {
    const definition = findDefinition(assetId);
    if (!definition) {
      return null;
    }
    const zoneKey = options.zone || definition.zone;
    const point = clampToZone(x, y, zoneKey, definition);
    const placed = {
      id: `placed-${state.nextId++}`,
      assetId,
      zone: zoneKey,
      x: point.x,
      y: point.y,
      size: definition.baseSize * random(0.9, 1.14),
      phase: random(0, Math.PI * 2),
      vx: definition.kind === "animal" ? random(-28, 28) : 0,
      vy: definition.kind === "animal" ? random(-18, 18) : 0,
      pause: random(0.1, 1.4),
      flip: Math.random() > 0.5 ? 1 : -1
    };
    state.items.push(placed);
    updateUi();
    return placed;
  }

  function scatterMode(mode) {
    const assets = catalog[mode];
    const count = mode === "pasture" ? 8 : 10;
    for (let i = 0; i < count; i += 1) {
      const definition = assets[i % assets.length];
      const rect = zones[mode].rect;
      const x = random(rect.x + 42, rect.x + rect.w - 42);
      const y = random(rect.y + 74, rect.y + rect.h - 22);
      addItem(definition.id, x, y, { zone: mode });
    }
  }

  function clearMode(mode) {
    state.items = state.items.filter((entry) => entry.zone !== mode);
    updateUi();
  }

  function clearAll() {
    state.items = [];
    state.draggingId = null;
    updateUi();
  }

  function toggleMotion() {
    state.motion = !state.motion;
    ui.motionButton.textContent = state.motion ? "움직임 켜짐" : "움직임 꺼짐";
  }

  function getCanvasPoint(event) {
    const bounds = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - bounds.left) / bounds.width) * canvas.width,
      y: ((event.clientY - bounds.top) / bounds.height) * canvas.height
    };
  }

  function handlePointerDown(event) {
    const point = getCanvasPoint(event);
    const hit = hitTest(point.x, point.y);
    if (hit) {
      state.draggingId = hit.id;
      state.dragOffset.x = hit.x - point.x;
      state.dragOffset.y = hit.y - point.y;
      canvas.setPointerCapture?.(event.pointerId);
      return;
    }

    const definition = selectedDefinition();
    if (!isInsideZone(point.x, point.y, state.mode)) {
      const center = getZoneCenter(state.mode);
      addItem(definition.id, center.x, center.y, { zone: state.mode });
      return;
    }
    addItem(definition.id, point.x, point.y, { zone: state.mode });
  }

  function handlePointerMove(event) {
    if (!state.draggingId) {
      return;
    }
    const itemEntry = state.items.find((entry) => entry.id === state.draggingId);
    if (!itemEntry) {
      return;
    }
    const definition = findDefinition(itemEntry.assetId);
    const point = getCanvasPoint(event);
    const clamped = clampToZone(point.x + state.dragOffset.x, point.y + state.dragOffset.y, itemEntry.zone, definition);
    itemEntry.x = clamped.x;
    itemEntry.y = clamped.y;
    itemEntry.vx *= 0.2;
    itemEntry.vy *= 0.2;
  }

  function handlePointerUp(event) {
    if (state.draggingId) {
      canvas.releasePointerCapture?.(event.pointerId);
    }
    state.draggingId = null;
  }

  function handleDoubleClick(event) {
    const point = getCanvasPoint(event);
    const hit = hitTest(point.x, point.y);
    if (!hit) {
      return;
    }
    state.items = state.items.filter((entry) => entry.id !== hit.id);
    updateUi();
  }

  function hitTest(x, y) {
    for (let i = state.items.length - 1; i >= 0; i -= 1) {
      const entry = state.items[i];
      const definition = findDefinition(entry.assetId);
      const size = entry.size;
      const height = size * imageRatio(definition.src, 0.9);
      if (Math.abs(x - entry.x) <= size * 0.55 && Math.abs(y - entry.y) <= height * 0.55) {
        return entry;
      }
    }
    return null;
  }

  function isInsideZone(x, y, zoneKey) {
    const rect = zones[zoneKey].rect;
    return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
  }

  function clampToZone(x, y, zoneKey, definition) {
    const rect = zones[zoneKey].rect;
    const padding = Math.max(18, definition.baseSize * 0.32);
    return {
      x: clamp(x, rect.x + padding, rect.x + rect.w - padding),
      y: clamp(y, rect.y + padding, rect.y + rect.h - 18)
    };
  }

  function getZoneCenter(zoneKey) {
    const rect = zones[zoneKey].rect;
    return {
      x: rect.x + rect.w / 2,
      y: rect.y + rect.h * 0.66
    };
  }

  function loop(time) {
    const dt = Math.min((time - state.lastTime) / 1000, 0.033);
    state.lastTime = time;
    update(dt, time);
    draw(time);
    requestAnimationFrame(loop);
  }

  function update(dt, time) {
    state.wind += dt * 0.8;
    if (!state.motion) {
      return;
    }
    state.items.forEach((entry) => {
      const definition = findDefinition(entry.assetId);
      if (!definition || definition.kind !== "animal" || entry.id === state.draggingId) {
        return;
      }
      entry.pause -= dt;
      if (entry.pause <= 0) {
        entry.vx += random(-18, 18);
        entry.vy += random(-12, 12);
        entry.pause = random(0.5, 2.2);
      }
      const speed = Math.hypot(entry.vx, entry.vy);
      const maxSpeed = definition.baseSize > 80 ? 38 : 52;
      if (speed > maxSpeed) {
        entry.vx = (entry.vx / speed) * maxSpeed;
        entry.vy = (entry.vy / speed) * maxSpeed;
      }
      entry.x += entry.vx * dt;
      entry.y += entry.vy * dt;
      entry.vx *= 0.985;
      entry.vy *= 0.985;
      if (Math.abs(entry.vx) > 2) {
        entry.flip = entry.vx < 0 ? -1 : 1;
      }
      const clamped = clampToZone(entry.x, entry.y, entry.zone, definition);
      if (clamped.x !== entry.x) {
        entry.vx *= -0.72;
      }
      if (clamped.y !== entry.y) {
        entry.vy *= -0.72;
      }
      entry.x = clamped.x;
      entry.y = clamped.y;
      entry.phase += dt * (3.2 + Math.min(speed / 18, 2));
    });
  }

  function draw(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(time);
    drawZones();
    drawItems(time);
    drawZoneLabels();
  }

  function drawBackground(time) {
    const sky = ctx.createLinearGradient(0, 0, 0, 320);
    sky.addColorStop(0, "#bfe8ff");
    sky.addColorStop(1, "#edf9ff");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255, 226, 126, 0.8)";
    ctx.beginPath();
    ctx.arc(1040, 96, 38, 0, Math.PI * 2);
    ctx.fill();

    drawCloud(140 + Math.sin(time / 1600) * 10, 92, 1);
    drawCloud(534 + Math.cos(time / 1800) * 12, 72, 0.8);
    drawCloud(812 + Math.sin(time / 2100) * 8, 132, 0.64);

    ctx.fillStyle = "#d7efb3";
    ctx.beginPath();
    ctx.ellipse(276, 352, 320, 92, -0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#c5e695";
    ctx.beginPath();
    ctx.ellipse(760, 356, 430, 112, 0.02, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#b9df82";
    ctx.beginPath();
    ctx.ellipse(1102, 372, 270, 86, 0.08, 0, Math.PI * 2);
    ctx.fill();

    const ground = ctx.createLinearGradient(0, 315, 0, canvas.height);
    ground.addColorStop(0, "#c7e997");
    ground.addColorStop(1, "#91c96c");
    ctx.fillStyle = ground;
    ctx.fillRect(0, 300, canvas.width, canvas.height - 300);
  }

  function drawCloud(x, y, scale) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
    ctx.beginPath();
    ctx.arc(x, y, 26 * scale, 0, Math.PI * 2);
    ctx.arc(x + 30 * scale, y - 8 * scale, 34 * scale, 0, Math.PI * 2);
    ctx.arc(x + 66 * scale, y, 24 * scale, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawZones() {
    drawFieldZone(zones.field.rect);
    drawOrchardZone(zones.orchard.rect);
    drawPastureZone(zones.pasture.rect);
  }

  function drawFieldZone(rect) {
    drawZoneBase(rect, "rgba(236, 253, 245, 0.28)", "#72b55f");
    for (let i = 0; i < 6; i += 1) {
      const y = rect.y + 42 + i * 43;
      drawRoundedRect(rect.x + 26, y, rect.w - 52, 22, 12, i % 2 ? "#a5d66f" : "#8fc95e");
      ctx.strokeStyle = "rgba(80, 112, 45, 0.2)";
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(rect.x + 34, y + 12);
      ctx.lineTo(rect.x + rect.w - 34, y + 8);
      ctx.stroke();
    }
    drawTinyFence(rect.x + 24, rect.y + 24, rect.w - 48);
  }

  function drawOrchardZone(rect) {
    drawZoneBase(rect, "rgba(240, 253, 250, 0.28)", "#5ea986");
    ctx.fillStyle = "rgba(80, 130, 71, 0.18)";
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      ctx.ellipse(rect.x + 62 + i * 78, rect.y + 200, 42, 12, -0.06, 0, Math.PI * 2);
      ctx.fill();
    }
    drawPath(rect.x + rect.w * 0.45, rect.y + 96, rect.x + rect.w * 0.58, rect.y + rect.h);
    drawTinyFence(rect.x + 26, rect.y + 38, rect.w - 52);
  }

  function drawPastureZone(rect) {
    drawZoneBase(rect, "rgba(255, 247, 237, 0.28)", "#c48b4d");
    ctx.fillStyle = "rgba(255, 250, 230, 0.22)";
    for (let i = 0; i < 9; i += 1) {
      ctx.beginPath();
      ctx.ellipse(rect.x + randomSeed(i, 42, rect.w - 42), rect.y + randomSeed(i + 19, 96, rect.h - 34), 18, 5, -0.18, 0, Math.PI * 2);
      ctx.fill();
    }
    drawBarn(rect.x + rect.w - 96, rect.y + 58);
    drawTinyFence(rect.x + 20, rect.y + 30, rect.w - 40);
    drawTinyFence(rect.x + 20, rect.y + rect.h - 56, rect.w - 40);
  }

  function drawZoneBase(rect, fill, stroke) {
    drawRoundedRect(rect.x, rect.y, rect.w, rect.h, 26, fill);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    strokeRoundedRect(rect.x, rect.y, rect.w, rect.h, 26);
    ctx.save();
    ctx.beginPath();
    roundedRectPath(rect.x, rect.y, rect.w, rect.h, 26);
    ctx.clip();
    ctx.strokeStyle = "rgba(63, 98, 47, 0.13)";
    ctx.lineWidth = 1.2;
    for (let i = -4; i < 12; i += 1) {
      ctx.beginPath();
      ctx.moveTo(rect.x - 40, rect.y + i * 38);
      ctx.lineTo(rect.x + rect.w + 44, rect.y + i * 38 + 42);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawTinyFence(x, y, width) {
    ctx.strokeStyle = "rgba(116, 82, 50, 0.38)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, y + 14);
    ctx.lineTo(x + width, y + 7);
    ctx.moveTo(x, y + 28);
    ctx.lineTo(x + width, y + 20);
    ctx.stroke();
    ctx.fillStyle = "rgba(116, 82, 50, 0.42)";
    for (let i = 0; i <= width; i += 48) {
      ctx.fillRect(x + i, y, 5, 38);
    }
  }

  function drawPath(x1, y1, x2, y2) {
    ctx.strokeStyle = "rgba(196, 151, 83, 0.22)";
    ctx.lineWidth = 42;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(x1 - 60, (y1 + y2) / 2, x2, y2);
    ctx.stroke();
  }

  function drawBarn(x, y) {
    ctx.fillStyle = "rgba(164, 74, 55, 0.76)";
    ctx.beginPath();
    ctx.moveTo(x - 42, y);
    ctx.lineTo(x, y - 34);
    ctx.lineTo(x + 42, y);
    ctx.lineTo(x + 42, y + 62);
    ctx.lineTo(x - 42, y + 62);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255, 246, 218, 0.72)";
    ctx.fillRect(x - 14, y + 24, 28, 38);
    ctx.strokeStyle = "rgba(110, 47, 35, 0.42)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - 42, y);
    ctx.lineTo(x, y - 34);
    ctx.lineTo(x + 42, y);
    ctx.stroke();
  }

  function drawItems(time) {
    const sorted = [...state.items].sort((a, b) => a.y - b.y);
    sorted.forEach((entry) => {
      const definition = findDefinition(entry.assetId);
      if (!definition) {
        return;
      }
      const image = getImage(definition.src);
      const bob = definition.kind === "animal" ? Math.sin(entry.phase + time / 220) * 2.5 : Math.sin(state.wind + entry.phase) * 1.2;
      const sway = definition.kind === "animal" ? 0 : Math.sin(state.wind * 1.2 + entry.phase) * 0.025;
      const width = entry.size;
      const height = image?.loaded ? width * (image.element.naturalHeight / image.element.naturalWidth) : width;

      drawShadow(entry.x, entry.y + height * 0.42, width * 0.38, Math.max(5, width * 0.08), definition.kind === "animal" ? 0.15 : 0.1);

      if (!image?.loaded) {
        drawPlaceholder(entry, definition);
        return;
      }
      ctx.save();
      ctx.translate(entry.x, entry.y + bob);
      if (definition.kind === "animal") {
        ctx.scale(entry.flip, 1);
      }
      ctx.rotate(sway);
      ctx.drawImage(image.element, -width / 2, -height / 2, width, height);
      ctx.restore();
    });
  }

  function drawPlaceholder(entry, definition) {
    ctx.fillStyle = zones[definition.zone].tone;
    ctx.beginPath();
    ctx.ellipse(entry.x, entry.y, entry.size * 0.28, entry.size * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawZoneLabels() {
    Object.entries(zones).forEach(([key, zone]) => {
      const { x, y } = zone.rect;
      drawRoundedRect(x + 16, y + 16, 96, 32, 16, "rgba(23, 42, 31, 0.76)");
      ctx.fillStyle = "#fff";
      ctx.font = '700 15px "Noto Sans KR", sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(zone.label, x + 64, y + 32);
      if (key === state.mode) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.84)";
        ctx.lineWidth = 2;
        strokeRoundedRect(x + 13, y + 13, 102, 38, 19);
      }
    });
  }

  function getImage(src) {
    if (images.has(src)) {
      return images.get(src);
    }
    const element = new Image();
    const entry = { element, loaded: false, failed: false };
    element.onload = () => {
      entry.loaded = true;
    };
    element.onerror = () => {
      entry.failed = true;
    };
    element.src = src;
    images.set(src, entry);
    return entry;
  }

  function imageRatio(src, fallback) {
    const image = getImage(src);
    if (!image?.loaded || !image.element.naturalWidth) {
      return fallback;
    }
    return image.element.naturalHeight / image.element.naturalWidth;
  }

  function updateUi() {
    ui.modeTabs.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.mode === state.mode);
    });
    const selected = selectedDefinition();
    ui.paletteTitle.textContent = zones[state.mode].title;
    ui.selectedLabel.textContent = selected.label;
    ui.statusPill.textContent = `${zones[state.mode].label} · ${selected.label}`;
    ui.fieldCount.textContent = `밭 ${countMode("field")}`;
    ui.orchardCount.textContent = `과수원 ${countMode("orchard")}`;
    ui.pastureCount.textContent = `가축농장 ${countMode("pasture")}`;
  }

  function countMode(mode) {
    return state.items.filter((entry) => entry.zone === mode).length;
  }

  function drawRoundedRect(x, y, width, height, radius, fillStyle) {
    ctx.fillStyle = fillStyle;
    roundedRectPath(x, y, width, height, radius);
    ctx.fill();
  }

  function strokeRoundedRect(x, y, width, height, radius) {
    roundedRectPath(x, y, width, height, radius);
    ctx.stroke();
  }

  function roundedRectPath(x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function drawShadow(x, y, radiusX, radiusY, alpha) {
    ctx.fillStyle = `rgba(25, 41, 24, ${alpha})`;
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  function randomSeed(seed, min, max) {
    const value = Math.sin(seed * 999 + 17) * 10000;
    const ratio = value - Math.floor(value);
    return min + ratio * (max - min);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }
})();
