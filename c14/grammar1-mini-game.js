(() => {
    const QUESTIONS = [
        {
            type: "mcq",
            tag: "상황 고르기",
            prompt: "친구가 “왜 휴대전화 불을 켰어요?”라고 물었습니다. 불을 켠 이유와 행동을 한 문장으로 가장 알맞게 말한 것을 고르세요.",
            promptVi: "Bạn của bạn hỏi: “Sao bạn bật đèn điện thoại vậy?” Hãy chọn câu tự nhiên nhất, nói luôn cả lý do và hành động trong một câu.",
            hintKo: "복도가 어두웠다는 상태만이 아니라, 그래서 불을 켰다는 행동까지 이어져야 합니다.",
            hintVi: "Không chỉ cần nói hành lang tối, mà còn phải nối đến hành động bật đèn.",
            options: [
                "복도가 하도 어두워서 휴대전화 불을 켰어요.",
                "복도가 너무 어두워서 벽만 더듬으면서 걸었어요.",
                "복도가 아주 어두워서 다시 밖으로 나왔어요."
            ],
            answer: "복도가 하도 어두워서 휴대전화 불을 켰어요.",
            optionNotes: {
                "복도가 너무 어두워서 벽만 더듬으면서 걸었어요.": "이 문장도 자연스럽지만, 질문에서 묻는 행동은 '휴대전화 불을 켠 것'이라서 답이 어긋납니다.",
                "복도가 아주 어두워서 다시 밖으로 나왔어요.": "이 답도 다른 행동의 이유는 설명하지만, 왜 휴대전화 불을 켰는지에는 직접 답하지 못합니다."
            },
            optionNotesVi: {
                "복도가 너무 어두워서 벽만 더듬으면서 걸었어요.": "Câu này cũng tự nhiên, nhưng hành động được hỏi là bật đèn điện thoại nên đáp án bị lệch trọng tâm.",
                "복도가 아주 어두워서 다시 밖으로 나왔어요.": "Câu này giải thích lý do cho một hành động khác, nhưng không trả lời trực tiếp vì sao bạn bật đèn điện thoại."
            },
            explainKo: "질문의 핵심은 행동의 이유입니다. `하도 어두워서`처럼 원인과 결과를 한 번에 잇는 답이 가장 자연스럽습니다.",
            contrastKo: "`하도`와 `너무`는 모두 정도를 세게 말할 수 있지만, 이 퀴즈에서는 `하도`를 결과 연결형으로 익히고 있습니다.",
            explainVi: "Điểm chính của câu hỏi là lý do của hành động, nên câu nối nguyên nhân và kết quả là tự nhiên nhất.",
            contrastVi: "`하도` và `너무` đều có thể nhấn mạnh mức độ, nhưng trong bài này `하도` được luyện theo kiểu nối với kết quả."
        },
        {
            type: "mcq",
            tag: "대답 고르기",
            prompt: "한 입 먹자마자 친구가 “먹을 만해요?”라고 물었습니다. 너무 매워서 먹기 힘들다는 느낌을 바로 말할 때 가장 자연스러운 대답을 고르세요.",
            promptVi: "Vừa ăn một miếng thì bạn hỏi: “Có ăn được không?” Hãy chọn câu trả lời tự nhiên nhất để nói ngay rằng món này cay quá nên khó ăn.",
            hintKo: "지금 느낀 강한 맛을 짧게 말하는 상황입니다.",
            hintVi: "Đây là tình huống nói ngắn gọn cảm giác vị quá mạnh ngay lúc này.",
            options: [
                "이 음식은 너무 매워요.",
                "이 음식은 아주 매워요.",
                "이 음식은 하도 매워요."
            ],
            answer: "이 음식은 너무 매워요.",
            optionNotes: {
                "이 음식은 아주 매워요.": "`아주`도 가능하지만, '먹기 힘들 정도'의 강한 부담감을 바로 말할 때는 `너무`가 더 잘 맞습니다.",
                "이 음식은 하도 매워요.": "이 퀴즈의 기준에서는 `하도`를 종결형과 바로 연결하지 않고, 보통 뒤 결과를 이어 주는 구조로 봅니다."
            },
            optionNotesVi: {
                "이 음식은 아주 매워요.": "`아주`도 có thể dùng được, nhưng khi muốn nói ngay cảm giác cay đến mức khó ăn thì `너무` phù hợp hơn.",
                "이 음식은 하도 매워요.": "Trong bài này, `하도` không được dùng trực tiếp ở dạng kết thúc câu mà thường đi với phần kết quả ở phía sau."
            },
            explainKo: "맛에 대한 즉각적인 느낌만 짧게 말할 때는 `너무 매워요`가 가장 자연스럽습니다.",
            contrastKo: "`하도`는 이 퀴즈에서 `-아서/어서`와 함께 결과를 잇는 자리에서 연습하고, `너무/아주`는 문장을 끝맺는 데도 쓸 수 있습니다.",
            explainVi: "Khi muốn kết thúc câu ngay tại đó, `너무` tự nhiên hơn.",
            contrastVi: "Trong bài này, `하도` được luyện ở chỗ nối với `-아서/어서`, còn `너무/아주` cũng có thể dùng để kết thúc câu."
        },
        {
            type: "mcq",
            tag: "상태 말하기",
            prompt: "새 교실을 보고 선생님께 교실 상태만 차분하게 설명하려고 합니다. 가장 자연스러운 문장을 고르세요.",
            promptVi: "Bạn đang nhìn lớp học mới và muốn bình tĩnh chỉ miêu tả trạng thái của lớp cho giáo viên. Hãy chọn câu tự nhiên nhất.",
            hintKo: "중립적으로 상태만 말하는 자리입니다.",
            hintVi: "Đây là lúc chỉ miêu tả trạng thái một cách trung tính và bình tĩnh.",
            options: [
                "새 교실이 아주 넓어요.",
                "새 교실이 너무 넓어요.",
                "새 교실이 하도 넓어서 계속 둘러봤어요."
            ],
            answer: "새 교실이 아주 넓어요.",
            optionNotes: {
                "새 교실이 너무 넓어요.": "`너무`도 쓸 수 있지만, 선생님께 차분하게 상태만 설명하는 자리에서는 `아주`가 더 중립적이고 자연스럽습니다.",
                "새 교실이 하도 넓어서 계속 둘러봤어요.": "이 문장은 교실 상태보다 '계속 둘러본 행동'까지 강조합니다. 질문은 교실이 어떤지만 차분히 답하는 자리입니다."
            },
            optionNotesVi: {
                "새 교실이 너무 넓어요.": "`너무`도 쓸 수 있지만, khi bình tĩnh chỉ miêu tả trạng thái cho giáo viên thì `아주` trung tính và tự nhiên hơn.",
                "새 교실이 하도 넓어서 계속 둘러봤어요.": "Câu này nhấn vào hành động cứ nhìn quanh, hơn là chỉ miêu tả trạng thái của lớp học."
            },
            explainKo: "상태 설명만 차분하게 끝낼 때는 `아주 넓어요`가 가장 자연스럽습니다.",
            contrastKo: "`아주`는 비교적 차분한 강조, `너무`는 강한 강조, `하도`는 이 퀴즈에서 결과 연결형으로 익힙니다.",
            explainVi: "Khi chỉ muốn miêu tả trạng thái một cách bình tĩnh, `아주` tự nhiên hơn.",
            contrastVi: "`아주` là cách nhấn nhẹ và bình tĩnh hơn, `너무` mạnh hơn, còn `하도` trong bài này được luyện ở dạng nối với kết quả."
        },
        {
            type: "mcq",
            tag: "교정하기",
            prompt: "다음 중 `하도`를 살려 가장 자연스럽게 고친 문장을 고르세요. “복도가 하도 어두워요.”",
            hintKo: "`하도`를 그대로 살리려면 뒤에 결과를 이어 보세요.",
            hintVi: "Nếu giữ `하도`, hãy nối thêm kết quả ở phía sau.",
            options: [
                "복도가 너무 어두워요.",
                "복도가 하도 어두워서 계단이 잘 안 보였어요.",
                "복도가 아주 어두워요."
            ],
            answer: "복도가 하도 어두워서 계단이 잘 안 보였어요.",
            optionNotes: {
                "복도가 너무 어두워요.": "이 문장 자체는 자연스럽지만, 문제에서 요구한 것은 `하도`를 살려 고치는 것이므로 정답은 아닙니다.",
                "복도가 아주 어두워요.": "이 문장도 끝맺는 설명으로는 가능하지만, `하도`를 유지해 결과를 붙이라는 문제 조건과는 다릅니다."
            },
            optionNotesVi: {
                "복도가 너무 어두워요.": "Bản thân câu này tự nhiên, nhưng đề yêu cầu giữ `하도` rồi sửa lại nên đây không phải đáp án đúng.",
                "복도가 아주 어두워요.": "Câu này có thể dùng để kết thúc câu, nhưng khác với yêu cầu là giữ `하도` và nối thêm kết quả."
            },
            explainKo: "`하도`를 유지하려면 `-아서/어서`와 함께 뒤 결과를 이어 주는 것이 자연스럽습니다.",
            contrastKo: "같은 뜻이라도 `너무/아주`로 바꾸면 끝맺을 수 있고, `하도`를 살리면 결과를 덧붙이는 쪽으로 가야 합니다.",
            explainVi: "Nếu giữ `하도`, cách tự nhiên nhất là nối với `-아서/어서` rồi thêm kết quả.",
            contrastVi: "Dù nghĩa gần nhau, đổi sang `너무/아주` thì có thể kết thúc câu, còn giữ `하도` thì nên đi theo hướng thêm phần kết quả."
        },
        {
            type: "short",
            tag: "바꿔 쓰기",
            prompt: "다음을 `하도 ...어서`로 바꿔 쓰세요. “너무 피곤해서 소파에서 잠들었어요.”",
            hintKo: "뜻은 비슷하게 두고, `너무`를 `하도`로 바꾸어 보세요.",
            hintVi: "Giữ nguyên ý, chỉ đổi `너무` sang `하도`.",
            inputPlaceholder: "예: 하도 피곤해서 ...",
            answers: [
                "하도 피곤해서 소파에서 잠들었어요."
            ],
            explainKo: "`하도`와 `너무`는 여기서 뜻이 가깝게 쓰일 수 있습니다. 둘 다 심한 정도와 뒤 결과를 함께 보여 줍니다.",
            contrastKo: "공통점은 둘 다 `-아서/어서`와 함께 결과를 이을 수 있다는 점이고, 차이는 `하도` 쪽이 체감과 놀람이 더 강하게 들린다는 점입니다.",
            wrongHintKo: "`너무`를 `하도`로 바꾸고, 뒤 결과인 `소파에서 잠들었어요`는 그대로 이어 보세요.",
            wrongHintVi: "Hãy đổi `너무` thành `하도`, rồi giữ nguyên phần kết quả `소파에서 잠들었어요`.",
            explainVi: "Ở đây `하도` và `너무` có thể dùng với nghĩa gần nhau vì đều nối mức độ mạnh với kết quả.",
            contrastVi: "Điểm chung là cả hai đều có thể nối với kết quả bằng `-아서/어서`; điểm khác là `하도` nghe mạnh hơn về cảm giác và sự ngạc nhiên."
        },
        {
            type: "mcq",
            tag: "의미 이해",
            prompt: "“하도 조용해서 집중이 잘됐어요.”와 뜻이 가장 가까운 것은?",
            hintKo: "의미는 비슷하지만 어감은 조금 달라질 수 있습니다.",
            hintVi: "Nghĩa gần giống nhau, dù sắc thái có thể hơi khác.",
            options: [
                "아주 조용해서 집중이 잘됐어요.",
                "아주 조용해요.",
                "하도 조용해요."
            ],
            answer: "아주 조용해서 집중이 잘됐어요.",
            optionNotes: {
                "아주 조용해요.": "조용하다는 설명만 있고, 집중이 잘됐다는 결과가 빠져 있어 원문 뜻과 완전히 같지 않습니다.",
                "하도 조용해요.": "이 퀴즈에서는 `하도`를 종결형으로 끝내지 않고 결과와 함께 익히고 있습니다."
            },
            optionNotesVi: {
                "아주 조용해요.": "Câu này chỉ nói là yên tĩnh, còn kết quả là tập trung tốt thì bị thiếu nên chưa trùng hẳn với nghĩa gốc.",
                "하도 조용해요.": "Trong bài này, `하도` không được luyện ở dạng kết thúc câu mà đi cùng với kết quả."
            },
            explainKo: "원문은 조용한 정도 때문에 집중이 잘됐다는 뜻입니다. `아주 조용해서`로 바꾸어도 기본 의미는 크게 달라지지 않습니다.",
            contrastKo: "`하도`와 `아주`는 때때로 비슷한 뜻으로 보일 수 있지만, 이 퀴즈에서는 `하도`를 결과 연결형 중심으로 익힙니다.",
            explainVi: "Ý gốc là vì quá yên tĩnh nên tập trung tốt; đổi sang `아주 조용해서` thì nghĩa cơ bản vẫn gần nhau.",
            contrastVi: "`하도` và `아주` đôi khi có vẻ gần nghĩa, nhưng trong bài này `하도` được luyện chủ yếu theo kiểu nối với kết quả."
        },
        {
            type: "mcq",
            tag: "문장 완성",
            prompt: "빈칸에 가장 알맞은 표현을 고르세요. “공연장이 ______ 귀가 멍멍했어요.”",
            hintKo: "뒤에 결과가 이미 나와 있으니, 그와 자연스럽게 이어지는 표현을 고르세요.",
            hintVi: "Phía sau đã có kết quả, nên hãy chọn cách nối tự nhiên với kết quả đó.",
            options: [
                "하도 시끄러워서",
                "너무 시끄러워요",
                "아주 시끄러워요"
            ],
            answer: "하도 시끄러워서",
            optionNotes: {
                "너무 시끄러워요": "문장을 끝맺는 형태라서 뒤에 이어지는 결과 `귀가 멍멍했어요`와 직접 연결되지 않습니다.",
                "아주 시끄러워요": "이것도 끝맺는 형태라서 뒤 결과를 붙일 자리와 맞지 않습니다."
            },
            optionNotesVi: {
                "너무 시끄러워요": "Đây là dạng kết thúc câu nên không nối trực tiếp được với kết quả phía sau là `귀가 멍멍했어요`.",
                "아주 시끄러워요": "Câu này cũng là dạng kết thúc câu nên không hợp với chỗ cần nối tiếp phần kết quả."
            },
            explainKo: "뒤에 `귀가 멍멍했어요`라는 결과가 있으므로 `하도 시끄러워서`처럼 원인과 결과를 잇는 표현이 필요합니다.",
            contrastKo: "여기서 핵심은 뜻보다 구조입니다. `하도 ...어서`는 결과와 이어지고, `아주/너무 + 종결형`은 문장을 끝맺습니다.",
            explainVi: "Vì phía sau là kết quả `tai bị ù`, nên cần dạng nối như `하도 시끄러워서`.",
            contrastVi: "Điểm chính ở đây là cấu trúc hơn là nghĩa: `하도 ...어서` nối sang kết quả, còn `아주/너무 + dạng kết thúc câu` thì khép câu lại."
        },
        {
            type: "short",
            tag: "문장 만들기",
            prompt: "다음 정보를 사용해 `너무`로 문장을 끝맺어 쓰세요. `새 컴퓨터 / 빠르다`",
            hintKo: "이번에는 결과를 붙이지 말고, `너무`로 문장을 끝내 보세요.",
            hintVi: "Lần này đừng nối kết quả, hãy kết thúc câu bằng `너무`.",
            inputPlaceholder: "예: 새 컴퓨터가 너무 빨라요.",
            answers: [
                "새 컴퓨터가 너무 빨라요.",
                "컴퓨터가 너무 빨라요.",
                "새 컴퓨터는 너무 빨라요."
            ],
            explainKo: "이 문제는 `하도`가 아니라 `너무`를 문장 끝에서 자연스럽게 쓰는 연습입니다.",
            contrastKo: "같은 정도 강조라도 `너무`는 이렇게 바로 끝맺을 수 있고, `하도`는 이 퀴즈에서 결과 연결형으로만 다룹니다.",
            wrongHintKo: "`너무`를 사용해 `빨라요`로 끝나는 문장을 써 보세요.",
            wrongHintVi: "Hãy dùng `너무` và viết một câu kết thúc bằng `빨라요`.",
            explainVi: "Bài này luyện cách dùng `너무` để kết thúc câu một cách tự nhiên.",
            contrastVi: "Dù cùng nhấn mạnh mức độ, `너무` có thể kết thúc câu trực tiếp như thế này, còn `하도` trong bài này chỉ được xử lý như dạng nối với kết quả."
        },
        {
            type: "mcq",
            tag: "상황 고르기",
            prompt: "친구가 “왜 라면을 두 개나 먹었어요?”라고 물었습니다. 많이 먹은 이유와 결과를 한 문장으로 가장 자연스럽게 말한 것을 고르세요.",
            promptVi: "Bạn của bạn hỏi: “Sao bạn lại ăn đến hai gói mì vậy?” Hãy chọn câu tự nhiên nhất, nói trong một câu cả lý do và kết quả của việc ăn nhiều.",
            hintKo: "배가 고팠다는 상태만이 아니라, 그래서 두 개를 먹었다는 결과까지 이어져야 합니다.",
            hintVi: "Không chỉ cần nói là đói, mà còn phải nối tới kết quả là ăn hai gói mì.",
            options: [
                "하도 배가 고파서 라면을 두 개 먹었어요.",
                "아주 배가 고파서 물부터 마셨어요.",
                "너무 배가 고파서 그냥 누웠어요."
            ],
            answer: "하도 배가 고파서 라면을 두 개 먹었어요.",
            optionNotes: {
                "아주 배가 고파서 물부터 마셨어요.": "이 문장도 배가 고픈 이유는 설명하지만, 질문에서 묻는 행동은 '라면을 두 개 먹은 것'이라서 답이 어긋납니다.",
                "너무 배가 고파서 그냥 누웠어요.": "이 말도 다른 결과를 말할 뿐, 왜 라면을 두 개나 먹었는지에는 직접 답하지 않습니다."
            },
            optionNotesVi: {
                "아주 배가 고파서 물부터 마셨어요.": "Câu này cũng giải thích lý do là đói, nhưng hành động được hỏi là ăn hai gói mì nên đáp án bị lệch.",
                "너무 배가 고파서 그냥 누웠어요.": "Câu này chỉ nói một kết quả khác, chứ không trả lời trực tiếp vì sao lại ăn đến hai gói mì."
            },
            explainKo: "질문은 '왜 두 개나 먹었는지'를 묻고 있으므로, `하도 배가 고파서`처럼 이유와 결과를 함께 말하는 답이 가장 자연스럽습니다.",
            contrastKo: "`아주/너무`는 상태를 설명하며 끝맺을 수 있지만, 행동의 이유까지 분명히 말하려면 `하도 ...어서`가 더 효과적입니다.",
            explainVi: "Vì câu hỏi hỏi lý do ăn tới hai gói mì, nên câu nối mức độ đói với kết quả là tự nhiên nhất.",
            contrastVi: "`아주/너무` có thể kết thúc câu khi miêu tả trạng thái, nhưng nếu muốn nói rõ lý do của một hành động thì `하도 ...어서` hiệu quả hơn."
        },
        {
            type: "mcq",
            tag: "상황 고르기",
            prompt: "친구가 “왜 이렇게 눈이 빨개?”라고 물었습니다. 늦게 화면을 본 정도와 그 결과를 한 번에 말한 대답을 고르세요.",
            promptVi: "Bạn của bạn hỏi: “Sao mắt bạn đỏ thế?” Hãy chọn câu trả lời nói gọn trong một lần cả mức độ xem màn hình đến khuya và kết quả của nó.",
            hintKo: "늦게 봤다는 사실만이 아니라, 그래서 눈이 빨개졌다는 결과까지 이어져야 합니다.",
            hintVi: "Không chỉ nói là xem đến khuya, mà còn phải nối với kết quả là mắt đỏ lên.",
            options: [
                "어젯밤에 하도 늦게까지 화면을 봐서 눈이 빨개졌어.",
                "어젯밤에 너무 늦게까지 화면을 봐서 그냥 늦게 잤어.",
                "어젯밤에 아주 늦게까지 화면을 봤어."
            ],
            answer: "어젯밤에 하도 늦게까지 화면을 봐서 눈이 빨개졌어.",
            optionNotes: {
                "어젯밤에 너무 늦게까지 화면을 봐서 그냥 늦게 잤어.": "이 문장은 다른 결과를 말할 뿐, 왜 눈이 빨개졌는지에는 직접 답하지 않습니다.",
                "어젯밤에 아주 늦게까지 화면을 봤어.": "늦게 봤다는 설명은 되지만, 질문에 맞게 눈이 빨개진 결과까지는 이어지지 않습니다."
            },
            optionNotesVi: {
                "어젯밤에 너무 늦게까지 화면을 봐서 그냥 늦게 잤어.": "Câu này nói một kết quả khác, chứ không giải thích trực tiếp vì sao mắt đỏ.",
                "어젯밤에 아주 늦게까지 화면을 봤어.": "Câu này chỉ giải thích là xem muộn, nhưng chưa nối tới kết quả là mắt đỏ đúng theo câu hỏi."
            },
            explainKo: "화면을 본 정도가 심했고 그 결과 눈이 빨개졌으므로 `하도 ...어서`가 가장 잘 맞습니다.",
            contrastKo: "마지막 문제에서도 핵심은 같습니다. `하도`는 결과와 함께, `너무/아주`는 끝맺기에도 쓸 수 있다는 구조 차이를 기억하면 됩니다.",
            explainVi: "Vì xem màn hình quá lâu và kết quả là mắt đỏ lên, nên `하도 ...어서` phù hợp nhất.",
            contrastVi: "Ngay cả ở câu cuối, điểm quan trọng vẫn vậy: `하도` đi cùng kết quả, còn `너무/아주` cũng có thể dùng để kết thúc câu."
        }
    ];

    const state = {
        deck: [],
        idx: 0,
        score: 0,
        streak: 0,
        bestStreak: 0,
        response: "",
        answered: false,
        logs: []
    };

    const page = document.getElementById("page");
    const viToggle = document.getElementById("viToggle");
    const startPanel = document.getElementById("startPanel");
    const quizPanel = document.getElementById("quizPanel");
    const resultPanel = document.getElementById("resultPanel");
    const startBtn = document.getElementById("startBtn");
    const progressText = document.getElementById("progressText");
    const scoreText = document.getElementById("scoreText");
    const streakText = document.getElementById("streakText");
    const progressBar = document.getElementById("progressBar");
    const questionTag = document.getElementById("questionTag");
    const questionPrompt = document.getElementById("questionPrompt");
    const questionPromptVi = document.getElementById("questionPromptVi");
    const questionHintKo = document.getElementById("questionHintKo");
    const questionHintVi = document.getElementById("questionHintVi");
    const choices = document.getElementById("choices");
    const feedbackBox = document.getElementById("feedbackBox");
    const confirmBtn = document.getElementById("confirmBtn");
    const nextBtn = document.getElementById("nextBtn");

    let viOn = false;

    viToggle.addEventListener("click", function () {
        viOn = !viOn;
        page.classList.toggle("vi-on", viOn);
        viToggle.textContent = viOn ? "Tiếng Việt ON" : "Tiếng Việt OFF";
    });

    startBtn.addEventListener("click", startGame);
    confirmBtn.addEventListener("click", confirmAnswer);
    nextBtn.addEventListener("click", nextQuestion);

    function escapeHtml(text) {
        return String(text == null ? "" : text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function normalizeAnswer(text) {
        return String(text == null ? "" : text)
            .trim()
            .replace(/[“”‘’"'.,!?]/g, "")
            .replace(/\s+/g, "");
    }

    function shuffle(items) {
        const arr = items.slice();
        for (let i = arr.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    function displayAnswer(question) {
        return question.type === "short" ? question.answers[0] : question.answer;
    }

    function startGame() {
        state.deck = shuffle(QUESTIONS).map(function (question) {
            const cloned = Object.assign({}, question);
            if (question.type === "mcq") {
                cloned.shuffledOptions = shuffle(question.options);
            }
            return cloned;
        });
        state.idx = 0;
        state.score = 0;
        state.streak = 0;
        state.bestStreak = 0;
        state.response = "";
        state.answered = false;
        state.logs = [];

        startPanel.classList.add("hidden");
        resultPanel.classList.add("hidden");
        quizPanel.classList.remove("hidden");
        renderQuestion();
    }

    function currentQuestion() {
        return state.deck[state.idx];
    }

    function renderMcq(question) {
        choices.innerHTML = question.shuffledOptions.map(function (option, index) {
            return '<button type="button" class="choice-btn w-full rounded-[22px] border border-slate-200 bg-white px-4 py-4 text-left text-sm font-bold leading-7 text-slate-700" data-choice="' + index + '">' + escapeHtml(option) + '</button>';
        }).join("");

        Array.from(choices.querySelectorAll("[data-choice]")).forEach(function (button) {
            button.addEventListener("click", function () {
                if (state.answered) return;
                state.response = question.shuffledOptions[Number(button.dataset.choice)];
                Array.from(choices.querySelectorAll("[data-choice]")).forEach(function (item) {
                    item.className = "choice-btn w-full rounded-[22px] border border-slate-200 bg-white px-4 py-4 text-left text-sm font-bold leading-7 text-slate-700";
                });
                button.className = "choice-btn w-full rounded-[22px] border border-indigo-400 bg-indigo-50 px-4 py-4 text-left text-sm font-bold leading-7 text-indigo-800";
                confirmBtn.disabled = false;
            });
        });
    }

    function renderShort(question) {
        choices.innerHTML =
            '<div class="rounded-[24px] border border-slate-200 bg-white p-4">' +
                '<label for="shortAnswerInput" class="block text-xs font-black uppercase tracking-[0.14em] text-slate-500">한 줄 답변</label>' +
                '<textarea id="shortAnswerInput" rows="3" class="mt-3 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium leading-7 text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" placeholder="' + escapeHtml(question.inputPlaceholder || "답을 써 보세요.") + '"></textarea>' +
                '<p class="mt-2 text-xs leading-6 text-slate-500 safe">띄어쓰기와 문장부호는 조금 느슨하게 검사합니다.</p>' +
            '</div>';

        const input = document.getElementById("shortAnswerInput");
        input.addEventListener("input", function () {
            if (state.answered) return;
            state.response = input.value;
            confirmBtn.disabled = !input.value.trim();
        });
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter" && !event.shiftKey && !confirmBtn.disabled) {
                event.preventDefault();
                confirmAnswer();
            }
        });
        input.focus();
    }

    function renderQuestion() {
        const question = currentQuestion();
        state.response = "";
        state.answered = false;

        progressText.textContent = (state.idx + 1) + " / " + state.deck.length;
        scoreText.textContent = state.score;
        streakText.textContent = state.streak;
        progressBar.style.width = (state.idx / state.deck.length * 100) + "%";
        questionTag.textContent = question.tag + (question.type === "short" ? " · 쓰기" : " · 선택");
        questionPrompt.textContent = question.prompt;
        if (question.promptVi) {
            questionPromptVi.textContent = question.promptVi;
            questionPromptVi.classList.remove("hidden");
        } else {
            questionPromptVi.textContent = "";
            questionPromptVi.classList.add("hidden");
        }
        questionHintKo.textContent = question.hintKo;
        questionHintVi.textContent = question.hintVi;
        feedbackBox.className = "mt-4 hidden rounded-[24px] border p-4";
        feedbackBox.innerHTML = "";
        confirmBtn.disabled = true;
        nextBtn.disabled = true;
        nextBtn.textContent = state.idx === state.deck.length - 1 ? "결과 보기" : "다음 문제";

        if (question.type === "short") {
            renderShort(question);
        } else {
            renderMcq(question);
        }
    }

    function isAcceptedAnswer(question, userAnswer) {
        const normalized = normalizeAnswer(userAnswer);
        return question.answers.some(function (answer) {
            return normalizeAnswer(answer) === normalized;
        });
    }

    function lockShortInput() {
        const input = document.getElementById("shortAnswerInput");
        if (!input) return;
        input.disabled = true;
        input.classList.add("bg-slate-50", "text-slate-500");
    }

    function markMcqFeedback(question, selectedText) {
        Array.from(choices.querySelectorAll("[data-choice]")).forEach(function (button) {
            const text = button.textContent;
            button.disabled = true;
            if (text === question.answer) {
                button.className = "choice-btn w-full rounded-[22px] border border-emerald-400 bg-emerald-50 px-4 py-4 text-left text-sm font-bold leading-7 text-emerald-800";
            } else if (text === selectedText) {
                button.className = "choice-btn w-full rounded-[22px] border border-rose-400 bg-rose-50 px-4 py-4 text-left text-sm font-bold leading-7 text-rose-800";
            } else {
                button.className = "choice-btn w-full rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-bold leading-7 text-slate-400";
            }
        });
    }

    function buildFeedbackHtml(question, selectedText, correct, selectedNote, selectedNoteVi) {
        const answerText = displayAnswer(question);
        const statusVi = correct ? "Đúng rồi." : "Hãy thử phân biệt thêm một lần nữa.";
        let html =
            '<p class="text-sm font-black ' + (correct ? "text-emerald-700" : "text-rose-700") + '">' +
                (correct ? "정답입니다." : "한 번 더 구별해 봐요.") +
            '</p>';
        html += '<p class="mt-1 text-xs leading-6 text-indigo-700 safe"><b>VI:</b> ' + escapeHtml(statusVi) + '</p>';

        html += '<p class="mt-2 text-sm leading-7 text-slate-700 safe"><b>정답:</b> ' + escapeHtml(answerText) + '</p>';

        if (!correct) {
            html += '<p class="mt-1 text-sm leading-7 text-slate-700 safe"><b>내 답:</b> ' + escapeHtml(selectedText || "(무응답)") + '</p>';
        }

        if (!correct && selectedNote) {
            html += '<p class="mt-2 text-sm leading-7 text-rose-700 safe"><b>왜 아쉬웠나요:</b> ' + escapeHtml(selectedNote) + '</p>';
            if (selectedNoteVi) {
                html += '<p class="mt-1 text-xs leading-6 text-indigo-700 safe"><b>VI:</b> ' + escapeHtml(selectedNoteVi) + '</p>';
            }
        }

        html += '<p class="mt-2 text-sm leading-7 text-slate-700 safe"><b>핵심:</b> ' + escapeHtml(question.explainKo) + '</p>';
        if (question.explainVi) {
            html += '<p class="mt-1 text-xs leading-6 text-indigo-700 safe"><b>VI:</b> ' + escapeHtml(question.explainVi) + '</p>';
        }

        if (question.contrastKo) {
            html += '<p class="mt-2 text-sm leading-7 text-slate-700 safe"><b>구조 포인트:</b> ' + escapeHtml(question.contrastKo) + '</p>';
            if (question.contrastVi) {
                html += '<p class="mt-1 text-xs leading-6 text-indigo-700 safe"><b>VI:</b> ' + escapeHtml(question.contrastVi) + '</p>';
            }
        }
        return html;
    }

    function confirmAnswer() {
        const question = currentQuestion();
        if (state.answered) return;
        if (question.type === "mcq" && !state.response) return;
        if (question.type === "short" && !String(state.response || "").trim()) return;

        const selectedText = question.type === "short" ? String(state.response).trim() : state.response;
        const correct = question.type === "short"
            ? isAcceptedAnswer(question, selectedText)
            : selectedText === question.answer;
        const selectedNote = correct
            ? ""
            : (question.type === "mcq"
                ? (question.optionNotes && question.optionNotes[selectedText] ? question.optionNotes[selectedText] : "")
                : (question.wrongHintKo || ""));
        const selectedNoteVi = correct
            ? ""
            : (question.type === "mcq"
                ? (question.optionNotesVi && question.optionNotesVi[selectedText] ? question.optionNotesVi[selectedText] : "")
                : (question.wrongHintVi || ""));

        state.answered = true;
        if (correct) {
            state.score += 1;
            state.streak += 1;
            state.bestStreak = Math.max(state.bestStreak, state.streak);
        } else {
            state.bestStreak = Math.max(state.bestStreak, state.streak);
            state.streak = 0;
        }

        state.logs.push({
            prompt: question.prompt,
            promptVi: question.promptVi || "",
            tag: question.tag,
            selected: selectedText,
            answer: displayAnswer(question),
            correct: correct,
            explainKo: question.explainKo,
            explainVi: question.explainVi || "",
            contrastKo: question.contrastKo || "",
            contrastVi: question.contrastVi || "",
            noteKo: selectedNote,
            noteVi: selectedNoteVi
        });

        scoreText.textContent = state.score;
        streakText.textContent = state.streak;

        if (question.type === "short") {
            lockShortInput();
        } else {
            markMcqFeedback(question, selectedText);
        }

        feedbackBox.className = "mt-4 rounded-[24px] border p-4 " + (correct ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50");
        feedbackBox.innerHTML = buildFeedbackHtml(question, selectedText, correct, selectedNote, selectedNoteVi);

        confirmBtn.disabled = true;
        nextBtn.disabled = false;
        progressBar.style.width = (((state.idx + 1) / state.deck.length) * 100) + "%";
    }

    function nextQuestion() {
        if (!state.answered) return;
        state.idx += 1;
        if (state.idx >= state.deck.length) {
            renderResult();
            return;
        }
        renderQuestion();
    }

    function renderResult() {
        quizPanel.classList.add("hidden");
        resultPanel.classList.remove("hidden");

        const wrong = state.logs.filter(function (log) { return !log.correct; });
        const rate = Math.round((state.score / state.deck.length) * 100);
        const reviewHtml = wrong.length
            ? wrong.map(function (log) {
                return '<article class="rounded-[22px] border border-rose-200 bg-rose-50 p-4">' +
                    '<span class="inline-flex rounded-full bg-white px-3 py-1 text-xs font-black text-rose-700">' + escapeHtml(log.tag) + '</span>' +
                    '<p class="mt-3 text-sm font-black leading-7 text-slate-900 safe">' + escapeHtml(log.prompt) + '</p>' +
                    (log.promptVi ? '<p class="mt-1 text-xs leading-6 text-indigo-700 safe">VI: ' + escapeHtml(log.promptVi) + '</p>' : '') +
                    '<p class="mt-2 text-sm leading-7 text-slate-700 safe"><b>내 답:</b> ' + escapeHtml(log.selected || "(무응답)") + '</p>' +
                    '<p class="mt-1 text-sm leading-7 text-slate-700 safe"><b>정답:</b> ' + escapeHtml(log.answer) + '</p>' +
                    (log.noteKo ? '<p class="mt-2 text-sm leading-7 text-rose-700 safe"><b>왜 아쉬웠나요:</b> ' + escapeHtml(log.noteKo) + '</p>' : '') +
                    (log.noteVi ? '<p class="mt-1 text-xs leading-6 text-indigo-700 safe"><b>VI:</b> ' + escapeHtml(log.noteVi) + '</p>' : '') +
                    '<p class="mt-2 text-sm leading-7 text-slate-700 safe"><b>핵심:</b> ' + escapeHtml(log.explainKo) + '</p>' +
                    (log.explainVi ? '<p class="mt-1 text-xs leading-6 text-indigo-700 safe"><b>VI:</b> ' + escapeHtml(log.explainVi) + '</p>' : '') +
                    (log.contrastKo ? '<p class="mt-2 text-sm leading-7 text-slate-700 safe"><b>구조 포인트:</b> ' + escapeHtml(log.contrastKo) + '</p>' : '') +
                    (log.contrastVi ? '<p class="mt-1 text-xs leading-6 text-indigo-700 safe"><b>VI:</b> ' + escapeHtml(log.contrastVi) + '</p>' : '') +
                '</article>';
            }).join("")
            : '<article class="rounded-[22px] border border-emerald-200 bg-emerald-50 p-4"><p class="text-sm font-black leading-7 text-emerald-700 safe">모든 문제를 정확하게 풀었어요. 이제 `하도 ...어서` 문장 하나와 `아주/너무`로 끝나는 문장 하나를 각각 직접 만들어 보면 구조 차이가 더 또렷해집니다.</p></article>';

        resultPanel.innerHTML =
            '<p class="text-xs font-black uppercase tracking-[0.14em] text-indigo-600">Result</p>' +
            '<h2 class="mt-3 text-3xl font-black text-slate-900">문법 1 미니 퀴즈 완료</h2>' +
            '<div class="mt-6 grid gap-3 md:grid-cols-3">' +
                '<div class="rounded-[24px] border border-indigo-100 bg-indigo-50 p-4"><p class="text-xs font-black text-indigo-700">점수</p><p class="mt-2 text-3xl font-black text-slate-900">' + state.score + ' / ' + state.deck.length + '</p></div>' +
                '<div class="rounded-[24px] border border-sky-100 bg-sky-50 p-4"><p class="text-xs font-black text-sky-700">정답률</p><p class="mt-2 text-3xl font-black text-slate-900">' + rate + '%</p></div>' +
                '<div class="rounded-[24px] border border-amber-100 bg-amber-50 p-4"><p class="text-xs font-black text-amber-700">최고 연속 정답</p><p class="mt-2 text-3xl font-black text-slate-900">' + state.bestStreak + '</p></div>' +
            '</div>' +
            '<div class="mt-6 flex flex-wrap gap-2">' +
                '<a href="grammar1.html" class="action-btn inline-flex items-center rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-black text-white">문법 1 다시 보기</a>' +
                '<a href="index.html" class="action-btn inline-flex items-center rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-700">14과 허브로</a>' +
                '<button id="restartBtn" class="action-btn rounded-2xl bg-slate-900 px-4 py-3 text-sm font-black text-white" type="button">다시 풀기</button>' +
            '</div>' +
            '<div class="mt-6">' +
                '<p class="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Review</p>' +
                '<div class="mt-3 space-y-3">' + reviewHtml + '</div>' +
            '</div>';

        document.getElementById("restartBtn").addEventListener("click", startGame);
    }
})();
