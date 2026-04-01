const root = document.querySelector("#app");
const { classroomTeams = [], grammarDetectiveStages = [] } = window;

const chapterAccent = {
    c10: "#9a3412",
    c11: "#7c3aed",
    c12: "#b45309",
    c13: "#0f766e"
};

const state = {
    stageIndex: 0,
    assetMode: initialAssetMode(),
    promptIndexByStage: Object.fromEntries(
        grammarDetectiveStages
            .filter((stage) => stage.kind === "match")
            .map((stage) => [stage.id, 0])
    ),
    clueRevealCountByStage: Object.fromEntries(
        grammarDetectiveStages
            .filter((stage) => stage.kind === "case")
            .map((stage) => [stage.id, 1])
    ),
    questionStates: {}
};

function render() {
    const stage = getCurrentStage();
    const accent = chapterAccent[stage.chapter] || "#0f766e";
    const questionState = getQuestionState(getQuestionKey(stage));
    const selectedCharacter = getCharacterById(stage, questionState.selectedCandidateId);

    root.innerHTML = `
        <div class="app-shell" style="--accent: ${accent}; --accent-soft: ${toSoftColor(accent)};">
            <header class="topbar">
                <div class="brand">
                    <p class="brand__eyebrow">Classroom Grammar Board</p>
                    <h1 class="brand__title">문법 탐정 보드</h1>
                    <p class="brand__meta">교실 TV 화면에서 함께 읽고, 팀별로 투표하고, 마지막에 근거로 답을 고르는 수업용 프레임워크입니다.</p>
                </div>
                <div class="topbar__cluster">
                    <a class="topbar-link" href="../index.html">앱 허브</a>
                    <span class="pill">${escapeHtml(stage.label)} 단계</span>
                    <span class="pill">${escapeHtml(stage.chapter.toUpperCase())}</span>
                    <span class="pill">${escapeHtml(stage.kind === "case" ? "추리" : "이름 매칭")}</span>
                    <div class="topbar-actions">
                        <button class="mode-chip mode-chip--button ${state.assetMode ? "mode-chip--active" : ""}" data-action="toggle-asset-mode">
                            ${state.assetMode ? "에셋 모드 ON" : "에셋 모드 OFF"}
                        </button>
                    </div>
                </div>
            </header>

            <div class="board-layout">
                <div class="scene-column">
                    ${renderScene(stage)}
                    ${state.assetMode ? renderAssetBoard(stage) : ""}
                </div>
                <div class="side-column">
                    ${renderTeacherBoard(stage)}
                    ${renderTaskBoard(stage)}
                    ${renderVoteBoard(stage, questionState)}
                    ${renderDecisionBoard(stage, questionState, selectedCharacter)}
                    ${renderNotebookBoard(stage)}
                </div>
            </div>
        </div>
    `;
}

function renderScene(stage) {
    return `
        <section class="card scene-card">
            <div class="stage-line">
                <span class="pill">${escapeHtml(stage.label)}</span>
                <span class="pill">${escapeHtml(stage.objective)}</span>
            </div>
            <h2 class="scene-title">${escapeHtml(stage.title)}</h2>
            <p class="scene-subtitle">${escapeHtml(stage.subtitle)}</p>
            <div class="focus-chips">
                ${stage.grammarFocus.map((item) => `<span class="focus-chip">${escapeHtml(item)}</span>`).join("")}
            </div>
            <div class="scene-canvas">
                <div class="scene-background">
                    <div class="scene-background__caption">
                        <span class="scene-background__label">Background</span>
                        <strong>${escapeHtml(stage.background.label)}</strong>
                        <p>${escapeHtml(stage.background.description)}</p>
                        ${state.assetMode ? `<code class="scene-background-slot">${escapeHtml(getBackgroundSlotId(stage))}</code>` : ""}
                    </div>
                    ${stage.props.map((prop) => renderProp(stage, prop)).join("")}
                    ${stage.cast.map((character) => renderCharacter(stage, character)).join("")}
                    <div class="scene-gridline" aria-hidden="true"></div>
                </div>
            </div>
        </section>
    `;
}

