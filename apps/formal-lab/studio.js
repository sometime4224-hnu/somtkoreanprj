const principles = [
  ["문체 인식 우선", "상황·독자·매체·목적을 먼저 읽게 한 뒤 격식 여부를 판단합니다."],
  ["문장 통합 교정", "조사, 종결형, 높임, 호칭을 한 문장 안에서 함께 조정합니다."],
  ["순환형 수업", "모범 텍스트 분석, 변환 쓰기, 면담 피드백, 재작성을 짧게 순환합니다."],
];

const criteria = [
  "문체 적절성",
  "장르 구조",
  "조사·어미·높임 정확성",
  "어휘·상투 표현 적절성",
  "재작성의 질",
];

const APP_VARIANT = window.FORMAL_APP_VARIANT === "student" ? "student" : "teacher";
const isTeacher = APP_VARIANT === "teacher";

const studentHighlights = [
  ["상황 먼저 읽기", "문장을 보기 전에 누구에게, 어떤 목적으로 쓰는지 먼저 생각하세요."],
  ["한 문장씩 함께 고치기", "조사, 높임, 종결형, 어휘를 따로 떼지 말고 한 번에 조정하세요."],
  ["변환 후 다시 쓰기", "초안을 쓴 뒤 체크리스트와 자기 점검으로 다시 다듬어 보세요."],
];

const studentStageOverrides = {
  sentence: {
    title: "문장 통합 교정 단계",
  },
  feedback: {
    title: "자기 점검 및 재작성 단계",
    summary: "자기 점검표와 질문을 바탕으로 초안을 다시 읽고 재작성하는 단계입니다.",
  },
};

const studentFeedbackSteps = [
  ["1. 자기 점검", "초안에서 갑작스러운 요청, 조사 누락, 구어 표현을 먼저 찾아보세요."],
  ["2. 질문으로 다시 읽기", "왜 말하기처럼 들리는지, 배경 설명이 충분한지 스스로 물어보세요."],
  ["3. 재작성", "무엇을 바꿀지 2~3개의 액션으로 좁혀 다시 써 보세요."],
];

