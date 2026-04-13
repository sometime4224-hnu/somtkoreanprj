const IMAGE_BASE = "../assets/c14/grammar/images/grammar2-memory-quiz";

const QUESTIONS = [
    {
        id: "g2m_01",
        round: "라운드 1 · 장면 고르기",
        roundBadge: "Scene Match",
        type: "mcq",
        icon: "🌊",
        scene: "겨울 바다 사진",
        imageSrc: `${IMAGE_BASE}/memory-set-02.webp`,
        imagePosition: "0% 0%",
        memoryKo: "가족과 다녀온 여행지를 앨범에서 다시 보는 장면",
        memoryVi: "Cảnh mở album và nhớ lại nơi đã đi du lịch cùng gia đình.",
        q: "추억이 담긴 장소를 소개할 때 가장 자연스러운 문장을 고르세요.",
        qVi: "Chọn câu tự nhiên nhất để giới thiệu một địa điểm trong ký ức.",
        hintKo: "과거에 직접 가 봤던 장소를 떠올리면 됩니다.",
        hintVi: "Hãy nghĩ đến một nơi bạn đã từng đến trong quá khứ.",
        options: [
            "여기는 제가 작년 겨울에 가족들과 여행 갔던 바다입니다.",
            "여기는 제가 지금 여행 가고 있는 바다입니다.",
            "여기는 제가 여행 갈수록 좋아지는 바다입니다.",
            "여기는 제가 여행 가고 싶어하는 바다입니다."
        ],
        answer: "여기는 제가 작년 겨울에 가족들과 여행 갔던 바다입니다.",
        explainKo: "과거에 다녀온 경험을 떠올리며 바다를 설명하므로 `갔던 바다`가 가장 자연스럽습니다.",
        explainVi: "Câu đúng gợi lại trải nghiệm đã xảy ra trong quá khứ nên `biển đã từng đi` là tự nhiên nhất."
    },
    {
        id: "g2m_02",
        round: "라운드 1 · 장면 고르기",
        roundBadge: "Scene Match",
        type: "mcq",
        icon: "🧒",
        scene: "어린 시절 친구와 재회",
        imageFrames: [
            { src: `${IMAGE_BASE}/round1-scenes.webp`, position: "100% 0%" },
            { src: `${IMAGE_BASE}/round1-reunion.webp`, position: "100% 0%" }
        ],
        memoryKo: "어릴 때 친했던 친구를 오랜만에 다시 만난 장면",
        memoryVi: "Cảnh gặp lại người bạn từng thân thiết từ thời thơ ấu.",
        q: "오래된 친구를 떠올릴 때 가장 자연스러운 문장을 고르세요.",
        qVi: "Chọn câu tự nhiên nhất khi nhắc lại một người bạn cũ.",
        hintKo: "지금 친한 친구가 아니라 예전에 친했던 친구입니다.",
        hintVi: "Không phải bạn đang thân bây giờ mà là người từng thân trước đây.",
        options: [
            "어렸을 때 친했던 친구를 우연히 다시 만났어요.",
            "어렸을 때 친하고 있는 친구를 우연히 다시 만났어요.",
            "어렸을 때 친할수록 친구를 우연히 다시 만났어요.",
            "어렸을 때 친하고 싶던 친구를 우연히 다시 만났어요."
        ],
        answer: "어렸을 때 친했던 친구를 우연히 다시 만났어요.",
        explainKo: "예전에 친했던 관계를 기억 속에서 떠올려 명사를 꾸미므로 `친했던 친구`가 맞습니다.",
        explainVi: "Vì đang gợi lại mối quan hệ trong quá khứ nên `người bạn từng thân` là đúng."
    },
    {
        id: "g2m_03",
        round: "라운드 1 · 장면 고르기",
        roundBadge: "Scene Match",
        type: "mcq",
        icon: "✈️",
        scene: "비행기 인연과 다시 만남",
        imageFrames: [
            { src: `${IMAGE_BASE}/memory-set-01.webp`, position: "100% 0%" },
            { src: `${IMAGE_BASE}/round1-reunion.webp`, position: "0% 100%" }
        ],
        memoryKo: "비행기에서 만났던 인연을 나중에 다시 알아보는 장면",
        memoryVi: "Cảnh nhận ra và gặp lại người đã quen trên máy bay.",
        q: "과거에 만났던 사람을 가리킬 때 가장 자연스러운 문장을 고르세요.",
        qVi: "Chọn câu tự nhiên nhất khi chỉ vào một người đã gặp trong quá khứ.",
        hintKo: "지금 보는 사람이 예전에 만난 사람이라는 뜻입니다.",
        hintVi: "Người đang thấy bây giờ chính là người đã gặp trước đây.",
        options: [
            "한국에 올 때 비행기에서 만났던 사람이에요.",
            "한국에 올 때 비행기에서 만나고 있는 사람이에요.",
            "한국에 올 때 비행기에서 만날 사람이에요.",
            "한국에 올 때 비행기에서 만나고 싶어하는 사람이에요."
        ],
        answer: "한국에 올 때 비행기에서 만났던 사람이에요.",
        explainKo: "지금 보고 있는 사람을 예전 경험과 연결해 가리키므로 `만났던 사람`이 가장 자연스럽습니다.",
        explainVi: "Vì đang chỉ vào người hiện tại và nối với trải nghiệm trước đây nên `만났던 사람` là tự nhiên nhất."
    },
    {
        id: "g2m_04",
        round: "라운드 1 · 장면 고르기",
        roundBadge: "Scene Match",
        type: "mcq",
        icon: "☕",
        scene: "좋았던 카페 기억",
        imageSrc: `${IMAGE_BASE}/memory-set-01.webp`,
        imagePosition: "0% 100%",
        memoryKo: "예전에 들렀던 카페의 분위기를 다시 떠올리는 장면",
        memoryVi: "Cảnh nhớ lại bầu không khí của quán cà phê từng ghé trước đây.",
        q: "예전의 인상을 떠올릴 때 가장 자연스러운 문장을 고르세요.",
        qVi: "Chọn câu tự nhiên nhất khi nhắc lại ấn tượng trong quá khứ.",
        hintKo: "그때의 느낌을 지금 다시 꺼내는 문장입니다.",
        hintVi: "Đây là câu gợi lại cảm giác đã có vào lúc đó.",
        options: [
            "지난봄에 갔던 골목에는 분위기가 정말 좋았던 카페가 있었어요.",
            "지난봄에 갔던 골목에는 분위기가 정말 좋아하는 카페가 있었어요.",
            "지난봄에 갔던 골목에는 분위기가 정말 좋아지고 있는 카페가 있었어요.",
            "지난봄에 갔던 골목에는 분위기가 정말 좋을수록 카페가 있었어요."
        ],
        answer: "지난봄에 갔던 골목에는 분위기가 정말 좋았던 카페가 있었어요.",
        explainKo: "그때 느꼈던 인상과 기억을 떠올리는 문맥이라 `좋았던 카페`가 자연스럽습니다.",
        explainVi: "Vì câu đang gợi lại ấn tượng đã có trong quá khứ nên `quán cà phê từng rất đẹp/dễ chịu` là đúng."
    },
    {
        id: "g2m_05",
        round: "라운드 2 · 빈칸 복원",
        roundBadge: "Blank Restore",
        type: "mcq",
        icon: "📸",
        scene: "졸업 여행 사진",
        imageSrc: `${IMAGE_BASE}/memory-set-03.webp`,
        imagePosition: "0% 0%",
        memoryKo: "사진 한 장을 보며 옛날 기억이 떠오르는 장면",
        memoryVi: "Cảnh nhìn lại một bức ảnh và nhớ về chuyện cũ.",
        q: "“졸업 여행 갔을 때 ____ 사진을 보니까 옛날 생각이 많이 나요.”에 알맞은 것을 고르세요.",
        qVi: "Điền vào chỗ trống trong câu nói về bức ảnh chụp khi đi du lịch tốt nghiệp.",
        hintKo: "사진은 과거에 이미 찍은 것입니다.",
        hintVi: "Bức ảnh là thứ đã được chụp rồi trong quá khứ.",
        options: ["찍었던", "찍고 있는", "찍는", "찍을"],
        answer: "찍었던",
        explainKo: "과거에 찍은 사진을 떠올릴 때 `찍었던 사진`이라고 말합니다.",
        explainVi: "Khi nhắc lại bức ảnh đã chụp trong quá khứ, ta dùng `찍었던 사진`."
    },
    {
        id: "g2m_06",
        round: "라운드 2 · 빈칸 복원",
        roundBadge: "Blank Restore",
        type: "mcq",
        icon: "🧥",
        scene: "아침에 입고 온 스웨터",
        imageSrc: `${IMAGE_BASE}/memory-set-01.webp`,
        imagePosition: "100% 100%",
        memoryKo: "조금 전까지 입고 있었던 옷을 떠올리는 장면",
        memoryVi: "Cảnh nhớ lại chiếc áo đã mặc khi đến đây trước đó.",
        q: "“날씨가 더워서 아침에 ____ 스웨터를 벗었어요.”에 알맞은 것을 고르세요.",
        qVi: "Điền vào chỗ trống trong câu nói về chiếc áo đã mặc khi đến đây buổi sáng.",
        hintKo: "이미 입고 와서 지금은 벗은 옷입니다.",
        hintVi: "Đó là chiếc áo đã mặc khi tới đây, còn bây giờ đã cởi ra.",
        options: ["입고 왔던", "입고 있는", "입을", "입고 싶던"],
        answer: "입고 왔던",
        explainKo: "현재가 아니라 이전에 입고 왔던 상태를 떠올려 말하므로 `입고 왔던 스웨터`가 맞습니다.",
        explainVi: "Vì đang nhắc lại trạng thái đã mặc lúc trước khi đến đây nên `입고 왔던` là đúng."
    },
    {
        id: "g2m_07",
        round: "라운드 2 · 빈칸 복원",
        roundBadge: "Blank Restore",
        type: "mcq",
        icon: "🏘️",
        scene: "예전에 살던 동네",
        imageSrc: `${IMAGE_BASE}/memory-set-03.webp`,
        imagePosition: "0% 100%",
        memoryKo: "과거에 살았던 동네가 달라진 것을 떠올리는 장면",
        memoryVi: "Cảnh nhớ lại khu phố mình đã từng sống và so sánh với hiện tại.",
        q: "“제가 초등학교 때 ____ 동네가 지금은 많이 달라졌어요.”에 알맞은 것을 고르세요.",
        qVi: "Điền vào chỗ trống trong câu nói về khu phố mình từng sống hồi tiểu học.",
        hintKo: "예전에 살았던 곳입니다.",
        hintVi: "Đó là nơi bạn đã từng sống trước đây.",
        options: ["살았던", "살고 있는", "사는", "살수록"],
        answer: "살았던",
        explainKo: "지금 사는 곳이 아니라 과거에 살았던 장소를 떠올리는 문장이므로 `살았던 동네`가 자연스럽습니다.",
        explainVi: "Đây không phải nơi đang sống bây giờ mà là nơi từng sống trong quá khứ, nên `살았던` là đúng."
    },
    {
        id: "g2m_08",
        round: "라운드 2 · 빈칸 복원",
        roundBadge: "Blank Restore",
        type: "mcq",
        icon: "🌧️",
        scene: "비 오는 날의 공원",
        imageSrc: `${IMAGE_BASE}/memory-set-03.webp`,
        imagePosition: "100% 100%",
        memoryKo: "비 오는 날 들렀던 공원의 느낌을 떠올리는 장면",
        memoryVi: "Cảnh nhớ lại cảm giác về công viên đã ghé vào ngày mưa.",
        q: "“비 오는 날 들렀던 공원은 생각보다 ____ 곳이었어요.”에 알맞은 것을 고르세요.",
        qVi: "Điền vào chỗ trống trong câu gợi lại ấn tượng về công viên đã ghé vào ngày mưa.",
        hintKo: "그날 느꼈던 분위기를 떠올립니다.",
        hintVi: "Hãy nghĩ đến ấn tượng đã cảm nhận được vào ngày hôm đó.",
        options: ["조용했던", "조용하는", "조용할", "조용해지고 있는"],
        answer: "조용했던",
        explainKo: "과거에 느낀 상태를 다시 떠올리므로 형용사 `조용하다`에도 `-었던`을 붙여 `조용했던 곳`이라고 합니다.",
        explainVi: "Vì đang gợi lại trạng thái đã cảm nhận trong quá khứ nên với tính từ `조용하다` ta dùng `조용했던`."
    },
    {
        id: "g2m_09",
        round: "라운드 3 · 짧은 완성",
        roundBadge: "Short Build",
        type: "short",
        icon: "📮",
        baseWord: "친하다",
        scene: "어릴 때 친구에게 다시 연락",
        imageFrames: [
            { src: `${IMAGE_BASE}/round1-scenes.webp`, position: "100% 0%" },
            { src: `${IMAGE_BASE}/memory-set-01.webp`, position: "0% 0%" }
        ],
        memoryKo: "어릴 때 친했던 친구를 떠올리며 다시 연락하는 장면",
        memoryVi: "Cảnh nhớ lại người bạn thân hồi nhỏ rồi liên lạc lại.",
        q: "“어렸을 때 ____ 친구와 다시 연락하게 됐어요.” 빈칸에 들어갈 표현을 쓰세요.",
        qVi: "Viết cụm đúng vào chỗ trống bằng từ gốc bên dưới.",
        hintKo: "답은 한 단어입니다.",
        hintVi: "Câu trả lời chỉ là một cụm ngắn.",
        answers: ["친했던"],
        explainKo: "`친하다`의 과거 기억형은 `친했던`입니다.",
        explainVi: "Dạng gợi nhớ quá khứ của `친하다` là `친했던`."
    },
    {
        id: "g2m_10",
        round: "라운드 3 · 짧은 완성",
        roundBadge: "Short Build",
        type: "short",
        icon: "🛫",
        baseWord: "만나다",
        scene: "비행기에서 만난 사람을 다시 봄",
        imageFrames: [
            { src: `${IMAGE_BASE}/memory-set-01.webp`, position: "100% 0%" },
            { src: `${IMAGE_BASE}/round1-reunion.webp`, position: "0% 100%" }
        ],
        memoryKo: "비행기에서 만났던 사람을 다시 보며 핵심 표현만 쓰는 장면",
        memoryVi: "Cảnh gặp lại người đã quen trên máy bay và hoàn thành cụm trọng tâm.",
        q: "“한국에 올 때 비행기에서 ____ 사람이에요.” 빈칸에 들어갈 표현을 쓰세요.",
        qVi: "Điền cụm đúng vào chỗ trống bằng từ gốc bên dưới.",
        hintKo: "사람 앞에 들어가는 관형형입니다.",
        hintVi: "Đây là dạng bổ nghĩa đứng trước danh từ `người`.",
        answers: ["만났던"],
        explainKo: "`만나다`는 과거 경험을 떠올려 현재의 사람을 가리킬 때 `만났던 사람`처럼 씁니다.",
        explainVi: "Với `만나다`, khi gợi lại trải nghiệm quá khứ để chỉ vào người hiện tại ta dùng `만났던 사람`."
    },
    {
        id: "g2m_11",
        round: "라운드 3 · 짧은 완성",
        roundBadge: "Short Build",
        type: "short",
        icon: "🏡",
        baseWord: "좋다",
        scene: "분위기가 좋았던 카페",
        imageSrc: `${IMAGE_BASE}/memory-set-02.webp`,
        imagePosition: "100% 100%",
        memoryKo: "그때 좋았던 인상을 짧게 다시 적는 장면",
        memoryVi: "Cảnh viết lại ngắn gọn ấn tượng tốt đẹp của lúc đó.",
        q: "“제주도에서 묵었던 숙소 앞에는 분위기가 ____ 카페가 있었어요.” 빈칸에 들어갈 표현을 쓰세요.",
        qVi: "Điền cụm đúng vào chỗ trống bằng từ gốc bên dưới.",
        hintKo: "형용사도 `-았던/었던`으로 쓸 수 있습니다.",
        hintVi: "Tính từ cũng có thể đi với `-았던/었던`.",
        answers: ["좋았던"],
        explainKo: "그때 느꼈던 좋은 인상을 떠올리는 것이므로 `좋았던 카페`라고 합니다.",
        explainVi: "Vì đang gợi lại ấn tượng tốt đã có lúc đó nên ta dùng `좋았던 카페`."
    },
    {
        id: "g2m_12",
        round: "라운드 3 · 짧은 완성",
        roundBadge: "Short Build",
        type: "short",
        icon: "🧳",
        baseWord: "입고 오다",
        scene: "벗어서 가방에 넣은 스웨터",
        imageSrc: `${IMAGE_BASE}/memory-set-01.webp`,
        imagePosition: "100% 100%",
        memoryKo: "조금 전까지 입고 있었던 옷을 떠올리며 표현을 완성하는 장면",
        memoryVi: "Cảnh hoàn thành cụm khi nhắc lại chiếc áo vừa nãy còn đang mặc.",
        q: "“아침에 ____ 스웨터를 지금은 가방에 넣어 뒀어요.” 빈칸에 들어갈 표현을 쓰세요.",
        qVi: "Điền cụm đúng vào chỗ trống bằng từ gốc bên dưới.",
        hintKo: "두 동작이 합쳐진 표현입니다.",
        hintVi: "Đây là một cụm kết hợp hai hành động.",
        answers: ["입고 왔던"],
        explainKo: "이전 상태를 떠올리며 말할 때 `입고 왔던 스웨터`라고 할 수 있습니다.",
        explainVi: "Khi gợi lại trạng thái trước đó, ta nói `입고 왔던 스웨터`."
    },
    {
        id: "g2m_13",
        round: "라운드 3 · 짧은 완성",
        roundBadge: "Short Build",
        type: "short",
        icon: "📷",
        baseWord: "찍다",
        scene: "졸업 여행에서 찍은 사진",
        imageSrc: `${IMAGE_BASE}/memory-set-03.webp`,
        imagePosition: "0% 0%",
        memoryKo: "졸업 여행 때 찍은 사진을 다시 보며 표현을 완성하는 장면",
        memoryVi: "Cảnh nhìn lại bức ảnh chụp trong chuyến du lịch tốt nghiệp và hoàn thành cụm.",
        q: "“졸업 여행 갔을 때 친구들과 ____ 사진이에요.” 빈칸에 들어갈 표현을 쓰세요.",
        qVi: "Điền cụm đúng vào chỗ trống bằng từ gốc bên dưới.",
        hintKo: "사진 앞에 오는 말입니다.",
        hintVi: "Đây là cụm đứng trước danh từ `ảnh`.",
        answers: ["찍었던"],
        explainKo: "과거에 찍은 사진을 떠올릴 때는 `찍었던 사진`이라고 합니다.",
        explainVi: "Khi gợi lại bức ảnh đã chụp trong quá khứ, ta dùng `찍었던 사진`."
    },
    {
        id: "g2m_14",
        round: "라운드 3 · 짧은 완성",
        roundBadge: "Short Build",
        type: "short",
        icon: "🏘️",
        baseWord: "살다",
        scene: "초등학교 때 살던 동네",
        imageSrc: `${IMAGE_BASE}/memory-set-03.webp`,
        imagePosition: "0% 100%",
        memoryKo: "예전에 살았던 동네를 다시 걸으며 표현을 완성하는 장면",
        memoryVi: "Cảnh đi lại khu phố mình từng sống và hoàn thành cụm.",
        q: "“초등학교 때 ____ 동네를 오랜만에 다시 걸어 봤어요.” 빈칸에 들어갈 표현을 쓰세요.",
        qVi: "Điền cụm đúng vào chỗ trống bằng từ gốc bên dưới.",
        hintKo: "동네 앞에 오는 과거 회상 표현입니다.",
        hintVi: "Đây là cụm hồi tưởng quá khứ đứng trước danh từ `khu phố`.",
        answers: ["살았던"],
        explainKo: "지금 사는 곳이 아니라 예전에 살았던 장소를 말하므로 `살았던 동네`가 맞습니다.",
        explainVi: "Vì đang nói về nơi từng sống chứ không phải nơi đang sống nên `살았던 동네` là đúng."
    },
    {
        id: "g2m_15",
        round: "라운드 3 · 짧은 완성",
        roundBadge: "Short Build",
        type: "short",
        icon: "🌧️",
        baseWord: "조용하다",
        scene: "비 오는 날의 조용한 공원",
        imageSrc: `${IMAGE_BASE}/memory-set-03.webp`,
        imagePosition: "100% 100%",
        memoryKo: "비 오는 날 들렀던 공원의 분위기를 다시 떠올리며 표현을 완성하는 장면",
        memoryVi: "Cảnh nhớ lại bầu không khí của công viên đã ghé vào ngày mưa và hoàn thành cụm.",
        q: "“비 오는 날 갔던 그 공원은 생각보다 ____ 곳이었어요.” 빈칸에 들어갈 표현을 쓰세요.",
        qVi: "Điền cụm đúng vào chỗ trống bằng từ gốc bên dưới.",
        hintKo: "그날 느꼈던 분위기를 떠올리는 형용사입니다.",
        hintVi: "Đây là tính từ gợi lại ấn tượng đã cảm nhận vào ngày hôm đó.",
        answers: ["조용했던"],
        explainKo: "그날의 분위기를 다시 떠올리는 말이므로 `조용했던 곳`이라고 자연스럽게 말할 수 있습니다.",
        explainVi: "Vì đang gợi lại bầu không khí của ngày hôm đó nên `조용했던 곳` là cách nói tự nhiên."
    }
];