function renderProp(stage, prop) {
    return `
        <article class="scene-entity scene-entity--prop" style="left: ${prop.x}%; top: ${prop.y}%;">
            <div class="scene-entity__visual">${escapeHtml(prop.label)}</div>
            <strong>${escapeHtml(prop.label)}</strong>
            <span>${escapeHtml(prop.description)}</span>
            ${state.assetMode ? `<code class="scene-entity__slot">${escapeHtml(getPropSlotId(stage, prop))}</code>` : ""}
        </article>
    `;
}

function renderCharacter(stage, character) {
    return `
        <article class="scene-entity" style="left: ${character.x}%; top: ${character.y}%;">
            <div class="scene-entity__visual">${escapeHtml(character.name)}</div>
            <strong>${escapeHtml(character.name)}</strong>
            <span>${escapeHtml(character.location)}</span>
            <small>${escapeHtml(character.action)}</small>
            ${state.assetMode ? `<code class="scene-entity__slot">${escapeHtml(getCastSlotId(stage, character))}</code>` : ""}
        </article>
    `;
}

function renderTeacherBoard(stage) {
    const currentQuestionLabel = stage.kind === "match"
        ? `질문 ${getPromptIndex(stage) + 1} / ${stage.prompts.length}`
        : `단서 ${getClueRevealCount(stage)} / ${stage.clues.length} 공개`;

    return `
        <section class="card">
            <div class="card__head">
                <div>
                    <h2 class="card__title">교사 진행판</h2>
                    <p class="card__note">${escapeHtml(currentQuestionLabel)}</p>
                </div>
                <span class="question-badge">${escapeHtml(stage.kind === "case" ? "Case" : "Prompt")}</span>
            </div>
            <div class="teacher-controls">
                <div class="button-row">
                    <button class="action-button" data-action="prev-stage" ${state.stageIndex === 0 ? "disabled" : ""}>이전 단계</button>
                    <button class="action-button" data-action="next-stage" ${state.stageIndex === grammarDetectiveStages.length - 1 ? "disabled" : ""}>다음 단계</button>
                </div>
                <div class="button-row">
                    <button class="ghost-button" data-action="prev-question" ${isPrevQuestionDisabled(stage) ? "disabled" : ""}>이전 질문</button>
                    <button class="ghost-button" data-action="next-question" ${isNextQuestionDisabled(stage) ? "disabled" : ""}>다음 질문</button>
                    <button class="ghost-button" data-action="reset-current">현재 질문 초기화</button>
                </div>
                <div class="teacher-tip">
                    <strong>교사 팁</strong>
                    <p>${escapeHtml(stage.teacherTip)}</p>
                </div>
                <p class="key-hint">키보드: ← / → 질문 이동, PageUp / PageDown 단계 이동, A 에셋 모드</p>
            </div>
        </section>
    `;
}

function renderTaskBoard(stage) {
    if (stage.kind === "match") {
        const prompt = stage.prompts[getPromptIndex(stage)];
        return `
            <section class="card">
                <div class="card__head">
                    <div>
                        <h2 class="card__title">현재 질문</h2>
                        <p class="card__note">NPC 대화를 읽고 맞는 인물을 고릅니다.</p>
                    </div>
                    <span class="tiny-pill">${escapeHtml(prompt.focus)}</span>
                </div>
                <div class="prompt-card">
                    <strong>${escapeHtml(prompt.speaker)}</strong>
                    <p>${escapeHtml(prompt.text)}</p>
                </div>
                <div class="teacher-tip">
                    <strong>읽기 포인트</strong>
                    <p>${escapeHtml(prompt.note)}</p>
                </div>
            </section>
        `;
    }

    return `
        <section class="card">
            <div class="card__head">
                <div>
                    <h2 class="card__title">사건 보드</h2>
                    <p class="card__note">단서를 하나씩 공개하며 범인을 좁혀 갑니다.</p>
                </div>
                <span class="question-badge">Evidence</span>
            </div>
            <div class="incident-box">
                <strong>${escapeHtml(stage.incident.title)}</strong>
                <p>${escapeHtml(stage.incident.summary)}</p>
            </div>
            <div class="clue-list">
                ${stage.clues.slice(0, getClueRevealCount(stage)).map((clue, index) => `
                    <article class="clue-card">
                        <div class="clue-card__meta">
                            <span class="tiny-pill">단서 ${index + 1}</span>
                            <span class="tiny-pill">${escapeHtml(clue.focus)}</span>
                            <span class="tiny-pill">${escapeHtml(clue.speaker)}</span>
                        </div>
                        <strong>${escapeHtml(clue.text)}</strong>
                        <p>${escapeHtml(clue.note)}</p>
                    </article>
                `).join("")}
            </div>
        </section>
    `;
}