const viMap = {
  "문체 인식 우선": "Ưu tiên nhận diện văn phong",
  "상황 먼저 읽기": "Đọc tình huống trước",
  "문장을 보기 전에 누구에게, 어떤 목적으로 쓰는지 먼저 생각하세요.": "Trước khi nhìn vào câu, hãy nghĩ xem mình đang viết cho ai và với mục đích gì.",
  "한 문장씩 함께 고치기": "Chỉnh từng câu theo cách tích hợp",
  "조사, 높임, 종결형, 어휘를 따로 떼지 말고 한 번에 조정하세요.": "Đừng tách riêng trợ từ, kính ngữ, đuôi câu và từ vựng; hãy điều chỉnh chúng cùng lúc.",
  "변환 후 다시 쓰기": "Viết lại sau khi chuyển đổi",
  "초안을 쓴 뒤 체크리스트와 자기 점검으로 다시 다듬어 보세요.": "Sau khi viết bản nháp, hãy dùng checklist và phần tự kiểm tra để chỉnh lại.",
  "상황·독자·매체·목적을 먼저 읽게 한 뒤 격식 여부를 판단합니다.": "Trước hết, người học xác định tình huống, người đọc, phương tiện và mục đích rồi mới quyết định mức độ trang trọng.",
  "문장 통합 교정": "Chỉnh sửa câu theo cách tích hợp",
  "조사, 종결형, 높임, 호칭을 한 문장 안에서 함께 조정합니다.": "Trong một câu, người học điều chỉnh đồng thời trợ từ, đuôi câu, kính ngữ và cách xưng hô.",
  "순환형 수업": "Vòng lặp phân tích - chuyển đổi - viết lại",
  "모범 텍스트 분석, 변환 쓰기, 면담 피드백, 재작성을 짧게 순환합니다.": "Bài học vận hành theo vòng lặp ngắn: phân tích văn bản mẫu, viết chuyển đổi, phản hồi qua trao đổi và viết lại.",
  "베트남 학습자를 위한 연구 기반 지도용 웹앱입니다. 문체 인식, 문장 통합 교정, 장르 템플릿, 변환 쓰기, 내용 중심 피드백을 한 흐름으로 연결했습니다.": "Đây là web app hướng dẫn dựa trên nghiên cứu dành cho người học Việt Nam. Ứng dụng kết nối thành một mạch liền mạch: nhận diện văn phong, chỉnh sửa câu tích hợp, mẫu thể loại, viết chuyển đổi và phản hồi tập trung vào nội dung.",
  "문체 판별 → 문장 통합 교정 → 장르 템플릿 분석 → 변환 쓰기 → 동료 검토·면담·재작성": "Nhận diện văn phong → chỉnh sửa câu tích hợp → phân tích mẫu thể loại → viết chuyển đổi → phản hồi bạn học, trao đổi với giáo viên và viết lại",
  "조사 복원, 요청 완화, 합쇼체 일관성, 발표문 구조 신호, 설명문 전개 논리를 집중적으로 다룹니다.": "Trọng tâm là khôi phục trợ từ, làm mềm yêu cầu, duy trì nhất quán văn phong trang trọng, tín hiệu cấu trúc bài thuyết trình và logic triển khai bài giải thích.",
  "프로젝터 수업용 판별 활동과 개별 실습용 변환/피드백 도구를 함께 제공합니다.": "Ứng dụng cung cấp cả hoạt động phân biệt dùng trên máy chiếu và công cụ chuyển đổi/phản hồi cho luyện tập cá nhân.",
  "문체 판별 → 문장 고치기 → 장르 표현 익히기 → 변환 쓰기 → 자기 점검": "Nhận diện văn phong → sửa câu → học biểu đạt theo thể loại → viết chuyển đổi → tự kiểm tra",
  "조사 복원, 요청 완화, 합쇼체 유지, 연결어 사용을 먼저 확인하세요.": "Hãy kiểm tra trước việc khôi phục trợ từ, làm mềm yêu cầu, duy trì 합쇼체 và dùng từ nối.",
  "모범 답안을 바로 보기보다 먼저 직접 써 보고, 그다음 체크리스트와 5항목 진단을 사용하세요.": "Đừng xem đáp án mẫu ngay. Hãy tự viết trước, rồi mới dùng checklist và phần chẩn đoán 5 tiêu chí.",
  "모범 예문을 분석하고, 직접 바꿔 쓰고, 자기 점검까지 할 수 있는 학생용 격식체 쓰기 연습 앱입니다.": "Đây là ứng dụng luyện viết văn phong trang trọng dành cho học viên, nơi bạn có thể phân tích câu mẫu, tự chuyển đổi cách viết và tự kiểm tra bài của mình.",
  "자기 점검표와 질문을 바탕으로 초안을 다시 읽고 재작성하는 단계입니다.": "Đây là bước đọc lại bản nháp bằng checklist và câu hỏi gợi ý, rồi viết lại.",
  "정답보다 이유가 먼저입니다. 누구에게 쓰는지와 왜 쓰는지부터 적어 보세요.": "Lý do quan trọng hơn đáp án. Hãy viết trước xem bạn đang viết cho ai và vì sao.",
  "조사, 높임, 어미가 함께 어떻게 바뀌는지 한 번에 찾아보세요.": "Hãy tìm xem trợ từ, kính ngữ và đuôi câu đã thay đổi cùng nhau như thế nào.",
  "이유를 먼저 쓰고 요청을 뒤에 두면 이메일이 더 자연스럽습니다.": "Email sẽ tự nhiên hơn nếu bạn nêu lý do trước rồi mới viết yêu cầu.",
  "메모처럼 짧게 끊지 말고, '먼저-다음으로-마지막으로'로 청중을 안내하세요.": "Đừng cắt câu ngắn như ghi chú. Hãy dẫn dắt người nghe bằng cấu trúc 'trước hết - tiếp theo - cuối cùng'.",
  "짧은 말하기식 문장 대신 첫째, 둘째 이유를 완결된 문장으로 써 보세요.": "Thay vì câu ngắn kiểu nói miệng, hãy viết lý do thứ nhất và thứ hai thành các câu hoàn chỉnh.",
  "초안에서 갑작스러운 요청, 조사 누락, 구어 표현을 먼저 찾아보세요.": "Trước hết hãy tìm trong bản nháp những yêu cầu quá đột ngột, chỗ thiếu trợ từ và biểu hiện khẩu ngữ.",
  "왜 말하기처럼 들리는지, 배경 설명이 충분한지 스스로 물어보세요.": "Hãy tự hỏi vì sao câu nghe giống lời nói và phần giải thích bối cảnh đã đủ chưa.",
  "무엇을 바꿀지 2~3개의 액션으로 좁혀 다시 써 보세요.": "Hãy thu hẹp thành 2-3 việc cần sửa rồi viết lại.",
  "초안을 불러오거나 직접 입력한 뒤 자기 진단을 실행하세요.": "Hãy nạp bản nháp hoặc tự nhập rồi chạy phần tự chẩn đoán.",
  "정답보다 먼저, 상황과 독자에 맞는지 판단하는 단계입니다.": "Đây là bước ưu tiên xác định xem câu có phù hợp với tình huống và người đọc hay không trước khi nghĩ đến đáp án.",
  "SNS 문장, 친구 메시지, 교수 이메일, 발표문 일부를 섞어 제시합니다.": "Trộn các câu trên SNS, tin nhắn cho bạn, email gửi giáo sư và một phần bài phát biểu để trình bày cùng nhau.",
  "왜 부적절한지 근거를 독자·목적·매체 언어로 설명하게 합니다.": "Yêu cầu người học giải thích vì sao không phù hợp bằng ngôn ngữ về người đọc, mục đích và phương tiện.",
  "문장이 틀렸다기보다 상황에 맞지 않는다는 점을 분명히 합니다.": "Nhấn mạnh rằng vấn đề không phải chỉ là sai câu mà là không phù hợp với tình huống.",
  "어미 하나로만 판단하는지": "Người học có chỉ dựa vào một đuôi câu để phán đoán hay không",
  "독자를 말하지 못하는지": "Người học có không nói ra được người đọc là ai hay không",
  "요청이 지나치게 직접적인지": "Yêu cầu có quá trực tiếp hay không",
  "상황 판별 근거 말하기와 대체 문장 제안": "Nêu căn cứ nhận diện tình huống và đề xuất câu thay thế",
  "조사, 종결형, 높임, 호칭을 한 문장 안에서 묶어서 교정합니다.": "Trợ từ, đuôi câu, kính ngữ và cách xưng hô được chỉnh sửa cùng nhau trong một câu.",
  "호칭, 높임, 요청 완화, 조사 선택을 하나의 교정 묶음으로 보여 줍니다.": "Cho người học thấy cách xưng hô, kính ngữ, làm mềm yêu cầu và chọn trợ từ như một gói chỉnh sửa thống nhất.",
  "문어에서는 조사 생략을 허용하지 않는다는 점을 반복 확인합니다.": "Nhắc đi nhắc lại rằng trong văn viết trang trọng không chấp nhận việc lược bỏ trợ từ.",
  "은/는이 화제와 대조를 조직한다는 점을 예문 안에서 짚습니다.": "Chỉ ra trong ví dụ rằng 은/는 có vai trò tổ chức chủ đề và đối chiếu.",
  "요를 붙인 뒤 격식체라고 생각하는지": "Người học có nghĩ chỉ cần thêm 요 là thành văn phong trang trọng hay không",
  "명사 뒤 조사가 비는지": "Trợ từ sau danh từ có bị bỏ trống hay không",
  "직접 요청이 남는지": "Yêu cầu trực tiếp có còn sót lại hay không",
  "최적 개정문 선택과 통합 교정 포인트 설명": "Chọn câu sửa phù hợp nhất và giải thích các điểm chỉnh sửa tích hợp",
  "이메일, 발표문, TOPIK 53형 글의 구조와 상투 표현을 시각화합니다.": "Trực quan hóa cấu trúc và cụm diễn đạt quen dùng của email, bài phát biểu và bài TOPIK dạng 53.",
  "모범 텍스트를 구조, 연결어, 금지 표현으로 해체합니다.": "Tách văn bản mẫu theo cấu trúc, từ nối và biểu hiện cần tránh.",
  "같은 합쇼체라도 장르별 구조가 다르다는 점을 대비시킵니다.": "Cho người học đối chiếu rằng cùng là văn phong trang trọng nhưng cấu trúc thay đổi theo thể loại.",
  "암기보다 구조 템플릿으로 인식시키게 합니다.": "Hướng người học nhận diện như mẫu cấu trúc chứ không chỉ học thuộc.",
  "장르 구조 없이 공손하게만 쓰는지": "Người học có chỉ viết lịch sự mà thiếu cấu trúc thể loại hay không",
  "연결어 없이 나열하는지": "Các câu có chỉ liệt kê mà không có từ nối hay không",
  "구어 표현이 섞이는지": "Biểu hiện khẩu ngữ có lẫn vào hay không",
  "장르별 구조도와 표현 은행": "Sơ đồ cấu trúc theo thể loại và ngân hàng biểu đạt",
  "어미 교체가 아니라 구조 재배치, 배경 설명 추가, 요청 완화를 요구합니다.": "Không chỉ đổi đuôi câu mà còn yêu cầu sắp xếp lại cấu trúc, thêm bối cảnh và làm mềm yêu cầu.",
  "친구용 메시지, 발표 메모, SNS 후기를 출발 텍스트로 줍니다.": "Dùng tin nhắn cho bạn, ghi chú phát biểu và bài đăng SNS làm văn bản xuất phát.",
  "호칭 정리, 배경 설명 추가, 요청 완화, 조사 복원을 과제로 명시합니다.": "Nêu rõ nhiệm vụ gồm chỉnh cách xưng hô, thêm bối cảnh, làm mềm yêu cầu và khôi phục trợ từ.",
  "모범 답안은 정답이 아니라 조정 전략의 예시로 비교하게 합니다.": "Cho người học xem đáp án mẫu như ví dụ về chiến lược điều chỉnh chứ không phải đáp án duy nhất.",
  "원문 순서를 그대로 유지하는지": "Người học có giữ nguyên trật tự câu của bản gốc hay không",
  "배경 설명 없이 주장만 쓰는지": "Người học có chỉ viết yêu cầu hay ý kiến mà không thêm bối cảnh hay không",
  "구어 표현이 남는지": "Biểu hiện khẩu ngữ có còn sót lại hay không",
  "장르별 전환 초안과 자체 점검": "Bản nháp chuyển đổi theo thể loại và tự kiểm tra",
  "동료 검토, 교사 면담, 재작성을 묶어 내용 중심 피드백을 진행합니다.": "Gộp phản hồi bạn học, trao đổi với giáo viên và viết lại để triển khai phản hồi tập trung vào nội dung.",
  "왜 갑작스럽게 들리는가, 왜 말하기처럼 들리는가를 질문합니다.": "Đặt câu hỏi vì sao câu nghe đột ngột hoặc vì sao nghe giống lời nói.",
  "문체 일관성, 조사 누락, 높임 적절성, 장르 구조만 짧게 확인합니다.": "Kiểm tra ngắn gọn tính nhất quán văn phong, chỗ thiếu trợ từ, độ phù hợp của kính ngữ và cấu trúc thể loại.",
  "재작성에서 무엇을 바꿨는지 학습자 스스로 말하게 합니다.": "Yêu cầu người học tự nói rõ mình đã thay đổi điều gì khi viết lại.",
  "형태 피드백만 남는지": "Phản hồi có chỉ còn dừng ở hình thức hay không",
  "재작성 계획이 사라지는지": "Kế hoạch viết lại có biến mất hay không",
  "같은 구어 표현이 반복되는지": "Biểu hiện khẩu ngữ cũ có lặp lại hay không",
  "5항목 진단과 재작성 액션": "Chẩn đoán theo 5 tiêu chí và hành động viết lại",
  "배경 설명 없이 요청이 바로 나오고, '빨리'가 압박으로 들립니다.": "Yêu cầu xuất hiện ngay mà không có bối cảnh, và từ '빨리' tạo cảm giác thúc ép.",
  "친구에게 보내는 개인 메시지이므로 구어체가 자연스럽습니다.": "Vì đây là tin nhắn cá nhân gửi bạn bè nên văn phong khẩu ngữ là tự nhiên.",
  "'말할게요'는 발표 메모 느낌이 강해 공적 발표문으로는 가볍게 들립니다.": "Từ '말할게요' mang sắc thái ghi chú nói miệng nên trong bài phát biểu trang trọng sẽ nghe quá nhẹ.",
  "주장 제시, 이유 연결, 합쇼체 유지가 모두 갖추어져 있습니다.": "Câu đã có đủ nêu ý kiến, nối lý do và duy trì kết thúc trang trọng.",
  "요청 완화와 조사 정비가 약합니다.": "Mức độ làm mềm yêu cầu và chỉnh trợ từ còn yếu.",
  "호칭, 인사, 배경 설명, 요청 완화가 함께 정리되었습니다.": "Cách xưng hô, lời chào, bối cảnh và mức độ làm mềm yêu cầu đã được chỉnh cùng nhau.",
  "'빨리'와 요체가 남아 있습니다.": "Từ '빨리' và văn phong 요체 vẫn còn sót lại.",
  "메모 느낌이 그대로 남습니다.": "Cảm giác ghi chú vẫn còn nguyên.",
  "도입, 구조 안내, 합쇼체가 안정적입니다.": "Phần mở đầu, tín hiệu cấu trúc và văn phong 합쇼체 khá ổn định.",
  "공식성과 구조 신호가 부족합니다.": "Độ trang trọng và tín hiệu cấu trúc còn thiếu.",
  "주장과 이유가 완결된 문장으로 정리됩니다.": "Ý kiến và lý do đã được sắp xếp thành những câu hoàn chỉnh.",
  "핵심 조사가 빠져 있습니다.": "Các trợ từ cốt lõi đang bị thiếu.",
  "구어체가 남아 있습니다.": "Văn phong khẩu ngữ vẫn còn.",
  "공적 관계를 먼저 세웁니다.": "Trước hết xác lập quan hệ công khai và trang trọng.",
  "요청 앞에 이유를 넣어 갑작스러움을 줄입니다.": "Đặt lý do trước yêu cầu để giảm cảm giác đột ngột.",
  "'자료를'처럼 조사를 생략하지 않습니다.": "Không lược bỏ trợ từ như trong cụm '자료를'.",
  "'감사하겠습니다'류 표현을 씁니다.": "Sử dụng các biểu hiện như '감사하겠습니다'.",
  "'말할게요'를 '발표하겠습니다'로 바꿉니다.": "Chuyển '말할게요' thành '발표하겠습니다'.",
  "'먼저', '다음으로'를 써서 길을 안내합니다.": "Dùng '먼저', '다음으로' để dẫn đường cho người nghe.",
  "'어려운 점을'처럼 목적어 조사를 복원합니다.": "Khôi phục trợ từ tân ngữ như trong '어려운 점을'.",
  "도입부터 마무리까지 같은 종결형을 유지합니다.": "Giữ cùng một kiểu kết thúc câu từ mở đầu đến kết thúc.",
  "'중요하다고 생각합니다'는 기본 주장 틀입니다.": "'중요하다고 생각합니다' là khung câu nêu ý kiến cơ bản.",
  "'학교 규칙이', '학생들의 안전을'처럼 조사 복원이 필요합니다.": "Cần khôi phục trợ từ như trong '학교 규칙이', '학생들의 안전을'.",
  "'때문입니다'로 이유문을 마무리합니다.": "Khép câu nêu lý do bằng '때문입니다'.",
  "둘째 이유와 결론을 붙이면 장르형 문단으로 확장됩니다.": "Khi thêm lý do thứ hai và kết luận, đoạn văn sẽ mở rộng thành đúng dạng thể loại.",
  "독자와 관계를 먼저 세우고, 요청 이유를 제시한 뒤, 완화된 표현으로 핵심 요청을 말합니다.": "Trước hết xác lập quan hệ với người đọc, nêu lý do yêu cầu rồi trình bày yêu cầu chính bằng cách diễn đạt mềm hơn.",
  "발표문은 내용을 말하는 것이 아니라 청중을 안내하는 텍스트입니다.": "Bài phát biểu không chỉ nói nội dung mà còn là văn bản dẫn dắt người nghe.",
  "주장-이유-결론의 전개가 명확해야 하고 문체 일관성이 유지되어야 합니다.": "Mạch triển khai ý kiến - lý do - kết luận phải rõ ràng và văn phong phải nhất quán.",
  "교수님/선생님 호칭과 함께 '안녕하십니까'로 시작합니다.": "Bắt đầu bằng cách xưng hô giáo sư/thầy cô cùng lời chào '안녕하십니까'.",
  "발표나 과제와 관련된 이유를 먼저 제시합니다.": "Trình bày trước lý do liên quan đến bài thuyết trình hoặc bài tập.",
  "'가능하시다면' 같은 완화 장치를 넣습니다.": "Chèn các thiết bị làm mềm như '가능하시다면'.",
  "확인에 대한 감사를 남깁니다.": "Để lại lời cảm ơn vì đã xem xét.",
  "청중 인사와 발표 주제를 한 문장으로 제시합니다.": "Trình bày lời chào và chủ đề phát biểu trong một câu.",
  "'먼저-다음으로-마지막으로' 구조를 알려 줍니다.": "Báo trước cấu trúc 'trước hết - tiếp theo - cuối cùng'.",
  "각 부분에서 연결어를 반복 사용합니다.": "Lặp lại từ nối ở từng phần.",
  "요약과 감사 인사로 끝맺습니다.": "Khép lại bằng tóm tắt và lời cảm ơn.",
  "'필요하다고 생각합니다' 같은 입장 문장을 둡니다.": "Đặt câu nêu lập trường như '필요하다고 생각합니다'.",
  "'첫째, 둘째'로 전개 논리를 드러냅니다.": "Dùng 'thứ nhất, thứ hai' để làm rõ logic triển khai.",
  "이유를 바로 뒷받침하는 설명을 붙입니다.": "Thêm lời giải thích trực tiếp hỗ trợ cho lý do.",
  "주장을 다시 정리하며 단락을 닫습니다.": "Khép đoạn bằng cách nhắc lại ý kiến.",
  "요청을 먼저 쓰고 배경을 뒤늦게 붙이는 경우가 많으므로 이유-요청 순서를 눈에 보이게 연습시키는 것이 좋습니다.": "Vì người học thường viết yêu cầu trước rồi mới thêm bối cảnh, nên cần luyện rõ thứ tự lý do - yêu cầu.",
  "메모체를 그대로 읽으면 발표문이 즉흥 말하기처럼 들립니다.": "Nếu đọc nguyên văn kiểu ghi chú, bài phát biểu sẽ nghe giống nói ứng khẩu.",
  "짧은 말하기식 이유 나열에서 멈추지 않도록 이유문을 완결된 문장으로 쓰게 해야 합니다.": "Cần hướng người học viết câu lý do hoàn chỉnh để không dừng lại ở việc liệt kê ngắn theo kiểu nói.",
  "호칭과 인사 추가": "Thêm cách xưng hô và lời chào",
  "배경 설명 먼저 제시": "Đưa bối cảnh lên trước",
  "요청 완화": "Làm mềm yêu cầu",
  "조사 복원과 합쇼체 유지": "Khôi phục trợ từ và giữ văn phong 합쇼체",
  "공식적인 도입 문장 만들기": "Tạo câu mở đầu trang trọng",
  "주제와 순서 예고": "Báo trước chủ đề và trình tự",
  "합쇼체 유지": "Giữ văn phong 합쇼체",
  "목적어 조사 복원": "Khôi phục trợ từ tân ngữ",
  "주장 문장 넣기": "Thêm câu nêu ý kiến",
  "첫째·둘째 이유 전개": "Triển khai lý do thứ nhất và thứ hai",
  "구어 표현 교체": "Thay biểu hiện khẩu ngữ",
  "결론 문장 마무리": "Khép lại bằng câu kết luận",
  "먼저 초안을 작성해 보세요. 짧아도 괜찮습니다.": "Hãy viết thử bản nháp trước. Ngắn cũng không sao.",
  "출발 텍스트의 목적을 먼저 말해 보세요.": "Hãy nói trước mục đích của văn bản xuất phát.",
  "배경 설명 한 문장을 먼저 추가해 보세요.": "Hãy thử thêm trước một câu giải thích bối cảnh.",
  "핵심 요소가 보입니다.": "Đã thấy yếu tố cốt lõi.",
  "이 요소를 더 분명히 넣어 보세요.": "Hãy thể hiện yếu tố này rõ hơn.",
  "남아 있는 구어 표현을 상투 표현으로 바꾸세요.": "Hãy đổi những biểu hiện khẩu ngữ còn lại sang biểu hiện quen dùng trong văn trang trọng.",
  "조사 생략이 없는지 명사 뒤를 천천히 읽어 보세요.": "Hãy đọc chậm sau các danh từ để kiểm tra xem có chỗ nào lược bỏ trợ từ không.",
  "장르 전환이 안정적입니다.": "Việc chuyển đổi thể loại khá ổn định.",
  "핵심 뼈대는 보입니다.": "Khung cốt lõi đã hiện ra.",
  "원문을 더 과감하게 재배치해 보세요.": "Hãy sắp xếp lại bản gốc mạnh dạn hơn.",
  "문체 일관성, 조사 누락, 갑작스러운 요청 여부를 짧게 확인합니다.": "Kiểm tra ngắn gọn độ nhất quán văn phong, chỗ thiếu trợ từ và việc yêu cầu có đột ngột hay không.",
  "'왜 말하기처럼 들리는가'를 질문하며 내용 중심 피드백을 줍니다.": "Đặt câu hỏi 'vì sao nghe giống lời nói' để đưa phản hồi tập trung vào nội dung.",
  "무엇을 바꿀지 2~3개의 액션으로 좁혀 다시 쓰게 합니다.": "Thu hẹp thành 2-3 hành động cụ thể rồi viết lại.",
  "초안을 불러오거나 직접 입력한 뒤 진단을 실행하세요.": "Hãy nạp bản nháp hoặc tự nhập rồi chạy phần chẩn đoán.",
  "구어 표현이 남아 있어 톤이 흔들립니다.": "Biểu hiện khẩu ngữ còn lại làm cho giọng điệu bị dao động.",
  "격식 종결과 톤이 비교적 안정적입니다.": "Đuôi câu trang trọng và giọng điệu khá ổn định.",
  "장르 구조 신호가 비교적 분명합니다.": "Tín hiệu cấu trúc thể loại khá rõ.",
  "장르를 드러내는 구조 신호가 더 필요합니다.": "Cần thêm tín hiệu cấu trúc để làm rõ thể loại.",
  "조사와 높임 표현이 비교적 안정적입니다.": "Trợ từ và biểu hiện kính ngữ khá ổn định.",
  "조사 복원과 높임 표현을 다시 점검해 보세요.": "Hãy kiểm tra lại việc khôi phục trợ từ và dùng kính ngữ.",
  "장르에 맞지 않는 어휘가 남아 있습니다.": "Vẫn còn từ ngữ không phù hợp với thể loại.",
  "상투 표현 사용이 비교적 적절합니다.": "Việc dùng các biểu hiện quen dùng khá phù hợp.",
  "원문보다 구조와 배경 설명이 확장되었습니다.": "Cấu trúc và phần bối cảnh đã được mở rộng hơn so với bản gốc.",
  "원문을 거의 그대로 옮긴 부분이 많습니다.": "Vẫn còn nhiều chỗ gần như chép nguyên bản gốc.",
  "어떤 표현이 아직 말하기나 SNS 문장처럼 들리나요?": "Những biểu hiện nào vẫn còn nghe như lời nói hay câu trên SNS?",
  "첫 문장과 마지막 문장이 장르의 역할을 보여 주고 있나요?": "Câu đầu và câu cuối đã thể hiện vai trò của thể loại chưa?",
  "조사 하나만 복원해도 뜻이 더 선명해지는 자리는 어디인가요?": "Những chỗ nào chỉ cần khôi phục một trợ từ là ý nghĩa sẽ rõ hơn?",
  "이 요청이나 주장이 왜 갑작스럽게 들리지 않도록 배경 설명을 더 넣을 수 있을까요?": "Có thể thêm bối cảnh như thế nào để yêu cầu hay ý kiến này không còn nghe đột ngột?",
  "구어 표현과 요체를 합쇼체 표현으로 바꾸기": "Đổi biểu hiện khẩu ngữ và 요체 sang cách diễn đạt 합쇼체",
  "장르 구조를 드러내는 도입 또는 결론 문장 추가하기": "Thêm câu mở đầu hoặc kết luận để làm rõ cấu trúc thể loại",
  "핵심 명사 뒤 조사 복원하기": "Khôi phục trợ từ sau các danh từ cốt lõi",
  "연결어와 상투 표현을 1~2개 더 넣어 문단 흐름 다듬기": "Thêm 1-2 từ nối và biểu hiện quen dùng để chỉnh dòng chảy của đoạn văn",
};