const QUESTION_BY_ID = Object.fromEntries(QUESTIONS.map((question) => [question.id, question]));

const state = {
    mode: "all",
    questions: [],
    index: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    answered: false,
    selectedChoiceIndex: null,
    logs: []
};

const page = document.getElementById("page");
const viToggle = document.getElementById("viToggle");
const startBtn = document.getElementById("startBtn");
const startPanel = document.getElementById("startPanel");
const quizPanel = document.getElementById("quizPanel");
const quizCard = document.getElementById("quizCard");
const resultPanel = document.getElementById("resultPanel");

let viOn = false;

viToggle.addEventListener("click", () => {
    viOn = !viOn;
    page.classList.toggle("vi-on", viOn);
    viToggle.textContent = viOn ? "Tiếng Việt ON" : "Tiếng Việt OFF";
});

startBtn.addEventListener("click", () => {
    startQuiz(QUESTIONS, "all");
});

function startQuiz(baseQuestions, mode) {
    state.mode = mode;
    state.questions = prepareQuestions(baseQuestions);
    state.index = 0;
    state.score = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.answered = false;
    state.selectedChoiceIndex = null;
    state.logs = [];

    startPanel.classList.add("hidden");
    resultPanel.classList.add("hidden");
    resultPanel.innerHTML = "";
    quizPanel.classList.remove("hidden");
    renderQuestion();
}