function renderVoteBoard(stage, questionState) {
    const ranking = getVoteRanking(stage, questionState.teamVotes);
    const leader = getVoteLeader(ranking);
    const votedTeams = Object.values(questionState.teamVotes).filter(Boolean).length;
    const leaderText = leader
        ? `현재 최다표 ${leader.name} ${leader.count}표`
        : ranking[0] && ranking[0].count > 0
            ? `현재 동률 ${ranking[0].count}표`
            : "아직 팀 투표가 없습니다.";

    return `
        <section class="card">
            <div class="card__head">
                <div>
                    <h2 class="card__title">팀 투표판</h2>
                    <p class="card__note">팀별 의견을 모은 뒤 교사가 최종 선택을 정합니다.</p>
                </div>
                <span class="question-badge">Vote</span>
            </div>
            <div class="vote-status">
                <strong>팀 투표 ${votedTeams} / ${classroomTeams.length}팀</strong>
                <p>${escapeHtml(leaderText)}</p>
            </div>
            <div class="count-grid">
                ${ranking.map((entry) => `
                    <div class="count-card">
                        <strong>${entry.count}</strong>
                        <span>${escapeHtml(entry.name)}</span>
                    </div>
                `).join("")}
            </div>
            <div class="team-list">
                ${classroomTeams.map((team) => `
                    <article class="team-row">
                        <strong>${escapeHtml(team.label)}</strong>
                        <div class="team-row__buttons">
                            ${stage.candidateIds.map((candidateId) => {
                                const candidate = getCharacterById(stage, candidateId);
                                const isSelected = questionState.teamVotes[team.id] === candidateId;
                                return `
                                    <button
                                        class="team-vote-button ${isSelected ? "team-vote-button--selected" : ""}"
                                        data-action="team-vote"
                                        data-team-id="${escapeHtml(team.id)}"
                                        data-candidate-id="${escapeHtml(candidateId)}"
                                    >
                                        ${escapeHtml(candidate?.name || candidateId)}
                                    </button>
                                `;
                            }).join("")}
                        </div>
                    </article>
                `).join("")}
            </div>
            <div class="vote-controls">
                <button class="ghost-button" data-action="choose-leading" ${leader ? "" : "disabled"}>최다표를 최종 선택으로</button>
                <button class="ghost-button" data-action="clear-team-votes">팀 투표 초기화</button>
            </div>
        </section>
    `;
}

function renderDecisionBoard(stage, questionState, selectedCharacter) {
    const answerHtml = stage.kind === "match"
        ? renderMatchAnswer(stage, questionState)
        : renderCaseAnswer(stage, questionState);

    return `
        <section class="card">
            <div class="card__head">
                <div>
                    <h2 class="card__title">선택 보드</h2>
                    <p class="card__note">${escapeHtml(stage.kind === "case" ? "범인을 고르기 전에 팀 투표와 단서를 함께 확인합니다." : "현재 질문에 맞는 인물을 고릅니다.")}</p>
                </div>
                <span class="question-badge">${escapeHtml(stage.kind === "case" ? "Detect" : "Match")}</span>
            </div>
            <div class="candidate-grid">
                ${stage.candidateIds.map((candidateId) => {
                    const candidate = getCharacterById(stage, candidateId);
                    const isSelected = questionState.selectedCandidateId === candidateId;
                    return `
                        <button
                            class="candidate-button ${isSelected ? "candidate-button--selected" : ""}"
                            data-action="select-candidate"
                            data-candidate-id="${escapeHtml(candidateId)}"
                        >
                            <strong>${escapeHtml(candidate?.name || candidateId)}</strong>
                            <span>${escapeHtml(candidate?.appearance || "")}</span>
                        </button>
                    `;
                }).join("")}
            </div>
            <div class="decision-summary">
                <div class="teacher-pick ${selectedCharacter ? "" : "teacher-pick--empty"}">
                    ${selectedCharacter ? `교사 선택: ${escapeHtml(selectedCharacter.name)}` : "아직 교사 선택이 없습니다."}
                </div>
                <div class="button-row">
                    <button class="action-button" data-action="toggle-answer">${questionState.answerVisible ? "정답 숨기기" : "정답 공개"}</button>
                    <button class="ghost-button" data-action="clear-selection">교사 선택 초기화</button>
                </div>
                ${answerHtml}
            </div>
        </section>
    `;
}

