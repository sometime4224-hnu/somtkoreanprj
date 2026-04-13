(() => {
    "use strict";

    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    const CHOSEONG = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    const JUNGSEONG = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
    const JONGSEONG = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    const STT_SUPPORTED = Boolean(
        SpeechRecognitionClass &&
        (window.isSecureContext || ["localhost", "127.0.0.1"].includes(window.location.hostname) || window.location.protocol === "file:")
    );

    const QUIZ_ITEMS = [
        {
            id: "eat",
            title: "과식해서 배가 아픈 장면",
            image: "../assets/c14/grammar/images/g1-picture-quiz/g1pq_01_eat.webp",
            alt: "많이 먹고 배를 만지는 사람 그림",
            leadWords: ["많이", "먹다"],
            tailWords: ["배", "아프다"],
            answers: [
                "하도 많이 먹어서 배가 아파요.",
                "하도 많이 먹어서 배가 아팠어요.",
                "하도 먹어서 배가 아파요."
            ],
            checkpoints: [
                { label: "하도", variants: ["하도"], required: true },
                { label: "먹다", variants: ["먹어", "먹었", "먹다"], required: true },
                { label: "배", variants: ["배"], required: true },
                { label: "아프다", variants: ["아파", "아프", "아팠"], required: true }
            ]
        },
        {
            id: "run",
            title: "너무 달려서 땀이 나는 장면",
            image: "../assets/c14/grammar/images/g1-picture-quiz/g1pq_02_run.webp",
            alt: "달리고 나서 숨을 고르는 사람 그림",
            leadWords: ["계속", "달리다"],
            tailWords: ["땀", "많이 나다"],
            answers: [
                "하도 달려서 땀이 많이 나요.",
                "하도 달려서 땀이 많이 났어요."
            ],
            checkpoints: [
                { label: "하도", variants: ["하도"], required: true },
                { label: "달리다", variants: ["달려", "달리", "달렸"], required: true },
                { label: "땀", variants: ["땀"], required: true },
                { label: "나다", variants: ["나요", "났", "나서"], required: true }
            ]
        },
        {
            id: "cry",
            title: "너무 울어서 눈이 부은 장면",
            image: "../assets/c14/grammar/images/g1-picture-quiz/g1pq_03_cry.webp",
            alt: "계속 울고 있는 사람 그림",
            leadWords: ["계속", "울다"],
            tailWords: ["눈", "붓다"],
            answers: [
                "하도 울어서 눈이 부었어요.",
                "하도 울어서 눈이 많이 부었어요."
            ],
            checkpoints: [
                { label: "하도", variants: ["하도"], required: true },
                { label: "울다", variants: ["울어", "울었", "울다"], required: true },
                { label: "눈", variants: ["눈"], required: true },
                { label: "붓다", variants: ["부었", "부어", "붓"], required: true }
            ]
        },
        {
            id: "sleep",
            title: "너무 자서 학교에 늦은 장면",
            image: "../assets/c14/grammar/images/g1-picture-quiz/g1pq_04_sleep.webp",
            alt: "늦잠을 자서 졸린 사람 그림",
            leadWords: ["오래", "자다"],
            tailWords: ["학교", "늦다"],
            answers: [
                "하도 자서 학교에 늦었어요.",
                "하도 자서 늦었어요."
            ],
            checkpoints: [
                { label: "하도", variants: ["하도"], required: true },
                { label: "자다", variants: ["자서", "잤", "자다"], required: true },
                { label: "학교", variants: ["학교"], required: false },
                { label: "늦다", variants: ["늦었", "늦어", "늦"], required: true }
            ]
        },
        {
            id: "spicy",
            title: "너무 매워서 물을 마시는 장면",
            image: "../assets/c14/grammar/images/g1-picture-quiz/g1pq_05_spicy.webp",
            alt: "매운 떡볶이를 먹고 힘들어하는 사람 그림",
            leadWords: ["떡볶이", "맵다"],
            tailWords: ["물", "마시다"],
            answers: [
                "떡볶이가 하도 매워서 물을 마셨어요.",
                "하도 매워서 물을 마셨어요."
            ],
            checkpoints: [
                { label: "하도", variants: ["하도"], required: true },
                { label: "맵다", variants: ["매워", "맵"], required: true },
                { label: "물", variants: ["물"], required: true },
                { label: "마시다", variants: ["마셨어", "마셔", "마시"], required: true },
                { label: "떡볶이", variants: ["떡볶이"], required: false }
            ]
        },
        {
            id: "scary",
            title: "너무 무서워서 TV를 끄는 장면",
            image: "../assets/c14/grammar/images/g1-picture-quiz/g1pq_06_scary.webp",
            alt: "무서운 영화를 보고 겁먹은 사람 그림",
            leadWords: ["영화", "무섭다"],
            tailWords: ["TV", "끄다"],
            answers: [
                "영화가 하도 무서워서 TV를 껐어요.",
                "하도 무서워서 TV를 껐어요.",
                "하도 무서워서 티비를 껐어요."
            ],
            checkpoints: [
                { label: "하도", variants: ["하도"], required: true },
                { label: "무섭다", variants: ["무서워", "무섭"], required: true },
                { label: "TV", variants: ["티비", "tv"], required: true },
                { label: "끄다", variants: ["껐", "끄", "꺼"], required: true },
                { label: "영화", variants: ["영화"], required: false }
            ]
        },
        {
            id: "sweet",
            title: "너무 달아서 커피를 마시는 장면",
            image: "../assets/c14/grammar/images/g1-picture-quiz/g1pq_07_sweet.webp",
            alt: "달콤한 케이크를 먹는 사람 그림",
            leadWords: ["케이크", "달다"],
            tailWords: ["커피", "마시다"],
            answers: [
                "케이크가 하도 달아서 커피를 마셨어요.",
                "하도 달아서 커피를 마셨어요."
            ],
            checkpoints: [
                { label: "하도", variants: ["하도"], required: true },
                { label: "달다", variants: ["달아", "달아서", "달"], required: true },
                { label: "커피", variants: ["커피"], required: true },
                { label: "마시다", variants: ["마셨어", "마셔", "마시"], required: true },
                { label: "케이크", variants: ["케이크", "케익"], required: false }
            ]
        },
        {
            id: "bored-phone",
            title: "너무 심심해서 휴대폰을 보는 장면",
            image: "../assets/c14/grammar/images/g1-picture-quiz/g1pq_08_bored-phone.webp",
            alt: "침대에서 휴대폰을 보는 사람 그림",
            leadWords: ["너무", "심심하다"],
            tailWords: ["휴대폰", "보다"],
            answers: [
                "하도 심심해서 휴대폰을 보고 있어요.",
                "하도 심심해서 핸드폰을 보고 있어요."
            ],
            checkpoints: [
                { label: "하도", variants: ["하도"], required: true },
                { label: "심심하다", variants: ["심심"], required: true },
                { label: "휴대폰", variants: ["휴대폰", "핸드폰", "폰"], required: true },
                { label: "보다", variants: ["보고", "봐요", "보"], required: true }
            ]
        },
        {
            id: "cold",
            title: "너무 추워서 몸이 떨리는 장면",
            image: "../assets/c14/grammar/images/g1-picture-quiz/g1pq_09_cold.webp",
            alt: "눈 오는 날 추워하는 사람 그림",
            leadWords: ["날씨", "춥다"],
            tailWords: ["몸", "떨리다"],
            answers: [
                "하도 추워서 몸이 떨려요.",
                "날씨가 하도 추워서 몸이 떨려요."
            ],
            checkpoints: [
                { label: "하도", variants: ["하도"], required: true },
                { label: "춥다", variants: ["추워", "춥"], required: true },
                { label: "몸", variants: ["몸"], required: true },
                { label: "떨리다", variants: ["떨려", "떨리"], required: true },
                { label: "날씨", variants: ["날씨"], required: false }
            ]
        },
        {
            id: "hot",
            title: "너무 뜨거워서 천천히 먹는 장면",
            image: "../assets/c14/grammar/images/g1-picture-quiz/g1pq_10_hot.webp",
            alt: "뜨거운 라면을 조심스럽게 먹는 사람 그림",
            leadWords: ["라면", "뜨겁다"],
            tailWords: ["천천히", "먹다"],
            answers: [
                "라면이 하도 뜨거워서 천천히 먹어요.",
                "하도 뜨거워서 천천히 먹어요."
            ],
            checkpoints: [
                { label: "하도", variants: ["하도"], required: true },
                { label: "뜨겁다", variants: ["뜨거워", "뜨겁"], required: true },
                { label: "천천히", variants: ["천천히"], required: false },
                { label: "먹다", variants: ["먹어", "먹어요", "먹"], required: true },
                { label: "라면", variants: ["라면"], required: false }
            ]
        },
        {
            id: "tired",
            title: "너무 힘들어서 한숨이 나오는 장면",
            image: "../assets/c14/grammar/images/g1-picture-quiz/g1pq_11_tired.webp",
            alt: "일이 많아 힘들어하는 사람 그림",
            leadWords: ["일", "힘들다"],
            tailWords: ["한숨", "나오다"],
            answers: [
                "일이 하도 힘들어서 한숨이 나와요.",
                "하도 힘들어서 한숨이 나와요."
            ],
            checkpoints: [
                { label: "하도", variants: ["하도"], required: true },
                { label: "힘들다", variants: ["힘들어", "힘들"], required: true },
                { label: "한숨", variants: ["한숨"], required: true },
                { label: "나오다", variants: ["나와", "나오"], required: true },
                { label: "일", variants: ["일"], required: false }
            ]
        },
        {
            id: "bored-tv",
            title: "너무 심심해서 TV를 켜는 장면",
            image: "../assets/c14/grammar/images/g1-picture-quiz/g1pq_12_bored-tv.webp",
            alt: "리모컨을 들고 심심해하는 사람 그림",
            leadWords: ["너무", "심심하다"],
            tailWords: ["TV", "켜다"],
            answers: [
                "하도 심심해서 TV를 켰어요.",
                "하도 심심해서 티비를 켰어요."
            ],
            checkpoints: [
                { label: "하도", variants: ["하도"], required: true },
                { label: "심심하다", variants: ["심심"], required: true },
                { label: "TV", variants: ["티비", "tv"], required: true },
                { label: "켜다", variants: ["켰", "켜", "키"], required: true }
            ]
        },
        {
            id: "wait",
            title: "너무 기다려서 커피를 다 마신 장면",
            image: "../assets/c14/grammar/images/g1-picture-quiz/g1pq_13_wait.webp",
            alt: "카페에서 기다리는 사람 그림",
            leadWords: ["친구", "기다리다"],
            tailWords: ["커피", "다 마시다"],
            answers: [
                "친구를 하도 기다려서 커피를 다 마셨어요.",
                "하도 기다려서 커피를 다 마셨어요."
            ],
            checkpoints: [
                { label: "하도", variants: ["하도"], required: true },
                { label: "기다리다", variants: ["기다려", "기다렸", "기다리"], required: true },
                { label: "커피", variants: ["커피"], required: true },
                { label: "마시다", variants: ["마셨어", "마셔", "마시"], required: true },
                { label: "다", variants: ["다"], required: false },
                { label: "친구", variants: ["친구"], required: false }
            ]
        },
        {
            id: "shop",
            title: "너무 쇼핑해서 팔이 아픈 장면",
            image: "../assets/c14/grammar/images/g1-picture-quiz/g1pq_14_shop.webp",
            alt: "쇼핑백을 많이 들고 힘들어하는 사람 그림",
            leadWords: ["오래", "쇼핑하다"],
            tailWords: ["팔", "아프다"],
            answers: [
                "하도 쇼핑해서 팔이 아파요.",
                "쇼핑을 하도 해서 팔이 아파요."
            ],
            checkpoints: [
                { label: "하도", variants: ["하도"], required: true },
                { label: "쇼핑하다", variants: ["쇼핑", "쇼핑해"], required: true },
                { label: "팔", variants: ["팔"], required: true },
                { label: "아프다", variants: ["아파", "아프"], required: true }
            ]
        },
        {
            id: "work-out",
            title: "너무 운동해서 땀이 난 장면",
            image: "../assets/c14/grammar/images/g1-picture-quiz/g1pq_15_work-out.webp",
            alt: "운동 후 지친 사람 그림",
            leadWords: ["오래", "운동하다"],
            tailWords: ["땀", "나다"],
            answers: [
                "하도 운동해서 온몸에 땀이 났어요.",
                "하도 운동해서 땀이 많이 났어요."
            ],
            checkpoints: [
                { label: "하도", variants: ["하도"], required: true },
                { label: "운동하다", variants: ["운동", "운동해"], required: true },
                { label: "땀", variants: ["땀"], required: true },
                { label: "나다", variants: ["났", "나요", "나"], required: true }
            ]
        },
        {
            id: "travel",
            title: "너무 여행해서 발이 아픈 장면",
            image: "../assets/c14/grammar/images/g1-picture-quiz/g1pq_16_travel.webp",
            alt: "여행지에서 지친 사람 그림",
            leadWords: ["계속", "여행하다"],
            tailWords: ["발", "아프다"],
            answers: [
                "하도 여행해서 발이 아파요.",
                "여행을 하도 해서 발이 아파요."
            ],
            checkpoints: [
                { label: "하도", variants: ["하도"], required: true },
                { label: "여행하다", variants: ["여행", "여행해"], required: true },
                { label: "발", variants: ["발"], required: true },
                { label: "아프다", variants: ["아파", "아프"], required: true }
            ]
        }
    ];

    const refs = {
        sceneImage: document.getElementById("sceneImage"),
        sceneTitle: document.getElementById("sceneTitle"),
        promptText: document.getElementById("promptText"),
        progressText: document.getElementById("progressText"),
        progressBar: document.getElementById("progressBar"),
        correctCount: document.getElementById("correctCount"),
        attemptCount: document.getElementById("attemptCount"),
        statusPill: document.getElementById("statusPill"),
        supportNote: document.getElementById("supportNote"),
        leadWords: document.getElementById("leadWords"),
        tailWords: document.getElementById("tailWords"),
        transcriptBox: document.getElementById("transcriptBox"),
        speechMeta: document.getElementById("speechMeta"),
        feedbackBox: document.getElementById("feedbackBox"),
        modelSentence: document.getElementById("modelSentence"),
        modelWrap: document.getElementById("modelWrap"),
        micBtn: document.getElementById("micBtn"),
        micBtnText: document.getElementById("micBtnText"),
        retryBtn: document.getElementById("retryBtn"),
        nextBtn: document.getElementById("nextBtn"),
        exampleBtn: document.getElementById("exampleBtn"),
        manualInput: document.getElementById("manualInput"),
        manualCheckBtn: document.getElementById("manualCheckBtn"),
        summaryPanel: document.getElementById("summaryPanel"),
        summaryCorrect: document.getElementById("summaryCorrect"),
        summaryRate: document.getElementById("summaryRate"),
        summaryRetry: document.getElementById("summaryRetry"),
        restartBtn: document.getElementById("restartBtn")
    };

    const state = {
        index: 0,
        isListening: false,
        recognition: null,
        transcript: "",
        finalTranscript: "",
        results: new Map(),
        focusAction: "mic"
    };

    bootstrap();

    function bootstrap() {
        bindEvents();
        renderSupportState();
        renderCurrentItem();
        window.speechSynthesis?.getVoices();
        if (window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
        }
    }

    function bindEvents() {
        refs.micBtn.addEventListener("click", toggleListening);
        refs.retryBtn.addEventListener("click", () => resetCurrentAttempt(true));
        refs.nextBtn.addEventListener("click", goNext);
        refs.exampleBtn.addEventListener("click", speakModelSentence);
        refs.manualCheckBtn.addEventListener("click", checkManualInput);
        refs.manualInput.addEventListener("keydown", (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                event.preventDefault();
                checkManualInput();
            }
        });
        refs.restartBtn.addEventListener("click", restartQuiz);
    }

    function renderSupportState() {
        refs.supportNote.textContent = STT_SUPPORTED
            ? "음성 인식 사용 가능"
            : "직접 입력 사용";
    }

    function updateActionFocus() {
        refs.micBtn.classList.toggle("is-focus", state.focusAction === "mic" && !refs.micBtn.disabled);
        refs.nextBtn.classList.toggle("is-focus", state.focusAction === "next" && !refs.nextBtn.disabled);
    }

    function renderCurrentItem() {
        if (state.index >= QUIZ_ITEMS.length) {
            renderSummary();
            return;
        }

        const item = currentItem();
        refs.summaryPanel.classList.add("hidden");
        refs.sceneImage.src = item.image;
        refs.sceneImage.alt = item.alt;
        refs.sceneTitle.textContent = item.title;
        refs.promptText.textContent = String(state.index + 1).padStart(2, "0");
        refs.progressText.textContent = `${state.index + 1} / ${QUIZ_ITEMS.length}`;
        refs.progressBar.style.width = `${((state.index + 1) / QUIZ_ITEMS.length) * 100}%`;
        refs.modelSentence.textContent = item.answers[0];
        renderWordPills(refs.leadWords, item.leadWords, "lead");
        renderWordPills(refs.tailWords, item.tailWords, "tail");
        resetCurrentAttempt(false);
        updateScoreboard();
    }

    function renderWordPills(container, words, tone) {
        container.innerHTML = words
            .map((word) => `<span class="word-pill word-pill--${tone}">${escapeHtml(word)}</span>`)
            .join("");
    }

    function updateScoreboard() {
        const results = [...state.results.values()];
        const correct = results.filter((entry) => entry.correct).length;
        refs.correctCount.textContent = String(correct);
        refs.attemptCount.textContent = String(results.length);
    }

    function currentItem() {
        return QUIZ_ITEMS[state.index];
    }

    function toggleListening() {
        if (!STT_SUPPORTED) {
            refs.speechMeta.textContent = "직접 입력";
            return;
        }

        if (state.isListening) {
            stopListening();
            return;
        }

        startListening();
    }

    function startListening() {
        if (state.index >= QUIZ_ITEMS.length) {
            return;
        }

        stopListening(true);
        state.transcript = "";
        state.finalTranscript = "";
        refs.transcriptBox.textContent = "...";
        refs.transcriptBox.classList.add("is-placeholder");
        refs.feedbackBox.className = "feedback-box hidden";
        refs.feedbackBox.innerHTML = "";
        refs.speechMeta.textContent = "듣는 중";

        try {
            const recognition = new SpeechRecognitionClass();
            recognition.lang = "ko-KR";
            recognition.interimResults = true;
            recognition.continuous = false;
            recognition.maxAlternatives = 3;

            recognition.onstart = () => {
                state.isListening = true;
                state.focusAction = "mic";
                refs.statusPill.className = "status-pill is-listening";
                refs.statusPill.textContent = "LISTENING";
                refs.micBtn.classList.add("is-listening");
                refs.micBtnText.textContent = "말하기 종료";
                updateActionFocus();
            };

            recognition.onresult = (event) => {
                let finalText = state.finalTranscript;
                let interimText = "";

                for (let index = event.resultIndex; index < event.results.length; index += 1) {
                    const result = event.results[index];
                    const chosen = pickBestAlternative(result, currentItem().answers);
                    if (!chosen) {
                        continue;
                    }
                    if (result.isFinal) {
                        finalText = normalizeSpacing(`${finalText} ${chosen}`);
                    } else {
                        interimText = normalizeSpacing(`${interimText} ${chosen}`);
                    }
                }

                state.finalTranscript = finalText;
                state.transcript = normalizeSpacing(`${finalText} ${interimText}`);
                refs.transcriptBox.textContent = state.transcript || "...";
                refs.transcriptBox.classList.toggle("is-placeholder", !state.transcript);
            };

            recognition.onerror = (event) => {
                state.isListening = false;
                syncListeningUi();
                refs.speechMeta.textContent = buildRecognitionError(event.error);
            };

            recognition.onend = () => {
                state.isListening = false;
                state.recognition = null;
                syncListeningUi();
                if (state.transcript) {
                    refs.speechMeta.textContent = "확인";
                    evaluateAttempt(state.transcript, "speech");
                } else if (!refs.feedbackBox.innerHTML) {
                    refs.speechMeta.textContent = "다시";
                }
            };

            state.recognition = recognition;
            recognition.start();
        } catch (error) {
            console.error(error);
            state.isListening = false;
            syncListeningUi();
            refs.speechMeta.textContent = "마이크";
        }
    }

    function stopListening(silent = false) {
        if (state.recognition) {
            try {
                state.recognition.stop();
            } catch (error) {
                console.error(error);
            }
        }
        state.isListening = false;
        syncListeningUi();
        if (!silent) {
            refs.speechMeta.textContent = "중지";
        }
    }

    function syncListeningUi() {
        refs.statusPill.className = `status-pill${state.isListening ? " is-listening" : ""}`;
        refs.statusPill.textContent = state.isListening ? "LISTENING" : "READY";
        refs.micBtn.classList.toggle("is-listening", state.isListening);
        refs.micBtnText.textContent = state.isListening ? "말하기 종료" : "말하기 시작";
        updateActionFocus();
    }

    function buildRecognitionError(errorCode) {
        if (errorCode === "not-allowed" || errorCode === "service-not-allowed") {
            return "마이크 허용";
        }
        if (errorCode === "no-speech") {
            return "다시 말하기";
        }
        return "오류";
    }

    function pickBestAlternative(result, answers) {
        let bestText = "";
        let bestScore = -1;

        for (let index = 0; index < result.length; index += 1) {
            const candidate = normalizeSpacing(result[index]?.transcript || "");
            if (!candidate) {
                continue;
            }
            const score = bestReferenceMatch(candidate, answers).score;
            if (score > bestScore) {
                bestText = candidate;
                bestScore = score;
            }
        }

        return bestText;
    }

    function checkManualInput() {
        const manualText = normalizeSpacing(refs.manualInput.value);
        if (!manualText) {
            refs.speechMeta.textContent = "입력";
            return;
        }
        stopListening(true);
        state.transcript = manualText;
        refs.transcriptBox.textContent = manualText;
        refs.transcriptBox.classList.remove("is-placeholder");
        evaluateAttempt(manualText, "manual");
    }

    function evaluateAttempt(spokenText, source) {
        const item = currentItem();
        const spoken = normalizeSpacing(spokenText);
        const bestMatch = bestReferenceMatch(spoken, item.answers);
        const checkpoints = item.checkpoints.map((checkpoint) => ({
            ...checkpoint,
            matched: checkpoint.variants.some((variant) => normalizeText(spoken).includes(normalizeText(variant)))
        }));
        const requiredMissing = checkpoints.filter((checkpoint) => checkpoint.required && !checkpoint.matched);
        const matchedCount = checkpoints.filter((checkpoint) => checkpoint.matched).length;
        const coverage = Math.round((matchedCount / checkpoints.length) * 100);
        const exact = item.answers.some((answer) => normalizeText(answer) === normalizeText(spoken));
        const correct = requiredMissing.length === 0 && (bestMatch.score >= 54 || exact);
        const almost = !correct && requiredMissing.length <= 1 && bestMatch.score >= 40;

        const evaluation = {
            itemId: item.id,
            spoken,
            source,
            correct,
            almost,
            coverage,
            score: bestMatch.score,
            accuracy: bestMatch.accuracy,
            completeness: bestMatch.completeness,
            missingLabels: requiredMissing.map((checkpoint) => checkpoint.label),
            modelSentence: item.answers[0]
        };

        state.results.set(item.id, evaluation);
        updateScoreboard();
        renderFeedback(evaluation);
        refs.exampleBtn.disabled = false;
        refs.nextBtn.disabled = false;
        state.focusAction = "next";
        updateActionFocus();
    }

    function renderFeedback(result) {
        const tone = result.correct ? "good" : result.almost ? "mid" : "bad";
        const headline = result.correct
            ? "정답"
            : result.almost
                ? "거의"
                : "다시";

        const message = result.correct
            ? (result.coverage === 100
                ? "핵심 단서 완료"
                : "핵심 구조 완료")
            : result.almost
                ? `빠짐 · ${result.missingLabels.join(" · ")}`
                : (result.missingLabels.length
                    ? `빠짐 · ${result.missingLabels.join(" · ")}`
                    : "문형 다시");

        refs.feedbackBox.className = `feedback-box ${tone}`;
        refs.feedbackBox.innerHTML = `
            <p class="feedback-box__headline">${escapeHtml(headline)}</p>
            <p class="feedback-box__body">${escapeHtml(message)}</p>
            <div class="feedback-metrics">
                <span>유사도 ${result.score}</span>
                <span>핵심 단서 ${result.coverage}%</span>
                <span>${result.source === "speech" ? "음성" : "입력"}</span>
            </div>
        `;
        refs.modelWrap.classList.remove("hidden");
    }

    function speakModelSentence() {
        if (state.index >= QUIZ_ITEMS.length) {
            return;
        }
        const utterance = new SpeechSynthesisUtterance(currentItem().answers[0]);
        utterance.lang = "ko-KR";
        utterance.rate = 0.92;
        const voices = window.speechSynthesis?.getVoices?.() || [];
        const koreanVoice = voices.find((voice) => voice.lang && voice.lang.toLowerCase().startsWith("ko"));
        if (koreanVoice) {
            utterance.voice = koreanVoice;
        }
        window.speechSynthesis?.cancel();
        window.speechSynthesis?.speak(utterance);
    }

    function goNext() {
        if (refs.nextBtn.disabled) {
            return;
        }
        stopListening(true);
        state.index += 1;
        renderCurrentItem();
    }

    function resetCurrentAttempt(removeSavedResult) {
        stopListening(true);
        if (removeSavedResult && state.index < QUIZ_ITEMS.length) {
            state.results.delete(currentItem().id);
            updateScoreboard();
        }
        state.transcript = "";
        state.finalTranscript = "";
        refs.transcriptBox.textContent = "...";
        refs.transcriptBox.classList.add("is-placeholder");
        refs.speechMeta.textContent = STT_SUPPORTED
            ? "대기"
            : "직접 입력";
        refs.feedbackBox.className = "feedback-box hidden";
        refs.feedbackBox.innerHTML = "";
        refs.modelWrap.classList.add("hidden");
        refs.exampleBtn.disabled = true;
        refs.nextBtn.disabled = true;
        refs.manualInput.value = "";
        state.focusAction = "mic";
        updateActionFocus();
    }

    function renderSummary() {
        const results = QUIZ_ITEMS.map((item) => state.results.get(item.id)).filter(Boolean);
        const correct = results.filter((entry) => entry.correct).length;
        const rate = results.length ? Math.round((correct / QUIZ_ITEMS.length) * 100) : 0;
        const retryItems = QUIZ_ITEMS
            .map((item) => ({ item, result: state.results.get(item.id) }))
            .filter(({ result }) => !result || !result.correct);

        refs.summaryCorrect.textContent = `${correct} / ${QUIZ_ITEMS.length}`;
        refs.summaryRate.textContent = `${rate}%`;
        refs.summaryRetry.innerHTML = retryItems.length
            ? retryItems
                .map(({ item, result }) => `
                    <article class="summary-item">
                        <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.alt)}" />
                        <div>
                            <p class="summary-item__title">${escapeHtml(item.answers[0])}</p>
                            ${result?.spoken ? `<p class="summary-item__spoken">${escapeHtml(result.spoken)}</p>` : ""}
                        </div>
                    </article>
                `)
                .join("")
            : `<article class="summary-item summary-item--clear"><div><p class="summary-item__title">ALL CLEAR</p></div></article>`;

        refs.summaryPanel.classList.remove("hidden");
        refs.statusPill.className = "status-pill";
        refs.statusPill.textContent = "FINISHED";
        refs.promptText.textContent = "END";
        refs.sceneTitle.textContent = "완료";
        refs.sceneImage.src = "../assets/c14/grammar/images/g1-picture-quiz/g1pq_16_travel.webp";
        refs.sceneImage.alt = "마지막 그림 미리보기";
        refs.progressText.textContent = `${QUIZ_ITEMS.length} / ${QUIZ_ITEMS.length}`;
        refs.progressBar.style.width = "100%";
        refs.leadWords.innerHTML = '<span class="word-pill word-pill--lead">선행절</span>';
        refs.tailWords.innerHTML = '<span class="word-pill word-pill--tail">후행절</span>';
        refs.transcriptBox.textContent = "FINISH";
        refs.transcriptBox.classList.remove("is-placeholder");
        refs.speechMeta.textContent = "REVIEW";
        refs.feedbackBox.className = "feedback-box hidden";
        refs.feedbackBox.innerHTML = "";
        refs.modelWrap.classList.add("hidden");
        refs.exampleBtn.disabled = true;
        refs.nextBtn.disabled = true;
        state.focusAction = "";
        updateActionFocus();
    }

    function restartQuiz() {
        stopListening(true);
        state.index = 0;
        state.transcript = "";
        state.finalTranscript = "";
        state.results = new Map();
        renderCurrentItem();
    }

    function bestReferenceMatch(spoken, answers) {
        return answers.reduce((best, answer) => {
            const scored = compareSentences(spoken, answer);
            return scored.score > best.score ? scored : best;
        }, { score: 0, accuracy: 0, completeness: 0 });
    }

    function compareSentences(spoken, answer) {
        const target = decomposeHangul(normalizeText(answer));
        const output = decomposeHangul(normalizeText(spoken));
        if (!target.length || !output.length) {
            return { score: 0, accuracy: 0, completeness: 0 };
        }

        const common = longestCommonSubsequence(target, output);
        const accuracy = Math.round((common / target.length) * 100);
        const completeness = Math.round((common / Math.max(target.length, output.length || 1)) * 100);
        return {
            accuracy,
            completeness,
            score: Math.round((accuracy * 0.65) + (completeness * 0.35))
        };
    }

    function longestCommonSubsequence(left, right) {
        const rows = left.length + 1;
        const cols = right.length + 1;
        const table = Array.from({ length: rows }, () => new Array(cols).fill(0));

        for (let row = 1; row < rows; row += 1) {
            for (let col = 1; col < cols; col += 1) {
                if (left[row - 1] === right[col - 1]) {
                    table[row][col] = table[row - 1][col - 1] + 1;
                } else {
                    table[row][col] = Math.max(table[row - 1][col], table[row][col - 1]);
                }
            }
        }

        return table[left.length][right.length];
    }

    function decomposeHangul(value) {
        let output = "";
        for (const char of value) {
            const code = char.charCodeAt(0);
            if (code >= 0xac00 && code <= 0xd7a3) {
                const offset = code - 0xac00;
                const jong = offset % 28;
                const jung = ((offset - jong) / 28) % 21;
                const cho = Math.floor((offset - jong) / 28 / 21);
                output += CHOSEONG[cho] + JUNGSEONG[jung] + (jong ? JONGSEONG[jong] : "");
            } else {
                output += char;
            }
        }
        return output;
    }

    function normalizeText(value) {
        return String(value || "")
            .toLowerCase()
            .replace(/[\s.,!?~"'`()[\]{}:;/-]/g, "");
    }

    function normalizeSpacing(value) {
        return String(value || "").replace(/\s+/g, " ").trim();
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function escapeAttr(value) {
        return escapeHtml(value);
    }
})();