function prepareQuestions(baseQuestions) {
    return baseQuestions.map((question) => {
        if (question.type === "mcq") {
            return {
                ...question,
                shuffledOptions: shuffle([...question.options])
            };
        }
        return { ...question };
    });
}

function renderQuestion() {
    const question = state.questions[state.index];
    const currentNumber = state.index + 1;
    const total = state.questions.length;
    const progressWidth = `${(currentNumber / total) * 100}%`;
    const isMcq = question.type === "mcq";
    const selectedText = isMcq && state.selectedChoiceIndex !== null
        ? question.shuffledOptions[state.selectedChoiceIndex]
        : "";
    const choicesHtml = isMcq
        ? renderChoices(question)
        : renderShortAnswer(question);

    quizCard.innerHTML = `
        <div class="flex flex-wrap items-start justify-between gap-3">
            <div>
                <p class="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Progress</p>
                <p class="mt-1 text-lg font-black text-slate-900">${currentNumber} / ${total}</p>
            </div>
            <div class="flex flex-wrap gap-2 text-xs font-black">
                <span class="chip bg-amber-50 text-amber-700">점수 ${state.score}</span>
                <span class="chip bg-emerald-50 text-emerald-700">연속 정답 ${state.streak}</span>
                <span class="chip bg-sky-50 text-sky-700">최고 연속 ${state.bestStreak}</span>
            </div>
        </div>
        <div class="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div class="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 transition-all duration-300" style="width:${progressWidth}"></div>
        </div>

        <div class="mt-5 grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
            <aside class="memory-frame px-4 pb-4 pt-5">
                <div class="memory-tape" aria-hidden="true"></div>
                <div class="memory-photo min-h-[260px]">
                    ${renderImageCollage(question)}
                    <div class="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-lg shadow-sm">${escapeHtml(question.icon)}</div>
                    <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/78 via-slate-900/34 to-transparent px-4 pb-4 pt-12">
                        <p class="text-[11px] font-black uppercase tracking-[0.16em] text-amber-200">Memory Scene</p>
                        <p class="mt-1 text-xl font-black text-white safe">${escapeHtml(question.scene)}</p>
                    </div>
                </div>
                <div class="mt-4 rounded-[20px] border border-amber-100 bg-white/85 px-4 py-3">
                    <p class="text-xs font-black uppercase tracking-[0.14em] text-slate-500">기억 메모</p>
                    <p class="mt-2 text-sm leading-7 text-slate-700 safe">${escapeHtml(question.memoryKo)}</p>
                    <p class="vi-text mt-1 text-xs leading-6 text-emerald-700 safe">${escapeHtml(question.memoryVi)}</p>
                </div>
            </aside>

            <section>
                <div class="rounded-[24px] border border-amber-100 bg-amber-50/70 p-4">
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="chip bg-white text-amber-700 ring-1 ring-amber-100">${escapeHtml(question.roundBadge)}</span>
                        <span class="chip bg-white text-slate-500 ring-1 ring-slate-200">${escapeHtml(question.round)}</span>
                    </div>
                    <p class="mt-3 text-xl font-black leading-9 text-slate-900 safe">${escapeHtml(question.q)}</p>
                    <p class="vi-text mt-2 text-sm leading-7 text-emerald-700 safe">${escapeHtml(question.qVi)}</p>
                    <p class="mt-3 text-sm leading-7 text-slate-600 safe">${escapeHtml(question.hintKo)}</p>
                    <p class="vi-text mt-1 text-xs leading-6 text-emerald-700 safe">${escapeHtml(question.hintVi)}</p>
                </div>

                <div class="mt-4">${choicesHtml}</div>

                ${renderFeedback(question, selectedText)}

                <div class="mt-4 grid gap-2 sm:grid-cols-2">
                    <button type="button" id="confirmBtn" class="action-btn rounded-2xl bg-amber-500 px-5 py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-40" ${isConfirmDisabled(question) ? "disabled" : ""}>정답 확인</button>
                    <button type="button" id="nextBtn" class="action-btn rounded-2xl bg-slate-900 px-5 py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-40" ${state.answered ? "" : "disabled"}>${currentNumber === total ? "결과 보기" : "다음 문제"}</button>
                </div>
            </section>
        </div>
    `;

    bindQuestionEvents(question);
}