const baseStages = [
  {
    id: "recognition",
    no: "01",
    title: "문체 인식 단계",
    summary: "정답보다 먼저, 상황과 독자에 맞는지 판단하는 단계입니다.",
    teacher: [
      "SNS 문장, 친구 메시지, 교수 이메일, 발표문 일부를 섞어 제시합니다.",
      "왜 부적절한지 근거를 독자·목적·매체 언어로 설명하게 합니다.",
      "문장이 틀렸다기보다 상황에 맞지 않는다는 점을 분명히 합니다.",
    ],
    watch: ["어미 하나로만 판단하는지", "독자를 말하지 못하는지", "요청이 지나치게 직접적인지"],
    output: "상황 판별 근거 말하기와 대체 문장 제안",
    hint: "Hãy xác định đúng người đọc và mục đích trước, rồi mới sửa câu.",
  },
  {
    id: "sentence",
    no: "02",
    title: "문장 층위 통합 지도 단계",
    summary: "조사, 종결형, 높임, 호칭을 한 문장 안에서 묶어서 교정합니다.",
    teacher: [
      "호칭, 높임, 요청 완화, 조사 선택을 하나의 교정 묶음으로 보여 줍니다.",
      "문어에서는 조사 생략을 허용하지 않는다는 점을 반복 확인합니다.",
      "은/는이 화제와 대조를 조직한다는 점을 예문 안에서 짚습니다.",
    ],
    watch: ["요를 붙인 뒤 격식체라고 생각하는지", "명사 뒤 조사가 비는지", "직접 요청이 남는지"],
    output: "최적 개정문 선택과 통합 교정 포인트 설명",
    hint: "Hãy sửa đồng thời cách xưng hô, trợ từ, cấu trúc câu và mức độ làm mềm yêu cầu.",
  },
  {
    id: "genre",
    no: "03",
    title: "장르 템플릿 단계",
    summary: "이메일, 발표문, TOPIK 53형 글의 구조와 상투 표현을 시각화합니다.",
    teacher: [
      "모범 텍스트를 구조, 연결어, 금지 표현으로 해체합니다.",
      "같은 합쇼체라도 장르별 구조가 다르다는 점을 대비시킵니다.",
      "암기보다 구조 템플릿으로 인식시키게 합니다.",
    ],
    watch: ["장르 구조 없이 공손하게만 쓰는지", "연결어 없이 나열하는지", "구어 표현이 섞이는지"],
    output: "장르별 구조도와 표현 은행",
    hint: "Mỗi thể loại cần có bố cục riêng.",
  },
  {
    id: "transform",
    no: "04",
    title: "변환 연습 단계",
    summary: "어미 교체가 아니라 구조 재배치, 배경 설명 추가, 요청 완화를 요구합니다.",
    teacher: [
      "친구용 메시지, 발표 메모, SNS 후기를 출발 텍스트로 줍니다.",
      "호칭 정리, 배경 설명 추가, 요청 완화, 조사 복원을 과제로 명시합니다.",
      "모범 답안은 정답이 아니라 조정 전략의 예시로 비교하게 합니다.",
    ],
    watch: ["원문 순서를 그대로 유지하는지", "배경 설명 없이 주장만 쓰는지", "구어 표현이 남는지"],
    output: "장르별 전환 초안과 자체 점검",
    hint: "Không chỉ đổi đuôi câu. Cần sắp xếp lại và bổ sung bối cảnh.",
  },
  {
    id: "feedback",
    no: "05",
    title: "수정 전략 및 피드백 단계",
    summary: "동료 검토, 교사 면담, 재작성을 묶어 내용 중심 피드백을 진행합니다.",
    teacher: [
      "왜 갑작스럽게 들리는가, 왜 말하기처럼 들리는가를 질문합니다.",
      "문체 일관성, 조사 누락, 높임 적절성, 장르 구조만 짧게 확인합니다.",
      "재작성에서 무엇을 바꿨는지 학습자 스스로 말하게 합니다.",
    ],
    watch: ["형태 피드백만 남는지", "재작성 계획이 사라지는지", "같은 구어 표현이 반복되는지"],
    output: "5항목 진단과 재작성 액션",
    hint: "Hãy viết lại với mục tiêu cụ thể, không chỉ sửa từng lỗi nhỏ.",
  },
];

