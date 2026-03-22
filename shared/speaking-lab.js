(() => {
    const STORAGE_KEY = 'korean-speaking-lab-history-v1';
    const CUSTOM_KEY = 'korean-speaking-lab-custom-v1';
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    const T = {
        pageTitle: '\uD55C\uAD6D\uC5B4 \uB9D0\uD558\uAE30 \uB7A9',
        badge: 'GitHub Pages \uB9D0\uD558\uAE30 \uC5F0\uC2B5',
        heading: '\uD55C\uAD6D\uC5B4 \uB9D0\uD558\uAE30 \uB7A9',
        subtitle: '\uC11C\uBC84 \uC5C6\uC774 \uB3D9\uC791\uD558\uB294 GitHub Pages \uC6A9 \uB9D0\uD558\uAE30 \uC608\uC2DC\uC785\uB2C8\uB2E4. \uC608\uBB38 \uB4E3\uAE30, \uC74C\uC131 \uC778\uC2DD, \uB179\uC74C \uC7AC\uC0DD, \uD30C\uD615 \uC2DC\uAC01\uD654, \uD559\uC2B5 \uAE30\uB85D\uAE4C\uC9C0 \uBE0C\uB77C\uC6B0\uC800 \uB9CC\uC73C\uB85C \uAD6C\uD604\uD588\uC2B5\uB2C8\uB2E4.',
        backToHome: '\uBA54\uC778 \uD398\uC774\uC9C0\uB85C',
        practiceDeckLabel: '\uC5F0\uC2B5 \uBB38\uC7A5',
        practiceDeckTitle: '\uBB38\uC7A5 \uBC45\uD06C',
        customLabel: '\uC9C1\uC811 \uC785\uB825',
        customPlaceholder: '\uD559\uC0DD\uC774 \uB530\uB77C \uB9D0\uD560 \uBB38\uC7A5\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.',
        addSentence: '\uBB38\uC7A5 \uCD94\uAC00',
        targetLabel: '\uC624\uB298\uC758 \uBAA9\uD45C \uBB38\uC7A5',
        defaultTarget: '\uBB38\uC7A5\uC744 \uACE0\uB974\uC138\uC694',
        speakNormal: '\uD45C\uC900 \uC18D\uB3C4',
        speakSlow: '\uCC9C\uCC9C\uD788',
        studioLabel: '\uB9D0\uD558\uAE30 \uC2A4\uD29C\uB514\uC624',
        idleStatus: '\uBB38\uC7A5\uC744 \uACE0\uB978 \uB4A4 \uB9C8\uC774\uD06C\uB97C \uB20C\uB7EC \uC5F0\uC2B5\uC744 \uC2DC\uC791\uD558\uC138\uC694.',
        recordingStatus: '\uB179\uC74C \uC911\uC785\uB2C8\uB2E4. \uC785 \uBAA8\uC591\uACFC \uD638\uD761\uC744 \uC758\uC2DD\uD558\uBA74\uC11C \uC790\uC5F0\uC2A4\uB7FD\uAC8C \uB9D0\uD574 \uBCF4\uC138\uC694.',
        resetAttempt: '\uD45C\uC2DC \uCD08\uAE30\uD654',
        readyPill: 'READY',
        recordingPill: 'RECORDING',
        volumeLabel: '\uBCFC\uB968',
        durationLabel: '\uB179\uC74C \uAE38\uC774',
        peakLabel: '\uCD5C\uB300 \uBCFC\uB968',
        recognitionLabel: '\uC778\uC2DD \uACB0\uACFC',
        recognitionTitle: '\uC2E4\uC2DC\uAC04 \uBC1C\uD654 \uD45C\uC2DC',
        recognitionPlaceholder: '\uC5EC\uAE30\uC5D0 \uD559\uC0DD\uC758 \uBC1C\uD654\uAC00 \uC2E4\uC2DC\uAC04\uC73C\uB85C \uD45C\uC2DC\uB429\uB2C8\uB2E4.',
        recognitionHint: '\uC774 \uC810\uC218\uB294 \uBE0C\uB77C\uC6B0\uC800 STT \uACB0\uACFC\uB97C \uAE30\uBC18\uC73C\uB85C \uD55C \uCC38\uACE0\uC6A9 \uCD94\uC815\uCE58\uC785\uB2C8\uB2E4.',
        recognitionFallback: '\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 \uC74C\uC131 \uC778\uC2DD \uC9C0\uC6D0\uC774 \uC81C\uD55C\uC801\uC774\uC5B4\uC11C \uB179\uC74C \uCCAD\uCDE8 \uC5F0\uC2B5 \uC704\uC8FC\uB85C \uB3D9\uC791\uD569\uB2C8\uB2E4.',
        resultEstimate: '\uBE0C\uB77C\uC6B0\uC800 \uAE30\uBC18 \uCD94\uC815 \uACB0\uACFC',
        scoreLabel: '\uC885\uD569 \uC810\uC218',
        accuracyLabel: '\uC77C\uCE58\uB3C4',
        completenessLabel: '\uC644\uC131\uB3C4',
        targetCompact: '\uBAA9\uD45C \uBB38\uC7A5',
        spokenCompact: '\uC778\uC2DD \uBB38\uC7A5',
        recordedVoiceLabel: '\uB179\uC74C \uB9AC\uD50C\uB808\uC774',
        recordedVoiceTitle: '\uB2E4\uC2DC \uB4E3\uAE30',
        playbackWaiting: '\uB179\uC74C\uC744 \uD558\uBA74 \uC5EC\uAE30\uC5D0 \uD30C\uD615\uACFC \uC7AC\uC0DD \uC81C\uC5B4\uAC00 \uB098\uD0C0\uB0A9\uB2C8\uB2E4.',
        playback: '\uC7AC\uC0DD',
        pause: '\uC77C\uC2DC\uC815\uC9C0',
        download: '\uB2E4\uC6B4\uB85C\uB4DC',
        progressLabel: '\uC5F0\uC2B5 \uAE30\uB85D',
        recentAttempts: '\uCD5C\uADFC \uC2DC\uB3C4',
        clearHistory: '\uAE30\uB85D \uC9C0\uC6B0\uAE30',
        sessionAttempts: '\uC138\uC158 \uC2DC\uB3C4',
        sessionBest: '\uC138\uC158 \uCD5C\uACE0',
        sessionAverage: '\uC138\uC158 \uD3C9\uADE0',
        warningRecognition: '\uC774 \uBE0C\uB77C\uC6B0\uC800\uB294 Web Speech \uC74C\uC131 \uC778\uC2DD \uC9C0\uC6D0\uC774 \uC81C\uD55C\uC801\uC785\uB2C8\uB2E4. Chrome \uB610\uB294 Edge \uCD5C\uC2E0 \uBC84\uC804\uC744 \uAD8C\uC7A5\uD569\uB2C8\uB2E4.',
        warningMicrophone: '\uB9C8\uC774\uD06C, MediaRecorder, Web Audio API \uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. GitHub Pages \uBC30\uD3EC\uB294 HTTPS \uB97C \uC81C\uACF5\uD558\uBBC0\uB85C \uCD5C\uC2E0 \uBE0C\uB77C\uC6B0\uC800\uB97C \uAD8C\uC7A5\uD569\uB2C8\uB2E4.',
        noSentence: '\uBA3C\uC800 \uC5F0\uC2B5 \uBB38\uC7A5\uC744 \uACE0\uB974\uC138\uC694.',
        noCustomText: '\uCD94\uAC00\uD560 \uBB38\uC7A5\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.',
        recorderError: '\uB9C8\uC774\uD06C \uC5F0\uACB0\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.',
        heardNothing: '\uB9D0\uD55C \uB0B4\uC6A9\uC744 \uC778\uC2DD\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uCC9C\uCC9C\uD788 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uBCF4\uC138\uC694.',
        sttUnavailableActive: '\uB179\uC74C\uC740 \uC9C4\uD589 \uB418\uC9C0\uB9CC \uC74C\uC131 \uC778\uC2DD\uC740 \uC5C6\uC2B5\uB2C8\uB2E4. \uD30C\uD615\uACFC \uC7AC\uC0DD\uC744 \uD65C\uC6A9\uD574 \uC790\uAC00 \uCCAD\uCDE8 \uC5F0\uC2B5\uC744 \uD574 \uBCF4\uC138\uC694.',
        clearHistoryConfirm: '\uC800\uC7A5\uB41C \uAE30\uB85D\uC744 \uBAA8\uB450 \uC9C0\uC6B8\uAE4C\uC694?',
        noHistory: '\uC544\uC9C1 \uC800\uC7A5\uB41C \uC2DC\uB3C4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.',
        addComplete: '\uC0C8 \uBB38\uC7A5\uC744 \uCD94\uAC00\uD588\uC2B5\uB2C8\uB2E4.',
        playedStandard: '\uD45C\uC900 \uC18D\uB3C4\uB85C \uBB38\uC7A5\uC744 \uB4E4\uB824\uB4DC\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4.',
        playedSlow: '\uCC9C\uCC9C\uD55C \uC18D\uB3C4\uB85C \uBB38\uC7A5\uC744 \uB4E4\uB824\uB4DC\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4.',
        historySpokenPrefix: '\uC778\uC2DD',
        browserEstimateNote: '\uC11C\uBC84 \uC5C6\uC774 \uB3D9\uC791\uD558\uB294 \uBE0C\uB77C\uC6B0\uC800 \uAE30\uBC18 \uC608\uC2DC\uC785\uB2C8\uB2E4.',
        sessionFilePrefix: 'korean-speaking-practice',
        feedbackExcellent: '\uBB38\uC7A5 \uC77C\uCE58\uB3C4\uAC00 \uB9E4\uC6B0 \uB192\uC2B5\uB2C8\uB2E4.',
        feedbackGood: '\uD575\uC2EC \uD45C\uD604\uC744 \uC798 \uC0B4\uB838\uC2B5\uB2C8\uB2E4.',
        feedbackRetry: '\uD575\uC2EC \uC74C\uC808\uC744 \uCC9C\uCC9C\uD788 \uB2E4\uC2DC \uB530\uB77C \uB9D0\uD574 \uBCF4\uC138\uC694.',
        feedbackLowVolume: '\uBAA9\uC18C\uB9AC\uAC00 \uC791\uAC8C \uB4E4\uC5B4\uAC14\uC5B4\uC694. \uB9C8\uC774\uD06C\uC5D0\uC11C \uC870\uAE08 \uAC00\uAE5D\uAC8C, \uB610\uB839\uB839\uD558\uAC8C \uB9D0\uD574 \uBCF4\uC138\uC694.',
        feedbackHighVolume: '\uC18C\uB9AC\uAC00 \uAC15\uD558\uAC8C \uB4E4\uC5B4\uC640\uC11C \uD30C\uD615\uC774 \uD2C8\uACE0 \uC788\uC5B4\uC694. \uB9C8\uC774\uD06C\uC640 \uC870\uAE08 \uAC70\uB9AC\uB97C \uB450\uACE0 \uB9D0\uD574 \uBCF4\uC138\uC694.',
        feedbackQuick: '\uBC1C\uD654 \uAE38\uC774\uAC00 \uC9E7\uC740 \uD3B8\uC785\uB2C8\uB2E4. \uB04A\uC9C0 \uB9D0\uACE0 \uBB38\uC7A5 \uB05D\uAE4C\uC9C0 \uB9D0\uD574 \uBCF4\uC138\uC694.',
        feedbackSteady: '\uD638\uD761\uC774 \uB108\uBB34 \uAE09\uD558\uC9C0 \uC54A\uC544 \uB4E3\uAE30 \uC88B\uC2B5\uB2C8\uB2E4.'
    };

    const sentenceSets = [
        {
            key: 'greetings',
            label: '\uC77C\uC0C1 \uC778\uC0AC',
            items: [
                { text: '\uC548\uB155\uD558\uC138\uC694.', meaning: 'Hello. (formal)' },
                { text: '\uAC10\uC0AC\uD569\uB2C8\uB2E4.', meaning: 'Thank you.' },
                { text: '\uBC18\uAC11\uC2B5\uB2C8\uB2E4.', meaning: 'Nice to meet you.' },
                { text: '\uC624\uB298 \uAE30\uBD84\uC774 \uC88B\uC544\uC694.', meaning: 'I feel good today.' }
            ]
        },
        {
            key: 'self',
            label: '\uC790\uAE30 \uC18C\uAC1C',
            items: [
                { text: '\uC800\uB294 \uD55C\uAD6D\uC5B4\uB97C \uACF5\uBD80\uD558\uB294 \uD559\uC0DD\uC785\uB2C8\uB2E4.', meaning: 'I am a student learning Korean.' },
                { text: '\uC81C \uC774\uB984\uC740 \uBBFC\uC900\uC785\uB2C8\uB2E4.', meaning: 'My name is Minjun.' },
                { text: '\uD55C\uAD6D \uC74C\uC2DD\uC744 \uC88B\uC544\uD574\uC694.', meaning: 'I like Korean food.' },
                { text: '\uC8FC\uB9D0\uC5D0 \uCE5C\uAD6C\uB97C \uB9CC\uB098\uC694.', meaning: 'I meet my friend on weekends.' }
            ]
        },
        {
            key: 'classroom',
            label: '\uC218\uC5C5 \uD45C\uD604',
            items: [
                { text: '\uC120\uC0DD\uB2D8, \uD55C \uBC88 \uB354 \uC124\uBA85\uD574 \uC8FC\uC138\uC694.', meaning: 'Please explain it one more time.' },
                { text: '\uC774 \uB2E8\uC5B4\uB97C \uC5B4\uB5BB\uAC8C \uBC1C\uC74C\uD574\uC694?', meaning: 'How do I pronounce this word?' },
                { text: '\uC9C0\uAE08 \uC2DC\uC791\uD574\uB3C4 \uB420\uAE4C\uC694?', meaning: 'May I start now?' },
                { text: '\uC624\uB298 \uC219\uC81C\uB97C \uBAA8\uB450 \uD588\uC2B5\uB2C8\uB2E4.', meaning: 'I finished all of today\'s homework.' }
            ]
        },
        {
            key: 'custom',
            label: '\uC9C1\uC811 \uC785\uB825',
            items: loadCustomSentences()
        }
    ];

    const refs = {
        backText: document.getElementById('backText'),
        badgeText: document.getElementById('badgeText'),
        pageHeading: document.getElementById('pageHeading'),
        pageSubtitle: document.getElementById('pageSubtitle'),
        sessionAttemptsLabel: document.getElementById('sessionAttemptsLabel'),
        sessionBestLabel: document.getElementById('sessionBestLabel'),
        sessionAverageLabel: document.getElementById('sessionAverageLabel'),
        recognitionWarning: document.getElementById('recognitionWarning'),
        recognitionWarningText: document.getElementById('recognitionWarningText'),
        microphoneWarning: document.getElementById('microphoneWarning'),
        microphoneWarningText: document.getElementById('microphoneWarningText'),
        practiceDeckLabel: document.getElementById('practiceDeckLabel'),
        practiceDeckTitle: document.getElementById('practiceDeckTitle'),
        statusPill: document.getElementById('statusPill'),
        setTabs: document.getElementById('setTabs'),
        customComposer: document.getElementById('customComposer'),
        customLabel: document.getElementById('customLabel'),
        customSentenceInput: document.getElementById('customSentenceInput'),
        addSentenceBtn: document.getElementById('addSentenceBtn'),
        addSentenceText: document.getElementById('addSentenceText'),
        sentenceList: document.getElementById('sentenceList'),
        targetLabel: document.getElementById('targetLabel'),
        targetText: document.getElementById('targetText'),
        targetMeaning: document.getElementById('targetMeaning'),
        speakNormalBtn: document.getElementById('speakNormalBtn'),
        speakSlowBtn: document.getElementById('speakSlowBtn'),
        speakNormalText: document.getElementById('speakNormalText'),
        speakSlowText: document.getElementById('speakSlowText'),
        studioLabel: document.getElementById('studioLabel'),
        statusText: document.getElementById('statusText'),
        micButton: document.getElementById('micButton'),
        micIcon: document.getElementById('micIcon'),
        resetAttemptBtn: document.getElementById('resetAttemptBtn'),
        resetAttemptText: document.getElementById('resetAttemptText'),
        liveWaveCanvas: document.getElementById('liveWaveCanvas'),
        volumeLabel: document.getElementById('volumeLabel'),
        levelText: document.getElementById('levelText'),
        levelBar: document.getElementById('levelBar'),
        durationLabel: document.getElementById('durationLabel'),
        recordingDuration: document.getElementById('recordingDuration'),
        peakLabel: document.getElementById('peakLabel'),
        peakLevel: document.getElementById('peakLevel'),
        recognitionLabel: document.getElementById('recognitionLabel'),
        recognitionTitle: document.getElementById('recognitionTitle'),
        recognizedBox: document.getElementById('recognizedBox'),
        recognitionHint: document.getElementById('recognitionHint'),
        resultPanel: document.getElementById('resultPanel'),
        resultEstimateLabel: document.getElementById('resultEstimateLabel'),
        scoreLabel: document.getElementById('scoreLabel'),
        accuracyLabel: document.getElementById('accuracyLabel'),
        completenessLabel: document.getElementById('completenessLabel'),
        scoreValue: document.getElementById('scoreValue'),
        accuracyValue: document.getElementById('accuracyValue'),
        completenessValue: document.getElementById('completenessValue'),
        feedbackMsg: document.getElementById('feedbackMsg'),
        targetCompactLabel: document.getElementById('targetCompactLabel'),
        spokenCompactLabel: document.getElementById('spokenCompactLabel'),
        targetDisplay: document.getElementById('targetDisplay'),
        spokenDisplay: document.getElementById('spokenDisplay'),
        recordedVoiceLabel: document.getElementById('recordedVoiceLabel'),
        recordedVoiceTitle: document.getElementById('recordedVoiceTitle'),
        playbackWaveform: document.getElementById('playbackWaveform'),
        recordedAudio: document.getElementById('recordedAudio'),
        audioMeta: document.getElementById('audioMeta'),
        playbackBtn: document.getElementById('playbackBtn'),
        playbackText: document.getElementById('playbackText'),
        downloadBtn: document.getElementById('downloadBtn'),
        downloadText: document.getElementById('downloadText'),
        progressLabel: document.getElementById('progressLabel'),
        recentAttemptsTitle: document.getElementById('recentAttemptsTitle'),
        clearHistoryBtn: document.getElementById('clearHistoryBtn'),
        clearHistoryText: document.getElementById('clearHistoryText'),
        historyList: document.getElementById('historyList'),
        attemptCount: document.getElementById('attemptCount'),
        bestScore: document.getElementById('bestScore'),
        avgScore: document.getElementById('avgScore')
    };

    const state = {
        currentSetIndex: 0,
        currentSentenceIndex: 0,
        currentSentence: null,
        sessionScores: [],
        history: loadHistory(),
        isRecording: false,
        mediaStream: null,
        mediaRecorder: null,
        audioChunks: [],
        recordedBlob: null,
        recordedUrl: '',
        recordingMimeType: '',
        recordingStartedAt: 0,
        recordingDurationMs: 0,
        peakLevel: 0,
        audioContext: null,
        analyser: null,
        sourceNode: null,
        timeData: null,
        animationFrameId: 0,
        timerId: 0,
        recognition: null,
        latestTranscript: '',
        finalTranscript: '',
        wavesurfer: null
    };

    const hasRecognition = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    const hasRecorder = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder && AudioContextClass);

    bootstrap();

    function bootstrap() {
        applyTranslations();
        bindEvents();
        renderWarnings();
        renderTabs();
        selectSet(0);
        renderHistory();
        updateSessionStats();
        resizeLiveCanvas();
        drawIdleWave();
        updatePlaybackControls(false);
        window.addEventListener('resize', resizeLiveCanvas);
        window.addEventListener('beforeunload', cleanupResources);
        window.speechSynthesis?.getVoices();
        if (window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
        }
    }

    function applyTranslations() {
        document.title = T.pageTitle;
        refs.backText.textContent = T.backToHome;
        refs.badgeText.textContent = T.badge;
        refs.pageHeading.textContent = T.heading;
        refs.pageSubtitle.textContent = T.subtitle;
        refs.sessionAttemptsLabel.textContent = T.sessionAttempts;
        refs.sessionBestLabel.textContent = T.sessionBest;
        refs.sessionAverageLabel.textContent = T.sessionAverage;
        refs.practiceDeckLabel.textContent = T.practiceDeckLabel;
        refs.practiceDeckTitle.textContent = T.practiceDeckTitle;
        refs.customLabel.textContent = T.customLabel;
        refs.customSentenceInput.placeholder = T.customPlaceholder;
        refs.addSentenceText.textContent = T.addSentence;
        refs.targetLabel.textContent = T.targetLabel;
        refs.targetText.textContent = T.defaultTarget;
        refs.speakNormalText.textContent = T.speakNormal;
        refs.speakSlowText.textContent = T.speakSlow;
        refs.studioLabel.textContent = T.studioLabel;
        refs.statusText.textContent = T.idleStatus;
        refs.resetAttemptText.textContent = T.resetAttempt;
        refs.statusPill.textContent = T.readyPill;
        refs.volumeLabel.textContent = T.volumeLabel;
        refs.durationLabel.textContent = T.durationLabel;
        refs.peakLabel.textContent = T.peakLabel;
        refs.recognitionLabel.textContent = T.recognitionLabel;
        refs.recognitionTitle.textContent = T.recognitionTitle;
        refs.recognizedBox.textContent = T.recognitionPlaceholder;
        refs.recognitionHint.textContent = hasRecognition ? T.recognitionHint : T.recognitionFallback;
        refs.resultEstimateLabel.textContent = T.resultEstimate;
        refs.scoreLabel.textContent = T.scoreLabel;
        refs.accuracyLabel.textContent = T.accuracyLabel;
        refs.completenessLabel.textContent = T.completenessLabel;
        refs.targetCompactLabel.textContent = T.targetCompact;
        refs.spokenCompactLabel.textContent = T.spokenCompact;
        refs.recordedVoiceLabel.textContent = T.recordedVoiceLabel;
        refs.recordedVoiceTitle.textContent = T.recordedVoiceTitle;
        refs.playbackText.textContent = T.playback;
        refs.downloadText.textContent = T.download;
        refs.progressLabel.textContent = T.progressLabel;
        refs.recentAttemptsTitle.textContent = T.recentAttempts;
        refs.clearHistoryText.textContent = T.clearHistory;
        refs.recognitionWarningText.textContent = T.warningRecognition;
        refs.microphoneWarningText.textContent = T.warningMicrophone;
        refs.feedbackMsg.textContent = T.browserEstimateNote;
    }

    function bindEvents() {
        refs.addSentenceBtn.addEventListener('click', addCustomSentence);
        refs.speakNormalBtn.addEventListener('click', () => speakTarget(1, T.playedStandard));
        refs.speakSlowBtn.addEventListener('click', () => speakTarget(0.82, T.playedSlow));
        refs.micButton.addEventListener('click', toggleRecording);
        refs.resetAttemptBtn.addEventListener('click', resetAttemptUi);
        refs.playbackBtn.addEventListener('click', togglePlayback);
        refs.clearHistoryBtn.addEventListener('click', clearHistory);
        refs.recordedAudio.addEventListener('play', () => updatePlaybackLabel(true));
        refs.recordedAudio.addEventListener('pause', () => updatePlaybackLabel(false));
        refs.recordedAudio.addEventListener('ended', () => updatePlaybackLabel(false));
    }

    function renderWarnings() {
        refs.recognitionWarning.classList.toggle('hidden', hasRecognition);
        refs.microphoneWarning.classList.toggle('hidden', hasRecorder && isSecureContextOrLocalhost());
    }

    function renderTabs() {
        refs.setTabs.innerHTML = '';
        sentenceSets.forEach((set, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'tab-btn rounded-2xl px-4 py-2 text-sm font-semibold';
            button.textContent = set.label;
            button.addEventListener('click', () => selectSet(index));
            if (index === state.currentSetIndex) {
                button.classList.add('active');
            }
            refs.setTabs.appendChild(button);
        });
    }

    function selectSet(index) {
        state.currentSetIndex = index;
        state.currentSentenceIndex = 0;
        renderTabs();
        refs.customComposer.classList.toggle('hidden', sentenceSets[index].key !== 'custom');
        renderSentenceList();
        if (sentenceSets[index].items.length > 0) {
            selectSentence(0);
        } else {
            state.currentSentence = null;
            refs.targetText.textContent = T.defaultTarget;
            refs.targetMeaning.textContent = '';
            resetAttemptUi();
        }
    }

    function renderSentenceList() {
        const currentSet = sentenceSets[state.currentSetIndex];
        refs.sentenceList.innerHTML = '';
        if (currentSet.items.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'rounded-2xl border border-dashed border-white/10 bg-slate-950/35 p-6 text-center text-sm text-slate-400';
            empty.textContent = T.customPlaceholder;
            refs.sentenceList.appendChild(empty);
            return;
        }

        currentSet.items.forEach((item, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'sentence-item w-full rounded-3xl p-4 text-left';
            if (index === state.currentSentenceIndex) {
                button.classList.add('active');
            }
            button.innerHTML = `
                <div class="flex items-start justify-between gap-3">
                    <div>
                        <p class="text-base font-semibold text-white">${escapeHtml(item.text)}</p>
                        <p class="mt-2 text-sm text-slate-400">${escapeHtml(item.meaning || '')}</p>
                    </div>
                    <span class="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1 text-xs font-bold text-slate-400">${index + 1}</span>
                </div>
            `;
            button.addEventListener('click', () => selectSentence(index));
            refs.sentenceList.appendChild(button);
        });
    }

    function selectSentence(index) {
        state.currentSentenceIndex = index;
        state.currentSentence = sentenceSets[state.currentSetIndex].items[index];
        refs.targetText.textContent = state.currentSentence.text;
        refs.targetMeaning.textContent = state.currentSentence.meaning || '';
        renderSentenceList();
        resetAttemptUi();
    }

    function addCustomSentence() {
        const text = refs.customSentenceInput.value.trim();
        if (!text) {
            alert(T.noCustomText);
            return;
        }
        sentenceSets[sentenceSets.length - 1].items.unshift({ text, meaning: T.customLabel });
        refs.customSentenceInput.value = '';
        persistCustomSentences();
        renderSentenceList();
        selectSentence(0);
        setStatus(T.addComplete);
    }

    function speakTarget(rate, statusMessage) {
        if (!state.currentSentence || !window.speechSynthesis) {
            return;
        }
        const utterance = new SpeechSynthesisUtterance(state.currentSentence.text);
        utterance.lang = 'ko-KR';
        utterance.rate = rate;
        const voices = window.speechSynthesis.getVoices();
        const koreanVoice = voices.find((voice) => voice.lang && voice.lang.toLowerCase().startsWith('ko'));
        if (koreanVoice) {
            utterance.voice = koreanVoice;
        }
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
        setStatus(statusMessage);
    }

    async function toggleRecording() {
        if (state.isRecording) {
            stopRecording();
            return;
        }
        if (!state.currentSentence) {
            alert(T.noSentence);
            return;
        }
        if (!hasRecorder) {
            refs.microphoneWarning.classList.remove('hidden');
            setStatus(T.warningMicrophone);
            return;
        }
        await startRecording();
    }

    async function startRecording() {
        resetAttemptUi(true);
        setRecordingUi(true);
        try {
            state.mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    channelCount: 1
                }
            });
            setupVisualizer(state.mediaStream);
            startRecorder(state.mediaStream);
            startRecognition();
            state.isRecording = true;
            state.recordingStartedAt = Date.now();
            state.recordingDurationMs = 0;
            state.peakLevel = 0;
            state.latestTranscript = '';
            state.finalTranscript = '';
            updateRecordingTimer();
            state.timerId = window.setInterval(updateRecordingTimer, 200);
            renderWave();
            refs.recognizedBox.textContent = hasRecognition ? T.recognitionPlaceholder : T.recognitionFallback;
            setStatus(hasRecognition ? T.recordingStatus : T.sttUnavailableActive);
        } catch (error) {
            console.error(error);
            setRecordingUi(false);
            cleanupMedia();
            setStatus(`${T.recorderError} ${error.message || ''}`.trim());
        }
    }

    function startRecorder(stream) {
        state.audioChunks = [];
        state.recordingMimeType = chooseRecordingMimeType();
        const options = state.recordingMimeType ? { mimeType: state.recordingMimeType } : undefined;
        state.mediaRecorder = new MediaRecorder(stream, options);
        state.mediaRecorder.addEventListener('dataavailable', (event) => {
            if (event.data && event.data.size > 0) {
                state.audioChunks.push(event.data);
            }
        });
        state.mediaRecorder.addEventListener('stop', () => {
            if (state.audioChunks.length === 0) {
                return;
            }
            state.recordedBlob = new Blob(state.audioChunks, {
                type: state.recordingMimeType || state.audioChunks[0].type || 'audio/webm'
            });
            setRecordedAudio(state.recordedBlob);
            state.audioChunks = [];
        });
        state.mediaRecorder.start(250);
    }

    function startRecognition() {
        if (!hasRecognition) {
            return;
        }
        const RecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
        state.recognition = new RecognitionClass();
        state.recognition.lang = 'ko-KR';
        state.recognition.continuous = true;
        state.recognition.interimResults = true;
        state.recognition.maxAlternatives = 1;
        state.recognition.onresult = (event) => {
            let transcript = '';
            let final = '';
            for (let index = event.resultIndex; index < event.results.length; index += 1) {
                const phrase = event.results[index][0].transcript.trim();
                if (event.results[index].isFinal) {
                    final += `${phrase} `;
                } else {
                    transcript += `${phrase} `;
                }
            }
            state.latestTranscript = (final || transcript).trim();
            if (final.trim()) {
                state.finalTranscript = final.trim();
                window.setTimeout(() => {
                    if (state.isRecording) {
                        stopRecording(state.finalTranscript);
                    }
                }, 300);
            }
            refs.recognizedBox.textContent = state.latestTranscript || T.recognitionPlaceholder;
        };
        state.recognition.onerror = (event) => {
            if (event.error === 'aborted') {
                return;
            }
            console.error('Speech recognition error:', event.error);
            setStatus(`${T.recognitionFallback} (${event.error})`);
        };
        try {
            state.recognition.start();
        } catch (error) {
            console.error(error);
            setStatus(T.sttUnavailableActive);
        }
    }

    function stopRecording(forcedTranscript) {
        if (!state.isRecording && !state.mediaRecorder) {
            return;
        }
        state.isRecording = false;
        stopTimer();
        stopRecognition();
        if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') {
            try {
                state.mediaRecorder.stop();
            } catch (error) {
                console.error(error);
            }
        }
        state.recordingDurationMs = state.recordingDurationMs || (state.recordingStartedAt ? Date.now() - state.recordingStartedAt : 0);
        updateRecordingTimer();
        setRecordingUi(false);
        stopVisualizer();
        stopStreamTracks();
        const transcript = (typeof forcedTranscript === 'string' ? forcedTranscript : (state.finalTranscript || state.latestTranscript || '')).trim();
        if (transcript) {
            refs.recognizedBox.textContent = transcript;
            analyzeResult(transcript);
            setStatus(T.feedbackSteady);
        } else if (hasRecognition) {
            refs.recognizedBox.textContent = T.heardNothing;
            setStatus(T.heardNothing);
        } else {
            setStatus(T.sttUnavailableActive);
        }
    }

    function stopRecognition() {
        if (!state.recognition) {
            return;
        }
        try {
            state.recognition.onresult = null;
            state.recognition.onerror = null;
            state.recognition.stop();
        } catch (error) {
            console.error(error);
        }
        state.recognition = null;
    }

    function setupVisualizer(stream) {
        if (!AudioContextClass) {
            return;
        }
        cleanupAudioContext();
        state.audioContext = new AudioContextClass();
        state.analyser = state.audioContext.createAnalyser();
        state.analyser.fftSize = 2048;
        state.sourceNode = state.audioContext.createMediaStreamSource(stream);
        state.sourceNode.connect(state.analyser);
        state.timeData = new Uint8Array(state.analyser.fftSize);
    }

    function renderWave() {
        if (!state.analyser || !state.timeData) {
            return;
        }
        resizeLiveCanvas();
        const canvas = refs.liveWaveCanvas;
        const context = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        state.analyser.getByteTimeDomainData(state.timeData);
        context.clearRect(0, 0, width, height);
        context.fillStyle = '#081225';
        context.fillRect(0, 0, width, height);
        context.strokeStyle = 'rgba(148, 163, 184, 0.18)';
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(0, height / 2);
        context.lineTo(width, height / 2);
        context.stroke();

        const gradient = context.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#38bdf8');
        gradient.addColorStop(0.5, '#818cf8');
        gradient.addColorStop(1, '#fb7185');
        context.lineWidth = Math.max(2, width / 240);
        context.strokeStyle = gradient;
        context.shadowBlur = 22;
        context.shadowColor = 'rgba(56, 189, 248, 0.35)';
        context.beginPath();

        let sumSquares = 0;
        for (let index = 0; index < state.timeData.length; index += 1) {
            const normalized = (state.timeData[index] - 128) / 128;
            const x = (index / (state.timeData.length - 1)) * width;
            const y = height / 2 + normalized * height * 0.33;
            if (index === 0) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }
            sumSquares += normalized * normalized;
        }
        context.stroke();
        context.shadowBlur = 0;

        const rms = Math.sqrt(sumSquares / state.timeData.length);
        const level = Math.min(100, Math.round(rms * 210));
        state.peakLevel = Math.max(state.peakLevel, level);
        refs.levelBar.style.width = `${level}%`;
        refs.levelText.textContent = `${level}%`;
        refs.peakLevel.textContent = `${state.peakLevel}%`;
        state.animationFrameId = window.requestAnimationFrame(renderWave);
    }

    function stopVisualizer() {
        if (state.animationFrameId) {
            window.cancelAnimationFrame(state.animationFrameId);
            state.animationFrameId = 0;
        }
        cleanupAudioContext();
        refs.levelBar.style.width = '0%';
        refs.levelText.textContent = '0%';
        drawIdleWave();
    }

    function cleanupAudioContext() {
        if (state.sourceNode) {
            try {
                state.sourceNode.disconnect();
            } catch (error) {
                console.error(error);
            }
            state.sourceNode = null;
        }
        if (state.audioContext) {
            try {
                state.audioContext.close();
            } catch (error) {
                console.error(error);
            }
            state.audioContext = null;
        }
        state.analyser = null;
        state.timeData = null;
    }

    function resizeLiveCanvas() {
        const canvas = refs.liveWaveCanvas;
        const ratio = window.devicePixelRatio || 1;
        const width = Math.max(320, Math.floor(canvas.clientWidth * ratio));
        const height = Math.max(160, Math.floor(canvas.clientHeight * ratio));
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }
    }

    function drawIdleWave() {
        resizeLiveCanvas();
        const canvas = refs.liveWaveCanvas;
        const context = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        context.clearRect(0, 0, width, height);
        context.fillStyle = '#081225';
        context.fillRect(0, 0, width, height);
        context.strokeStyle = 'rgba(148, 163, 184, 0.18)';
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(0, height / 2);
        context.lineTo(width, height / 2);
        context.stroke();
        context.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        context.lineWidth = Math.max(2, width / 260);
        context.beginPath();
        const points = 32;
        for (let index = 0; index <= points; index += 1) {
            const x = (index / points) * width;
            const wave = Math.sin((index / points) * Math.PI * 3) * height * 0.04;
            const y = height / 2 + wave;
            if (index === 0) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }
        }
        context.stroke();
    }

    function updateRecordingTimer() {
        if (state.isRecording) {
            state.recordingDurationMs = Date.now() - state.recordingStartedAt;
        }
        refs.recordingDuration.textContent = formatDuration(state.recordingDurationMs);
        refs.peakLevel.textContent = `${state.peakLevel}%`;
    }

    function stopTimer() {
        if (state.timerId) {
            window.clearInterval(state.timerId);
            state.timerId = 0;
        }
    }

    function setRecordingUi(active) {
        refs.micButton.classList.toggle('recording', active);
        refs.statusPill.classList.toggle('recording', active);
        refs.statusPill.textContent = active ? T.recordingPill : T.readyPill;
        refs.micIcon.className = active ? 'fa-solid fa-stop' : 'fa-solid fa-microphone';
    }

    function setRecordedAudio(blob) {
        clearRecordedAudio();
        state.recordedBlob = blob;
        state.recordedUrl = URL.createObjectURL(blob);
        refs.downloadBtn.href = state.recordedUrl;
        refs.downloadBtn.download = `${T.sessionFilePrefix}-${timestampForFile()}.${fileExtensionForMime(blob.type)}`;
        refs.downloadBtn.classList.remove('disabled');
        refs.recordedAudio.src = state.recordedUrl;

        if (window.WaveSurfer) {
            refs.playbackWaveform.innerHTML = '';
            state.wavesurfer = window.WaveSurfer.create({
                container: refs.playbackWaveform,
                waveColor: '#334155',
                progressColor: '#38bdf8',
                cursorColor: '#e2e8f0',
                barWidth: 3,
                barGap: 2,
                barRadius: 99,
                height: 96,
                normalize: true,
                dragToSeek: true
            });
            state.wavesurfer.on('ready', () => {
                updatePlaybackControls(true);
                refs.audioMeta.textContent = buildAudioMetaText(state.wavesurfer.getDuration(), blob.size);
            });
            state.wavesurfer.on('play', () => updatePlaybackLabel(true));
            state.wavesurfer.on('pause', () => updatePlaybackLabel(false));
            state.wavesurfer.on('finish', () => updatePlaybackLabel(false));
            state.wavesurfer.load(state.recordedUrl);
        } else {
            refs.playbackWaveform.innerHTML = `<div class="wave-empty">${escapeHtml(T.playbackWaiting)}</div>`;
            refs.recordedAudio.classList.remove('hidden');
            refs.recordedAudio.onloadedmetadata = () => {
                updatePlaybackControls(true);
                refs.audioMeta.textContent = buildAudioMetaText(refs.recordedAudio.duration, blob.size);
            };
        }
    }

    function clearRecordedAudio() {
        if (state.wavesurfer) {
            state.wavesurfer.destroy();
            state.wavesurfer = null;
        }
        refs.recordedAudio.pause();
        refs.recordedAudio.classList.add('hidden');
        refs.recordedAudio.removeAttribute('src');
        refs.recordedAudio.load();
        if (state.recordedUrl) {
            URL.revokeObjectURL(state.recordedUrl);
            state.recordedUrl = '';
        }
        refs.playbackWaveform.innerHTML = `<div class="wave-empty">${escapeHtml(T.playbackWaiting)}</div>`;
        refs.audioMeta.textContent = '';
        updatePlaybackControls(false);
        refs.downloadBtn.href = '#';
        refs.downloadBtn.classList.add('disabled');
        state.recordedBlob = null;
    }

    function updatePlaybackControls(enabled) {
        refs.playbackBtn.disabled = !enabled;
        refs.playbackText.textContent = T.playback;
        refs.playbackBtn.querySelector('i').className = 'fa-solid fa-play mr-2';
    }

    function updatePlaybackLabel(isPlaying) {
        refs.playbackText.textContent = isPlaying ? T.pause : T.playback;
        refs.playbackBtn.querySelector('i').className = isPlaying ? 'fa-solid fa-pause mr-2' : 'fa-solid fa-play mr-2';
    }

    function togglePlayback() {
        if (state.wavesurfer) {
            state.wavesurfer.playPause();
            return;
        }
        if (refs.recordedAudio.paused) {
            refs.recordedAudio.play();
        } else {
            refs.recordedAudio.pause();
        }
    }

    function analyzeResult(spoken) {
        if (!state.currentSentence) {
            return;
        }
        const target = normalizeText(state.currentSentence.text);
        const spokenNormalized = normalizeText(spoken);
        if (!spokenNormalized) {
            return;
        }
        const lcsLength = longestCommonSubsequence(target, spokenNormalized);
        const accuracy = target.length ? Math.round((lcsLength / target.length) * 100) : 0;
        const completeness = Math.round((lcsLength / Math.max(target.length, spokenNormalized.length || 1)) * 100);
        const score = Math.round((accuracy * 0.65) + (completeness * 0.35));
        refs.scoreValue.textContent = String(score);
        refs.accuracyValue.textContent = `${accuracy}%`;
        refs.completenessValue.textContent = `${completeness}%`;
        refs.targetDisplay.innerHTML = colorizeComparison(target, spokenNormalized, 'target');
        refs.spokenDisplay.innerHTML = colorizeComparison(target, spokenNormalized, 'spoken');
        refs.feedbackMsg.className = `feedback-panel mt-4 rounded-2xl border p-4 text-sm leading-7 ${feedbackClass(score)}`;
        refs.feedbackMsg.textContent = buildFeedback(score, state.peakLevel, state.recordingDurationMs);
        refs.resultPanel.classList.remove('hidden');
        state.sessionScores.push(score);
        updateSessionStats();
        saveHistoryEntry({
            score,
            accuracy,
            completeness,
            target: state.currentSentence.text,
            spoken,
            durationMs: state.recordingDurationMs,
            peakLevel: state.peakLevel,
            createdAt: new Date().toISOString()
        });
        renderHistory();
    }

    function updateSessionStats() {
        const attempts = state.sessionScores.length;
        const best = attempts ? Math.max(...state.sessionScores) : 0;
        const average = attempts ? Math.round(state.sessionScores.reduce((sum, value) => sum + value, 0) / attempts) : 0;
        refs.attemptCount.textContent = String(attempts);
        refs.bestScore.textContent = String(best);
        refs.avgScore.textContent = String(average);
    }

    function renderHistory() {
        refs.historyList.innerHTML = '';
        if (state.history.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'rounded-2xl border border-dashed border-white/10 bg-slate-950/35 p-5 text-sm text-slate-400';
            empty.textContent = T.noHistory;
            refs.historyList.appendChild(empty);
            return;
        }

        state.history.slice(0, 6).forEach((entry) => {
            const item = document.createElement('article');
            item.className = 'history-item rounded-3xl p-4';
            item.innerHTML = `
                <div class="flex flex-wrap items-start justify-between gap-3">
                    <div class="space-y-2">
                        <p class="text-sm font-semibold text-white">${escapeHtml(entry.target)}</p>
                        <p class="text-sm text-slate-400">${escapeHtml(`${T.historySpokenPrefix}: ${entry.spoken}`)}</p>
                        <div class="flex flex-wrap gap-3 text-xs text-slate-500">
                            <span>${escapeHtml(formatLocalStamp(entry.createdAt))}</span>
                            <span>${escapeHtml(buildAudioMetaText(entry.durationMs / 1000, 0, true))}</span>
                            <span>${escapeHtml(`${T.peakLabel} ${entry.peakLevel || 0}%`)}</span>
                        </div>
                    </div>
                    <div class="history-score rounded-full px-3 py-2 text-sm font-black">${entry.score}</div>
                </div>
            `;
            refs.historyList.appendChild(item);
        });
    }

    function saveHistoryEntry(entry) {
        state.history.unshift(entry);
        state.history = state.history.slice(0, 20);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.history));
        } catch (error) {
            console.error(error);
        }
    }

    function clearHistory() {
        if (!window.confirm(T.clearHistoryConfirm)) {
            return;
        }
        state.history = [];
        localStorage.removeItem(STORAGE_KEY);
        renderHistory();
    }

    function resetAttemptUi(keepStatus = false) {
        if (!keepStatus) {
            setStatus(T.idleStatus);
        }
        refs.recognizedBox.textContent = hasRecognition ? T.recognitionPlaceholder : T.recognitionFallback;
        refs.resultPanel.classList.add('hidden');
        refs.scoreValue.textContent = '0';
        refs.accuracyValue.textContent = '0%';
        refs.completenessValue.textContent = '0%';
        refs.feedbackMsg.className = 'feedback-panel mt-4 rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm leading-7 text-slate-200';
        refs.feedbackMsg.textContent = T.browserEstimateNote;
        refs.targetDisplay.textContent = '';
        refs.spokenDisplay.textContent = '';
        refs.recordingDuration.textContent = '00:00';
        refs.peakLevel.textContent = '0%';
        clearRecordedAudio();
        stopTimer();
        stopRecognition();
        stopVisualizer();
        stopStreamTracks();
        state.mediaRecorder = null;
        state.audioChunks = [];
        state.latestTranscript = '';
        state.finalTranscript = '';
        state.recordingDurationMs = 0;
        state.peakLevel = 0;
        state.isRecording = false;
        setRecordingUi(false);
    }

    function setStatus(message) {
        refs.statusText.textContent = message;
    }

    function stopStreamTracks() {
        if (!state.mediaStream) {
            return;
        }
        state.mediaStream.getTracks().forEach((track) => track.stop());
        state.mediaStream = null;
    }

    function cleanupMedia() {
        stopTimer();
        stopRecognition();
        stopVisualizer();
        stopStreamTracks();
        state.mediaRecorder = null;
        state.audioChunks = [];
        state.isRecording = false;
    }

    function cleanupResources() {
        cleanupMedia();
        clearRecordedAudio();
    }

    function normalizeText(value) {
        return value.toLowerCase().replace(/[\s.,!?~"'`()[\]{}:;/-]/g, '').trim();
    }

    function longestCommonSubsequence(a, b) {
        const rows = a.length + 1;
        const cols = b.length + 1;
        const table = Array.from({ length: rows }, () => new Array(cols).fill(0));
        for (let row = 1; row < rows; row += 1) {
            for (let col = 1; col < cols; col += 1) {
                if (a[row - 1] === b[col - 1]) {
                    table[row][col] = table[row - 1][col - 1] + 1;
                } else {
                    table[row][col] = Math.max(table[row - 1][col], table[row][col - 1]);
                }
            }
        }
        return table[a.length][b.length];
    }

    function colorizeComparison(target, spoken, mode) {
        const maxLength = Math.max(target.length, spoken.length);
        let html = '';
        for (let index = 0; index < maxLength; index += 1) {
            const targetChar = target[index] || '';
            const spokenChar = spoken[index] || '';
            if (mode === 'target') {
                if (!targetChar) {
                    continue;
                }
                html += targetChar === spokenChar
                    ? `<span class="char-match">${escapeHtml(targetChar)}</span>`
                    : `<span class="char-miss">${escapeHtml(targetChar)}</span>`;
            } else {
                if (!spokenChar) {
                    continue;
                }
                if (spokenChar === targetChar) {
                    html += `<span class="char-match">${escapeHtml(spokenChar)}</span>`;
                } else if (index < target.length) {
                    html += `<span class="char-miss">${escapeHtml(spokenChar)}</span>`;
                } else {
                    html += `<span class="char-extra">${escapeHtml(spokenChar)}</span>`;
                }
            }
        }
        return html || '<span class="text-slate-500">-</span>';
    }

    function feedbackClass(score) {
        if (score >= 85) {
            return 'good';
        }
        if (score >= 65) {
            return 'mid';
        }
        return 'low';
    }

    function buildFeedback(score, peakLevel, durationMs) {
        const notes = [];
        if (score >= 85) {
            notes.push(T.feedbackExcellent);
        } else if (score >= 65) {
            notes.push(T.feedbackGood);
        } else {
            notes.push(T.feedbackRetry);
        }
        if (peakLevel < 18) {
            notes.push(T.feedbackLowVolume);
        } else if (peakLevel > 92) {
            notes.push(T.feedbackHighVolume);
        }
        if (durationMs > 0 && durationMs < 1200) {
            notes.push(T.feedbackQuick);
        } else {
            notes.push(T.feedbackSteady);
        }
        return notes.join(' ');
    }

    function loadHistory() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    function loadCustomSentences() {
        try {
            const raw = localStorage.getItem(CUSTOM_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    function persistCustomSentences() {
        try {
            localStorage.setItem(CUSTOM_KEY, JSON.stringify(sentenceSets[sentenceSets.length - 1].items));
        } catch (error) {
            console.error(error);
        }
    }

    function chooseRecordingMimeType() {
        const mimeTypes = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4'];
        return mimeTypes.find((type) => MediaRecorder.isTypeSupported(type)) || '';
    }

    function buildAudioMetaText(durationSeconds, bytes, omitSize = false) {
        const durationText = `${T.durationLabel} ${formatDuration(durationSeconds * 1000)}`;
        if (omitSize || !bytes) {
            return durationText;
        }
        return `${durationText} | ${formatBytes(bytes)}`;
    }

    function formatDuration(ms) {
        const totalSeconds = Math.max(0, Math.round(ms / 1000));
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    function formatBytes(bytes) {
        if (!bytes) {
            return '0 KB';
        }
        const kilobytes = bytes / 1024;
        if (kilobytes < 1024) {
            return `${kilobytes.toFixed(1)} KB`;
        }
        return `${(kilobytes / 1024).toFixed(1)} MB`;
    }

    function formatLocalStamp(value) {
        const date = new Date(value);
        return new Intl.DateTimeFormat('ko-KR', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }

    function fileExtensionForMime(mimeType) {
        if (mimeType.includes('ogg')) {
            return 'ogg';
        }
        if (mimeType.includes('mp4')) {
            return 'm4a';
        }
        return 'webm';
    }

    function timestampForFile() {
        const now = new Date();
        return [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, '0'),
            String(now.getDate()).padStart(2, '0'),
            String(now.getHours()).padStart(2, '0'),
            String(now.getMinutes()).padStart(2, '0'),
            String(now.getSeconds()).padStart(2, '0')
        ].join('');
    }

    function isSecureContextOrLocalhost() {
        return window.isSecureContext || ['localhost', '127.0.0.1'].includes(window.location.hostname);
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
})();