function renderImageCollage(question) {
    const frames = getImageFrames(question);
    const collageClass = frames.length > 1
        ? "memory-collage memory-collage--double"
        : "memory-collage memory-collage--single";

    return `
        <div class="${collageClass}">
            ${frames.map((frame) => `
                <div class="memory-tile">
                    <div
                        class="memory-image"
                        role="img"
                        aria-label="${escapeAttribute(frame.alt || question.scene)}"
                        style="background-image:url('${escapeAttribute(frame.src)}'); background-position:${escapeAttribute(frame.position || "50% 50%")};"
                    ></div>
                </div>
            `).join("")}
        </div>
    `;
}

function getImageFrames(question) {
    if (Array.isArray(question.imageFrames) && question.imageFrames.length > 0) {
        return question.imageFrames;
    }

    return [
        {
            src: question.imageSrc,
            position: question.imagePosition,
            alt: question.scene
        }
    ];
}

function renderChoices(question) {
    return `
        <div class="grid gap-3">
            ${question.shuffledOptions.map((option, index) => {
                const isSelected = state.selectedChoiceIndex === index;
                const isCorrect = state.answered && option === question.answer;
                const isWrongSelected = state.answered && isSelected && option !== question.answer;
                let className = "border-slate-200 bg-white text-slate-700";

                if (isCorrect) {
                    className = "border-emerald-400 bg-emerald-50 text-emerald-800";
                } else if (isWrongSelected) {
                    className = "border-rose-400 bg-rose-50 text-rose-800";
                } else if (isSelected) {
                    className = "border-amber-400 bg-amber-50 text-amber-800";
                } else if (state.answered) {
                    className = "border-slate-200 bg-slate-50 text-slate-400";
                }

                return `
                    <button
                        type="button"
                        class="choice-btn w-full rounded-[22px] border px-4 py-4 text-left text-sm font-bold leading-7 ${className}"
                        data-choice-index="${index}"
                        ${state.answered ? "disabled" : ""}
                    >
                        ${escapeHtml(option)}
                    </button>
                `;
            }).join("")}
        </div>
    `;
}