function renderMatchAnswer(stage, questionState) {
    if (!questionState.answerVisible) {
        return `
            <div class="answer-box">
                <strong>정답 대기 중</strong>
                <p>교사가 선택을 확정한 뒤 정답을 공개하면 설명 메모가 여기 보입니다.</p>
            </div>
        `;
    }

    const prompt = stage.prompts[getPromptIndex(stage)];
    const correctCharacter = getCharacterById(stage, prompt.answerCharacterId);
    const isCorrect = questionState.selectedCandidateId === prompt.answerCharacterId;

    return `
        <div class="answer-box">
            <strong>${isCorrect ? "정답입니다." : "정답을 확인하세요."}</strong>
            <p>정답은 ${escapeHtml(correctCharacter?.name || "")}입니다. ${escapeHtml(prompt.note)}</p>
        </div>
    `;
}

function renderCaseAnswer(stage, questionState) {
    if (!questionState.answerVisible) {
        return `
            <div class="answer-box">
                <strong>정답 대기 중</strong>
                <p>단서를 충분히 공개한 뒤 범인을 공개하세요.</p>
            </div>
        `;
    }

    const culprit = getCharacterById(stage, stage.answer.characterId);
    const isCorrect = questionState.selectedCandidateId === stage.answer.characterId;

    return `
        <div class="answer-box">
            <strong>${isCorrect ? "범인을 맞혔습니다." : "범인을 다시 확인하세요."}</strong>
            <p>범인은 ${escapeHtml(culprit?.name || "")}입니다.</p>
            <ul>
                ${stage.answer.reason.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}
            </ul>
        </div>
    `;
}

function renderNotebookBoard(stage) {
    return `
        <section class="card">
            <div class="card__head">
                <div>
                    <h2 class="card__title">${escapeHtml(stage.kind === "case" ? "인물 메모" : "등장인물 메모")}</h2>
                    <p class="card__note">이름과 대표 단서를 먼저 익혀 두면 다음 단계 추리가 쉬워집니다.</p>
                </div>
                <span class="question-badge">Notes</span>
            </div>
            <div class="note-grid">
                ${stage.cast.map((character) => `
                    <article class="note-card">
                        <strong>${escapeHtml(character.name)}</strong>
                        <p>${escapeHtml(character.appearance)}</p>
                        <p>${escapeHtml(character.location)}</p>
                        <p>${escapeHtml(character.action)}</p>
                    </article>
                `).join("")}
            </div>
        </section>
    `;
}

function renderAssetBoard(stage) {
    const assets = buildAssetRows(stage);
    return `
        <section class="card asset-board">
            <div class="card__head">
                <div>
                    <h2 class="card__title">Gemini 에셋 슬롯</h2>
                    <p class="card__note">현재 장면에 필요한 배경, 소품, 인물 슬롯과 저장 경로를 바로 확인할 수 있습니다.</p>
                </div>
                <span class="question-badge">Asset</span>
            </div>
            <div class="asset-board__notice">
                <strong>저장 규칙</strong>
                <p>생성 이미지는 각 장면의 chapter에 맞춰 <code>assets/cXX/grammar/images/grammar-detective/</code> 아래 저장합니다.</p>
                <code>${escapeHtml(getBackgroundOutputPath(stage))}</code>
            </div>
            <div class="asset-list">
                ${assets.map((entry) => `
                    <article class="asset-row">
                        <div class="asset-row__head">
                            <span class="tiny-pill">${escapeHtml(entry.kind)}</span>
                            <span class="tiny-pill">${escapeHtml(entry.label)}</span>
                        </div>
                        <strong>${escapeHtml(entry.slotId)}</strong>
                        <p class="card__note">${escapeHtml(entry.promptHint)}</p>
                        <code>${escapeHtml(entry.outputPath)}</code>
                    </article>
                `).join("")}
            </div>
        </section>
    `;
}

