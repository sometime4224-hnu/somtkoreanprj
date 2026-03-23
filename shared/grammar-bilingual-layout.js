(() => {
  "use strict";

  const TEXT = {
    translation: "베트남어 설명",
    spotlight: "한눈 포인트"
  };

  const PAGE_CONFIGS = {
    // Future lessons can be added here with the key "<chapter>/<file>".
    // If a page is not listed, the script still applies automatic bilingual
    // layout rules to "만드는 법 / 형태 규칙" and "헷갈림 비교" sections.
    "c12/grammar1.html": {
      rules: {
        type: "paragraph-groups",
        labels: ["기본 규칙", "예외 / 활용"],
        groups: [
          [0, 1],
          [2, 3]
        ]
      },
      compare: {
        type: "flat-paragraphs",
        labels: ["이유 설명", "경험 결과"]
      }
    },
    "c12/grammar2.html": {
      rules: {
        type: "paragraph-groups",
        labels: ["동사", "형용사", "있다 / 없다", "과거", "명사"],
        groups: [
          [0, 1],
          [2, 3],
          [4, 5],
          [6],
          [7]
        ]
      },
      compare: {
        type: "labelled-blocks",
        labels: ["강조 차이", "문장 느낌", "형태 체크"]
      }
    },
    "c12/grammar3.html": {
      rules: {
        type: "paragraph-groups",
        labels: ["현재 동사", "과거 동사", "미래 동사", "형용사", "명사"],
        groups: [
          [0, 1],
          [2, 3],
          [4],
          [5],
          [6]
        ]
      },
      compare: {
        type: "labelled-blocks",
        labels: ["뉘앙스", "추측 강도", "형태 체크"]
      }
    },
    "c12/grammar4.html": {
      rules: {
        type: "paragraph-groups",
        labels: ["받침 있음", "받침 없음", "하다", "명사"],
        groups: [
          [0, 1],
          [2, 3],
          [4],
          [5, 6]
        ]
      },
      compare: {
        type: "labelled-blocks",
        labels: ["의미 차이", "조건 세기", "형태 체크"]
      }
    }
  };

  function ensureStyle() {
    if (document.getElementById("grammar-bilingual-layout-style")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "grammar-bilingual-layout-style";
    style.textContent = `
      .gbl-grid,
      .gbl-compare-grid {
        display: grid;
        gap: 12px;
        margin-top: 14px;
      }

      .gbl-card,
      .gbl-compare-card,
      .gbl-spotlight {
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        border: 1px solid var(--accent-line, #93c5fd);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%);
        box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);
      }

      .gbl-card,
      .gbl-compare-card {
        padding: 14px;
      }

      .gbl-spotlight {
        margin-top: 12px;
        padding: 14px;
        background: linear-gradient(135deg, var(--accent-soft, #dbeafe) 0%, rgba(255, 255, 255, 0.96) 100%);
      }

      .gbl-card::after,
      .gbl-compare-card::after {
        content: "";
        position: absolute;
        top: -24px;
        right: -20px;
        width: 88px;
        height: 88px;
        border-radius: 999px;
        background: var(--accent-soft, #dbeafe);
        opacity: 0.5;
      }

      .gbl-badge {
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 10px;
        border-radius: 999px;
        border: 1px solid var(--accent-line, #93c5fd);
        background: var(--accent-soft, #dbeafe);
        color: var(--accent, #2563eb);
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.02em;
      }

      .gbl-card-copy,
      .gbl-line-wrap,
      .gbl-spotlight-copy {
        position: relative;
        z-index: 1;
        display: grid;
        gap: 8px;
      }

      .gbl-card-copy {
        margin-top: 12px;
      }

      .gbl-main,
      .gbl-compare-line {
        position: relative;
        z-index: 1;
        margin-top: 12px;
        font-size: 14px;
        line-height: 1.55;
        color: #0f172a;
      }

      .gbl-main {
        font-weight: 800;
      }

      .gbl-note {
        position: relative;
        z-index: 1;
        margin-top: 10px;
        padding: 10px 12px;
        border-radius: 14px;
        border: 1px dashed var(--accent-line, #93c5fd);
        background: rgba(255, 255, 255, 0.9);
        font-size: 13px;
        line-height: 1.6;
        color: #475569;
      }

      .gbl-line-wrap > .gbl-main,
      .gbl-line-wrap > .gbl-note,
      .gbl-compare-copy > .gbl-compare-line {
        margin-top: 0;
      }

      .gbl-block {
        position: relative;
        z-index: 1;
        margin: 0;
      }

      .gbl-block > :first-child {
        margin-top: 0 !important;
      }

      .gbl-block > :last-child {
        margin-bottom: 0 !important;
      }

      .gbl-block ul,
      .gbl-block ol {
        padding-left: 1.1rem;
      }

      .gbl-block li + li {
        margin-top: 0.4rem;
      }

      .gbl-translation {
        margin-top: 12px;
        padding: 12px 14px;
        border-radius: 18px;
        border: 1px solid var(--accent-line, #93c5fd);
        background: rgba(255, 255, 255, 0.74);
      }

      .gbl-summary-translation {
        margin-bottom: 0;
      }

      .gbl-inline-translation {
        margin-top: 0;
        padding: 9px 10px;
        border-radius: 14px;
        border: 1px solid rgba(148, 163, 184, 0.28);
        background: rgba(255, 255, 255, 0.82);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
      }

      .gbl-translation-label {
        margin: 0;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.04em;
        color: var(--accent, #2563eb);
        text-transform: uppercase;
      }

      .gbl-translation-line {
        margin-top: 8px;
        font-size: 12px;
        line-height: 1.55;
        color: #334155;
      }

      .gbl-inline-translation .gbl-translation-line {
        margin-top: 0;
      }

      .gbl-inline-translation .gbl-translation-line + .gbl-translation-line {
        margin-top: 6px;
      }

      .gbl-compare-copy {
        position: relative;
        z-index: 1;
        display: grid;
        gap: 8px;
        margin-top: 10px;
      }

      .gbl-compare-copy > p:first-child,
      .gbl-card-copy > .gbl-block > p:first-child {
        font-size: 14px;
        font-weight: 800;
        color: #0f172a;
      }

      .gbl-compare-copy > p:not(:first-child):not(.vi-text) {
        font-size: 13px;
        line-height: 1.6;
        color: #475569;
      }

      .gbl-compare-copy > p.vi-text {
        margin-top: 2px;
        padding: 9px 10px;
        border-radius: 14px;
        border: 1px solid rgba(148, 163, 184, 0.28);
        background: rgba(255, 255, 255, 0.82);
        font-size: 12px;
        line-height: 1.55;
        color: #334155;
      }

      .gbl-spotlight-label {
        margin: 0;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.05em;
        color: var(--accent, #2563eb);
        text-transform: uppercase;
      }

      .gbl-spotlight-copy {
        margin-top: 10px;
      }

      .gbl-spotlight-copy > p:first-child {
        margin: 0;
        font-size: 13px;
        line-height: 1.6;
        font-weight: 700;
        color: #0f172a;
      }
    `;

    document.head.appendChild(style);
  }

  function getPageSignature() {
    const cleanPath = String(window.location.pathname || "").split("#")[0].split("?")[0];
    const parts = cleanPath.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
    }
    return parts[parts.length - 1] || "";
  }

  function getLearnArticles() {
    const learnPanel = document.getElementById("learnPanel");
    if (!learnPanel) {
      return [];
    }

    return Array.from(learnPanel.children).filter((node) => node.tagName === "ARTICLE");
  }

  function getHeading(article) {
    return article ? article.querySelector("h2") : null;
  }

  function getHeadingText(article) {
    const heading = getHeading(article);
    return heading ? String(heading.textContent || "").trim() : "";
  }

  function getArticleStructure(article) {
    const heading = getHeading(article);
    const directChildren = Array.from(article.children).filter((node) => node !== heading);
    const translation = directChildren.find(
      (node) => node.classList && node.classList.contains("vi-text")
    ) || null;
    const bodyNodes = directChildren.filter((node) => node !== translation);

    return { heading, bodyNodes, translation };
  }

  function collectParagraphs(node) {
    if (!node) {
      return [];
    }

    if (node.tagName === "P") {
      return [node];
    }

    return Array.from(node.children).filter((child) => child.tagName === "P");
  }

  function getPrimaryBodyNode(bodyNodes) {
    return bodyNodes[0] || null;
  }

  function createBadge(label) {
    const badge = document.createElement("span");
    badge.className = "gbl-badge";
    badge.textContent = label;
    return badge;
  }

  function cloneWithClass(node, className) {
    const copy = node.cloneNode(true);
    copy.classList.add("safe");
    if (className) {
      copy.classList.add(className);
    }
    return copy;
  }

  function createTranslationBox(paragraphs, options = {}) {
    const items = paragraphs.filter(Boolean);
    if (!items.length) {
      return null;
    }

    const box = document.createElement("div");
    box.className = [
      "vi-text",
      "gbl-translation",
      "safe",
      options.className || ""
    ].filter(Boolean).join(" ");

    if (!options.hideLabel) {
      const label = document.createElement("p");
      label.className = "gbl-translation-label";
      label.textContent = TEXT.translation;
      box.appendChild(label);
    }

    items.forEach((node) => {
      box.appendChild(cloneWithClass(node, "gbl-translation-line"));
    });

    return box;
  }

  function createInlineTranslation(paragraphs, className) {
    return createTranslationBox(paragraphs, {
      className: `gbl-inline-translation ${className || ""}`.trim(),
      hideLabel: true
    });
  }

  function replaceArticleContent(article, parts) {
    const heading = getHeading(article);
    if (!heading) {
      return;
    }

    article.replaceChildren(heading, ...parts.filter(Boolean));
    article.dataset.gblEnhanced = "true";
  }

  function shouldKeepContainerAsSingleBlock(node) {
    if (!node || !node.classList) {
      return false;
    }

    if (node.tagName === "UL" || node.tagName === "OL") {
      return true;
    }

    return node.classList.contains("overflow-hidden");
  }

  function getAutoBlocks(bodyNodes, mode) {
    if (!bodyNodes.length) {
      return [];
    }

    if (bodyNodes.length === 1) {
      const sole = bodyNodes[0];
      if (sole.tagName === "DIV" && !shouldKeepContainerAsSingleBlock(sole)) {
        const children = Array.from(sole.children).filter((child) => child.nodeType === 1);
        if (!children.length) {
          return bodyNodes;
        }

        if (mode === "compare") {
          const compareChildren = children.filter((child) => child.tagName === "DIV");
          if (compareChildren.length >= 2) {
            return compareChildren;
          }
        } else if (children.length >= 2) {
          return children;
        }
      }
    }

    if (mode === "compare") {
      const compareNodes = bodyNodes.filter((node) => node.tagName === "DIV");
      return compareNodes.length ? compareNodes : bodyNodes;
    }

    return bodyNodes;
  }

  function normalizeText(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function getAutoLabel(node, prefix, index) {
    const candidates = [];

    if (node.matches && /^(p|strong|b|span)$/i.test(node.tagName)) {
      candidates.push(node);
    }

    candidates.push(
      ...Array.from(
        node.querySelectorAll(".tag, .chip, p.font-bold, p.text-sm.font-bold, p.text-xs.font-bold, strong, b")
      ).slice(0, 6)
    );

    for (const candidate of candidates) {
      const text = normalizeText(candidate.textContent);
      if (text && text.length <= 24) {
        return text;
      }
    }

    return `${prefix} ${index + 1}`;
  }

  function appendGenericBlock(copyWrap, node, translationParagraph) {
    copyWrap.appendChild(cloneWithClass(node, "gbl-block"));
    if (translationParagraph) {
      copyWrap.appendChild(createInlineTranslation([translationParagraph]));
    }
  }

  function enhanceRulesByParagraphGroups(article, config) {
    if (!article || article.dataset.gblEnhanced === "true") {
      return;
    }

    const { bodyNodes, translation } = getArticleStructure(article);
    const content = getPrimaryBodyNode(bodyNodes);
    const koParagraphs = collectParagraphs(content);
    const viParagraphs = collectParagraphs(translation);
    if (!koParagraphs.length) {
      return;
    }

    const grid = document.createElement("div");
    grid.className = "gbl-grid";
    const pairByParagraph = viParagraphs.length === koParagraphs.length;
    const pairByCard = !pairByParagraph && viParagraphs.length === config.groups.length;

    config.groups.forEach((indexes, index) => {
      const card = document.createElement("div");
      card.className = "gbl-card";
      card.appendChild(createBadge(config.labels[index] || `규칙 ${index + 1}`));

      const copy = document.createElement("div");
      copy.className = "gbl-card-copy";

      indexes.forEach((paragraphIndex, lineIndex) => {
        const source = koParagraphs[paragraphIndex];
        if (!source) {
          return;
        }

        const lineWrap = document.createElement("div");
        lineWrap.className = "gbl-line-wrap";
        lineWrap.appendChild(
          cloneWithClass(source, lineIndex === 0 ? "gbl-main" : "gbl-note")
        );

        if (pairByParagraph && viParagraphs[paragraphIndex]) {
          lineWrap.appendChild(createInlineTranslation([viParagraphs[paragraphIndex]]));
        }

        copy.appendChild(lineWrap);
      });

      if (pairByCard && viParagraphs[index]) {
        copy.appendChild(createInlineTranslation([viParagraphs[index]]));
      }

      card.appendChild(copy);
      grid.appendChild(card);
    });

    const summaryTranslation = (!pairByParagraph && !pairByCard)
      ? createTranslationBox(viParagraphs, { className: "gbl-summary-translation" })
      : null;

    replaceArticleContent(article, [
      summaryTranslation,
      grid
    ]);
  }

  function enhanceCompareFlat(article, config) {
    if (!article || article.dataset.gblEnhanced === "true") {
      return;
    }

    const { bodyNodes, translation } = getArticleStructure(article);
    const content = getPrimaryBodyNode(bodyNodes);
    const koParagraphs = collectParagraphs(content);
    const viParagraphs = collectParagraphs(translation);
    if (!koParagraphs.length) {
      return;
    }

    const grid = document.createElement("div");
    grid.className = "gbl-compare-grid";
    const usedViIndexes = new Set();

    koParagraphs.slice(0, 2).forEach((node, index) => {
      const card = document.createElement("div");
      card.className = "gbl-compare-card";
      card.appendChild(createBadge(config.labels[index] || `비교 ${index + 1}`));

      const copy = document.createElement("div");
      copy.className = "gbl-compare-copy";
      copy.appendChild(cloneWithClass(node, "gbl-compare-line"));

      if (viParagraphs[index]) {
        copy.appendChild(createInlineTranslation([viParagraphs[index]]));
        usedViIndexes.add(index);
      }

      card.appendChild(copy);
      grid.appendChild(card);
    });

    let spotlight = null;
    if (koParagraphs[2]) {
      spotlight = document.createElement("div");
      spotlight.className = "gbl-spotlight";

      const label = document.createElement("p");
      label.className = "gbl-spotlight-label";
      label.textContent = TEXT.spotlight;
      spotlight.appendChild(label);

      const copy = document.createElement("div");
      copy.className = "gbl-spotlight-copy";
      copy.appendChild(cloneWithClass(koParagraphs[2], ""));

      if (viParagraphs[2]) {
        copy.appendChild(createInlineTranslation([viParagraphs[2]]));
        usedViIndexes.add(2);
      }

      spotlight.appendChild(copy);
    }

    const remainingTranslations = viParagraphs.filter((_, index) => !usedViIndexes.has(index));

    replaceArticleContent(article, [
      grid,
      spotlight,
      createTranslationBox(remainingTranslations, { className: "gbl-summary-translation" })
    ]);
  }

  function enhanceLabelledBlocks(article, config) {
    if (!article || article.dataset.gblEnhanced === "true") {
      return;
    }

    const { bodyNodes, translation } = getArticleStructure(article);
    const content = getPrimaryBodyNode(bodyNodes);
    if (!content) {
      return;
    }

    const blocks = Array.from(content.children).filter((node) => node.tagName === "DIV");
    if (!blocks.length) {
      return;
    }

    const grid = document.createElement("div");
    grid.className = "gbl-compare-grid";

    blocks.forEach((block, index) => {
      const card = document.createElement("div");
      card.className = "gbl-compare-card";
      card.appendChild(createBadge(config.labels[index] || `비교 ${index + 1}`));

      const copy = block.cloneNode(true);
      copy.classList.add("gbl-compare-copy");
      card.appendChild(copy);
      grid.appendChild(card);
    });

    replaceArticleContent(article, [
      createTranslationBox(collectParagraphs(translation), { className: "gbl-summary-translation" }),
      grid
    ]);
  }

  function enhanceRulesAuto(article) {
    if (!article || article.dataset.gblEnhanced === "true") {
      return;
    }

    const { bodyNodes, translation } = getArticleStructure(article);
    const blocks = getAutoBlocks(bodyNodes, "rules");
    if (!blocks.length) {
      return;
    }

    const viParagraphs = collectParagraphs(translation);
    const pairByBlock = viParagraphs.length === blocks.length;
    const grid = document.createElement("div");
    grid.className = "gbl-grid";

    blocks.forEach((node, index) => {
      const card = document.createElement("div");
      card.className = "gbl-card";
      card.appendChild(createBadge(getAutoLabel(node, "규칙", index)));

      const copy = document.createElement("div");
      copy.className = "gbl-card-copy";
      appendGenericBlock(copy, node, pairByBlock ? viParagraphs[index] : null);
      card.appendChild(copy);
      grid.appendChild(card);
    });

    replaceArticleContent(article, [
      pairByBlock ? null : createTranslationBox(viParagraphs, { className: "gbl-summary-translation" }),
      grid
    ]);
  }

  function enhanceCompareAuto(article) {
    if (!article || article.dataset.gblEnhanced === "true") {
      return;
    }

    const { bodyNodes, translation } = getArticleStructure(article);
    const blocks = getAutoBlocks(bodyNodes, "compare");
    if (!blocks.length) {
      return;
    }

    const viParagraphs = collectParagraphs(translation);
    const canPairFallback = viParagraphs.length === blocks.length && blocks.every(
      (block) => !block.querySelector(".vi-text")
    );
    const grid = document.createElement("div");
    grid.className = "gbl-compare-grid";
    const usedViIndexes = new Set();

    blocks.forEach((block, index) => {
      const card = document.createElement("div");
      card.className = "gbl-compare-card";
      card.appendChild(createBadge(getAutoLabel(block, "비교", index)));

      const copy = block.cloneNode(true);
      copy.classList.add("gbl-compare-copy");

      if (canPairFallback && viParagraphs[index]) {
        copy.appendChild(createInlineTranslation([viParagraphs[index]]));
        usedViIndexes.add(index);
      }

      card.appendChild(copy);
      grid.appendChild(card);
    });

    const remainingTranslations = canPairFallback
      ? viParagraphs.filter((_, index) => !usedViIndexes.has(index))
      : viParagraphs;

    replaceArticleContent(article, [
      createTranslationBox(remainingTranslations, { className: "gbl-summary-translation" }),
      grid
    ]);
  }

  function matchesRulesHeading(text) {
    return text.includes("형태 규칙") || text.includes("만드는 법");
  }

  function matchesCompareHeading(text) {
    return text.includes("헷갈림 비교");
  }

  function applyConfiguredEnhancer(article, config) {
    if (!config) {
      return;
    }

    if (config.type === "paragraph-groups") {
      enhanceRulesByParagraphGroups(article, config);
      return;
    }

    if (config.type === "flat-paragraphs") {
      enhanceCompareFlat(article, config);
      return;
    }

    if (config.type === "labelled-blocks") {
      enhanceLabelledBlocks(article, config);
    }
  }

  function init() {
    const articles = getLearnArticles();
    if (!articles.length) {
      return;
    }

    ensureStyle();

    const signature = getPageSignature();
    const config = PAGE_CONFIGS[signature] || {};
    const rulesArticle = articles.find((article) => matchesRulesHeading(getHeadingText(article)));
    const compareArticle = articles.find((article) => matchesCompareHeading(getHeadingText(article)));

    if (rulesArticle) {
      if (config.rules) {
        applyConfiguredEnhancer(rulesArticle, config.rules);
      } else {
        enhanceRulesAuto(rulesArticle);
      }
    }

    if (compareArticle) {
      if (config.compare) {
        applyConfiguredEnhancer(compareArticle, config.compare);
      } else {
        enhanceCompareAuto(compareArticle);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