function renderShortAnswer(question) {
    const submittedValue = getSubmittedValue(question.id);
    const value = state.answered ? submittedValue : "";
    const baseWordHtml = question.baseWord
        ? `
            <div class="rounded-[20px] border border-amber-200 bg-amber-50 px-4 py-3">
                <p class="text-[11px] font-black uppercase tracking-[0.14em] text-amber-700">사용 용언</p>
                <p class="mt-2 text-lg font-black text-slate-900">${escapeHtml(question.baseWord)}</p>
                <p class="mt-1 text-xs leading-6 text-slate-600 safe">위 용언을 <span class="font-black text-amber-700">V-았/었던</span> 형태로 바꿔 써 보세요.</p>
            </div>
        `
        : "";

    return `
        <div class="space-y-3">
            ${baseWordHtml}
            <div class="rounded-[24px] border border-slate-200 bg-white p-4">
                <label for="shortInput" class="text-xs font-black uppercase tracking-[0.14em] text-slate-500">직접 써 보기</label>
                <input
                    id="shortInput"
                    type="text"
                    value="${escapeAttribute(value)}"
                    class="mt-3 w-full rounded-2xl border border-slate-300 px-4 py-4 text-base font-semibold text-slate-800 outline-none transition focus:border-amber-400"
                    placeholder="${escapeAttribute("예: V-았/었던")}"
                    ${state.answered ? "disabled" : ""}
                    autocomplete="off"
                    autocapitalize="off"
                    spellcheck="false"
                />
                <p class="mt-2 text-xs leading-6 text-slate-500 safe">공백은 자동으로 정리해서 확인합니다.</p>
            </div>
        </div>
    `;
}