function handleClick(event) {
    const button = event.target.closest("[data-action]");

    if (!button) {
        return;
    }

    const { action, candidateId, teamId } = button.dataset;
    const stage = getCurrentStage();
    const questionState = getQuestionState(getQuestionKey(stage));

    switch (action) {
        case "toggle-asset-mode":
            state.assetMode = !state.assetMode;
            syncAssetModeUrl();
            render();
            return;
        case "prev-stage":
            state.stageIndex = clamp(state.stageIndex - 1, 0, grammarDetectiveStages.length - 1);
            render();
            return;
        case "next-stage":
            state.stageIndex = clamp(state.stageIndex + 1, 0, grammarDetectiveStages.length - 1);
            render();
            return;
        case "prev-question":
            stepQuestion(stage, -1);
            return;
        case "next-question":
            stepQuestion(stage, 1);
            return;
        case "reset-current":
            resetCurrentQuestion(stage);
            render();
            return;
        case "team-vote":
            questionState.teamVotes[teamId] = questionState.teamVotes[teamId] === candidateId ? "" : candidateId;
            render();
            return;
        case "choose-leading": {
            const leader = getVoteLeader(getVoteRanking(stage, questionState.teamVotes));
            if (leader) {
                questionState.selectedCandidateId = leader.id;
            }
            render();
            return;
        }
        case "clear-team-votes":
            questionState.teamVotes = {};
            render();
            return;
        case "select-candidate":
            questionState.selectedCandidateId = candidateId;
            render();
            return;
        case "toggle-answer":
            questionState.answerVisible = !questionState.answerVisible;
            render();
            return;
        case "clear-selection":
            questionState.selectedCandidateId = "";
            questionState.answerVisible = false;
            render();
            return;
        default:
            return;
    }
}

function handleKeydown(event) {
    if (event.key === "a" || event.key === "A") {
        state.assetMode = !state.assetMode;
        syncAssetModeUrl();
        render();
        return;
    }

    if (event.key === "PageUp") {
        event.preventDefault();
        state.stageIndex = clamp(state.stageIndex - 1, 0, grammarDetectiveStages.length - 1);
        render();
        return;
    }

    if (event.key === "PageDown") {
        event.preventDefault();
        state.stageIndex = clamp(state.stageIndex + 1, 0, grammarDetectiveStages.length - 1);
        render();
        return;
    }

    if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepQuestion(getCurrentStage(), -1);
        return;
    }

    if (event.key === "ArrowRight") {
        event.preventDefault();
        stepQuestion(getCurrentStage(), 1);
    }
}

function stepQuestion(stage, delta) {
    if (stage.kind === "match") {
        state.promptIndexByStage[stage.id] = clamp(getPromptIndex(stage) + delta, 0, stage.prompts.length - 1);
        render();
        return;
    }

    state.clueRevealCountByStage[stage.id] = clamp(getClueRevealCount(stage) + delta, 1, stage.clues.length);
    render();
}

function resetCurrentQuestion(stage) {
    if (stage.kind === "match") {
        state.questionStates[getQuestionKey(stage)] = createQuestionState();
        return;
    }

    state.clueRevealCountByStage[stage.id] = 1;
    state.questionStates[getQuestionKey(stage)] = createQuestionState();
}

function getPromptIndex(stage) {
    return state.promptIndexByStage[stage.id] ?? 0;
}

function getClueRevealCount(stage) {
    return state.clueRevealCountByStage[stage.id] ?? 1;
}

function getCurrentStage() {
    return grammarDetectiveStages[state.stageIndex];
}

function getQuestionKey(stage) {
    if (stage.kind === "match") {
        return `${stage.id}::prompt-${getPromptIndex(stage) + 1}`;
    }

    return stage.id;
}

function getQuestionState(questionKey) {
    if (!state.questionStates[questionKey]) {
        state.questionStates[questionKey] = createQuestionState();
    }

    return state.questionStates[questionKey];
}