const stages = isTeacher
  ? baseStages
  : baseStages.map((stage) => ({
      ...stage,
      ...(studentStageOverrides[stage.id] || {}),
    }));

const recognition = [
  {
    id: "r1",
    context: "교수 이메일",
    audience: "교수",
    medium: "공적 이메일",
    purpose: "발표 자료 요청",
    text: "교수님, 내일 발표인데 자료 빨리 보내 주세요!",
    answer: "bad",
    why: "배경 설명 없이 요청이 바로 나오고, '빨리'가 압박으로 들립니다.",
    fix: "교수님, 안녕하십니까. 내일 발표 준비와 관련하여 자료를 요청드리고자 메일을 드립니다. 가능하시다면 보내 주시면 감사하겠습니다.",
  },
  {
    id: "r2",
    context: "친구 메시지",
    audience: "친구",
    medium: "메신저",
    purpose: "같이 과제 보기",
    text: "오늘 과제 너무 어렵다. 저녁에 같이 볼래?",
    answer: "good",
    why: "친구에게 보내는 개인 메시지이므로 구어체가 자연스럽습니다.",
    fix: "이 문장은 이 맥락에서 적절합니다. 같은 문장을 교수 이메일에 넣으면 부적절해집니다.",
  },
  {
    id: "r3",
    context: "발표문 도입",
    audience: "교수와 동료 학생",
    medium: "발표문",
    purpose: "발표 시작",
    text: "안녕하세요. 오늘은 유학생 아르바이트 문제에 대해 말할게요.",
    answer: "bad",
    why: "'말할게요'는 발표 메모 느낌이 강해 공적 발표문으로는 가볍게 들립니다.",
    fix: "안녕하십니까. 오늘은 유학생 아르바이트 문제에 대해 발표하겠습니다.",
  },
  {
    id: "r4",
    context: "TOPIK 53형",
    audience: "평가자",
    medium: "시험 답안",
    purpose: "의견 제시",
    text: "저는 격식체 쓰기 교육이 필요하다고 생각합니다. 첫째, 공적 관계에서 신뢰를 높일 수 있기 때문입니다.",
    answer: "good",
    why: "주장 제시, 이유 연결, 합쇼체 유지가 모두 갖추어져 있습니다.",
    fix: "둘째 이유와 결론을 덧붙이면 더 안정적인 단락이 됩니다.",
  },
];

