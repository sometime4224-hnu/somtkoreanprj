(() => {
    "use strict";

    const data = window.C12ListenExtraData;
    if (!data) return;

    const STORAGE_KEY = "korean3b.c12.listen-extra.student.v1";
    const questions = data.questions.slice();
    const tracksById = new Map(data.tracks.map((track) => [track.id, track]));
    const BUTTON_LABELS = {
        prev: { ko: "이전 문제", vi: "Trang trước" },
        next: { ko: "다음 문제", vi: "Trang sau" },
        last: { ko: "마지막 문제", vi: "Câu cuối" },
        results: { ko: "결과 보기", vi: "Xem kết quả" }
    };

    const refs = {
        qPill: document.getElementById("student-question-pill"),
        savePill: document.getElementById("student-save-pill"),
        progressFill: document.getElementById("student-progress-fill"),
        prompt: document.getElementById("student-question-prompt"),
        subPrompt: document.getElementById("student-question-subprompt"),
        choices: document.getElementById("student-choice-list"),
        prevBtn: document.getElementById("student-prev-btn"),
        nextBtn: document.getElementById("student-next-btn"),
        resultsBtn: document.getElementById("student-results-btn"),
        questionView: document.getElementById("student-question-view"),
        resultView: document.getElementById("student-result-view"),
        scoreValue: document.getElementById("student-score-value"),
        scorePercent: document.getElementById("student-score-percent"),
        scoreCorrect: document.getElementById("student-score-correct"),
        scoreWrong: document.getElementById("student-score-wrong"),
        resultSummary: document.getElementById("student-result-summary"),
        feedbackList: document.getElementById("student-feedback-list"),
        resultBackBtn: document.getElementById("student-result-back-btn"),
        captureBtn: document.getElementById("student-capture-btn"),
        resetBtn: document.getElementById("student-reset-btn"),
        captureArea: document.getElementById("student-capture-area")
    };

    let state = loadState();
    let saveTimer = null;

    init();

    function init() {
        bind();
        render();
    }

    function bind() {
        refs.prevBtn.addEventListener("click", () => moveQuestion(state.currentIndex - 1));
        refs.nextBtn.addEventListener("click", () => {
            if (state.currentIndex === questions.length - 1 && isComplete()) {
                state.view = "results";
                saveState("자동 채점 결과 보기");
                render();
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
            moveQuestion(state.currentIndex + 1);
        });

        refs.resultsBtn.addEventListener("click", () => {
            state.view = "results";
            saveState("결과 화면 열림");
            render();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        refs.resultBackBtn.addEventListener("click", () => {
            state.view = "questions";
            saveState("문제로 돌아감");
            render();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        refs.captureBtn.addEventListener("click", async () => {
            if (typeof window.html2canvas !== "function") {
                window.alert("스크린샷 저장 기능을 불러오지 못했습니다.");
                return;
            }

            refs.captureBtn.textContent = "저장 중...";
            try {
                const canvas = await window.html2canvas(refs.captureArea, {
                    backgroundColor: "#ffffff",
                    scale: 2,
                    useCORS: true
                });
                const link = document.createElement("a");
                link.href = canvas.toDataURL("image/png");
                link.download = "c12-listen-extra-result.png";
                link.click();
                flashSaveMessage("결과 스크린샷 저장 완료");
            } catch (error) {
                console.error(error);
                window.alert("스크린샷 저장 중 문제가 발생했습니다.");
            } finally {
                refs.captureBtn.textContent = "결과 스크린샷 저장";
            }
        });

        refs.resetBtn.addEventListener("click", () => {
            const ok = window.confirm("저장된 답과 결과를 모두 지우고 처음부터 다시 풀까요?");
            if (!ok) return;

            state = {
                currentIndex: 0,
                answers: Array(questions.length).fill(null),
                view: "questions"
            };
            saveState("초기화 완료");
            render();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    function render() {
        const showResults = state.view === "results" && isComplete();
        document.body.classList.toggle("student-question-active", !showResults);

        if (showResults) {
            renderResults();
        } else {
            renderQuestion();
        }
    }

    function renderQuestion() {
        const question = getCurrentQuestion();
        const track = tracksById.get(question.trackId);
        const answeredCount = state.answers.filter((value) => value != null).length;

        refs.questionView.classList.remove("hidden");
        refs.resultView.classList.add("hidden");

        refs.qPill.textContent = `문제 ${question.number} / ${questions.length}`;
        refs.savePill.textContent = isComplete() ? "모든 문제 완료" : `자동 저장 · ${answeredCount}/${questions.length}`;
        refs.progressFill.style.width = `${((answeredCount / questions.length) * 100).toFixed(2)}%`;
        refs.prompt.textContent = question.prompt;
        refs.subPrompt.textContent = `${question.groupLabel} · ${track.shortLabel}`;
        setBilingualButton(refs.prevBtn, BUTTON_LABELS.prev);
        setBilingualButton(refs.resultsBtn, BUTTON_LABELS.results);

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
                const choiceIndex = Number(button.dataset.choiceIndex);
                state.answers[state.currentIndex] = choiceIndex;
                saveState("선택 자동 저장됨");
                if (isComplete()) {
                    state.view = "results";
                    saveState("자동 채점 완료");
                    render();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    return;
                }
                render();
            });
        });

        refs.prevBtn.disabled = state.currentIndex === 0;
        refs.nextBtn.disabled = state.currentIndex === questions.length - 1 && !isComplete();
        setBilingualButton(
            refs.nextBtn,
            state.currentIndex === questions.length - 1
                ? (isComplete() ? BUTTON_LABELS.results : BUTTON_LABELS.last)
                : BUTTON_LABELS.next
        );

        refs.resultsBtn.classList.toggle("hidden", !isComplete());
    }

    function renderResults() {
        const results = grade();
        const percent = questions.length ? Math.round((results.correctCount / questions.length) * 100) : 0;

        refs.questionView.classList.add("hidden");
        refs.resultView.classList.remove("hidden");

        refs.scoreValue.textContent = `${results.correctCount} / ${questions.length}`;
        refs.scorePercent.textContent = `${percent}%`;
        refs.scoreCorrect.textContent = `${results.correctCount}문항`;
        refs.scoreWrong.textContent = `${results.wrongItems.length}문항`;
        refs.resultSummary.textContent =
            results.wrongItems.length === 0
                ? "모든 문제를 맞혔습니다. 답과 핵심 정보를 안정적으로 기억하고 있습니다."
                : `틀린 문제 ${results.wrongItems.length}개를 다시 확인해 보세요. 선택한 답과 정답, 핵심 피드백을 함께 정리했습니다.`;

        if (results.wrongItems.length === 0) {
            refs.feedbackList.innerHTML = `
                <article class="feedback-item is-correct">
                    <span class="feedback-item__status is-right">정답 완료</span>
                    <strong>모든 문제를 정확하게 풀었습니다.</strong>
                    <p>현재 상태 그대로 다시 한 번 훑어보면 어휘와 문법, 듣기 감각을 더 안정적으로 고정할 수 있습니다.</p>
                </article>
            `;
        } else {
            refs.feedbackList.innerHTML = results.wrongItems
                .map((item) => {
                    return `
                        <article class="feedback-item">
                            <span class="feedback-item__status is-wrong">오답 다시 보기</span>
                            <strong>${item.number}. ${escapeHtml(item.prompt)}</strong>
                            <p>내가 고른 답: ${escapeHtml(item.selectedText || "선택 안 함")}</p>
                            <p>정답: ${escapeHtml(item.answerText)}</p>
                            <p>피드백: ${escapeHtml(item.explanation)}</p>
                        </article>
                    `;
                })
                .join("");
        }
    }

    function grade() {
        const wrongItems = [];
        let correctCount = 0;

        questions.forEach((question, index) => {
            const selected = state.answers[index];
            const selectedText = selected != null ? question.options[selected] : null;
            const answerText = question.options[question.answer];

            if (selected === question.answer) {
                correctCount += 1;
            } else {
                wrongItems.push({
                    number: question.number,
                    prompt: question.prompt,
                    selectedText,
                    answerText,
                    explanation: question.explanation
                });
            }
        });

        return { correctCount, wrongItems };
    }

    function moveQuestion(nextIndex) {
        const clamped = clamp(nextIndex, 0, questions.length - 1);
        if (clamped === state.currentIndex) return;
        state.currentIndex = clamped;
        state.view = "questions";
        saveState("현재 문제 위치 저장됨");
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function getCurrentQuestion() {
        return questions[state.currentIndex];
    }

    function countAnswered() {
        return state.answers.filter((value) => value != null).length;
    }

    function isComplete() {
        return countAnswered() === questions.length;
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
            const answeredCount = countAnswered();
            refs.savePill.textContent = isComplete()
                ? "모든 문제 완료"
                : `자동 저장 · ${answeredCount}/${questions.length}`;
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
            view: parsed.view === "results" ? "results" : "questions"
        };
    }

    function setBilingualButton(button, labels) {
        button.innerHTML = `
            <span class="pager-ko">${escapeHtml(labels.ko)}</span>
            <span class="pager-vi">${escapeHtml(labels.vi)}</span>
        `;
    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
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
