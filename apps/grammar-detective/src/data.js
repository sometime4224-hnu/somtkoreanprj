window.classroomTeams = [
    { id: "team-1", label: "1팀" },
    { id: "team-2", label: "2팀" },
    { id: "team-3", label: "3팀" },
    { id: "team-4", label: "4팀" }
];

window.grammarDetectiveStages = [
    {
        id: "gd-c13-s1",
        label: "1-1",
        chapter: "c13",
        kind: "match",
        title: "분수대 앞 이름 맞히기",
        subtitle: "평화로운 장면에서 지금 보이는 행동을 읽고 인물을 찾습니다.",
        grammarFocus: ["-고 있다"],
        objective: "NPC의 설명을 읽고 현재 행동과 이름을 연결한다.",
        teacherTip: "행동, 장소, 소지품 순서로 짚어 주면 학생들이 빠르게 이름을 고를 수 있습니다.",
        background: {
            label: "점심시간 중앙 정원",
            description: "분수대와 벤치가 있는 학교 정원. 학생들이 쉬고 있는 밝은 오후 장면.",
            asset: "",
            assetBrief: "wide school garden with a fountain, benches, and a warm afternoon mood, clean educational illustration, no text"
        },
        props: [
            {
                id: "fountain",
                label: "분수대",
                description: "중앙 원형 분수대",
                x: 63,
                y: 30,
                asset: "",
                assetBrief: "simple stone fountain prop for a school garden, isolated transparent asset, no text"
            },
            {
                id: "bench",
                label: "벤치",
                description: "나무 벤치",
                x: 28,
                y: 70,
                asset: "",
                assetBrief: "wooden park bench prop, school garden style, isolated transparent asset, no text"
            },
            {
                id: "flower-bed",
                label: "화단",
                description: "꽃이 심어진 작은 화단",
                x: 78,
                y: 72,
                asset: "",
                assetBrief: "small flower bed prop with spring flowers, isolated transparent asset, no text"
            }
        ],
        cast: [
            {
                characterId: "yuri",
                name: "유리",
                role: "사진을 찍고 있는 학생",
                appearance: "초록 가디건, 노란 카메라 끈",
                location: "분수대 앞",
                action: "사진을 찍고 있다",
                x: 67,
                y: 42,
                asset: "",
                assetBrief: "Korean teen student, green cardigan, yellow camera strap, taking photos, full body cutout, clean illustration, transparent background"
            },
            {
                characterId: "minho",
                name: "민호",
                role: "책을 읽고 있는 학생",
                appearance: "빨간 모자, 회색 후드",
                location: "벤치 옆",
                action: "책을 읽고 있다",
                x: 26,
                y: 53,
                asset: "",
                assetBrief: "Korean teen boy, red cap, gray hoodie, reading a book, full body cutout, clean illustration, transparent background"
            },
            {
                characterId: "daeun",
                name: "다은",
                role: "새를 보고 있는 학생",
                appearance: "줄무늬 셔츠, 보라색 공책",
                location: "산책로 끝",
                action: "비둘기를 보고 있다",
                x: 82,
                y: 54,
                asset: "",
                assetBrief: "Korean teen girl, striped shirt, holding a purple notebook, watching pigeons, full body cutout, clean illustration, transparent background"
            }
        ],
        prompts: [
            {
                speaker: "안내 데스크",
                text: "분수대 앞에서 사진을 찍고 있는 사람이 유리예요.",
                focus: "-고 있다",
                answerCharacterId: "yuri",
                note: "현재 행동과 장소가 함께 보입니다."
            },
            {
                speaker: "정원 안내원",
                text: "빨간 모자를 쓰고 벤치 옆에서 책을 읽고 있는 사람은 민호예요.",
                focus: "-고 있다",
                answerCharacterId: "minho",
                note: "옷차림과 행동을 한 문장에서 함께 읽습니다."
            },
            {
                speaker: "급식실 선생님",
                text: "산책로 끝에서 비둘기를 보고 있는 학생이 다은이에요.",
                focus: "-고 있다",
                answerCharacterId: "daeun",
                note: "학생들이 이름보다 행동을 먼저 찾게 유도합니다."
            }
        ],
        candidateIds: ["yuri", "minho", "daeun"]
    },
    {
        id: "gd-c10-s2",
        label: "1-2",
        chapter: "c10",
        kind: "match",
        title: "조금 전 복도에서 누구였을까",
        subtitle: "아까 보였던 행동을 기억하며 -던 문장을 읽고 인물을 맞힙니다.",
        grammarFocus: ["-던"],
        objective: "과거에 하던 행동 단서를 읽고 인물 이름을 연결한다.",
        teacherTip: "아까, 조금 전, 막 같은 시간을 먼저 짚은 뒤 행동 표현을 읽으면 -던의 느낌이 잘 살아납니다.",
        background: {
            label: "수업 전 교실 복도",
            description: "사물함과 자판기가 보이는 교실 앞 복도. 쉬는 시간 막바지 장면.",
            asset: "",
            assetBrief: "wide school hallway before class, lockers and a vending machine, bright indoor educational illustration, no text"
        },
        props: [
            {
                id: "locker",
                label: "사물함",
                description: "복도 한쪽 사물함",
                x: 20,
                y: 38,
                asset: "",
                assetBrief: "school locker prop, isolated transparent asset, no text"
            },
            {
                id: "vending-machine",
                label: "자판기",
                description: "음료 자판기",
                x: 76,
                y: 38,
                asset: "",
                assetBrief: "school vending machine prop, isolated transparent asset, no text"
            },
            {
                id: "stair-sign",
                label: "계단 안내판",
                description: "계단 방향 안내판",
                x: 55,
                y: 72,
                asset: "",
                assetBrief: "hallway direction sign prop, isolated transparent asset, no text"
            }
        ],
        cast: [
            {
                characterId: "yuri",
                name: "유리",
                role: "음료를 고르던 학생",
                appearance: "초록 가디건, 노란 카메라 끈",
                location: "자판기 앞",
                action: "음료를 고르던 중이었다",
                x: 75,
                y: 49,
                asset: "",
                assetBrief: "Korean teen student, green cardigan, yellow camera strap, choosing a drink, full body cutout, clean illustration, transparent background"
            },
            {
                characterId: "minho",
                name: "민호",
                role: "전화하던 학생",
                appearance: "빨간 모자, 회색 후드",
                location: "복도 중앙",
                action: "전화하던 중이었다",
                x: 48,
                y: 47,
                asset: "",
                assetBrief: "Korean teen boy, red cap, gray hoodie, talking on the phone, full body cutout, clean illustration, transparent background"
            },
            {
                characterId: "jiu",
                name: "지우",
                role: "공책을 찾던 학생",
                appearance: "파란 에코백, 흰 운동화",
                location: "계단 옆",
                action: "공책을 찾던 중이었다",
                x: 58,
                y: 64,
                asset: "",
                assetBrief: "Korean teen student, blue tote bag, white sneakers, searching for a notebook, full body cutout, clean illustration, transparent background"
            },
            {
                characterId: "daeun",
                name: "다은",
                role: "친구를 기다리던 학생",
                appearance: "줄무늬 셔츠, 보라색 공책",
                location: "창문 쪽",
                action: "친구를 기다리던 중이었다",
                x: 23,
                y: 60,
                asset: "",
                assetBrief: "Korean teen girl, striped shirt, purple notebook, waiting by the window, full body cutout, clean illustration, transparent background"
            }
        ],
        prompts: [
            {
                speaker: "복도 감독 선생님",
                text: "아까 복도 중앙에서 전화하던 사람이 민호였어요.",
                focus: "-던",
                answerCharacterId: "minho",
                note: "끝난 장면이 아니라 조금 전 하던 행동을 떠올립니다."
            },
            {
                speaker: "반장",
                text: "계단 옆에서 공책을 찾던 사람이 지우였어요.",
                focus: "-던",
                answerCharacterId: "jiu",
                note: "이름을 찾기 전에 장소를 먼저 확인하게 해 주세요."
            },
            {
                speaker: "급식 도우미",
                text: "자판기 앞에서 음료를 고르던 학생이 유리였어요.",
                focus: "-던",
                answerCharacterId: "yuri",
                note: "행동이 완전히 끝난 느낌보다 기억 속 장면을 살립니다."
            },
            {
                speaker: "교실 친구",
                text: "창문 쪽에서 친구를 기다리던 사람이 다은이였어요.",
                focus: "-던",
                answerCharacterId: "daeun",
                note: "같은 인물을 다른 장소와 함께 반복 확인합니다."
            }
        ],
        candidateIds: ["yuri", "minho", "jiu", "daeun"]
    },
    {
        id: "gd-c12-s3",
        label: "1-3",
        chapter: "c12",
        kind: "case",
        title: "미술실 열쇠 사건",
        subtitle: "사건 결과와 목격자 증언을 연결해 범인을 찾습니다.",
        grammarFocus: ["-았/었-", "-던", "-고 있었다"],
        objective: "완료된 사실, 지나가던 행동, 그때 하고 있었던 행동을 구분해 범인을 추리한다.",
        teacherTip: "먼저 알리바이가 분명한 사람을 지우고, 마지막에 모순되는 증언을 가진 사람을 확인하세요.",
        incident: {
            title: "청소 시간 직후 미술실 창고 사건",
            summary: "미술부 학생이 창고 문을 열었더니 열쇠 꾸러미와 준비물이 사라져 있었습니다."
        },
        background: {
            label: "미술실 앞 복도",
            description: "창고 문, 작품 게시판, 복도 끝 계단이 함께 보이는 학교 실내 장면.",
            asset: "",
            assetBrief: "wide school corridor in front of an art room, storage door and display board visible, educational illustration, no text"
        },
        props: [
            {
                id: "storage-door",
                label: "창고 문",
                description: "사건이 난 창고 문",
                x: 68,
                y: 36,
                asset: "",
                assetBrief: "school storage door prop for an art room hallway, isolated transparent asset, no text"
            },
            {
                id: "display-board",
                label: "작품 게시판",
                description: "미술 작품이 붙어 있는 게시판",
                x: 30,
                y: 32,
                asset: "",
                assetBrief: "art display board prop for school hallway, isolated transparent asset, no text"
            },
            {
                id: "supply-box",
                label: "준비물 상자",
                description: "비어 있는 준비물 상자",
                x: 60,
                y: 72,
                asset: "",
                assetBrief: "empty school supply box prop, isolated transparent asset, no text"
            }
        ],
        cast: [
            {
                characterId: "yuri",
                name: "유리",
                role: "알리바이가 있는 학생",
                appearance: "초록 가디건, 노란 카메라 끈",
                location: "정원 쪽 창문",
                action: "정원에서 사진을 찍고 있었다",
                x: 22,
                y: 56,
                asset: "",
                assetBrief: "Korean teen student, green cardigan, yellow camera strap, camera in hand, full body cutout, clean illustration, transparent background"
            },
            {
                characterId: "minho",
                name: "민호",
                role: "진술이 모순되는 학생",
                appearance: "빨간 모자, 회색 후드",
                location: "복도 끝",
                action: "상자를 들고 뛰어가던 것으로 보인 학생",
                x: 78,
                y: 54,
                asset: "",
                assetBrief: "Korean teen boy, red cap, gray hoodie, carrying a box and hurrying, full body cutout, clean illustration, transparent background"
            },
            {
                characterId: "jiu",
                name: "지우",
                role: "도서실 앞에서 기다리던 학생",
                appearance: "파란 에코백, 흰 운동화",
                location: "복도 중간",
                action: "선생님을 기다리고 있었다",
                x: 44,
                y: 58,
                asset: "",
                assetBrief: "Korean teen student, blue tote bag, white sneakers, waiting calmly, full body cutout, clean illustration, transparent background"
            },
            {
                characterId: "daeun",
                name: "다은",
                role: "청소 담당 학생",
                appearance: "줄무늬 셔츠, 보라색 공책",
                location: "게시판 앞",
                action: "걸레를 정리하고 있었다",
                x: 33,
                y: 52,
                asset: "",
                assetBrief: "Korean teen girl, striped shirt, purple notebook, organizing cleaning cloths, full body cutout, clean illustration, transparent background"
            }
        ],
        clues: [
            {
                speaker: "미술부 학생",
                text: "창고 문을 열었더니 열쇠 꾸러미와 준비물 상자가 비어 있었어요.",
                focus: "-았/었-",
                note: "사건이 확인된 완료 결과입니다."
            },
            {
                speaker: "복도 청소 담당",
                text: "사건 직전에 빨간 모자를 쓰고 창고 쪽으로 가던 사람을 봤어요.",
                focus: "-던",
                note: "범인이 하던 행동을 본 목격 장면입니다."
            },
            {
                speaker: "정원 담당 학생",
                text: "그때 유리 씨는 정원에서 사진을 찍고 있었어요.",
                focus: "-고 있었다",
                note: "유리는 알리바이가 분명합니다."
            },
            {
                speaker: "도서실 선생님",
                text: "지우 씨는 저를 기다리면서 도서실 앞에 계속 서 있었어요.",
                focus: "-고 있었다",
                note: "지우도 다른 장소에서 확인됩니다."
            },
            {
                speaker: "반 친구",
                text: "민호 씨는 음악실에 있었다고 했지만, 저는 민호 씨가 복도 끝에서 상자를 들고 뛰어가던 걸 봤어요.",
                focus: "-았/었- + -던",
                note: "민호의 진술과 목격 내용이 충돌합니다."
            }
        ],
        answer: {
            characterId: "minho",
            reason: [
                "빨간 모자를 쓰고 창고 쪽으로 가던 사람이 보였어요.",
                "유리와 지우는 다른 장소에서 무엇을 하고 있었는지 알리바이가 확인됐어요.",
                "민호는 음악실에 있었다고 했지만 상자를 들고 뛰어가던 모습이 다시 목격됐어요."
            ]
        },
        candidateIds: ["yuri", "minho", "jiu", "daeun"]
    }
];
