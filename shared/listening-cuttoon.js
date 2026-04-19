(() => {
    "use strict";

    const CUT_TOLERANCE = 0.05;
    const WORD_TOLERANCE = 0.04;
    const state = {
        lesson: null,
        sourceType: "generated",
        cutAvailability: new Map(),
        cutRanges: [],
        transcriptTimeline: [],
        activeCutIndex: null,
        activeLineIndex: null,
        activeWordIndex: null,
        transcriptOpen: false,
        audioObjectUrl: null,
        pendingSeekTime: null
    };
    const refs = {};

    document.addEventListener("DOMContentLoaded", init);

    async function init() {
        const lessonKey = document.body.dataset.lessonKey;
        const dataset = window.C14_LISTENING_CUTTOON || {};
        const lesson = dataset[lessonKey];
        if (!lesson) return;

        state.lesson = lesson;
        cacheRefs();
        applyTheme(lesson);
        refs.pageTitle.textContent = lesson.title;
        refs.navTitle.textContent = lesson.title;

        bindUi();
        state.cutAvailability = resolveCutAvailability(lesson);
        const audioInfo = await resolveAudioSource(lesson);
        const audioPlaybackSrc = await prepareAudioPlaybackSrc(audioInfo.src);
        state.sourceType = audioInfo.type;
        refs.audioSourceBadge.textContent = audioInfo.label;
        refs.audioPlayer.src = audioPlaybackSrc;
        refs.audioPlayer.dataset.sourceType = audioInfo.type;

        rebuildTimingState();
        renderThumbs();
        renderTranscript();
        updateCutState(0, true);
        updateTranscriptState(0, true);
    }

    function cacheRefs() {
        refs.navTitle = document.getElementById("cuttoonNavTitle");
        refs.pageTitle = document.getElementById("cuttoonPageTitle");
        refs.audioSourceBadge = document.getElementById("audioSourceBadge");
        refs.toggleTranscriptBtn = document.getElementById("toggleTranscriptBtn");
        refs.panelImage = document.getElementById("panelImage");
        refs.cutThumbs = document.getElementById("cutThumbs");
        refs.audioPlayer = document.getElementById("audioPlayer");
        refs.transcriptSection = document.getElementById("transcriptSection");
        refs.transcriptLines = document.getElementById("transcriptLines");
    }

    function bindUi() {
        window.addEventListener("pagehide", releaseAudioObjectUrl, { once: true });

        refs.toggleTranscriptBtn.addEventListener("click", () => {
            state.transcriptOpen = !state.transcriptOpen;
            refs.transcriptSection.hidden = !state.transcriptOpen;
            refs.toggleTranscriptBtn.textContent = state.transcriptOpen ? "대본 닫기" : "대본";
            if (state.transcriptOpen && Number.isInteger(state.activeLineIndex)) {
                scrollLineIntoView(state.activeLineIndex);
            }
        });

        refs.audioPlayer.addEventListener("timeupdate", () => syncToAudio());
        refs.audioPlayer.addEventListener("seeked", () => syncToAudio(true));
        refs.audioPlayer.addEventListener("loadedmetadata", () => {
            applyPendingSeek();
            syncToAudio(true);
        });
        refs.audioPlayer.addEventListener("canplay", applyPendingSeek);
        refs.panelImage.addEventListener("error", handlePanelImageError);
    }

    function applyTheme(lesson) {
        const root = document.documentElement;
        root.style.setProperty("--lc-accent", lesson.theme.accent);
        root.style.setProperty("--lc-accent-dark", lesson.theme.accentDark);
        root.style.setProperty("--lc-frame-ratio", String(lesson.frameRatio || "16 / 9"));
        document.body.style.background = lesson.theme.pageBackground;
    }

    async function resolveAudioSource(lesson) {
        const originalSrc = lesson.audio && lesson.audio.originalSrc;
        if (originalSrc && await probeAsset(originalSrc)) {
            return { type: "original", src: originalSrc, label: "원음" };
        }
        return {
            type: "generated",
            src: lesson.audio.generatedSrc,
            label: "생성 음성"
        };
    }

    function resolveCutAvailability(lesson) {
        const availability = new Map();
        (lesson.cuts || []).forEach((cut) => {
            const hasCustom = Boolean(cut.src);
            availability.set(cut.id, hasCustom);
        });
        return availability;
    }

    async function prepareAudioPlaybackSrc(src) {
        releaseAudioObjectUrl();
        try {
            const response = await fetch(src, { cache: "no-store" });
            if (!response.ok) throw new Error(`Failed to load audio: ${response.status}`);
            const blob = await response.blob();
            state.audioObjectUrl = URL.createObjectURL(blob);
            return state.audioObjectUrl;
        } catch {
            return src;
        }
    }

    function releaseAudioObjectUrl() {
        if (!state.audioObjectUrl) return;
        URL.revokeObjectURL(state.audioObjectUrl);
        state.audioObjectUrl = null;
    }

    async function probeAsset(src) {
        try {
            const response = await fetch(src, { method: "HEAD", cache: "no-store" });
            return response.ok;
        } catch {
            return false;
        }
    }

    function rebuildTimingState() {
        state.cutRanges = (state.lesson.cuts || []).map((cut) => getCutRange(cut));
        state.transcriptTimeline = (state.lesson.transcript || []).map((line) => buildLineTimeline(line));
    }

    function buildLineTimeline(line) {
        const timing = getTimingEntry(line);
        const start = Number(timing.start);
        const end = Number(timing.end);
        const chunks = Array.isArray(timing.chunks) && timing.chunks.length
            ? timing.chunks
            : [{ text: line.text, start, end }];
        const words = [];

        chunks.forEach((chunk) => {
            const chunkWords = splitWords(chunk.text);
            if (!chunkWords.length) return;
            const weights = chunkWords.map((word) => Math.max(getTokenWeight(word), 1));
            const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
            let cursor = Number(chunk.start);

            chunkWords.forEach((word, index) => {
                const isLast = index === chunkWords.length - 1;
                const duration = isLast
                    ? Math.max(0, Number(chunk.end) - cursor)
                    : (Number(chunk.end) - Number(chunk.start)) * (weights[index] / totalWeight);
                const wordStart = Number(cursor.toFixed(3));
                const wordEnd = Number((isLast ? Number(chunk.end) : cursor + duration).toFixed(3));
                cursor = wordEnd;
                words.push({
                    text: word,
                    start: wordStart,
                    end: wordEnd
                });
            });
        });

        return {
            speaker: line.speaker,
            text: line.text,
            start,
            end,
            words
        };
    }

    function getTimingEntry(line) {
        if (state.sourceType === "generated" && line.generated) {
            return line.generated;
        }
        return line;
    }

    function splitWords(text) {
        return String(text || "")
            .trim()
            .split(/\s+/)
            .filter(Boolean);
    }

    function getTokenWeight(word) {
        const normalized = String(word || "").replace(/[^\uAC00-\uD7A3A-Za-z0-9]/g, "");
        return normalized.length || String(word || "").length || 1;
    }

    function getCutRange(cut) {
        if (state.sourceType === "generated" && cut.generatedRange) {
            return {
                start: Number(cut.generatedRange.start) || 0,
                end: Number(cut.generatedRange.end) || 0
            };
        }
        if (cut.originalRange) {
            return {
                start: Number(cut.originalRange.start) || 0,
                end: Number(cut.originalRange.end) || 0
            };
        }

        const firstLine = state.lesson.transcript[cut.lineStart];
        const lastLine = state.lesson.transcript[cut.lineEnd];
        if (!firstLine || !lastLine) return { start: 0, end: 0 };
        const firstTiming = getTimingEntry(firstLine);
        const lastTiming = getTimingEntry(lastLine);
        return {
            start: Number(firstTiming.start) || 0,
            end: Number(lastTiming.end) || 0
        };
    }

    function renderThumbs() {
        refs.cutThumbs.innerHTML = state.lesson.cuts.map((cut, index) => {
            const visual = getCutVisual(cut);
            return `
                <button class="lc-thumb" type="button" data-cut-index="${index}" aria-label="컷 ${index + 1}">
                    <span class="lc-thumb__index">${index + 1}</span>
                    <span class="lc-thumb__media">
                        <img
                            src="${escapeHtml(visual.src)}"
                            alt="${escapeHtml(cut.alt || state.lesson.fallbackImage.alt)}"
                            class="${visual.isFallback ? "is-fallback" : ""}"
                            style="${getImageStyle(visual)}"
                        >
                    </span>
                </button>
            `;
        }).join("");

        refs.cutThumbs.querySelectorAll(".lc-thumb").forEach((button) => {
            const image = button.querySelector("img");
            if (image) {
                image.addEventListener("error", () => {
                    const cutIndex = Number(button.dataset.cutIndex);
                    handleCutImageError(cutIndex, image);
                }, { once: true });
            }
            button.addEventListener("click", () => {
                const cutIndex = Number(button.dataset.cutIndex);
                const range = state.cutRanges[cutIndex];
                if (!range) return;
                seekAudio(range.start + 0.02);
            });
        });
    }

    function renderTranscript() {
        refs.transcriptLines.innerHTML = state.transcriptTimeline.map((line, lineIndex) => `
            <article class="lc-line" id="cuttoon-line-${lineIndex}" data-line-index="${lineIndex}">
                <div class="lc-line__speaker">${escapeHtml(line.speaker)}</div>
                <div class="lc-line__text">
                    ${line.words.map((word, wordIndex) => `
                        <span class="lc-word" id="cuttoon-word-${lineIndex}-${wordIndex}" data-word-index="${wordIndex}">
                            ${escapeHtml(word.text)}
                        </span>
                    `).join(" ")}
                </div>
            </article>
        `).join("");
    }

    function syncToAudio(force = false) {
        const currentTime = Number.isFinite(refs.audioPlayer.currentTime) ? refs.audioPlayer.currentTime : 0;
        updateCutState(currentTime, force);
        updateTranscriptState(currentTime, force);
    }

    function seekAudio(targetTime) {
        const safeTime = clampAudioTime(targetTime);
        state.pendingSeekTime = safeTime;
        updateCutState(safeTime, true);
        updateTranscriptState(safeTime, true);

        if (refs.audioPlayer.readyState < 1) {
            refs.audioPlayer.load();
            return;
        }

        applyPendingSeek();
    }

    function applyPendingSeek() {
        if (!Number.isFinite(state.pendingSeekTime)) return;
        const targetTime = clampAudioTime(state.pendingSeekTime);

        try {
            refs.audioPlayer.currentTime = targetTime;
            state.pendingSeekTime = null;
            requestAnimationFrame(() => syncToAudio(true));
        } catch {
            state.pendingSeekTime = targetTime;
        }
    }

    function clampAudioTime(targetTime) {
        const rawTime = Number.isFinite(targetTime) ? targetTime : 0;
        const duration = Number.isFinite(refs.audioPlayer.duration) ? refs.audioPlayer.duration : 0;
        if (duration > 0) {
            return Math.min(Math.max(rawTime, 0), Math.max(duration - 0.05, 0));
        }
        return Math.max(rawTime, 0);
    }

    function updateCutState(currentTime, force = false) {
        const nextIndex = getActiveCutIndex(currentTime);
        if (nextIndex === state.activeCutIndex && !force) return;

        const previousButton = refs.cutThumbs.querySelector(`.lc-thumb[data-cut-index="${state.activeCutIndex}"]`);
        if (previousButton) previousButton.classList.remove("is-active");

        state.activeCutIndex = nextIndex;
        const nextButton = refs.cutThumbs.querySelector(`.lc-thumb[data-cut-index="${nextIndex}"]`);
        if (nextButton) nextButton.classList.add("is-active");

        const cut = state.lesson.cuts[nextIndex];
        const visual = getCutVisual(cut);
        refs.panelImage.src = visual.src;
        refs.panelImage.alt = cut.alt || state.lesson.fallbackImage.alt;
        refs.panelImage.classList.toggle("is-fallback", visual.isFallback);
        refs.panelImage.style.cssText = getImageStyle(visual);
    }

    function handlePanelImageError() {
        if (!Number.isInteger(state.activeCutIndex)) return;
        const cut = state.lesson.cuts[state.activeCutIndex];
        if (!cut) return;
        state.cutAvailability.set(cut.id, false);
        updateCutState(Number.isFinite(refs.audioPlayer.currentTime) ? refs.audioPlayer.currentTime : 0, true);
        refreshThumbImage(state.activeCutIndex);
    }

    function handleCutImageError(cutIndex, image) {
        const cut = state.lesson.cuts[cutIndex];
        if (!cut) return;
        state.cutAvailability.set(cut.id, false);
        applyFallbackVisualToImage(image, cut);
        if (cutIndex === state.activeCutIndex) {
            updateCutState(Number.isFinite(refs.audioPlayer.currentTime) ? refs.audioPlayer.currentTime : 0, true);
        }
    }

    function refreshThumbImage(cutIndex) {
        const cut = state.lesson.cuts[cutIndex];
        const image = refs.cutThumbs.querySelector(`.lc-thumb[data-cut-index="${cutIndex}"] img`);
        if (!cut || !image) return;
        applyFallbackVisualToImage(image, cut);
    }

    function applyFallbackVisualToImage(image, cut) {
        const visual = getCutVisual(cut);
        image.src = visual.src;
        image.alt = cut.alt || state.lesson.fallbackImage.alt;
        image.classList.toggle("is-fallback", visual.isFallback);
        image.style.cssText = getImageStyle(visual);
    }

    function updateTranscriptState(currentTime, force = false) {
        const target = getActiveTranscriptTarget(currentTime);
        const nextLineIndex = target ? target.lineIndex : null;
        const nextWordIndex = target ? target.wordIndex : null;

        if (nextLineIndex === state.activeLineIndex && nextWordIndex === state.activeWordIndex && !force) return;

        if (Number.isInteger(state.activeLineIndex)) {
            const previousLine = document.getElementById(`cuttoon-line-${state.activeLineIndex}`);
            if (previousLine) previousLine.classList.remove("is-active");
        }
        if (Number.isInteger(state.activeLineIndex) && Number.isInteger(state.activeWordIndex)) {
            const previousWord = document.getElementById(`cuttoon-word-${state.activeLineIndex}-${state.activeWordIndex}`);
            if (previousWord) previousWord.classList.remove("is-active");
        }

        state.activeLineIndex = nextLineIndex;
        state.activeWordIndex = nextWordIndex;

        if (Number.isInteger(nextLineIndex)) {
            const nextLine = document.getElementById(`cuttoon-line-${nextLineIndex}`);
            if (nextLine) nextLine.classList.add("is-active");
            if (state.transcriptOpen) {
                scrollLineIntoView(nextLineIndex);
            }
        }
        if (Number.isInteger(nextLineIndex) && Number.isInteger(nextWordIndex)) {
            const nextWord = document.getElementById(`cuttoon-word-${nextLineIndex}-${nextWordIndex}`);
            if (nextWord) nextWord.classList.add("is-active");
        }
    }

    function getActiveCutIndex(currentTime) {
        if (!state.cutRanges.length) return 0;

        for (let index = 0; index < state.cutRanges.length; index += 1) {
            const range = state.cutRanges[index];
            if (currentTime >= Math.max(0, range.start - CUT_TOLERANCE) && currentTime < range.end + CUT_TOLERANCE) {
                return index;
            }
        }

        if (currentTime < state.cutRanges[0].start) return 0;
        return state.cutRanges.length - 1;
    }

    function getActiveTranscriptTarget(currentTime) {
        for (let lineIndex = 0; lineIndex < state.transcriptTimeline.length; lineIndex += 1) {
            const line = state.transcriptTimeline[lineIndex];
            if (currentTime < Math.max(0, line.start - CUT_TOLERANCE) || currentTime >= line.end + CUT_TOLERANCE) continue;

            let wordIndex = null;
            for (let index = 0; index < line.words.length; index += 1) {
                const word = line.words[index];
                if (currentTime >= Math.max(0, word.start - WORD_TOLERANCE) && currentTime < word.end + WORD_TOLERANCE) {
                    wordIndex = index;
                    break;
                }
            }

            if (!Number.isInteger(wordIndex) && line.words.length) {
                const duration = Math.max(line.end - line.start, 0.001);
                const progress = Math.min(Math.max((currentTime - line.start) / duration, 0), 0.999999);
                wordIndex = Math.min(Math.floor(progress * line.words.length), line.words.length - 1);
            }

            return { lineIndex, wordIndex };
        }

        return null;
    }

    function scrollLineIntoView(lineIndex) {
        const line = document.getElementById(`cuttoon-line-${lineIndex}`);
        if (!line) return;
        line.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    function getCutVisual(cut) {
        const hasCustom = state.cutAvailability.get(cut.id) !== false && Boolean(cut.src);
        if (hasCustom) {
            return {
                src: cut.src,
                isFallback: false,
                focus: null
            };
        }
        return {
            src: state.lesson.fallbackImage.src,
            isFallback: true,
            focus: cut.fallbackFocus || null
        };
    }

    function getImageStyle(visual) {
        if (!visual.isFallback || !visual.focus) return "";
        const focusX = visual.focus.x || "50%";
        const focusY = visual.focus.y || "50%";
        const scale = Number.isFinite(visual.focus.scale) ? visual.focus.scale : 1.12;
        return `--lc-panel-focus-x:${focusX};--lc-panel-focus-y:${focusY};--lc-panel-scale:${scale};--lc-thumb-focus-x:${focusX};--lc-thumb-focus-y:${focusY};--lc-thumb-scale:${Math.max(1, scale - 0.06)};`;
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }
})();