const sentenceLabs = [
  {
    id: "s1",
    label: "이메일 요청",
    context: "교수에게 자료 요청하기",
    flawed: "교수님, 내일 발표니까 자료 좀 보내 주세요.",
    options: [
      ["a", "교수님, 내일 발표니까 자료 좀 보내 주세요.", false, "요청 완화와 조사 정비가 약합니다."],
      ["b", "교수님, 안녕하십니까. 내일 발표 준비와 관련하여 자료를 요청드리고자 메일을 드립니다. 가능하시다면 보내 주시면 감사하겠습니다.", true, "호칭, 인사, 배경 설명, 요청 완화가 함께 정리되었습니다."],
      ["c", "교수님, 내일 발표라서 자료 빨리 보내 줘요.", false, "'빨리'와 요체가 남아 있습니다."],
    ],
    points: [
      ["호칭과 인사", "공적 관계를 먼저 세웁니다."],
      ["배경 설명", "요청 앞에 이유를 넣어 갑작스러움을 줄입니다."],
      ["조사 복원", "'자료를'처럼 조사를 생략하지 않습니다."],
      ["요청 완화", "'감사하겠습니다'류 표현을 씁니다."],
    ],
  },
  {
    id: "s2",
    label: "발표문 도입",
    context: "발표 시작과 구조 예고",
    flawed: "오늘은 유학생 아르바이트 문제 말할게요. 먼저 어려운 점 보고 해결법 말할게요.",
    options: [
      ["a", "오늘은 유학생 아르바이트 문제에 대해 말하겠습니다. 먼저 어려운 점 보고 해결법 말하겠습니다.", false, "메모 느낌이 그대로 남습니다."],
      ["b", "안녕하십니까. 오늘은 유학생 아르바이트 문제에 대해 발표하겠습니다. 먼저 어려운 점을 살펴본 뒤, 다음으로 해결 방안을 제시하겠습니다.", true, "도입, 구조 안내, 합쇼체가 안정적입니다."],
      ["c", "안녕하세요. 오늘은 유학생 아르바이트 문제에 대해 말할게요.", false, "공식성과 구조 신호가 부족합니다."],
    ],
    points: [
      ["장르 전환", "'말할게요'를 '발표하겠습니다'로 바꿉니다."],
      ["구조 연결어", "'먼저', '다음으로'를 써서 길을 안내합니다."],
      ["조사 복원", "'어려운 점을'처럼 목적어 조사를 복원합니다."],
      ["합쇼체 유지", "도입부터 마무리까지 같은 종결형을 유지합니다."],
    ],
  },
  {
    id: "s3",
    label: "TOPIK 의견 글",
    context: "의견과 이유를 문단으로 쓰기",
    flawed: "저는 학교 규칙 중요해요. 왜냐하면 학생들 안전 위해서요.",
    options: [
      ["a", "저는 학교 규칙이 중요하다고 생각합니다. 왜냐하면 학교 규칙은 학생들의 안전을 지키는 기준이 되기 때문입니다.", true, "주장과 이유가 완결된 문장으로 정리됩니다."],
      ["b", "저는 학교 규칙 중요합니다. 왜냐하면 학생들 안전 위해서입니다.", false, "핵심 조사가 빠져 있습니다."],
      ["c", "학교 규칙 중요해요. 학생들 안전 때문이에요.", false, "구어체가 남아 있습니다."],
    ],
    points: [
      ["주장 형식", "'중요하다고 생각합니다'는 기본 주장 틀입니다."],
      ["조사 정확성", "'학교 규칙이', '학생들의 안전을'처럼 조사 복원이 필요합니다."],
      ["이유 완결", "'때문입니다'로 이유문을 마무리합니다."],
      ["문단 전개", "둘째 이유와 결론을 붙이면 장르형 문단으로 확장됩니다."],
    ],
  },
];

const genres = [
  {
    id: "email",
    title: "공적 요청 이메일",
    goal: "요청 구조와 완화 표현 훈련",
    lead: "독자와 관계를 먼저 세우고, 요청 이유를 제시한 뒤, 완화된 표현으로 핵심 요청을 말합니다.",
    structure: [
      ["호칭과 인사", "교수님/선생님 호칭과 함께 '안녕하십니까'로 시작합니다."],
      ["배경 설명", "발표나 과제와 관련된 이유를 먼저 제시합니다."],
      ["핵심 요청", "'가능하시다면' 같은 완화 장치를 넣습니다."],
      ["감사와 마무리", "확인에 대한 감사를 남깁니다."],
    ],
    connectors: ["관련하여", "가능하시다면", "확인 부탁드립니다", "감사하겠습니다"],
    formulas: ["안녕하십니까", "메일을 드립니다", "보내 주시면 감사하겠습니다", "바쁘신 가운데 감사합니다"],
    avoid: ["빨리 보내 주세요", "자료 좀", "근데", "줘요"],
    caution: "요청을 먼저 쓰고 배경을 뒤늦게 붙이는 경우가 많으므로 이유-요청 순서를 눈에 보이게 연습시키는 것이 좋습니다.",
    studentCaution: "이유를 먼저 쓰고 요청을 뒤에 두면 이메일이 더 자연스럽습니다.",
    model: "교수님, 안녕하십니까. 내일 발표 준비와 관련하여 참고 자료를 요청드리고자 메일을 드립니다. 가능하시다면 자료를 보내 주시면 감사하겠습니다. 바쁘신 가운데 확인해 주셔서 감사합니다.",
  },
  {
    id: "presentation",
    title: "발표문",
    goal: "합쇼체 유지와 구조적 조직 훈련",
    lead: "발표문은 내용을 말하는 것이 아니라 청중을 안내하는 텍스트입니다.",
    structure: [
      ["도입", "청중 인사와 발표 주제를 한 문장으로 제시합니다."],
      ["전개 예고", "'먼저-다음으로-마지막으로' 구조를 알려 줍니다."],
      ["본론 진행", "각 부분에서 연결어를 반복 사용합니다."],
      ["마무리", "요약과 감사 인사로 끝맺습니다."],
    ],
    connectors: ["먼저", "다음으로", "한편", "마지막으로", "정리하면"],
    formulas: ["발표하겠습니다", "살펴보겠습니다", "제시하겠습니다", "발표를 마치겠습니다"],
    avoid: ["말할게요", "볼게요", "근데", "완전"],
    caution: "메모체를 그대로 읽으면 발표문이 즉흥 말하기처럼 들립니다.",
    studentCaution: "메모처럼 짧게 끊지 말고, '먼저-다음으로-마지막으로'로 청중을 안내하세요.",
    model: "안녕하십니까. 오늘은 베트남 학습자의 격식체 쓰기 특징에 대해 발표하겠습니다. 먼저 문체 인식의 필요성을 살펴보고, 다음으로 자주 나타나는 오류를 설명하겠습니다. 마지막으로 수업 설계 방안을 제안하며 발표를 마치겠습니다.",
  },
  {
    id: "topik",
    title: "TOPIK 53형 설명/의견 글",
    goal: "과제 수행, 전개 구조, 언어 사용 훈련",
    lead: "주장-이유-결론의 전개가 명확해야 하고 문체 일관성이 유지되어야 합니다.",
    structure: [
      ["주장 제시", "'필요하다고 생각합니다' 같은 입장 문장을 둡니다."],
      ["이유 전개", "'첫째, 둘째'로 전개 논리를 드러냅니다."],
      ["설명 보강", "이유를 바로 뒷받침하는 설명을 붙입니다."],
      ["결론", "주장을 다시 정리하며 단락을 닫습니다."],
    ],
    connectors: ["첫째", "둘째", "또한", "따라서", "이와 같이"],
    formulas: ["필요하다고 생각합니다", "중요하다고 볼 수 있습니다", "때문입니다", "노력이 필요합니다"],
    avoid: ["완전", "진짜", "좋겠어요", "빡셌다"],
    caution: "짧은 말하기식 이유 나열에서 멈추지 않도록 이유문을 완결된 문장으로 쓰게 해야 합니다.",
    studentCaution: "짧은 말하기식 문장 대신 첫째, 둘째 이유를 완결된 문장으로 써 보세요.",
    model: "나는 한국어 학습자에게 격식체 쓰기 교육이 반드시 필요하다고 생각한다. 첫째, 격식체는 공적 관계에서 신뢰를 높인다. 둘째, 장르에 맞는 표현을 익히면 과제 수행 능력도 향상된다. 따라서 학습자는 모범 텍스트 분석과 재작성 활동을 통해 격식체를 지속적으로 연습해야 한다.",
  },
];

const transforms = [
  {
    id: "t1",
    title: "친구용 메시지 → 교수 이메일",
    genre: "공적 요청 이메일",
    source: "교수님, 내일 발표인데 자료 아직 못 받았어요. 빨리 보내 주세요!",
    must: ["호칭과 인사 추가", "배경 설명 먼저 제시", "요청 완화", "조사 복원과 합쇼체 유지"],
    model: "교수님, 안녕하십니까. 내일 발표 준비와 관련하여 자료를 요청드리고자 메일을 드립니다. 가능하시다면 자료를 보내 주시면 감사하겠습니다.",
    checks: [
      ["호칭과 인사", /(교수님|선생님)/, /(안녕하십니까|안녕하세요)/],
      ["배경 설명", /(발표|과제|수업)/, /(관련하여|위해|준비)/],
      ["완화된 요청", /(감사하겠습니다|부탁드립니다|가능하시다면|확인해 주시면)/, null],
      ["합쇼체 유지", /(습니다|ㅂ니다|드립니다|하겠습니다)/, null],
    ],
    taboo: [/빨리/, /못 받았어요/, /자료 좀|좀 보내/, /주세요!/],
  },
  {
    id: "t2",
    title: "말하기 메모 → 발표문",
    genre: "발표문",
    source: "오늘은 유학생 아르바이트 문제 말할게요. 먼저 어려운 점 보고 해결법 말할게요.",
    must: ["공식적인 도입 문장 만들기", "주제와 순서 예고", "합쇼체 유지", "목적어 조사 복원"],
    model: "안녕하십니까. 오늘은 유학생 아르바이트 문제에 대해 발표하겠습니다. 먼저 어려운 점을 살펴본 뒤, 다음으로 해결 방안을 제시하겠습니다. 마지막으로 핵심 내용을 정리하며 발표를 마치겠습니다.",
    checks: [
      ["공식 도입", /(안녕하십니까|발표하겠습니다)/, null],
      ["구조 예고", /먼저/, /(다음으로|이어서|마지막으로)/],
      ["주제 명시", /(문제에 대해|발표 주제는|주제는)/, null],
      ["합쇼체 유지", /(하겠습니다|보겠습니다|제시하겠습니다|살펴보겠습니다)/, null],
    ],
    taboo: [/말할게요/, /볼게요/, /근데/, /완전/],
  },
  {
    id: "t3",
    title: "SNS 후기 → TOPIK 설명/의견 글",
    genre: "TOPIK 53형 설명/의견 글",
    source: "한국어 쓰기 수업 완전 빡셌는데 진짜 도움 많이 됐어요. 이런 수업 더 있었으면 좋겠어요.",
    must: ["주장 문장 넣기", "첫째·둘째 이유 전개", "구어 표현 교체", "결론 문장 마무리"],
    model: "나는 한국어 학습자에게 격식체 쓰기 수업이 필요하다고 생각합니다. 첫째, 이러한 수업은 공적 상황에 맞는 표현을 익히는 데 도움이 됩니다. 둘째, 장르에 맞는 글의 구조를 연습하면 과제 수행 능력도 향상됩니다. 따라서 대학에서는 모범 텍스트 분석과 재작성 활동을 포함한 쓰기 수업을 확대할 필요가 있습니다.",
    checks: [
      ["주장 제시", /(생각합니다|필요하다고 봅니다|중요하다고 생각합니다)/, null],
      ["이유 두 가지", /첫째/, /둘째/],
      ["결론 정리", /(따라서|이와 같이|그러므로)/, null],
      ["합쇼체 유지", /(습니다|ㅂ니다|생각합니다|필요합니다)/, null],
    ],
    taboo: [/완전/, /진짜/, /빡셌/, /좋겠어요/],
  },
];

