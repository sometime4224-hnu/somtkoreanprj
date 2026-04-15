(() => {
  "use strict";

  const STORAGE_KEY = "c14-farming-clicker-v1";
  const ASSET_ROOT = "../../assets/c14/misc/images/living-things-common";
  const asset = (path) => `${ASSET_ROOT}/${path}`;

  const zoneDefs = {
    field: {
      label: "밭",
      resource: "vegetables",
      baseYield: 1,
      color: "#3f8a45",
      icon: asset("plants/produce-vegetable/produce-vegetable-02-carrot.png"),
      decorTarget: "fieldDecor",
      decor: [
        asset("plants/produce-vegetable/produce-vegetable-02-carrot.png"),
        asset("plants/produce-vegetable/produce-vegetable-12-lettuce.png"),
        asset("plants/produce-vegetable/produce-vegetable-10-radish.png"),
        asset("plants/produce-vegetable/produce-vegetable-28-corn.png"),
        asset("plants/generated-small/plant-14-mint-sprout.png")
      ],
      upgrades: [
        {
          id: "seed",
          title: "좋은 씨앗",
          detail: "수확 +1",
          icon: asset("plants/generated-small/plant-14-mint-sprout.png"),
          cost: (level) => 18 + level * 22,
          apply: (zone) => {
            zone.clickLevel += 1;
          }
        },
        {
          id: "water",
          title: "물길 정리",
          detail: "초당 +1",
          icon: asset("plants/generated-small/plant-19-tall-reed.png"),
          cost: (level) => 42 + level * 46,
          apply: (zone) => {
            zone.autoLevel += 1;
          }
        },
        {
          id: "row",
          title: "고랑 넓히기",
          detail: "밭 레벨 +1",
          icon: asset("plants/produce-vegetable/produce-vegetable-01-napa-cabbage.png"),
          cost: (level) => 90 + level * 84,
          apply: (zone) => {
            zone.level += 1;
          }
        }
      ]
    },
    orchard: {
      label: "과수원",
      resource: "fruits",
      baseYield: 3,
      color: "#167268",
      icon: asset("plants/medium/medium-plant-08-apple-tree.png"),
      decorTarget: "orchardDecor",
      decor: [
        asset("plants/medium/medium-plant-08-apple-tree.png"),
        asset("plants/medium/medium-plant-04-cherry-blossom-tree.png"),
        asset("plants/produce-fruit/produce-fruit-01-red-apple.png"),
        asset("plants/produce-fruit/produce-fruit-11-purple-grapes.png"),
        asset("plants/produce-fruit/produce-fruit-17-peach.png")
      ],
      upgrades: [
        {
          id: "branch",
          title: "가지치기",
          detail: "수확 +3",
          icon: asset("plants/medium/medium-plant-04-cherry-blossom-tree.png"),
          cost: (level) => 55 + level * 62,
          apply: (zone) => {
            zone.clickLevel += 1;
          }
        },
        {
          id: "bee",
          title: "꽃길 만들기",
          detail: "초당 +2",
          icon: asset("plants/generated-small/plant-10-yellow-daisy.png"),
          cost: (level) => 120 + level * 92,
          apply: (zone) => {
            zone.autoLevel += 1;
          }
        },
        {
          id: "basket",
          title: "과일 바구니",
          detail: "과수원 레벨 +1",
          icon: asset("plants/produce-fruit/produce-fruit-03-pear.png"),
          cost: (level) => 190 + level * 130,
          apply: (zone) => {
            zone.level += 1;
          }
        }
      ]
    },
    pasture: {
      label: "동물농장",
      resource: "animals",
      baseYield: 5,
      color: "#9a5c28",
      icon: asset("animals/farm-medium/farm-01-cow.png"),
      decorTarget: "pastureDecor",
      decor: [
        asset("animals/farm-medium/farm-01-cow.png"),
        asset("animals/farm-medium/farm-04-sheep.png"),
        asset("animals/farm-medium/farm-06-pig.png"),
        asset("animals/cartoon-small/cartoon-02-hen.png"),
        asset("animals/baby-small/baby-04-chick.png")
      ],
      upgrades: [
        {
          id: "feed",
          title: "좋은 먹이",
          detail: "수확 +5",
          icon: asset("plants/produce-vegetable/produce-vegetable-28-corn.png"),
          cost: (level) => 85 + level * 76,
          apply: (zone) => {
            zone.clickLevel += 1;
          }
        },
        {
          id: "coop",
          title: "따뜻한 우리",
          detail: "초당 +3",
          icon: asset("animals/baby-small/baby-04-chick.png"),
          cost: (level) => 165 + level * 118,
          apply: (zone) => {
            zone.autoLevel += 1;
          }
        },
        {
          id: "pasture",
          title: "풀밭 넓히기",
          detail: "동물농장 레벨 +1",
          icon: asset("plants/generated-small/plant-18-meadow-grass.png"),
          cost: (level) => 250 + level * 170,
          apply: (zone) => {
            zone.level += 1;
          }
        }
      ]
    }
  };

  const missions = [
    { text: "채소 30개", done: (state) => state.vegetables >= 30 },
    { text: "과일 25개", done: (state) => state.fruits >= 25 },
    { text: "동물 20마리", done: (state) => state.animals >= 20 },
    { text: "초당 생산 10", done: (state) => productionPerSecond(state) >= 10 },
    { text: "잎 1,000개", done: (state) => state.leaves >= 1000 }
  ];

  const ui = {
    totalScore: document.getElementById("totalScore"),
    vegCount: document.getElementById("vegCount"),
    fruitCount: document.getElementById("fruitCount"),
    animalCount: document.getElementById("animalCount"),
    perSecond: document.getElementById("perSecond"),
    fieldYield: document.getElementById("fieldYield"),
    orchardYield: document.getElementById("orchardYield"),
    pastureYield: document.getElementById("pastureYield"),
    resetButton: document.getElementById("resetButton"),
    activeZoneIcon: document.getElementById("activeZoneIcon"),
    activeZoneType: document.getElementById("activeZoneType"),
    activeZoneLevel: document.getElementById("activeZoneLevel"),
    activeZoneMeter: document.getElementById("activeZoneMeter"),
    upgradeList: document.getElementById("upgradeList"),
    missionList: document.getElementById("missionList"),
    upgradeTemplate: document.getElementById("upgradeTemplate"),
    tabs: Array.from(document.querySelectorAll("[data-tab]")),
    harvestPads: Array.from(document.querySelectorAll("[data-action='harvest']"))
  };

  const state = loadState();
  let activeZone = state.activeZone || "field";
  let lastTick = performance.now();
  let saveTimer = 0;

  setup();

  function defaultState() {
    return {
      leaves: 0,
      vegetables: 0,
      fruits: 0,
      animals: 0,
      activeZone: "field",
      zones: Object.fromEntries(
        Object.keys(zoneDefs).map((key) => [
          key,
          {
            level: 1,
            clickLevel: 0,
            autoLevel: 0,
            buys: {}
          }
        ])
      )
    };
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved || typeof saved !== "object") {
        return defaultState();
      }
      const base = defaultState();
      return {
        ...base,
        ...saved,
        zones: {
          field: { ...base.zones.field, ...(saved.zones?.field || {}) },
          orchard: { ...base.zones.orchard, ...(saved.zones?.orchard || {}) },
          pasture: { ...base.zones.pasture, ...(saved.zones?.pasture || {}) }
        }
      };
    } catch {
      return defaultState();
    }
  }

  function setup() {
    ui.harvestPads.forEach((button) => {
      button.addEventListener("click", (event) => harvest(button.dataset.zone, event));
    });
    ui.tabs.forEach((button) => {
      button.addEventListener("click", () => setActiveZone(button.dataset.tab));
    });
    ui.resetButton.addEventListener("click", resetGame);

    seedDecor();
    updateAll();
    requestAnimationFrame(loop);
  }

  function setActiveZone(zoneKey) {
    if (!zoneDefs[zoneKey]) {
      return;
    }
    activeZone = zoneKey;
    state.activeZone = zoneKey;
    updateAll();
    queueSave();
  }

  function harvest(zoneKey, event) {
    const gain = clickYield(zoneKey);
    applyGain(zoneKey, gain);
    addDecorItem(zoneKey, true);
    showFloat(event.clientX, event.clientY, `+${format(gain)}`);
    burst(event.clientX, event.clientY, zoneDefs[zoneKey].color);
    updateAll();
    queueSave();
  }

  function applyGain(zoneKey, gain) {
    const def = zoneDefs[zoneKey];
    state.leaves += gain;
    state[def.resource] += gain;
  }

  function clickYield(zoneKey) {
    const def = zoneDefs[zoneKey];
    const zone = state.zones[zoneKey];
    return Math.floor(def.baseYield * zone.level + def.baseYield * zone.clickLevel);
  }

  function autoYield(zoneKey, targetState = state) {
    const def = zoneDefs[zoneKey];
    const zone = targetState.zones[zoneKey];
    return def.baseYield * zone.autoLevel * Math.max(1, Math.floor(zone.level / 2));
  }

  function productionPerSecond(targetState = state) {
    return Object.keys(zoneDefs).reduce((sum, zoneKey) => sum + autoYield(zoneKey, targetState), 0);
  }

  function buyUpgrade(zoneKey, upgrade) {
    const zone = state.zones[zoneKey];
    const currentBuyCount = zone.buys[upgrade.id] || 0;
    const cost = upgrade.cost(currentBuyCount);
    if (state.leaves < cost) {
      return;
    }
    state.leaves -= cost;
    zone.buys[upgrade.id] = currentBuyCount + 1;
    upgrade.apply(zone);
    addDecorItem(zoneKey, true);
    updateAll();
    queueSave();
  }

  function loop(now) {
    const delta = Math.min(2, (now - lastTick) / 1000);
    lastTick = now;
    const perSecond = productionPerSecond();
    if (perSecond > 0) {
      state.leaves += perSecond * delta;
      Object.keys(zoneDefs).forEach((zoneKey) => {
        const zoneGain = autoYield(zoneKey) * delta;
        if (zoneGain > 0) {
          state[zoneDefs[zoneKey].resource] += zoneGain;
        }
      });
      saveTimer += delta;
      if (saveTimer > 2) {
        saveTimer = 0;
        updateAll();
        queueSave();
      } else {
        updateScores();
      }
    }
    requestAnimationFrame(loop);
  }

  function updateAll() {
    updateScores();
    updateActiveZone();
    renderUpgrades();
    renderMissions();
    updateYieldLabels();
  }

  function updateScores() {
    ui.totalScore.textContent = format(state.leaves);
    ui.vegCount.textContent = format(state.vegetables);
    ui.fruitCount.textContent = format(state.fruits);
    ui.animalCount.textContent = format(state.animals);
    ui.perSecond.textContent = format(productionPerSecond());
  }

  function updateYieldLabels() {
    ui.fieldYield.textContent = `+${format(clickYield("field"))}`;
    ui.orchardYield.textContent = `+${format(clickYield("orchard"))}`;
    ui.pastureYield.textContent = `+${format(clickYield("pasture"))}`;
  }

  function updateActiveZone() {
    const def = zoneDefs[activeZone];
    const zone = state.zones[activeZone];
    ui.tabs.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.tab === activeZone);
    });
    ui.activeZoneIcon.src = def.icon;
    ui.activeZoneType.textContent = def.label;
    ui.activeZoneLevel.textContent = `Lv. ${zone.level}`;
    const buyCount = Object.values(zone.buys).reduce((sum, value) => sum + value, 0);
    const nextCost = 90 + buyCount * 60;
    const progress = Math.min(100, (state.leaves / nextCost) * 100);
    ui.activeZoneMeter.style.width = `${progress}%`;
  }

  function renderUpgrades() {
    const def = zoneDefs[activeZone];
    const zone = state.zones[activeZone];
    ui.upgradeList.innerHTML = "";
    def.upgrades.forEach((upgrade) => {
      const button = ui.upgradeTemplate.content.firstElementChild.cloneNode(true);
      const buyCount = zone.buys[upgrade.id] || 0;
      const cost = upgrade.cost(buyCount);
      const iconSlot = button.querySelector(".upgrade-icon");
      iconSlot.innerHTML = `<img src="${escapeAttr(upgrade.icon)}" alt="">`;
      button.querySelector(".upgrade-copy strong").textContent = upgrade.title;
      button.querySelector(".upgrade-copy small").textContent = `${upgrade.detail} · ${buyCount}회`;
      button.querySelector(".upgrade-cost").textContent = `${format(cost)} 잎`;
      button.disabled = state.leaves < cost;
      button.addEventListener("click", () => buyUpgrade(activeZone, upgrade));
      ui.upgradeList.append(button);
    });
  }

  function renderMissions() {
    ui.missionList.innerHTML = missions
      .map((mission) => {
        const done = mission.done(state);
        return `<li class="${done ? "is-done" : ""}"><span>${escapeHtml(mission.text)}</span><strong>${done ? "완료" : "진행"}</strong></li>`;
      })
      .join("");
  }

  function seedDecor() {
    Object.keys(zoneDefs).forEach((zoneKey) => {
      const count = zoneKey === "pasture" ? 5 : 7;
      for (let index = 0; index < count; index += 1) {
        addDecorItem(zoneKey, false, index);
      }
    });
  }

  function addDecorItem(zoneKey, fresh = false, seed = Math.random() * 1000) {
    const def = zoneDefs[zoneKey];
    const layer = document.getElementById(def.decorTarget);
    if (!layer) {
      return;
    }
    const limit = zoneKey === "pasture" ? 14 : 18;
    while (layer.children.length >= limit) {
      layer.firstElementChild?.remove();
    }
    const img = document.createElement("img");
    const index = Math.floor(seedRandom(seed) * def.decor.length);
    img.className = "decor-item";
    img.src = def.decor[index];
    img.alt = "";
    img.style.left = `${12 + seedRandom(seed + 2) * 76}%`;
    img.style.top = `${32 + seedRandom(seed + 5) * 54}%`;
    img.style.setProperty("--scale", `${0.78 + seedRandom(seed + 8) * 0.72}`);
    img.style.setProperty("--size", `${zoneKey === "orchard" ? 74 : zoneKey === "pasture" ? 62 : 48}px`);
    if (!fresh) {
      img.style.animationDelay = `${seedRandom(seed + 11) * 0.28}s`;
    }
    layer.append(img);
  }

  function showFloat(x, y, text) {
    const element = document.createElement("span");
    element.className = "float-text";
    element.textContent = text;
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    document.body.append(element);
    element.addEventListener("animationend", () => element.remove(), { once: true });
  }

  function burst(x, y, color) {
    for (let index = 0; index < 7; index += 1) {
      const spark = document.createElement("span");
      spark.className = "spark";
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.background = index % 2 ? color : "#f4c84f";
      const angle = (Math.PI * 2 * index) / 7;
      const distance = 32 + Math.random() * 26;
      spark.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
      spark.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
      document.body.append(spark);
      spark.addEventListener("animationend", () => spark.remove(), { once: true });
    }
  }

  function resetGame() {
    localStorage.removeItem(STORAGE_KEY);
    const fresh = defaultState();
    Object.assign(state, fresh);
    activeZone = "field";
    document.querySelectorAll(".decor-layer").forEach((layer) => {
      layer.innerHTML = "";
    });
    seedDecor();
    updateAll();
  }

  function queueSave() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, activeZone }));
  }

  function format(value) {
    const rounded = Math.floor(value);
    return new Intl.NumberFormat("ko-KR").format(rounded);
  }

  function seedRandom(seed) {
    const value = Math.sin(seed * 999 + 17) * 10000;
    return value - Math.floor(value);
  }

  function escapeHtml(value) {
    return String(value)
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
