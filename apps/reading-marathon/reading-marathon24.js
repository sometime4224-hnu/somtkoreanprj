(function () {
    function isReadingMarathonMode() {
        return document.body?.dataset.feedbackMode === "reading-marathon";
    }

    if (!isReadingMarathonMode()) return;

    const baseRenderQuiz = window.renderQuiz;
    const baseWireQuizInteractions = window.wireQuizInteractions;
    const baseGradeQuiz = window.gradeQuiz;
    const baseBuildFeedbackHtml = window.buildFeedbackHtml;
    const baseShowGradeSummaryModal = window.showGradeSummaryModal;

    const REVIEW_HINTS = [
        {
            pattern: /바꿔쓰기|뜻이 가장 가까운|바꿔 쓸 수|가장 가까운/,
            label: "바꿔쓰기",
            tip: "문장 속 뜻을 먼저 잡고, 보기에서는 같은 상황을 더 자연스럽게 바꾼 말을 찾으세요."
        },
        {
            pattern: /글의 목적|쓴 이유|목적/,
            label: "글의 목적",
            tip: "세부 정보보다 글 전체가 무엇을 알려 주려는지 한 문장으로 먼저 묶어 보세요."
        },
        {
            pattern: /내용 일치|내용과 같은|내용으로 보아|설명으로 맞는|맞는 것은/,
            label: "내용 일치",
            tip: "지문에 실제로 나온 정보만 고르세요. 상식으로 맞아 보여도 지문에 없으면 빼는 편이 안전합니다."
        },
        {
            pattern: /이유/,
            label: "이유 찾기",
            tip: "결과와 원인을 섞지 말고, 왜 그런지에 해당하는 문장을 다시 확인하세요."
        },
        {
            pattern: /빈칸|들어갈 알맞은|들어갈 말/,
            label: "빈칸 추론",
            tip: "빈칸 앞뒤 문장을 이어 읽고, 같은 단락에서 반복된 핵심 표현이 있는지 먼저 보세요."
        },
        {
            pattern: /어떻게|방법/,
            label: "방법 찾기",
            tip: "행동이나 해결책을 묻는 문제는 마지막 단락의 권장 행동을 다시 확인하면 빨리 정리됩니다."
        },
        {
            pattern: /좋게 본 이유|마음씨|인상|평가|원만하다|성실하다/,
            label: "인물 평가",
            tip: "평가 문제는 행동 근거가 먼저 나오고, 그다음에 성격 표현이 따라옵니다."
        },
        {
            pattern: /처음 만났|어떤 만남|사귀게|흐름|마지막 문장/,
            label: "흐름 파악",
            tip: "이야기 읽기는 만남, 판단, 변화, 결과 순서로 정리하면 흔들림이 줄어듭니다."
        },
        {
            pattern: /조건|익숙해지도록|승진 기회|회사|면접|직장/,
            label: "직장 정보",
            tip: "직장 읽기는 조건, 평가, 준비 목적을 따로 나눠 보면 오답이 줄어듭니다."
        },
        {
            pattern: /운동|스트레칭|자세|건강|거북목/,
            label: "건강 정보",
            tip: "건강 지문은 원인과 예방법이 분리되어 나오는 경우가 많으니 둘을 섞지 마세요."
        }
    ];

    window.renderQuiz = function renderReadingMarathonQuiz(quiz) {
        window.__readingMarathonQuiz = quiz;
        baseRenderQuiz(quiz);
        syncQuestionMetadata();
        primeCoachSummary();
    };

    window.wireQuizInteractions = function wireReadingMarathonQuizInteractions(quiz) {
        baseWireQuizInteractions(quiz);

        const root = document.getElementById("quizSections");
        if (root) {
            root.addEventListener("change", () => {
                hideCoachSummary();
            }, true);
        }

        document.querySelectorAll('[data-action="reset"]').forEach((button) => {
            button.addEventListener("click", () => {
                window.setTimeout(() => {
                    hideCoachSummary();
                }, 0);
            });
        });
    };

    window.buildFeedbackHtml = function buildReadingMarathonFeedbackHtml(args) {
        if (!isReadingMarathonMode()) return baseBuildFeedbackHtml(args);

        const hint = pickReviewHint(args.stemText || "", args.explanation, args.correctText, args.sectionTitle || "");
        const signal = args.status === "correct"
            ? "정답"
            : args.status === "incorrect"
                ? "보완"
                : "미응답";
        const heading = args.status === "correct"
            ? "정답입니다."
            : args.status === "incorrect"
                ? "오답입니다."
                : "아직 답을 고르지 않았습니다.";
        const guide = args.status === "correct"
            ? "맞힌 문제도 근거 문장을 한 번 더 보면 같은 유형을 더 안정적으로 풀 수 있습니다."
            : args.status === "incorrect"
                ? "틀린 보기와 정답 보기를 지문 근거와 함께 다시 비교하면 정리가 빨라집니다."
                : "정답 보기만 보지 말고, 왜 그 보기가 맞는지 지문 근거까지 같이 확인해 보세요.";
        const answerText = args.status === "unanswered"
            ? "아직 고르지 않았습니다."
            : `<code>${window.escapeHtml(args.selectedLetter)}</code> ${window.renderInline(args.selectedText)}`;
        const compareText = args.status === "correct"
            ? `다음에도 비슷한 문제가 나오면 먼저 지문에서 근거 문장을 찾고, 마지막에 보기 ${args.correctLetter}와 연결해 보세요.`
            : args.status === "incorrect"
                ? `선택한 보기와 정답 보기의 차이를 만드는 단어를 다시 찾으세요. 이번 문항에서는 \`${args.correctText}\` 쪽이 지문과 정확히 맞습니다.`
                : `지문을 다시 읽으면서 정답 \`${args.correctText}\`가 어떤 문장을 근거로 하는지 먼저 짚어 보세요.`;

        return `
            <div class="feedback-signal feedback-signal--${args.status}">${signal}</div>
            <div class="feedback-heading">${heading}</div>
            <p class="feedback-guide">${guide}</p>
            <div class="feedback-row">
                <span class="feedback-label">정답</span>
                <span class="feedback-value"><code>${window.escapeHtml(args.correctLetter)}</code> ${window.renderInline(args.correctText)}</span>
            </div>
            <div class="feedback-row">
                <span class="feedback-label">내 답</span>
                <span class="feedback-value">${answerText}</span>
            </div>
            <div class="feedback-callout">
                <div class="feedback-callout__label">읽기 포인트</div>
                <div class="feedback-callout__value">${window.escapeHtml(hint.label)}</div>
            </div>
            <div class="feedback-row feedback-row--stack">
                <span class="feedback-label">근거</span>
                <span class="feedback-value">${window.renderInline(args.explanation)}</span>
            </div>
            <details class="feedback-more">
                <summary>${args.status === "correct" ? "같은 유형 더 보기" : "다시 볼 기준 보기"}</summary>
                <div class="feedback-more__body">
                    <p class="feedback-more__text">${window.renderInline(compareText)}</p>
                    <p class="feedback-more__text">${window.renderInline(hint.tip)}</p>
                </div>
            </details>
        `;
    };

    window.gradeQuiz = function gradeReadingMarathonQuiz(answerMap) {
        const result = baseGradeQuiz(answerMap);
        if (!isReadingMarathonMode()) return result;

        const enriched = enrichResult(result);
        renderCoachSummary(enriched);
        return enriched;
    };

    window.showGradeSummaryModal = function showReadingMarathonGradeSummary(result) {
        baseShowGradeSummaryModal(result);
        if (!isReadingMarathonMode()) return;
        decorateSummaryModal(result);
    };

    function syncQuestionMetadata() {
        document.querySelectorAll(".section-card").forEach((sectionCard) => {
            const sectionTitle = sectionCard.querySelector(".section-card__header h2")?.textContent.trim() || "";
            sectionCard.querySelectorAll(".question-card").forEach((card) => {
                card.dataset.sectionTitle = sectionTitle;
                card.dataset.stemText = card.querySelector(".question-stem")?.textContent.trim() || "";
            });
        });
    }

    function primeCoachSummary() {
        const panel = document.getElementById("coachSummary");
        const body = panel?.querySelector(".coach-card__body");
        if (!panel || !body) return;

        panel.classList.remove("is-ready");
        panel.hidden = true;
        body.innerHTML = "";
    }

    function hideCoachSummary() {
        primeCoachSummary();
    }

    function enrichResult(result) {
        const answerMap = window.__readingMarathonQuiz?.answers;
        const questionResults = result.questionResults.map((item) => {
            const card = document.querySelector(`.question-card[data-question="${item.number}"]`);
            const answer = answerMap?.get(item.number);
            const selectedLetter = card?.querySelector(".option-input:checked")?.value || "";
            const correctLetter = answer?.correct || "";
            const correctText = card && correctLetter ? window.getOptionText(card, correctLetter) : correctLetter;
            const selectedText = card && selectedLetter ? window.getOptionText(card, selectedLetter) : "";
            const sectionTitle = card?.dataset.sectionTitle || "";
            const stemText = card?.dataset.stemText || "";
            const hint = pickReviewHint(stemText, answer?.explanation || "", correctText, sectionTitle);

            return {
                ...item,
                sectionTitle,
                stemText,
                tag: hint.label,
                tip: hint.tip,
                correctLetter,
                correctText,
                selectedLetter,
                selectedText,
                explanation: answer?.explanation || ""
            };
        });

        return {
            ...result,
            questionResults,
            band: getPerformanceBand(result.percent),
            sectionBreakdown: buildSectionBreakdown(questionResults),
            weakTags: buildWeakTags(questionResults)
        };
    }

    function renderCoachSummary(result) {
        const panel = document.getElementById("coachSummary");
        const body = panel?.querySelector(".coach-card__body");
        if (!panel || !body) return;

        const reviewItems = buildReviewItems(result);
        const weakTags = result.weakTags.length
            ? result.weakTags
            : [{ label: "약한 포인트 없음", count: 0 }];

        body.innerHTML = `
            <div class="coach-band">
                <div class="coach-band__label">${window.escapeHtml(result.band.label)}</div>
                <div class="coach-band__score">${result.correctCount} / ${result.totalCount}문항 · ${result.percent}%</div>
                <div class="coach-band__guide">${window.escapeHtml(result.band.guide)}</div>
            </div>
            <div class="coach-block">
                <div class="coach-block__title">섹션별 결과</div>
                <div class="coach-chip-grid">
                    ${result.sectionBreakdown.map((section) => `
                        <div class="coach-chip">
                            <div class="coach-chip__title">${window.escapeHtml(section.title)}</div>
                            <div class="coach-chip__value">${section.correct} / ${section.total}</div>
                        </div>
                    `).join("")}
                </div>
            </div>
            <div class="coach-block">
                <div class="coach-block__title">약한 읽기 포인트</div>
                <div class="coach-chip-grid">
                    ${weakTags.map((tag) => `
                        <div class="coach-chip">
                            <div class="coach-chip__title">${window.escapeHtml(tag.label)}</div>
                            <div class="coach-chip__value">${tag.count === 0 ? "안정적" : `${tag.count}문항`}</div>
                        </div>
                    `).join("")}
                </div>
            </div>
            <div class="coach-block">
                <div class="coach-block__title">다시 볼 순서</div>
                <ol class="coach-review-list">
                    ${reviewItems.map((item) => `<li>${window.escapeHtml(item)}</li>`).join("")}
                </ol>
            </div>
        `;

        panel.classList.add("is-ready");
        panel.hidden = false;
    }

    function decorateSummaryModal(result) {
        const modal = document.getElementById("gradeSummaryModal");
        if (!modal) return;

        const title = modal.querySelector("#summaryModalTitle");
        const guide = modal.querySelector("#summaryModalGuide");
        const body = modal.querySelector(".summary-modal__body");

        if (title) {
            title.textContent = "읽기 24문제 마라톤 결과";
        }

        if (guide) {
            guide.textContent = result.band.guide;
        }

        if (!body) return;

        let coach = modal.querySelector("#summaryModalCoach");
        if (!coach) {
            coach = document.createElement("div");
            coach.id = "summaryModalCoach";
            coach.className = "summary-coach";
            body.appendChild(coach);
        }

        const weakTags = result.weakTags.length
            ? result.weakTags
            : [{ label: "약한 포인트 없음", count: 0 }];

        coach.innerHTML = `
            <div>
                <div class="summary-coach__title">섹션별 결과</div>
                <div class="summary-breakdown">
                    ${result.sectionBreakdown.map((section) => `
                        <div class="summary-breakdown__item">
                            <strong>${window.escapeHtml(section.title)}</strong>
                            <span>${section.correct} / ${section.total}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
            <div>
                <div class="summary-coach__title">약한 읽기 포인트</div>
                <div class="summary-tag-grid">
                    ${weakTags.map((tag) => `
                        <div class="summary-tag">
                            <strong>${window.escapeHtml(tag.label)}</strong>
                            <span>${tag.count === 0 ? "안정적" : `${tag.count}문항`}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
            <div>
                <div class="summary-coach__title">우선 복습</div>
                <ol class="summary-review-list">
                    ${buildReviewItems(result).map((item) => `<li>${window.escapeHtml(item)}</li>`).join("")}
                </ol>
            </div>
        `;
    }

    function buildSectionBreakdown(questionResults) {
        const sectionMap = new Map();

        questionResults.forEach((item) => {
            const title = item.sectionTitle || "기타";
            const current = sectionMap.get(title) || { title, correct: 0, total: 0 };
            current.total += 1;
            if (item.isCorrect) current.correct += 1;
            sectionMap.set(title, current);
        });

        return [...sectionMap.values()];
    }

    function buildWeakTags(questionResults) {
        const tagMap = new Map();

        questionResults
            .filter((item) => !item.isCorrect)
            .forEach((item) => {
                const current = tagMap.get(item.tag) || { label: item.tag, count: 0 };
                current.count += 1;
                tagMap.set(item.tag, current);
            });

        return [...tagMap.values()]
            .sort((left, right) => right.count - left.count)
            .slice(0, 3);
    }

    function buildReviewItems(result) {
        const wrongQuestions = result.questionResults.filter((item) => !item.isCorrect);
        if (!wrongQuestions.length) {
            return [
                "모든 문항이 안정적입니다. 가장 길었던 지문 한 개만 다시 읽고 오늘은 마무리해도 됩니다.",
                "바꿔쓰기 문제와 글의 목적 문제에서 근거 문장을 한 번 더 확인하면 실전 유지에 도움이 됩니다."
            ];
        }

        const weakestSection = result.sectionBreakdown
            .slice()
            .sort((left, right) => (left.correct / left.total) - (right.correct / right.total))[0];

        const byTag = new Map();
        wrongQuestions.forEach((item) => {
            const current = byTag.get(item.tag) || [];
            current.push(item.number);
            byTag.set(item.tag, current);
        });

        const tagLines = [...byTag.entries()]
            .sort((left, right) => right[1].length - left[1].length)
            .slice(0, 2)
            .map(([tag, numbers]) => `${tag}부터 다시 보세요. Q${numbers.join(", Q")}에서 흔들렸습니다.`);

        const firstWrong = wrongQuestions[0];
        const firstLine = firstWrong
            ? `Q${firstWrong.number}이 첫 흔들림입니다. 이 지문부터 다시 읽으면 뒤 문제도 함께 정리되기 쉽습니다.`
            : "틀린 문항부터 다시 보면 됩니다.";

        const sectionLine = weakestSection
            ? `${weakestSection.title}가 가장 약했습니다. 이 섹션을 먼저 다시 푼 뒤 다른 문제로 넘어가세요.`
            : "틀린 문항부터 다시 보면 됩니다.";

        return [sectionLine, ...tagLines, firstLine].slice(0, 3);
    }

    function getPerformanceBand(percent) {
        if (percent >= 90) {
            return {
                label: "안정권",
                guide: "지문 흐름 파악이 안정적입니다. 틀린 문제의 근거만 짧게 정리하면 충분합니다."
            };
        }

        if (percent >= 75) {
            return {
                label: "실전권",
                guide: "전체 흐름은 좋습니다. 목적, 내용 일치, 바꿔쓰기처럼 자주 틀린 포인트만 다시 보면 효율이 높습니다."
            };
        }

        if (percent >= 60) {
            return {
                label: "보완 필요",
                guide: "핵심 지문은 익숙하지만 근거를 잡는 과정이 조금 흔들립니다. 약한 섹션부터 짧게 재풀이하세요."
            };
        }

        return {
            label: "재정리 필요",
            guide: "지금은 확장 지문보다 원본 핵심 읽기와 원본 변형 읽기를 먼저 고정하는 쪽이 더 효과적입니다."
        };
    }

    function pickReviewHint(stemText, explanation, correctText, sectionTitle) {
        const source = `${stemText} ${explanation} ${correctText} ${sectionTitle}`;
        return REVIEW_HINTS.find((item) => item.pattern.test(source)) || {
            label: "핵심 근거",
            tip: "정답 표현을 보기에서만 찾지 말고, 지문 속 근거 문장과 먼저 연결해 보세요."
        };
    }
})();