const state = {
  stage: stages[0].id,
  showVi: false,
  desktopMode: false,
  recIndex: 0,
  recAnswers: {},
  sentIndex: 0,
  sentAnswers: {},
  genreId: genres[0].id,
  transformId: transforms[0].id,
  drafts: Object.fromEntries(transforms.map((item) => [item.id, ""])),
  checks: {},
  showModel: {},
  feedbackText: "",
  feedback: null,
};

const app = document.querySelector("#app");
app.addEventListener("click", onClick);
app.addEventListener("input", onInput);
render();

function onClick(event) {
  const target = event.target.closest("[data-stage],[data-rec],[data-action],[data-sent],[data-pick],[data-genre],[data-transform]");
  if (!target) return;
  if (target.dataset.stage) state.stage = target.dataset.stage;
  if (target.dataset.rec) answerRecognition(target.dataset.rec);
  if (target.dataset.sent) state.sentIndex = Number(target.dataset.sent);
  if (target.dataset.pick) answerSentence(target.dataset.pick);
  if (target.dataset.genre) state.genreId = target.dataset.genre;
  if (target.dataset.transform) state.transformId = target.dataset.transform;

  const action = target.dataset.action;
  if (action === "toggle-vi") state.showVi = !state.showVi;
  if (action === "toggle-device") state.desktopMode = !state.desktopMode;
  if (action === "next-rec") state.recIndex = Math.min(state.recIndex + 1, recognition.length - 1);
  if (action === "reset-rec") {
    state.recIndex = 0;
    state.recAnswers = {};
  }
  if (action === "next-sent") state.sentIndex = (state.sentIndex + 1) % sentenceLabs.length;
  if (action === "reset-sent") {
    state.sentIndex = 0;
    state.sentAnswers = {};
  }
  if (action === "check-transform") {
    const task = currentTransform();
    state.checks[task.id] = checkTransform(state.drafts[task.id], task);
  }
  if (action === "toggle-model") {
    const task = currentTransform();
    state.showModel[task.id] = !state.showModel[task.id];
  }
  if (action === "import-feedback") {
    const task = currentTransform();
    state.feedbackText = state.drafts[task.id] || "";
    state.feedback = null;
  }
  if (action === "run-feedback") state.feedback = analyze(state.feedbackText, currentTransform());
  render();
}

function onInput(event) {
  const draft = event.target.closest("[data-draft]");
  if (draft) state.drafts[draft.dataset.draft] = draft.value;
  if (event.target.closest("[data-feedback]")) state.feedbackText = event.target.value;
}

function answerRecognition(choice) {
  const item = recognition[state.recIndex];
  if (!item || state.recAnswers[item.id]) return;
  state.recAnswers[item.id] = choice;
}

function answerSentence(choice) {
  const lab = sentenceLabs[state.sentIndex];
  if (!lab || state.sentAnswers[lab.id]) return;
  state.sentAnswers[lab.id] = choice;
}

function render() {
  const stage = stages.find((item) => item.id === state.stage) || stages[0];
  app.innerHTML = `
    <div class="viewport-shell ${state.desktopMode ? "is-desktop" : "is-mobile"}">
      <div class="app-shell ${state.desktopMode ? "is-desktop-mode" : "is-mobile-mode"}">
        ${hero()}
        ${tabs()}
        <div class="stage-shell">
          <main class="stage-main">${stageView(stage)}</main>
          <aside>
            ${isTeacher ? teacherCard(stage) : ""}
            ${hintCard(stage)}
            ${rubricCard()}
          </aside>
        </div>
      </div>
    </div>
  `;
}