function renderFeedback(question, selectedText) {
    if (!state.answered) {
        return "";
    }

    const submittedValue = question.type === "mcq" ? selectedText : getSubmittedValue(question.id);
    const log = state.logs[state.logs.length - 1];
    const answerLabel = question.type === "mcq" ? question.answer : question.answers[0];
    const toneClass = log.ok
        ? "border-emerald-200 bg-emerald-50"
        : "border-rose-200 bg-rose-50";
    const titleClass = log.ok
        ? "text-emerald-700"
        : "text-rose-700";

    return `
        <div class="mt-4 rounded-[24px] border p-4 ${toneClass}">
            <p class="text-sm font-black ${titleClass}">${log.ok ? "정답입니다." : "오답입니다."}</p>
            <p class="mt-2 text-sm leading-7 text-slate-700"><b>내 답:</b> ${escapeHtml(submittedValue || "(무응답)")}</p>
            <p class="mt-1 text-sm leading-7 text-slate-700"><b>정답:</b> ${escapeHtml(answerLabel)}</p>
            <p class="mt-2 text-sm leading-7 text-slate-700 safe"><b>설명:</b> ${escapeHtml(question.explainKo)}</p>
            <p class="vi-text mt-1 text-xs leading-6 text-emerald-700 safe"><b>VI:</b> ${escapeHtml(question.explainVi)}</p>
        </div>
    `;
}

