(function () {
    const exam = window.C14_MOCK_EXAM;

    if (!exam) {
        console.error("C14 mock exam data not found.");
        return;
    }

    const STORAGE_KEY = `${exam.quizId}-answers`;
    const SUMMARY_KEY = `${exam.quizId}-summary`;

    const allQuestions = exam.sections.flatMap((section) =>
        section.questions.map((question) => ({
            ...question,
            sectionTitle: section.title
        }))
    );

    const refs = {};

    document.addEventListener("DOMContentLoaded", () => {
        cacheRefs();
        validateExam(allQuestions);
        renderHeroStats();
        renderSections();
        restoreAnswers();
        updateProgress();
        renderRecentScore();
        wireEvents();
    });

    function cacheRefs() {
        refs.heroStats = document.getElementById("heroStats");
        refs.recentScore = document.getElementById("recentScore");
        refs.progressText = document.getElementById("progressText");
        refs.quizMeta = document.getElementById("quizMeta");
        refs.scoreText = document.getElementById("scoreText");
        refs.progressFill = document.getElementById("progressFill");
        refs.summaryCard = document.getElementById("summaryCard");
        refs.quizSections = document.getElementById("quizSections");
        refs.gradeButtons = Array.from(document.querySelectorAll('[data-action="grade"]'));
        refs.resetButtons = Array.from(document.querySelectorAll('[data-action="reset"]'));
    }

    function wireEvents() {
        refs.quizSections.addEventListener("change", (event) => {
            if (!event.target.classList.contains("option-input")) return;
            saveAnswers();
            clearFeedback();
            refs.summaryCard.hidden = true;
            updateProgress();
        });

        refs.gradeButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const result = gradeExam();
                refs.summaryCard.hidden = false;
                renderSummary(result);
                saveSummary(result);
                renderRecentScore();
                refs.summaryCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
            });
        });

        refs.resetButtons.forEach((button) => {
            button.addEventListener("click", () => {
                if (!window.confirm("선택한 답을 모두 지우고 처음부터 다시 풀까요?")) return;
                document.querySelectorAll(".option-input:checked").forEach((input) => {
                    input.checked = false;
                });
                localStorage.removeItem(STORAGE_KEY);
                clearFeedback();
                refs.summaryCard.hidden = true;
                updateProgress();
            });
        });
    }

    function validateExam(questions) {
        const numberSet = new Set();
        questions.forEach((question) => {
            if (numberSet.has(question.number)) {
                throw new Error(`Duplicate question number: ${question.number}`);
            }
            numberSet.add(question.number);
        });

        const lesson14Total = questions.filter((question) => question.lesson === 14).length;
        const lesson14Vocab = questions.filter((question) => question.lesson === 14 && question.kind === "vocab").length;
        const lesson14Grammar = questions.filter((question) => question.lesson === 14 && question.kind === "grammar").length;

        console.info("14 lesson total:", lesson14Total);
        console.info("14 lesson vocab:", lesson14Vocab);
        console.info("14 lesson grammar:", lesson14Grammar);
    }

    function renderHeroStats() {
        const vocabCount = allQuestions.filter((question) => question.kind === "vocab").length;
        const grammarCount = allQuestions.filter((question) => question.kind === "grammar").length;
        const lesson14Count = allQuestions.filter((question) => question.lesson === 14).length;
        const lesson14Vocab = allQuestions.filter((question) => question.lesson === 14 && question.kind === "vocab").length;
        const lesson14Grammar = allQuestions.filter((question) => question.lesson === 14 && question.kind === "grammar").length;

        refs.heroStats.innerHTML = [
            `${allQuestions.length}문항`,
            `어휘 ${vocabCount} · 문법 ${grammarCount}`,
            `14과 정답 ${lesson14Count}문항`,
            `14과 어휘 ${lesson14Vocab} · 문법 ${lesson14Grammar}`
        ].map((text) => `<span>${escapeHtml(text)}</span>`).join("");

        refs.quizMeta.textContent = `총 ${allQuestions.length}문항`;
    }

    function renderSections() {
        refs.quizSections.innerHTML = exam.sections.map((section) => {
            const questionCards = section.questions.map(renderQuestionCard).join("");

            return `
                <section class="section-card">
                    <div class="section-card__header">
                        <div>
                            <h2>${escapeHtml(section.title)}</h2>
                        </div>
                        <div class="section-card__count">${section.questions.length}문항</div>
                    </div>
                    <div class="section-card__body">
                        ${questionCards}
                    </div>
                </section>
            `;
        }).join("");
    }

    function renderQuestionCard(question) {
        const kindLabel = question.kind === "vocab" ? "어휘" : "문법";

        return `
            <article class="question-card" data-question="${question.number}">
                <div class="question-card__head">
                    <div class="question-card__topline">
                        <span class="question-number">Q${question.number}</span>
                        <span class="question-chip">${kindLabel}</span>
                    </div>
                    <div class="question-stem">${renderStem(question.stem)}</div>
                </div>
                <div class="option-list">
                    ${question.options.map((option) => `
                        <div class="option" data-choice="${option.letter}">
                            <label for="q${question.number}-${option.letter}">
                                <input id="q${question.number}-${option.letter}" class="option-input" type="radio" name="q${question.number}" value="${option.letter}">
                                <span class="option-letter">${option.letter}</span>
                                <span>${escapeHtml(option.text)}</span>
                            </label>
                        </div>
                    `).join("")}
                </div>
                <div class="feedback-panel" hidden></div>
            </article>
        `;
    }

    function restoreAnswers() {
        const saved = readStoredAnswers();
        Object.entries(saved).forEach(([number, letter]) => {
            const input = document.getElementById(`q${number}-${letter}`);
            if (input) input.checked = true;
        });
    }

    function saveAnswers() {
        const answers = {};
        allQuestions.forEach((question) => {
            const checked = document.querySelector(`input[name="q${question.number}"]:checked`);
            if (checked) {
                answers[question.number] = checked.value;
            }
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
        return answers;
    }

    function readStoredAnswers() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};

        try {
            const parsed = JSON.parse(raw);
            return parsed && typeof parsed === "object" ? parsed : {};
        } catch {
            localStorage.removeItem(STORAGE_KEY);
            return {};
        }
    }

    function updateProgress() {
        const answeredCount = document.querySelectorAll(".option-input:checked").length;
        const percent = Math.round((answeredCount / allQuestions.length) * 100);
        refs.progressText.textContent = `${answeredCount} / ${allQuestions.length}`;
        refs.scoreText.textContent = answeredCount === allQuestions.length
            ? "끝까지 풀었습니다. 채점해서 약한 표현을 확인하세요."
            : "문항을 모두 고른 뒤 채점하면 정답과 해설이 열립니다.";
        refs.progressFill.style.width = `${percent}%`;
    }

    function clearFeedback() {
        document.querySelectorAll(".question-card").forEach((card) => {
            card.classList.remove("is-correct", "is-incorrect", "is-unanswered");
            card.querySelectorAll(".option").forEach((option) => {
                option.classList.remove("is-correct-answer", "is-wrong-answer");
            });
            const feedback = card.querySelector(".feedback-panel");
            feedback.hidden = true;
            feedback.className = "feedback-panel";
            feedback.innerHTML = "";
        });
    }

    function gradeExam() {
        clearFeedback();
        const answerMap = saveAnswers();
        const questionResults = [];
        let correctCount = 0;

        allQuestions.forEach((question) => {
            const card = document.querySelector(`.question-card[data-question="${question.number}"]`);
            const feedback = card.querySelector(".feedback-panel");
            const selectedLetter = answerMap[question.number] || null;
            const correctOption = card.querySelector(`.option[data-choice="${question.correct}"]`);
            const selectedOption = selectedLetter
                ? card.querySelector(`.option[data-choice="${selectedLetter}"]`)
                : null;

            if (correctOption) {
                correctOption.classList.add("is-correct-answer");
            }

            if (!selectedLetter) {
                card.classList.add("is-unanswered");
                feedback.hidden = false;
                feedback.className = "feedback-panel is-bad";
                feedback.innerHTML = buildFeedbackHtml({
                    status: "unanswered",
                    question,
                    selectedLetter
                });
                questionResults.push({
                    ...question,
                    selectedLetter,
                    isCorrect: false,
                    status: "unanswered"
                });
                return;
            }

            if (selectedLetter === question.correct) {
                correctCount += 1;
                card.classList.add("is-correct");
                feedback.hidden = false;
                feedback.className = "feedback-panel is-good";
                feedback.innerHTML = buildFeedbackHtml({
                    status: "correct",
                    question,
                    selectedLetter
                });
                questionResults.push({
                    ...question,
                    selectedLetter,
                    isCorrect: true,
                    status: "correct"
                });
                return;
            }

            card.classList.add("is-incorrect");
            if (selectedOption) {
                selectedOption.classList.add("is-wrong-answer");
            }
            feedback.hidden = false;
            feedback.className = "feedback-panel is-bad";
            feedback.innerHTML = buildFeedbackHtml({
                status: "incorrect",
                question,
                selectedLetter
            });
            questionResults.push({
                ...question,
                selectedLetter,
                isCorrect: false,
                status: "incorrect"
            });
        });

        const percent = Math.round((correctCount / allQuestions.length) * 100);
        refs.progressText.textContent = `${correctCount} / ${allQuestions.length}`;
        refs.scoreText.textContent = `정답률 ${percent}% · 틀린 문항을 바로 아래 해설에서 확인할 수 있습니다.`;
        refs.progressFill.style.width = `${percent}%`;

        return {
            correctCount,
            totalCount: allQuestions.length,
            percent,
            questionResults
        };
    }

    function buildFeedbackHtml({ status, question, selectedLetter }) {
        const correctText = findOptionText(question, question.correct);
        const selectedText = selectedLetter ? findOptionText(question, selectedLetter) : "미응답";
        const isGood = status === "correct";
        const pillClass = isGood ? "feedback-pill feedback-pill--good" : "feedback-pill feedback-pill--bad";
        const pillText = status === "correct" ? "정답" : status === "incorrect" ? "오답" : "미응답";
        const title = status === "correct"
            ? "정답 근거가 맞았습니다."
            : status === "incorrect"
                ? "문맥에 맞는 표현을 다시 확인하세요."
                : "빈칸을 남긴 문항입니다.";

        return `
            <span class="${pillClass}">${pillText}</span>
            <div class="feedback-title">${escapeHtml(title)}</div>
            <div class="feedback-answer">정답: <code>${question.correct}</code> ${escapeHtml(correctText)}</div>
            <div class="feedback-answer">내 답: ${selectedLetter ? `<code>${selectedLetter}</code> ${escapeHtml(selectedText)}` : "미응답"}</div>
            <div class="feedback-body">${renderInline(question.explanation)}</div>
        `;
    }

    function renderSummary(result) {
        const band = getBand(result.percent);
        const sectionBreakdown = exam.sections.map((section) => {
            const items = result.questionResults.filter((item) => item.sectionTitle === section.title);
            return {
                title: section.title,
                correct: items.filter((item) => item.isCorrect).length,
                total: items.length
            };
        });

        const lessonBreakdown = ["12", "13", "14"].map((lesson) => {
            const items = result.questionResults.filter((item) => String(item.lesson) === lesson);
            return {
                title: `${lesson}과`,
                correct: items.filter((item) => item.isCorrect).length,
                total: items.length
            };
        });

        const kindBreakdown = ["vocab", "grammar"].map((kind) => {
            const items = result.questionResults.filter((item) => item.kind === kind);
            return {
                title: kind === "vocab" ? "어휘" : "문법",
                correct: items.filter((item) => item.isCorrect).length,
                total: items.length
            };
        });

        const wrongFocuses = result.questionResults
            .filter((item) => !item.isCorrect)
            .reduce((map, item) => {
                const current = map.get(item.focus) || 0;
                map.set(item.focus, current + 1);
                return map;
            }, new Map());

        const reviewItems = Array.from(wrongFocuses.entries())
            .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0], "ko"))
            .slice(0, 5);

        refs.summaryCard.innerHTML = `
            <h2>채점 결과</h2>
            <p>${escapeHtml(band.message)}</p>
            <div class="summary-grid">
                <div class="summary-box">
                    <div class="summary-box__title">총점</div>
                    <div class="summary-box__value">${result.correctCount} / ${result.totalCount}</div>
                </div>
                <div class="summary-box">
                    <div class="summary-box__title">정답률</div>
                    <div class="summary-box__value">${result.percent}%</div>
                </div>
                <div class="summary-box">
                    <div class="summary-box__title">14과 목표 문항</div>
                    <div class="summary-box__value">${lessonBreakdown.find((item) => item.title === "14과").correct} / ${lessonBreakdown.find((item) => item.title === "14과").total}</div>
                </div>
            </div>
            <div class="summary-grid">
                ${sectionBreakdown.map((item) => `
                    <div class="summary-box">
                        <div class="summary-box__title">${escapeHtml(item.title)}</div>
                        <div class="summary-box__value">${item.correct} / ${item.total}</div>
                    </div>
                `).join("")}
            </div>
            <div class="summary-grid">
                ${kindBreakdown.map((item) => `
                    <div class="summary-box">
                        <div class="summary-box__title">${escapeHtml(item.title)} 정답</div>
                        <div class="summary-box__value">${item.correct} / ${item.total}</div>
                    </div>
                `).join("")}
                ${lessonBreakdown.map((item) => `
                    <div class="summary-box">
                        <div class="summary-box__title">${escapeHtml(item.title)} 정답</div>
                        <div class="summary-box__value">${item.correct} / ${item.total}</div>
                    </div>
                `).join("")}
            </div>
            <ol class="summary-list">
                ${reviewItems.length
                    ? reviewItems.map(([focus, count]) => `<li>${escapeHtml(focus)}: ${count}문항 다시 보기</li>`).join("")
                    : "<li>모든 핵심 표현이 안정적으로 맞았습니다.</li>"}
            </ol>
        `;
    }

    function saveSummary(result) {
        const payload = {
            percent: result.percent,
            correctCount: result.correctCount,
            totalCount: result.totalCount,
            gradedAt: new Date().toISOString()
        };
        localStorage.setItem(SUMMARY_KEY, JSON.stringify(payload));
    }

    function renderRecentScore() {
        const raw = localStorage.getItem(SUMMARY_KEY);
        if (!raw) {
            refs.recentScore.hidden = true;
            return;
        }

        try {
            const summary = JSON.parse(raw);
            refs.recentScore.hidden = false;
            refs.recentScore.textContent = `최근 결과 ${summary.correctCount} / ${summary.totalCount} · ${summary.percent}%`;
        } catch {
            localStorage.removeItem(SUMMARY_KEY);
            refs.recentScore.hidden = true;
        }
    }

    function getBand(percent) {
        if (percent >= 90) {
            return { message: "거의 실전 감각으로 풀었습니다. 틀린 표현만 짧게 정리하면 됩니다." };
        }
        if (percent >= 75) {
            return { message: "핵심은 잘 잡혀 있습니다. 틀린 표현의 결합과 문법 뉘앙스를 한 번 더 보면 올라갑니다." };
        }
        if (percent >= 60) {
            return { message: "기본 흐름은 보이지만 14과 중심 표현에서 흔들린 부분이 있습니다. 약한 표현부터 다시 보세요." };
        }
        return { message: "지금은 문항보다 표현 복습이 먼저입니다. 14과 핵심 어휘와 문법 예문부터 다시 읽는 것이 좋습니다." };
    }

    function renderStem(stem) {
        return stem
            .split("\n")
            .map((line) => `<p>${escapeHtml(line)}</p>`)
            .join("");
    }

    function findOptionText(question, letter) {
        return question.options.find((option) => option.letter === letter)?.text || "";
    }

    function renderInline(text) {
        return escapeHtml(text).replace(/`([^`]+)`/g, "<code>$1</code>");
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