function hero() {
  const heroCards = isTeacher ? principles : studentHighlights;
  const heroBadges = isTeacher
    ? ["문체 인식 → 문법보다 먼저", "장르 안에서 통합 교정", "분석-변환-면담-재작성 순환"]
    : ["문체 인식 → 문법보다 먼저", "장르 안에서 통합 교정", "분석-변환-점검-재작성 순환"];
  return `
    <header class="hero">
      <div class="hero__copy">
        <span class="eyebrow">${isTeacher ? "교사용" : "학생용"}</span>
        <h1>예의 있게 쓰기</h1>
        <div class="hero__controls">
          <button type="button" class="toggle-btn ${state.desktopMode ? "is-active" : ""}" data-action="toggle-device">
            ${state.desktopMode ? "스마트폰 모드로 보기" : "PC 화면 모드 보기"}
          </button>
          <button type="button" class="toggle-btn ${state.showVi ? "is-active" : ""}" data-action="toggle-vi">
            ${state.showVi ? "베트남어 설명 숨기기" : "베트남어 설명 보기"}
          </button>
          ${isTeacher ? `<a class="toggle-btn" href="./student.html">학생용 보기</a>` : ""}
          <span class="muted">${state.desktopMode ? "현재: PC 레이아웃 미리보기" : "기본: 스마트폰 최적화 레이아웃"}</span>
          <span class="muted">설명 아래에 베트남어 번역 표시</span>
        </div>
        <p>${note(isTeacher ? "베트남 학습자를 위한 연구 기반 지도용 웹앱입니다. 문체 인식, 문장 통합 교정, 장르 템플릿, 변환 쓰기, 내용 중심 피드백을 한 흐름으로 연결했습니다." : "모범 예문을 분석하고, 직접 바꿔 쓰고, 자기 점검까지 할 수 있는 학생용 격식체 쓰기 연습 앱입니다.")}</p>
        <div class="hero__badges">
          ${heroBadges
            .map(
              (label, index) =>
                `<span class="token ${index === 0 ? "token--accent" : index === 1 ? "token--warm" : "token--gold"}">${esc(label)}</span>`
            )
            .join("")}
        </div>
        <div class="hero__summary">
          ${heroCards
            .map(
              ([title, body], index) => `
                <article class="overview-card">
                  <div class="overview-card__head">
                    <span class="number">${index + 1}</span>
                    <h3>${esc(title)}</h3>
                  </div>
                  <p>${note(body)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
      <div class="hero__panel">
        <h2>${isTeacher ? "실무 평가 5항목" : "학생용 학습 체크"}</h2>
        <div class="criteria-list">${criteria.map((item) => `<span class="criteria-pill">${esc(item)}</span>`).join("")}</div>
        <div class="principle-list">
          ${
            isTeacher
              ? `
                <article class="principle-item"><strong>추천 운영 순서</strong><p>${note("문체 판별 → 문장 통합 교정 → 장르 템플릿 분석 → 변환 쓰기 → 동료 검토·면담·재작성")}</p></article>
                <article class="principle-item"><strong>베트남 학습자 초점</strong><p>${note("조사 복원, 요청 완화, 합쇼체 일관성, 발표문 구조 신호, 설명문 전개 논리를 집중적으로 다룹니다.")}</p></article>
                <article class="principle-item"><strong>사용 방식</strong><p>${note("프로젝터 수업용 판별 활동과 개별 실습용 변환/피드백 도구를 함께 제공합니다.")}</p></article>
              `
              : `
                <article class="principle-item"><strong>추천 학습 순서</strong><p>${note("문체 판별 → 문장 고치기 → 장르 표현 익히기 → 변환 쓰기 → 자기 점검")}</p></article>
                <article class="principle-item"><strong>오늘 집중할 점</strong><p>${note("조사 복원, 요청 완화, 합쇼체 유지, 연결어 사용을 먼저 확인하세요.")}</p></article>
                <article class="principle-item"><strong>사용 방법</strong><p>${note("모범 답안을 바로 보기보다 먼저 직접 써 보고, 그다음 체크리스트와 5항목 진단을 사용하세요.")}</p></article>
              `
          }
        </div>
      </div>
    </header>
  `;
}

function tabs() {
  return `
    <nav class="stage-tabs" aria-label="수업 단계">
      ${stages
        .map(
          (item) => `
            <button type="button" class="stage-tab ${item.id === state.stage ? "is-active" : ""}" data-stage="${item.id}">
              <span class="stage-tab__number">${item.no}</span>
              <span class="stage-tab__title">${esc(item.title)}</span>
            </button>
          `
        )
        .join("")}
    </nav>
  `;
}

function stageView(stage) {
  if (stage.id === "recognition") return recognitionView(stage);
  if (stage.id === "sentence") return sentenceView(stage);
  if (stage.id === "genre") return genreView(stage);
  if (stage.id === "transform") return transformView(stage);
  return feedbackView(stage);
}

function recognitionView(stage) {
  const item = recognition[state.recIndex];
  const selected = state.recAnswers[item.id];
  const correct = recognition.filter((entry) => state.recAnswers[entry.id] === entry.answer).length;
  return `
    <section class="stage-card">
      ${header(stage)}
      <div class="step-strip">${recognition.map((entry, index) => `<span class="step-pill ${index === state.recIndex ? "is-active" : ""} ${state.recAnswers[entry.id] ? "is-done" : ""}">${index + 1}. ${esc(entry.context)}</span>`).join("")}</div>
      <div class="context-grid">
        <article class="context-item"><strong>상황</strong><p>${esc(item.context)}</p></article>
        <article class="context-item"><strong>독자</strong><p>${esc(item.audience)}</p></article>
        <article class="context-item"><strong>매체</strong><p>${esc(item.medium)}</p></article>
        <article class="context-item"><strong>목적</strong><p>${esc(item.purpose)}</p></article>
      </div>
      <div class="quote-box"><strong>판별할 문장</strong>${esc(item.text)}</div>
      <div class="choice-row">
        <button type="button" class="choice-btn is-positive" data-rec="good" ${selected ? "disabled" : ""}>적절하다</button>
        <button type="button" class="choice-btn is-negative" data-rec="bad" ${selected ? "disabled" : ""}>부적절하다</button>
      </div>
      ${
        selected
          ? `<div class="status-box ${selected === item.answer ? "is-good" : "is-warn"}"><strong>${selected === item.answer ? "판별 적중" : "판별 재점검"}</strong><p class="status-line">정답은 <b>${item.answer === "good" ? "적절하다" : "부적절하다"}</b> 입니다.</p><p>${note(item.why)}</p></div><div class="feedback-block"><strong>교체 예시</strong><p>${esc(item.fix)}</p></div>`
          : `<div class="empty-state">${note(isTeacher ? "정답보다 중요한 것은 이유입니다. 먼저 독자와 목적을 말해 보게 하세요." : "정답보다 이유가 먼저입니다. 누구에게 쓰는지와 왜 쓰는지부터 적어 보세요.")}</div>`
      }
      <div class="action-row">
        <button type="button" class="action-btn" data-action="next-rec">다음 문항</button>
        <button type="button" class="action-btn" data-action="reset-rec">다시 시작</button>
        <span class="metric-pill">정답 ${correct} / ${recognition.length}</span>
      </div>
    </section>
  `;
}

function sentenceView(stage) {
  const lab = sentenceLabs[state.sentIndex];
  const selected = state.sentAnswers[lab.id];
  return `
    <section class="stage-card">
      ${header(stage)}
      <div class="step-strip">${sentenceLabs.map((entry, index) => `<button type="button" class="step-pill ${index === state.sentIndex ? "is-active" : ""} ${state.sentAnswers[entry.id] ? "is-done" : ""}" data-sent="${index}">${esc(entry.label)}</button>`).join("")}</div>
      <div class="overview-grid">
        <article class="overview-item"><strong>상황</strong><p>${esc(lab.context)}</p></article>
        <article class="overview-item"><strong>원문</strong><p>${esc(lab.flawed)}</p></article>
        <article class="overview-item"><strong>활동 포인트</strong><p>가장 적절한 개정문을 고르세요.</p></article>
      </div>
      <div class="option-list">
        ${lab.options
          .map(([id, text, ok, why]) => `<button type="button" class="option-card ${selected && ok ? "is-correct" : ""} ${selected === id && !ok ? "is-wrong" : ""}" data-pick="${id}"><strong>${esc(text)}</strong><span class="muted">${note(why)}</span></button>`)
          .join("")}
      </div>
      ${
        selected
          ? `<div class="feedback-block"><strong>통합 교정 포인트</strong><div class="analysis-grid">${lab.points.map(([title, body]) => `<article class="analysis-item"><strong>${esc(title)}</strong><p>${note(body)}</p></article>`).join("")}</div></div>`
          : `<div class="empty-state">${note(isTeacher ? "조사, 높임, 어미를 따로 분리하지 않고 무엇이 동시에 고쳐졌는지 말하게 하세요." : "조사, 높임, 어미가 함께 어떻게 바뀌는지 한 번에 찾아보세요.")}</div>`
      }
      <div class="action-row">
        <button type="button" class="action-btn" data-action="next-sent">다음 활동</button>
        <button type="button" class="action-btn" data-action="reset-sent">초기화</button>
      </div>
    </section>
  `;
}

function genreView(stage) {
  const genre = genres.find((item) => item.id === state.genreId) || genres[0];
  return `
    <section class="stage-card">
      ${header(stage)}
      <div class="genre-tabs">${genres.map((item) => `<button type="button" class="genre-tab ${item.id === genre.id ? "is-active" : ""}" data-genre="${item.id}"><strong>${esc(item.title)}</strong><br /><span class="muted">${esc(item.goal)}</span></button>`).join("")}</div>
      <div class="genre-detail">
        <div>
          <div class="feedback-block"><strong>${esc(genre.title)}</strong><p>${note(genre.lead)}</p></div>
          <div class="structured-list">${genre.structure.map(([title, body]) => `<article class="structured-item"><strong>${esc(title)}</strong><p>${note(body)}</p></article>`).join("")}</div>
          <div class="feedback-block"><strong>${isTeacher ? "베트남 학습자 지도 포인트" : "학습 팁"}</strong><p>${note(isTeacher ? genre.caution : genre.studentCaution || genre.caution)}</p></div>
        </div>
        <div class="feedback-stack">
          <div class="text-panel"><strong>연결어</strong><div class="token-list">${genre.connectors.map((item) => `<span class="token token--accent">${esc(item)}</span>`).join("")}</div></div>
          <div class="text-panel"><strong>상투 표현</strong><div class="token-list">${genre.formulas.map((item) => `<span class="token token--gold">${esc(item)}</span>`).join("")}</div></div>
          <div class="text-panel"><strong>피해야 할 구어 표현</strong><div class="token-list">${genre.avoid.map((item) => `<span class="token token--warm">${esc(item)}</span>`).join("")}</div></div>
          <div class="text-panel"><strong>모범 텍스트</strong><pre class="model-text">${esc(genre.model)}</pre></div>
        </div>
      </div>
    </section>
  `;
}

function transformView(stage) {
  const task = currentTransform();
  const report = state.checks[task.id];
  const show = Boolean(state.showModel[task.id]);
  return `
    <section class="stage-card">
      ${header(stage)}
      <div class="transform-picks">${transforms.map((item) => `<button type="button" class="transform-chip ${item.id === task.id ? "is-active" : ""}" data-transform="${item.id}"><strong>${esc(item.title)}</strong><br /><span class="muted">${esc(item.genre)}</span></button>`).join("")}</div>
      <div class="transform-layout">
        <div class="source-card">
          <div class="source-box"><strong>출발 텍스트</strong>${esc(task.source)}</div>
          <div class="overview-item"><strong>반드시 조정할 요소</strong><ul>${task.must.map((item) => `<li>${note(item)}</li>`).join("")}</ul></div>
        </div>
        <div class="text-panel">
          <strong>학습자 초안</strong>
          <textarea data-draft="${task.id}" placeholder="여기에 격식체로 다시 써 보세요.">${esc(state.drafts[task.id] || "")}</textarea>
          <div class="action-row">
            <button type="button" class="action-btn" data-action="check-transform">체크리스트 점검</button>
            <button type="button" class="action-btn" data-action="toggle-model">${show ? "모범 답안 숨기기" : "모범 답안 보기"}</button>
          </div>
          ${report ? transformReport(report) : `<div class="empty-state">체크리스트를 실행하면 장르 구조와 금지 표현 잔존 여부를 확인할 수 있습니다.</div>`}
          ${show ? `<div class="feedback-block"><strong>모범 답안</strong><p>${esc(task.model)}</p></div>` : ""}
        </div>
      </div>
    </section>
  `;
}

function feedbackView(stage) {
  const steps = isTeacher
    ? [
        ["1. 동료 검토", "문체 일관성, 조사 누락, 갑작스러운 요청 여부를 짧게 확인합니다."],
        ["2. 교사 면담", "'왜 말하기처럼 들리는가'를 질문하며 내용 중심 피드백을 줍니다."],
        ["3. 재작성", "무엇을 바꿀지 2~3개의 액션으로 좁혀 다시 쓰게 합니다."],
      ]
    : studentFeedbackSteps;
  return `
    <section class="feedback-card">
      ${header(stage)}
      <div class="loop-strip">
        ${steps
          .map(
            ([title, body]) => `<article class="loop-card"><strong>${esc(title)}</strong><p>${note(body)}</p></article>`
          )
          .join("")}
      </div>
      <div class="feedback-layout">
        <div class="text-panel">
          <strong>${isTeacher ? "진단할 초안" : "자기 점검할 초안"}</strong>
          <textarea data-feedback="true" placeholder="${isTeacher ? "변환 초안을 불러오거나 직접 붙여 넣으세요." : "내 초안을 불러오거나 직접 붙여 넣으세요."}">${esc(state.feedbackText)}</textarea>
          <div class="action-row">
            <button type="button" class="action-btn" data-action="import-feedback">변환 초안 불러오기</button>
            <button type="button" class="action-btn" data-action="run-feedback">${isTeacher ? "5항목 진단" : "자기 진단 실행"}</button>
          </div>
        </div>
        <div>${state.feedback ? feedbackReport(state.feedback) : `<div class="empty-state">${note(isTeacher ? "초안을 불러오거나 직접 입력한 뒤 진단을 실행하세요." : "초안을 불러오거나 직접 입력한 뒤 자기 진단을 실행하세요.")}</div>`}</div>
      </div>
    </section>
  `;
}

function transformReport(report) {
  return `
    <div class="feedback-stack">
      <div class="feedback-block"><strong>변환 완성도 ${report.score}점</strong><div class="meter"><span style="width:${report.score}%"></span></div><p>${note(report.summary)}</p></div>
      <div class="feedback-block"><strong>체크리스트</strong><div class="check-grid">${report.items.map((item) => `<div class="check-item"><div><div class="check-item__label">${esc(item.label)}</div><div class="muted">${note(item.detail)}</div></div><span class="check-item__status ${item.pass ? "is-pass" : "is-fail"}">${item.pass ? "충족" : "보완"}</span></div>`).join("")}</div></div>
      ${report.taboos.length ? `<div class="feedback-block"><strong>남아 있는 구어 표현</strong><p>${esc(report.taboos.join(", "))}</p></div>` : ""}
      <div class="feedback-block"><strong>재작성 액션</strong><ul>${report.actions.map((item) => `<li>${note(item)}</li>`).join("")}</ul></div>
    </div>
  `;
}

function feedbackReport(report) {
  return `
    <div class="feedback-stack">
      <div class="report-grid">${report.rubric.map((item) => `<article class="report-card"><strong>${esc(item.label)} · ${item.score}/5</strong><div class="bar-track"><span class="bar-fill" style="width:${item.score * 20}%"></span></div><p>${note(item.note)}</p></article>`).join("")}</div>
      <div class="feedback-block"><strong>${isTeacher ? "면담 질문" : "자기 점검 질문"}</strong><ul>${report.questions.map((item) => `<li>${note(item)}</li>`).join("")}</ul></div>
      <div class="feedback-block"><strong>재작성 액션</strong><ul>${report.actions.map((item) => `<li>${note(item)}</li>`).join("")}</ul></div>
    </div>
  `;
}

function teacherCard(stage) {
  return `<section class="teacher-card"><h3>교사용 운영 카드</h3><p>${note(stage.summary)}</p><div class="card-list"><article class="overview-item"><strong>교사 발문</strong><ul>${stage.teacher.map((item) => `<li>${note(item)}</li>`).join("")}</ul></article><article class="overview-item"><strong>관찰 포인트</strong><ul>${stage.watch.map((item) => `<li>${note(item)}</li>`).join("")}</ul></article><article class="overview-item"><strong>기대 산출물</strong><p>${note(stage.output)}</p></article></div></section>`;
}

function hintCard(stage) {
  return `<section class="tip-card"><h3>베트남어 학습자 메모</h3><p>${esc(stage.hint)}</p></section>`;
}

function rubricCard() {
  return `<section class="rubric-card"><h3>${isTeacher ? "5항목 빠른 체크" : "학생용 자기 점검"}</h3><ul><li>문체 적절성: 독자와 매체에 맞는 톤인가</li><li>장르 구조: 이메일, 발표문, 설명문 틀이 보이는가</li><li>조사·어미·높임 정확성: 생략과 혼합이 줄었는가</li><li>어휘·상투 표현 적절성: 금지 표현이 사라졌는가</li><li>재작성의 질: 원문보다 구조와 배경 설명이 확장되었는가</li></ul></section>`;
}

function header(stage) {
  return `<div class="section-header"><span class="section-label">${stage.no}</span><h2>${esc(stage.title)}</h2><p>${note(stage.summary)}</p></div>`;
}

function currentTransform() {
  return transforms.find((item) => item.id === state.transformId) || transforms[0];
}

function checkTransform(text, task) {
  const draft = clean(text);
  if (!draft) {
    return {
      score: 0,
      items: task.checks.map(([label]) => ({ label, pass: false, detail: "먼저 초안을 작성해 보세요." })),
      taboos: [],
      summary: "먼저 초안을 작성해 보세요. 짧아도 괜찮습니다.",
      actions: ["출발 텍스트의 목적을 먼저 말해 보세요.", "배경 설명 한 문장을 먼저 추가해 보세요."],
    };
  }
  const items = task.checks.map(([label, a, b]) => {
    const pass = b ? a.test(draft) && b.test(draft) : a.test(draft);
    return { label, pass, detail: pass ? "핵심 요소가 보입니다." : "이 요소를 더 분명히 넣어 보세요." };
  });
  const taboos = task.taboo.filter((pattern) => pattern.test(draft)).map((pattern) => pattern.source.replace(/[\\|().?]/g, ""));
  const score = clamp(items.filter((item) => item.pass).length * 22 + Math.min(12, count(draft, /(습니다|ㅂ니다|드립니다|합니다|하겠습니다)/g) * 3) - taboos.length * 8, 0, 100);
  const actions = items.filter((item) => !item.pass).map((item) => item.detail);
  if (taboos.length) actions.push("남아 있는 구어 표현을 상투 표현으로 바꾸세요.");
  if (actions.length < 3) actions.push("조사 생략이 없는지 명사 뒤를 천천히 읽어 보세요.");
  return {
    score,
    items,
    taboos,
    summary: score >= 80 ? "장르 전환이 안정적입니다." : score >= 55 ? "핵심 뼈대는 보입니다." : "원문을 더 과감하게 재배치해 보세요.",
    actions: actions.slice(0, 3),
  };
}

function analyze(text, task) {
  const draft = clean(text);
  if (!draft) return null;
  const sentenceCount = draft.split(/[\n.!?]+/).map((item) => item.trim()).filter(Boolean).length || 1;
  const formal = count(draft, /(습니다|ㅂ니다|입니다|드립니다|하겠습니다|생각합니다|필요합니다)/g);
  const colloquial = count(draft, /(할게요|말할게요|볼게요|했어요|해요|줘요|좋겠어요|근데|진짜|완전|빨리|좀)/g);
  const particle = count(draft, /[가-힣]+(은|는|이|가|을|를|에|에서|께|으로|와|과|도)(?=[\s,.!?]|$)/g);
  const connector = count(draft, /(먼저|다음으로|마지막으로|첫째|둘째|또한|따라서|정리하면|한편|이와 같이)/g);
  const honor = count(draft, /(교수님|선생님|안녕하십니까|부탁드립니다|감사하겠습니다|드립니다|주시)/g);
  const structure = task.checks.filter(([_, a, b]) => (b ? a.test(draft) && b.test(draft) : a.test(draft))).length;
  const taboo = task.taboo.filter((pattern) => pattern.test(draft)).length;
  const expansion = draft.length / Math.max(task.source.length, 1);
  const rubric = [
    { label: "문체 적절성", score: clamp(Math.round(2 + formal / 2 - colloquial), 1, 5), note: colloquial ? "구어 표현이 남아 있어 톤이 흔들립니다." : "격식 종결과 톤이 비교적 안정적입니다." },
    { label: "장르 구조", score: clamp(Math.round(1 + structure + connector / 2), 1, 5), note: structure >= 3 ? "장르 구조 신호가 비교적 분명합니다." : "장르를 드러내는 구조 신호가 더 필요합니다." },
    { label: "조사·어미·높임 정확성", score: clamp(Math.round(1 + formal / 2 + honor / 2 + particle / (sentenceCount * 2) - colloquial / 2), 1, 5), note: particle >= sentenceCount * 2 ? "조사와 높임 표현이 비교적 안정적입니다." : "조사 복원과 높임 표현을 다시 점검해 보세요." },
    { label: "어휘·상투 표현 적절성", score: clamp(Math.round(2 + honor / 2 + connector / 2 - taboo), 1, 5), note: taboo ? "장르에 맞지 않는 어휘가 남아 있습니다." : "상투 표현 사용이 비교적 적절합니다." },
    { label: "재작성의 질", score: clamp(Math.round(1 + expansion + structure / 2), 1, 5), note: expansion > 1.3 ? "원문보다 구조와 배경 설명이 확장되었습니다." : "원문을 거의 그대로 옮긴 부분이 많습니다." },
  ];
  const questions = [];
  if (colloquial) questions.push("어떤 표현이 아직 말하기나 SNS 문장처럼 들리나요?");
  if (structure < 3) questions.push("첫 문장과 마지막 문장이 장르의 역할을 보여 주고 있나요?");
  if (particle < sentenceCount * 2) questions.push("조사 하나만 복원해도 뜻이 더 선명해지는 자리는 어디인가요?");
  while (questions.length < 3) questions.push("이 요청이나 주장이 왜 갑작스럽게 들리지 않도록 배경 설명을 더 넣을 수 있을까요?");
  const actions = [];
  if (colloquial) actions.push("구어 표현과 요체를 합쇼체 표현으로 바꾸기");
  if (structure < 3) actions.push("장르 구조를 드러내는 도입 또는 결론 문장 추가하기");
  if (particle < sentenceCount * 2) actions.push("핵심 명사 뒤 조사 복원하기");
  while (actions.length < 3) actions.push("연결어와 상투 표현을 1~2개 더 넣어 문단 흐름 다듬기");
  return { rubric, questions: questions.slice(0, 3), actions: actions.slice(0, 3) };
}

function count(text, pattern) {
  return text.match(pattern)?.length ?? 0;
}

function clean(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function note(text) {
  const ko = esc(text);
  if (!state.showVi) return ko;
  const vi = viMap[text];
  if (!vi) return ko;
  return `${ko}<span class="translation">${esc(vi)}</span>`;
}
