(() => {
    'use strict';

    const STORAGE_KEY = 'korean3b-speaking-evaluation-v1';
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    const FALLBACK_QUESTION_BANK = [
        { id: 'q1', number: 1, part: 'grammar', grammar: 'A/V-던', prompts: ['다른 사람이 쓰던 물건을 사용한 적이 있어요?'] },
        { id: 'q2', number: 2, part: 'grammar', grammar: 'A/V-잖아요', prompts: ['한국 드라마를 많이 보는 편이에요? 왜요?'] },
        { id: 'q3', number: 3, part: 'grammar', grammar: 'V-(으)ㄹ 생각/계획/예정이다', prompts: ['언제쯤 취직할 생각이에요?'] },
        { id: 'q4', number: 4, part: 'grammar', grammar: 'V-(으)려면 멀었다', prompts: ['이제 한국말을 잘하지요?'] },
        { id: 'q5', number: 5, part: 'grammar', grammar: '사동사', prompts: ['감기에 걸린 아이에게 무엇을 해 줘야 해요?'] },
        { id: 'q6', number: 6, part: 'grammar', grammar: '사동사-아/어 주다', prompts: ['다른 사람을 도와준 경험에 대해 이야기해 보세요.'] },
        { id: 'q7', number: 7, part: 'grammar', grammar: 'A/V-(ㄴ/는)다면', prompts: ['만약에 내일 지구가 없어진다면 뭘 하고 싶어요?'] },
        { id: 'q8', number: 8, part: 'grammar', grammar: '무엇이든(지), 무슨 N(이)든(지)', prompts: ['무슨 요일에 만날까요?'] },
        { id: 'q9', number: 9, part: 'grammar', grammar: 'A/V-았/었더니, A-아/어졌어요', prompts: ['건강이 좋아진 이유나 나빠진 이유를 말해 보세요.'] },
        { id: 'q10', number: 10, part: 'grammar', grammar: '얼마나 A/V-(으)ㄴ지/는지 모르다', prompts: ['무슨 음식을 좋아해요?'] },
        { id: 'q11', number: 11, part: 'grammar', grammar: 'A-(으)ㄴ 모양이다 / V-는 모양이다 / N인 모양이다', prompts: ['그림을 보고 어떤 상황인지 추측해서 말해 보세요.'] },
        { id: 'q12', number: 12, part: 'grammar', grammar: 'A/V-아/어야, N이어야/여야', prompts: ['어떻게 해야 면접을 잘 볼 수 있어요?'] },
        { id: 'q13', number: 13, part: 'grammar', grammar: 'A/V-(으)ㄹ까 봐', prompts: ['친구, 공부, 생활 중 하나를 골라 걱정되는 일을 말해 보세요.'] },
        { id: 'q14', number: 14, part: 'grammar', grammar: 'V-고 있다', prompts: ['친구들이 어떤 옷을 입고 있어요?'] },
        { id: 'q15', number: 15, part: 'grammar', grammar: 'A/V-았/었어야 했는데', prompts: ['하지 못해서 후회되는 일이 있어요?'] },
        { id: 'q16', number: 16, part: 'free', grammar: '자유 말하기', prompts: ['여러분이 생각하는 배우자의 조건은 무엇입니까?'] },
        { id: 'q17', number: 17, part: 'free', grammar: '자유 말하기', prompts: ['연애결혼의 좋은 점과 나쁜 점은 무엇입니까?'] }
    ];

    const refs = {
        modeToggleBtn: document.getElementById('modeToggleBtn'),
        randomPickBtn: document.getElementById('randomPickBtn'),
        listToggleBtn: document.getElementById('listToggleBtn'),
        modeLabel: document.getElementById('modeLabel'),
        rangeLabel: document.getElementById('rangeLabel'),
        questionNumber: document.getElementById('questionNumber'),
        questionGrammar: document.getElementById('questionGrammar'),
        questionPrompt: document.getElementById('questionPrompt'),
        questionSupport: document.getElementById('questionSupport'),
        modeChip: document.getElementById('modeChip'),
        speechStatus: document.getElementById('speechStatus'),
        startSpeechBtn: document.getElementById('startSpeechBtn'),
        stopSpeechBtn: document.getElementById('stopSpeechBtn'),
        clearTranscriptBtn: document.getElementById('clearTranscriptBtn'),
        transcriptBox: document.getElementById('transcriptBox'),
        transcriptMeta: document.getElementById('transcriptMeta'),
        listDrawer: document.getElementById('listDrawer'),
        listBackdrop: document.getElementById('listBackdrop'),
        listCloseBtn: document.getElementById('listCloseBtn'),
        shortQuestionList: document.getElementById('shortQuestionList'),
        longQuestionList: document.getElementById('longQuestionList')
    };

    const state = {
        questionBank: [],
        mode: 'short',
        selectedId: 'q1',
        lastSelectedByMode: {
            short: 'q1',
            long: 'q16'
        },
        transcript: '',
        finalTranscript: '',
        isListening: false,
        listOpen: false,
        recognition: null
    };

    bootstrap();

    async function bootstrap() {
        bindEvents();
        setControlsDisabled(true);
        applySavedState();
        resetTranscript('브라우저와 마이크 상태를 확인하는 중입니다.');
        syncSpeechAvailability();

        try {
            state.questionBank = await loadQuestionBank();
            refs.transcriptMeta.textContent = buildSpeechReadyMessage();
        } catch (error) {
            console.error(error);
            state.questionBank = FALLBACK_QUESTION_BANK;
            refs.transcriptMeta.textContent = '기본 문항으로 실행 중입니다. 준비 페이지 데이터가 있으면 자동으로 더 자세하게 불러옵니다.';
        }

        state.questionBank = normalizeQuestionBank(state.questionBank);
        ensureValidSelection();
        renderQuestionLists();
        renderSelectedQuestion();
        updateSpeechUi();
        setControlsDisabled(false);
    }

    function bindEvents() {
        refs.modeToggleBtn.addEventListener('click', toggleMode);
        refs.randomPickBtn.addEventListener('click', pickRandomQuestion);
        refs.listToggleBtn.addEventListener('click', openQuestionList);
        refs.listBackdrop.addEventListener('click', closeQuestionList);
        refs.listCloseBtn.addEventListener('click', closeQuestionList);
        refs.startSpeechBtn.addEventListener('click', startSpeechRecognition);
        refs.stopSpeechBtn.addEventListener('click', stopSpeechRecognition);
        refs.clearTranscriptBtn.addEventListener('click', handleClearTranscript);
        document.addEventListener('keydown', handleKeydown);
    }

    function applySavedState() {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return;
            }
            const saved = JSON.parse(raw);
            state.mode = saved.mode === 'long' ? 'long' : 'short';
            state.selectedId = typeof saved.selectedId === 'string' ? saved.selectedId : 'q1';
            state.lastSelectedByMode = {
                short: typeof saved.lastSelectedByMode?.short === 'string' ? saved.lastSelectedByMode.short : 'q1',
                long: typeof saved.lastSelectedByMode?.long === 'string' ? saved.lastSelectedByMode.long : 'q16'
            };
        } catch (error) {
            console.error(error);
        }
    }

    function persistState() {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
                mode: state.mode,
                selectedId: state.selectedId,
                lastSelectedByMode: state.lastSelectedByMode
            }));
        } catch (error) {
            console.error(error);
        }
    }

    async function loadQuestionBank() {
        const response = await window.fetch('../shared/speaking-bank.js');
        if (!response.ok) {
            throw new Error(`Failed to load speaking-bank.js: ${response.status}`);
        }
        const source = await response.text();
        return extractQuestionBank(source);
    }

    function extractQuestionBank(source) {
        const marker = 'const QUESTION_BANK =';
        const markerIndex = source.indexOf(marker);
        if (markerIndex === -1) {
            throw new Error('QUESTION_BANK marker not found.');
        }

        const arrayStart = source.indexOf('[', markerIndex);
        if (arrayStart === -1) {
            throw new Error('QUESTION_BANK array start not found.');
        }

        let depth = 0;
        let arrayEnd = -1;
        let inSingle = false;
        let inDouble = false;
        let inTemplate = false;
        let escapeNext = false;

        for (let index = arrayStart; index < source.length; index += 1) {
            const char = source[index];

            if (escapeNext) {
                escapeNext = false;
                continue;
            }

            if (char === '\\') {
                escapeNext = true;
                continue;
            }

            if (!inDouble && !inTemplate && char === '\'') {
                inSingle = !inSingle;
                continue;
            }

            if (!inSingle && !inTemplate && char === '"') {
                inDouble = !inDouble;
                continue;
            }

            if (!inSingle && !inDouble && char === '`') {
                inTemplate = !inTemplate;
                continue;
            }

            if (inSingle || inDouble || inTemplate) {
                continue;
            }

            if (char === '[') {
                depth += 1;
            } else if (char === ']') {
                depth -= 1;
                if (depth === 0) {
                    arrayEnd = index;
                    break;
                }
            }
        }

        if (arrayEnd === -1) {
            throw new Error('QUESTION_BANK array end not found.');
        }

        const arrayText = source.slice(arrayStart, arrayEnd + 1);
        return Function(`"use strict"; return (${arrayText});`)();
    }

    function normalizeQuestionBank(questionBank) {
        return questionBank
            .filter((question) => Number.isFinite(question.number))
            .sort((left, right) => left.number - right.number)
            .map((question) => ({
                ...question,
                id: question.id || `q${question.number}`,
                part: question.part || (question.number <= 15 ? 'grammar' : 'free'),
                prompts: Array.isArray(question.prompts) && question.prompts.length
                    ? question.prompts.filter(Boolean)
                    : [question.lead || '질문 준비 중입니다.']
            }));
    }

    function ensureValidSelection() {
        const allQuestions = state.questionBank;
        const shortQuestions = getQuestionsByMode('short');
        const longQuestions = getQuestionsByMode('long');

        if (!allQuestions.length) {
            return;
        }

        if (!allQuestions.some((question) => question.id === state.selectedId)) {
            state.selectedId = shortQuestions[0]?.id || allQuestions[0].id;
        }

        if (!shortQuestions.some((question) => question.id === state.lastSelectedByMode.short)) {
            state.lastSelectedByMode.short = shortQuestions[0]?.id || 'q1';
        }

        if (!longQuestions.some((question) => question.id === state.lastSelectedByMode.long)) {
            state.lastSelectedByMode.long = longQuestions[0]?.id || 'q16';
        }

        const selectedQuestion = getSelectedQuestion();
        if (!selectedQuestion) {
            state.selectedId = allQuestions[0].id;
            state.mode = getModeFromQuestion(allQuestions[0]);
        } else {
            state.mode = getModeFromQuestion(selectedQuestion);
            state.lastSelectedByMode[state.mode] = selectedQuestion.id;
        }

        persistState();
    }

    function toggleMode() {
        const nextMode = state.mode === 'short' ? 'long' : 'short';
        const nextQuestions = getQuestionsByMode(nextMode);
        if (!nextQuestions.length) {
            return;
        }
        const nextSelectedId = nextQuestions.some((question) => question.id === state.lastSelectedByMode[nextMode])
            ? state.lastSelectedByMode[nextMode]
            : nextQuestions[0].id;
        selectQuestion(nextSelectedId);
    }

    function pickRandomQuestion() {
        const questions = getQuestionsByMode(state.mode);
        if (!questions.length) {
            return;
        }

        let pool = questions;
        if (questions.length > 1) {
            pool = questions.filter((question) => question.id !== state.selectedId);
        }

        const chosen = pool[Math.floor(Math.random() * pool.length)] || questions[0];
        selectQuestion(chosen.id);
    }

    function selectQuestion(questionId) {
        const nextQuestion = state.questionBank.find((question) => question.id === questionId);
        if (!nextQuestion) {
            return;
        }

        stopSpeechRecognition();
        state.selectedId = nextQuestion.id;
        state.mode = getModeFromQuestion(nextQuestion);
        state.lastSelectedByMode[state.mode] = nextQuestion.id;
        persistState();
        resetTranscript(buildSpeechReadyMessage());
        renderSelectedQuestion();
        renderQuestionLists();
        closeQuestionList();
    }

    function renderSelectedQuestion() {
        const question = getSelectedQuestion();
        if (!question) {
            refs.questionNumber.textContent = '--';
            refs.questionGrammar.textContent = '문항을 찾을 수 없습니다.';
            refs.questionPrompt.textContent = '문항 데이터가 비어 있습니다.';
            refs.questionSupport.textContent = '';
            refs.questionSupport.classList.add('se-hidden');
            return;
        }

        const prompts = question.prompts.filter(Boolean);
        const support = prompts[1] || question.lead || '';

        refs.questionNumber.textContent = String(question.number).padStart(2, '0');
        refs.questionGrammar.textContent = question.grammar || '자유 말하기';
        refs.questionPrompt.textContent = prompts[0] || question.lead || '질문 준비 중입니다.';
        refs.questionSupport.textContent = support;
        refs.questionSupport.classList.toggle('se-hidden', !support);
        refs.modeLabel.textContent = state.mode === 'short' ? '단문' : '장문';
        refs.rangeLabel.textContent = state.mode === 'short' ? '1~15번' : '16~17번';
        refs.modeChip.textContent = state.mode === 'short' ? '단문' : '장문';
    }

    function renderQuestionLists() {
        refs.shortQuestionList.innerHTML = buildQuestionListHtml(getQuestionsByMode('short'));
        refs.longQuestionList.innerHTML = buildQuestionListHtml(getQuestionsByMode('long'));

        refs.shortQuestionList.querySelectorAll('[data-question-id]').forEach((button) => {
            button.addEventListener('click', () => selectQuestion(button.dataset.questionId));
        });

        refs.longQuestionList.querySelectorAll('[data-question-id]').forEach((button) => {
            button.addEventListener('click', () => selectQuestion(button.dataset.questionId));
        });
    }

    function buildQuestionListHtml(questions) {
        return questions.map((question) => `
            <button
                type="button"
                class="se-list-item${question.id === state.selectedId ? ' is-active' : ''}"
                data-question-id="${escapeAttr(question.id)}"
            >
                <span class="se-list-item__number">${String(question.number).padStart(2, '0')}</span>
                <span class="se-list-item__body">
                    <strong>${escapeHtml(question.grammar || '자유 말하기')}</strong>
                    <span>${escapeHtml(question.prompts?.[0] || question.lead || question.title || '')}</span>
                </span>
            </button>
        `).join('');
    }

    function getQuestionsByMode(mode) {
        return state.questionBank.filter((question) => getModeFromQuestion(question) === mode);
    }

    function getSelectedQuestion() {
        return state.questionBank.find((question) => question.id === state.selectedId) || null;
    }

    function getModeFromQuestion(question) {
        return question.number <= 15 ? 'short' : 'long';
    }

    function openQuestionList() {
        state.listOpen = true;
        refs.listDrawer.classList.remove('se-hidden');
        document.body.classList.add('se-drawer-open');
    }

    function closeQuestionList() {
        state.listOpen = false;
        refs.listDrawer.classList.add('se-hidden');
        document.body.classList.remove('se-drawer-open');
    }

    function handleKeydown(event) {
        if (event.key === 'Escape' && state.listOpen) {
            closeQuestionList();
        }
    }

    function setControlsDisabled(disabled) {
        refs.modeToggleBtn.disabled = disabled;
        refs.randomPickBtn.disabled = disabled;
        refs.listToggleBtn.disabled = disabled;
    }

    function handleClearTranscript() {
        stopSpeechRecognition();
        resetTranscript(buildSpeechReadyMessage());
        updateSpeechUi();
    }

    function resetTranscript(metaMessage) {
        state.transcript = '';
        state.finalTranscript = '';
        refs.transcriptBox.textContent = '학생이 말하면 음성인식 결과가 여기에 표시됩니다.';
        refs.transcriptBox.classList.add('is-placeholder');
        if (metaMessage) {
            refs.transcriptMeta.textContent = metaMessage;
        }
    }

    function syncSpeechAvailability() {
        if (!isSpeechRecognitionAvailable()) {
            refs.transcriptMeta.textContent = '이 브라우저에서는 음성인식이 제한됩니다. Chrome 또는 Edge의 HTTPS 환경을 권장합니다.';
        }
        updateSpeechUi();
    }

    function buildSpeechReadyMessage() {
        return isSpeechRecognitionAvailable()
            ? '인식 시작을 누르면 학생의 답이 실시간으로 표시됩니다.'
            : '이 브라우저에서는 음성인식이 제한됩니다. Chrome 또는 Edge의 HTTPS 환경을 권장합니다.';
    }

    function updateSpeechUi() {
        const statusText = refs.speechStatus.querySelector('span');
        const supported = isSpeechRecognitionAvailable();

        refs.speechStatus.classList.remove('is-listening', 'is-unsupported');

        if (!supported) {
            statusText.textContent = 'STT 미지원';
            refs.speechStatus.classList.add('is-unsupported');
            refs.startSpeechBtn.disabled = true;
            refs.stopSpeechBtn.disabled = true;
            refs.clearTranscriptBtn.disabled = !state.transcript;
            return;
        }

        if (state.isListening) {
            statusText.textContent = '듣는 중';
            refs.speechStatus.classList.add('is-listening');
        } else if (state.transcript) {
            statusText.textContent = '인식 완료';
        } else {
            statusText.textContent = 'STT 대기';
        }

        refs.startSpeechBtn.disabled = state.isListening;
        refs.stopSpeechBtn.disabled = !state.isListening;
        refs.clearTranscriptBtn.disabled = !state.transcript;
    }

    function startSpeechRecognition() {
        if (!isSpeechRecognitionAvailable()) {
            updateSpeechUi();
            return;
        }

        stopSpeechRecognition();
        state.finalTranscript = '';
        state.transcript = '';
        refs.transcriptBox.textContent = '학생의 답을 듣는 중입니다...';
        refs.transcriptBox.classList.add('is-placeholder');

        try {
            const recognition = new SpeechRecognitionClass();
            recognition.lang = 'ko-KR';
            recognition.interimResults = true;
            recognition.continuous = true;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => {
                state.isListening = true;
                refs.transcriptMeta.textContent = '학생이 말하는 동안 문장이 계속 업데이트됩니다.';
                updateSpeechUi();
            };

            recognition.onresult = (event) => {
                let finalText = state.finalTranscript;
                let interimText = '';

                for (let index = event.resultIndex; index < event.results.length; index += 1) {
                    const result = event.results[index];
                    const text = normalizeSpacing(result[0]?.transcript || '');

                    if (!text) {
                        continue;
                    }

                    if (result.isFinal) {
                        finalText = normalizeSpacing(`${finalText} ${text}`);
                    } else {
                        interimText = normalizeSpacing(`${interimText} ${text}`);
                    }
                }

                state.finalTranscript = finalText;
                state.transcript = normalizeSpacing(`${finalText} ${interimText}`);
                renderTranscript();
            };

            recognition.onerror = (event) => {
                state.isListening = false;
                updateSpeechUi();

                const message = event.error === 'not-allowed'
                    ? '마이크 권한이 필요합니다. 브라우저에서 허용한 뒤 다시 시도해 주세요.'
                    : event.error === 'no-speech'
                        ? '음성이 감지되지 않았습니다. 학생이 조금 더 또렷하게 말해 보세요.'
                        : '음성인식 중 오류가 발생했습니다. 한 번 더 시도해 주세요.';

                refs.transcriptMeta.textContent = message;
            };

            recognition.onend = () => {
                state.isListening = false;
                state.recognition = null;
                if (state.transcript) {
                    refs.transcriptMeta.textContent = '마지막 인식 결과를 유지하고 있습니다. 새로 시작하면 다시 받아씁니다.';
                } else {
                    refs.transcriptMeta.textContent = buildSpeechReadyMessage();
                }
                updateSpeechUi();
            };

            state.recognition = recognition;
            recognition.start();
        } catch (error) {
            console.error(error);
            refs.transcriptMeta.textContent = '음성인식을 시작하지 못했습니다. 브라우저를 확인해 주세요.';
            state.isListening = false;
            updateSpeechUi();
        }
    }

    function stopSpeechRecognition() {
        if (state.recognition) {
            try {
                state.recognition.stop();
            } catch (error) {
                console.error(error);
            }
        }
        state.isListening = false;
        updateSpeechUi();
    }

    function renderTranscript() {
        if (!state.transcript) {
            refs.transcriptBox.textContent = '학생이 말하면 음성인식 결과가 여기에 표시됩니다.';
            refs.transcriptBox.classList.add('is-placeholder');
            return;
        }

        refs.transcriptBox.textContent = state.transcript;
        refs.transcriptBox.classList.remove('is-placeholder');
    }

    function isSpeechRecognitionAvailable() {
        const secureLike = window.isSecureContext
            || ['localhost', '127.0.0.1'].includes(window.location.hostname)
            || window.location.protocol === 'file:';
        return Boolean(SpeechRecognitionClass && secureLike);
    }

    function normalizeSpacing(value) {
        return String(value || '').replace(/\s+/g, ' ').trim();
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function escapeAttr(value) {
        return escapeHtml(value);
    }
})();