function bindQuestionEvents(question) {
    if (question.type === "mcq") {
        document.querySelectorAll("[data-choice-index]").forEach((button) => {
            button.addEventListener("click", () => {
                if (state.answered) {
                    return;
                }
                state.selectedChoiceIndex = Number(button.dataset.choiceIndex);
                renderQuestion();
            });
        });
    } else {
        const input = document.getElementById("shortInput");
        if (input) {
            input.addEventListener("input", () => {
                const confirmBtn = document.getElementById("confirmBtn");
                if (confirmBtn) {
                    confirmBtn.disabled = normalizeText(input.value) === "";
                }
            });
        }
    }

    document.getElementById("confirmBtn").addEventListener("click", checkAnswer);
    document.getElementById("nextBtn").addEventListener("click", nextQuestion);
}

function isConfirmDisabled(question) {
    if (state.answered) {
        return true;
    }
    if (question.type === "mcq") {
        return state.selectedChoiceIndex === null;
    }
    return true;
}

function checkAnswer() {
    const question = state.questions[state.index];
    let userAnswer = "";
    let isCorrect = false;

    if (question.type === "mcq") {
        if (state.selectedChoiceIndex === null) {
            return;
        }
        userAnswer = question.shuffledOptions[state.selectedChoiceIndex];
        isCorrect = userAnswer === question.answer;
    } else {
        const input = document.getElementById("shortInput");
        userAnswer = input ? input.value.trim() : "";
        if (!userAnswer) {
            return;
        }
        isCorrect = question.answers.some((answer) => normalizeText(answer) === normalizeText(userAnswer));
    }

    state.answered = true;
    if (isCorrect) {
        state.score += 1;
        state.streak += 1;
        state.bestStreak = Math.max(state.bestStreak, state.streak);
    } else {
        state.streak = 0;
    }

    state.logs.push({
        id: question.id,
        ok: isCorrect,
        userAnswer,
        correctAnswer: question.type === "mcq" ? question.answer : question.answers[0]
    });

    renderQuestion();
}

function nextQuestion() {
    if (!state.answered) {
        return;
    }

    if (state.index === state.questions.length - 1) {
        renderResult();
        return;
    }

    state.index += 1;
    state.answered = false;
    state.selectedChoiceIndex = null;
    renderQuestion();
}

function renderResult() {
    const total = state.questions.length;
    const correctCount = state.score;
    const wrongLogs = state.logs.filter((log) => !log.ok);
    const ratio = total === 0 ? 0 : correctCount / total;
    const headline = getResultHeadline(ratio, state.mode);
    const description = getResultDescription(ratio, state.mode);

    quizPanel.classList.add("hidden");
    resultPanel.classList.remove("hidden");
    resultPanel.innerHTML = `
        <div class="rounded-[26px] bg-gradient-to-br from-amber-50 via-white to-emerald-50 p-5">
            <p class="text-[11px] font-black uppercase tracking-[0.16em] text-amber-700">Result</p>
            <h2 class="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">${headline.ko}</h2>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600 safe">${description.ko}</p>
            <p class="vi-text mt-1 max-w-2xl text-xs leading-6 text-emerald-700 safe">${description.vi}</p>

            <div class="mt-4 flex flex-wrap gap-2 text-xs font-black">
                <span class="chip bg-white text-amber-700">정답 ${correctCount} / ${total}</span>
                <span class="chip bg-white text-emerald-700">정답률 ${Math.round(ratio * 100)}%</span>
                <span class="chip bg-white text-sky-700">최고 연속 ${state.bestStreak}</span>
            </div>

            <div class="mt-5 grid gap-3 sm:grid-cols-2">
                ${wrongLogs.length > 0
                    ? `<button id="retryWrongBtn" class="action-btn rounded-2xl bg-amber-500 px-5 py-4 text-sm font-black text-white">틀린 문제 다시 풀기</button>`
                    : `<button disabled class="rounded-2xl bg-slate-200 px-5 py-4 text-sm font-black text-slate-500">모든 문제 정답 완료</button>`}
                <button id="restartBtn" class="action-btn rounded-2xl bg-slate-900 px-5 py-4 text-sm font-black text-white">처음부터 다시</button>
            </div>

            <div class="mt-3 grid gap-3 sm:grid-cols-2">
                <a href="grammar2.html" class="action-btn rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center text-sm font-black text-slate-700">문법 2 복습</a>
                <a href="grammar1-2-speaking.html" class="action-btn rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center text-sm font-black text-slate-700">융합 말하기로 이동</a>
            </div>
        </div>

        ${renderReviewList(wrongLogs)}
    `;

    const retryButton = document.getElementById("retryWrongBtn");
    if (retryButton) {
        retryButton.addEventListener("click", () => {
            const wrongQuestions = wrongLogs.map((log) => QUESTION_BY_ID[log.id]);
            startQuiz(wrongQuestions, "retry");
        });
    }

    document.getElementById("restartBtn").addEventListener("click", () => {
        startQuiz(QUESTIONS, "all");
    });
}

