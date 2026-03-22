(() => {
    const STORAGE_KEY = 'korean-vietnamese-pronunciation-history-v1';
    const CUSTOM_KEY = 'korean-vietnamese-pronunciation-custom-v1';
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    const T = {
        pageTitle: '베트남 학생용 한국어 발음 클리닉',
        badge: 'Vietnamese Pronunciation Coach',
        heading: '베트남 학생용 한국어 발음 클리닉',
        subtitle: '베트남 학습자가 자주 헷갈리는 모음, 된소리, 받침, ㄹ 소리를 모범 발음과 함께 연습합니다. 한글 설명과 베트남어 코칭, 입모양·혀 위치·호흡 안내를 보고 바로 따라 말해 보세요.',
        backToHome: '메인 페이지로',
        practiceDeckLabel: '어려운 소리 묶음',
        practiceDeckTitle: '발음 연습 카드',
        customLabel: '직접 입력',
        customPlaceholder: '연습하고 싶은 문장이나 단어를 입력하세요. 자세한 코칭은 기본 카드가 가장 풍부합니다.',
        addSentence: '문장 추가',
        targetLabel: '오늘의 따라 말하기',
        defaultTarget: '문장을 고르세요',
        speakNormal: '모범 발음',
        speakSlow: '천천히 듣기',
        coachLabel: 'Pronunciation coach',
        coachTitle: '핵심 발음 포인트',
        guideKoreanLabel: '한국어 설명',
        guideVietnameseLabel: 'Tiếng Việt',
        rhythmLabel: '따라 말하기 순서',
        mistakeLabel: '자주 하는 실수',
        mouthShapeLabel: '입모양',
        tongueLabel: '혀 위치와 움직임',
        breathLabel: '호흡과 리듬',
        studioLabel: '따라 말하기',
        idleStatus: '모범 발음을 먼저 듣고, 발음 포인트를 확인한 뒤 마이크를 눌러 따라 말해 보세요.',
        recordingStatus: '녹음 중입니다. 입모양, 혀끝, 호흡을 의식하면서 또렷하게 말해 보세요.',
        resetAttempt: '연습 초기화',
        readyPill: 'READY',
        recordingPill: 'RECORDING',
        volumeLabel: '볼륨',
        durationLabel: '녹음 길이',
        peakLabel: '최대 볼륨',
        recognitionLabel: '인식 결과',
        recognitionTitle: '내 발화 확인',
        recognitionPlaceholder: '여기에 학생의 발화가 실시간으로 표시됩니다.',
        recognitionHint: '브라우저 STT는 참고용입니다. 점수보다 발음 코칭 카드와 비교해서 보세요.',
        recognitionFallback: '이 브라우저는 음성 인식 지원이 제한적이어서 녹음 청취 연습 위주로 동작합니다.',
        resultEstimate: '브라우저 추정 결과',
        scoreLabel: '종합 점수',
        accuracyLabel: '일치도',
        completenessLabel: '완성도',
        targetCompact: '목표 문장',
        spokenCompact: '인식 문장',
        recordedVoiceLabel: '내 녹음',
        recordedVoiceTitle: '내 녹음 다시 듣기',
        playbackWaiting: '녹음하면 여기에 파형과 재생 제어가 표시됩니다.',
        playback: '재생',
        pause: '일시정지',
        download: '다운로드',
        progressLabel: '연습 로그',
        recentAttempts: '최근 시도',
        clearHistory: '기록 지우기',
        sessionAttempts: '연습 횟수',
        sessionBest: '최고 점수',
        sessionAverage: '평균 점수',
        warningRecognition: 'Web Speech 인식 결과는 실제 발음보다 낮게 보일 수 있습니다. 모범 발음 듣기와 녹음 다시 듣기는 계속 사용할 수 있습니다.',
        warningMicrophone: '마이크, MediaRecorder, Web Audio API가 필요합니다. GitHub Pages에서는 HTTPS 환경의 최신 Chrome 또는 Edge를 권장합니다.',
        noSentence: '먼저 연습 문장을 고르세요.',
        noCustomText: '추가할 문장이나 단어를 입력해 주세요.',
        recorderError: '마이크 연결을 시작하지 못했습니다.',
        heardNothing: '말한 내용을 인식하지 못했습니다. 천천히 또박또박 다시 말해 보세요.',
        sttUnavailableActive: '녹음은 진행되지만 음성 인식은 없습니다. 파형과 다시 듣기를 활용해 자가 청취 연습을 해 보세요.',
        clearHistoryConfirm: '저장된 연습 기록을 모두 지울까요?',
        noHistory: '아직 저장된 시도가 없습니다.',
        addComplete: '새 연습 문장을 추가했습니다.',
        playedStandard: '모범 발음을 표준 속도로 들려드리는 중입니다.',
        playedSlow: '모범 발음을 천천히 들려드리는 중입니다.',
        historySpokenPrefix: '인식',
        browserEstimateNote: '브라우저 STT 기반 참고 점수입니다. 실제 발음 평가는 위의 입모양·혀·리듬 안내와 함께 확인하세요.',
        sessionFilePrefix: 'korean-vietnamese-pronunciation',
        feedbackExcellent: '핵심 소리가 안정적으로 들립니다.',
        feedbackGood: '좋아요. 헷갈리기 쉬운 소리만 조금 더 또렷하게 구분해 보세요.',
        feedbackRetry: '먼저 천천히 듣고, 리듬 단위로 끊어 따라 말해 보세요.',
        feedbackLowVolume: '목소리가 작게 들어갔어요. 마이크에 조금 더 가까이 가서 또렷하게 말해 보세요.',
        feedbackHighVolume: '소리가 너무 강해서 파형이 튀고 있어요. 마이크와 약간 거리를 두고 자연스럽게 말해 보세요.',
        feedbackQuick: '발화 길이가 짧습니다. 받침 뒤에 모음을 붙이지 말고 문장 끝까지 이어서 말해 보세요.',
        feedbackSteady: '호흡이 급하지 않아 듣기 좋습니다.',
        customMeaning: '직접 추가한 문장 / Câu do bạn tự thêm'
    };

    const sentenceSets = [
        {
            key: 'vowels',
            label: '모음 ㅓ·ㅗ·ㅜ·ㅡ',
            items: [
                createPracticeItem({
                    text: '저는 커피를 마셔요.',
                    meaning: 'Tôi uống cà phê.',
                    focus: 'ㅓ 소리',
                    tags: ['ㅓ', '입술 둥글지 않게', '턱 조금 내리기'],
                    koreanGuide: '저, 커의 ㅓ는 입술을 둥글게 하지 않고 턱을 조금 내려서 내는 소리입니다.',
                    vietnameseGuide: 'Âm ㅓ gần với ơ nhưng miệng mở thoáng hơn và môi không chu tròn như khi nói ㅗ.',
                    mouthShape: '입을 세로로 조금 열고 입꼬리는 힘을 빼고 편안하게 둡니다.',
                    tongueTip: '혀끝은 아래 앞니 뒤에 가볍게 두고 혀의 가운데를 살짝 들어 올립니다.',
                    breathTip: '저-는 / 커-피-를 / 마-셔-요처럼 고르게 이어 말해 보세요.',
                    commonMistake: 'ㅓ를 ㅗ처럼 둥글게 내면 저는이 조는처럼 들릴 수 있어요.',
                    coachNote: '저, 커의 ㅓ를 특히 또렷하게 들리게 해 보세요.',
                    rhythm: [
                        { text: '저는', tip: '첫 ㅓ를 세로로 열어서 시작합니다.' },
                        { text: '커피를', tip: '커의 ㅓ를 유지한 뒤 피로 가볍게 이동합니다.' },
                        { text: '마셔요', tip: '마-셔-요를 부드럽게 끝까지 이어 줍니다.' }
                    ]
                }),
                createPracticeItem({
                    text: '오후에 우유를 줘요.',
                    meaning: 'Chiều nay hãy cho tôi sữa.',
                    focus: 'ㅗ와 ㅜ 구분',
                    tags: ['ㅗ', 'ㅜ', '입술 둥글기 차이'],
                    koreanGuide: '오의 ㅗ는 입술을 가볍게 둥글리고, 우의 ㅜ는 더 작고 앞으로 모읍니다.',
                    vietnameseGuide: 'Với ㅗ môi tròn nhẹ; với ㅜ môi chụm nhỏ và đưa ra trước hơn.',
                    mouthShape: 'ㅗ에서는 입을 조금 넓게, ㅜ에서는 더 좁고 앞으로 모읍니다.',
                    tongueTip: 'ㅗ는 혀 뒷부분을 중간 높이로, ㅜ는 더 높게 올립니다.',
                    breathTip: '오-후-에 / 우-유-를 / 줘-요로 끊어 두 모음 차이를 살리세요.',
                    commonMistake: 'ㅗ와 ㅜ를 같은 모양으로 내면 오후와 우유가 비슷하게 들립니다.',
                    coachNote: '오와 우의 입술 모양 차이를 크게 보여 주세요.',
                    rhythm: [
                        { text: '오후에', tip: '오에서 둥글게 시작하고 후로 자연스럽게 갑니다.' },
                        { text: '우유를', tip: '우는 더 좁고 앞으로 모은 입술로 냅니다.' },
                        { text: '줘요', tip: '마지막은 힘을 빼고 부드럽게 마무리합니다.' }
                    ]
                }),
                createPracticeItem({
                    text: '음식을 천천히 먹어요.',
                    meaning: 'Tôi ăn thức ăn từ từ.',
                    focus: 'ㅡ 소리',
                    tags: ['ㅡ', '입술 평평하게', '혀 가운데 높이기'],
                    koreanGuide: '음, 음식의 ㅡ는 입술을 평평하게 두고 혀의 가운데를 위로 올려 내는 소리입니다.',
                    vietnameseGuide: 'Âm ㅡ gần với ư nhưng môi phẳng hơn, không tròn và đầu lưỡi vẫn thả lỏng.',
                    mouthShape: '미소를 짓듯 양옆으로 살짝 당기고 둥글게 오므리지 않습니다.',
                    tongueTip: '혀끝은 거의 움직이지 않고 혀의 가운데만 살짝 높입니다.',
                    breathTip: '음-식-을 / 천-천-히 / 먹-어-요처럼 여유 있게 이어 갑니다.',
                    commonMistake: 'ㅡ 뒤에 불필요한 어 소리를 넣으면 음식이 으머식처럼 들릴 수 있어요.',
                    coachNote: '음식의 으를 짧고 선명하게 시작해 보세요.',
                    rhythm: [
                        { text: '음식을', tip: '첫 으를 평평한 입술로 짧게 냅니다.' },
                        { text: '천천히', tip: '속도를 천천히 유지하며 음절을 또렷하게 냅니다.' },
                        { text: '먹어요', tip: '먹의 받침 뒤에 모음을 더 붙이지 않습니다.' }
                    ]
                }),
                createPracticeItem({
                    text: '오후에 도서관에 가요.',
                    meaning: 'Buổi chiều tôi đi thư viện.',
                    focus: 'ㅗ 소리',
                    tags: ['ㅗ', '턱 과하게 내리지 않기', '둥근 입술'],
                    koreanGuide: '오, 도의 ㅗ는 ㅓ보다 입을 덜 열고 살짝 둥글게 유지합니다.',
                    vietnameseGuide: 'Âm ㅗ giống ô hơn ơ; miệng không mở dọc quá nhiều và môi tròn nhẹ.',
                    mouthShape: '입술을 부드럽게 모으되 과하게 앞으로 내밀지 않습니다.',
                    tongueTip: '혀의 뒷부분을 약간 올리고 소리를 짧고 맑게 냅니다.',
                    breathTip: '오-후-에 / 도-서-관-에 / 가-요로 박자를 고르게 맞춰 주세요.',
                    commonMistake: 'ㅗ를 너무 열면 ㅓ처럼 들려 오후가 어후처럼 느껴질 수 있어요.',
                    coachNote: '오와 도에서 둥근 모양을 잠깐 유지해 보세요.',
                    rhythm: [
                        { text: '오후에', tip: '오에서 둥근 모양을 먼저 분명히 보여 줍니다.' },
                        { text: '도서관에', tip: '도의 ㅗ를 유지한 채 나머지를 자연스럽게 잇습니다.' },
                        { text: '가요', tip: '끝은 힘을 빼고 편안하게 내립니다.' }
                    ]
                })
            ]
        },
        {
            key: 'tense',
            label: '된소리·거센소리',
            items: [
                createPracticeItem({
                    text: '까만 가방을 가지고 가요.',
                    meaning: 'Tôi mang chiếc cặp màu đen đi.',
                    focus: 'ㄱ과 ㄲ',
                    tags: ['ㄱ', 'ㄲ', '짧은 긴장'],
                    koreanGuide: '가는 부드럽게 시작하고, 까는 목에 힘을 짧게 모아 단단하게 시작합니다.',
                    vietnameseGuide: 'ㄱ nhẹ hơn, còn ㄲ phải căng hơn một chút ở cổ họng nhưng không bật hơi mạnh như ㅋ.',
                    mouthShape: '입을 너무 크게 열지 말고 같은 모양에서 힘의 차이만 보여 주세요.',
                    tongueTip: '혀 뒷부분이 연구개 쪽에 닿았다가 짧게 떨어집니다.',
                    breathTip: '까-만 / 가-방-을 / 가-지-고 / 가-요로 첫음절 차이를 크게 들리게 합니다.',
                    commonMistake: 'ㄲ을 약하게 읽으면 까만이 가만처럼 들릴 수 있어요.',
                    coachNote: '까만의 첫소리를 한 번 더 또렷하게 잠가 보세요.',
                    rhythm: [
                        { text: '까만', tip: '까를 단단하고 짧게 시작합니다.' },
                        { text: '가방을', tip: '가는 힘을 풀고 부드럽게 전환합니다.' },
                        { text: '가지고 가요', tip: '뒤의 가는 모두 평음으로 안정되게 읽습니다.' }
                    ]
                }),
                createPracticeItem({
                    text: '주차장에 진짜 차가 많아요.',
                    meaning: 'Bãi đỗ xe có rất nhiều xe.',
                    focus: 'ㅈ·ㅉ·ㅊ',
                    tags: ['ㅈ', 'ㅉ', 'ㅊ'],
                    koreanGuide: '주는 부드럽게, 짜는 단단하게, 차는 숨을 더 실어 말합니다.',
                    vietnameseGuide: 'ㅈ mềm, ㅉ căng và ngắn hơn, ㅊ có luồng hơi bật ra rõ hơn.',
                    mouthShape: '입술보다 턱과 혀끝 움직임이 중요하니 입은 편안하게 둡니다.',
                    tongueTip: '혀끝을 윗잇몸 뒤에 가깝게 두었다가 짧게 떼며 소리를 냅니다.',
                    breathTip: '주-차-장-에 / 진-짜 / 차-가 / 많-아-요로 ㅉ와 ㅊ 차이를 살리세요.',
                    commonMistake: 'ㅉ을 ㅈ처럼 읽으면 진짜가 진자처럼 들릴 수 있어요.',
                    coachNote: '진짜의 짜는 짧고 단단하게 끊어 주세요.',
                    rhythm: [
                        { text: '주차장에', tip: '주와 차의 차이를 먼저 느끼며 읽습니다.' },
                        { text: '진짜', tip: '짜를 짧고 강하게 눌러 줍니다.' },
                        { text: '차가 많아요', tip: '차는 숨을 살짝 실어 시원하게 뺍니다.' }
                    ]
                }),
                createPracticeItem({
                    text: '커피를 타서 테이블에 둬요.',
                    meaning: 'Pha cà phê rồi đặt lên bàn.',
                    focus: 'ㅋ·ㅌ',
                    tags: ['ㅋ', 'ㅌ', '숨 더 실어 주기'],
                    koreanGuide: 'ㅋ, ㅌ은 평음보다 숨이 더 실리는 거센소리입니다.',
                    vietnameseGuide: 'Với ㅋ và ㅌ, hãy để luồng hơi thoát ra rõ hơn so với ㄱ, ㄷ.',
                    mouthShape: '입은 자연스럽게 열고, 소리 앞에서 짧게 숨이 나가도록 준비합니다.',
                    tongueTip: 'ㅋ는 혀 뒤, ㅌ은 혀끝이 닿았다가 떨어지며 공기가 함께 나갑니다.',
                    breathTip: '커-피-를 / 타-서 / 테-이-블-에 / 둬-요로 첫 자음에 짧은 숨을 붙여 보세요.',
                    commonMistake: '거센소리를 너무 약하게 내면 커피가 거피와 비슷하게 들립니다.',
                    coachNote: '커, 타, 테의 첫소리에 숨을 짧게 더 실어 주세요.',
                    rhythm: [
                        { text: '커피를', tip: '커에서 숨이 살짝 나가게 시작합니다.' },
                        { text: '타서', tip: '타의 ㅌ은 공기가 느껴지게 만듭니다.' },
                        { text: '테이블에 둬요', tip: '테에서도 같은 숨 흐름을 유지합니다.' }
                    ]
                }),
                createPracticeItem({
                    text: '쌀을 조금 싸게 샀어요.',
                    meaning: 'Tôi mua gạo hơi rẻ.',
                    focus: 'ㅅ과 ㅆ',
                    tags: ['ㅅ', 'ㅆ', '치조 긴장'],
                    koreanGuide: 'ㅆ은 ㅅ보다 혀와 입 주변의 긴장이 더 단단하고 짧습니다.',
                    vietnameseGuide: 'Âm ㅆ căng hơn ㅅ, đầu lưỡi và vùng miệng giữ chắc hơn trong chốc lát.',
                    mouthShape: '입꼬리를 살짝 당기고 치아 사이는 너무 벌리지 않습니다.',
                    tongueTip: '혀끝은 아래 앞니 뒤에 두고 혀 앞부분으로 마찰을 만듭니다.',
                    breathTip: '쌀-을 / 조-금 / 싸-게 / 샀-어-요로 ㅆ이 들어간 음절을 또렷하게 끊습니다.',
                    commonMistake: 'ㅆ을 ㅅ처럼 약하게 읽으면 쌀, 싸게, 샀어요가 모두 흐려집니다.',
                    coachNote: '쌀, 싸, 샀 세 음절에서 긴장을 조금만 더 주세요.',
                    rhythm: [
                        { text: '쌀을', tip: '첫 ㅆ을 짧고 단단하게 눌러 줍니다.' },
                        { text: '조금 싸게', tip: '싸에서 다시 같은 긴장을 만듭니다.' },
                        { text: '샀어요', tip: '샀의 시작도 흐리지 않게 유지합니다.' }
                    ]
                })
            ]
        },
        {
            key: 'batchim',
            label: '받침과 이어 읽기',
            items: [
                createPracticeItem({
                    text: '밥 먹고 집에 가요.',
                    meaning: 'Ăn cơm rồi về nhà.',
                    focus: '받침 ㅂ, ㄱ',
                    tags: ['받침', '모음 덧붙이지 않기', '짧게 닫기'],
                    koreanGuide: '밥, 먹의 받침은 끝을 짧게 닫고 바로 다음 음절로 넘어갑니다.',
                    vietnameseGuide: 'Với 받침, hãy khép âm ngắn ở cuối, đừng thêm nguyên âm như ba-bư hay mơ-gư.',
                    mouthShape: '입을 닫거나 멈춘 뒤 바로 다음 음절로 넘기고 입을 다시 크게 벌리지 않습니다.',
                    tongueTip: '먹의 ㄱ 받침은 혀 뒤를 잠깐 막았다가 다음 소리로 부드럽게 이동합니다.',
                    breathTip: '밥 / 먹고 / 집에 / 가요로 받침 뒤에 숨을 새지 말고 짧게 연결합니다.',
                    commonMistake: '받침 뒤에 으를 붙이면 밥이 바브처럼, 먹고가 머거고처럼 들릴 수 있어요.',
                    coachNote: '밥, 먹의 끝을 짧게 닫는 느낌을 살려 보세요.',
                    rhythm: [
                        { text: '밥', tip: '입술을 닫으며 짧게 끝냅니다.' },
                        { text: '먹고', tip: '먹의 끝을 닫은 뒤 곧바로 고로 넘어갑니다.' },
                        { text: '집에 가요', tip: '뒤쪽은 힘을 풀고 자연스럽게 연결합니다.' }
                    ]
                }),
                createPracticeItem({
                    text: '옷이 아주 커요.',
                    meaning: 'Bộ quần áo này rất to.',
                    focus: '받침 ㅅ + 이',
                    tags: ['연음', '옷이', '오시처럼'],
                    koreanGuide: '옷이는 글자는 받침이 있지만 실제 말할 때는 오시처럼 자연스럽게 이어집니다.',
                    vietnameseGuide: 'Khi gặp 받침 + 이, âm cuối thường nối sang âm sau. 옷이 nghe gần như o-si.',
                    mouthShape: '첫 음절 끝에서 입을 잠깐 닫지 말고 바로 다음 모음으로 이어 줍니다.',
                    tongueTip: '혀끝이 마찰을 만들었다가 바로 이 쪽으로 부드럽게 움직입니다.',
                    breathTip: '오-시 / 아-주 / 커-요처럼 연결 느낌을 먼저 만든 뒤 전체 문장을 말하세요.',
                    commonMistake: '글자대로 옷-이로 끊으면 말이 딱딱하고 부자연스럽게 들립니다.',
                    coachNote: '옷이를 한 덩어리처럼 이어 읽어 보세요.',
                    rhythm: [
                        { text: '옷이', tip: '오시처럼 한 번에 이어 읽습니다.' },
                        { text: '아주', tip: '호흡을 끊지 말고 자연스럽게 잇습니다.' },
                        { text: '커요', tip: '끝은 또렷하지만 부드럽게 마칩니다.' }
                    ]
                }),
                createPracticeItem({
                    text: '밖에 비가 와요.',
                    meaning: 'Ngoài trời đang mưa.',
                    focus: '받침 ㄲ',
                    tags: ['밖에', '끝 닫기', '짧은 강세'],
                    koreanGuide: '밖의 받침은 강하게 닫히지만 뒤에 모음을 길게 붙이지 않습니다.',
                    vietnameseGuide: 'Âm cuối của 밖 đóng chắc nhưng rất ngắn. Đừng thêm một âm ư ở cuối.',
                    mouthShape: '입을 벌렸다가 바로 닫는 느낌으로 짧게 끊고 다음 음절로 이동합니다.',
                    tongueTip: '혀 뒤가 닿는 순간을 짧게 만들고 공기를 오래 빼지 않습니다.',
                    breathTip: '밖-에 / 비-가 / 와-요로 첫 단어만 짧게 끊고 이어 갑니다.',
                    commonMistake: '밖에를 바께처럼 약하게 읽거나 바끄에처럼 늘리기 쉽습니다.',
                    coachNote: '밖의 끝소리를 짧게 잠그고 바로 에로 넘어가 보세요.',
                    rhythm: [
                        { text: '밖에', tip: '밖의 끝을 짧게 닫고 바로 에로 연결합니다.' },
                        { text: '비가', tip: '뒤 음절은 힘을 빼고 안정적으로 이어 갑니다.' },
                        { text: '와요', tip: '문장 끝을 길게 늘이지 말고 자연스럽게 마무리합니다.' }
                    ]
                }),
                createPracticeItem({
                    text: '꽃이 예쁘게 피었어요.',
                    meaning: 'Hoa đã nở đẹp.',
                    focus: '받침 ㅊ + 이',
                    tags: ['꽃이', '연음', '꼬치처럼'],
                    koreanGuide: '꽃이는 꼬치처럼 이어져 들립니다. 받침을 따로 떼지 말고 한 번에 연결하세요.',
                    vietnameseGuide: '꽃이 thường nghe gần như kko-chi. Hãy nối liền thay vì ngắt thành 꽃 / 이.',
                    mouthShape: '입술보다 혀끝과 앞부분의 마찰을 자연스럽게 이어 주는 데 집중합니다.',
                    tongueTip: '혀의 앞부분을 잠깐 막았다가 치 쪽으로 바로 연결합니다.',
                    breathTip: '꼬-치 / 예-쁘-게 / 피-어-써-요처럼 먼저 연음 부분을 따로 연습해 보세요.',
                    commonMistake: '꽃이를 글자대로 끊으면 한국어 리듬이 딱딱하게 들립니다.',
                    coachNote: '꽃이를 꼬치처럼 한 번에 붙여 보세요.',
                    rhythm: [
                        { text: '꽃이', tip: '꼬치처럼 한 덩어리로 묶습니다.' },
                        { text: '예쁘게', tip: '예-쁘-게를 박자감 있게 말합니다.' },
                        { text: '피었어요', tip: '뒤쪽은 부드럽게 길을 열어 마칩니다.' }
                    ]
                })
            ]
        },
        {
            key: 'rieul',
            label: 'ㄹ과 혀끝',
            items: [
                createPracticeItem({
                    text: '라면을 빨리 끓여요.',
                    meaning: 'Tôi nấu mì thật nhanh.',
                    focus: 'ㄹ 한 번 튕기기',
                    tags: ['ㄹ', '혀끝 튕기기', '빨리'],
                    koreanGuide: '라, 리의 ㄹ은 혀끝을 윗잇몸 뒤에 아주 짧게 한 번 튕기는 소리입니다.',
                    vietnameseGuide: 'ㄹ trong tiếng Hàn không kéo dài như l tiếng Việt. Hãy chạm đầu lưỡi thật nhanh một lần.',
                    mouthShape: '입은 편안하게 두고 혀끝의 짧은 움직임만 느껴 보세요.',
                    tongueTip: '혀끝을 윗잇몸 뒤에 찍듯이 닿았다가 바로 떼어 냅니다.',
                    breathTip: '라-면-을 / 빨-리 / 끓-여-요로 ㄹ이 나오는 순간만 가볍게 튕겨 주세요.',
                    commonMistake: 'ㄹ을 길게 끌면 라면이 느리고 무겁게 들립니다.',
                    coachNote: '라, 리의 ㄹ을 한 번만 가볍게 튕겨 주세요.',
                    rhythm: [
                        { text: '라면을', tip: '라의 ㄹ을 짧게 찍고 바로 넘어갑니다.' },
                        { text: '빨리', tip: '두 번째 ㄹ도 오래 끌지 않습니다.' },
                        { text: '끓여요', tip: '끝은 부드럽게 이어서 문장을 마칩니다.' }
                    ]
                }),
                createPracticeItem({
                    text: '머리를 잘라 주세요.',
                    meaning: 'Xin hãy cắt tóc cho tôi.',
                    focus: '리와 라의 ㄹ',
                    tags: ['리', '라', '짧은 혀끝'],
                    koreanGuide: '머리, 잘라의 ㄹ은 모두 짧지만 뒤 모음이 달라 혀가 빠르게 움직입니다.',
                    vietnameseGuide: 'Trong 리 và 라, đầu lưỡi đều chạm nhanh một lần nhưng miệng mở khác nhau theo nguyên âm sau.',
                    mouthShape: '리는 입을 덜 열고, 라는 더 넓게 열어 모음 차이를 보여 줍니다.',
                    tongueTip: '혀끝은 짧게 치고, 바로 이와 아 모양으로 이동합니다.',
                    breathTip: '머-리-를 / 잘-라 / 주-세-요로 ㄹ 뒤 모음까지 한 번에 연결하세요.',
                    commonMistake: '리와 라를 모두 같은 모양으로 내면 말이 뭉개져 들립니다.',
                    coachNote: '리는 좁게, 라는 조금 더 열어서 구분해 보세요.',
                    rhythm: [
                        { text: '머리를', tip: '리의 모양을 좁게 유지합니다.' },
                        { text: '잘라', tip: '라에서 입을 조금 더 엽니다.' },
                        { text: '주세요', tip: '끝은 힘을 빼고 정중하게 마무리합니다.' }
                    ]
                }),
                createPracticeItem({
                    text: '설날에 친척을 만나요.',
                    meaning: 'Tôi gặp người thân vào Tết Seollal.',
                    focus: 'ㄹ 받침 뒤 ㄴ',
                    tags: ['설날', 'ㄹㄴ', '혀 위치 유지'],
                    koreanGuide: '설날은 실제 말에서 설랄처럼 들릴 수 있습니다. 혀끝 위치를 부드럽게 이어 주세요.',
                    vietnameseGuide: 'Trong 설날, âm ㄹ và ㄴ nối gần nhau nên thường nghe mềm như seol-lal.',
                    mouthShape: '입모양보다 혀끝이 한 자리에서 부드럽게 이어지는 느낌이 중요합니다.',
                    tongueTip: '혀끝을 윗잇몸 뒤에 둔 상태를 유지하며 다음 소리로 자연스럽게 이어 갑니다.',
                    breathTip: '설-날-에 / 친-처-글 / 만-나-요처럼 첫 단어 연결을 먼저 익혀 보세요.',
                    commonMistake: '설 / 날을 너무 끊으면 한국어 리듬이 딱딱해집니다.',
                    coachNote: '설날을 한 덩어리처럼 붙여 읽어 보세요.',
                    rhythm: [
                        { text: '설날에', tip: '설날을 끊지 말고 한 묶음으로 읽습니다.' },
                        { text: '친척을', tip: '중간 속도는 일정하게 유지합니다.' },
                        { text: '만나요', tip: '끝을 자연스럽게 내리며 마칩니다.' }
                    ]
                }),
                createPracticeItem({
                    text: '우리는 노래를 불러요.',
                    meaning: 'Chúng tôi hát bài hát.',
                    focus: '연속 ㄹ',
                    tags: ['노래', '불러요', '짧은 반복'],
                    koreanGuide: '노래, 불러요의 ㄹ은 각각 짧고 가볍지만 연속으로 나오므로 리듬을 유지해야 합니다.',
                    vietnameseGuide: 'Khi ㄹ xuất hiện liên tiếp, đừng kéo dài; hãy giữ từng cú chạm ngắn và đều.',
                    mouthShape: '입은 과장하지 말고 노-래 / 불-러-요의 모음 변화를 자연스럽게 보여 줍니다.',
                    tongueTip: '혀끝이 짧게 두 번 이상 움직일 때도 매번 가볍게 튕겨 주세요.',
                    breathTip: '우-리-는 / 노-래-를 / 불-러-요로 덩어리를 나누면 ㄹ이 훨씬 안정됩니다.',
                    commonMistake: 'ㄹ을 길게 끌거나 ㄴ처럼 바꾸면 노래를이 흐려집니다.',
                    coachNote: '노래를, 불러요의 ㄹ을 모두 짧게 처리해 보세요.',
                    rhythm: [
                        { text: '우리는', tip: '첫 덩어리에서 안정적인 속도를 만듭니다.' },
                        { text: '노래를', tip: '두 ㄹ 모두 짧게 찍듯이 냅니다.' },
                        { text: '불러요', tip: '러요에서도 같은 리듬을 유지합니다.' }
                    ]
                })
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
        coachLabel: document.getElementById('coachLabel'),
        coachTitle: document.getElementById('coachTitle'),
        coachTags: document.getElementById('coachTags'),
        guideKoreanLabel: document.getElementById('guideKoreanLabel'),
        guideVietnameseLabel: document.getElementById('guideVietnameseLabel'),
        rhythmLabel: document.getElementById('rhythmLabel'),
        mistakeLabel: document.getElementById('mistakeLabel'),
        mouthShapeLabel: document.getElementById('mouthShapeLabel'),
        tongueLabel: document.getElementById('tongueLabel'),
        breathLabel: document.getElementById('breathLabel'),
        focusGuideText: document.getElementById('focusGuideText'),
        vietnameseGuideText: document.getElementById('vietnameseGuideText'),
        rhythmSteps: document.getElementById('rhythmSteps'),
        commonMistakeText: document.getElementById('commonMistakeText'),
        mouthShapeText: document.getElementById('mouthShapeText'),
        tongueText: document.getElementById('tongueText'),
        breathText: document.getElementById('breathText'),
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
        refs.coachLabel.textContent = T.coachLabel;
        refs.coachTitle.textContent = T.coachTitle;
        refs.guideKoreanLabel.textContent = T.guideKoreanLabel;
        refs.guideVietnameseLabel.textContent = T.guideVietnameseLabel;
        refs.rhythmLabel.textContent = T.rhythmLabel;
        refs.mistakeLabel.textContent = T.mistakeLabel;
        refs.mouthShapeLabel.textContent = T.mouthShapeLabel;
        refs.tongueLabel.textContent = T.tongueLabel;
        refs.breathLabel.textContent = T.breathLabel;
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
        renderCoachPanel();
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
            renderCoachPanel();
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
                        <p class="sentence-focus mt-2 text-xs font-bold uppercase tracking-[0.18em]">${escapeHtml(item.focus || '')}</p>
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
        renderCoachPanel();
        renderSentenceList();
        resetAttemptUi();
    }

    function addCustomSentence() {
        const text = refs.customSentenceInput.value.trim();
        if (!text) {
            alert(T.noCustomText);
            return;
        }
        sentenceSets[sentenceSets.length - 1].items.unshift(buildCustomPracticeItem(text));
        refs.customSentenceInput.value = '';
        persistCustomSentences();
        renderSentenceList();
        selectSentence(0);
        setStatus(T.addComplete);
    }

    function renderCoachPanel() {
        const item = state.currentSentence;
        refs.coachTags.innerHTML = '';

        if (!item) {
            refs.coachTitle.textContent = T.coachTitle;
            refs.focusGuideText.textContent = '문장을 고르면 여기에서 한국어 발음 포인트를 바로 확인할 수 있습니다.';
            refs.vietnameseGuideText.textContent = 'Khi chọn câu, phần này sẽ hiện hướng dẫn phát âm bằng tiếng Hàn và tiếng Việt.';
            refs.commonMistakeText.textContent = '먼저 모범 발음을 듣고, 어려운 소리가 들어 있는 음절을 천천히 따라 말해 보세요.';
            refs.mouthShapeText.textContent = '입술 모양이 모음마다 어떻게 바뀌는지 확인해 보세요.';
            refs.tongueText.textContent = '혀끝은 힘을 빼고, 필요한 순간에만 짧게 움직이도록 준비합니다.';
            refs.breathText.textContent = '짧은 문장은 한 호흡으로, 긴 문장은 2~3덩어리로 나누어 읽는 연습이 좋습니다.';
            refs.rhythmSteps.innerHTML = `
                <div class="rhythm-step">
                    <span class="rhythm-step-index">1</span>
                    <div>
                        <p class="rhythm-step-title">모범 발음 듣기</p>
                        <p class="rhythm-step-subtitle">표준 속도와 천천히 듣기를 번갈아 들으며 소리 차이를 먼저 익힙니다.</p>
                    </div>
                </div>
                <div class="rhythm-step">
                    <span class="rhythm-step-index">2</span>
                    <div>
                        <p class="rhythm-step-title">입모양과 혀 위치 확인</p>
                        <p class="rhythm-step-subtitle">입술이 둥근지, 평평한지, 혀끝이 어디에 닿는지 짧게 점검합니다.</p>
                    </div>
                </div>
                <div class="rhythm-step">
                    <span class="rhythm-step-index">3</span>
                    <div>
                        <p class="rhythm-step-title">따라 말하기</p>
                        <p class="rhythm-step-subtitle">문장을 2~4덩어리로 나누어 따라 읽은 뒤 한 번에 다시 말해 보세요.</p>
                    </div>
                </div>
            `;
            return;
        }

        refs.coachTitle.textContent = `${T.coachTitle}: ${item.focus || ''}`;
        refs.focusGuideText.textContent = item.koreanGuide || '';
        refs.vietnameseGuideText.textContent = item.vietnameseGuide || '';
        refs.commonMistakeText.textContent = item.commonMistake || '';
        refs.mouthShapeText.textContent = item.mouthShape || '';
        refs.tongueText.textContent = item.tongueTip || '';
        refs.breathText.textContent = item.breathTip || '';
        refs.coachTags.innerHTML = (item.tags || [])
            .map((tag) => `<span class="coach-tag">${escapeHtml(tag)}</span>`)
            .join('');

        const rhythm = (item.rhythm && item.rhythm.length) ? item.rhythm : buildRhythmChunks(item.text);
        refs.rhythmSteps.innerHTML = rhythm.map((step, index) => {
            const chunk = typeof step === 'string' ? step : (step.text || '');
            const tip = typeof step === 'string' ? '' : (step.tip || '');
            return `
                <div class="rhythm-step">
                    <span class="rhythm-step-index">${index + 1}</span>
                    <div>
                        <p class="rhythm-step-title">${escapeHtml(chunk)}</p>
                        <p class="rhythm-step-subtitle">${escapeHtml(tip)}</p>
                    </div>
                </div>
            `;
        }).join('');
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
        if (state.currentSentence?.coachNote) {
            notes.push(state.currentSentence.coachNote);
        }
        return notes.join(' ');
    }

    function createPracticeItem(item = {}) {
        const text = String(item.text || '').trim();
        return {
            text,
            meaning: item.meaning || '',
            focus: item.focus || '자유 연습',
            tags: Array.isArray(item.tags) && item.tags.length ? item.tags : ['자유 연습', '리듬', '따라 말하기'],
            koreanGuide: item.koreanGuide || '문장을 2~4어절로 나누고, 어려운 음절만 먼저 천천히 또렷하게 읽어 보세요.',
            vietnameseGuide: item.vietnameseGuide || 'Hãy chia câu thành 2-4 cụm ngắn và lặp lại từng cụm trước khi nói cả câu.',
            mouthShape: item.mouthShape || '입술은 모음마다 분명히 달라지되, 불필요하게 과장하지 않습니다.',
            tongueTip: item.tongueTip || '혀끝은 힘을 빼고 아래 앞니 뒤에 두었다가 필요한 순간에만 짧게 움직입니다.',
            breathTip: item.breathTip || '한 덩어리를 한 호흡으로 읽고, 긴 문장은 2~3덩어리로 나누어 이어 읽습니다.',
            commonMistake: item.commonMistake || '받침 뒤에 불필요한 모음을 붙이지 않도록 주의하세요.',
            coachNote: item.coachNote || '핵심 음절을 조금 더 천천히, 또렷하게 읽어 보세요.',
            rhythm: Array.isArray(item.rhythm) && item.rhythm.length ? item.rhythm : buildRhythmChunks(text)
        };
    }

    function buildCustomPracticeItem(text) {
        return createPracticeItem({
            text,
            meaning: T.customMeaning,
            focus: '자유 연습',
            tags: ['직접 입력', '리듬', '따라 말하기'],
            koreanGuide: '직접 입력한 문장은 2~4어절로 나누고, 핵심 단어가 들어 있는 덩어리부터 천천히 따라 말해 보세요.',
            vietnameseGuide: 'Với câu tự nhập, hãy chia thành 2-4 cụm ngắn rồi luyện từng cụm trước khi nói cả câu.',
            mouthShape: '모음이 바뀔 때마다 입술 모양도 함께 바뀌는지 거울처럼 확인해 보세요.',
            tongueTip: '혀끝이 긴장해 굳지 않도록 두고, ㄹ이나 마찰음이 나올 때만 짧게 움직입니다.',
            breathTip: '긴 문장은 뜻 덩어리마다 아주 짧게 쉬고, 끊기는 느낌 없이 다시 이어 줍니다.',
            commonMistake: '문장을 빨리 읽으려고 받침 뒤에 모음을 붙이거나 음절을 삼키기 쉽습니다.',
            coachNote: '핵심 단어를 먼저 또렷하게 읽고 전체 문장으로 넓혀 보세요.'
        });
    }

    function buildRhythmChunks(text) {
        const parts = String(text || '').trim().split(/\s+/).filter(Boolean);
        if (parts.length === 0) {
            return [];
        }

        const buckets = [];
        const targetChunkCount = Math.min(3, parts.length);
        const chunkSize = Math.ceil(parts.length / targetChunkCount);
        for (let index = 0; index < parts.length; index += chunkSize) {
            buckets.push(parts.slice(index, index + chunkSize).join(' '));
        }

        const tips = [
            '첫 덩어리는 입모양을 크게 확인하며 천천히 시작합니다.',
            '중간 덩어리는 속도를 유지하면서 어려운 자음을 선명하게 냅니다.',
            '마지막 덩어리는 호흡을 끊지 말고 문장 끝까지 자연스럽게 이어 갑니다.'
        ];

        return buckets.map((chunk, index) => ({
            text: chunk,
            tip: tips[Math.min(index, tips.length - 1)]
        }));
    }

    function normalizeStoredPracticeItem(item) {
        if (!item) {
            return null;
        }
        if (typeof item === 'string') {
            return buildCustomPracticeItem(item);
        }
        const text = String(item.text || '').trim();
        if (!text) {
            return null;
        }
        if (item.focus || item.koreanGuide || item.vietnameseGuide) {
            return createPracticeItem(item);
        }
        return createPracticeItem({
            ...buildCustomPracticeItem(text),
            ...item,
            text
        });
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
            if (!raw) {
                return [];
            }
            const stored = JSON.parse(raw);
            return Array.isArray(stored)
                ? stored.map(normalizeStoredPracticeItem).filter(Boolean)
                : [];
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
