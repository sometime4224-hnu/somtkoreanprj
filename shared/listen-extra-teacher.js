(() => {
    "use strict";

    const data = window.C12ListenExtraData;
    if (!data) return;

    const STORAGE_KEY = "korean3b.c12.listen-extra.teacher.v1";
    const GAP_SECONDS = 0.48;

    const questions = data.questions.slice();
    const tracksById = new Map(data.tracks.map((track) => [track.id, track]));

    const refs = {
        qPill: document.getElementById("teacher-question-pill"),
        trackPill: document.getElementById("teacher-track-pill"),
        savePill: document.getElementById("teacher-save-pill"),
        progressFill: document.getElementById("teacher-progress-fill"),
        prompt: document.getElementById("teacher-question-prompt"),
        subPrompt: document.getElementById("teacher-question-subprompt"),
        choices: document.getElementById("teacher-choice-list"),
        prevBtn: document.getElementById("teacher-prev-btn"),
        nextBtn: document.getElementById("teacher-next-btn"),
        transcriptBtn: document.getElementById("teacher-transcript-btn"),
        transcriptPanel: document.getElementById("teacher-transcript-panel"),
        transcriptTitle: document.getElementById("teacher-transcript-title"),
        transcriptNote: document.getElementById("teacher-transcript-note"),
        transcriptBody: document.getElementById("teacher-transcript-body"),
        overlayNav: document.getElementById("teacher-overlay-nav"),
        audio: document.getElementById("teacher-audio"),
        audioTitle: document.getElementById("teacher-audio-title"),
        audioSub: document.getElementById("teacher-audio-sub"),
        playPauseBtn: document.getElementById("teacher-play-pause-btn"),
        restartBtn: document.getElementById("teacher-restart-btn"),
        backBtn: document.getElementById("teacher-seek-back-btn"),
        forwardBtn: document.getElementById("teacher-seek-forward-btn"),
        speedDownBtn: document.getElementById("teacher-speed-down-btn"),
        speedUpBtn: document.getElementById("teacher-speed-up-btn"),
        speedPill: document.getElementById("teacher-speed-pill"),
        seekRange: document.getElementById("teacher-seek-range"),
        nowTime: document.getElementById("teacher-now-time"),
        totalTime: document.getElementById("teacher-total-time"),
        audioDock: document.getElementById("teacher-audio-dock"),
        dockPosButtons: Array.from(document.querySelectorAll("[data-dock-pos]"))
    };

    let state = loadState();
    let currentTimeline = [];
    let activeTokenKey = "";
    let activeSegmentKey = "";
    let saveTimer = null;
    let lastTranscriptScrollAt = 0;

    init();

    function init() {
        bind();
        applyDockPosition();
        syncTrack(true);
        render();
        updatePlaybackUI();
        highlightTranscript();
    }

    function bind() {
        refs.prevBtn.addEventListener("click", () => moveQuestion(state.currentIndex - 1));
        refs.nextBtn.addEventListener("click", () => moveQuestion(state.currentIndex + 1));
        refs.transcriptBtn.addEventListener("click", toggleTranscript);
        refs.dockPosButtons.forEach((button) => {
            button.addEventListener("click", () => {
                setDockPosition(button.dataset.dockPos);
            });
        });

        refs.playPauseBtn.addEventListener("click", async () => {
            if (!refs.audio.src) return;
            if (refs.audio.paused) {
                try {
                    await refs.audio.play();
                } catch (error) {
                    console.error(error);
                }
            } else {
                refs.audio.pause();
            }
            updatePlaybackUI();
        });

        refs.restartBtn.addEventListener("click", async () => {
            refs.audio.currentTime = 0;
            highlightTranscript();
            try {
                await refs.audio.play();
            } catch (error) {
                console.error(error);
            }
        });

        refs.backBtn.addEventListener("click", () => {
            refs.audio.currentTime = Math.max(0, (refs.audio.currentTime || 0) - 5);
            highlightTranscript();
            updatePlaybackUI();
        });

        refs.forwardBtn.addEventListener("click", () => {
            const duration = getTrackDuration();
            refs.audio.currentTime = Math.min(duration, (refs.audio.currentTime || 0) + 5);
            highlightTranscript();
            updatePlaybackUI();
        });

        refs.speedDownBtn.addEventListener("click", () => {
            refs.audio.playbackRate = clamp(roundToHundredths(refs.audio.playbackRate - 0.05), 0.7, 1.3);
            updatePlaybackUI();
        });

        refs.speedUpBtn.addEventListener("click", () => {
            refs.audio.playbackRate = clamp(roundToHundredths(refs.audio.playbackRate + 0.05), 0.7, 1.3);
            updatePlaybackUI();
        });

        refs.seekRange.addEventListener("input", () => {
            refs.audio.currentTime = Number(refs.seekRange.value || 0);
            highlightTranscript();
            updatePlaybackUI();
        });

        refs.audio.addEventListener("loadedmetadata", () => {
            renderTranscript();
            updatePlaybackUI();
            highlightTranscript();
        });

        refs.audio.addEventListener("timeupdate", () => {
            updatePlaybackUI();
            highlightTranscript();
        });

        refs.audio.addEventListener("play", updatePlaybackUI);
        refs.audio.addEventListener("pause", updatePlaybackUI);
        refs.audio.addEventListener("ended", updatePlaybackUI);
    }

    function render() {
        const question = getCurrentQuestion();
        const track = getCurrentTrack();

        refs.qPill.textContent = `문제 ${question.number} / ${questions.length}`;
        refs.trackPill.textContent = `${question.groupLabel} · ${track.shortLabel}`;
        refs.progressFill.style.width = `${((question.number / questions.length) * 100).toFixed(2)}%`;
        refs.prompt.textContent = question.prompt;
        refs.subPrompt.textContent = `${track.title} · 선택한 답은 자동 저장됩니다.`;

        refs.choices.innerHTML = question.options
            .map((option, index) => {
                const selected = state.answers[state.currentIndex] === index;
                const classes = selected ? "choice-btn is-selected" : "choice-btn";
                return `
                    <button type="button" class="${classes}" data-choice-index="${index}">
                        <span class="choice-index">${index + 1}</span>
                        <span class="choice-copy">${escapeHtml(option)}</span>
                    </button>
                `;
            })
            .join("");

        refs.choices.querySelectorAll("[data-choice-index]").forEach((button) => {
            button.addEventListener("click", () => {
                const nextValue = Number(button.dataset.choiceIndex);
                state.answers[state.currentIndex] = nextValue;
                saveState("선택 자동 저장됨");
                render();
                renderOverlayNav();
            });
        });

        refs.prevBtn.disabled = state.currentIndex === 0;
        refs.nextBtn.disabled = state.currentIndex === questions.length - 1;
        refs.nextBtn.textContent = state.currentIndex === questions.length - 1 ? "마지막 문제" : "다음 문제";

        refs.transcriptBtn.textContent = state.transcriptOpen ? "대본 닫기" : "대본 보기";
        refs.transcriptBtn.classList.toggle("is-open", Boolean(state.transcriptOpen));
        refs.transcriptPanel.classList.toggle("hidden", !state.transcriptOpen);

        applyDockPosition();
        renderOverlayNav();
        renderTranscript();
    }

    function renderOverlayNav() {
        refs.overlayNav.innerHTML = questions
            .map((question, index) => {
                const answered = state.answers[index] != null;
                const current = index === state.currentIndex;
                const classes = [
                    "nav-chip",
                    answered ? "is-answered" : "",
                    current ? "is-current" : ""
                ]
                    .filter(Boolean)
                    .join(" ");
                return `<button type="button" class="${classes}" data-nav-index="${index}">${question.number}</button>`;
            })
            .join("");

        refs.overlayNav.querySelectorAll("[data-nav-index]").forEach((button) => {
            button.addEventListener("click", () => {
                moveQuestion(Number(button.dataset.navIndex));
            });
        });
    }

    function renderTranscript() {
        const track = getCurrentTrack();
        const duration = getTrackDuration();

        currentTimeline = buildTimeline(track, duration);

        refs.transcriptTitle.textContent = `${track.title} 대본`;
        refs.transcriptNote.textContent = "대본을 열어 둔 상태에서 음원을 재생하면 현재 읽히는 어절을 하이라이트합니다.";

        refs.transcriptBody.innerHTML = currentTimeline
            .map((segment, segmentIndex) => {
                const tokensHtml = segment.tokens
                    .map((token, tokenIndex) => {
                        return `
                            <button
                                type="button"
                                class="transcript-word"
                                data-segment-index="${segmentIndex}"
                                data-token-index="${tokenIndex}"
                                data-seek="${token.start.toFixed(3)}"
                            >${escapeHtml(token.text)}</button>
                        `;
                    })
                    .join("");

                return `
                    <article class="transcript-segment" data-segment-index="${segmentIndex}">
                        <span class="transcript-speaker">${escapeHtml(segment.speaker)}</span>
                        <div class="transcript-line">${tokensHtml}</div>
                    </article>
                `;
            })
            .join("");

        refs.transcriptBody.querySelectorAll(".transcript-word").forEach((button) => {
            button.addEventListener("click", async () => {
                refs.audio.currentTime = Number(button.dataset.seek || 0);
                button.blur();
                highlightTranscript();
                try {
                    await refs.audio.play();
                } catch (error) {
                    console.error(error);
                }
            });
        });
    }

    function syncTrack(forceReload) {
        const track = getCurrentTrack();

        refs.audioTitle.textContent = track.title;
        refs.audioSub.textContent = `${track.kind} · ${track.shortLabel}`;

        const currentTrackId = refs.audio.dataset.trackId || "";
        if (!forceReload && currentTrackId === track.id) {
            renderTranscript();
            updatePlaybackUI();
            return;
        }

        refs.audio.pause();
        refs.audio.src = track.audioSrc;
        refs.audio.dataset.trackId = track.id;
        refs.audio.load();
        refs.audio.playbackRate = 1;
        activeTokenKey = "";
        activeSegmentKey = "";
        renderTranscript();
        updatePlaybackUI();
    }

    function moveQuestion(nextIndex) {
        const clamped = clamp(nextIndex, 0, questions.length - 1);
        if (clamped === state.currentIndex) return;

        const currentTrackId = getCurrentQuestion().trackId;
        state.currentIndex = clamped;
        saveState("현재 문제 위치 저장됨");

        const nextTrackId = getCurrentQuestion().trackId;
        if (currentTrackId !== nextTrackId) {
            syncTrack(false);
        } else {
            refs.audioTitle.textContent = getCurrentTrack().title;
            refs.audioSub.textContent = `${getCurrentTrack().kind} · ${getCurrentTrack().shortLabel}`;
        }

        render();
        updatePlaybackUI();
        highlightTranscript();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function toggleTranscript() {
        state.transcriptOpen = !state.transcriptOpen;
        saveState(state.transcriptOpen ? "대본 열림" : "대본 닫힘");
        render();
        highlightTranscript();
    }

    function buildTimeline(track, durationSeconds) {
        const segments = track.segments.map((segment) => {
            const tokens = tokenize(segment.text);
            const weight = Math.max(4, tokens.reduce((sum, token) => sum + tokenWeight(token.text), 0));
            return {
                speaker: segment.speaker,
                text: segment.text,
                tokens,
                weight
            };
        });

        const totalGap = Math.max(0, segments.length - 1) * GAP_SECONDS;
        const totalDuration = Math.max(durationSeconds || track.durationSeconds || 1, 1);
        const speakingDuration = Math.max(totalDuration - totalGap, totalDuration * 0.72);
        const totalWeight = segments.reduce((sum, segment) => sum + segment.weight, 0) || 1;

        let cursor = 0;

        return segments.map((segment) => {
            const segmentDuration = (speakingDuration * segment.weight) / totalWeight;
            const tokenWeightTotal = segment.tokens.reduce((sum, token) => sum + tokenWeight(token.text), 0) || 1;
            const tokenBaseStart = cursor;

            let tokenCursor = tokenBaseStart;
            const timedTokens = segment.tokens.map((token, tokenIndex) => {
                const duration = (segmentDuration * tokenWeight(token.text)) / tokenWeightTotal;
                const tokenItem = {
                    text: token.text,
                    start: tokenCursor,
                    end: tokenIndex === segment.tokens.length - 1 ? tokenBaseStart + segmentDuration : tokenCursor + duration
                };
                tokenCursor = tokenItem.end;
                return tokenItem;
            });

            const entry = {
                speaker: segment.speaker,
                text: segment.text,
                start: tokenBaseStart,
                end: tokenBaseStart + segmentDuration,
                tokens: timedTokens
            };

            cursor = entry.end + GAP_SECONDS;
            return entry;
        });
    }

    function highlightTranscript() {
        if (!currentTimeline.length) return;

        const time = refs.audio.currentTime || 0;
        let nextTokenKey = "";
        let nextSegmentKey = "";
        let activeTokenEl = null;
        let activeSegmentEl = null;

        currentTimeline.forEach((segment, segmentIndex) => {
            if (time >= segment.start && time <= segment.end) {
                nextSegmentKey = String(segmentIndex);
                segment.tokens.forEach((token, tokenIndex) => {
                    if (time >= token.start && time <= token.end) {
                        nextTokenKey = `${segmentIndex}:${tokenIndex}`;
                    }
                });
            }
        });

        if (!nextTokenKey && nextSegmentKey) {
            const segment = currentTimeline[Number(nextSegmentKey)];
            if (segment && segment.tokens.length) {
                const lastIndex = segment.tokens.length - 1;
                nextTokenKey = `${nextSegmentKey}:${lastIndex}`;
            }
        }

        if (activeTokenKey === nextTokenKey && activeSegmentKey === nextSegmentKey) return;

        refs.transcriptBody.querySelectorAll(".transcript-word.is-active").forEach((node) => node.classList.remove("is-active"));
        refs.transcriptBody.querySelectorAll(".transcript-segment.is-active").forEach((node) => node.classList.remove("is-active"));

        if (nextTokenKey) {
            const [segmentIndex, tokenIndex] = nextTokenKey.split(":");
            activeTokenEl = refs.transcriptBody.querySelector(
                `.transcript-word[data-segment-index="${segmentIndex}"][data-token-index="${tokenIndex}"]`
            );
        }

        if (nextSegmentKey) {
            activeSegmentEl = refs.transcriptBody.querySelector(
                `.transcript-segment[data-segment-index="${nextSegmentKey}"]`
            );
        }

        if (activeTokenEl) {
            activeTokenEl.classList.add("is-active");
            if (state.transcriptOpen && shouldScrollTranscript(activeTokenEl)) {
                scrollTranscriptToActive(activeTokenEl);
            }
        }

        if (activeSegmentEl) {
            activeSegmentEl.classList.add("is-active");
        }

        activeTokenKey = nextTokenKey;
        activeSegmentKey = nextSegmentKey;
    }

    function shouldScrollTranscript(tokenEl) {
        const panelRect = refs.transcriptBody.getBoundingClientRect();
        const tokenRect = tokenEl.getBoundingClientRect();
        const topBuffer = 44;
        const bottomBuffer = 44;

        return tokenRect.top < panelRect.top + topBuffer || tokenRect.bottom > panelRect.bottom - bottomBuffer;
    }

    function scrollTranscriptToActive(tokenEl) {
        const now = Date.now();
        if (now - lastTranscriptScrollAt < 240) return;
        lastTranscriptScrollAt = now;
        tokenEl.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
    }

    function updatePlaybackUI() {
        const duration = getTrackDuration();
        const currentTime = refs.audio.currentTime || 0;

        refs.playPauseBtn.textContent = refs.audio.paused ? "재생" : "일시정지";
        refs.seekRange.max = String(duration);
        refs.seekRange.value = String(Math.min(currentTime, duration));
        refs.nowTime.textContent = formatTime(currentTime);
        refs.totalTime.textContent = formatTime(duration);
        refs.speedPill.textContent = `${(refs.audio.playbackRate || 1).toFixed(2)}x`;
    }

    function getTrackDuration() {
        const track = getCurrentTrack();
        if (Number.isFinite(refs.audio.duration) && refs.audio.duration > 0) {
            return refs.audio.duration;
        }
        return track.durationSeconds;
    }

    function getCurrentQuestion() {
        return questions[state.currentIndex];
    }

    function getCurrentTrack() {
        return tracksById.get(getCurrentQuestion().trackId);
    }

    function setDockPosition(position) {
        const nextPosition = getValidDockPosition(position);
        if (state.dockPosition === nextPosition) return;
        state.dockPosition = nextPosition;
        applyDockPosition();
        saveState("오디오 위치 저장됨");
    }

    function applyDockPosition() {
        const position = getValidDockPosition(state.dockPosition);
        state.dockPosition = position;
        refs.audioDock.classList.remove("pos-lt", "pos-rt", "pos-lb", "pos-rb");
        refs.audioDock.classList.add(`pos-${position}`);
        refs.dockPosButtons.forEach((button) => {
            button.classList.toggle("is-active", button.dataset.dockPos === position);
        });
    }

    function saveState(message) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error(error);
        }
        flashSaveMessage(message || "자동 저장됨");
    }

    function flashSaveMessage(message) {
        refs.savePill.textContent = message;
        clearTimeout(saveTimer);
        saveTimer = window.setTimeout(() => {
            refs.savePill.textContent = "선택 자동 저장";
        }, 1600);
    }

    function loadState() {
        let parsed = {};
        try {
            parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
        } catch (error) {
            parsed = {};
        }

        const answers = Array.isArray(parsed.answers) ? parsed.answers.slice(0, questions.length) : [];
        while (answers.length < questions.length) answers.push(null);

        return {
            currentIndex: clamp(Number.isInteger(parsed.currentIndex) ? parsed.currentIndex : 0, 0, questions.length - 1),
            answers,
            transcriptOpen: Boolean(parsed.transcriptOpen),
            dockPosition: getValidDockPosition(parsed.dockPosition)
        };
    }

    function getValidDockPosition(value) {
        return ["lt", "rt", "lb", "rb"].includes(value) ? value : "rb";
    }

    function tokenize(text) {
        return text
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .map((token) => ({ text: token }));
    }

    function tokenWeight(text) {
        const clean = text.replace(/[“”"'‘’.,!?()[\]{}]/g, "");
        const base = Math.max(1, Array.from(clean || text).length);
        return base + (/[.!?]$/.test(text) ? 0.4 : 0);
    }

    function formatTime(seconds) {
        const safe = Math.max(0, Number.isFinite(seconds) ? seconds : 0);
        const minutes = Math.floor(safe / 60);
        const remain = Math.floor(safe % 60);
        return `${String(minutes).padStart(2, "0")}:${String(remain).padStart(2, "0")}`;
    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function roundToHundredths(value) {
        return Math.round(value * 100) / 100;
    }

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }
})();