function renderReviewList(wrongLogs) {
    if (wrongLogs.length === 0) {
        return `
            <div class="mt-4 rounded-[24px] border border-emerald-200 bg-emerald-50 p-4">
                <p class="text-sm font-black text-emerald-700">틀린 문제가 없어요.</p>
                <p class="mt-2 text-sm leading-7 text-slate-700 safe">과거 경험과 기억 속 대상을 떠올리는 감각을 잘 잡았습니다.</p>
                <p class="vi-text mt-1 text-xs leading-6 text-emerald-700 safe">Bạn đã nắm khá chắc cách gợi lại người, vật và nơi chốn trong ký ức.</p>
            </div>
        `;
    }

    return `
        <div class="mt-4">
            <p class="text-sm font-black text-slate-900">다시 보면 좋은 문제</p>
            <div class="mt-3 grid gap-3">
                ${wrongLogs.map((log) => {
                    const question = QUESTION_BY_ID[log.id];
                    return `
                        <article class="rounded-[24px] border border-slate-200 bg-white p-4">
                            <div class="flex flex-wrap items-center gap-2">
                                <span class="chip bg-rose-50 text-rose-700">복습</span>
                                <span class="chip bg-slate-50 text-slate-600">${escapeHtml(question.round)}</span>
                            </div>
                            <p class="mt-3 text-sm font-black leading-7 text-slate-900 safe">${escapeHtml(question.q)}</p>
                            <p class="mt-2 text-sm leading-7 text-slate-700"><b>정답:</b> ${escapeHtml(log.correctAnswer)}</p>
                            <p class="mt-1 text-sm leading-7 text-slate-700 safe"><b>포인트:</b> ${escapeHtml(question.explainKo)}</p>
                        </article>
                    `;
                }).join("")}
            </div>
        </div>
    `;
}

function getResultHeadline(ratio, mode) {
    if (mode === "retry") {
        if (ratio === 1) {
            return {
                ko: "틀린 문제까지 깔끔하게 정리했어요.",
                vi: "Bạn đã xử lý gọn cả những câu trước đó còn sai."
            };
        }
        return {
            ko: "헷갈리던 부분이 많이 정리됐어요.",
            vi: "Những điểm từng dễ nhầm đã được làm rõ hơn."
        };
    }

    if (ratio >= 0.84) {
        return {
            ko: "추억 표현을 아주 자연스럽게 잡았어요.",
            vi: "Bạn đã nắm rất tự nhiên cách diễn đạt ký ức."
        };
    }
    if (ratio >= 0.6) {
        return {
            ko: "핵심은 잘 이해했고, 몇 개만 더 다듬으면 돼요.",
            vi: "Bạn đã hiểu ý chính, chỉ cần chỉnh lại vài điểm nữa."
        };
    }
    return {
        ko: "현재 장면과 추억 장면을 한 번 더 나눠 보면 좋아요.",
        vi: "Bạn nên luyện thêm cách phân biệt cảnh hiện tại với ký ức quá khứ."
    };
}

function getResultDescription(ratio, mode) {
    if (mode === "retry") {
        if (ratio === 1) {
            return {
                ko: "`-고 있는`과 `-았던/었던`의 차이, 그리고 형용사 활용까지 안정적으로 정리했습니다. 이제 말하기 활동으로 이어 가도 좋습니다.",
                vi: "Bạn đã củng cố ổn định sự khác nhau giữa `-고 있는` và `-았던/었던`, kể cả cách dùng với tính từ."
            };
        }
        return {
            ko: "틀린 문제만 다시 풀어 보니 어느 부분이 자꾸 헷갈리는지 더 분명해졌습니다. 정답 설명을 한 번 더 보고 다시 도전해 보세요.",
            vi: "Làm lại chỉ những câu sai giúp bạn thấy rõ phần nào còn dễ nhầm. Hãy xem lại giải thích rồi thử lại lần nữa."
        };
    }

    if (ratio >= 0.84) {
        return {
            ko: "`만났던 사람`, `찍었던 사진`, `좋았던 카페`처럼 과거의 기억을 꺼내는 표현을 잘 구별했습니다.",
            vi: "Bạn đã phân biệt tốt các cụm gợi lại ký ức như `người đã gặp`, `bức ảnh đã chụp`, `quán cà phê từng rất đẹp`."
        };
    }
    if (ratio >= 0.6) {
        return {
            ko: "전체 흐름은 잘 잡았습니다. 현재 진행을 나타내는 표현과 과거 기억을 떠올리는 표현만 더 분명히 구별하면 됩니다.",
            vi: "Bạn đã nắm được dòng chính. Chỉ cần phân biệt rõ hơn dạng đang diễn ra hiện tại với dạng gợi lại ký ức quá khứ."
        };
    }
    return {
        ko: "`-았던/었던`은 지나간 경험을 다시 꺼낼 때 쓰고, `-고 있는`은 지금 진행 중인 장면을 설명할 때 쓴다는 점을 다시 확인해 보세요.",
        vi: "Hãy nhớ rằng `-았던/었던` dùng để gợi lại trải nghiệm đã qua, còn `-고 있는` dùng để miêu tả hành động đang diễn ra hiện tại."
    };
}

function getSubmittedValue(questionId) {
    const log = state.logs.find((item) => item.id === questionId);
    return log ? log.userAnswer : "";
}

function normalizeText(text) {
    return String(text || "")
        .normalize("NFC")
        .replace(/[\s.,!?'"“”‘’~]/g, "")
        .trim();
}

function shuffle(list) {
    const clone = [...list];
    for (let index = clone.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [clone[index], clone[randomIndex]] = [clone[randomIndex], clone[index]];
    }
    return clone;
}

function escapeHtml(value) {
    return String(value == null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
    return escapeHtml(value);
}