function createQuestionState() {
    return {
        selectedCandidateId: "",
        answerVisible: false,
        teamVotes: {}
    };
}

function getCharacterById(stage, candidateId) {
    return stage.cast.find((character) => character.characterId === candidateId) || null;
}

function getVoteCounts(stage, teamVotes) {
    const counts = Object.fromEntries(stage.candidateIds.map((candidateId) => [candidateId, 0]));

    Object.values(teamVotes).forEach((candidateId) => {
        if (candidateId && candidateId in counts) {
            counts[candidateId] += 1;
        }
    });

    return counts;
}

function getVoteRanking(stage, teamVotes) {
    const counts = getVoteCounts(stage, teamVotes);

    return stage.candidateIds
        .map((candidateId) => ({
            id: candidateId,
            name: getCharacterById(stage, candidateId)?.name || candidateId,
            count: counts[candidateId]
        }))
        .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name, "ko"));
}

function getVoteLeader(ranking) {
    if (!ranking.length || ranking[0].count === 0) {
        return null;
    }

    if (ranking[1] && ranking[1].count === ranking[0].count) {
        return null;
    }

    return ranking[0];
}

function isPrevQuestionDisabled(stage) {
    return stage.kind === "match"
        ? getPromptIndex(stage) === 0
        : getClueRevealCount(stage) === 1;
}

function isNextQuestionDisabled(stage) {
    return stage.kind === "match"
        ? getPromptIndex(stage) === stage.prompts.length - 1
        : getClueRevealCount(stage) === stage.clues.length;
}

function initialAssetMode() {
    const params = new URLSearchParams(window.location.search);
    return params.get("assetMode") === "1";
}

function syncAssetModeUrl() {
    const nextUrl = new URL(window.location.href);

    if (state.assetMode) {
        nextUrl.searchParams.set("assetMode", "1");
    } else {
        nextUrl.searchParams.delete("assetMode");
    }

    window.history.replaceState({}, "", nextUrl);
}

function getBackgroundSlotId(stage) {
    return `${stage.id}__background`;
}

function getPropSlotId(stage, prop) {
    return `${stage.id}__prop__${prop.id}`;
}

function getCastSlotId(stage, character) {
    return `${stage.id}__cast__${character.characterId}`;
}

function getOutputBase(stage) {
    return `assets/${stage.chapter}/grammar/images/grammar-detective`;
}

function getBackgroundOutputPath(stage) {
    return `${getOutputBase(stage)}/${getBackgroundSlotId(stage)}.webp`;
}

function getPropOutputPath(stage, prop) {
    return `${getOutputBase(stage)}/${getPropSlotId(stage, prop)}.webp`;
}

function getCastOutputPath(stage, character) {
    return `${getOutputBase(stage)}/${getCastSlotId(stage, character)}.webp`;
}

function buildAssetRows(stage) {
    return [
        {
            kind: "background",
            label: stage.background.label,
            slotId: getBackgroundSlotId(stage),
            promptHint: stage.background.assetBrief,
            outputPath: getBackgroundOutputPath(stage)
        },
        ...stage.props.map((prop) => ({
            kind: "prop",
            label: prop.label,
            slotId: getPropSlotId(stage, prop),
            promptHint: prop.assetBrief,
            outputPath: getPropOutputPath(stage, prop)
        })),
        ...stage.cast.map((character) => ({
            kind: "cast",
            label: character.name,
            slotId: getCastSlotId(stage, character),
            promptHint: character.assetBrief,
            outputPath: getCastOutputPath(stage, character)
        }))
    ];
}

function toSoftColor(hexColor) {
    const normalized = hexColor.replace("#", "");

    if (normalized.length !== 6) {
        return "rgba(15, 118, 110, 0.12)";
    }

    const red = Number.parseInt(normalized.slice(0, 2), 16);
    const green = Number.parseInt(normalized.slice(2, 4), 16);
    const blue = Number.parseInt(normalized.slice(4, 6), 16);
    return `rgba(${red}, ${green}, ${blue}, 0.12)`;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

root.addEventListener("click", handleClick);
window.addEventListener("keydown", handleKeydown);

render();
