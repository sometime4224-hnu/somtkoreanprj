(() => {
  "use strict";

  const TEXTS = {
    ko: {
      guideEyebrow: "Reason Map",
      guideTitle: "비교하면서 외우는 이유 문법",
      guideDesc:
        "많은 이유 문법을 한 번에 외우기보다, 비슷한 것끼리 먼저 구분하면 훨씬 빨리 정리됩니다.",
      stepsTitle: "추천 학습 흐름",
      steps: [
        "먼저 `가장 보편적인 이유` 4개로 기본 차이를 잡아요.",
        "카드를 눌러 제약과 예문을 보고, 쓰기 어려운 상황을 함께 확인해요.",
        "헷갈리는 조합은 바로 비교표로 열어서 차이를 눈으로 확인해요."
      ],
      presetsTitle: "추천 비교 세트",
      jumpTitle: "빠른 이동",
      jumpCommon: "공통 이유 4개",
      jumpSpecial: "특수 이유 8개",
      groupCommon: "공통 이유",
      groupSpecial: "특수 상황",
      openHint: "눌러서 제약과 예문 보기",
      modalQuick: "빠른 판별",
      modalCompareWith: "함께 비교하면 좋은 문법",
      compareHint: "2개 이상 고르면 비교표가 열립니다.",
      compareSummaryTitle: "이 조합은 이렇게 보면 빨라요",
      compareCommon: "공통점",
      compareDiff: "차이",
      compareFocus: "기억 포인트",
      compareModeAria: "문법 비교 모드 열기",
      compareCardsTab: "차이 카드",
      compareTableTab: "비교표",
      decisionQuestion: "먼저 이 질문",
      decisionChoose: "이럴 때 고르기",
      decisionCaution: "주의",
      decisionSample: "대표 예문"
    },
    en: {
      guideEyebrow: "Reason Map",
      guideTitle: "Learn reason grammar by comparing",
      guideDesc:
        "Instead of memorizing many forms at once, start by separating similar patterns first.",
      stepsTitle: "Recommended flow",
      steps: [
        "Start with the 4 common reason patterns to build the base map.",
        "Open each card to check constraints and example sentences together.",
        "Use the comparison table right away for confusing pairs."
      ],
      presetsTitle: "Suggested comparison sets",
      jumpTitle: "Quick jump",
      jumpCommon: "4 common reasons",
      jumpSpecial: "8 special cases",
      groupCommon: "Common",
      groupSpecial: "Specialized",
      openHint: "Open constraints and examples",
      modalQuick: "Quick guide",
      modalCompareWith: "Good patterns to compare with",
      compareHint: "Select at least 2 to open the comparison table.",
      compareSummaryTitle: "A faster way to compare this set",
      compareCommon: "In common",
      compareDiff: "Difference",
      compareFocus: "Remember",
      compareModeAria: "Open grammar compare mode",
      compareCardsTab: "Decision cards",
      compareTableTab: "Table",
      decisionQuestion: "Ask first",
      decisionChoose: "Choose this when",
      decisionCaution: "Watch out",
      decisionSample: "Example"
    },
    vi: {
      guideEyebrow: "Reason Map",
      guideTitle: "Học ngữ pháp lý do bằng cách so sánh",
      guideDesc:
        "Thay vì học thuộc tất cả cùng lúc, hãy tách các mẫu dễ nhầm trước để học nhanh hơn.",
      stepsTitle: "Trình tự gợi ý",
      steps: [
        "Bắt đầu với 4 mẫu lý do thông dụng để có khung cơ bản.",
        "Mở từng thẻ để xem điều kiện dùng và ví dụ.",
        "Với các cặp dễ nhầm, mở bảng so sánh ngay để nhìn sự khác nhau."
      ],
      presetsTitle: "Cặp so sánh gợi ý",
      jumpTitle: "Di chuyển nhanh",
      jumpCommon: "4 mẫu thông dụng",
      jumpSpecial: "8 mẫu đặc biệt",
      groupCommon: "Thông dụng",
      groupSpecial: "Tình huống đặc biệt",
      openHint: "Mở để xem điều kiện và ví dụ",
      modalQuick: "Phân biệt nhanh",
      modalCompareWith: "Nên so sánh cùng",
      compareHint: "Chọn từ 2 mẫu trở lên để mở bảng so sánh.",
      compareSummaryTitle: "Cách nhìn nhanh cho tổ hợp này",
      compareCommon: "Điểm chung",
      compareDiff: "Khác nhau",
      compareFocus: "Ghi nhớ",
      compareModeAria: "Mở chế độ so sánh ngữ pháp",
      compareCardsTab: "Thẻ khác biệt",
      compareTableTab: "Bảng so sánh",
      decisionQuestion: "Hỏi trước",
      decisionChoose: "Chọn khi",
      decisionCaution: "Lưu ý",
      decisionSample: "Ví dụ"
    }
  };

  const TAG_LABELS = {
    ko: {
      basic: "기본",
      answer: "답변형",
      subjective: "주관",
      command: "명령 가능",
      objective: "객관",
      explain: "설명형",
      formal: "격식",
      written: "문어",
      negative: "부정 결과",
      focus: "한 행동 집중",
      sudden: "돌발",
      chaos: "소란",
      blame: "탓함",
      direct: "직접 경험",
      result: "결과 발견",
      repeated: "반복",
      spoken: "회화",
      multi: "여러 이유",
      positive: "긍정 결과",
      thanks: "감사"
    },
    en: {
      basic: "basic",
      answer: "answer",
      subjective: "subjective",
      command: "command OK",
      objective: "objective",
      explain: "explanatory",
      formal: "formal",
      written: "written",
      negative: "negative result",
      focus: "one action",
      sudden: "sudden",
      chaos: "chaotic",
      blame: "blame",
      direct: "direct exp.",
      result: "result",
      repeated: "repeated",
      spoken: "spoken",
      multi: "multi-reason",
      positive: "positive result",
      thanks: "gratitude"
    },
    vi: {
      basic: "cơ bản",
      answer: "trả lời",
      subjective: "chủ quan",
      command: "dùng mệnh lệnh",
      objective: "khách quan",
      explain: "giải thích",
      formal: "trang trọng",
      written: "văn viết",
      negative: "kết quả xấu",
      focus: "một hành động",
      sudden: "đột ngột",
      chaos: "ồn ào",
      blame: "đổ lỗi",
      direct: "trải nghiệm trực tiếp",
      result: "kết quả",
      repeated: "lặp lại",
      spoken: "hội thoại",
      multi: "nhiều lý do",
      positive: "kết quả tốt",
      thanks: "biết ơn"
    }
  };

  const PRESETS = [
    {
      id: "basic-vs-judgment",
      grammars: ["-아/어서", "-(으)니까"],
      labels: {
        ko: "기본 이유 vs 판단 이유",
        en: "basic reason vs judgment",
        vi: "lý do cơ bản vs phán đoán"
      }
    },
    {
      id: "objective-vs-formal",
      grammars: ["-기 때문에", "-(으)므로"],
      labels: {
        ko: "객관 설명 vs 격식 문어",
        en: "objective vs formal",
        vi: "khách quan vs trang trọng"
      }
    },
    {
      id: "action-vs-accident",
      grammars: ["-느라고", "-는 바람에"],
      labels: {
        ko: "집중하다 생긴 문제 vs 돌발 사건",
        en: "focus problem vs sudden event",
        vi: "mải làm vs sự cố bất ngờ"
      }
    },
    {
      id: "experience-vs-repetition",
      grammars: ["-았더니/었더니", "-다 보니"],
      labels: {
        ko: "직접 해 본 결과 vs 계속하다 생긴 변화",
        en: "direct result vs repeated change",
        vi: "kết quả trực tiếp vs thay đổi lặp lại"
      }
    },
    {
      id: "blame-vs-thanks",
      grammars: ["-는 탓에", "-는 덕분에"],
      labels: {
        ko: "탓함 vs 덕분",
        en: "blame vs thanks",
        vi: "do lỗi vs nhờ"
      }
    }
  ];

  const GRAMMAR_META = {
    "-아/어서": { group: "common", tags: ["basic", "answer"] },
    "-(으)니까": { group: "common", tags: ["subjective", "command"] },
    "-기 때문에": { group: "common", tags: ["objective", "explain"] },
    "-(으)므로": { group: "common", tags: ["formal", "written"] },
    "-느라고": { group: "special", tags: ["negative", "focus"] },
    "-는 바람에": { group: "special", tags: ["negative", "sudden"] },
    "-는 통에": { group: "special", tags: ["negative", "chaos"] },
    "-는 탓에": { group: "special", tags: ["negative", "blame"] },
    "-았더니/었더니": { group: "special", tags: ["direct", "result"] },
    "-다 보니": { group: "special", tags: ["repeated", "result"] },
    "-고 해서": { group: "special", tags: ["spoken", "multi"] },
    "-는 덕분에": { group: "special", tags: ["positive", "thanks"] }
  };

  const MODAL_COMPARE_WITH = {
    "-아/어서": ["-(으)니까", "-기 때문에"],
    "-(으)니까": ["-아/어서", "-기 때문에"],
    "-기 때문에": ["-(으)니까", "-(으)므로"],
    "-(으)므로": ["-기 때문에"],
    "-느라고": ["-는 바람에", "-는 탓에"],
    "-는 바람에": ["-느라고", "-는 통에"],
    "-는 통에": ["-는 바람에", "-는 탓에"],
    "-는 탓에": ["-는 통에", "-는 덕분에"],
    "-았더니/었더니": ["-다 보니", "-아/어서"],
    "-다 보니": ["-았더니/었더니"],
    "-고 해서": ["-아/어서", "-(으)니까"],
    "-는 덕분에": ["-는 탓에"]
  };

  const PAIR_NOTES = {
    "-(으)니까||-아/어서": {
      ko: {
        common: "둘 다 가장 자주 쓰는 기본 이유 문법입니다.",
        diff: "`-아/어서`는 중립적인 설명, `-(으)니까`는 말하는 사람의 판단이나 권유가 더 잘 붙습니다.",
        focus: "상대에게 조언하거나 내 판단을 붙이면 `-(으)니까` 쪽을 먼저 떠올리세요."
      },
      en: {
        common: "Both are core reason patterns used very often.",
        diff: "`-아/어서` is more neutral, while `-(으)니까` fits speaker judgment or suggestions better.",
        focus: "If advice or the speaker's judgment is included, think of `-(으)니까` first."
      },
      vi: {
        common: "Cả hai đều là mẫu lý do cơ bản dùng rất nhiều.",
        diff: "`-아/어서` trung tính hơn, còn `-(으)니까` hợp với phán đoán hoặc lời khuyên của người nói.",
        focus: "Nếu có lời khuyên hoặc ý kiến của người nói, hãy nghĩ đến `-(으)니까` trước."
      }
    },
    "-(으)므로||-기 때문에": {
      ko: {
        common: "둘 다 객관적인 이유를 논리적으로 설명할 때 어울립니다.",
        diff: "`-기 때문에`는 설명문 전반에 쓰이고, `-(으)므로`는 훨씬 더 격식 있는 글말 느낌이 강합니다.",
        focus: "발표문, 공지문, 문어체 문장처럼 딱딱할수록 `-(으)므로` 쪽이 자연스럽습니다."
      },
      en: {
        common: "Both work well for objective, logical explanations.",
        diff: "`-기 때문에` is broader, while `-(으)므로` feels much more formal and written.",
        focus: "The more official and written the sentence is, the more natural `-(으)므로` becomes."
      },
      vi: {
        common: "Cả hai đều hợp khi giải thích nguyên nhân một cách khách quan và logic.",
        diff: "`-기 때문에` dùng rộng hơn, còn `-(으)므로` mang sắc thái văn viết trang trọng hơn nhiều.",
        focus: "Câu càng mang tính thông báo, phát biểu, văn bản thì `-(으)므로` càng tự nhiên."
      }
    },
    "-는 바람에||-느라고": {
      ko: {
        common: "둘 다 보통 부정적인 결과로 이어지는 이유를 말합니다.",
        diff: "`-느라고`는 내가 한 행동에 몰두해서 생긴 문제이고, `-는 바람에`는 갑작스럽거나 예상 밖 사건이 원인일 때 잘 맞습니다.",
        focus: "원인이 내 행동 집중인지, 외부 돌발 상황인지부터 먼저 나누면 헷갈림이 크게 줄어듭니다."
      },
      en: {
        common: "Both usually lead to negative results.",
        diff: "`-느라고` is about being absorbed in your own action, while `-는 바람에` fits sudden or unexpected events.",
        focus: "First ask whether the cause is my focused action or an outside sudden event."
      },
      vi: {
        common: "Cả hai thường dẫn đến kết quả tiêu cực.",
        diff: "`-느라고` là do mải làm một việc, còn `-는 바람에` hợp với nguyên nhân bất ngờ từ bên ngoài.",
        focus: "Trước hết hãy tách xem nguyên nhân là do mình mải làm hay do sự cố bất ngờ."
      }
    },
    "-다 보니||-았더니/었더니": {
      ko: {
        common: "둘 다 행동 뒤에 알게 된 결과나 변화를 말합니다.",
        diff: "`-았더니/었더니`는 직접 해 본 뒤의 발견, `-다 보니`는 계속 반복하다가 누적되어 생긴 결과에 더 가깝습니다.",
        focus: "한 번 해 보고 알게 된 일인지, 계속 하다 보니 변한 일인지 구분해 보세요."
      },
      en: {
        common: "Both describe results or discoveries after an action.",
        diff: "`-았더니/었더니` is for a direct result after doing something, while `-다 보니` fits accumulated change through repetition.",
        focus: "Check whether it was a one-time experience or a repeated process."
      },
      vi: {
        common: "Cả hai đều diễn tả kết quả hay điều nhận ra sau hành động.",
        diff: "`-았더니/었더니` gần với kết quả sau khi trực tiếp làm thử, còn `-다 보니` hợp với thay đổi tích lũy do lặp lại.",
        focus: "Hãy phân biệt giữa trải nghiệm một lần và quá trình lặp lại."
      }
    },
    "-는 덕분에||-는 탓에": {
      ko: {
        common: "둘 다 어떤 결과의 원인을 말합니다.",
        diff: "`-는 탓에`는 불만이나 비판이 느껴지고, `-는 덕분에`는 좋은 결과와 감사의 느낌이 있습니다.",
        focus: "결과가 나쁜지 좋은지 먼저 보면 둘은 거의 바로 갈립니다."
      },
      en: {
        common: "Both explain the cause of a result.",
        diff: "`-는 탓에` carries blame or complaint, while `-는 덕분에` carries gratitude and a positive result.",
        focus: "Start by checking whether the result is bad or good."
      },
      vi: {
        common: "Cả hai đều nói về nguyên nhân của một kết quả.",
        diff: "`-는 탓에` có sắc thái trách móc, còn `-는 덕분에` có sắc thái biết ơn và kết quả tốt.",
        focus: "Hãy nhìn kết quả là xấu hay tốt trước tiên."
      }
    }
  };

  const DECISION_GUIDES = {
    ko: {
      "-아/어서": {
        question: "그냥 가장 자연스럽게 이유를 설명하면 되나요?",
        choose: "중립적으로 이유를 연결하고 싶을 때 가장 먼저 떠올리면 좋습니다."
      },
      "-(으)니까": {
        question: "내 판단, 권유, 명령이 함께 따라오나요?",
        choose: "상대에게 조언하거나 화자의 판단을 실어 말할 때 잘 맞습니다."
      },
      "-기 때문에": {
        question: "객관적으로 원인을 설명하는 문장인가요?",
        choose: "설명문, 보고, 발표처럼 논리적으로 이유를 밝힐 때 고르기 좋습니다."
      },
      "-(으)므로": {
        question: "글말이나 공식 문장처럼 격식이 높은가요?",
        choose: "공지문, 보고서, 발표문처럼 딱딱하고 문어체인 장면에 잘 맞습니다."
      },
      "-느라고": {
        question: "내가 한 행동에 몰두하다가 다른 일이 안 됐나요?",
        choose: "한 행동에 집중하느라 부정 결과가 생겼을 때 고르기 좋습니다."
      },
      "-는 바람에": {
        question: "갑작스럽고 예상 못 한 일이 원인인가요?",
        choose: "돌발 사건 때문에 안 좋은 결과가 났을 때 가장 잘 맞습니다."
      },
      "-는 통에": {
        question: "시끄럽거나 정신없는 환경 때문에 문제가 생겼나요?",
        choose: "소란, 혼잡, 외부 환경 때문에 피해를 볼 때 잘 어울립니다."
      },
      "-는 탓에": {
        question: "원인을 탓하거나 불만을 드러내고 싶나요?",
        choose: "부정 결과의 책임을 어느 쪽에 돌리는 느낌을 낼 때 적합합니다."
      },
      "-았더니/었더니": {
        question: "직접 해 본 뒤 새 결과를 알게 됐나요?",
        choose: "한 번 실제로 해 보고 변화나 발견을 말할 때 자연스럽습니다."
      },
      "-다 보니": {
        question: "계속 반복하다가 누적된 결과가 생겼나요?",
        choose: "반복하거나 오래 지속한 끝에 생긴 변화에 잘 맞습니다."
      },
      "-고 해서": {
        question: "이유가 하나가 아니라 여러 개가 섞여 있나요?",
        choose: "회화에서 여러 이유를 가볍게 묶어 말할 때 편하게 쓸 수 있습니다."
      },
      "-는 덕분에": {
        question: "좋은 결과에 고마움이 함께 느껴지나요?",
        choose: "긍정 결과의 원인에 감사나 호의를 드러낼 때 고르기 좋습니다."
      }
    },
    en: {
      "-아/어서": {
        question: "Do you just need the most natural neutral reason?",
        choose: "Use it first when you simply want to connect a cause and result."
      },
      "-(으)니까": {
        question: "Does your judgment, advice, or command follow?",
        choose: "It works well when the speaker's opinion or suggestion is included."
      },
      "-기 때문에": {
        question: "Is this an objective explanation of the cause?",
        choose: "Good for logical explanation in reports, presentations, or formal explanation."
      },
      "-(으)므로": {
        question: "Is the sentence highly formal or written?",
        choose: "Best for notices, reports, and official written language."
      },
      "-느라고": {
        question: "Did focusing on one action cause another problem?",
        choose: "Use it when being absorbed in one action led to a negative result."
      },
      "-는 바람에": {
        question: "Was the cause sudden or unexpected?",
        choose: "Best when a sudden event caused a bad result."
      },
      "-는 통에": {
        question: "Did a noisy or chaotic environment cause the problem?",
        choose: "Good for confusion, crowding, or environmental disturbance."
      },
      "-는 탓에": {
        question: "Do you want to sound blaming or dissatisfied?",
        choose: "Use it when you want to place blame on the cause of a negative result."
      },
      "-았더니/었더니": {
        question: "Did you discover the result after trying it yourself?",
        choose: "Natural for changes or discoveries after a direct experience."
      },
      "-다 보니": {
        question: "Did the result build up through repetition?",
        choose: "Use it for changes that came from doing something repeatedly or continuously."
      },
      "-고 해서": {
        question: "Are there multiple reasons mixed together?",
        choose: "Good in conversation when loosely grouping more than one reason."
      },
      "-는 덕분에": {
        question: "Does the result feel positive and thankful?",
        choose: "Best when you want to show gratitude for a good result."
      }
    },
    vi: {
      "-아/어서": {
        question: "Bạn chỉ cần nói lý do một cách tự nhiên, trung tính phải không?",
        choose: "Hãy nghĩ đến mẫu này trước khi chỉ muốn nối nguyên nhân và kết quả."
      },
      "-(으)니까": {
        question: "Có kèm theo phán đoán, lời khuyên hay mệnh lệnh không?",
        choose: "Rất hợp khi có ý kiến của người nói hoặc muốn khuyên ai đó."
      },
      "-기 때문에": {
        question: "Đây có phải câu giải thích nguyên nhân một cách khách quan không?",
        choose: "Phù hợp khi giải thích logic trong bài nói, báo cáo, thuyết minh."
      },
      "-(으)므로": {
        question: "Câu này có mang sắc thái văn viết, trang trọng không?",
        choose: "Hợp nhất với thông báo, báo cáo và văn phong trang trọng."
      },
      "-느라고": {
        question: "Có phải vì mải làm một việc nên việc khác không được không?",
        choose: "Dùng khi tập trung vào một hành động dẫn đến kết quả xấu."
      },
      "-는 바람에": {
        question: "Nguyên nhân có phải là sự việc bất ngờ không?",
        choose: "Hợp nhất khi sự cố đột ngột gây ra kết quả không tốt."
      },
      "-는 통에": {
        question: "Có phải môi trường ồn ào hay hỗn loạn gây ra vấn đề không?",
        choose: "Phù hợp khi nguyên nhân là sự náo loạn, đông đúc hay môi trường xung quanh."
      },
      "-는 탓에": {
        question: "Bạn có muốn thể hiện sắc thái trách móc không?",
        choose: "Dùng khi muốn quy trách nhiệm cho nguyên nhân của kết quả xấu."
      },
      "-았더니/었더니": {
        question: "Bạn có trực tiếp làm rồi mới phát hiện kết quả không?",
        choose: "Tự nhiên khi nói về thay đổi hay phát hiện sau trải nghiệm trực tiếp."
      },
      "-다 보니": {
        question: "Kết quả có xuất hiện sau quá trình lặp lại không?",
        choose: "Hợp khi sự thay đổi đến từ việc làm liên tục hoặc lặp đi lặp lại."
      },
      "-고 해서": {
        question: "Có phải có nhiều lý do được nói cùng nhau không?",
        choose: "Dùng tiện trong hội thoại khi gom nhiều lý do lại một cách nhẹ nhàng."
      },
      "-는 덕분에": {
        question: "Kết quả có tích cực và mang sắc thái biết ơn không?",
        choose: "Rất hợp khi muốn nói lời cảm ơn cho một kết quả tốt."
      }
    }
  };

  function getLang() {
    return (
      document.querySelector(".lang-btn.active-lang")?.dataset.lang ||
      document.documentElement.lang ||
      "ko"
    );
  }

  function getText(lang) {
    return TEXTS[lang] || TEXTS.en;
  }

  function getTagLabel(lang, code) {
    const labels = TAG_LABELS[lang] || TAG_LABELS.en;
    return labels[code] || code;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function ensureStyle() {
    if (document.getElementById("reason-enhancer-style")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "reason-enhancer-style";
    style.textContent = `
      .reason-guide {
        margin-bottom: 24px;
        padding: 24px;
        border-radius: 28px;
        background:
          radial-gradient(circle at top right, rgba(59, 130, 246, 0.10), transparent 28%),
          linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(239, 246, 255, 0.95) 52%, rgba(248, 250, 252, 0.98) 100%);
        border: 1px solid rgba(191, 219, 254, 0.95);
        box-shadow: 0 18px 36px rgba(15, 23, 42, 0.06);
      }
      .reason-guide__eyebrow {
        margin: 0 0 8px;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #2563eb;
      }
      .reason-guide__title {
        margin: 0;
        font-size: clamp(1.4rem, 2vw, 2rem);
        line-height: 1.15;
        color: #0f172a;
      }
      .reason-guide__desc {
        margin: 12px 0 0;
        max-width: 700px;
        color: #475569;
        line-height: 1.7;
      }
      .reason-guide__layout {
        display: grid;
        grid-template-columns: minmax(0, 1.4fr) minmax(260px, 0.9fr);
        gap: 18px;
        margin-top: 20px;
      }
      .reason-guide__panel {
        padding: 18px;
        border-radius: 22px;
        border: 1px solid rgba(191, 219, 254, 0.86);
        background: rgba(255, 255, 255, 0.84);
      }
      .reason-guide__panel h3 {
        margin: 0;
        font-size: 14px;
        font-weight: 900;
        color: #1e3a8a;
      }
      .reason-guide__steps {
        margin: 14px 0 0;
        display: grid;
        gap: 10px;
      }
      .reason-guide__step {
        display: grid;
        grid-template-columns: 28px 1fr;
        gap: 10px;
        align-items: start;
        padding: 12px 14px;
        border-radius: 18px;
        background: #f8fbff;
        border: 1px solid rgba(219, 234, 254, 0.95);
      }
      .reason-guide__step-index {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 999px;
        background: #2563eb;
        color: #fff;
        font-size: 12px;
        font-weight: 900;
      }
      .reason-guide__jump,
      .reason-guide__presets {
        margin-top: 14px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .reason-guide__btn,
      .reason-guide__preset {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-height: 42px;
        padding: 10px 14px;
        border-radius: 999px;
        border: 1px solid rgba(191, 219, 254, 0.95);
        background: #fff;
        color: #1e40af;
        font-size: 13px;
        font-weight: 800;
        cursor: pointer;
        transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
      }
      .reason-guide__btn:hover,
      .reason-guide__preset:hover,
      .reason-guide__btn:focus-visible,
      .reason-guide__preset:focus-visible {
        outline: none;
        transform: translateY(-1px);
        border-color: #60a5fa;
        box-shadow: 0 10px 20px rgba(59, 130, 246, 0.12);
      }
      .reason-guide__side-list {
        margin: 14px 0 0;
        display: grid;
        gap: 10px;
      }
      .reason-guide__bucket {
        padding: 14px;
        border-radius: 18px;
        border: 1px solid rgba(226, 232, 240, 0.9);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%);
      }
      .reason-guide__bucket-title {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin: 0;
        font-size: 13px;
        font-weight: 900;
        color: #0f172a;
      }
      .reason-guide__bucket-title::before {
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: #2563eb;
      }
      .reason-guide__bucket--special .reason-guide__bucket-title::before {
        background: #6366f1;
      }
      .reason-guide__bucket p {
        margin: 8px 0 0;
        color: #475569;
        font-size: 13px;
        line-height: 1.6;
      }
      .reason-top-controls {
        margin-bottom: 18px;
        padding: 16px;
        border-radius: 22px;
        border: 1px solid rgba(226, 232, 240, 0.95);
        background: rgba(255, 255, 255, 0.94);
        box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
      }
      .reason-top-controls .hide-scrollbar {
        margin-left: -4px;
        margin-right: -4px;
        padding-left: 4px;
        padding-right: 4px;
      }
      .reason-card-extra {
        margin-top: 14px;
        padding-top: 12px;
        border-top: 1px solid #e2e8f0;
      }
      .reason-card-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .reason-chip {
        display: inline-flex;
        align-items: center;
        padding: 5px 9px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 800;
        line-height: 1;
        border: 1px solid transparent;
      }
      .reason-chip--group-common {
        color: #1d4ed8;
        background: #dbeafe;
        border-color: #bfdbfe;
      }
      .reason-chip--group-special {
        color: #4338ca;
        background: #e0e7ff;
        border-color: #c7d2fe;
      }
      .reason-chip--basic,
      .reason-chip--answer,
      .reason-chip--objective,
      .reason-chip--explain,
      .reason-chip--result {
        color: #334155;
        background: #f1f5f9;
        border-color: #cbd5e1;
      }
      .reason-chip--subjective,
      .reason-chip--spoken,
      .reason-chip--multi {
        color: #7c2d12;
        background: #ffedd5;
        border-color: #fdba74;
      }
      .reason-chip--formal,
      .reason-chip--written {
        color: #374151;
        background: #e5e7eb;
        border-color: #cbd5e1;
      }
      .reason-chip--negative,
      .reason-chip--blame,
      .reason-chip--sudden,
      .reason-chip--chaos,
      .reason-chip--focus {
        color: #991b1b;
        background: #fee2e2;
        border-color: #fca5a5;
      }
      .reason-chip--positive,
      .reason-chip--thanks {
        color: #166534;
        background: #dcfce7;
        border-color: #86efac;
      }
      .reason-chip--direct,
      .reason-chip--repeated,
      .reason-chip--command {
        color: #5b21b6;
        background: #ede9fe;
        border-color: #c4b5fd;
      }
      .reason-card-hint {
        margin-top: 9px;
        font-size: 12px;
        color: #64748b;
      }
      .reason-modal-quick {
        margin-bottom: 16px;
        padding: 14px 16px;
        border-radius: 18px;
        border: 1px solid #bfdbfe;
        background: linear-gradient(135deg, rgba(239, 246, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
      }
      .reason-modal-quick h3 {
        margin: 0;
        font-size: 13px;
        font-weight: 900;
        color: #1d4ed8;
      }
      .reason-modal-quick p {
        margin: 10px 0 0;
        font-size: 12px;
        line-height: 1.6;
        color: #475569;
      }
      .reason-modal-quick .reason-card-chips {
        margin-top: 10px;
      }
      .reason-compare-note {
        margin-bottom: 16px;
        padding: 16px;
        border-radius: 20px;
        border: 1px solid #bfdbfe;
        background: linear-gradient(135deg, rgba(239, 246, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);
      }
      .reason-compare-note h3 {
        margin: 0;
        font-size: 15px;
        font-weight: 900;
        color: #1e3a8a;
      }
      .reason-compare-note__grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
        margin-top: 12px;
      }
      .reason-compare-note__item {
        padding: 12px 14px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.92);
        border: 1px solid rgba(191, 219, 254, 0.9);
      }
      .reason-compare-note__item strong {
        display: block;
        font-size: 12px;
        font-weight: 900;
        color: #2563eb;
      }
      .reason-compare-note__item p {
        margin: 8px 0 0;
        font-size: 13px;
        line-height: 1.6;
        color: #334155;
      }
      .reason-compare-help {
        margin-right: auto;
        font-size: 12px;
        color: #64748b;
      }
      .reason-compare-tabs {
        display: flex;
        gap: 10px;
        padding: 12px 16px 0;
        border-bottom: 1px solid #e2e8f0;
        background: #fff;
      }
      .reason-compare-tab {
        appearance: none;
        border: 1px solid transparent;
        border-bottom: none;
        border-radius: 14px 14px 0 0;
        background: transparent;
        color: #64748b;
        font-size: 13px;
        font-weight: 800;
        padding: 10px 14px;
        cursor: pointer;
      }
      .reason-compare-tab.is-active {
        background: #eff6ff;
        color: #1d4ed8;
        border-color: #bfdbfe;
      }
      .reason-compare-cards-wrapper {
        flex: 1;
        overflow: auto;
        padding: 16px;
        background: #f8fafc;
      }
      .reason-decision-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 14px;
      }
      .reason-decision-card {
        padding: 18px;
        border-radius: 22px;
        border: 1px solid #dbeafe;
        background:
          radial-gradient(circle at top right, rgba(59, 130, 246, 0.10), transparent 28%),
          linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.98) 100%);
        box-shadow: 0 14px 28px rgba(15, 23, 42, 0.05);
      }
      .reason-decision-card__top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }
      .reason-decision-card__title {
        margin: 0;
        font-size: 1.05rem;
        font-weight: 900;
        color: #0f172a;
      }
      .reason-decision-card__formula {
        display: inline-flex;
        margin-top: 8px;
        padding: 5px 9px;
        border-radius: 999px;
        background: #eff6ff;
        color: #1d4ed8;
        font-size: 11px;
        font-weight: 800;
        border: 1px solid #bfdbfe;
      }
      .reason-decision-card__sections {
        display: grid;
        gap: 12px;
        margin-top: 14px;
      }
      .reason-decision-card__section {
        padding: 12px 14px;
        border-radius: 16px;
        border: 1px solid #e2e8f0;
        background: rgba(255, 255, 255, 0.9);
      }
      .reason-decision-card__section strong {
        display: block;
        margin-bottom: 6px;
        font-size: 12px;
        font-weight: 900;
        color: #2563eb;
      }
      .reason-decision-card__section p {
        margin: 0;
        font-size: 13px;
        line-height: 1.6;
        color: #334155;
      }
      .reason-decision-card__sample {
        background: #f8fafc;
      }
      @media (max-width: 900px) {
        .reason-guide__layout {
          grid-template-columns: 1fr;
        }
      }
      @media (max-width: 640px) {
        .reason-guide {
          padding: 18px;
          border-radius: 24px;
        }
        .reason-guide__btn,
        .reason-guide__preset {
          width: 100%;
          justify-content: center;
        }
        .reason-compare-tabs {
          padding: 10px 12px 0;
          gap: 8px;
        }
        .reason-compare-tab {
          flex: 1;
          justify-content: center;
          text-align: center;
          padding: 10px 8px;
        }
        .reason-compare-note__grid {
          grid-template-columns: 1fr;
        }
        .reason-compare-help {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function getMainContainer() {
    return document.querySelector("body > .container.mx-auto.px-4.py-6.max-w-5xl");
  }

  function getGuideTarget() {
    return document.getElementById("app-subtitle")?.nextElementSibling || null;
  }

  function moveTopControls() {
    const subtitle = document.getElementById("app-subtitle");
    const searchContainer = document.getElementById("search-container");
    const mobileToggle = document.getElementById("mobile-search-toggle");
    const langButton = document.querySelector(".lang-btn");
    const langBar = langButton?.parentElement || null;

    if (!subtitle || !searchContainer || !langBar) {
      return;
    }

    let wrapper = document.getElementById("reasonTopControls");
    if (!wrapper) {
      wrapper = document.createElement("section");
      wrapper.id = "reasonTopControls";
      wrapper.className = "reason-top-controls";
      subtitle.parentElement?.insertBefore(wrapper, subtitle);
    }

    if (langBar.parentElement !== wrapper) {
      wrapper.appendChild(langBar);
    }
    if (searchContainer.parentElement !== wrapper) {
      wrapper.appendChild(searchContainer);
    }

    langBar.classList.remove("-mx-4", "px-4", "md:mx-0", "md:px-0");
    langBar.classList.add("hide-scrollbar");
    searchContainer.classList.remove("hidden", "md:block");
    searchContainer.classList.add("mt-3");
    if (mobileToggle) {
      mobileToggle.classList.add("hidden");
    }
  }

  function createTagChip(label, extraClass) {
    return `<span class="reason-chip ${extraClass}">${escapeHtml(label)}</span>`;
  }

  function renderGuide() {
    const container = getMainContainer();
    const target = getGuideTarget();
    if (!container || !target) {
      return;
    }

    const lang = getLang();
    const text = getText(lang);
    let guide = document.getElementById("reason-guide");

    if (!guide) {
      guide = document.createElement("section");
      guide.id = "reason-guide";
      guide.className = "reason-guide";
      container.insertBefore(guide, target);
    }

    const presetsHtml = PRESETS.map((preset) => {
      const label = preset.labels[lang] || preset.labels.en;
      return `
        <button class="reason-guide__preset" type="button" data-reason-preset="${preset.id}">
          <i class="fas fa-balance-scale text-blue-500" aria-hidden="true"></i>
          <span>${escapeHtml(label)}</span>
        </button>
      `;
    }).join("");

    const stepsHtml = text.steps
      .map(
        (step, index) => `
          <div class="reason-guide__step">
            <span class="reason-guide__step-index">${index + 1}</span>
            <div>${step}</div>
          </div>
        `
      )
      .join("");

    guide.innerHTML = `
      <p class="reason-guide__eyebrow">${escapeHtml(text.guideEyebrow)}</p>
      <h2 class="reason-guide__title">${escapeHtml(text.guideTitle)}</h2>
      <p class="reason-guide__desc">${escapeHtml(text.guideDesc)}</p>
      <div class="reason-guide__layout">
        <div class="reason-guide__panel">
          <h3>${escapeHtml(text.stepsTitle)}</h3>
          <div class="reason-guide__steps">${stepsHtml}</div>
          <div class="reason-guide__jump">
            <button class="reason-guide__btn" type="button" data-reason-jump="common">
              <i class="fas fa-arrow-down text-blue-500" aria-hidden="true"></i>
              <span>${escapeHtml(text.jumpCommon)}</span>
            </button>
            <button class="reason-guide__btn" type="button" data-reason-jump="special">
              <i class="fas fa-arrow-down text-indigo-500" aria-hidden="true"></i>
              <span>${escapeHtml(text.jumpSpecial)}</span>
            </button>
          </div>
        </div>
        <div class="reason-guide__panel">
          <h3>${escapeHtml(text.presetsTitle)}</h3>
          <div class="reason-guide__presets">${presetsHtml}</div>
          <div class="reason-guide__side-list">
            <div class="reason-guide__bucket">
              <p class="reason-guide__bucket-title">${escapeHtml(text.groupCommon)}</p>
              <p>-아/어서, -(으)니까, -기 때문에, -(으)므로</p>
            </div>
            <div class="reason-guide__bucket reason-guide__bucket--special">
              <p class="reason-guide__bucket-title">${escapeHtml(text.groupSpecial)}</p>
              <p>-느라고, -는 바람에, -는 통에, -는 탓에, -았더니/었더니, -다 보니, -고 해서, -는 덕분에</p>
            </div>
          </div>
        </div>
      </div>
    `;

    bindGuideEvents();
  }

  function findCardByGrammar(grammar) {
    return Array.from(document.querySelectorAll(".grammar-card")).find(
      (card) => card.dataset.grammar === grammar
    );
  }

  function openPresetCompare(grammars) {
    const toggleButton = document.getElementById("toggle-compare-mode");
    const compareBar = document.getElementById("compare-fab-container");
    const compareButton = document.getElementById("compare-selected-btn");

    if (!toggleButton || !compareBar || !compareButton) {
      return;
    }

    if (compareBar.classList.contains("translate-y-full")) {
      toggleButton.click();
    }

    window.setTimeout(() => {
      document.querySelectorAll(".grammar-card.selected").forEach((card) => {
        card.click();
      });

      grammars.forEach((grammar) => {
        const card = findCardByGrammar(grammar);
        if (card && !card.classList.contains("selected")) {
          card.click();
        }
      });

      compareButton.click();
    }, 40);
  }

  function scrollToGroup(group) {
    const titleId = group === "common" ? "group1-title" : "group2-title";
    const title = document.getElementById(titleId);
    if (title) {
      title.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function bindGuideEvents() {
    document.querySelectorAll("[data-reason-preset]").forEach((button) => {
      if (button.dataset.reasonBound === "true") {
        return;
      }

      button.dataset.reasonBound = "true";
      button.addEventListener("click", () => {
        const preset = PRESETS.find((item) => item.id === button.dataset.reasonPreset);
        if (preset) {
          openPresetCompare(preset.grammars);
        }
      });
    });

    document.querySelectorAll("[data-reason-jump]").forEach((button) => {
      if (button.dataset.reasonBound === "true") {
        return;
      }

      button.dataset.reasonBound = "true";
      button.addEventListener("click", () => {
        scrollToGroup(button.dataset.reasonJump);
      });
    });
  }

  function enhanceCards() {
    const lang = getLang();
    const text = getText(lang);

    document.querySelectorAll(".grammar-card").forEach((card) => {
      if (card.dataset.reasonEnhanced === "true") {
        return;
      }

      const grammar = card.dataset.grammar;
      const meta = GRAMMAR_META[grammar];
      card.dataset.reasonEnhanced = "true";
      card.classList.add("group");
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          card.click();
        }
      });

      if (!meta) {
        card.setAttribute("aria-label", grammar);
        return;
      }

      const groupLabel =
        meta.group === "common" ? text.groupCommon : text.groupSpecial;
      const tagLabels = meta.tags.map((tag) => getTagLabel(lang, tag));

      card.setAttribute(
        "aria-label",
        `${grammar}. ${groupLabel}. ${tagLabels.join(", ")}`
      );

      const footer = document.createElement("div");
      footer.className = "reason-card-extra";
      footer.innerHTML = `
        <div class="reason-card-chips">
          ${createTagChip(
            groupLabel,
            meta.group === "common"
              ? "reason-chip--group-common"
              : "reason-chip--group-special"
          )}
          ${meta.tags
            .map((tag) =>
              createTagChip(getTagLabel(lang, tag), `reason-chip--${tag}`)
            )
            .join("")}
        </div>
        <p class="reason-card-hint">${escapeHtml(text.openHint)}</p>
      `;
      card.appendChild(footer);
    });
  }

  function enhanceCompareBar() {
    const compareBar = document.getElementById("compare-fab-container");
    const toggleButton = document.getElementById("toggle-compare-mode");
    if (!compareBar || !toggleButton) {
      return;
    }

    const lang = getLang();
    const text = getText(lang);

    let helper = compareBar.querySelector(".reason-compare-help");
    if (!helper) {
      helper = document.createElement("div");
      helper.className = "reason-compare-help";
      compareBar.insertBefore(helper, compareBar.firstElementChild);
    }
    helper.textContent = text.compareHint;
    toggleButton.setAttribute("aria-label", text.compareModeAria);
    toggleButton.setAttribute("title", text.compareModeAria);
  }

  function enhanceInfoModal() {
    const modal = document.getElementById("grammarModal");
    const infoTab = document.getElementById("infoTab");
    const title = document.getElementById("modalTitle")?.textContent.trim();

    if (!modal || modal.classList.contains("hidden") || !infoTab || !title) {
      return;
    }

    const meta = GRAMMAR_META[title];
    if (!meta) {
      return;
    }

    const lang = getLang();
    const text = getText(lang);
    const compareWith = MODAL_COMPARE_WITH[title] || [];
    const existing = infoTab.querySelector(".reason-modal-quick");

    if (
      existing &&
      existing.dataset.reasonGrammar === title &&
      existing.dataset.reasonLang === lang
    ) {
      return;
    }

    existing?.remove();

    const quick = document.createElement("section");
    quick.className = "reason-modal-quick";
    quick.dataset.reasonGrammar = title;
    quick.dataset.reasonLang = lang;
    quick.innerHTML = `
      <h3>${escapeHtml(text.modalQuick)}</h3>
      <div class="reason-card-chips">
        ${createTagChip(
          meta.group === "common" ? text.groupCommon : text.groupSpecial,
          meta.group === "common"
            ? "reason-chip--group-common"
            : "reason-chip--group-special"
        )}
        ${meta.tags
          .map((tag) =>
            createTagChip(getTagLabel(lang, tag), `reason-chip--${tag}`)
          )
          .join("")}
      </div>
      ${
        compareWith.length
          ? `<p>${escapeHtml(text.modalCompareWith)}: ${compareWith
              .map(escapeHtml)
              .join(", ")}</p>`
          : ""
      }
    `;

    infoTab.insertBefore(quick, infoTab.children[1] || null);
  }

  function getPairNote(names, lang) {
    const sorted = [...names].sort((a, b) => a.localeCompare(b, "ko"));
    const key = sorted.join("||");

    if (PAIR_NOTES[key]) {
      return PAIR_NOTES[key][lang] || PAIR_NOTES[key].en;
    }

    const metas = sorted.map((name) => GRAMMAR_META[name]).filter(Boolean);
    if (!metas.length) {
      return null;
    }

    const allCommon = metas.every((meta) => meta.group === "common");
    const allSpecial = metas.every((meta) => meta.group === "special");

    if (lang === "ko") {
      if (allCommon) {
        return {
          common: "선택한 문법들은 모두 기본 이유를 설명할 때 자주 쓰입니다.",
          diff: "주관성, 격식, 명령문 가능 여부를 먼저 보면 차이가 빨리 보입니다.",
          focus: "중립적 설명인지, 화자의 판단이 들어가는지부터 체크해 보세요."
        };
      }
      if (allSpecial) {
        return {
          common: "선택한 문법들은 모두 특정 장면에서 쓰는 특수 이유 문법입니다.",
          diff: "원인의 종류(돌발, 반복, 직접 경험, 환경)와 결과의 성격(긍정/부정)을 먼저 보세요.",
          focus: "카드에 붙은 태그를 먼저 읽으면 비교표가 훨씬 빨리 정리됩니다."
        };
      }
      return {
        common: "둘 다 이유를 말하지만 쓰임의 폭과 장면이 다릅니다.",
        diff: "하나는 범용 이유일 수 있고, 다른 하나는 특정 상황 전용일 수 있습니다.",
        focus: "먼저 일반적인 설명인지, 특별한 상황 묘사인지부터 구분해 보세요."
      };
    }

    if (lang === "vi") {
      if (allCommon) {
        return {
          common: "Các mẫu được chọn đều là mẫu lý do cơ bản.",
          diff: "Hãy nhìn trước vào mức độ chủ quan, trang trọng, và khả năng đi với mệnh lệnh.",
          focus: "Trước hết hãy phân biệt giữa giải thích trung tính và phán đoán của người nói."
        };
      }
      if (allSpecial) {
        return {
          common: "Các mẫu được chọn đều là mẫu lý do cho tình huống đặc biệt.",
          diff: "Hãy nhìn loại nguyên nhân và tính chất của kết quả trước.",
          focus: "Đọc các thẻ tag trước sẽ giúp bảng so sánh dễ hiểu hơn nhiều."
        };
      }
      return {
        common: "Cả hai đều nói lý do nhưng phạm vi dùng khác nhau.",
        diff: "Một mẫu có thể là lý do chung, mẫu kia có thể chỉ dành cho tình huống cụ thể.",
        focus: "Hãy phân biệt giữa giải thích chung và mô tả tình huống đặc biệt."
      };
    }

    if (allCommon) {
      return {
        common: "The selected patterns are all common reason grammar.",
        diff: "Look first at subjectivity, formality, and whether commands fit.",
        focus: "Start by separating neutral explanation from speaker judgment."
      };
    }
    if (allSpecial) {
      return {
        common: "The selected patterns are all specialized reason grammar.",
        diff: "First check the kind of cause and the tone of the result.",
        focus: "Reading the tag chips first makes the table much easier to scan."
      };
    }
    return {
      common: "Both express reasons, but their range of use is different.",
      diff: "One may be a broad reason pattern while another fits a special situation only.",
      focus: "Start by asking whether this is a general explanation or a special scene."
    };
  }

  function getCompareGrammarNames() {
    const content = document.getElementById("compareContent");
    if (!content) {
      return [];
    }

    return Array.from(
      content.querySelectorAll("div.bg-blue-50.font-bold.text-blue-700")
    )
      .map((cell) => cell.textContent.trim())
      .filter(Boolean);
  }

  function getGrammarStore(lang) {
    if (typeof langData === "undefined") {
      return null;
    }
    return langData[lang]?.grammars || null;
  }

  function getDecisionGuide(grammar, lang) {
    const guides = DECISION_GUIDES[lang] || DECISION_GUIDES.en;
    return guides[grammar] || { question: "", choose: "" };
  }

  function ensureCompareScaffold() {
    const tableWrapper = document.getElementById("compareContentWrapper");
    const host = tableWrapper?.parentElement;

    if (!tableWrapper || !host) {
      return null;
    }

    let tabs = document.getElementById("reasonCompareTabs");
    if (!tabs) {
      tabs = document.createElement("div");
      tabs.id = "reasonCompareTabs";
      tabs.className = "reason-compare-tabs";
      host.insertBefore(tabs, tableWrapper);
    }

    let cardsWrapper = document.getElementById("reasonCompareCardsWrapper");
    if (!cardsWrapper) {
      cardsWrapper = document.createElement("div");
      cardsWrapper.id = "reasonCompareCardsWrapper";
      cardsWrapper.className = "reason-compare-cards-wrapper hidden";
      host.insertBefore(cardsWrapper, tableWrapper);
    }

    return { tabs, cardsWrapper, tableWrapper };
  }

  function setCompareView(view) {
    const scaffold = ensureCompareScaffold();
    if (!scaffold) {
      return;
    }

    scaffold.cardsWrapper.classList.toggle("hidden", view !== "cards");
    scaffold.tableWrapper.classList.toggle("hidden", view !== "table");

    scaffold.tabs
      .querySelectorAll(".reason-compare-tab")
      .forEach((button) => {
        button.classList.toggle("is-active", button.dataset.view === view);
      });
  }

  function renderCompareTabs(lang) {
    const scaffold = ensureCompareScaffold();
    if (!scaffold) {
      return;
    }

    const text = getText(lang);
    scaffold.tabs.innerHTML = `
      <button class="reason-compare-tab" type="button" data-view="cards">${escapeHtml(
        text.compareCardsTab
      )}</button>
      <button class="reason-compare-tab" type="button" data-view="table">${escapeHtml(
        text.compareTableTab
      )}</button>
    `;

    scaffold.tabs.querySelectorAll(".reason-compare-tab").forEach((button) => {
      button.addEventListener("click", () => {
        setCompareView(button.dataset.view);
      });
    });
  }

  function enhanceCompareSummary() {
    const modal = document.getElementById("compareModal");
    const names = getCompareGrammarNames();

    if (!modal || modal.classList.contains("hidden") || !names.length) {
      return;
    }

    const lang = getLang();
    const text = getText(lang);
    const grammarStore = getGrammarStore(lang);
    const scaffold = ensureCompareScaffold();

    if (!grammarStore || !scaffold) {
      return;
    }

    renderCompareTabs(lang);

    const note = getPairNote(names, lang);
    const noteHtml = note
      ? `
        <section class="reason-compare-note">
          <h3>${escapeHtml(text.compareSummaryTitle)}</h3>
          <div class="reason-compare-note__grid">
            <div class="reason-compare-note__item">
              <strong>${escapeHtml(text.compareCommon)}</strong>
              <p>${escapeHtml(note.common)}</p>
            </div>
            <div class="reason-compare-note__item">
              <strong>${escapeHtml(text.compareDiff)}</strong>
              <p>${escapeHtml(note.diff)}</p>
            </div>
            <div class="reason-compare-note__item">
              <strong>${escapeHtml(text.compareFocus)}</strong>
              <p>${escapeHtml(note.focus)}</p>
            </div>
          </div>
        </section>
      `
      : "";

    const cardsHtml = names
      .map((name) => {
        const data = grammarStore[name];
        if (!data) {
          return "";
        }

        const meta = GRAMMAR_META[name] || { group: "common", tags: [] };
        const guide = getDecisionGuide(name, lang);
        const groupLabel =
          meta.group === "common" ? text.groupCommon : text.groupSpecial;
        const sample = data.examples?.[0] || "";

        return `
          <article class="reason-decision-card">
            <div class="reason-decision-card__top">
              <div>
                <h3 class="reason-decision-card__title">${escapeHtml(name)}</h3>
                <span class="reason-decision-card__formula">${escapeHtml(data.formula)}</span>
              </div>
            </div>
            <div class="reason-card-chips" style="margin-top:12px;">
              ${createTagChip(
                groupLabel,
                meta.group === "common"
                  ? "reason-chip--group-common"
                  : "reason-chip--group-special"
              )}
              ${meta.tags
                .map((tag) =>
                  createTagChip(getTagLabel(lang, tag), `reason-chip--${tag}`)
                )
                .join("")}
            </div>
            <div class="reason-decision-card__sections">
              <section class="reason-decision-card__section">
                <strong>${escapeHtml(text.decisionQuestion)}</strong>
                <p>${escapeHtml(guide.question || data.desc)}</p>
              </section>
              <section class="reason-decision-card__section">
                <strong>${escapeHtml(text.decisionChoose)}</strong>
                <p>${escapeHtml(guide.choose || data.desc)}</p>
              </section>
              <section class="reason-decision-card__section">
                <strong>${escapeHtml(text.decisionCaution)}</strong>
                <p>${escapeHtml(data.constraints)}</p>
              </section>
              <section class="reason-decision-card__section reason-decision-card__sample">
                <strong>${escapeHtml(text.decisionSample)}</strong>
                <p>${escapeHtml(sample)}</p>
              </section>
            </div>
          </article>
        `;
      })
      .join("");

    scaffold.cardsWrapper.innerHTML = `
      ${noteHtml}
      <section class="reason-decision-grid">
        ${cardsHtml}
      </section>
    `;

    setCompareView("cards");
  }

  function refreshAll() {
    ensureStyle();
    moveTopControls();
    renderGuide();
    enhanceCards();
    enhanceCompareBar();
    enhanceInfoModal();
    enhanceCompareSummary();
  }

  function observe(target, callback) {
    if (!target) {
      return;
    }

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(callback);
    });
    observer.observe(target, { childList: true, subtree: true });
  }

  function bindLanguageButtons() {
    document.querySelectorAll(".lang-btn").forEach((button) => {
      if (button.dataset.reasonLangBound === "true") {
        return;
      }

      button.dataset.reasonLangBound = "true";
      button.addEventListener("click", () => {
        window.setTimeout(refreshAll, 0);
      });
    });
  }

  function init() {
    refreshAll();
    bindLanguageButtons();
    observe(document.getElementById("grammar-group-1"), refreshAll);
    observe(document.getElementById("grammar-group-2"), refreshAll);
    observe(document.getElementById("infoTab"), enhanceInfoModal);
    observe(document.getElementById("compareContent"), enhanceCompareSummary);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
