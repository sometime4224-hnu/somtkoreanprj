(function () {
  const GAME_WIDTH = 720;
  const GAME_HEIGHT = 1280;
  const CENTER_X = GAME_WIDTH / 2;
  const HORIZON_Y = 205;
  const GROUND_Y = 1122;
  const FAR_HALF = 34;
  const NEAR_HALF = 330;
  const DEPTH_FAR = 1.08;
  const LANES = [-0.72, 0, 0.72];
  const MAX_LANE = 0.92;
  const ROUND_SECONDS = 45;
  const STORE_KEY = "number-gate-blaster-best";

  const COLORS = {
    navy: 0x07111d,
    deep: 0x06101a,
    road: 0x102b35,
    roadDark: 0x0b202b,
    lane: 0x7dd3fc,
    mint: 0x2dd4bf,
    green: 0x57e389,
    red: 0xff5d6c,
    amber: 0xffc857,
    white: 0xffffff,
    sky: 0x77d8ff,
    violet: 0x8b7cff,
    purple: 0xb36bff,
  };

  const ENEMY_TYPES = {
    scout: {
      name: "정찰",
      color: 0x77d8ff,
      hp: 2,
      hpPerWave: 0.7,
      speed: 0.043,
      jitter: 0.009,
      requiredPower: 1,
      score: 14,
      penalty: 1,
    },
    skimmer: {
      name: "속공",
      color: 0xffc857,
      hp: 4,
      hpPerWave: 0.9,
      speed: 0.058,
      jitter: 0.012,
      requiredPower: 2,
      score: 20,
      penalty: 1,
    },
    shield: {
      name: "장갑",
      color: 0x8b7cff,
      hp: 10,
      hpPerWave: 2.1,
      speed: 0.03,
      jitter: 0.006,
      requiredPower: 6,
      score: 48,
      penalty: 2,
    },
    titan: {
      name: "중장갑",
      color: 0xff5d6c,
      hp: 18,
      hpPerWave: 3,
      speed: 0.022,
      jitter: 0.005,
      requiredPower: 14,
      score: 78,
      penalty: 3,
    },
  };

  const WEAPON_TIERS = [
    {
      minPower: 12,
      name: "충격파",
      offsets: [-0.36, 0, 0.36],
      damage: 3,
      delay: 185,
      bulletSpeed: 1.52,
      pierce: 2,
      splash: 0.2,
      color: 0xffc857,
    },
    {
      minPower: 8,
      name: "관통광선",
      offsets: [-0.18, 0.18],
      damage: 2.4,
      delay: 205,
      bulletSpeed: 1.62,
      pierce: 3,
      splash: 0,
      color: 0x8b7cff,
    },
    {
      minPower: 5,
      name: "삼연확산",
      offsets: [-0.28, 0, 0.28],
      damage: 2,
      delay: 240,
      bulletSpeed: 1.42,
      pierce: 0,
      splash: 0,
      color: 0x57e389,
    },
    {
      minPower: 3,
      name: "쌍발",
      offsets: [-0.13, 0.13],
      damage: 1.25,
      delay: 270,
      bulletSpeed: 1.34,
      pierce: 0,
      splash: 0,
      color: 0x77d8ff,
    },
    {
      minPower: 1,
      name: "단발",
      offsets: [0],
      damage: 1,
      delay: 315,
      bulletSpeed: 1.24,
      pierce: 0,
      splash: 0,
      color: 0xffffff,
    },
  ];

  class NumberGateScene extends Phaser.Scene {
    constructor() {
      super("NumberGateScene");
      this.mode = "menu";
      this.nextEnemyId = 1;
      this.nextGateRowId = 1;
    }

    preload() {
      this.createTextures();
    }

    create() {
      this.bestScore = Number(localStorage.getItem(STORE_KEY) || 0);
      this.stars = [];
      this.activeGates = [];
      this.usedGateRows = new Set();
      this.activeEnemies = [];
      this.activeBlocks = this.activeEnemies;
      this.activeBullets = [];
      this.floaters = [];
      this.roadScroll = 0;
      this.playerLane = 0;
      this.playerTargetLane = 0;

      this.createBackground();
      this.input.on("pointermove", this.handlePointer, this);
      this.input.on("pointerdown", this.handlePointer, this);
      this.keys = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
        right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        a: Phaser.Input.Keyboard.KeyCodes.A,
        d: Phaser.Input.Keyboard.KeyCodes.D,
        space: Phaser.Input.Keyboard.KeyCodes.SPACE,
        enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
      });

      this.showMenu();
    }

    update(time, delta) {
      this.updateBackground(delta);

      if (this.mode === "menu" || this.mode === "result") {
        if (Phaser.Input.Keyboard.JustDown(this.keys.space) || Phaser.Input.Keyboard.JustDown(this.keys.enter)) {
          this.startRun();
        }
        return;
      }

      this.elapsed += delta / 1000;
      this.timeLeft = Math.max(0, ROUND_SECONDS - this.elapsed);
      this.updatePlayer(delta);
      this.updateSpawner(time);
      this.updateBullets(delta);
      this.updateGates(delta);
      this.updateEnemies(delta);
      this.updateFloaters(delta);
      this.updateHud();

      if (this.timeLeft <= 0) {
        this.finishRun();
      }
    }

    createTextures() {
      const g = this.make.graphics({ x: 0, y: 0, add: false });

      g.clear();
      g.fillStyle(0xffffff, 1);
      g.fillRoundedRect(0, 0, 12, 34, 6);
      g.fillStyle(0x77d8ff, 1);
      g.fillRoundedRect(3, 4, 6, 20, 4);
      g.generateTexture("bullet", 12, 34);

      g.clear();
      g.fillStyle(0xffffff, 1);
      g.fillCircle(10, 10, 10);
      g.generateTexture("spark", 20, 20);

      g.clear();
      g.fillStyle(0x57e389, 1);
      g.fillTriangle(52, 0, 104, 98, 52, 76);
      g.fillTriangle(52, 0, 0, 98, 52, 76);
      g.fillStyle(0x77d8ff, 1);
      g.fillRoundedRect(34, 42, 36, 56, 18);
      g.fillStyle(0xffffff, 1);
      g.fillCircle(52, 38, 14);
      g.generateTexture("ship", 104, 104);

      g.destroy();
    }

    createBackground() {
      this.roadGraphics = this.add.graphics().setDepth(0);
      this.redrawGround();

      for (let i = 0; i < 86; i += 1) {
        const star = this.add.circle(
          Phaser.Math.Between(8, GAME_WIDTH - 8),
          Phaser.Math.Between(0, GAME_HEIGHT),
          Phaser.Math.FloatBetween(1.1, 3.4),
          i % 7 === 0 ? COLORS.amber : COLORS.sky,
          Phaser.Math.FloatBetween(0.16, 0.52)
        ).setDepth(1);
        star.speed = Phaser.Math.Between(10, 38);
        this.stars.push(star);
      }

      this.horizonGlow = this.add.ellipse(CENTER_X, HORIZON_Y + 18, 520, 90, COLORS.mint, 0.08).setDepth(2);
    }

    redrawGround() {
      const g = this.roadGraphics;
      g.clear();
      g.fillGradientStyle(0x06101a, 0x06101a, 0x0b1e2e, 0x102a31, 1);
      g.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      g.fillStyle(0x0a1c2b, 0.9);
      g.fillRect(0, HORIZON_Y - 16, GAME_WIDTH, 70);
      g.lineStyle(2, 0x9bdcfa, 0.18);
      g.lineBetween(0, HORIZON_Y, GAME_WIDTH, HORIZON_Y);

      const roadFarLeft = CENTER_X - FAR_HALF;
      const roadFarRight = CENTER_X + FAR_HALF;
      const roadNearLeft = CENTER_X - NEAR_HALF;
      const roadNearRight = CENTER_X + NEAR_HALF;

      g.fillStyle(COLORS.roadDark, 1);
      g.beginPath();
      g.moveTo(roadFarLeft, HORIZON_Y);
      g.lineTo(roadFarRight, HORIZON_Y);
      g.lineTo(roadNearRight, GAME_HEIGHT + 120);
      g.lineTo(roadNearLeft, GAME_HEIGHT + 120);
      g.closePath();
      g.fillPath();

      g.fillStyle(COLORS.road, 0.58);
      g.beginPath();
      g.moveTo(CENTER_X - FAR_HALF * 0.58, HORIZON_Y + 5);
      g.lineTo(CENTER_X + FAR_HALF * 0.58, HORIZON_Y + 5);
      g.lineTo(CENTER_X + NEAR_HALF * 0.72, GAME_HEIGHT + 80);
      g.lineTo(CENTER_X - NEAR_HALF * 0.72, GAME_HEIGHT + 80);
      g.closePath();
      g.fillPath();

      for (let i = 0; i < 18; i += 1) {
        const z = (i / 18 + this.roadScroll) % 1;
        const p = this.project(0, z);
        if (p.y < HORIZON_Y + 3) {
          continue;
        }
        const alpha = 0.05 + p.t * 0.28;
        const width = 1 + p.t * 5;
        g.lineStyle(width, 0x9bdcfa, alpha);
        g.lineBetween(CENTER_X - p.half, p.y, CENTER_X + p.half, p.y);
      }

      for (const boundary of [-1, -0.34, 0.34, 1]) {
        const nearX = CENTER_X + NEAR_HALF * boundary;
        const farX = CENTER_X + FAR_HALF * boundary;
        const edge = Math.abs(boundary) === 1;
        g.lineStyle(edge ? 5 : 2, edge ? 0x63e6be : COLORS.lane, edge ? 0.42 : 0.28);
        g.lineBetween(farX, HORIZON_Y + 2, nearX, GAME_HEIGHT + 90);
      }

      g.fillStyle(0xffffff, 0.09);
      g.beginPath();
      g.moveTo(CENTER_X - FAR_HALF * 1.4, HORIZON_Y - 4);
      g.lineTo(CENTER_X + FAR_HALF * 1.4, HORIZON_Y - 4);
      g.lineTo(CENTER_X + FAR_HALF * 2.2, HORIZON_Y + 28);
      g.lineTo(CENTER_X - FAR_HALF * 2.2, HORIZON_Y + 28);
      g.closePath();
      g.fillPath();
    }

    showMenu() {
      this.mode = "menu";
      this.clearRunObjects();

      this.menuLayer = this.add.container(0, 0).setDepth(7000);
      const glow = this.add.circle(GAME_WIDTH / 2, 388, 210, COLORS.mint, 0.14);
      const ship = this.add.image(GAME_WIDTH / 2, 455, "ship").setScale(1.45);
      const title = this.add.text(GAME_WIDTH / 2, 178, "숫자 게이트\n블래스터", {
        fontFamily: '"Noto Sans KR", system-ui, sans-serif',
        fontSize: "70px",
        fontStyle: "900",
        color: "#ffffff",
        align: "center",
        lineSpacing: 8,
      }).setOrigin(0.5);
      title.setShadow(0, 8, "#000000", 18, true, true);

      const chip = this.add.text(GAME_WIDTH / 2, 650, "원근 웨이브 45초", {
        fontFamily: '"Noto Sans KR", system-ui, sans-serif',
        fontSize: "32px",
        fontStyle: "800",
        color: "#0f172a",
        backgroundColor: "#ffc857",
        padding: { x: 24, y: 14 },
      }).setOrigin(0.5);

      const best = this.add.text(GAME_WIDTH / 2, 730, `최고 점수 ${this.bestScore}`, {
        fontFamily: '"Noto Sans KR", system-ui, sans-serif',
        fontSize: "30px",
        fontStyle: "800",
        color: "#b9ecff",
      }).setOrigin(0.5);

      const start = this.createButton(GAME_WIDTH / 2, 870, "시작", () => this.startRun());
      const home = this.createSmallButton(112, 82, "허브", () => {
        window.location.href = "../index.html";
      });

      this.menuLayer.add([glow, ship, title, chip, best, start, home]);
      this.tweens.add({
        targets: ship,
        y: 435,
        duration: 1200,
        ease: "Sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    startRun() {
      this.mode = "play";
      this.clearLayer(this.menuLayer);
      this.clearLayer(this.resultLayer);
      this.clearRunObjects();

      this.score = 0;
      this.combo = 0;
      this.power = 2;
      this.elapsed = 0;
      this.timeLeft = ROUND_SECONDS;
      this.lastShotAt = 0;
      this.nextGateAt = 550;
      this.nextEnemyWaveAt = 250;
      this.playerLane = 0;
      this.playerTargetLane = 0;
      this.usedGateRows.clear();

      this.player = this.add.image(0, 0, "ship").setDepth(4200);
      this.positionPlayer();

      for (let i = 0; i < 14; i += 1) {
        const type = i % 5 === 0 ? "skimmer" : "scout";
        this.spawnEnemy(type, Phaser.Utils.Array.GetRandom(LANES), Phaser.Math.FloatBetween(0.74, 1.08));
      }

      this.hudLayer = this.add.container(0, 0).setDepth(8000);
      const hudBack = this.add.rectangle(GAME_WIDTH / 2, 70, GAME_WIDTH, 140, COLORS.navy, 0.82);
      const hudLine = this.add.rectangle(GAME_WIDTH / 2, 140, GAME_WIDTH, 3, COLORS.sky, 0.25);
      this.scoreText = this.add.text(36, 32, "0", this.hudStyle("44px", "#ffffff")).setOrigin(0, 0);
      this.powerText = this.add.text(GAME_WIDTH - 36, 30, "파워 2", this.hudStyle("28px", "#57e389")).setOrigin(1, 0);
      this.weaponText = this.add.text(GAME_WIDTH - 36, 72, "무기 단발", this.hudStyle("21px", "#b9ecff")).setOrigin(1, 0);
      this.timeText = this.add.text(GAME_WIDTH / 2, 42, "45", this.hudStyle("34px", "#ffc857")).setOrigin(0.5, 0);
      this.comboText = this.add.text(GAME_WIDTH / 2, 92, "", this.hudStyle("24px", "#b9ecff")).setOrigin(0.5, 0);
      this.hudLayer.add([hudBack, hudLine, this.scoreText, this.powerText, this.weaponText, this.timeText, this.comboText]);
    }

    finishRun() {
      this.mode = "result";
      this.clearLayer(this.hudLayer);

      if (this.score > this.bestScore) {
        this.bestScore = this.score;
        localStorage.setItem(STORE_KEY, String(this.bestScore));
      }

      this.resultLayer = this.add.container(0, 0).setDepth(9000);
      const shade = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x06101a, 0.78);
      const title = this.add.text(GAME_WIDTH / 2, 295, "라운드 완료", {
        fontFamily: '"Noto Sans KR", system-ui, sans-serif',
        fontSize: "62px",
        fontStyle: "900",
        color: "#ffffff",
      }).setOrigin(0.5);
      const score = this.add.text(GAME_WIDTH / 2, 420, `${this.score}`, {
        fontFamily: '"Noto Sans KR", system-ui, sans-serif',
        fontSize: "118px",
        fontStyle: "900",
        color: "#ffc857",
      }).setOrigin(0.5);
      const best = this.add.text(GAME_WIDTH / 2, 535, `최고 점수 ${this.bestScore}`, {
        fontFamily: '"Noto Sans KR", system-ui, sans-serif',
        fontSize: "31px",
        fontStyle: "800",
        color: "#b9ecff",
      }).setOrigin(0.5);
      const restart = this.createButton(GAME_WIDTH / 2, 740, "다시", () => this.startRun());
      const home = this.createSmallButton(GAME_WIDTH / 2, 875, "허브", () => {
        window.location.href = "../index.html";
      });

      this.resultLayer.add([shade, title, score, best, restart, home]);
    }

    updateBackground(delta) {
      const step = delta / 1000;
      this.roadScroll = (this.roadScroll + step * 0.46) % 1;
      this.redrawGround();

      for (const star of this.stars) {
        star.y += star.speed * step;
        if (star.y > GAME_HEIGHT + 8) {
          star.y = Phaser.Math.Between(-20, HORIZON_Y + 40);
          star.x = Phaser.Math.Between(8, GAME_WIDTH - 8);
        }
      }
    }

    updatePlayer(delta) {
      const step = delta / 1000;
      const laneSpeed = 1.65 * step;
      if (this.keys.left.isDown || this.keys.a.isDown) {
        this.playerTargetLane -= laneSpeed;
      }
      if (this.keys.right.isDown || this.keys.d.isDown) {
        this.playerTargetLane += laneSpeed;
      }
      this.playerTargetLane = Phaser.Math.Clamp(this.playerTargetLane, -MAX_LANE, MAX_LANE);
      this.playerLane = Phaser.Math.Linear(this.playerLane, this.playerTargetLane, 0.22);
      this.positionPlayer();

      const weapon = this.getWeaponProfile();
      if (this.time.now - this.lastShotAt >= weapon.delay) {
        this.fireBullets(weapon);
        this.lastShotAt = this.time.now;
      }
    }

    positionPlayer() {
      if (!this.player) {
        return;
      }
      const p = this.project(this.playerLane, 0);
      this.player.setPosition(p.x, p.y + 12);
      this.player.setScale(1.18);
    }

    updateSpawner(time) {
      if (time >= this.nextGateAt) {
        this.spawnGateRow();
        this.nextGateAt = time + Phaser.Math.Between(1450, 1950);
      }

      if (time >= this.nextEnemyWaveAt) {
        this.spawnEnemyWave();
        this.nextEnemyWaveAt = time + Phaser.Math.Between(720, 1100);
      }
    }

    fireBullets(weapon) {
      for (const offset of weapon.offsets) {
        const lane = Phaser.Math.Clamp(this.playerLane + offset, -MAX_LANE, MAX_LANE);
        const bullet = this.add.container(0, 0).setDepth(2600);
        const glow = this.add.circle(0, 8, weapon.splash ? 17 : 12, weapon.color, weapon.splash ? 0.34 : 0.22);
        const shot = this.add.image(0, 0, "bullet");
        shot.setTint(weapon.color);
        bullet.add([glow, shot]);
        bullet.lane = lane;
        bullet.depthZ = 0.04;
        bullet.speed = weapon.bulletSpeed;
        bullet.damage = weapon.damage;
        bullet.pierce = weapon.pierce;
        bullet.splash = weapon.splash;
        bullet.hitTargets = new Set();
        this.applyPerspective(bullet, 0.8);
        this.activeBullets.push(bullet);
      }
    }

    spawnGateRow() {
      const values = this.makeGateValues();
      const rowId = this.nextGateRowId;
      this.nextGateRowId += 1;

      for (let i = 0; i < LANES.length; i += 1) {
        this.activeGates.push(this.createGate(LANES[i], values[i], rowId));
      }
    }

    makeGateValues() {
      const stage = Math.floor(this.elapsed / 12);
      const positives = Phaser.Utils.Array.Shuffle([1, 2 + Math.min(stage, 2), 3, 4]).slice(0, 2);
      const bad = -Phaser.Math.Between(1, Math.min(3, 1 + stage));
      return Phaser.Utils.Array.Shuffle([positives[0], positives[1], bad]);
    }

    createGate(lane, value, rowId) {
      const positive = value > 0;
      const width = 188;
      const height = 120;
      const color = positive ? COLORS.green : COLORS.red;
      const gate = this.add.container(0, 0);
      const fill = this.add.rectangle(0, 0, width, height, color, 0.94);
      fill.setStrokeStyle(5, COLORS.white, 0.64);
      const railTop = this.add.rectangle(0, -height / 2 - 7, width + 22, 12, COLORS.white, 0.28);
      const railBottom = this.add.rectangle(0, height / 2 + 7, width + 22, 12, COLORS.white, 0.28);
      const label = this.add.text(0, -1, `${positive ? "+" : ""}${value}`, {
        fontFamily: "Arial, system-ui, sans-serif",
        fontSize: "56px",
        fontStyle: "900",
        color: positive ? "#062b1c" : "#3b0710",
      }).setOrigin(0.5);

      gate.add([fill, railTop, railBottom, label]);
      gate.kind = "gate";
      gate.rowId = rowId;
      gate.value = value;
      gate.lane = lane;
      gate.depthZ = DEPTH_FAR;
      gate.speed = 0.62 + Math.min(0.18, this.elapsed * 0.007);
      gate.hitLaneWidth = 0.36;
      this.applyPerspective(gate, 1.0);
      return gate;
    }

    spawnEnemyWave() {
      if (this.activeEnemies.length > 44) {
        return;
      }

      const wave = Math.floor(this.elapsed / 10);
      const count = Phaser.Math.Clamp(3 + wave + Phaser.Math.Between(0, 2), 3, 7);

      for (let i = 0; i < count; i += 1) {
        const type = this.pickEnemyType(wave, i, count);
        const baseLane = Phaser.Utils.Array.GetRandom(LANES);
        const lane = Phaser.Math.Clamp(baseLane + Phaser.Math.FloatBetween(-0.09, 0.09), -MAX_LANE, MAX_LANE);
      const z = Phaser.Math.FloatBetween(0.86, DEPTH_FAR + 0.24) + i * 0.025;
        this.spawnEnemy(type, lane, z);
      }
    }

    pickEnemyType(wave, index, count) {
      if (wave >= 1 && index === count - 1) {
        return this.power >= 7 ? "titan" : "shield";
      }
      if (index === 0) {
        return this.power >= 3 && Math.random() < 0.45 ? "skimmer" : "scout";
      }

      const roll = Math.random();
      if (wave >= 3 && roll < 0.11) {
        return "titan";
      }
      if (wave >= 1 && roll < 0.32) {
        return "shield";
      }
      return roll < 0.62 ? "scout" : "skimmer";
    }

    spawnEnemy(typeKey, lane, z) {
      const type = ENEMY_TYPES[typeKey];
      const wave = Math.floor(this.elapsed / 10);
      const hp = Math.ceil(type.hp + type.hpPerWave * wave);
      const enemy = this.add.container(0, 0);
      const aura = this.add.circle(0, 0, typeKey === "titan" ? 52 : 46, type.color, 0.2);
      const shadow = this.add.ellipse(0, 29, 76, 24, 0x000000, 0.28);
      const body = this.add.circle(0, 0, typeKey === "titan" ? 38 : 32, type.color, 0.96);
      body.setStrokeStyle(type.requiredPower > 2 ? 5 : 3, COLORS.white, type.requiredPower > 2 ? 0.52 : 0.38);
      const eye = this.add.rectangle(0, -7, typeKey === "titan" ? 34 : 28, 10, 0x0f172a, 0.86);
      const label = this.add.text(0, 31, String(hp), {
        fontFamily: "Arial, system-ui, sans-serif",
        fontSize: "24px",
        fontStyle: "900",
        color: "#ffffff",
      }).setOrigin(0.5);
      const tag = this.add.text(0, -42, type.requiredPower > 2 ? `P${type.requiredPower}` : "OK", {
        fontFamily: '"Noto Sans KR", system-ui, sans-serif',
        fontSize: "17px",
        fontStyle: "900",
        color: type.requiredPower > 2 ? "#ffd1ff" : "#b9ecff",
      }).setOrigin(0.5);

      enemy.add([aura, shadow, body, eye, label, tag]);
      enemy.enemyId = this.nextEnemyId;
      this.nextEnemyId += 1;
      enemy.typeKey = typeKey;
      enemy.type = type;
      enemy.lane = lane;
      enemy.depthZ = z;
      enemy.hp = hp;
      enemy.maxHp = hp;
      enemy.requiredPower = type.requiredPower;
      enemy.speed = type.speed + Phaser.Math.FloatBetween(-type.jitter, type.jitter);
      enemy.scoreValue = type.score;
      enemy.penalty = type.penalty;
      enemy.label = label;
      enemy.bodyShape = body;
      enemy.lastResistAt = 0;
      enemy.phase = Math.random() * Math.PI * 2;
      this.applyPerspective(enemy, 0.88);
      this.activeEnemies.push(enemy);
      return enemy;
    }

    updateBullets(delta) {
      const step = delta / 1000;

      for (let i = this.activeBullets.length - 1; i >= 0; i -= 1) {
        const bullet = this.activeBullets[i];
        bullet.depthZ += bullet.speed * step;
        this.applyPerspective(bullet, 0.78);

        for (let j = this.activeEnemies.length - 1; j >= 0; j -= 1) {
          const enemy = this.activeEnemies[j];
          if (bullet.hitTargets.has(enemy.enemyId)) {
            continue;
          }
          if (!this.depthLaneOverlap(bullet, enemy, 0.065, 0.14)) {
            continue;
          }

          bullet.hitTargets.add(enemy.enemyId);
          this.damageEnemy(enemy, bullet.damage, bullet);
          if (bullet.splash > 0) {
            this.splashDamage(enemy, bullet.damage * 0.55, bullet.splash);
          }

          if (enemy.hp <= 0) {
            this.breakEnemy(enemy);
            this.destroyFrom(this.activeEnemies, j);
          }

          if (bullet.pierce <= 0) {
            this.destroyFrom(this.activeBullets, i);
            break;
          }
          bullet.pierce -= 1;
        }

        if (!bullet.active) {
          continue;
        }
        if (bullet.depthZ > DEPTH_FAR + 0.16) {
          this.destroyFrom(this.activeBullets, i);
        }
      }
    }

    splashDamage(originEnemy, damage, radius) {
      for (let i = this.activeEnemies.length - 1; i >= 0; i -= 1) {
        const enemy = this.activeEnemies[i];
        if (enemy === originEnemy) {
          continue;
        }
        const laneDistance = Math.abs(enemy.lane - originEnemy.lane);
        const depthDistance = Math.abs(enemy.depthZ - originEnemy.depthZ);
        if (laneDistance <= radius * 1.6 && depthDistance <= radius) {
          this.damageEnemy(enemy, damage, null);
          if (enemy.hp <= 0) {
            this.breakEnemy(enemy);
            this.destroyFrom(this.activeEnemies, i);
          }
        }
      }
    }

    updateGates(delta) {
      const step = delta / 1000;
      for (let i = this.activeGates.length - 1; i >= 0; i -= 1) {
        const gate = this.activeGates[i];
        gate.depthZ -= gate.speed * step;
        this.applyPerspective(gate, 1.05);

        if (
          gate.depthZ <= 0.055 &&
          !this.usedGateRows.has(gate.rowId) &&
          Math.abs(this.playerLane - gate.lane) <= gate.hitLaneWidth
        ) {
          this.usedGateRows.add(gate.rowId);
          this.applyGate(gate);
          this.destroyFrom(this.activeGates, i);
          continue;
        }

        if (gate.depthZ < -0.08) {
          this.destroyFrom(this.activeGates, i);
        }
      }
    }

    updateEnemies(delta) {
      const step = delta / 1000;

      for (let i = this.activeEnemies.length - 1; i >= 0; i -= 1) {
        const enemy = this.activeEnemies[i];
        enemy.depthZ -= enemy.speed * step;
        enemy.lane += Math.sin(this.elapsed * 1.8 + enemy.phase) * 0.003 * step;
        enemy.lane = Phaser.Math.Clamp(enemy.lane, -MAX_LANE, MAX_LANE);
        this.applyPerspective(enemy, 0.92);

        if (enemy.depthZ <= 0.035 && Math.abs(enemy.lane - this.playerLane) <= 0.24) {
          this.hitPlayer(enemy);
          this.destroyFrom(this.activeEnemies, i);
          continue;
        }

        if (enemy.depthZ < -0.1) {
          this.combo = 0;
          this.destroyFrom(this.activeEnemies, i);
        }
      }
    }

    damageEnemy(enemy, damage, bullet) {
      const underpowered = this.power < enemy.requiredPower;
      const actualDamage = underpowered ? Math.min(0.35, damage * 0.25) : damage;
      enemy.hp -= actualDamage;
      if (underpowered && enemy.hp <= 1) {
        enemy.hp = 1;
      }
      enemy.label.setText(String(Math.max(1, Math.ceil(enemy.hp))));
      enemy.bodyShape.setAlpha(underpowered ? 0.72 : 1);

      if (underpowered && this.time.now - enemy.lastResistAt > 520) {
        enemy.lastResistAt = this.time.now;
        this.spawnFloater(enemy.x, enemy.y - 24, "강화 필요", "#ffd1ff", 26);
      }

      this.tweens.add({
        targets: enemy,
        scaleX: enemy.scaleX * 1.08,
        scaleY: enemy.scaleY * 1.08,
        duration: 45,
        yoyo: true,
        ease: "Sine.out",
      });

      if (bullet) {
        this.flashAt(enemy.x, enemy.y, underpowered ? COLORS.purple : bullet.damage >= 2 ? COLORS.amber : COLORS.sky, underpowered ? 34 : 42);
      }
    }

    breakEnemy(enemy) {
      this.combo += 1;
      const gain = enemy.scoreValue + Math.floor(enemy.maxHp * 2) + this.combo * 3;
      this.score += gain;
      this.spawnFloater(enemy.x, enemy.y, `+${gain}`, "#ffc857", 36);
      this.flashAt(enemy.x, enemy.y, COLORS.amber, 78);
    }

    hitPlayer(enemy) {
      this.combo = 0;
      this.power = Math.max(1, this.power - enemy.penalty);
      this.spawnFloater(enemy.x, enemy.y - 20, `-${enemy.penalty}`, "#ff8b96", 38);
      this.flashAt(enemy.x, enemy.y, COLORS.red, 92);
      this.cameras.main.shake(120, 0.007);
    }

    applyGate(gate) {
      const before = this.power;
      this.power = Phaser.Math.Clamp(this.power + gate.value, 1, 16);
      const actual = this.power - before;
      const text = actual >= 0 ? `+${actual}` : String(actual);
      const color = gate.value > 0 ? "#57e389" : "#ff8b96";

      if (gate.value > 0) {
        this.score += gate.value * 10;
        this.combo += 1;
      } else {
        this.combo = 0;
      }

      this.spawnFloater(gate.x, gate.y, text, color, 44);
      this.flashAt(gate.x, gate.y, gate.value > 0 ? COLORS.green : COLORS.red, 104);
      this.cameras.main.shake(90, gate.value > 0 ? 0.003 : 0.006);
    }

    updateFloaters(delta) {
      const step = delta / 1000;
      for (let i = this.floaters.length - 1; i >= 0; i -= 1) {
        const floater = this.floaters[i];
        floater.y -= floater.floatSpeed * step;
        floater.alpha -= 1.22 * step;
        if (floater.alpha <= 0) {
          floater.destroy();
          this.floaters.splice(i, 1);
        }
      }
    }

    updateHud() {
      const weapon = this.getWeaponProfile();
      this.scoreText.setText(String(this.score));
      this.powerText.setText(`파워 ${this.power}`);
      this.powerText.setColor(this.power >= 8 ? "#ffc857" : "#57e389");
      this.weaponText.setText(`무기 ${weapon.name}`);
      this.weaponText.setColor(weapon.minPower >= 8 ? "#ffd1ff" : "#b9ecff");
      this.timeText.setText(String(Math.ceil(this.timeLeft)));
      this.comboText.setText(this.combo >= 3 ? `${this.combo} COMBO` : "");
    }

    handlePointer(pointer) {
      if (this.mode !== "play") {
        return;
      }
      this.playerTargetLane = this.screenToLane(pointer.worldX);
    }

    getWeaponProfile() {
      return WEAPON_TIERS.find((tier) => this.power >= tier.minPower) || WEAPON_TIERS[WEAPON_TIERS.length - 1];
    }

    project(lane, z) {
      const depth = Phaser.Math.Clamp(z, 0, 1);
      const t = 1 - depth;
      const yEase = Math.pow(t, 1.72);
      const widthEase = Math.pow(t, 1.08);
      const half = FAR_HALF + (NEAR_HALF - FAR_HALF) * widthEase;
      const y = HORIZON_Y + (GROUND_Y - HORIZON_Y) * yEase;
      const x = CENTER_X + lane * half;
      const scale = 0.2 + 1.0 * Math.pow(t, 1.35);
      const alpha = Phaser.Math.Clamp(0.38 + t * 1.05, 0.38, 1);
      return { x, y, scale, alpha, t, half };
    }

    applyPerspective(item, scaleFactor) {
      const p = this.project(item.lane || 0, item.depthZ || 0);
      item.setPosition(p.x, p.y);
      item.setScale(p.scale * scaleFactor);
      item.setAlpha(p.alpha);
      item.setDepth(80 + Math.round(p.t * 3200));
    }

    screenToLane(x) {
      return Phaser.Math.Clamp((x - CENTER_X) / NEAR_HALF, -MAX_LANE, MAX_LANE);
    }

    depthLaneOverlap(a, b, depthPadding, lanePadding) {
      const depthDistance = Math.abs(a.depthZ - b.depthZ);
      const nearBoost = 1 - Phaser.Math.Clamp((a.depthZ + b.depthZ) / 2, 0, 1);
      const laneDistance = Math.abs(a.lane - b.lane);
      return depthDistance <= depthPadding + nearBoost * 0.025 && laneDistance <= lanePadding + nearBoost * 0.08;
    }

    spawnFloater(x, y, text, color, size) {
      const floater = this.add.text(x, y - 16, text, {
        fontFamily: '"Noto Sans KR", Arial, system-ui, sans-serif',
        fontSize: `${size}px`,
        fontStyle: "900",
        color,
      }).setOrigin(0.5).setDepth(7600);
      floater.floatSpeed = size > 34 ? 100 : 74;
      this.floaters.push(floater);
    }

    flashAt(x, y, color, radius) {
      const flash = this.add.circle(x, y, 18, color, 0.42).setDepth(7400);
      this.tweens.add({
        targets: flash,
        radius,
        alpha: 0,
        duration: 260,
        ease: "Sine.out",
        onComplete: () => flash.destroy(),
      });
    }

    createButton(x, y, label, onClick) {
      const button = this.add.container(x, y).setSize(280, 92).setInteractive({ useHandCursor: true });
      const bg = this.add.rectangle(0, 0, 280, 92, COLORS.mint, 1);
      bg.setStrokeStyle(4, COLORS.white, 0.55);
      const text = this.add.text(0, -2, label, {
        fontFamily: '"Noto Sans KR", system-ui, sans-serif',
        fontSize: "40px",
        fontStyle: "900",
        color: "#08211d",
      }).setOrigin(0.5);
      button.add([bg, text]);
      button.on("pointerdown", onClick);
      button.on("pointerover", () => bg.setFillStyle(COLORS.amber));
      button.on("pointerout", () => bg.setFillStyle(COLORS.mint));
      return button;
    }

    createSmallButton(x, y, label, onClick) {
      const button = this.add.container(x, y).setSize(142, 58).setInteractive({ useHandCursor: true });
      const bg = this.add.rectangle(0, 0, 142, 58, 0xffffff, 0.13);
      bg.setStrokeStyle(2, 0xffffff, 0.34);
      const text = this.add.text(0, -1, label, {
        fontFamily: '"Noto Sans KR", system-ui, sans-serif',
        fontSize: "24px",
        fontStyle: "800",
        color: "#ffffff",
      }).setOrigin(0.5);
      button.add([bg, text]);
      button.on("pointerdown", onClick);
      button.on("pointerover", () => bg.setFillStyle(0xffffff, 0.22));
      button.on("pointerout", () => bg.setFillStyle(0xffffff, 0.13));
      return button;
    }

    hudStyle(size, color) {
      return {
        fontFamily: '"Noto Sans KR", system-ui, sans-serif',
        fontSize: size,
        fontStyle: "900",
        color,
      };
    }

    destroyFrom(list, index) {
      const item = list[index];
      if (item && item.destroy) {
        item.destroy();
      }
      list.splice(index, 1);
    }

    clearLayer(layer) {
      if (layer) {
        layer.destroy(true);
      }
    }

    clearRunObjects() {
      for (const list of [this.activeGates, this.activeEnemies, this.activeBullets, this.floaters]) {
        if (!list) {
          continue;
        }
        for (const item of list) {
          if (item && item.destroy) {
            item.destroy();
          }
        }
        list.length = 0;
      }
      this.usedGateRows.clear();
      if (this.player) {
        this.player.destroy();
        this.player = null;
      }
      this.clearLayer(this.hudLayer);
    }
  }

  window.NumberGateBlaster = new Phaser.Game({
    type: Phaser.AUTO,
    parent: "game-root",
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: "#07111d",
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [NumberGateScene],
  });
})();
