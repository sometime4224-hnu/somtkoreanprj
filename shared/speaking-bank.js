(() => {
    'use strict';

    const STORAGE_KEY = 'korean3b-speaking-bank-v1';
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;

    const QUESTION_BANK = [
        {
            id: 'q1',
            number: 1,
            unit: 10,
            part: 'grammar',
            sourcePage: 1,
            grammar: 'A/V-던',
            title: '쓰던 물건 경험 말하기',
            lead: '다른 사람이 쓰던 물건을 사용한 적이 있는지 자신의 경험으로 짧게 말해 보세요.',
            prompts: [
                '다른 사람이 쓰던 물건을 사용한 적이 있어요?',
                '누가 쓰던 물건인지, 왜 쓰게 되었는지, 지금도 쓰고 있는지 이어서 말하면 더 좋아요.'
            ],
            grammarGuide: '과거에 계속되던 상태나 예전에 반복되던 일을 떠올릴 때 `-던`을 써 보세요.',
            expressions: ['쓰던', '입던', '타던', '읽던', '받아서', '빌려서', '지금까지'],
            frames: [
                '형이 타던 자전거를 받아서 지금까지 잘 타고 있어요.',
                '언니가 읽던 책을 빌려서 저도 읽어 봤어요.'
            ],
            checklist: [
                '누가 쓰던 물건인지 구체적으로 말했다.',
                '왜 쓰게 되었는지 짧게 덧붙였다.',
                '지금 상태나 느낌까지 한 번 더 말했다.'
            ],
            sampleAnswer: '형이 타던 자전거를 받아서 지금까지 잘 타고 있어요. 아직도 상태가 좋아서 만족해요.',
            focus: '사람 + 쓰던 물건 + 쓰게 된 이유 + 지금 상태를 한두 문장으로 묶어 보세요.',
            coachChecks: [
                { label: '`-던` 표현이 들어갔어요.', any: ['쓰던', '입던', '타던', '읽던', '살던'], tip: '`쓰던`, `입던`처럼 과거 상태를 드러내는 말이 보이면 좋아요.' },
                { label: '물건과 사람이 구체적으로 보여요.', any: ['형', '언니', '친구', '동생', '자전거', '옷', '책', '가방'], tip: '누구의 무엇이었는지 말하면 답이 훨씬 자연스러워져요.' },
                { label: '왜 쓰게 됐는지나 지금 상태가 이어져요.', any: ['받아서', '빌려서', '물려받아서', '지금도', '아직도', '지금까지', '계속'], tip: '이유나 지금 상태를 한 번 더 붙이면 점수가 안정적이에요.' }
            ],
            minimumLength: 18
        },
        {
            id: 'q2',
            number: 2,
            unit: 10,
            part: 'grammar',
            sourcePage: 1,
            grammar: 'A/V-잖아요',
            title: '이유를 강조해서 대답하기',
            lead: '선생님의 질문을 듣고 `-잖아요`를 써서 이유를 강조해 보세요.',
            prompts: [
                '한국 드라마를 많이 보는 편이에요? 왜요?',
                '좋아하는 배우나 가수가 있어요? 왜 그 사람을 좋아해요?'
            ],
            grammarGuide: '상대도 어느 정도 알고 있다고 생각하는 이유를 자연스럽게 강조할 때 `-잖아요`를 써 보세요.',
            expressions: ['재미있잖아요', '잘생겼잖아요', '노래를 잘하잖아요', '연기를 잘하잖아요', '그래서'],
            frames: [
                '한국 드라마가 재미있잖아요. 그래서 자주 봐요.',
                '그 배우가 연기를 잘하잖아요. 그래서 좋아해요.'
            ],
            checklist: [
                '`-잖아요`가 분명하게 들어갔다.',
                '좋아하는 이유가 한 번 더 설명되었다.',
                '드라마, 배우, 가수처럼 대상이 분명하다.'
            ],
            sampleAnswer: '한국 드라마가 재미있잖아요. 그래서 시간이 있으면 자주 봐요.',
            focus: '`-잖아요` 뒤에 바로 이유가 느껴지도록 짧고 자신 있게 말해 보세요.',
            coachChecks: [
                { label: '`-잖아요`가 들어갔어요.', any: ['잖아요'], tip: '이 문항은 `-잖아요`가 꼭 들리는 게 중요해요.' },
                { label: '좋아하는 대상이 보여요.', any: ['드라마', '배우', '가수', '노래', '연기'], tip: '무엇을 좋아하는지 먼저 분명히 잡아 주세요.' },
                { label: '이유나 결과가 이어져요.', any: ['그래서', '좋아해요', '자주 봐요', '자주 들어요', '팬이에요'], tip: '`그래서`나 결과 문장을 붙이면 더 매끈해져요.' }
            ],
            minimumLength: 16
        },
        {
            id: 'q3',
            number: 3,
            unit: 10,
            part: 'grammar',
            sourcePage: 1,
            grammar: 'V-(으)ㄹ 생각/계획/예정이다',
            title: '미래 계획 말하기',
            lead: '취직이나 결혼 계획처럼 앞으로의 계획을 자연스럽게 말해 보세요.',
            prompts: [
                '언제쯤 취직할 생각이에요?',
                '언제쯤 결혼할 생각이에요?'
            ],
            grammarGuide: '미래의 계획을 말할 때는 시간 표현과 함께 `생각`, `계획`, `예정`을 묶어 쓰면 안정적입니다.',
            expressions: ['생각이에요', '계획이에요', '예정이에요', '내년쯤', '졸업 후에', '먼저'],
            frames: [
                '졸업 후에 한국 회사에 취직할 생각이에요.',
                '아직은 공부를 더 하고, 나중에 결혼할 계획이에요.'
            ],
            checklist: [
                '언제쯤인지 시간 표현이 있다.',
                '`생각`, `계획`, `예정` 중 하나가 들어갔다.',
                '자신의 우선순위가 한 번 더 드러난다.'
            ],
            sampleAnswer: '졸업 후에 베트남에서 먼저 일해 보고, 몇 년 뒤에 결혼할 생각이에요.',
            focus: '시간 표현을 먼저 말하고, 그다음에 무엇을 할 계획인지 붙이면 안정적입니다.',
            coachChecks: [
                { label: '계획 표현이 보여요.', any: ['생각이에요', '계획이에요', '예정이에요', '생각입니다', '계획입니다'], tip: '`-할 생각이에요`처럼 계획 표현을 꼭 넣어 보세요.' },
                { label: '언제인지 말했어요.', any: ['내년', '졸업', '나중', '몇 년', '올해', '먼저'], tip: '언제쯤인지 말해야 답이 덜 비어 보여요.' },
                { label: '무엇을 할지 구체적이에요.', any: ['취직', '결혼', '일하', '공부하', '준비하'], tip: '행동을 분명하게 말하면 좋습니다.' }
            ],
            minimumLength: 18
        },
        {
            id: 'q4',
            number: 4,
            unit: 10,
            part: 'grammar',
            sourcePage: 1,
            grammar: 'V-(으)려면 멀었다',
            title: '아직 멀었다고 말하기',
            lead: '아직 부족하거나 시간이 더 필요하다는 뜻을 `-(으)려면 멀었어요`로 말해 보세요.',
            prompts: [
                '이제 한국말을 잘하지요?',
                '언제 대학교에 입학해요?'
            ],
            grammarGuide: '아직 목표에 도달하지 못했다고 말할 때 `-(으)려면 멀었어요`를 쓰고, 이유를 한 번 더 덧붙이면 좋습니다.',
            expressions: ['잘하려면 멀었어요', '입학하려면 멀었어요', '아직', '더 열심히', '부족해요'],
            frames: [
                '아직 발음이 어려워서 한국말을 잘하려면 멀었어요.',
                '준비할 게 많아서 대학교에 입학하려면 아직 멀었어요.'
            ],
            checklist: [
                '`-(으)려면 멀었어요`가 분명하게 들린다.',
                '`아직`이나 이유 설명이 함께 있다.',
                '왜 멀었는지 한마디라도 붙였다.'
            ],
            sampleAnswer: '아직 틀리는 표현이 많아서 한국말을 잘하려면 멀었어요.',
            focus: '`아직` + 이유 + `-(으)려면 멀었어요` 순서가 가장 무난합니다.',
            coachChecks: [
                { label: '핵심 표현이 들어갔어요.', any: ['려면 멀었어요', '하려면 멀었어요', '입학하려면 멀었어요', '잘하려면 멀었어요'], tip: '이 문항은 핵심 표현이 꼭 보여야 해요.' },
                { label: '아직 부족하다는 느낌이 있어요.', any: ['아직', '부족', '더', '멀었어요'], tip: '`아직` 같은 말이 들어가면 훨씬 자연스럽습니다.' },
                { label: '이유가 짧게라도 붙었어요.', any: ['발음', '준비할', '공부', '시간', '틀리', '어려워서'], tip: '왜 아직 멀었는지 이유를 한 번 붙여 주세요.' }
            ],
            minimumLength: 18
        },
        {
            id: 'q5',
            number: 5,
            unit: 11,
            part: 'grammar',
            sourcePage: 1,
            grammar: '사동사',
            title: '아픈 아이에게 해 줄 일 말하기',
            lead: '감기에 걸린 아이에게 해 줘야 하는 것과 하면 안 되는 것을 사동사로 말해 보세요.',
            prompts: [
                '감기에 걸린 아이에게 무엇을 해 줘야 해요?',
                '무엇을 하면 안 돼요?'
            ],
            grammarGuide: '먹이다, 재우다, 입히다처럼 다른 사람에게 어떤 행동을 하게 할 때 사동사를 활용해 보세요.',
            expressions: ['먹이다', '재우다', '입히다', '씻기다', '따뜻한 물', '안 돼요'],
            frames: [
                '따뜻한 물을 먹이고 푹 재워야 해요.',
                '찬 음료를 먹이면 안 돼요.'
            ],
            checklist: [
                '사동사 하나 이상이 들어갔다.',
                '해야 하는 것과 하면 안 되는 것을 둘 다 말했다.',
                '아이 상황에 맞는 구체적인 행동을 넣었다.'
            ],
            sampleAnswer: '감기에 걸린 아이에게는 따뜻한 물을 먹이고 푹 재워야 해요. 찬 음료를 먹이면 안 돼요.',
            focus: '좋은 행동 하나, 안 되는 행동 하나를 나눠서 말하면 정리가 잘 됩니다.',
            coachChecks: [
                { label: '사동사가 보여요.', any: ['먹이', '재우', '입히', '씻기'], tip: '`먹이다`, `재우다` 같은 사동사가 꼭 들어가면 좋아요.' },
                { label: '해야 하는 행동이 있어요.', any: ['해야 해요', '해 줘야 해요', '좋아요'], tip: '좋은 행동을 먼저 한 문장으로 말해 보세요.' },
                { label: '하면 안 되는 행동도 들어갔어요.', any: ['안 돼요', '하지 마세요', '먹이면 안', '입히면 안'], tip: '하지 말아야 할 행동도 하나 넣어 주세요.' }
            ],
            minimumLength: 20
        },
        {
            id: 'q6',
            number: 6,
            unit: 11,
            part: 'grammar',
            sourcePage: 1,
            grammar: '사동사-아/어 주다',
            title: '도와준 경험 말하기',
            lead: '동생, 조카, 친구를 도와준 경험을 `사동사 + 아/어 주다`로 말해 보세요.',
            prompts: [
                '다른 사람을 도와준 경험에 대해 이야기해 보세요.',
                '누구를 어떻게 도와줬는지 구체적으로 말해 보세요.'
            ],
            grammarGuide: '도와주는 느낌이 드러나게 `먹여 줬어요`, `재워 줬어요`, `읽어 줬어요`처럼 말해 보세요.',
            expressions: ['먹여 줬어요', '재워 줬어요', '입혀 줬어요', '읽어 줬어요', '도와줬어요'],
            frames: [
                '엄마가 바쁘실 때 제가 동생에게 밥을 먹여 줬어요.',
                '조카가 잠이 안 와서 제가 책을 읽어 주고 재워 줬어요.'
            ],
            checklist: [
                '누구를 도와줬는지 나왔다.',
                '사동사와 `-아/어 주다`가 함께 쓰였다.',
                '언제 왜 도와줬는지도 조금 보인다.'
            ],
            sampleAnswer: '엄마가 바쁘실 때 제가 동생에게 밥을 먹여 줬어요. 그래서 동생이 편하게 밥을 먹을 수 있었어요.',
            focus: '도움을 준 대상 + 해 준 행동 + 상황을 한 번에 묶어 보세요.',
            coachChecks: [
                { label: '도와준 표현이 들어갔어요.', any: ['먹여 줬', '재워 줬', '입혀 줬', '읽어 줬', '도와줬'], tip: '`-아/어 줬어요`가 보이면 문형이 살아납니다.' },
                { label: '누구를 도왔는지 보여요.', any: ['동생', '조카', '아기', '친구', '가족', '친척'], tip: '대상을 먼저 넣으면 문장이 훨씬 쉬워져요.' },
                { label: '상황 설명이 함께 있어요.', any: ['바쁘실 때', '아파서', '졸려서', '잠이 안 와서', '못 해서'], tip: '왜 도와줬는지 한마디 붙이면 더 자연스러워요.' }
            ],
            minimumLength: 20
        },
        {
            id: 'q7',
            number: 7,
            unit: 11,
            part: 'grammar',
            sourcePage: 1,
            grammar: 'A/V-(ㄴ/는)다면',
            title: '가정해서 말하기',
            lead: '만약에 그런 일이 생긴다면 어떻게 할지 상상해서 말해 보세요.',
            prompts: [
                '만약에 내일 지구가 없어진다면 뭘 하고 싶어요?',
                '만약에 다시 태어난다면 무엇을 하고 싶어요?'
            ],
            grammarGuide: '가정 표현 `-(ㄴ/는)다면` 뒤에 자신이 하고 싶은 행동을 붙여 보세요.',
            expressions: ['만약에', '없어진다면', '다시 태어난다면', '하고 싶어요', '해 보고 싶어요'],
            frames: [
                '만약에 내일 지구가 없어진다면 가족과 함께 시간을 보내고 싶어요.',
                '남자로 다시 태어난다면 세계 여행을 해 보고 싶어요.'
            ],
            checklist: [
                '`만약에 ...다면` 구조가 있다.',
                '자신이 하고 싶은 행동이 분명하다.',
                '누구와, 어디서 같은 정보가 있으면 더 좋다.'
            ],
            sampleAnswer: '만약에 내일 지구가 없어진다면 가족과 맛있는 음식을 먹으면서 같이 시간을 보내고 싶어요.',
            focus: '가정 상황을 먼저 말하고, 그다음에 하고 싶은 행동을 붙여 보세요.',
            coachChecks: [
                { label: '가정 표현이 들어갔어요.', any: ['만약에', '다면', '태어난다면', '없어진다면'], tip: '`만약에`와 `-다면`을 함께 들리게 해 보세요.' },
                { label: '하고 싶은 행동이 보여요.', any: ['하고 싶어요', '해 보고 싶어요', '가고 싶어요', '보고 싶어요'], tip: '가정 뒤에는 꼭 원하는 행동을 붙여 주세요.' },
                { label: '상황이 조금 더 구체적이에요.', any: ['가족', '친구', '여행', '시간', '같이'], tip: '누구와 무엇을 할지 덧붙이면 답이 풍부해져요.' }
            ],
            minimumLength: 18
        },
        {
            id: 'q8',
            number: 8,
            unit: 11,
            part: 'grammar',
            sourcePage: 2,
            grammar: '무엇이든(지), 무슨 N(이)든(지)',
            title: '약속을 정하며 폭넓게 대답하기',
            lead: '요일, 장소, 활동을 정하면서 “무엇이든지/무슨 N이든지”를 써 보세요.',
            prompts: [
                '무슨 요일에 만날까요?',
                '어디에서 만나고, 만나서 뭘 할까요?'
            ],
            grammarGuide: '선택의 폭이 넓다는 뜻을 살리고 싶을 때 `무슨 요일이든지`, `무엇이든지`를 써 보세요.',
            expressions: ['무슨 요일이든지', '어디든지', '무엇이든지', '괜찮아요', '좋아요'],
            frames: [
                '무슨 요일이든지 저는 괜찮아요.',
                '어디든지 좋아요. 만나서 무엇이든지 재미있는 걸 해요.'
            ],
            checklist: [
                '요일이나 장소에 대해 폭넓게 대답했다.',
                '`무엇이든지`나 `무슨 N이든지`가 들어갔다.',
                '만나서 할 일까지 말하면 더 좋다.'
            ],
            sampleAnswer: '무슨 요일이든지 저는 괜찮아요. 어디든지 좋아요. 만나서 맛있는 걸 먹고 이야기해요.',
            focus: '요일, 장소, 활동 중 적어도 두 가지를 이어서 말하면 답이 안정적입니다.',
            coachChecks: [
                { label: '폭넓은 선택 표현이 있어요.', any: ['무슨 요일이든지', '무엇이든지', '어디든지', '아무 때나'], tip: '`무슨 요일이든지`처럼 선택이 열려 있다는 말이 들어가야 해요.' },
                { label: '약속 요소가 보여요.', any: ['요일', '토요일', '일요일', '카페', '학교', '만나서'], tip: '언제 어디서 만날지라도 하나는 구체적으로 보여 주세요.' },
                { label: '활동이나 반응이 이어져요.', any: ['먹어요', '이야기해요', '영화', '공부해요', '괜찮아요', '좋아요'], tip: '무엇을 할지도 붙이면 훨씬 자연스러워요.' }
            ],
            minimumLength: 20
        },
        {
            id: 'q9',
            number: 9,
            unit: 12,
            part: 'grammar',
            sourcePage: 2,
            grammar: 'A/V-았/었더니, A-아/어졌어요',
            title: '변화의 이유 말하기',
            lead: '건강이나 한국어 실력이 좋아지거나 나빠진 이유를 변화 중심으로 말해 보세요.',
            prompts: [
                '건강이 좋아진 이유나 나빠진 이유를 말해 보세요.',
                '한국어 실력이 좋아진 이유나 나빠진 이유를 말해 보세요.'
            ],
            grammarGuide: '앞에서 한 행동이나 상황을 `-았/었더니`로 말하고, 뒤에서는 `좋아졌어요/나빠졌어요`처럼 변화를 말하면 좋습니다.',
            expressions: ['운동했더니', '연습했더니', '잠을 못 자서', '좋아졌어요', '나빠졌어요'],
            frames: [
                '매일 운동했더니 건강이 좋아졌어요.',
                '요즘 연습을 많이 안 했더니 한국어 실력이 조금 나빠졌어요.'
            ],
            checklist: [
                '원인이나 앞선 행동이 나온다.',
                '좋아졌어요/나빠졌어요 같은 변화 표현이 있다.',
                '건강 또는 한국어 실력 중 무엇이 변했는지 분명하다.'
            ],
            sampleAnswer: '매일 운동했더니 건강이 좋아졌어요. 그래서 요즘은 몸이 훨씬 가벼워요.',
            focus: '무엇을 했더니 어떻게 변했는지 앞뒤 구조를 분명히 해 보세요.',
            coachChecks: [
                { label: '`-았/었더니` 구조가 보여요.', any: ['했더니', '먹었더니', '연습했더니', '운동했더니'], tip: '앞부분에 원인 행동을 `-더니`로 붙여 보세요.' },
                { label: '변화 표현이 있어요.', any: ['좋아졌어요', '나빠졌어요', '늘었어요', '줄었어요'], tip: '뒤에는 변화가 분명하게 나와야 해요.' },
                { label: '무엇이 변했는지 보여요.', any: ['건강', '실력', '한국어', '몸', '발음'], tip: '건강인지 한국어 실력인지 대상을 꼭 넣어 주세요.' }
            ],
            minimumLength: 20
        },
        {
            id: 'q10',
            number: 10,
            unit: 12,
            part: 'grammar',
            sourcePage: 2,
            grammar: '얼마나 A/V-(으)ㄴ지/는지 모르다',
            title: '좋아하는 것을 강하게 말하기',
            lead: '좋아하는 음식이나 자주 하는 운동을 말하면서 얼마나 좋은지 강조해 보세요.',
            prompts: [
                '무슨 음식을 좋아해요?',
                '그게 얼마나 좋은지 더 강조해서 말해 보세요.'
            ],
            grammarGuide: '`얼마나 ...는지 몰라요`를 쓰면 감정이나 정도를 강하게 드러낼 수 있습니다.',
            expressions: ['얼마나 맛있는지 몰라요', '얼마나 재미있는지 몰라요', '얼마나 시원한지 몰라요', '정말'],
            frames: [
                '김치찌개를 좋아해요. 얼마나 맛있는지 몰라요.',
                '수영을 자주 해요. 얼마나 시원한지 몰라요.'
            ],
            checklist: [
                '좋아하는 음식이나 운동이 먼저 나온다.',
                '`얼마나 ...는지 몰라요`가 정확히 들어갔다.',
                '맛, 재미, 시원함처럼 느낌이 살아 있다.'
            ],
            sampleAnswer: '저는 김치찌개를 좋아해요. 얼마나 맛있는지 몰라요.',
            focus: '좋아하는 대상 한 개를 먼저 말하고, 뒤에서 `얼마나 ...는지 몰라요`로 감정을 강하게 보여 주세요.',
            coachChecks: [
                { label: '강조 문형이 보여요.', any: ['얼마나', '는지 몰라요', '은지 몰라요'], tip: '`얼마나 ...는지 몰라요`가 그대로 들리면 가장 좋아요.' },
                { label: '좋아하는 대상이 분명해요.', any: ['좋아해요', '음식', '운동', '김치찌개', '수영', '축구'], tip: '무엇이 그렇게 좋은지 먼저 잡아 주세요.' },
                { label: '느낌 표현이 살아 있어요.', any: ['맛있', '재미있', '시원하', '좋은지', '행복한지'], tip: '느낌 형용사를 넣으면 강조가 더 살아나요.' }
            ],
            minimumLength: 18
        },
        {
            id: 'q11',
            number: 11,
            unit: 12,
            part: 'grammar',
            sourcePage: 2,
            grammar: 'A-(으)ㄴ 모양이다 / V-는 모양이다 / N인 모양이다',
            title: '보고 추측하기',
            lead: '그림을 보고 근거를 말한 뒤 “모양이에요”로 추측해 보세요.',
            prompts: [
                '그림을 보고 어떤 상황인지 추측해서 말해 보세요.',
                '“걸 보니”나 “표정을 보니” 같은 근거를 함께 말하면 더 좋아요.'
            ],
            grammarGuide: '보이는 근거를 먼저 말하고 `... 모양이에요`로 추측을 덧붙이면 자연스럽습니다.',
            expressions: ['모양이에요', '걸 보니', '표정을 보니', '많은 모양이에요', '피곤한 모양이에요'],
            frames: [
                '서류가 많은 걸 보니 할 일이 많은 모양이에요.',
                '표정이 어두운 걸 보니 많이 피곤한 모양이에요.'
            ],
            checklist: [
                '근거가 먼저 나온다.',
                '`모양이에요`로 추측이 마무리된다.',
                '형용사나 명사로 상황을 구체화했다.'
            ],
            sampleAnswer: '표정이 어두운 걸 보니 많이 피곤한 모양이에요.',
            focus: '보이는 사실 하나를 먼저 말하고, 그다음에 추측을 말하는 구조를 지키면 됩니다.',
            coachChecks: [
                { label: '`모양이에요`가 들어갔어요.', any: ['모양이에요', '모양입니다'], tip: '이 문항은 추측 표현이 꼭 들려야 해요.' },
                { label: '근거가 보여요.', any: ['걸 보니', '보니', '표정을 보니', '서류가 많', '옷을 보니'], tip: '무엇을 보고 추측했는지 먼저 말해 주세요.' },
                { label: '추측 내용이 구체적이에요.', any: ['피곤한', '바쁜', '많은', '학생인', '아픈'], tip: '어떤 상태인지 형용사나 명사로 붙여 주세요.' }
            ],
            minimumLength: 18
        },
        {
            id: 'q12',
            number: 12,
            unit: 12,
            part: 'grammar',
            sourcePage: 2,
            grammar: 'A/V-아/어야, N이어야/여야',
            title: '방법과 조건 말하기',
            lead: '면접을 잘 보는 방법이나 건강하게 사는 방법을 `-아/어야 해요`로 말해 보세요.',
            prompts: [
                '어떻게 해야 면접을 잘 볼 수 있어요?',
                '어떻게 해야 건강하게 살 수 있어요?'
            ],
            grammarGuide: '꼭 해야 하는 방법이나 조건을 말할 때 `-아/어야 해요`, `-여야 해요`를 써 보세요.',
            expressions: ['말해야 해요', '준비해야 해요', '운동해야 해요', '규칙적이어야 해요', '자신 있게'],
            frames: [
                '면접을 잘 보려면 자신 있게 말해야 해요.',
                '건강하게 살려면 규칙적으로 운동해야 해요.'
            ],
            checklist: [
                '`-아/어야 해요` 또는 `-여야 해요`가 들어갔다.',
                '방법이 구체적이다.',
                '면접 또는 건강 중 어떤 주제인지 분명하다.'
            ],
            sampleAnswer: '면접을 잘 보려면 미리 준비해야 하고 자신 있게 말해야 해요.',
            focus: '질문 주제를 먼저 잡고, 꼭 해야 하는 행동을 두 개 정도 말해 보세요.',
            coachChecks: [
                { label: '필수 표현이 들어갔어요.', any: ['해야 해요', '여야 해요', '해야 하고'], tip: '`-해야 해요`가 이 문항의 핵심입니다.' },
                { label: '방법이 구체적이에요.', any: ['자신 있게', '미리 준비', '운동', '잠', '식사', '연습'], tip: '어떻게 해야 하는지 행동을 구체적으로 넣어 주세요.' },
                { label: '질문 주제가 보입니다.', any: ['면접', '건강', '살려면'], tip: '면접인지 건강인지 주제어를 넣으면 답이 선명해져요.' }
            ],
            minimumLength: 18
        },
        {
            id: 'q13',
            number: 13,
            unit: 13,
            part: 'grammar',
            sourcePage: 3,
            grammar: 'A/V-(으)ㄹ까 봐',
            title: '걱정되는 일 말하기',
            lead: '친구, 공부, 생활에 대해 걱정되는 일을 `-(으)ㄹ까 봐`로 말해 보세요.',
            prompts: [
                '친구, 공부, 생활 중 하나를 골라 걱정되는 일을 말해 보세요.',
                '무엇이 걱정되는지 분명하게 말하면 됩니다.'
            ],
            grammarGuide: '앞으로 일어날까 걱정되는 일을 말할 때 `-(으)ㄹ까 봐 걱정이에요`를 쓰면 자연스럽습니다.',
            expressions: ['-ㄹ까 봐 걱정이에요', '나빠질까 봐', '떨어질까 봐', '늦을까 봐', '미리'],
            frames: [
                '시험을 잘 못 볼까 봐 걱정이에요.',
                '아버지가 일을 많이 하셔서 건강이 나빠지실까 봐 걱정이에요.'
            ],
            checklist: [
                '`-(으)ㄹ까 봐`가 정확하게 들어갔다.',
                '무엇이 걱정되는지 대상이 분명하다.',
                '필요하면 이유나 대비 행동을 덧붙인다.'
            ],
            sampleAnswer: '요즘 시험이 많아서 성적이 떨어질까 봐 걱정이에요.',
            focus: '걱정의 대상과 걱정되는 결과를 붙여서 말하면 안정적입니다.',
            coachChecks: [
                { label: '걱정 문형이 들어갔어요.', any: ['까 봐 걱정', '걱정이에요', '걱정입니다'], tip: '`-(으)ㄹ까 봐 걱정이에요`가 꼭 보여야 합니다.' },
                { label: '걱정 대상이 보여요.', any: ['친구', '공부', '생활', '건강', '시험', '성적'], tip: '무엇이 걱정되는지 구체적으로 넣어 주세요.' },
                { label: '걱정되는 결과가 있어요.', any: ['나빠지', '떨어지', '늦', '아프', '못 볼'], tip: '어떤 일이 일어날까 걱정되는지 뒤를 채워 주세요.' }
            ],
            minimumLength: 18
        },
        {
            id: 'q14',
            number: 14,
            unit: 13,
            part: 'grammar',
            sourcePage: 3,
            grammar: 'V-고 있다',
            title: '입고 있는 옷 설명하기',
            lead: '그림을 보고 친구들이 입고 있는 옷을 `-고 있다`로 묘사해 보세요.',
            prompts: [
                '친구들이 어떤 옷을 입고 있어요?',
                '색깔, 모자, 신발처럼 보이는 것을 두세 개 말해 보세요.'
            ],
            grammarGuide: '지금 진행 중인 상태나 착용 상태를 말할 때 `입고 있어요`, `쓰고 있어요`, `신고 있어요`를 활용해 보세요.',
            expressions: ['입고 있어요', '쓰고 있어요', '신고 있어요', '파란', '검은', '한 친구는'],
            frames: [
                '한 친구는 파란 셔츠를 입고 있어요.',
                '다른 친구는 모자를 쓰고 운동화를 신고 있어요.'
            ],
            checklist: [
                '`입고 있어요`, `쓰고 있어요`, `신고 있어요` 같은 표현이 들어갔다.',
                '색깔이나 옷 종류가 나온다.',
                '사람이 둘 이상이면 비교해서 말하면 더 좋다.'
            ],
            sampleAnswer: '한 친구는 하얀 셔츠를 입고 있고 다른 친구는 검은 모자를 쓰고 있어요.',
            focus: '보이는 옷 종류를 먼저 말하고, 색깔이나 비교 표현을 추가해 보세요.',
            coachChecks: [
                { label: '착용 상태 표현이 있어요.', any: ['입고 있어요', '쓰고 있어요', '신고 있어요', '입고 있고'], tip: '`-고 있다`가 들리는 게 중요합니다.' },
                { label: '옷 정보가 구체적이에요.', any: ['셔츠', '바지', '치마', '모자', '운동화', '재킷'], tip: '옷 이름을 하나 이상 꼭 넣어 주세요.' },
                { label: '색깔이나 비교가 들어갔어요.', any: ['파란', '검은', '하얀', '다른 친구', '한 친구'], tip: '색깔이나 사람 구분을 넣으면 답이 더 풍부해져요.' }
            ],
            minimumLength: 18
        },
        {
            id: 'q15',
            number: 15,
            unit: 13,
            part: 'grammar',
            sourcePage: 3,
            grammar: 'A/V-았/었어야 했는데',
            title: '후회되는 일 말하기',
            lead: '어렸을 때, 고등학교 때, 작년 중 하나를 골라 후회되는 일을 말해 보세요.',
            prompts: [
                '하지 못해서 후회되는 일이 있어요?',
                '언제 그랬는지와 지금 어떤 마음인지까지 말해 보세요.'
            ],
            grammarGuide: '지나간 일을 아쉬워할 때는 `-았/었어야 했는데` 뒤에 후회나 아쉬움을 덧붙이면 좋습니다.',
            expressions: ['공부했어야 했는데', '준비했어야 했는데', '미리', '아쉬워요', '후회돼요'],
            frames: [
                '작년에 한국어를 더 열심히 공부했어야 했는데 시간이 없었어요.',
                '고등학교 때 운동을 더 했어야 했는데 지금 조금 후회돼요.'
            ],
            checklist: [
                '`-았/었어야 했는데`가 정확하게 들어간다.',
                '언제의 일인지 시간 정보가 있다.',
                '아쉬움이나 후회 감정이 한 번 더 보인다.'
            ],
            sampleAnswer: '작년에 한국어를 더 열심히 공부했어야 했는데 다른 일만 해서 지금 아쉬워요.',
            focus: '언제 + 무엇을 했어야 했는지 + 지금 느낌 순서로 말하면 좋습니다.',
            coachChecks: [
                { label: '후회 문형이 들어갔어요.', any: ['했어야 했는데', '갔어야 했는데', '공부했어야 했는데'], tip: '`-았/었어야 했는데`가 이 문항의 핵심입니다.' },
                { label: '언제의 일인지 보여요.', any: ['어렸을 때', '고등학교 때', '작년', '예전에'], tip: '시간 표현을 넣으면 답이 더 또렷해져요.' },
                { label: '아쉬운 마음이 보입니다.', any: ['아쉬워요', '후회돼요', '후회해요'], tip: '지금 마음을 덧붙이면 마무리가 좋아집니다.' }
            ],
            minimumLength: 20
        },
        {
            id: 'q16',
            number: 16,
            unit: 10,
            part: 'free',
            sourcePage: 3,
            grammar: '자유 말하기',
            title: '좋은 배우자의 조건 말하기',
            lead: '자신이 생각하는 좋은 배우자의 조건을 자유롭게 말해 보세요.',
            prompts: [
                '여러분이 생각하는 배우자의 조건은 무엇입니까?',
                '두 가지 이상 조건을 말하고, 왜 중요한지도 짧게 설명해 보세요.'
            ],
            grammarGuide: '자유 문항이지만 `제 생각에는`, `서로`, `왜냐하면` 같은 표현을 쓰면 구조가 안정됩니다.',
            expressions: ['제 생각에는', '서로 존중해 주는', '대화가 잘 통하는', '성실한', '책임감이 있는', '왜냐하면'],
            frames: [
                '제 생각에는 서로 존중해 주는 사람이 좋은 배우자예요.',
                '대화가 잘 통하고 책임감이 있는 사람이 좋다고 생각해요.'
            ],
            checklist: [
                '조건을 두 개 이상 말했다.',
                '왜 중요한지 이유를 한마디 붙였다.',
                '자기 생각이라는 표현이 있으면 좋다.'
            ],
            sampleAnswer: '제 생각에는 서로 존중해 주고 대화가 잘 통하는 사람이 좋은 배우자예요. 왜냐하면 오래 같이 살려면 성격보다 서로 이해하는 태도가 더 중요하다고 생각해요.',
            focus: '조건 2개 이상 + 이유 1개 구조로 준비하면 자유 말하기에서도 흔들리지 않습니다.',
            coachChecks: [
                { label: '자기 생각을 먼저 말했어요.', any: ['제 생각에는', '저는', '생각해요', '생각합니다'], tip: '자유 문항은 의견 표시로 시작하면 훨씬 편해요.' },
                { label: '조건이 두 가지 이상 보여요.', any: ['존중', '대화', '성실', '책임감', '이해', '배려'], tip: '좋은 조건을 두 개 이상 넣어 보세요.' },
                { label: '이유가 이어져요.', any: ['왜냐하면', '그래서', '중요하다고', '필요하다고'], tip: '왜 그런 조건이 중요한지도 붙이면 더 설득력 있어요.' }
            ],
            minimumLength: 34
        },
        {
            id: 'q17',
            number: 17,
            unit: 10,
            part: 'free',
            sourcePage: 3,
            grammar: '자유 말하기',
            title: '연애결혼과 중매결혼 비교하기',
            lead: '연애결혼과 중매결혼의 좋은 점과 나쁜 점을 비교해서 말해 보세요.',
            prompts: [
                '연애결혼의 좋은 점과 나쁜 점은 무엇입니까?',
                '중매결혼의 좋은 점과 나쁜 점은 무엇입니까?'
            ],
            grammarGuide: '비교 문항에서는 `좋은 점은`, `나쁜 점은`, `하지만`, `반면에` 같은 연결 표현을 쓰면 말이 정리됩니다.',
            expressions: ['좋은 점은', '나쁜 점은', '장점은', '단점은', '하지만', '반면에', '서로 잘 알 수 있어서'],
            frames: [
                '연애결혼의 좋은 점은 서로를 잘 알고 결혼할 수 있다는 거예요.',
                '중매결혼은 조건을 객관적으로 볼 수 있다는 장점이 있지만 상대를 잘 모를 수 있다는 단점도 있어요.'
            ],
            checklist: [
                '좋은 점과 나쁜 점을 둘 다 말했다.',
                '연애결혼과 중매결혼 중 적어도 하나는 비교했다.',
                '`하지만`, `반면에` 같은 연결 표현이 있으면 더 좋다.'
            ],
            sampleAnswer: '연애결혼의 좋은 점은 서로를 잘 알고 결혼할 수 있다는 거예요. 하지만 감정적으로 급하게 결정할 수도 있다는 단점이 있어요. 반면에 중매결혼은 조건을 객관적으로 볼 수 있다는 장점이 있지만 상대를 잘 모를 수 있다는 점은 아쉬워요.',
            focus: '장점과 단점을 나눠 말하고, `하지만`이나 `반면에`로 비교를 정리해 보세요.',
            coachChecks: [
                { label: '비교 대상이 보입니다.', any: ['연애결혼', '중매결혼'], tip: '두 결혼 방식 중 무엇을 말하는지 꼭 넣어 주세요.' },
                { label: '장점과 단점을 나눴어요.', any: ['좋은 점', '나쁜 점', '장점', '단점'], tip: '`좋은 점`, `단점` 같은 말이 있으면 구조가 분명해져요.' },
                { label: '비교 연결이 있어요.', any: ['하지만', '반면에', '그렇지만'], tip: '두 내용을 비교하는 연결어를 넣으면 자유 말하기가 훨씬 정돈돼요.' }
            ],
            minimumLength: 42
        }
    ];

    const TYPE_FILTERS = [
        { id: 'all', label: '전체' },
        { id: 'grammar', label: '문법형 15문항' },
        { id: 'free', label: '자유 말하기 2문항' }
    ];

    const UNIT_FILTERS = [
        { id: 'all', label: '전체 과' },
        { id: '10', label: '10과' },
        { id: '11', label: '11과' },
        { id: '12', label: '12과' },
        { id: '13', label: '13과' }
    ];

    const SIMPLE_TEXT = {
        pageIntro: {
            ko: {
                title: '도움',
                tag: '핵심만',
                body: [
                    '문항을 고르고 질문, 문법, 예시를 팝업으로 확인해요.',
                    '내 답을 저장하고, 음성 인식문을 가져와 고쳐요.',
                    '필요한 것만 남겨서 휴대폰에서 바로 연습할 수 있어요.'
                ]
            },
            vi: {
                title: 'Trợ giúp',
                tag: 'Chỉ phần cần',
                body: [
                    'Chọn câu hỏi rồi xem câu hỏi, ngữ pháp và ví dụ bằng cửa sổ bật lên.',
                    'Lưu câu trả lời của bạn, rồi lấy câu nhận dạng giọng nói để sửa.',
                    'Trang đã được giản lược để luyện ngay trên điện thoại.'
                ]
            }
        },
        pageStructure: {
            ko: {
                title: '시험 구조',
                tag: '17문항',
                body: [
                    '문법 문항 15개가 있어요.',
                    '자유 말하기 2개가 있어요.',
                    '보통 1~2문장만 준비해도 괜찮아요.'
                ]
            },
            vi: {
                title: 'Cấu trúc bài thi',
                tag: '17 câu',
                body: [
                    'Có 15 câu ngữ pháp.',
                    'Có 2 câu nói tự do.',
                    'Thường chỉ cần chuẩn bị 1-2 câu.'
                ]
            }
        },
        pageUse: {
            ko: {
                title: '사용 방법',
                tag: '3단계',
                body: [
                    '1. 문항을 고르고 짧게 써요.',
                    '2. 말하기로 연습해요.',
                    '3. 고친 문장을 저장해요.'
                ]
            },
            vi: {
                title: 'Cách dùng',
                tag: '3 bước',
                body: [
                    '1. Chọn câu hỏi và viết ngắn.',
                    '2. Luyện bằng nút nói.',
                    '3. Lưu câu đã sửa.'
                ]
            }
        },
        draftHelp: {
            ko: {
                title: '초안 도움',
                tag: '짧게 시작',
                body: [
                    '한 문장만 먼저 써도 돼요.',
                    '완벽하지 않아도 괜찮아요.',
                    '나중에 최종 답안에서 고치면 돼요.'
                ]
            },
            vi: {
                title: 'Giúp viết nháp',
                tag: 'Bắt đầu ngắn',
                body: [
                    'Viết trước chỉ 1 câu cũng được.',
                    'Không cần hoàn hảo.',
                    'Sau đó sửa ở bản cuối là được.'
                ]
            }
        },
        revisionHelp: {
            ko: {
                title: '고치기 도움',
                tag: '더 바르게',
                body: [
                    '인식문을 그대로 두지 마세요.',
                    '조사, 시제, 어미를 고쳐 보세요.',
                    '내가 실제로 말할 문장으로 바꾸세요.'
                ]
            },
            vi: {
                title: 'Giúp sửa câu',
                tag: 'Đúng hơn',
                body: [
                    'Đừng để nguyên câu nhận dạng.',
                    'Hãy sửa trợ từ, thì và đuôi câu.',
                    'Đổi thành câu bạn thật sự sẽ nói.'
                ]
            }
        },
        speechHelp: {
            ko: {
                title: '말하기 도움',
                tag: '실전처럼',
                body: [
                    '버튼을 누르고 천천히 말해요.',
                    '1~2문장만 말해도 충분해요.',
                    '끝나면 인식문을 꼭 확인해요.'
                ]
            },
            vi: {
                title: 'Giúp luyện nói',
                tag: 'Như khi thi',
                body: [
                    'Nhấn nút rồi nói chậm.',
                    'Chỉ cần nói 1-2 câu.',
                    'Nói xong nhớ kiểm tra câu nhận dạng.'
                ]
            }
        }
    };

    const refs = {
        savedCount: document.getElementById('savedCount'),
        savedCountNote: document.getElementById('savedCountNote'),
        completedCount: document.getElementById('completedCount'),
        speechCount: document.getElementById('speechCount'),
        speechSupportNote: document.getElementById('speechSupportNote'),
        typeFilters: document.getElementById('typeFilters'),
        unitFilters: document.getElementById('unitFilters'),
        filterCaption: document.getElementById('filterCaption'),
        questionList: document.getElementById('questionList'),
        questionTitle: document.getElementById('questionTitle'),
        questionMeta: document.getElementById('questionMeta'),
        questionLead: document.getElementById('questionLead'),
        promptList: document.getElementById('promptList'),
        grammarGuide: document.getElementById('grammarGuide'),
        expressionChips: document.getElementById('expressionChips'),
        frameList: document.getElementById('frameList'),
        checkList: document.getElementById('checkList'),
        sampleAnswerText: document.getElementById('sampleAnswerText'),
        focusText: document.getElementById('focusText'),
        draftInput: document.getElementById('draftInput'),
        revisedInput: document.getElementById('revisedInput'),
        noteInput: document.getElementById('noteInput'),
        draftSavedAt: document.getElementById('draftSavedAt'),
        revisedSavedAt: document.getElementById('revisedSavedAt'),
        noteSavedAt: document.getElementById('noteSavedAt'),
        speechStatusBadge: document.getElementById('speechStatusBadge'),
        speechTimer: document.getElementById('speechTimer'),
        transcriptBox: document.getElementById('transcriptBox'),
        transcriptMeta: document.getElementById('transcriptMeta'),
        attemptList: document.getElementById('attemptList'),
        coachScore: document.getElementById('coachScore'),
        coachList: document.getElementById('coachList'),
        compareTranscript: document.getElementById('compareTranscript'),
        compareRevised: document.getElementById('compareRevised'),
        toast: document.getElementById('toast'),
        randomQuestionBtn: document.getElementById('randomQuestionBtn'),
        exportAnswersBtn: document.getElementById('exportAnswersBtn'),
        clearCurrentBtn: document.getElementById('clearCurrentBtn'),
        langKoBtn: document.getElementById('langKoBtn'),
        langViBtn: document.getElementById('langViBtn'),
        pageIntroBtn: document.getElementById('pageIntroBtn'),
        pageStructureBtn: document.getElementById('pageStructureBtn'),
        pageUseBtn: document.getElementById('pageUseBtn'),
        questionOverviewBtn: document.getElementById('questionOverviewBtn'),
        questionPromptBtn: document.getElementById('questionPromptBtn'),
        questionGrammarBtn: document.getElementById('questionGrammarBtn'),
        questionChecklistBtn: document.getElementById('questionChecklistBtn'),
        questionSampleBtn: document.getElementById('questionSampleBtn'),
        saveDraftBtn: document.getElementById('saveDraftBtn'),
        loadSampleBtn: document.getElementById('loadSampleBtn'),
        speakPromptBtn: document.getElementById('speakPromptBtn'),
        draftHelpBtn: document.getElementById('draftHelpBtn'),
        saveRevisedBtn: document.getElementById('saveRevisedBtn'),
        useTranscriptBtn: document.getElementById('useTranscriptBtn'),
        speakRevisedBtn: document.getElementById('speakRevisedBtn'),
        toggleDoneBtn: document.getElementById('toggleDoneBtn'),
        revisionHelpBtn: document.getElementById('revisionHelpBtn'),
        startSpeechBtn: document.getElementById('startSpeechBtn'),
        stopSpeechBtn: document.getElementById('stopSpeechBtn'),
        saveTranscriptBtn: document.getElementById('saveTranscriptBtn'),
        clearTranscriptBtn: document.getElementById('clearTranscriptBtn'),
        speechHelpBtn: document.getElementById('speechHelpBtn'),
        saveNoteBtn: document.getElementById('saveNoteBtn'),
        coachHelpBtn: document.getElementById('coachHelpBtn'),
        popupModal: document.getElementById('popupModal'),
        popupBackdrop: document.getElementById('popupBackdrop'),
        popupCloseBtn: document.getElementById('popupCloseBtn'),
        popupTitle: document.getElementById('popupTitle'),
        popupBody: document.getElementById('popupBody')
    };

    const state = {
        store: loadStore(),
        activeField: 'revised',
        explanationLang: 'ko',
        coachFeedback: [],
        currentPopupKind: '',
        speech: {
            recognition: null,
            isListening: false,
            finalText: '',
            interimText: '',
            timerId: 0,
            startedAt: 0,
            questionId: ''
        },
        toastTimer: 0
    };

    bootstrap();

    function bootstrap() {
        state.explanationLang = state.store.explanationLang || 'ko';
        state.store.explanationLang = state.explanationLang;
        hydrateSelectionFromHash();
        ensureSelectedQuestionVisible();
        bindEvents();
        renderAll();
        window.addEventListener('hashchange', hydrateSelectionFromHash);
        window.addEventListener('beforeunload', persistStore);
        if (window.speechSynthesis) {
            window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
        }
    }

    function bindEvents() {
        refs.typeFilters.addEventListener('click', handleFilterClick);
        refs.unitFilters.addEventListener('click', handleFilterClick);
        refs.questionList.addEventListener('click', handleQuestionClick);
        refs.expressionChips.addEventListener('click', handleExpressionInsert);
        refs.frameList.addEventListener('click', handleFrameInsert);
        refs.attemptList.addEventListener('click', handleAttemptAction);
        refs.langKoBtn.addEventListener('click', () => setExplanationLanguage('ko'));
        refs.langViBtn.addEventListener('click', () => setExplanationLanguage('vi'));
        refs.pageIntroBtn.addEventListener('click', () => openPopup('pageIntro'));
        refs.pageStructureBtn.addEventListener('click', () => openPopup('pageStructure'));
        refs.pageUseBtn.addEventListener('click', () => openPopup('pageUse'));
        refs.questionOverviewBtn.addEventListener('click', () => openPopup('questionOverview'));
        refs.questionPromptBtn.addEventListener('click', () => openPopup('questionPrompt'));
        refs.questionGrammarBtn.addEventListener('click', () => openPopup('questionGrammar'));
        refs.questionChecklistBtn.addEventListener('click', () => openPopup('questionChecklist'));
        refs.questionSampleBtn.addEventListener('click', () => openPopup('questionSample'));
        refs.draftHelpBtn.addEventListener('click', () => openPopup('draftHelp'));
        refs.revisionHelpBtn.addEventListener('click', () => openPopup('revisionHelp'));
        refs.speechHelpBtn.addEventListener('click', () => openPopup('speechHelp'));
        refs.coachHelpBtn.addEventListener('click', () => openPopup('coachHelp'));
        refs.popupBackdrop.addEventListener('click', closePopup);
        refs.popupCloseBtn.addEventListener('click', closePopup);
        window.addEventListener('keydown', handleGlobalKeydown);

        refs.draftInput.addEventListener('focus', () => {
            state.activeField = 'draft';
        });
        refs.revisedInput.addEventListener('focus', () => {
            state.activeField = 'revised';
        });
        refs.noteInput.addEventListener('focus', () => {
            state.activeField = 'note';
        });

        refs.draftInput.addEventListener('input', () => updateCurrentField('draft', refs.draftInput.value, false));
        refs.revisedInput.addEventListener('input', () => updateCurrentField('revised', refs.revisedInput.value, false));
        refs.noteInput.addEventListener('input', () => updateCurrentField('note', refs.noteInput.value, false));

        refs.saveDraftBtn.addEventListener('click', () => saveFieldWithNotice('draft', refs.draftInput.value, '초안을 저장했어요.'));
        refs.loadSampleBtn.addEventListener('click', loadSampleIntoDraft);
        refs.speakPromptBtn.addEventListener('click', speakPrompt);
        refs.saveRevisedBtn.addEventListener('click', () => saveFieldWithNotice('revised', refs.revisedInput.value, '최종 답안을 저장했어요.'));
        refs.useTranscriptBtn.addEventListener('click', moveTranscriptToRevised);
        refs.speakRevisedBtn.addEventListener('click', speakRevised);
        refs.toggleDoneBtn.addEventListener('click', toggleDone);
        refs.startSpeechBtn.addEventListener('click', startSpeechRecognition);
        refs.stopSpeechBtn.addEventListener('click', stopSpeechRecognition);
        refs.saveTranscriptBtn.addEventListener('click', saveTranscriptManually);
        refs.clearTranscriptBtn.addEventListener('click', clearTranscript);
        refs.saveNoteBtn.addEventListener('click', () => saveFieldWithNotice('note', refs.noteInput.value, '메모를 저장했어요.'));
        refs.randomQuestionBtn.addEventListener('click', pickRandomQuestion);
        refs.exportAnswersBtn.addEventListener('click', exportAnswersAsText);
        refs.clearCurrentBtn.addEventListener('click', clearCurrentQuestion);
    }

    function renderAll() {
        renderLanguageToggle();
        renderDashboard();
        renderFilterControls();
        renderQuestionList();
        renderQuestionDetail();
        renderSpeechState();
    }

    function renderLanguageToggle() {
        refs.langKoBtn.classList.toggle('is-active', state.explanationLang === 'ko');
        refs.langViBtn.classList.toggle('is-active', state.explanationLang === 'vi');
    }

    function renderDashboard() {
        const savedCount = QUESTION_BANK.filter((question) => hasSavedContent(getEntry(question.id))).length;
        const completedCount = QUESTION_BANK.filter((question) => getEntry(question.id).done).length;
        const speechCount = QUESTION_BANK.reduce((sum, question) => sum + getEntry(question.id).attempts.length, 0);

        refs.savedCount.textContent = String(savedCount);
        refs.savedCountNote.textContent = savedCount ? `${savedCount}개 저장` : '아직 없음';
        refs.completedCount.textContent = String(completedCount);
        refs.speechCount.textContent = String(speechCount);
        refs.speechSupportNote.textContent = buildSpeechSupportText();
    }

    function renderFilterControls() {
        refs.typeFilters.innerHTML = TYPE_FILTERS.map((filter) => `
            <button type="button" class="sb-filter-btn${state.store.filterType === filter.id ? ' is-active' : ''}" data-filter-group="type" data-filter-id="${filter.id}">
                ${escapeHtml(filter.label)}
            </button>
        `).join('');

        refs.unitFilters.innerHTML = UNIT_FILTERS.map((filter) => `
            <button type="button" class="sb-filter-btn${state.store.filterUnit === filter.id ? ' is-active' : ''}" data-filter-group="unit" data-filter-id="${filter.id}">
                ${escapeHtml(filter.label)}
            </button>
        `).join('');

        refs.filterCaption.textContent = buildFilterCaption();
    }

    function renderQuestionList() {
        const visibleQuestions = getVisibleQuestions();
        if (!visibleQuestions.length) {
            refs.questionList.innerHTML = '<div class="sb-empty">조건에 맞는 문항이 없습니다.</div>';
            return;
        }

        ensureSelectedQuestionVisible();
        refs.questionList.innerHTML = visibleQuestions.map(renderQuestionButton).join('');
    }

    function renderQuestionButton(question) {
        const entry = getEntry(question.id);
        const metaPills = [
            `<span class="sb-pill sb-pill--unit">${question.unit}과</span>`,
            `<span class="sb-pill sb-pill--part">${question.part === 'grammar' ? '문법형' : '자유 말하기'}</span>`
        ];

        if (hasSavedContent(entry)) {
            metaPills.push('<span class="sb-pill sb-pill--saved">저장</span>');
        }
        if (entry.done) {
            metaPills.push('<span class="sb-pill sb-pill--done">완료</span>');
        }

        return `
            <button type="button" class="sb-question-btn${state.store.selectedId === question.id ? ' is-active' : ''}" data-question-id="${question.id}">
                <span class="sb-question-btn__meta">${metaPills.join('')}</span>
                <span class="sb-question-btn__title">${String(question.number).padStart(2, '0')}. ${escapeHtml(question.grammar)}</span>
                <span class="sb-question-btn__note">${escapeHtml(question.title)}</span>
            </button>
        `;
    }

    function renderQuestionDetail() {
        const question = getSelectedQuestion();
        const entry = getEntry(question.id);

        refs.questionTitle.textContent = `${String(question.number).padStart(2, '0')}. ${question.title}`;
        refs.questionLead.textContent = question.lead;
        refs.questionMeta.innerHTML = [
            renderMetaPill(question.grammar, 'part'),
            renderMetaPill(`${question.unit}과`, 'unit'),
            renderMetaPill(question.part === 'grammar' ? '문법형 문항' : '자유 말하기', 'saved'),
            renderMetaPill(`PDF ${question.sourcePage}쪽`, 'done')
        ].join('');
        refs.promptList.innerHTML = question.prompts.map((prompt) => `<li>${escapeHtml(prompt)}</li>`).join('');
        refs.grammarGuide.innerHTML = highlightInlineCode(question.grammarGuide);
        refs.expressionChips.innerHTML = question.expressions.map((expression) => `
            <button type="button" class="sb-chip-btn" data-insert-type="expression" data-insert-text="${escapeAttr(expression)}">
                ${escapeHtml(expression)}
            </button>
        `).join('');
        refs.frameList.innerHTML = question.frames.map((frame) => `
            <button type="button" class="sb-frame-btn" data-insert-type="frame" data-insert-text="${escapeAttr(frame)}">
                ${escapeHtml(frame)}
            </button>
        `).join('');
        refs.checkList.innerHTML = question.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
        refs.sampleAnswerText.textContent = question.sampleAnswer;
        refs.focusText.textContent = question.focus;

        refs.draftInput.value = entry.draft;
        refs.revisedInput.value = entry.revised;
        refs.noteInput.value = entry.note;
        refs.draftSavedAt.textContent = buildSavedStamp(entry.draftSavedAt);
        refs.revisedSavedAt.textContent = buildSavedStamp(entry.revisedSavedAt);
        refs.noteSavedAt.textContent = buildSavedStamp(entry.noteSavedAt);

        renderTranscriptArea(entry);
        renderAttemptList(entry);
        renderCoach(question, entry);
        renderDoneButton(entry.done);
        updateHash(question.id);
    }

    function renderTranscriptArea(entry) {
        const transcriptText = state.speech.isListening
            ? `${state.speech.finalText}${state.speech.interimText ? ` ${state.speech.interimText}` : ''}`.trim()
            : entry.transcript.trim();

        if (transcriptText) {
            refs.transcriptBox.textContent = transcriptText;
            refs.transcriptBox.classList.remove('is-placeholder');
        } else {
            refs.transcriptBox.textContent = '아직 없음';
            refs.transcriptBox.classList.add('is-placeholder');
        }

        refs.transcriptMeta.textContent = entry.transcriptSavedAt ? `저장: ${formatStamp(entry.transcriptSavedAt)}` : buildSpeechSupportText();
    }

    function renderAttemptList(entry) {
        if (!entry.attempts.length) {
            refs.attemptList.innerHTML = '<li class="sb-empty">아직 기록이 없어요.</li>';
            return;
        }

        refs.attemptList.innerHTML = entry.attempts.map((attempt, index) => `
            <li class="sb-attempt-item">
                <strong>${escapeHtml(attempt.text)}</strong>
                <span class="sb-attempt-meta">${formatStamp(attempt.createdAt)} · 기록 ${entry.attempts.length - index}</span>
                <button type="button" class="sb-btn sb-btn--ghost" data-attempt-index="${index}">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    <span>이 문장 가져오기</span>
                </button>
            </li>
        `).join('');
    }

    function renderCoach(question, entry) {
        const feedback = buildCoachFeedback(question, entry);
        state.coachFeedback = feedback.items;

        refs.coachScore.textContent = feedback.hasAnswer ? `준비 점검 ${feedback.score}점` : '준비 점검 전';
        refs.coachList.innerHTML = feedback.items.map((item) => `
            <li>
                <span class="sb-coach-dot is-${item.kind}">${item.kind === 'good' ? 'O' : item.kind === 'warn' ? '!' : 'i'}</span>
                <div>
                    <strong>${escapeHtml(item.title.ko)}</strong>
                    <div class="sb-helper-note">${escapeHtml(item.body.ko)}</div>
                </div>
            </li>
        `).join('');

        refs.compareTranscript.textContent = entry.transcript || '아직 없음';
        refs.compareRevised.textContent = entry.revised || '아직 없음';
    }

    function renderDoneButton(done) {
        refs.toggleDoneBtn.innerHTML = done
            ? '<i class="fa-solid fa-circle-check"></i><span>준비 완료 해제</span>'
            : '<i class="fa-solid fa-flag-checkered"></i><span>준비 완료 표시</span>';
        refs.toggleDoneBtn.classList.toggle('sb-btn--primary', !done);
        refs.toggleDoneBtn.classList.toggle('sb-btn--secondary', done);
    }

    function renderSpeechState() {
        refs.speechStatusBadge.classList.toggle('is-listening', state.speech.isListening);
        refs.speechStatusBadge.innerHTML = state.speech.isListening
            ? '<i class="fa-solid fa-microphone-lines"></i><span>듣는 중</span>'
            : '<i class="fa-solid fa-wave-square"></i><span>대기 중</span>';
        refs.startSpeechBtn.disabled = state.speech.isListening || !isSpeechRecognitionAvailable();
        refs.stopSpeechBtn.disabled = !state.speech.isListening;
    }

    function setExplanationLanguage(lang) {
        if (!['ko', 'vi'].includes(lang)) {
            return;
        }

        state.explanationLang = lang;
        state.store.explanationLang = lang;
        persistStore();
        renderLanguageToggle();

        if (state.currentPopupKind) {
            renderPopup(state.currentPopupKind);
        }
    }

    function handleGlobalKeydown(event) {
        if (event.key === 'Escape' && state.currentPopupKind) {
            closePopup();
        }
    }

    function openPopup(kind) {
        const payload = buildPopupPayload(kind);
        if (!payload) {
            return;
        }

        state.currentPopupKind = kind;
        renderPopup(kind);
        refs.popupModal.classList.remove('sb-hidden');
        refs.popupModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('sb-modal-open');
        window.setTimeout(() => refs.popupCloseBtn.focus(), 0);
    }

    function renderPopup(kind) {
        const payload = buildPopupPayload(kind);
        if (!payload) {
            return;
        }

        refs.popupTitle.textContent = payload.title;
        refs.popupBody.innerHTML = `${payload.tag ? `<span class="sb-popup__tag">${escapeHtml(payload.tag)}</span>` : ''}${payload.html}`;
    }

    function closePopup() {
        refs.popupModal.classList.add('sb-hidden');
        refs.popupModal.setAttribute('aria-hidden', 'true');
        refs.popupBody.innerHTML = '';
        document.body.classList.remove('sb-modal-open');
        state.currentPopupKind = '';
    }

    function buildPopupPayload(kind) {
        const lang = state.explanationLang;
        const question = getSelectedQuestion();
        const staticCopy = SIMPLE_TEXT[kind]?.[lang] || SIMPLE_TEXT[kind]?.ko;

        if (staticCopy) {
            return {
                title: staticCopy.title,
                tag: staticCopy.tag,
                html: buildListHtml(staticCopy.body)
            };
        }

        if (!question) {
            return null;
        }

        switch (kind) {
            case 'questionOverview':
                return {
                    title: `${String(question.number).padStart(2, '0')}. ${question.title}`,
                    tag: lang === 'ko'
                        ? `${question.unit}과 · ${question.part === 'grammar' ? '문법 문항' : '자유 말하기'}`
                        : `Bài ${question.unit} · ${question.part === 'grammar' ? 'ngữ pháp' : 'nói tự do'}`,
                    html: buildListHtml(buildQuestionOverviewLines(question, lang))
                };
            case 'questionPrompt':
                return {
                    title: lang === 'ko' ? '질문 보기' : 'Câu hỏi gốc',
                    tag: lang === 'ko' ? '원문 그대로' : 'Nguyên văn tiếng Hàn',
                    html: `${buildParagraphHtml([lang === 'ko' ? '질문을 듣고 1~2문장으로 답해요.' : 'Nghe câu hỏi gốc rồi trả lời 1-2 câu.'])}${buildListHtml(question.prompts)}`
                };
            case 'questionGrammar':
                return {
                    title: lang === 'ko' ? '추천 문법' : 'Ngữ pháp gợi ý',
                    tag: question.grammar,
                    html: `${buildParagraphHtml([lang === 'ko' ? '이 문법을 답에 한 번 넣어 보세요.' : 'Hãy dùng mẫu này một lần trong câu trả lời.'])}${buildListHtml(question.expressions.slice(0, 4))}`
                };
            case 'questionChecklist':
                return {
                    title: lang === 'ko' ? '빠른 체크' : 'Kiểm tra nhanh',
                    tag: lang === 'ko' ? '말하기 전 3개' : '3 điều cần nhớ',
                    html: buildListHtml(buildChecklistLines(question, lang))
                };
            case 'questionSample':
                return {
                    title: lang === 'ko' ? '예시 답' : 'Câu mẫu',
                    tag: lang === 'ko' ? '그대로 외우지 말기' : 'Đổi theo bản thân',
                    html: `${buildParagraphHtml([lang === 'ko' ? '예시는 참고만 하고 자기 정보로 바꿔 보세요.' : 'Chỉ tham khảo. Hãy đổi thành thông tin của bạn.'])}<p><strong>${escapeHtml(question.sampleAnswer)}</strong></p>`
                };
            case 'coachHelp': {
                const feedback = buildCoachFeedback(question, getEntry(question.id)).items;
                return {
                    title: lang === 'ko' ? '문장 코치' : 'Góp ý câu',
                    tag: lang === 'ko' ? '현재 답안 기준' : 'Theo câu hiện tại',
                    html: buildCoachPopupHtml(feedback, lang)
                };
            }
            default:
                return null;
        }
    }

    function handleFilterClick(event) {
        const button = event.target.closest('[data-filter-group]');
        if (!button) {
            return;
        }

        flushCurrentInputs();
        if (button.dataset.filterGroup === 'type') {
            state.store.filterType = button.dataset.filterId;
        } else {
            state.store.filterUnit = button.dataset.filterId;
        }

        ensureSelectedQuestionVisible();
        persistStore();
        renderAll();
    }

    function handleQuestionClick(event) {
        const button = event.target.closest('[data-question-id]');
        if (!button) {
            return;
        }

        flushCurrentInputs();
        state.store.selectedId = button.dataset.questionId;
        persistStore();
        stopSpeechRecognition();
        renderAll();
    }

    function handleExpressionInsert(event) {
        const button = event.target.closest('[data-insert-text]');
        if (button) {
            insertIntoActiveField(button.dataset.insertText, false);
        }
    }

    function handleFrameInsert(event) {
        const button = event.target.closest('[data-insert-text]');
        if (button) {
            insertIntoActiveField(button.dataset.insertText, true);
        }
    }

    function handleAttemptAction(event) {
        const button = event.target.closest('[data-attempt-index]');
        if (!button) {
            return;
        }

        const entry = getEntry(getSelectedQuestion().id);
        const attempt = entry.attempts[Number(button.dataset.attemptIndex)];
        if (!attempt) {
            return;
        }

        refs.revisedInput.value = attempt.text;
        updateCurrentField('revised', attempt.text, false);
        refs.revisedInput.focus();
        showToast('선택한 음성 기록을 최종 답안 칸으로 가져왔어요.');
    }

    function updateCurrentField(field, value, notify) {
        const entry = getEntry(getSelectedQuestion().id);
        entry[field] = value;
        touchFieldStamp(entry, field);
        persistStore();
        syncFieldStamp(field, entry);
        renderDashboard();
        renderQuestionList();
        renderCoach(getSelectedQuestion(), entry);
        if (notify) {
            showToast('내용을 저장했어요.');
        }
    }

    function saveFieldWithNotice(field, value, message) {
        updateCurrentField(field, value, false);
        showToast(message);
    }

    function loadSampleIntoDraft() {
        const question = getSelectedQuestion();
        refs.draftInput.value = question.sampleAnswer;
        updateCurrentField('draft', question.sampleAnswer, false);
        refs.draftInput.focus();
        showToast('예시 답안을 초안 칸에 넣었어요. 이제 자기 정보로 바꿔 보세요.');
    }

    function moveTranscriptToRevised() {
        const entry = getEntry(getSelectedQuestion().id);
        if (!entry.transcript) {
            showToast('가져올 음성 인식 문장이 아직 없어요.');
            return;
        }
        refs.revisedInput.value = entry.transcript;
        updateCurrentField('revised', entry.transcript, false);
        refs.revisedInput.focus();
        showToast('인식문을 최종 답안 칸으로 가져왔어요. 이제 더 바른 문장으로 고쳐 보세요.');
    }

    function toggleDone() {
        const entry = getEntry(getSelectedQuestion().id);
        entry.done = !entry.done;
        persistStore();
        renderDashboard();
        renderQuestionList();
        renderDoneButton(entry.done);
        showToast(entry.done ? '이 문항을 준비 완료로 표시했어요.' : '준비 완료 표시를 해제했어요.');
    }

    function speakPrompt() {
        speakText(getSelectedQuestion().prompts.join(' '), 0.94);
    }

    function speakRevised() {
        const value = refs.revisedInput.value.trim() || refs.draftInput.value.trim();
        if (!value) {
            showToast('먼저 초안이나 최종 답안을 적어 주세요.');
            return;
        }
        speakText(value, 0.88);
    }

    function startSpeechRecognition() {
        if (!isSpeechRecognitionAvailable()) {
            showToast(buildSpeechSupportText());
            return;
        }
        if (state.speech.isListening) {
            return;
        }

        const recognition = new SpeechRecognitionClass();
        state.speech.recognition = recognition;
        state.speech.isListening = true;
        state.speech.finalText = '';
        state.speech.interimText = '';
        state.speech.startedAt = Date.now();
        state.speech.questionId = getSelectedQuestion().id;

        recognition.lang = 'ko-KR';
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            let interim = '';
            let finalChunk = state.speech.finalText;
            for (let index = event.resultIndex; index < event.results.length; index += 1) {
                const transcript = event.results[index][0].transcript.trim();
                if (!transcript) {
                    continue;
                }
                if (event.results[index].isFinal) {
                    finalChunk = `${finalChunk} ${transcript}`.trim();
                } else {
                    interim = `${interim} ${transcript}`.trim();
                }
            }
            state.speech.finalText = finalChunk;
            state.speech.interimText = interim;
            renderTranscriptArea(getEntry(getSelectedQuestion().id));
        };

        recognition.onerror = (event) => {
            if (event.error !== 'no-speech') {
                showToast(event.error === 'not-allowed' ? '마이크 권한이 필요해요.' : '음성 인식 중 오류가 있었어요.');
            }
        };

        recognition.onend = () => {
            const combined = `${state.speech.finalText} ${state.speech.interimText}`.trim();
            const speakingQuestionId = state.speech.questionId;
            state.speech.isListening = false;
            stopTimer();
            if (combined) {
                saveTranscript(combined, true, speakingQuestionId);
            }
            state.speech.interimText = '';
            state.speech.questionId = '';
            renderTranscriptArea(getEntry(getSelectedQuestion().id));
            renderSpeechState();
        };

        recognition.start();
        state.speech.timerId = window.setInterval(updateSpeechTimer, 500);
        updateSpeechTimer();
        renderSpeechState();
        showToast('음성 인식을 시작했어요. 실제 시험처럼 또박또박 말해 보세요.');
    }

    function stopSpeechRecognition() {
        if (!state.speech.recognition) {
            state.speech.isListening = false;
            stopTimer();
            renderSpeechState();
            return;
        }
        try {
            state.speech.recognition.stop();
        } catch (error) {
            console.error(error);
        }
    }

    function updateSpeechTimer() {
        refs.speechTimer.textContent = formatDuration(Date.now() - state.speech.startedAt);
    }

    function stopTimer() {
        if (state.speech.timerId) {
            window.clearInterval(state.speech.timerId);
            state.speech.timerId = 0;
        }
        refs.speechTimer.textContent = '00:00';
    }

    function saveTranscriptManually() {
        const combined = refs.transcriptBox.classList.contains('is-placeholder') ? '' : refs.transcriptBox.textContent.trim();
        if (!combined) {
            showToast('저장할 인식문이 없어요.');
            return;
        }
        saveTranscript(combined, false);
    }

    function saveTranscript(text, fromRecognition, questionId = getSelectedQuestion().id) {
        const entry = getEntry(questionId);
        entry.transcript = text;
        entry.transcriptSavedAt = new Date().toISOString();
        entry.attempts.unshift({ text, createdAt: entry.transcriptSavedAt });
        entry.attempts = dedupeAttempts(entry.attempts).slice(0, 5);
        persistStore();
        renderDashboard();
        renderQuestionDetail();
        showToast(fromRecognition ? '음성 인식 문장을 자동 저장했어요.' : '인식문을 저장했어요.');
    }

    function clearTranscript() {
        if (state.speech.isListening) {
            state.speech.finalText = '';
            state.speech.interimText = '';
            state.speech.questionId = '';
            stopSpeechRecognition();
        }
        const entry = getEntry(getSelectedQuestion().id);
        if (!entry.transcript && !entry.attempts.length) {
            showToast('지울 인식문이 없어요.');
            return;
        }
        entry.transcript = '';
        entry.transcriptSavedAt = '';
        entry.attempts = [];
        persistStore();
        renderDashboard();
        renderQuestionDetail();
        showToast('현재 문항의 음성 기록을 지웠어요.');
    }

    function pickRandomQuestion() {
        flushCurrentInputs();
        const visibleQuestions = getVisibleQuestions();
        if (!visibleQuestions.length) {
            return;
        }
        const candidates = visibleQuestions.filter((question) => question.id !== state.store.selectedId);
        const next = (candidates.length ? candidates : visibleQuestions)[Math.floor(Math.random() * (candidates.length ? candidates : visibleQuestions).length)];
        state.store.selectedId = next.id;
        persistStore();
        stopSpeechRecognition();
        renderAll();
    }

    function exportAnswersAsText() {
        flushCurrentInputs();
        const filledQuestions = QUESTION_BANK.filter((question) => hasSavedContent(getEntry(question.id)) || getEntry(question.id).done);
        if (!filledQuestions.length) {
            showToast('내보낼 답안이 아직 없어요.');
            return;
        }

        const content = filledQuestions.map((question) => {
            const entry = getEntry(question.id);
            return [
                `${String(question.number).padStart(2, '0')}. ${question.title} (${question.grammar})`,
                `질문: ${question.prompts.join(' / ')}`,
                `초안: ${entry.draft || '-'}`,
                `최종 답안: ${entry.revised || '-'}`,
                `음성 인식: ${entry.transcript || '-'}`,
                `메모: ${entry.note || '-'}`,
                `준비 완료: ${entry.done ? '예' : '아니오'}`
            ].join('\n');
        }).join('\n\n------------------------------\n\n');

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `3B-speaking-answers-${fileStamp()}.txt`;
        anchor.click();
        URL.revokeObjectURL(url);
        showToast('저장한 답안을 TXT 파일로 내보냈어요.');
    }

    function clearCurrentQuestion() {
        const question = getSelectedQuestion();
        if (!window.confirm(`"${question.title}" 문항에 저장된 내용을 지울까요?`)) {
            return;
        }
        if (state.speech.isListening && state.speech.questionId === question.id) {
            state.speech.finalText = '';
            state.speech.interimText = '';
            state.speech.questionId = '';
        }
        state.store.answers[question.id] = createEmptyEntry();
        persistStore();
        stopSpeechRecognition();
        renderAll();
        showToast('현재 문항의 저장 내용을 지웠어요.');
    }

    function flushCurrentInputs() {
        const question = getSelectedQuestion();
        if (!question) {
            return;
        }
        const entry = getEntry(question.id);
        entry.draft = refs.draftInput.value;
        entry.revised = refs.revisedInput.value;
        entry.note = refs.noteInput.value;
        if (entry.draft) {
            touchFieldStamp(entry, 'draft');
        }
        if (entry.revised) {
            touchFieldStamp(entry, 'revised');
        }
        if (entry.note) {
            touchFieldStamp(entry, 'note');
        }
        persistStore();
    }

    function insertIntoActiveField(text, asNewLine) {
        const target = state.activeField === 'draft'
            ? refs.draftInput
            : state.activeField === 'note'
                ? refs.noteInput
                : refs.revisedInput;

        const start = target.selectionStart ?? target.value.length;
        const end = target.selectionEnd ?? target.value.length;
        const prefix = target.value.slice(0, start);
        const suffix = target.value.slice(end);
        const separator = asNewLine && prefix.trim() ? '\n' : (prefix && !prefix.endsWith(' ') && !prefix.endsWith('\n') ? ' ' : '');
        const insertText = `${separator}${text}`;

        target.value = `${prefix}${insertText}${suffix}`;
        const nextPosition = prefix.length + insertText.length;
        target.setSelectionRange(nextPosition, nextPosition);
        target.focus();

        const field = target === refs.draftInput ? 'draft' : target === refs.noteInput ? 'note' : 'revised';
        updateCurrentField(field, target.value, false);
    }

    function ensureSelectedQuestionVisible() {
        const visibleQuestions = getVisibleQuestions();
        if (!visibleQuestions.length) {
            state.store.selectedId = QUESTION_BANK[0]?.id || '';
            return;
        }
        if (!visibleQuestions.some((question) => question.id === state.store.selectedId)) {
            state.store.selectedId = visibleQuestions[0].id;
        }
    }

    function getVisibleQuestions() {
        return QUESTION_BANK.filter((question) => {
            const typeMatch = state.store.filterType === 'all' || question.part === state.store.filterType;
            const unitMatch = state.store.filterUnit === 'all' || String(question.unit) === state.store.filterUnit;
            return typeMatch && unitMatch;
        });
    }

    function getSelectedQuestion() {
        return QUESTION_BANK.find((question) => question.id === state.store.selectedId) || QUESTION_BANK[0];
    }

    function getEntry(questionId) {
        if (!state.store.answers[questionId]) {
            state.store.answers[questionId] = createEmptyEntry();
        }
        return state.store.answers[questionId];
    }

    function createEmptyEntry() {
        return {
            draft: '',
            revised: '',
            transcript: '',
            note: '',
            done: false,
            draftSavedAt: '',
            revisedSavedAt: '',
            transcriptSavedAt: '',
            noteSavedAt: '',
            attempts: []
        };
    }

    function loadStore() {
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return {
                    filterType: 'all',
                    filterUnit: 'all',
                    selectedId: 'q1',
                    explanationLang: 'ko',
                    answers: {}
                };
            }
            const parsed = JSON.parse(raw);
            return {
                filterType: parsed.filterType || 'all',
                filterUnit: parsed.filterUnit || 'all',
                selectedId: parsed.selectedId || 'q1',
                explanationLang: parsed.explanationLang === 'vi' ? 'vi' : 'ko',
                answers: parsed.answers || {}
            };
        } catch (error) {
            console.error(error);
            return {
                filterType: 'all',
                filterUnit: 'all',
                selectedId: 'q1',
                explanationLang: 'ko',
                answers: {}
            };
        }
    }

    function persistStore() {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.store));
        } catch (error) {
            console.error(error);
        }
    }

    function touchFieldStamp(entry, field) {
        const now = new Date().toISOString();
        if (field === 'draft') {
            entry.draftSavedAt = now;
        } else if (field === 'revised') {
            entry.revisedSavedAt = now;
        } else if (field === 'note') {
            entry.noteSavedAt = now;
        }
    }

    function syncFieldStamp(field, entry) {
        if (field === 'draft') {
            refs.draftSavedAt.textContent = buildSavedStamp(entry.draftSavedAt);
        } else if (field === 'revised') {
            refs.revisedSavedAt.textContent = buildSavedStamp(entry.revisedSavedAt);
        } else if (field === 'note') {
            refs.noteSavedAt.textContent = buildSavedStamp(entry.noteSavedAt);
        }
    }

    function hasSavedContent(entry) {
        return Boolean(entry.draft || entry.revised || entry.transcript || entry.note || entry.attempts.length);
    }

    function buildSavedStamp(value) {
        return value ? `저장: ${formatStamp(value)}` : '저장 기록 없음';
    }

    function buildSpeechSupportText() {
        if (!window.isSecureContext && !['localhost', '127.0.0.1'].includes(window.location.hostname)) {
            return 'HTTPS에서 더 잘 돼요.';
        }
        if (!SpeechRecognitionClass) {
            return 'Chrome/Edge 권장';
        }
        return '사용 가능';
    }

    function buildQuestionOverviewLines(question, lang) {
        if (lang === 'vi') {
            return [
                `Đây là câu về mẫu ${question.grammar}.`,
                question.part === 'grammar' ? 'Hãy dùng ngữ pháp này 1 lần.' : 'Hãy nói ý của bạn và thêm lý do.',
                'Chỉ cần nói 1-2 câu ngắn về bản thân.'
            ];
        }

        return [
            `${question.grammar} 문항이에요.`,
            question.part === 'grammar' ? '추천 문법을 한 번 넣어 보세요.' : '생각과 이유를 함께 말해 보세요.',
            '내 이야기로 1~2문장만 말해도 괜찮아요.'
        ];
    }

    function buildChecklistLines(question, lang) {
        if (question.part === 'free') {
            return lang === 'vi'
                ? ['Nói 2 ý chính.', 'Thêm 1 lý do.', 'Dùng từ nối đơn giản.']
                : ['생각 두 가지 말하기', '이유 한 가지 붙이기', '쉬운 연결어 넣기'];
        }

        return lang === 'vi'
            ? ['Dùng ngữ pháp 1 lần.', 'Thêm chuyện của bạn.', 'Nói 1-2 câu ngắn.']
            : ['문법 한 번 넣기', '내 이야기 넣기', '1~2문장으로 말하기'];
    }

    function buildCoachFeedback(question, entry) {
        const evaluationText = entry.revised.trim() || entry.draft.trim();
        const normalizedTranscript = normalizeText(entry.transcript);
        const normalizedRevised = normalizeText(entry.revised);
        const grammarCheck = question.coachChecks[0];
        const detailChecks = question.coachChecks.slice(1);
        const grammarPass = Boolean(grammarCheck && grammarCheck.any.some((keyword) => evaluationText.includes(keyword)));
        const detailPass = detailChecks.some((check) => check.any.some((keyword) => evaluationText.includes(keyword)));
        const items = [];

        if (!evaluationText) {
            items.push(createCoachItem(
                'info',
                '먼저 한 문장 써 보세요.',
                '완벽하지 않아도 괜찮아요.',
                'Hãy viết 1 câu trước.',
                'Không cần hoàn hảo.'
            ));
        } else {
            items.push(grammarPass
                ? createCoachItem(
                    'good',
                    '추천 문법이 보여요.',
                    '목표 문법이 답 안에 들어갔어요.',
                    'Ngữ pháp mục tiêu đã có.',
                    'Bạn đã dùng đúng mẫu cần thiết.'
                )
                : createCoachItem(
                    'warn',
                    '추천 문법을 넣어 보세요.',
                    '이 문항의 핵심 문법을 한 번 써 보세요.',
                    'Hãy thêm ngữ pháp mục tiêu.',
                    'Nên dùng mẫu này ít nhất 1 lần.'
                ));

            items.push(detailPass
                ? createCoachItem(
                    'good',
                    '내 이야기와 이유가 보여요.',
                    '대상이나 이유가 들어가서 좋아요.',
                    'Nội dung cá nhân đã rõ.',
                    'Bạn đã thêm người, lý do hoặc tình huống.'
                )
                : createCoachItem(
                    'warn',
                    '내 이야기 한 가지를 더 넣어 보세요.',
                    '사람, 이유, 느낌 중 하나를 더 붙여 보세요.',
                    'Hãy thêm 1 ý của riêng bạn.',
                    'Thêm người, lý do hoặc cảm nhận.'
                ));

            items.push(evaluationText.length >= question.minimumLength
                ? createCoachItem(
                    'good',
                    '답 길이가 괜찮아요.',
                    '지금 길이면 말하기 연습하기 좋아요.',
                    'Độ dài ổn rồi.',
                    'Độ dài này phù hợp để luyện nói.'
                )
                : createCoachItem(
                    'warn',
                    '답을 조금만 더 길게 해 보세요.',
                    '이유나 예시를 한 번 더 붙이면 좋아요.',
                    'Hãy nói dài hơn một chút.',
                    'Thêm 1 lý do hoặc 1 ví dụ nữa.'
                ));
        }

        if (entry.transcript && !entry.revised) {
            items.push(createCoachItem(
                'warn',
                '인식문을 고쳐서 저장해 보세요.',
                '조사, 시제, 어미를 고친 뒤 최종 답안에 넣어 보세요.',
                'Hãy sửa câu nhận dạng rồi lưu.',
                'Sửa trợ từ, thì và đuôi câu rồi lưu vào bản cuối.'
            ));
        } else if (entry.transcript && entry.revised) {
            const similarity = computeSimilarity(normalizedTranscript, normalizedRevised);
            items.push(similarity >= 96
                ? createCoachItem(
                    'warn',
                    '고친 문장이 아직 비슷해요.',
                    '한 군데만 더 자연스럽게 바꿔 보세요.',
                    'Câu sửa vẫn còn rất giống.',
                    'Hãy sửa thêm 1 chỗ cho tự nhiên hơn.'
                )
                : createCoachItem(
                    'good',
                    '인식문을 잘 다듬었어요.',
                    '말한 문장을 더 바른 문장으로 고쳤어요.',
                    'Bạn đã sửa câu khá tốt.',
                    'Bạn đã chỉnh câu nói thành câu đúng hơn.'
                ));
        } else {
            items.push(createCoachItem(
                'info',
                '말하기 연습도 해 보세요.',
                '음성 인식 버튼을 눌러 실제처럼 말해 보세요.',
                'Hãy luyện nói nữa.',
                'Nhấn nút ghi âm để nói như khi thi.'
            ));
        }

        const scorableCount = items.filter((item) => item.kind !== 'info').length;
        const goodCount = items.filter((item) => item.kind === 'good').length;

        return {
            items,
            score: evaluationText ? Math.round((goodCount / Math.max(scorableCount, 1)) * 100) : 0,
            hasAnswer: Boolean(evaluationText)
        };
    }

    function createCoachItem(kind, koTitle, koBody, viTitle, viBody) {
        return {
            kind,
            title: {
                ko: koTitle,
                vi: viTitle
            },
            body: {
                ko: koBody,
                vi: viBody
            }
        };
    }

    function buildCoachPopupHtml(items, lang) {
        const intro = lang === 'ko' ? '아래만 보면 바로 고칠 수 있어요.' : 'Chỉ cần xem các ý dưới đây là được.';
        return `${buildParagraphHtml([intro])}${buildRichListHtml(items.map((item) => ({
            title: item.title[lang] || item.title.ko,
            body: item.body[lang] || item.body.ko
        })))}`
    }

    function buildParagraphHtml(lines) {
        return lines.map((line) => `<p>${escapeHtml(line)}</p>`).join('');
    }

    function buildListHtml(items) {
        return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
    }

    function buildRichListHtml(items) {
        return `<ul>${items.map((item) => `<li><strong>${escapeHtml(item.title)}</strong><br>${escapeHtml(item.body)}</li>`).join('')}</ul>`;
    }

    function buildFilterCaption() {
        const visibleQuestions = getVisibleQuestions();
        const typeLabel = TYPE_FILTERS.find((filter) => filter.id === state.store.filterType)?.label || '전체';
        const unitLabel = UNIT_FILTERS.find((filter) => filter.id === state.store.filterUnit)?.label || '전체 과';
        return `${unitLabel} · ${typeLabel} · ${visibleQuestions.length}문항`;
    }

    function renderMetaPill(label, kind) {
        const className = kind === 'unit'
            ? 'sb-pill sb-pill--unit'
            : kind === 'done'
                ? 'sb-pill sb-pill--done'
                : kind === 'saved'
                    ? 'sb-pill sb-pill--saved'
                    : 'sb-pill sb-pill--part';
        return `<span class="${className}">${escapeHtml(label)}</span>`;
    }

    function computeSimilarity(a, b) {
        if (!a || !b) {
            return 0;
        }
        const common = longestCommonSubsequence(a, b);
        return Math.round((common / Math.max(a.length, b.length)) * 100);
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

    function formatStamp(value) {
        return new Intl.DateTimeFormat('ko-KR', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(value));
    }

    function formatDuration(ms) {
        const totalSeconds = Math.max(0, Math.floor(ms / 1000));
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    function isSpeechRecognitionAvailable() {
        return Boolean(SpeechRecognitionClass && (window.isSecureContext || ['localhost', '127.0.0.1'].includes(window.location.hostname)));
    }

    function speakText(text, rate) {
        if (!window.speechSynthesis) {
            showToast('이 브라우저는 읽어 주기 기능을 지원하지 않아요.');
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        utterance.rate = rate;
        const koreanVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang && voice.lang.toLowerCase().startsWith('ko'));
        if (koreanVoice) {
            utterance.voice = koreanVoice;
        }
        window.speechSynthesis.speak(utterance);
    }

    function dedupeAttempts(attempts) {
        const seen = new Set();
        return attempts.filter((attempt) => {
            const key = normalizeText(attempt.text);
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    function normalizeText(value) {
        return String(value || '').replace(/[\s.,!?~"'`()[\]{}:;/\\-]/g, '').trim();
    }

    function hydrateSelectionFromHash() {
        const id = String(window.location.hash || '').replace(/^#/, '');
        if (id && QUESTION_BANK.some((question) => question.id === id)) {
            state.store.selectedId = id;
            ensureSelectedQuestionVisible();
            renderAll();
        }
    }

    function updateHash(id) {
        if (window.location.hash.replace(/^#/, '') !== id) {
            history.replaceState(null, '', `#${id}`);
        }
    }

    function fileStamp() {
        const now = new Date();
        return [
            now.getFullYear(),
            String(now.getMonth() + 1).padStart(2, '0'),
            String(now.getDate()).padStart(2, '0'),
            String(now.getHours()).padStart(2, '0'),
            String(now.getMinutes()).padStart(2, '0')
        ].join('');
    }

    function highlightInlineCode(text) {
        return escapeHtml(text).replace(/`([^`]+)`/g, '<code>$1</code>');
    }

    function showToast(message) {
        refs.toast.textContent = message;
        refs.toast.classList.add('is-visible');
        if (state.toastTimer) {
            window.clearTimeout(state.toastTimer);
        }
        state.toastTimer = window.setTimeout(() => {
            refs.toast.classList.remove('is-visible');
        }, 2400);
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
