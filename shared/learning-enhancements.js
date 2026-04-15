(() => {
  "use strict";

  const VISITS_KEY = "korean3b.visits.v1";
  const TEXT = {
    visitKo: "\uBC29\uBB38",
    progressTitle: "\uD559\uC2B5 \uC9C4\uD589\uB960"
  };

  function createStorage() {
    let available = true;
    try {
      const testKey = "__korean3b_storage_test__";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
    } catch (error) {
      available = false;
    }

    return {
      get(key, fallback) {
        if (!available) return fallback;
        try {
          const raw = window.localStorage.getItem(key);
          return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
          return fallback;
        }
      },
      set(key, value) {
        if (!available) return false;
        try {
          window.localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch (error) {
          return false;
        }
      }
    };
  }

  const storage = createStorage();

  function cleanPath(pathname) {
    const clean = String(pathname || "").split("#")[0].split("?")[0];
    if (!clean) return "/index.html";
    return clean.endsWith("/") ? `${clean}index.html` : clean;
  }

  function getCurrentPath() {
    return cleanPath(window.location.pathname);
  }

  function linkPathFromHref(href) {
    if (!href) return null;
    try {
      const url = new URL(href, window.location.href);
      return cleanPath(url.pathname);
    } catch (error) {
      return null;
    }
  }

  function upsertVisit(pathname) {
    const visits = storage.get(VISITS_KEY, {});
    const now = new Date().toISOString();
    const existing = visits[pathname] || { count: 0 };
    visits[pathname] = {
      title: document.title || "Untitled",
      count: Number(existing.count || 0) + 1,
      lastVisitedAt: now
    };
    storage.set(VISITS_KEY, visits);
    return visits;
  }

  function isIndexPage(pathname) {
    return pathname.toLowerCase().endsWith("/index.html");
  }

  function inChapterFolder(pathname) {
    return /\/c\d+\//i.test(pathname);
  }

  function ensureStyle() {
    if (document.getElementById("le-style")) return;
    const style = document.createElement("style");
    style.id = "le-style";
    style.textContent = `
      .le-index-summary {
        margin-bottom: 16px;
        padding: 12px;
        border-radius: 12px;
        border: 1px solid rgba(148, 163, 184, 0.25);
        background: rgba(15, 23, 42, 0.55);
      }
      .le-index-summary strong {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
      }
      .le-progress-track {
        width: 100%;
        height: 10px;
        border-radius: 999px;
        background: rgba(148, 163, 184, 0.2);
        overflow: hidden;
      }
      .le-progress-fill {
        height: 100%;
        width: 0%;
        border-radius: 999px;
        background: linear-gradient(90deg, #22c55e, #84cc16);
        transition: width 0.25s ease;
      }
      .le-progress-text {
        margin-top: 8px;
        font-size: 12px;
        color: #cbd5e1;
      }
      .le-link-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;
        margin-left: auto;
        border-radius: 999px;
        padding: 3px 7px;
        min-width: 42px;
        pointer-events: none;
      }
      .le-link-badge-visit {
        color: #0f172a;
        background: #e2e8f0;
      }
      .le-badge-ko {
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.01em;
        line-height: 1.15;
      }
    `;
    document.head.appendChild(style);
  }

  function createBadge() {
    const badge = document.createElement("span");
    badge.className = "le-link-badge le-link-badge-visit";
    badge.innerHTML = `<span class="le-badge-ko">${TEXT.visitKo}</span>`;
    return badge;
  }

  function summarizeChapterLinks(pathname, links, visits) {
    if (!isIndexPage(pathname)) return;
    if (!inChapterFolder(pathname)) return;

    const lessonPaths = links
      .map((a) => linkPathFromHref(a.getAttribute("href")))
      .filter((p) => p && p !== pathname && !p.endsWith("/index.html"));

    const uniquePaths = Array.from(new Set(lessonPaths));
    if (uniquePaths.length === 0) return;

    const visitedCount = uniquePaths.filter((p) => visits[p] && Number(visits[p].count || 0) > 0).length;
    const visitedPercent = Math.round((visitedCount / uniquePaths.length) * 100);

    const summary = document.createElement("section");
    summary.className = "le-index-summary";
    summary.innerHTML = `
      <strong>${TEXT.progressTitle}</strong>
      <div class="le-progress-track"><div class="le-progress-fill"></div></div>
      <div class="le-progress-text">${TEXT.visitKo} ${visitedCount}/${uniquePaths.length}</div>
    `;
    const fill = summary.querySelector(".le-progress-fill");
    if (fill) fill.style.width = `${visitedPercent}%`;

    const main = document.querySelector("main");
    if (main) {
      main.insertBefore(summary, main.firstChild);
    } else {
      document.body.insertBefore(summary, document.body.firstChild);
    }
  }

  function annotateLinksAndSummary() {
    const pathname = getCurrentPath();
    if (!isIndexPage(pathname)) return;
    const links = Array.from(document.querySelectorAll('a[href$=".html"], a[href*=".html#"], a[href*=".html?"]'));
    if (links.length === 0) return;

    const visits = storage.get(VISITS_KEY, {});
    links.forEach((link) => {
      if (link.closest("nav")) return;
      const existing = link.querySelector(".le-link-badge");
      if (existing) existing.remove();

      const href = link.getAttribute("href");
      const linkPath = linkPathFromHref(href);
      if (!linkPath || linkPath === pathname) return;

      const visited = Boolean(visits[linkPath] && Number(visits[linkPath].count || 0) > 0);
      if (!visited) return;

      link.appendChild(createBadge());
    });

    const existingSummary = document.querySelector(".le-index-summary");
    if (existingSummary) existingSummary.remove();
    summarizeChapterLinks(pathname, links, visits);
  }

  function bootstrap() {
    const pathname = getCurrentPath();
    upsertVisit(pathname);
    ensureStyle();
    annotateLinksAndSummary();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
})();
